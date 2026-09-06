/**
 * POST /api/generate
 *
 * Runs entirely server-side. The browser sends no credentials and receives no
 * credentials; the response contains the quote and a status string only.
 */
import { NextResponse } from "next/server";
import { activeTabUrl, config } from "@/lib/config";
import { GoogleApiError } from "@/lib/google";
import {
  archiveLine,
  dedupe,
  parseActive,
  splitArchive,
  sortArchive,
  normaliseText,
  type ActiveQuote,
  type ArchiveEntry,
} from "@/lib/archive";
import { commit, getDocument, resolveTab, tabIdOf, tabText } from "@/lib/docs";
import { NoQuotesAvailable, selectQuote } from "@/lib/selection";
import { QUOTES } from "@/lib/quotes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Serialises concurrent invocations inside one warm instance, which covers the
 * common double-click. Cross-instance races are handled by the archive dedupe
 * check below rather than by a lock, so a duplicate entry cannot be created
 * even if two instances run at once.
 */
let inFlight: Promise<Response> | null = null;

export async function POST(): Promise<Response> {
  if (inFlight) return inFlight.then((r) => r.clone());
  inFlight = handle().finally(() => {
    inFlight = null;
  });
  return inFlight.then((r) => r.clone());
}

function fail(message: string, status = 500) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

async function handle(): Promise<Response> {
  let docId: string;
  try {
    docId = config.documentId;
    config.serviceAccountEmail;
    config.privateKey;
  } catch (e) {
    console.error("[config]", e);
    return fail("The app is not fully configured on the server. Please contact the administrator.", 500);
  }

  let doc, activeTab, archiveTab;
  try {
    doc = await getDocument(docId);
    activeTab = resolveTab(doc, config.activeTabId, /active/i, 0);
    archiveTab = resolveTab(doc, config.archiveTabId, /archive/i, 1);
  } catch (e) {
    console.error("[docs.read]", e);
    if (e instanceof GoogleApiError) {
      if (e.status === 403)
        return fail("Google refused access to the document. Share it with the service account as an Editor.", 502);
      if (e.status === 404) return fail("The Google document could not be found. Check the document ID.", 502);
      return fail("Google Docs is not responding right now. Please try again in a moment.", 502);
    }
    return fail(e instanceof Error ? e.message : "Could not read the Google document.", 502);
  }

  if (tabIdOf(activeTab) === tabIdOf(archiveTab)) {
    return fail("The Active and Archive tabs resolved to the same tab. Check the two tab IDs in the configuration.", 500);
  }

  const previous = parseActive(tabText(activeTab));
  const { entries: parsedArchive, preserved } = splitArchive(tabText(archiveTab));
  let archive = dedupe(parsedArchive);

  // Step 5: archive the outgoing quote, only if not already present.
  let archived = false;
  if (previous) {
    const already = archive.some((e: ArchiveEntry) => normaliseText(e.text) === normaliseText(previous.text));
    if (!already) {
      archive.push({ ...previous, usedAt: new Date(), line: "" });
      archived = true;
    }
  }
  archive = sortArchive(dedupe(archive));

  let picked;
  try {
    picked = selectQuote(archive, previous?.text ?? null);
  } catch (e) {
    if (e instanceof NoQuotesAvailable) {
      return fail(
        `All ${e.total} verified quotations have been used recently. Add more quotations, or clear older archive entries.`,
        409,
      );
    }
    throw e;
  }

  const newActive: ActiveQuote = {
    text: picked.text,
    author: picked.author,
    country: picked.country,
    era: picked.era,
    meaning: picked.meaning,
  };

  const lines = archive.map((e: ArchiveEntry) =>
    archiveLine(
      { text: e.text, author: e.author, country: e.country, era: e.era },
      config.archiveIncludeDate,
      e.usedAt ?? new Date(),
    ),
  );

  try {
    await commit(docId, {
      archiveTab,
      activeTab,
      archiveLines: [...preserved, ...lines],
      newActive,
    });
  } catch (e) {
    console.error("[docs.write]", e);
    return NextResponse.json(
      {
        ok: false,
        quote: { ...newActive, source: picked.source, sourceUrl: picked.sourceUrl },
        error: "Quote selected, but Google Docs could not be updated. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    quote: { ...newActive, source: picked.source, sourceUrl: picked.sourceUrl },
    archived,
    archiveCount: archive.length,
    libraryCount: QUOTES.length,
    docUrl: activeTabUrl(docId, config.activeTabId),
  });
}

