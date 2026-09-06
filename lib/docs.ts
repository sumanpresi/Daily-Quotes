/**
 * Google Docs tab operations.
 *
 * Documented API surface only:
 *   documents.get?includeTabsContent=true  -> read tab bodies
 *   documents.batchUpdate                  -> insertText / deleteContentRange /
 *                                             updateTextStyle, each scoped to a
 *                                             tabId on its Location or Range.
 *
 * The API has no "move content between tabs" request, so moving the active
 * quote into the archive is expressed as insert-into-archive plus
 * delete-from-active within a single batchUpdate. Google applies a batch
 * atomically, so a partial failure cannot lose the outgoing quote.
 */
import "server-only";
import { batchUpdate, getDocument, type DocsBody, type DocsDocument, type DocsTab } from "./google";
import { activeTabBody, type ActiveQuote } from "./archive";

const RED = { color: { rgbColor: { red: 0.706, green: 0.188, blue: 0.165 } } };

/* ------------------------------ tab resolution ------------------------------ */

function flatten(tabs: DocsTab[] | undefined, out: DocsTab[] = []): DocsTab[] {
  for (const t of tabs ?? []) {
    out.push(t);
    flatten(t.childTabs, out);
  }
  return out;
}

/**
 * The `tab=` value in a Docs URL is a URL fragment and is not documented as an
 * API identifier, so we do not assume the two match. Look for an exact tabId,
 * then a title match, then fall back to position -- and fail loudly rather than
 * writing into the wrong tab.
 */
export function resolveTab(
  doc: DocsDocument,
  wantedId: string,
  titleHint: RegExp,
  fallbackIndex: number,
): DocsTab {
  const tabs = flatten(doc.tabs);
  if (tabs.length === 0) {
    throw new Error("The document returned no tabs. Confirm the document ID is correct.");
  }

  const byId = tabs.find((t) => t.tabProperties?.tabId === wantedId);
  if (byId) return byId;

  const byTitle = tabs.find((t) => titleHint.test(t.tabProperties?.title ?? ""));
  if (byTitle) return byTitle;

  const byIndex = tabs[fallbackIndex];
  if (byIndex) return byIndex;

  throw new Error(
    `Could not resolve a tab for "${wantedId}". Tabs present: ${tabs
      .map((t) => `${t.tabProperties?.title ?? "untitled"} (${t.tabProperties?.tabId ?? "?"})`)
      .join(", ")}`,
  );
}

export function tabIdOf(tab: DocsTab): string {
  const id = tab.tabProperties?.tabId;
  if (!id) throw new Error("Tab is missing a tabId.");
  return id;
}

/* ------------------------------ reading ------------------------------ */

function bodyText(body: DocsBody | undefined): string {
  let out = "";
  for (const el of body?.content ?? []) {
    for (const pe of el.paragraph?.elements ?? []) out += pe.textRun?.content ?? "";
  }
  return out;
}

export function tabText(tab: DocsTab): string {
  return bodyText(tab.documentTab?.body);
}

/** Range covering the tab body except the final, undeletable newline. */
export function clearRange(tab: DocsTab): { start: number; end: number } | null {
  const content = tab.documentTab?.body?.content ?? [];
  if (content.length === 0) return null;
  const end = content[content.length - 1]?.endIndex ?? 1;
  return end > 2 ? { start: 1, end: end - 1 } : null;
}

/* ------------------------------ writing ------------------------------ */

export interface WritePlan {
  archiveTab: DocsTab;
  activeTab: DocsTab;
  archiveLines: string[];
  newActive: ActiveQuote;
}

export async function commit(documentId: string, plan: WritePlan): Promise<void> {
  const archiveId = tabIdOf(plan.archiveTab);
  const activeId = tabIdOf(plan.activeTab);
  const requests: unknown[] = [];

  const archiveClear = clearRange(plan.archiveTab);
  if (archiveClear) {
    requests.push({
      deleteContentRange: {
        range: { tabId: archiveId, startIndex: archiveClear.start, endIndex: archiveClear.end },
      },
    });
  }
  const archiveText = plan.archiveLines.length ? plan.archiveLines.join("\n") + "\n" : "";
  if (archiveText) {
    requests.push({ insertText: { location: { tabId: archiveId, index: 1 }, text: archiveText } });
  }

  const activeClear = clearRange(plan.activeTab);
  if (activeClear) {
    requests.push({
      deleteContentRange: {
        range: { tabId: activeId, startIndex: activeClear.start, endIndex: activeClear.end },
      },
    });
  }

  const body = activeTabBody(plan.newActive);
  requests.push({ insertText: { location: { tabId: activeId, index: 1 }, text: body } });

  // Offsets inside the freshly inserted text; the insert begins at index 1.
  const quoteLine = `"${plan.newActive.text}"`;
  const quoteStart = 1;
  const quoteEnd = quoteStart + quoteLine.length;

  const meaningLine = `Meaning: ${plan.newActive.meaning}`;
  const meaningStart = body.indexOf(meaningLine) + 1;
  const meaningEnd = meaningStart + meaningLine.length;

  requests.push({
    updateTextStyle: {
      range: { tabId: activeId, startIndex: quoteStart, endIndex: quoteEnd },
      textStyle: { bold: true, fontSize: { magnitude: 14, unit: "PT" } },
      fields: "bold,fontSize",
    },
  });
  requests.push({
    updateTextStyle: {
      range: { tabId: activeId, startIndex: meaningStart, endIndex: meaningEnd },
      textStyle: { foregroundColor: RED, bold: false },
      fields: "foregroundColor,bold",
    },
  });

  await batchUpdate(documentId, requests);
}

export { getDocument };
export type { ActiveQuote };
