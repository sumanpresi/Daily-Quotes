/**
 * Server-side Google authentication.
 *
 * Flow: service-account JWT (RS256) signed with the private key, exchanged at
 * Google's token endpoint for a short-lived access token. This is the
 * documented server-to-server flow for applications acting as themselves
 * rather than on behalf of an end user, so there is no OAuth consent screen,
 * no refresh token to expire, and no user data involved.
 *
 * Credentials are read from environment variables and never leave this module.
 */
import "server-only";
import { JWT } from "google-auth-library";
import { config } from "./config";

/** Least privilege: read and write the documents this account can access. */
const SCOPES = ["https://www.googleapis.com/auth/documents"];

let client: JWT | null = null;

function getClient(): JWT {
  if (!client) {
    client = new JWT({
      email: config.serviceAccountEmail,
      key: config.privateKey,
      scopes: SCOPES,
    });
  }
  return client;
}

export class GoogleApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "GoogleApiError";
  }
}

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  const headers = await getClient().getRequestHeaders(url);
  const res = await fetch(url, {
    ...init,
    headers: { ...Object.fromEntries(new Headers(headers)), "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });

  if (!res.ok) {
    // Body is logged server-side only; the caller maps status to a safe message.
    const body = await res.text().catch(() => "");
    console.error(`[google] ${res.status} ${url} :: ${body.slice(0, 800)}`);
    throw new GoogleApiError(`Google API responded ${res.status}`, res.status);
  }
  return (await res.json()) as T;
}

const BASE = "https://docs.googleapis.com/v1/documents";

/** documents.get with tab content included. */
export function getDocument(documentId: string): Promise<DocsDocument> {
  return call<DocsDocument>(`${BASE}/${encodeURIComponent(documentId)}?includeTabsContent=true`);
}

/** documents.batchUpdate. All requests apply atomically. */
export function batchUpdate(documentId: string, requests: unknown[]): Promise<unknown> {
  if (requests.length === 0) return Promise.resolve({});
  return call(`${BASE}/${encodeURIComponent(documentId)}:batchUpdate`, {
    method: "POST",
    body: JSON.stringify({ requests }),
  });
}

/* ---- minimal shapes of the parts of the Docs resource we touch ---- */

export interface DocsTextRun {
  content?: string;
}
export interface DocsParagraphElement {
  textRun?: DocsTextRun;
}
export interface DocsStructuralElement {
  startIndex?: number;
  endIndex?: number;
  paragraph?: { elements?: DocsParagraphElement[] };
}
export interface DocsBody {
  content?: DocsStructuralElement[];
}
export interface DocsTab {
  tabProperties?: { tabId?: string; title?: string; index?: number };
  documentTab?: { body?: DocsBody };
  childTabs?: DocsTab[];
}
export interface DocsDocument {
  documentId?: string;
  title?: string;
  tabs?: DocsTab[];
  body?: DocsBody;
}
