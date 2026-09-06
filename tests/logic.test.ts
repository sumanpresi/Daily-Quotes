/**
 * Pure-logic tests. No network, no Google, no credentials.
 * Run with: npx tsx tests/logic.test.ts
 */
import assert from "node:assert/strict";
import {
  archiveLine, dedupe, parseActive, parseArchive, splitArchive, sortArchive, activeTabBody,
  type ArchiveEntry,
} from "../lib/archive";
import { blockedKeys, selectQuote, NoQuotesAvailable } from "../lib/selection";
import { QUOTES, normalise } from "../lib/quotes";

let pass = 0;
function test(name: string, fn: () => void) {
  try { fn(); pass++; console.log(`  ok  ${name}`); }
  catch (e) { console.error(`  FAIL ${name}\n       ${(e as Error).message}`); process.exitCode = 1; }
}

console.log("\nquote library");
test("has at least 250 entries", () => assert.ok(QUOTES.length >= 250, `only ${QUOTES.length}`));
test("every entry has all six required fields", () => {
  for (const q of QUOTES) {
    for (const f of ["text", "meaning", "author", "country", "era", "source"] as const) {
      assert.ok(q[f] && q[f].trim().length > 0, `${q.id} missing ${f}`);
    }
    assert.match(q.sourceUrl, /^https:\/\//, `${q.id} bad sourceUrl`);
  }
});
test("no duplicate ids", () => {
  assert.equal(new Set(QUOTES.map((q) => q.id)).size, QUOTES.length);
});
test("no duplicate quote text", () => {
  const seen = new Map<string, string>();
  for (const q of QUOTES) {
    const k = normalise(q.text);
    assert.ok(!seen.has(k), `duplicate: ${q.id} vs ${seen.get(k)}`);
    seen.set(k, q.id);
  }
});
test("meanings are one sentence", () => {
  for (const q of QUOTES) {
    const stops = (q.meaning.match(/[.!?](\s|$)/g) ?? []).length;
    assert.ok(stops <= 1, `${q.id} meaning has ${stops} sentences`);
  }
});

console.log("\nactive tab parsing");
test("round-trips what the app writes", () => {
  const q = { text: "Simplify, simplify.", author: "Henry David Thoreau", country: "United States", era: "1817-1862", meaning: "Most complication in a life is optional." };
  const parsed = parseActive(activeTabBody(q));
  assert.deepEqual(parsed, q);
});
test("returns null on an empty or foreign tab", () => {
  assert.equal(parseActive(""), null);
  assert.equal(parseActive("just some notes\nand more"), null);
});
test("handles curly quotes", () => {
  const p = parseActive('\u201cThe world is all that is the case.\u201d\nLudwig Wittgenstein\nAustria | 1889-1951\nMeaning: Reality is the set of facts.');
  assert.equal(p?.author, "Ludwig Wittgenstein");
  assert.equal(p?.era, "1889-1951");
});

console.log("\narchive parsing and formatting");
const sample = [
  '\u2022 "Simplify, simplify." - Henry David Thoreau (United States, 1817-1862)',
  '\u2022 "Hell is other people." - Jean-Paul Sartre (France, 1905-1980)',
  "some stray line a human typed",
  '\u2022 "One must imagine Sisyphus happy." - Albert Camus (France, 1913-1960) [used: 2026-01-15]',
].join("\n");

test("parses well-formed lines and skips stray text", () => {
  const e = parseArchive(sample);
  assert.equal(e.length, 3);
  assert.equal(e[0].author, "Henry David Thoreau");
});
test("reads the optional used-date stamp", () => {
  const e = parseArchive(sample);
  assert.equal(e[2].usedAt?.toISOString().slice(0, 10), "2026-01-15");
  assert.equal(e[0].usedAt, null);
});
test("sorts alphabetically by author", () => {
  const names = sortArchive(parseArchive(sample)).map((x: ArchiveEntry) => x.author);
  assert.deepEqual(names, ["Albert Camus", "Henry David Thoreau", "Jean-Paul Sartre"]);
});
test("sorts an author's own entries consistently", () => {
  const two = parseArchive([
    '\u2022 "Zebra last." - Plato (Greece, c. 428-348 BCE)',
    '\u2022 "Alpha first." - Plato (Greece, c. 428-348 BCE)',
  ].join("\n"));
  assert.deepEqual(sortArchive(two).map((x: ArchiveEntry) => x.text), ["Alpha first.", "Zebra last."]);
});
test("removes duplicates, ignoring case and punctuation", () => {
  const dupes = parseArchive([
    '\u2022 "Simplify, simplify." - Henry David Thoreau (United States, 1817-1862)',
    '\u2022 "simplify simplify" - Henry David Thoreau (United States, 1817-1862)',
  ].join("\n"));
  assert.equal(dedupe(dupes).length, 1);
});
test("archive line matches the required format", () => {
  const line = archiveLine({ text: "Simplify, simplify.", author: "Henry David Thoreau", country: "United States", era: "1817-1862" }, false);
  assert.equal(line, '\u2022 "Simplify, simplify." - Henry David Thoreau (United States, 1817-1862)');
  assert.equal(parseArchive(line).length, 1, "own output must be re-readable");
});
test("every library quote survives a write/read round trip", () => {
  for (const q of QUOTES) {
    const line = archiveLine(q, false);
    const back = parseArchive(line);
    assert.equal(back.length, 1, `unparseable after write: ${q.id} -> ${line}`);
    assert.equal(normalise(back[0].text), normalise(q.text), `text drift: ${q.id}`);
    assert.equal(back[0].author, q.author, `author drift: ${q.id}`);
  }
});

console.log("\nrepeat suppression");
const asEntry = (text: string, author: string, usedAt: Date | null): ArchiveEntry =>
  ({ text, author, country: "x", era: "y", usedAt, line: "" });

test("undated archive entries block forever", () => {
  const b = blockedKeys([asEntry("Simplify, simplify.", "Thoreau", null)], null);
  assert.ok(b.has(normalise("Simplify, simplify.")));
});
test("dated entries inside six months are blocked", () => {
  const now = new Date("2026-09-06");
  const recent = new Date("2026-07-01");
  assert.ok(blockedKeys([asEntry("q", "a", recent)], null, now).has("q"));
});
test("dated entries older than six months are released", () => {
  const now = new Date("2026-09-06");
  const old = new Date("2025-01-01");
  assert.ok(!blockedKeys([asEntry("q", "a", old)], null, now).has("q"));
});
test("the current active quote is blocked", () => {
  assert.ok(blockedKeys([], "Simplify, simplify.").has(normalise("Simplify, simplify.")));
});
test("selection never returns a blocked quote", () => {
  const archive = QUOTES.slice(0, 200).map((q) => asEntry(q.text, q.author, null));
  for (let i = 0; i < 300; i++) {
    const picked = selectQuote(archive, null);
    assert.ok(!archive.some((e) => normalise(e.text) === normalise(picked.text)));
  }
});
test("exhaustion raises instead of silently repeating", () => {
  const all = QUOTES.map((q) => asEntry(q.text, q.author, null));
  assert.throws(() => selectQuote(all, null), NoQuotesAvailable);
});
test("draw reaches many different authors", () => {
  const seen = new Set<string>();
  for (let i = 0; i < 600; i++) seen.add(selectQuote([], null).author);
  assert.ok(seen.size > 40, `only ${seen.size} authors drawn`);
});

console.log(`\n${pass} checks passed\n`);

console.log("\nnested parentheses");
test("author names containing parentheses parse correctly", () => {
  const e = parseArchive('\u2022 "Truth does not contradict truth." - Ibn Rushd (Averroes) (Al-Andalus (present-day Spain), 1126-1198)');
  assert.equal(e.length, 1);
  assert.equal(e[0].author, "Ibn Rushd (Averroes)");
  assert.equal(e[0].country, "Al-Andalus (present-day Spain)");
  assert.equal(e[0].era, "1126-1198");
});
test("countries containing parentheses parse correctly", () => {
  const e = parseArchive('\u2022 "One must imagine Sisyphus happy." - Albert Camus (France (born in Algeria), 1913-1960) [used: 2026-03-01]');
  assert.equal(e[0].author, "Albert Camus");
  assert.equal(e[0].country, "France (born in Algeria)");
  assert.equal(e[0].usedAt?.toISOString().slice(0, 10), "2026-03-01");
});

console.log("\nfull archive cycle");
test("repeated cycles never duplicate and stay sorted", () => {
  let archive: ArchiveEntry[] = [];
  let active: typeof QUOTES[number] | null = null;

  for (let day = 0; day < 120; day++) {
    if (active) {
      const dup = archive.some((e) => normalise(e.text) === normalise(active!.text));
      if (!dup) archive.push({ ...active, usedAt: new Date(), line: "" });
    }
    archive = sortArchive(dedupe(archive));
    active = selectQuote(archive, active?.text ?? null);
  }

  assert.equal(archive.length, 119, `expected 119 archived, got ${archive.length}`);
  const authors = archive.map((e) => e.author);
  assert.deepEqual(authors, [...authors].sort((a, b) => a.localeCompare(b, "en")), "archive not sorted");
  assert.equal(new Set(archive.map((e) => normalise(e.text))).size, archive.length, "duplicate in archive");
});
test("a stray human-typed line in the archive is preserved-safe (ignored, not crashed on)", () => {
  const mixed = ['\u2022 "Simplify, simplify." - Henry David Thoreau (United States, 1817-1862)', "TODO: ask Ramesh about this", ""].join("\n");
  assert.equal(parseArchive(mixed).length, 1);
});
test("stray human lines are preserved for rewriting, not dropped", () => {
  const mixed = ["Notes from Suman:", '\u2022 "Simplify, simplify." - Henry David Thoreau (United States, 1817-1862)'].join("\n");
  const { entries, preserved } = splitArchive(mixed);
  assert.equal(entries.length, 1);
  assert.deepEqual(preserved, ["Notes from Suman:"]);
});
