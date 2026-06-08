# Caselaw MCP Server

A local MCP server providing real-time access to UK court judgments from [Find Case Law](https://caselaw.nationalarchives.gov.uk) at The National Archives.

## Overview

| Property | Value |
|----------|-------|
| **Source** | caselaw.nationalarchives.gov.uk (Open Justice Licence) |
| **API key** | Not required for search/lookup; **`summarise_judgment` needs a user-supplied Anthropic API key** |
| **Transport** | stdio (runs as a local process) |
| **Location** | `mcp-servers/caselaw/src/index.ts` |
| **User-Agent** | `uk-legal-skills-caselaw-mcp/1.0` |
| **Cache** | Tiered in-memory, 500-entry LRU |
| **Fetch timeout** | 30 seconds |

::: info Open Justice Licence
Find Case Law is published by The National Archives under the [Open Justice Licence](https://caselaw.nationalarchives.gov.uk/open-justice-licence). Judgment text may be used for the purposes described in that licence; it must not be used to identify or contact parties, and computational analysis is permitted on an open basis. Outputs from these tools are AI-assisted research, not legal advice — England & Wales only.
:::

## Running the Server

```bash
cd mcp-servers/caselaw
npm install
npm run dev     # start the server (tsx src/index.ts)
```

For production builds:

```bash
npm run build   # compiles to dist/
npm test        # build + run tests
```

::: info Automatic Startup
When configured in `.mcp.json`, Claude Code starts the server automatically when a skill needs it. You do not need to start it manually.
:::

## Tools

The server exposes 9 tools. Three search the Atom feed, two read a specific judgment, one finds judgments by statute section, one downloads the PDF, one extracts body text, and one produces an AI summary.

| # | Tool | Purpose | Key parameters |
|---|------|---------|----------------|
| 1 | `search_caselaw` | Free-text search across judgments | `query` (req), `court`, `limit` |
| 2 | `get_recent_judgments` | Newest judgments, most recent first | `court`, `limit` |
| 3 | `search_by_party` | Judgments involving a named party | `party_name` (req), `court`, `limit` |
| 4 | `search_by_judge` | Judgments decided by a named judge | `judge_name` (req), `court`, `limit` |
| 5 | `lookup_judgment` | Full metadata + body text for one judgment | `uri` (req) |
| 6 | `get_judgments_for_section` | Judgments citing a statute section | `legislation_id` (req), `section_number` (req) |
| 7 | `download_judgment_pdf` | Save a judgment PDF to disk | `uri` (req), `output_path` |
| 8 | `extract_judgment_text` | Body text as structured Markdown | `uri` (req) |
| 9 | `summarise_judgment` | AI summary of a judgment | `uri` (req), `style`, **`apiKey` (req)** |

### 1. `search_caselaw`

Search Find Case Law for judgments by free-text query.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Free-text search query |
| `court` | string | No | Court code to filter by (e.g. `ewca`, `uksc`, `ewhc/pat`) |
| `limit` | number | No | Max results, 1–50 (default 20) |

**Returns:** A Markdown list of matching judgments, each with name, neutral citation (where detectable), last-updated date, and URI.

```
Example: search_caselaw("frustration of contract", court="ewca")
```

### 2. `get_recent_judgments`

Get the most recently published judgments, optionally filtered by court (ordered newest-first via `order=-date`).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `court` | string | No | Court code |
| `limit` | number | No | Max results, 1–50 (default 20) |

**Returns:** A Markdown list of the latest judgments, with the same fields as `search_caselaw`.

### 3. `search_by_party`

Search for judgments involving a named party (claimant or defendant).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `party_name` | string | Yes | Name of the party |
| `court` | string | No | Court code |
| `limit` | number | No | Max results, 1–50 (default 20) |

```
Example: search_by_party("Uber BV", court="uksc")
```

### 4. `search_by_judge`

Search for judgments decided by a named judge.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `judge_name` | string | Yes | Name of the judge |
| `court` | string | No | Court code |
| `limit` | number | No | Max results, 1–50 (default 20) |

```
Example: search_by_judge("Lord Leggatt")
```

### 5. `lookup_judgment`

Get full metadata and body text for a specific judgment by its URI.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uri` | string | Yes | Judgment URI, e.g. `uksc/2024/42` or `tna.t7sh6v3m` |

**Returns:** A Markdown record with title, neutral citation, court, date, judges, parties, URI, and the judgment body. The URI is parsed from the canonical Akoma Ntoso XML at `…/data.xml`. If only a PDF exists, the body falls back to a note recommending `extract_judgment_text`.

```
Example: lookup_judgment(uri="uksc/2024/42")
```

### 6. `get_judgments_for_section`

Find judgments that cite a specific statute section. This is the bridge between the legislation and caselaw servers — give it a legislation ID and section number and it returns judgments that have considered that provision.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `legislation_id` | string | Yes | Legislation ID, e.g. `ukpga/1996/18` |
| `section_number` | string | Yes | Section number, e.g. `94` or `10A` |

**How it works:** the tool first fetches the Act's title from legislation.gov.uk, then runs a multi-strategy search — full title (e.g. `"Employment Rights Act 1996" section 94`) plus a derived short name (e.g. `"ERA 1996" s.94`) — and de-duplicates the combined results by URI.

```
Example: get_judgments_for_section(legislation_id="ukpga/1996/18", section_number="94")
         → Judgments citing Employment Rights Act 1996, s.94 (unfair dismissal)
```

### 7. `download_judgment_pdf`

Download a judgment PDF to disk and return the local file path.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uri` | string | Yes | Judgment URI, e.g. `uksc/2024/42` |
| `output_path` | string | No | Target file path. Defaults to `./{uri-slug}.pdf` in the current working directory |

**Returns:** A confirmation of the bytes written and the absolute path. The URI slug is sanitised (path traversal stripped) before writing.

### 8. `extract_judgment_text`

Extract the body text of a judgment as structured Markdown. Useful when the canonical XML body is thin or the judgment is PDF-only.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uri` | string | Yes | Judgment URI |

**Strategy (in order):**

1. **XML** — fastest; reads the Akoma Ntoso `data.xml` body.
2. **HTML → MarkItDown** — fetches the judgment HTML and converts it to Markdown with headings and paragraphs preserved.
3. **PDF → MarkItDown** — downloads `data.pdf` and converts it to Markdown.

::: tip MarkItDown dependency
Strategies 2 and 3 shell out to Python's `markitdown`. The server tries a project `.venv/bin/python3` first, then system `python3`. If MarkItDown is unavailable and the XML body is empty, the tool reports that the judgment could not be extracted in a machine-readable format.
:::

### 9. `summarise_judgment`

Generate an AI summary of a judgment. **This is the only tool that calls a model and the only one that requires an API key.**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uri` | string | Yes | Judgment URI |
| `style` | enum | No | `brief` (default), `detailed`, or `plain-english` |
| `apiKey` | string | Yes | **User-supplied Anthropic API key** |

::: warning API key required
`summarise_judgment` instantiates the Anthropic SDK with your `apiKey` and sends the judgment body to a Claude model (`claude-sonnet-4-6`) for summarisation. The other eight tools hit only the public Find Case Law endpoints and need no key. The key is used in-process for the request and to namespace the cache; it is not persisted to disk.
:::

| Style | What you get |
|-------|--------------|
| `brief` | 3–4 sentences: the holding and a one-line reason |
| `detailed` | 300–500 words: holding, ratio decidendi, key facts, procedural history, with paragraph citations |
| `plain-english` | A non-lawyer explanation of what happened, what was decided, and why it matters day-to-day |

If the judgment has no XML body text, the tool reports that it cannot summarise without first extracting PDF text — run `extract_judgment_text` (or `download_judgment_pdf`) first.

```
Example: summarise_judgment(uri="uksc/2024/42", style="plain-english", apiKey="sk-ant-…")
```

## Court Codes

Court codes filter searches to a specific court or tribunal. Common values:

| Code | Court / Tribunal |
|------|------------------|
| `uksc` | UK Supreme Court |
| `ewca` | Court of Appeal (England & Wales) |
| `ewhc` | High Court (England & Wales) |
| `ewhc/pat` | High Court — Patents Court |
| `ukeat` | Employment Appeal Tribunal |
| `ukut` | Upper Tribunal |
| `ukftt` | First-tier Tribunal |

## Caching

The server keeps a tiered in-memory cache (max 500 entries, LRU eviction) so repeated lookups during a session do not re-hit Find Case Law.

| Data | TTL |
|------|-----|
| Search results (Atom feed) | 1 hour |
| Judgment lookups (`data.xml`) | 7 days |
| AI summaries | 30 days |

::: tip Cache Behaviour
Cache hits are logged to stderr as `[caselaw] Cache hit: <url>`. AI summaries are cached per `(uri, style, apiKey-hash)`, so a repeated summary request with the same key returns instantly without another model call. The cache is per server process and resets on restart.
:::

## Error Handling

| Scenario | Behaviour |
|----------|-----------|
| Judgment not found | Returns `Error: Not found: <url>` |
| Rate limited | Returns `Error: Rate limited (429) — try again in 5 minutes` |
| Network timeout | Returns `Error: Timeout fetching <url>` |
| HTTP error | Returns `Error: HTTP <status> fetching <url>` |
| PDF unavailable | `download_judgment_pdf` returns `Error: PDF not available for <uri>` |
| No machine-readable text | `extract_judgment_text` reports that XML, HTML, and PDF strategies all failed |

## Related

- [/legal caselaw](/cli/caselaw) — the CLI command that drives these tools to research and summarise judgments.
- [Lex Remote MCP Server](/mcp/lex-server) — a complementary remote server with 63,000+ judgments and semantic search; use it for AI-ranked case-law discovery alongside this local server's direct lookups.
- [UK Legislation MCP Server](/mcp/uk-legislation) — pairs with `get_judgments_for_section` to move from statute to the cases that have applied it. See also [/reference/legislation](/reference/legislation).
