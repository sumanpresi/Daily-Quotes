"use client";

import { useRef, useState } from "react";

interface Quote {
  text: string;
  author: string;
  country: string;
  era: string;
  meaning: string;
  source: string;
  sourceUrl: string;
}

type Phase = "idle" | "working" | "done" | "error";

export default function Page() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState("");
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const busy = useRef(false);

  async function generate() {
    if (busy.current) return;
    busy.current = true;
    setPhase("working");
    setMessage("Reading the archive\u2026");

    // Opened synchronously so the browser attributes it to the click and does
    // not block it. Redirected once the server confirms success; closed if not.
    const win = window.open("", "_blank");

    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const data = await res.json();

      if (data.quote) setQuote(data.quote);

      if (!res.ok || !data.ok) {
        win?.close();
        setPhase("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setDocUrl(data.docUrl);
      setPhase("done");
      setMessage(
        data.archived
          ? "Saved. Previous quote moved to the archive."
          : "Saved to the Active Quote tab.",
      );

      if (win) win.location.href = data.docUrl;
      else setMessage((m) => `${m} Your browser blocked the new tab \u2014 use the link below.`);
    } catch {
      win?.close();
      setPhase("error");
      setMessage("Could not reach the server. Check your connection and try again.");
    } finally {
      busy.current = false;
    }
  }

  const working = phase === "working";

  return (
    <main className="shell">
      <header className="masthead">
        <h1>Daily Philosophical Quote</h1>
        <p>Verified sources, archived to your document</p>
      </header>

      <section className="card" data-fresh={phase === "done"}>
        <div className="spine">
          <span>{quote ? quote.author : "Awaiting a quotation"}</span>
        </div>

        <div className="field">
          {quote ? (
            <>
              <blockquote>&ldquo;{quote.text}&rdquo;</blockquote>
              <div className="byline">
                <strong>{quote.author}</strong>
                <span>
                  {quote.country} &nbsp;|&nbsp; {quote.era}
                </span>
              </div>
              <p className="meaning">Meaning: {quote.meaning}</p>
              <p className="origin">
                Source: {quote.source}
                {quote.sourceUrl ? (
                  <>
                    {" \u2014 "}
                    <a href={quote.sourceUrl} target="_blank" rel="noreferrer noopener">
                      reference
                    </a>
                  </>
                ) : null}
              </p>
            </>
          ) : (
            <p className="empty">
              Press the button to draw a quotation. The one currently in your document moves to the
              archive, and the new one takes its place.
            </p>
          )}
        </div>
      </section>

      <div className="controls">
        <button className="generate" onClick={generate} disabled={working} aria-busy={working}>
          {working ? "Working\u2026" : "Generate Daily Philosophical Quote"}
        </button>

        {message ? (
          <span
            className="status"
            role="status"
            aria-live="polite"
            data-tone={phase === "error" ? "error" : phase === "done" ? "ok" : undefined}
          >
            {message}
          </span>
        ) : null}

        {docUrl ? (
          <a className="doclink" href={docUrl} target="_blank" rel="noreferrer noopener">
            Open the document
          </a>
        ) : null}
      </div>
    </main>
  );
}
