/**
 * Pure parsing, formatting and sorting for the two document tabs.
 *
 * Deliberately free of server-only imports and of any network or credential
 * access, so this logic is unit-testable in isolation. Anything that talks to
 * Google lives in lib/docs.ts.
 */

export interface ActiveQuote {
  text: string;
  author: string;
  country: string;
  era: string;
  meaning: string;
}

export interface ArchiveEntry {
  text: string;
  author: string;
  country: string;
  era: string;
  usedAt: Date | null;
  line: string;
}

export const REPEAT_WINDOW_DAYS = 183;

/** Normalised form used for duplicate detection. */
export function normaliseText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019\u201c\u201d]/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Active tab layout written by this app:
 *   "Quote text"
 *   Author Name
 *   Country | Era
 *   Meaning: one sentence
 */
export function parseActive(text: string): ActiveQuote | null {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 3) return null;

  const quoted = lines[0].match(/^["\u201c\u2018'](.+)["\u201d\u2019']$/);
  if (!quoted) return null;

  const meta = lines[2].split("|");
  return {
    text: quoted[1].trim(),
    author: lines[1].trim(),
    country: (meta[0] ?? "").trim(),
    era: (meta[1] ?? "").trim(),
    meaning: (lines[3] ?? "").replace(/^Meaning:\s*/i, "").trim(),
  };
}

/**
 * Archive line grammar:
 *   • "Quote text" - Author Name (Country, Era) [used: YYYY-MM-DD]
 *
 * A regex is not sufficient here: author names ("Ibn Sina (Avicenna)") and
 * country fields ("France (born in Algeria)") both contain nested parentheses,
 * so the trailing group is located by matching brackets from the end instead.
 */
const LEAD = /^[\u2022\-*]\s*["\u201c\u2018'](.+?)["\u201d\u2019']\s*[-\u2013\u2014]\s*(.+)$/;
const USED = /\s*\[used:\s*(\d{4}-\d{2}-\d{2})\]$/;

/** Index of the "(" matching the final ")", or -1. */
function matchingOpenParen(s: string): number {
  if (!s.endsWith(")")) return -1;
  let depth = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ")") depth++;
    else if (s[i] === "(") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

export function parseArchiveLine(raw: string): ArchiveEntry | null {
  const line = raw.trim();
  const lead = LEAD.exec(line);
  if (!lead) return null;

  const text = lead[1].trim();
  let rest = lead[2].trim();

  let usedAt: Date | null = null;
  const used = USED.exec(rest);
  if (used) {
    usedAt = new Date(`${used[1]}T00:00:00Z`);
    rest = rest.slice(0, used.index).trim();
  }

  const open = matchingOpenParen(rest);
  if (open <= 0) return null;

  const author = rest.slice(0, open).trim();
  const inner = rest.slice(open + 1, -1).trim();
  const comma = inner.lastIndexOf(",");
  if (!author || comma < 0) return null;

  return {
    text,
    author,
    country: inner.slice(0, comma).trim(),
    era: inner.slice(comma + 1).trim(),
    usedAt,
    line,
  };
}

export function parseArchive(text: string): ArchiveEntry[] {
  return splitArchive(text).entries;
}

/**
 * Splits the Archive tab into recognised entries and everything else.
 *
 * The whole tab body is rewritten on each run, so any line a person typed there
 * by hand would otherwise be destroyed. `preserved` carries those lines back
 * out so they can be written again above the sorted list.
 */
export function splitArchive(text: string): { entries: ArchiveEntry[]; preserved: string[] } {
  const entries: ArchiveEntry[] = [];
  const preserved: string[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const entry = parseArchiveLine(raw);
    if (entry) entries.push(entry);
    else preserved.push(line);
  }
  return { entries, preserved };
}

export function archiveLine(
  q: Pick<ActiveQuote, "text" | "author" | "country" | "era">,
  withDate: boolean,
  when = new Date(),
): string {
  const base = `\u2022 "${q.text}" - ${q.author} (${q.country}, ${q.era})`;
  return withDate ? `${base} [used: ${when.toISOString().slice(0, 10)}]` : base;
}

/** Alphabetical by author, then by quote text so one author's entries are stable. */
export function sortArchive(entries: ArchiveEntry[]): ArchiveEntry[] {
  return [...entries].sort(
    (a, b) => a.author.localeCompare(b.author, "en") || a.text.localeCompare(b.text, "en"),
  );
}

/** Drops entries whose normalised quote text has already been seen. */
export function dedupe(entries: ArchiveEntry[]): ArchiveEntry[] {
  const seen = new Set<string>();
  const out: ArchiveEntry[] = [];
  for (const e of entries) {
    const key = normaliseText(e.text);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(e);
  }
  return out;
}

export function activeTabBody(q: ActiveQuote): string {
  return `"${q.text}"\n${q.author}\n${q.country} | ${q.era}\nMeaning: ${q.meaning}\n`;
}
