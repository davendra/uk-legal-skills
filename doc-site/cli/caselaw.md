# Case Law

Reviewing a contract or drafting an argument is only half the job -- you also need to know what the courts have actually said. This command puts the National Archives' Find Case Law service on the command line: search, retrieve, and summarise reported judgments without leaving Claude Code.

One command, `/legal caselaw`, fronts the **`caselaw` MCP server** registered in `.mcp.json`. It reaches **63,000+ judgments** published at [caselaw.nationalarchives.gov.uk](https://caselaw.nationalarchives.gov.uk), all released under the **Open Justice Licence** (free commercial reuse). Results are England and Wales judgments from the Supreme Court down through the tribunals.

## /legal caselaw

Search, retrieve, and summarise UK case law from Find Case Law (National Archives).

**Why use this?** You have found a clause, a statute, or a party name and you want to know whether a court has ruled on it. This command searches 63,000+ reported judgments, pulls the full text or metadata of any one of them, and -- when you ask -- produces a plain-English or detailed summary so you do not have to read forty pages of judgment to find the ratio.

### Syntax

```bash
/legal caselaw <query>
```

The positional argument is a free-text search query by default, or a judgment URI when a per-judgment flag (`--lookup`, `--download`, `--summarise`) is present.

### Search modes

The skill maps each flag to a single MCP tool. When more than one flag is present, the most specific wins (download → summarise → lookup → statute section → recent → party → judge → free-text query).

| Mode | Invocation | Tool called |
|------|-----------|-------------|
| **Keyword** | `/legal caselaw constructive dismissal` | `search_caselaw(query, court?, limit?)` |
| **By court** | `/legal caselaw --court ewca repudiatory breach` | `search_caselaw` with court filter |
| **By party** | `/legal caselaw --party "Polkey"` | `search_by_party(party_name, court?, limit?)` |
| **By judge** | `/legal caselaw --judge "Lord Hoffmann"` | `search_by_judge(judge_name, court?, limit?)` |
| **By statute section** | `/legal caselaw --statute ukpga/1996/18 --section 94` | `get_judgments_for_section(legislation_id, section_number)` |
| **Recent** | `/legal caselaw --recent --court uksc` | `get_recent_judgments(court?, limit?)` |
| **Lookup** | `/legal caselaw --lookup uksc/2024/42` | `lookup_judgment(uri)` |
| **Extract** | `/legal caselaw --lookup uksc/2024/42` (body text) | `extract_judgment_text(uri)` |
| **Download** | `/legal caselaw --download uksc/2024/42` | `download_judgment_pdf(uri, output_path?)` |
| **Summarise** | `/legal caselaw --summarise uksc/2024/42` | `summarise_judgment(uri, style?, apiKey)` |

::: tip Search by statute section
The statute-section mode is the bridge between legislation and case law. Give it a legislation ID and a section number -- e.g. `ukpga/1996/18` (Employment Rights Act 1996) section 94 -- and it fetches the Act's title from legislation.gov.uk, builds a full-title search and a short-name search (e.g. *ERA 1996 s.94*), runs both, and deduplicates the results. It is the fastest way to find the cases that interpret a provision you have just looked up.
:::

### Court codes

Filter any search with `--court <code>`. The common codes:

| Code | Court |
|------|-------|
| `uksc` | UK Supreme Court |
| `ewca` | Court of Appeal (England and Wales) |
| `ewhc` | High Court (England and Wales) |
| `ukeat` | Employment Appeal Tribunal |
| `ukut` | Upper Tribunal |
| `ukftt` | First-tier Tribunal |
| `ukpc` | Privy Council |
| `ewfc` | Family Court |

Sub-courts narrow it further: `ewca/civ`, `ewca/crim`, `ewhc/pat`, `ewhc/ch`, `ewhc/fam`, `ewhc/kb`, `ewhc/admin`.

### Per-judgment tools

Once a search has given you a URI, four tools work on a single judgment:

| Tool | What it returns |
|------|-----------------|
| **`lookup_judgment`** | Full metadata -- neutral citation, court, date, judges, parties -- plus the body text where a machine-readable version exists |
| **`extract_judgment_text`** | The body as structured Markdown, trying XML first, then HTML, then the PDF, so even PDF-only judgments are retrievable |
| **`download_judgment_pdf`** | Saves the official PDF to your working directory and returns the local path |
| **`summarise_judgment`** | An AI summary in one of three styles |

#### Summary styles

```bash
/legal caselaw --summarise uksc/2024/42 --format detailed
```

| Style | Length | Focus |
|-------|--------|-------|
| `brief` (default) | 3--4 sentences | The holding and the one-line reason |
| `detailed` | 300--500 words | Holding, ratio decidendi, key facts, procedural history, with paragraph references |
| `plain-english` | Variable | What happened, what the court decided, and why it matters day-to-day, with jargon defined |

::: warning Summaries need a model-provider key
`--summarise` is the only mode that calls a language model. The skill uses the host's configured provider; if a key is required and you have not supplied one for the session, it will ask. The key is held in memory for the conversation only and is never written to disk.
:::

### Output

Searches and lookups render the MCP tool's Markdown output verbatim, beneath the standard AI-generated legal disclaimer. When you save a research session to a file, the convention from `legal/SKILL.md` applies:

`CASELAW-RESEARCH-[query]-[date].md`

Downloaded judgments are written to the working directory as `[uri-slug].pdf` (or the path you pass to `--download`).

::: tip Open Justice Licence
Every judgment returned comes from the National Archives' Find Case Law service and is licensed under the [Open Justice Licence](https://caselaw.nationalarchives.gov.uk/open-justice-licence). That permits free reuse, including commercial reuse, provided you do not use the data to identify or profile individuals or to imply official endorsement. The skill cites neutral citations and URIs so you can always trace a result back to the authoritative source.
:::

::: warning Verify before you rely
Case-law results are AI-retrieved. Always confirm a neutral citation against the official record, check whether a judgment has been appealed or overruled, and consult a qualified solicitor before relying on any authority. England and Wales jurisdiction only -- Scottish and Northern Irish judgments are out of scope.
:::

## Related commands

- [/legal review](/cli/contract-analysis) -- the flagship contract review; reach for `/legal caselaw` when a flagged clause needs supporting or adverse authority.
- [/legal legislation-tracker](/cli/compliance) -- audits a document's statutory references for currency; pair it with the `--statute … --section` search to find the cases that interpret each provision. See also the [legislation reference](/reference/legislation).
- [caselaw MCP server](/mcp/caselaw) -- the nine tools behind this command, for direct use in your own agents.
- [lex MCP server](/mcp/lex-server) -- semantic search over the same judgment corpus; complements the keyword search here when you need conceptual rather than literal matches.
