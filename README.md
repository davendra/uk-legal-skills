# UK Legal Skills

**38 legal skills, 12 agents, and live access to the entirety of England & Wales statute and case law — installed straight into [Claude Code](https://claude.com/claude-code) as `/legal` commands.**

Review a contract, generate an NDA, run a GDPR audit, search 63,000+ court judgments, or produce a client-ready PDF — all from your terminal, all grounded in current England & Wales law.

> **⚠️ Not legal advice.** Everything here is AI-generated legal *analysis* and *drafting*, intended as a starting point. It is **not** a substitute for a qualified solicitor, and it covers **England & Wales only**. Always have a solicitor review before you sign a contract or rely on a generated document.

---

## Hosted version — The Counsel

Prefer a polished web app to the terminal? **[The Counsel](https://the-counsel.co.uk)** is a hosted product built on these same skills — document upload, live streaming analysis, audio briefings, tracked-changes export, and matter management in the browser. This repository is the open-source skills engine; The Counsel is a separate, independently deployed product. Use whichever fits your workflow.

---

## Quick start

You need [Claude Code](https://docs.claude.com/en/docs/claude-code) installed. Then:

```bash
# One-line install (clones this repo and copies the skills into ~/.claude/)
curl -fsSL https://raw.githubusercontent.com/davendra/uk-legal-skills/main/install.sh | bash
```

or from a local clone:

```bash
git clone https://github.com/davendra/uk-legal-skills.git
cd uk-legal-skills
./install.sh
```

The installer copies the `/legal` router, all 38 skills, 12 agents, the PDF/ingestion helper scripts, and the contract template into `~/.claude/`. Restart Claude Code, then try:

```
/legal                     # show the full command menu
/legal first-read nda.pdf  # 15-second Senior Counsel triage: SIGN / NEGOTIATE / WALK
/legal review lease.docx   # full 5-agent contract review with a Safety Score
/legal caselaw "unfair dismissal whistleblowing"
```

Input is always one of three shapes: a **file path**, **pasted text**, or a **URL**.

To remove everything: `./uninstall.sh`.

---

## The 38 commands

| Command | What it does |
|---------|--------------|
| **Case Law** | |
| `/legal caselaw <query>` | Search 63,000+ UK judgments from Find Case Law (National Archives) by keyword, party, judge, statute section, or citation |
| **Contract Analysis** | |
| `/legal first-read <file>` | Senior Counsel triage — a fast (<15s) SIGN / NEGOTIATE / WALK verdict with a severity × likelihood matrix |
| `/legal review <file>` | Flagship full review — **5 parallel agents** → a 0–100 Contract Safety Score, clause-by-clause analysis, prioritised fixes |
| `/legal risks <file>` | Deep risk scoring (1–10 per clause) with estimated GBP exposure and hidden-risk detection |
| `/legal compare <file1> <file2>` | Side-by-side diff of two versions, flagging dangerous changes with favourability analysis |
| `/legal plain <file>` | Translate every clause from legalese into plain English, with a glossary |
| `/legal negotiate <file>` | Counter-proposals with replacement language, talking points, and a ready-to-send email |
| `/legal missing <file>` | Find protections that *should* be in the contract but aren't, with insert-ready clauses |
| **Property** | |
| `/legal property <file>` | Leases, ASTs, commercial leases, transfers — Housing Act 1988, LTA 1954, Renters' Rights Act 2025 status, SDLT, deposits |
| `/legal tenancy <file>` | Tenancy review against Housing Act 1988, Tenant Fees Act 2019, and Renters' Rights Act 2025 with commencement checks |
| **Document Generation** | |
| `/legal nda <description>` | Generate a custom NDA — mutual, one-way, employee, or vendor |
| `/legal terms <url>` | Generate UK GDPR / PECR-compliant terms of service by scanning what the site does |
| `/legal privacy <url>` | Generate a privacy policy from detected data collection, referencing the ICO |
| `/legal agreement <type>` | Freelancer contracts, partnerships, SOWs, MSAs — with IR35-aware contractor provisions |
| `/legal freelancer <file>` | Review from the freelancer's perspective: contractor traps, IR35 indicators, restrictive covenants |
| **Employment & Corporate** | |
| `/legal employment <file>` | Employment review — **4 parallel agents** against ERA 2025 reforms, Equality Act 2010, WTR 1998 |
| `/legal corporate <file>` | Corporate review — **3 parallel agents** against Companies Act 2006 and ECCTA 2023 |
| `/legal ir35 <file>` | IR35 status determination — 7-factor HMRC CEST-aligned assessment with a confidence score |
| `/legal aml <file>` | AML/KYC review against MLR 2017, POCA 2002, SAMLA 2018, and SRA obligations |
| **Compliance & Reporting** | |
| `/legal compliance <url>` | Gap analysis across UK GDPR, DPA 2018, Equality Act 2010, PCI-DSS, PECR, Cyber Essentials |
| `/legal legislation-tracker <file>` | Scan for statutory references and flag outdated, amended, or repealed legislation |
| `/legal pre-launch <product>` | Forward-looking regulatory gate — Online Safety Act, UK GDPR, EU AI Act, FCA Consumer Duty, ICO Children's Code, ASA, PECR |
| `/legal report-pdf` | Client-ready A4 PDF with score gauges, risk charts, and a prioritised action checklist |
| **Consumer & ESG** | |
| `/legal consumer <file>` | Consumer compliance against CRA 2015, DMCCA 2024, CCR 2013, UCTA 1977 with CMA enforcement risk |
| `/legal esg <file>` | ESG review — Modern Slavery Act s.54 audit, UK SRS readiness, climate disclosure gaps |
| `/legal dispute <file>` | Dispute clauses — pre-action protocol, ADR enforceability, fixed recoverable costs, limitation tracker |
| **Specialist** | |
| `/legal gdpr <file>` | In-depth UK GDPR / DPA 2018 / PECR audit, including Data (Use and Access) Act 2025 status |
| `/legal ip <file>` | IP review — licences, assignments, trade marks, patents, CDPA 1988, AI-generated works |
| `/legal debt <file>` | Debt recovery — pre-action protocol, limitation, enforcement routes, Late Payment Act 1998 |
| `/legal immigration <file>` | Sponsor licence audits, Right to Work checks, Skilled Worker requirements, civil penalty exposure |
| `/legal wills <file>` | Wills & probate — Wills Act 1837 execution, IHT planning, Inheritance Act 1975 claim risk, LPAs |
| **Business Intelligence** | |
| `/legal benchmark <file>` | Benchmark every clause against England & Wales market standards (80+ benchmarks, 14 contract types) |
| `/legal due-diligence <file>` | M&A due diligence — 60-item checklist across 8 categories |
| `/legal board-pack <details>` | Companies Act-compliant minutes, resolutions, declarations, appointments, dividends |
| `/legal regulatory-calendar` | 12-month filing calendar — Companies House, HMRC, ICO, FCA, SRA deadlines and penalties |
| `/legal matter-brief <matter>` | State-of-the-matter brief consolidating documents, prior reviews, deadlines, and next move |
| **Platform Tools** | |
| `/legal ai-compliance <file>` | AI compliance self-assessment for law firms — SRA Standards, UK AI principles, ICO guidance, EU AI Act |
| **Utility** | |
| `/legal fetch-samples` | Find and catalogue public UK legal sample documents for testing |

The canonical, always-current command table is generated from [`registry/skill-registry.json`](registry/skill-registry.json) into [`doc-site/reference/all-commands.md`](doc-site/reference/all-commands.md).

---

## How it works

Each skill is a **self-contained Markdown prompt** — there is no runtime, no SDK, and no API key baked in. The host agent (Claude Code) reads the skill and executes it. That makes the skills portable, auditable, and easy to fork.

Three commands are **orchestrators** that fan out to parallel subagents and then aggregate weighted scores:

| Orchestrator | Subagents | Aggregation |
|--------------|-----------|-------------|
| `/legal review` | `legal-clauses`, `legal-risks`, `legal-compliance`, `legal-terms`, `legal-recommendations` | Weighted 20/25/20/15/20 → Contract Safety Score |
| `/legal employment` | `legal-employment-contract`, `-rights`, `-discrimination`, `-obligations` | Equal weights |
| `/legal corporate` | `legal-corporate-compliance`, `-documents`, `-risk` | Weighted 35/35/30 |

The remaining agents in `agents/` back individual skills. When a subagent's output contract changes, the aggregation step in its parent orchestrator must change with it.

---

## Live UK legal data (MCP servers)

Skills that need current law call three [Model Context Protocol](https://modelcontextprotocol.io) servers, registered in [`.mcp.json`](.mcp.json):

| Server | Source | Tools |
|--------|--------|-------|
| `uk-legislation` | legislation.gov.uk (Open Government Licence) | `search_legislation`, `lookup_statute`, `lookup_section`, `check_in_force`, `check_amendments`, `get_extent` |
| `caselaw` | caselaw.nationalarchives.gov.uk (Open Justice Licence) | `search_caselaw`, `lookup_judgment`, `summarise_judgment`, `get_judgments_for_section`, search-by-judge / party |
| `lex` | Remote HTTP — 63,000 judgments with semantic search | complements the local `caselaw` server |

The two local servers are TypeScript and need a one-time build:

```bash
cd mcp-servers/uk-legislation && npm install && npm run build
cd ../caselaw && npm install && npm run build
```

Neither local server requires an API key — they query public government APIs. The commencement-aware skills (`employment`, `tenancy`, `gdpr`, `consumer`, `corporate`, `legislation-tracker`) run live in-force checks through these tools before stating whether a post-2024 reform is binding.

---

## Repository layout

```
legal/SKILL.md         # the /legal router — the entry point
skills/legal-*/         # 38 self-contained skill prompts
agents/legal-*.md       # 12 subagent prompts (orchestrator workers + specialists)
mcp-servers/            # uk-legislation and caselaw MCP servers (TypeScript)
scripts/                # PDF generation, document ingestion, and audit/parity scripts
templates/              # contract template copied into ~/.claude on install
registry/               # skill-registry.json — the canonical command catalogue
samples/                # synthetic sample documents for testing
evaluation/             # expected-findings corpus + scorer
doc-site/               # VitePress documentation site
install.sh / uninstall.sh
```

---

## Development & tests

The repo ships a small audit suite that keeps the skills, agents, router, registry, and docs in lockstep (run with Node 18+):

```bash
npm run test:skills        # 38-skill ↔ 12-agent ↔ router ↔ registry parity guard
npm run test:docs          # regenerates the command reference and checks docs parity
npm run test:evaluations   # validates the expected-findings eval corpus
npm run docs:generate      # rebuild doc-site/reference/all-commands.md from the registry
```

The MCP servers have their own `node --test` suites: `cd mcp-servers/<server> && npm test`.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to add a skill.

---

## Disclaimer

```
AI-Generated Legal Analysis — This output is produced by AI and does not constitute legal advice.
It is intended as a starting point for review. Always consult a qualified solicitor before
signing contracts or relying on generated legal documents. This tool is designed for use
under the laws of England and Wales.
```

Scots law and Northern Irish law are out of scope.

---

## License

[MIT](LICENSE) — use it commercially, fork it, build on it. Attribution appreciated.
