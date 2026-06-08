# FAQ

Quick answers to the questions that come up most often when running UK Legal Skills — what you need to install, what the skills are (and are not), which hosts they run in, and where to get help. Everything here is **England & Wales only**.

::: warning Not legal advice
Every `/legal` command produces AI-generated legal *analysis* and *drafting*, intended as a starting point. It is **not** a substitute for a qualified solicitor. Always have a solicitor review before you sign a contract or rely on a generated document.
:::

---

## Do I need an API key?

No — not for the `/legal` commands. Each skill is a self-contained Markdown prompt with no runtime, no SDK, and no key baked in. The agent host (Claude Code, Codex, or another compatible host) provides the model access, reads the skill, and runs it using its own capabilities.

The two local MCP servers (`uk-legislation` and `caselaw`) also need **no API key** — they query public government APIs at [legislation.gov.uk](https://www.legislation.gov.uk) and [caselaw.nationalarchives.gov.uk](https://caselaw.nationalarchives.gov.uk). They need only a one-time TypeScript build (`npm install && npm run build`). The remote `lex` server is reached over HTTP and likewise needs no key from you. See [Live UK legal data (MCP)](#how-are-the-mcp-servers-used) below.

---

## Is this legal advice?

No. It is AI-generated **analysis and drafting** to use as a starting point — not advice you can rely on, and not a substitute for a solicitor. Every output begins with a standard disclaimer block (AI-generated, not legal advice, consult a solicitor, England & Wales only) that the skills treat as load-bearing. Always have a qualified solicitor review before you sign or rely on anything.

---

## Does it cover Scotland or Northern Ireland?

No — **England & Wales only**, by design. Scots law and Northern Irish law are out of scope. The statutes, section numbers, limitation periods, court procedure, and market standards baked into every skill are all E&W-specific, so applying them to a Scottish or NI matter would give you the wrong answer. See the [UK Legislation reference](/reference/legislation) for the statutes the skills work against.

---

## How does it stay current with new legislation?

Through **live in-force checks**, not a hardcoded snapshot. Post-2024 reforms move fast, so the commencement-aware skills (`employment`, `tenancy`, `gdpr`, `consumer`, `corporate`, `legislation-tracker`, `pre-launch`) call the `uk-legislation` MCP server before treating any reform as binding — classifying every cited provision as 🟢 current, 🟡 transitional/prospective, or 🔴 repealed, and flagging anything not yet commenced.

That matters for fast-moving reforms such as the **Employment Rights Act 2025**, the **Renters' Rights Act 2025**, and the **Data (Use and Access) Act 2025**: the skill never asserts a provision is binding until it confirms what is *actually in force* on the day you run it, and reports the rest as phased in / awaiting commencement. The `/legal legislation-tracker` command does the same in reverse — it scans a document you give it for outdated, amended, or repealed references.

---

## Can I add my own skill?

Yes. The skills are designed to be forked. The shape of the change is:

1. Add a new `skills/legal-<id>/SKILL.md` — a self-contained Markdown prompt that starts with the disclaimer block and pins jurisdiction to England & Wales.
2. Wire it into the `/legal` router (`legal/SKILL.md`) and the canonical catalogue (`registry/skill-registry.json`).
3. Run `npm run test:skills` — the parity guard that keeps the 38 skills, 12 agents, router, registry, and docs in lockstep. It must pass before your change is accepted.

See `CONTRIBUTING.md` in the repository for the full walkthrough. The golden rules are: England & Wales only, every output starts with the disclaimer block, risk indicators are 🔴/🟡/🟢, and the parity guard must pass.

---

## What input formats are supported?

Input is always one of **three shapes** — preserve this trichotomy whatever you feed in:

| Input | How you give it | How the skill reads it |
|-------|-----------------|------------------------|
| **File path** | `/legal review ./lease.docx` | The host's file-reading tool (the Read tool in Claude Code) |
| **Pasted text** | Paste the contract text straight into the chat | Read directly from the message |
| **URL** | `/legal compliance https://example.com` | The host's web-fetch tool (WebFetch in Claude Code) |

For files, the skills ingest **PDF, DOCX, and TXT**. Scanned or image-only PDFs fall back to text extraction via the bundled ingestion helpers (`scripts/markitdown_extract.py` and `scripts/preprocess_document.py`), which convert PDF / DOCX / TXT — and several other office formats — into structured Markdown the model can read. Generation commands such as `/legal nda` and `/legal terms` take a short description or a URL rather than a document.

Commands that generate documents (`nda`, `terms`, `privacy`, `agreement`, `board-pack`) and the calendar/profile commands (`regulatory-calendar`) accept a **pasted description** in place of a file. URL commands (`compliance`, `terms`, `privacy`) expect a live website to scan.

---

## Which hosts does it run in?

Any agent host that can read a Markdown skill and use its own tools to run it. The skills are deliberately **platform-neutral** — they do not assume a single vendor's tools, and tell the host to use whatever equivalent it has for reading files, fetching URLs, launching subagents, saving files, and calling MCP.

- **[Claude Code](https://claude.com/claude-code)** — the primary host. `install.sh` copies the router, all 38 skills, 12 agents, ingestion/PDF scripts, and the contract template into `~/.claude/`. This is the path the [Getting Started](/getting-started/) guide walks through.
- **OpenAI Codex CLI** — the skills are designed to run unchanged; the host reads each `SKILL.md` and executes it with its own capabilities.
- **Other compatible agent hosts** — anything that can read the skill prompt and provide file-read, web-fetch, subagent, and MCP equivalents.

Where a host lacks a capability (no subagents, no MCP), the skill is written to state the limitation and continue with the best available evidence rather than failing.

---

## How are the MCP servers used?

Skills that need current law call three [Model Context Protocol](https://modelcontextprotocol.io) servers, registered in the repo's `.mcp.json`. They turn the skills from a static prompt into a tool grounded in the live statute book and case law as it stands the morning you run it:

| Server | Source | What it provides |
|--------|--------|------------------|
| `uk-legislation` | legislation.gov.uk (OGL v3.0) | `search_legislation`, `lookup_statute`, `lookup_section`, `check_in_force`, `check_amendments`, `get_extent` — the live in-force and amendment checks behind every commencement-aware skill |
| `caselaw` | caselaw.nationalarchives.gov.uk (Open Justice Licence) | `search_caselaw`, `lookup_judgment`, `summarise_judgment`, `get_judgments_for_section`, plus search-by-judge / party — powers [`/legal caselaw`](/cli/caselaw) |
| `lex` | Remote HTTP, semantic search over 63,000+ judgments | Complements the local `caselaw` server with semantic retrieval |

The two local servers are TypeScript and need a one-time build (no key — they hit public government APIs):

```bash
cd mcp-servers/uk-legislation && npm install && npm run build
cd ../caselaw && npm install && npm run build
```

When a commencement-aware skill runs, it queries `check_in_force` / `check_amendments` before treating any reform as binding. Read more on the [MCP servers overview](/mcp/), the [UK Legislation server](/mcp/uk-legislation), and the [Lex server](/mcp/lex-server).

---

## Where do I get help?

- **[Getting Started](/getting-started/)** — installation, requirements, and a quick-start walkthrough.
- **[CLI command reference](/cli/)** — every `/legal` command, what it analyses, and the report it produces.
- **[All Commands](/reference/all-commands)** — the complete generated catalogue of all 38 commands.
- **[UK Legislation reference](/reference/legislation)** — the statutes the skills work against.
- **[The Counsel](https://the-counsel.co.uk)** — prefer a polished web app to the terminal? The hosted version is built on these same skills, with document upload, live streaming analysis, audio briefings, tracked-changes export, and matter management in the browser. It is a separately deployed product; the open-source repo here is the underlying skills engine.

---

## Related commands

- [/legal caselaw](/cli/caselaw) — search 63,000+ UK judgments via the `caselaw` and `lex` MCP servers
- [/legal legislation-tracker](/cli/compliance) — flag outdated, amended, or repealed statutory references
- [/legal review](/cli/contract-analysis) — the flagship five-agent contract review with a Safety Score
- [/legal report-pdf](/cli/utilities) — turn any analysis into a client-ready A4 PDF
