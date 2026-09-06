/**
 * Quote selection with repeat suppression.
 *
 * The Archive tab is the source of truth for history. When archive lines carry
 * a "[used: YYYY-MM-DD]" stamp (ARCHIVE_INCLUDE_DATE=true) a true rolling
 * six-month window applies. Without stamps the archive holds no dates, so we
 * fall back to excluding everything ever archived: stricter than required,
 * never looser.
 */
import { QUOTES, normalise, type Quote } from "./quotes";
import { REPEAT_WINDOW_DAYS, normaliseText, type ArchiveEntry } from "./archive";

export class NoQuotesAvailable extends Error {
  constructor(readonly total: number) {
    super("Every verified quotation has been used within the repeat window.");
    this.name = "NoQuotesAvailable";
  }
}

export function blockedKeys(
  archive: ArchiveEntry[],
  activeText: string | null,
  now = new Date(),
): Set<string> {
  const cutoff = now.getTime() - REPEAT_WINDOW_DAYS * 86_400_000;
  const blocked = new Set<string>();

  for (const e of archive) {
    // Undated entries always block.
    if (e.usedAt === null || e.usedAt.getTime() >= cutoff) blocked.add(normaliseText(e.text));
  }
  if (activeText) blocked.add(normaliseText(activeText));
  return blocked;
}

export function selectQuote(
  archive: ArchiveEntry[],
  activeText: string | null,
  now = new Date(),
  rand: () => number = Math.random,
): Quote {
  const blocked = blockedKeys(archive, activeText, now);
  const eligible = QUOTES.filter((q) => !blocked.has(normalise(q.text)));
  if (eligible.length === 0) throw new NoQuotesAvailable(QUOTES.length);

  // Pick the author first, so prolific authors do not dominate the draw.
  const authors = [...new Set(eligible.map((q) => q.author))];
  const author = authors[Math.floor(rand() * authors.length)];
  const pool = eligible.filter((q) => q.author === author);
  return pool[Math.floor(rand() * pool.length)];
}
