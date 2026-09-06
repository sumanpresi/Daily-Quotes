# Daily Philosophical Quote

Draws a verified quotation from a curated library, writes it to the Active Quote
tab of a Google Doc, moves the previous one into the Archive tab, keeps the
archive sorted and free of duplicates, and opens the document.

Next.js on Vercel. All Google access happens in a server-side route; the browser
never sees a credential.

---

## Google setup

You need a **service account**. It is a robot identity with its own email
address. You share the document with that address exactly as you would with a
colleague. Nothing here touches your personal Google account, your Drive, or
your mail.

1. Go to <https://console.cloud.google.com> and create a project (any name).
2. In the search bar, find **Google Docs API** and press **Enable**.
3. Go to **IAM & Admin → Service Accounts → Create service account**.
   Give it a name, press Create, then Done. No roles are needed.
4. Open the account you just made, go to the **Keys** tab, then
   **Add key → Create new key → JSON**. A file downloads. It contains a private
   key. Do not put this file in the project folder, and do not email it.
5. Open the JSON in a text editor. You need exactly two values from it:
   `client_email` and `private_key`.
6. Open your Google Doc, press **Share**, paste the `client_email` value, set it
   to **Editor**, and send. (Untick "notify people" — it is a robot.)
7. Note the two tab IDs. Click each tab in the document and read the address
   bar: the part after `tab=` is the ID, for example `t.0`.

## Vercel environment variables

Set these in **Project → Settings → Environment Variables**. Vercel encrypts
them at rest, and they are only readable by server-side code.

| Name | Value |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | the `client_email` from the JSON |
| `GOOGLE_PRIVATE_KEY` | the `private_key` from the JSON, pasted whole |
| `GOOGLE_DOC_ID` | the long ID in the middle of the document URL |
| `GOOGLE_ACTIVE_TAB_ID` | the `tab=` value of the Active Quote tab |
| `GOOGLE_ARCHIVE_TAB_ID` | the `tab=` value of the Archive tab |
| `ARCHIVE_INCLUDE_DATE` | optional, see "Repeat rule" below |

When pasting the private key, keep the `-----BEGIN PRIVATE KEY-----` and
`-----END PRIVATE KEY-----` lines. Whether your editor gives you real line
breaks or literal `\n` sequences, both work.

## Deploying

```bash
git init && git add -A && git commit -m "Daily Philosophical Quote"
gh repo create daily-philosophical-quote --private --source=. --push
```

Then on <https://vercel.com>: **Add New → Project**, pick the repository, add the
environment variables above, and **Deploy**. Nothing else needs configuring.

To run locally, copy `.env.example` to `.env.local`, fill it in, then
`npm install && npm run dev`.

---

## How it works

One button calls `POST /api/generate`, which:

1. reads both tabs with `documents.get?includeTabsContent=true`;
2. resolves each tab id, verifying rather than assuming that the `tab=` value
   from the URL matches the API's `tabId`;
3. parses the current active quote and the existing archive lines;
4. adds the outgoing quote to the archive **only if** it is not already there;
5. sorts the archive by author, then by quote text;
6. picks a new quotation that is not blocked by the repeat rule;
7. writes both tabs in a single `documents.batchUpdate`, which Google applies
   atomically, then styles the quote bold and the meaning red.

### Repeat rule

The Archive tab is the source of truth; there is no database.

The specified archive line format carries no date, so by default **anything ever
archived is never drawn again** — stricter than the six-month requirement, never
looser. With 252 quotations that is over eight months of daily use.

Setting `ARCHIVE_INCLUDE_DATE=true` appends `[used: YYYY-MM-DD]` to each line,
which enables a true rolling 183-day window. Undated lines already in the
document keep blocking forever, so switching it on later is safe.

If every quotation is blocked, the app says so and writes nothing. It will not
repeat one quietly.

### Quote library

`lib/quotes.ts` holds 252 quotations from 48 thinkers. Each carries author,
country, era, source and a source URL. Nothing is machine-generated. Where a
saying is traditional rather than traceable to a specific passage, the source
field says "Attributed" rather than inventing a citation.

To add more, append `[text, meaning, source]` rows to an `author()` block. The
test suite checks field completeness, duplicate text, and that every entry
survives a write-then-read round trip through the archive format.

## Tests

```bash
npx tsx tests/logic.test.ts
```

Covers parsing, sorting, deduplication, the repeat window, nested parentheses in
author and country names, and a simulated 120-day run.

## Known limitations

- **No true six-month window by default.** Explained above; opt in with
  `ARCHIVE_INCLUDE_DATE`.
- **The archive is rewritten in full each run.** Lines you typed by hand are
  read back and re-written above the sorted list, so they survive, but any
  *formatting* you applied to them by hand does not.
- **Double-click protection is per-instance.** The button disables itself, and
  the server serialises overlapping calls within one warm instance. If two
  Vercel instances ran at the same moment, the duplicate check in step 4 is what
  prevents a double archive entry, not a lock.
- **The API has no "move between tabs" operation.** Handled with an atomic
  insert-plus-delete batch, which is the closest supported equivalent.
- **Tab ids are verified, not assumed.** If Google ever stops aligning the URL
  `tab=` value with the API `tabId`, the app falls back to matching the tab
  title, then position, and reports what it found rather than guessing.
