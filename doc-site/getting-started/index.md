# Overview

**uk-legal-skills** is a junior counsel in your pocket — a quiet legal assistant that has read every Act of Parliament for England & Wales, works 24/7 and never gets tired. It analyses your legal documents — contracts, employment agreements, property leases, privacy policies — and tells you exactly where the risks are, what is missing, and what to change.

Whether you are a freelancer checking an IR35 clause, a landlord reviewing a tenancy agreement, or a small business owner who just received a 40-page supplier contract, it gives you the same quality of first-pass analysis that a City law firm charges hundreds of pounds an hour for.

This repository is **open source** and contains the legal skills, agents, and MCP servers only:

- **38 skills** — commands you run inside Claude Code or another compatible agent host as `/legal <command>`. They are self-contained Markdown prompts; no runtime code, no shared library.
- **12 agents** — parallel analysis agents that the `review`, `employment`, and `corporate` orchestrators launch to divide work the way a legal team would.
- **MCP servers** — `uk-legislation` and `caselaw`, which query the public government legal data APIs (legislation.gov.uk and the National Archives caselaw service) so every analysis references the law as it stands today.

Everything is scoped to the laws of **England & Wales** only.

::: tip Want a hosted, no-install version?
A separate hosted web product, **The Counsel**, is built on these skills. You can try it at [the-counsel.co.uk](https://the-counsel.co.uk). It is a distinct product and is not part of this repository.
:::

## Installing

Install the skills into `~/.claude/` with the bundled installer:

```bash
git clone https://github.com/davendra/uk-legal-skills.git
cd uk-legal-skills
./install.sh
```

This copies the orchestrator, all 38 command skills, and the 12 agents into `~/.claude/skills/` and `~/.claude/agents/`. After installing, open your agent host and type `/legal` to see the full command menu. See [Installation](./installation) for the one-line installer, building the MCP servers, and uninstalling.

## What Can It Actually Do?

Here is what the skills can do for you, in plain English:

- **Review any contract and score it 0--100 for risk** — employment contracts, supplier agreements, NDAs, freelancer terms, you name it
- **Check employment contracts** against the latest 2025 employment law changes, including the Employment Rights Bill reforms
- **Tell you if a contractor arrangement is inside or outside IR35** — with specific reasons and evidence
- **Generate NDAs, privacy policies, and terms of service** from scratch, tailored to England & Wales law
- **Compare two versions of a contract** and highlight exactly what changed between drafts
- **Audit your website for GDPR compliance** — consent mechanisms, data processing, privacy notices
- **Analyse tenancy agreements** against the new Renters' Rights Act 2025, flagging unfair terms and missing protections
- **Review commercial leases** clause by clause, checking break clauses, rent review mechanisms, and repair obligations
- **Review wills** for inheritance tax planning opportunities and missing provisions
- **Check corporate compliance** — Companies Act duties, board governance, filing obligations
- **Assess IP protection** — patent, trademark, and copyright issues in your agreements
- **Run AML and immigration compliance checks** for regulated businesses
- And **25+ more specialist analyses** covering consumer rights, ESG reporting, dispute resolution, debt recovery, and more

## How Accurate Is It?

This is AI analysis, not legal advice. Think of it as a highly informed first pass that catches the vast majority of issues a solicitor would flag. It is designed to save you time and money by identifying risks early — not to replace professional legal counsel for final decisions.

In practice, it is excellent at:
- Spotting missing clauses that should be in a standard contract
- Identifying one-sided terms that favour the other party
- Flagging regulatory compliance gaps (GDPR, employment law, consumer protection)
- Translating legal jargon into plain English so you understand what you are agreeing to

Where you should still consult a solicitor:
- Final sign-off on high-value contracts
- Complex multi-jurisdictional arrangements
- Litigation strategy and court proceedings
- Tax structuring and estate planning beyond initial analysis

The tool is honest about its limitations. Every report starts with a clear disclaimer that the analysis is AI-generated and not a substitute for professional legal advice.

## Who is it for?

- **Freelancers and contractors** reviewing their own service agreements and IR35 status
- **Small businesses** that need NDAs, terms of service, privacy policies, or compliance audits without the cost of a solicitor for the first pass
- **Property professionals** analysing leases, tenancy agreements, and conveyancing documents
- **In-house legal teams** using AI as a triage tool to prioritise solicitor time on the highest-risk issues
- **Legal tech agencies** integrating AI-assisted analysis into client workflows
- **Developers** building on top of the skill system or contributing new legal domains

## Key capabilities

### Multi-agent contract review

The flagship `/legal review` command launches **five parallel agents** that each focus on a different dimension of a contract — the same way a legal team would divide work among specialists:

| Agent | What it checks |
|-------|-------|
| Clauses | Every clause reviewed individually for risk, fairness, and completeness |
| Risks | How severe are the risks? What is your financial and legal exposure? |
| Compliance | Does the contract meet regulatory and statutory requirements? |
| Terms | Are definitions clear? Is the language consistent? Are there ambiguities? |
| Recommendations | Specific, actionable suggestions for what to change and why |

Results are aggregated into a **Contract Safety Score** (0--100) using weighted scoring (20/25/20/15/20). A score below 50 means you should think twice before signing without professional advice.

Two additional orchestrators cover specialist areas:

- **Employment review** — 4 parallel agents (contract, rights, discrimination, obligations)
- **Corporate review** — 3 parallel agents (compliance, documents, risk)

### 38 skills across 11 categories

| Category | Skills |
|----------|--------|
| Contract analysis | first-read, review, risks, compare, plain, negotiate, missing, benchmark |
| Property | property, tenancy |
| Employment & corporate | employment, corporate, ir35, aml, immigration |
| Document generation | nda, terms, privacy, agreement, freelancer, board-pack |
| Compliance & reporting | compliance, gdpr, consumer, esg, ai-compliance, legislation-tracker, regulatory-calendar, pre-launch, report-pdf |
| Matter management | matter-brief |
| Specialist | dispute, due-diligence, ip, debt, wills |
| Utility | fetch-samples |

The canonical catalogue lives in `registry/skill-registry.json`.

### Live legislation lookup

The MCP servers connect to **legislation.gov.uk** and a corpus of **63,000+ court cases** for real-time statute search, amendment checking, and in-force verification. This means every analysis references the law as it stands today, not a snapshot from months ago. These servers query public government APIs and need no API key.

## Jurisdiction

::: warning England & Wales only
All analysis, statute references, and generated documents are scoped to the laws of **England & Wales**. Scottish law, Northern Irish law, and other jurisdictions are not covered.
:::

## Important disclaimer

::: tip AI analysis, not legal advice
The skills produce AI-generated legal analysis as a **starting point** for review. It does not constitute legal advice and is not a substitute for qualified counsel. Always consult a qualified solicitor before signing contracts or relying on generated legal documents.
:::

## Next steps

- [Requirements](./requirements) — what you need before installing
- [Installation](./installation) — how to install the skills and build the MCP servers
- [Quick Start](./quick-start) — get your first review in 60 seconds
