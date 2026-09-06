/**
 * Server-only configuration. Every value here comes from an environment
 * variable. Nothing in this file is imported by a client component, and no
 * name is prefixed NEXT_PUBLIC_, so none of it can reach the browser bundle.
 */
import "server-only";

function required(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

export const config = {
  get serviceAccountEmail(): string {
    return required("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  },

  /**
   * Vercel's environment variable editor stores newlines literally as "\n".
   * Google's JWT signer needs real newlines, so we restore them here.
   */
  get privateKey(): string {
    return required("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  },

  get documentId(): string {
    return required("GOOGLE_DOC_ID");
  },

  /** Tab id as it appears in the document URL, e.g. "t.0". */
  get activeTabId(): string {
    return required("GOOGLE_ACTIVE_TAB_ID");
  },

  get archiveTabId(): string {
    return required("GOOGLE_ARCHIVE_TAB_ID");
  },

  /**
   * Off by default so the archive line format matches the specification
   * exactly. Turn on to append "[used: YYYY-MM-DD]" to each archive line,
   * which is what makes a true rolling six-month window possible.
   */
  get archiveIncludeDate(): boolean {
    return process.env.ARCHIVE_INCLUDE_DATE === "true";
  },
};

/** Public, non-secret link used by the browser to open the document. */
export function activeTabUrl(docId: string, tabId: string): string {
  return `https://docs.google.com/document/d/${docId}/edit?tab=${tabId}`;
}
