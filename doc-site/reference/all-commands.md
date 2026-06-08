# Command Reference

<!-- GENERATED FROM registry/skill-registry.json. Run `npm run docs:generate` to update. -->

Complete reference for all 38 platform-neutral `/legal` commands in UK Legal Skills.

::: info
All command metadata on this page is generated from the canonical skill registry. Input can be a file path, pasted text, URL, comparison pair, or generation brief depending on the command.
:::

## Case Law (1 command)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal caselaw` | `legal-caselaw` | Search 63,000+ UK court judgments from Find Case Law (National Archives). Find cases by keyword, party name, judge, statute section, or citation. Open Justice Licence. | document/text/URL | `/caselaw live` | yes | no |

## Contract Analysis (7 commands)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal review` | `legal-review` | Full contract review with 5 parallel AI agents. Returns a Contract Safety Score (0-100), clause-by-clause analysis, and prioritised recommendations. | document/text/URL | `/review live` | yes | no |
| `/legal risks` | `legal-risks` | Deep risk analysis with severity scoring (1-10) for every clause. Estimates financial exposure in GBP. Identifies hidden risks like definition landmines and cross-reference traps. | document/text/URL | `/review live` | yes | no |
| `/legal compare` | `legal-compare` | Side-by-side comparison of two contract versions. Flags additions, removals, and dangerous changes with favourability analysis. | 2 documents | `/compare` | no | no |
| `/legal negotiate` | `legal-negotiate` | Generates specific counter-proposals with replacement language, talking points, and a ready-to-send email template for every unfavourable clause. | document/text/URL | `/review live` | yes | no |
| `/legal missing` | `legal-missing` | Finds protections that SHOULD be in the contract but aren't. Provides ready-to-insert clause language with urgency ratings. | document/text/URL | `/review live` | yes | no |
| `/legal plain` | `legal-plain` | Translates every clause from legalese into plain English anyone can understand. Includes a glossary of defined terms. | document/text/URL | `/review live` | yes | no |
| `/legal first-read` | `legal-first-read` | Senior Counsel triage. Fast (<15s) opinionated first read of a contract with a likelihood × severity matrix and a SIGN / NEGOTIATE / WALK verdict. Auto-classifies the contract type and routes RED tier to /legal review for the deep 5-agent analysis. | document/text/URL | `/review live` | yes | no |

## Property Law (1 command)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal property` | `legal-property` | UK property document analysis — leases, ASTs, commercial leases, freehold transfers, licences. Covers Housing Act 1988, LTA 1954, Renters' Rights Act 2025 commencement status, SDLT, deposit protection. | document/text/URL | `/review live` | yes | no |

## Document Generation (5 commands)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal nda` | `legal-nda` | Generates a custom NDA — mutual, one-way, employee, or vendor. Includes injunctive relief provisions and costs-follow-the-event clause. | generation | `/generate` | no | no |
| `/legal terms` | `legal-terms` | Generates terms of service by scanning what the website actually does. UK GDPR / DPA 2018 compliant with PECR cookie provisions. | generation | `/generate` | no | no |
| `/legal privacy` | `legal-privacy` | Generates a privacy policy by detecting what data the site collects. References ICO as supervisory authority, includes UK international data transfer mechanisms. | generation | `/generate` | no | no |
| `/legal agreement` | `legal-agreement` | Generates business agreements — freelancer contracts, partnerships, SOWs, MSAs, and more. IR35-aware contractor provisions. | generation | `/generate` | no | no |
| `/legal freelancer` | `legal-freelancer` | Specialised review from the freelancer's perspective. Flags common contractor traps, runs IR35 indicators, checks restrictive covenants. | document/text/URL | `/review live` | yes | no |

## Compliance & Reporting (4 commands)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal compliance` | `legal-compliance` | Compliance gap analysis across UK GDPR, DPA 2018, Equality Act 2010, PCI-DSS, PECR, Cyber Essentials, and ICO Age Appropriate Design Code. | document/text/URL | `/review live` | yes | no |
| `/legal report-pdf` | `legal-report-pdf` | Professional A4 PDF report with score gauges, risk charts, colour-coded tables, and prioritised action checklist. Client-ready output. | report | `/history` | no | no |
| `/legal legislation-tracker` | `legal-legislation-tracker` | Scans contracts for every statutory reference and flags outdated, amended, or repealed legislation. Catches contracts citing repealed Acts. | document/text/URL | `/review live` | yes | yes |
| `/legal pre-launch` | `legal-pre-launch` | Forward-looking UK regulatory gate for a product or feature about to ship. Maps the proposal against Online Safety Act 2023, UK GDPR / DPA 2018, EU AI Act exposure, FCA Consumer Duty, ICO Children's Code, ASA, and PECR with in-force checks. | document/text/URL | `/review live` | yes | yes |

## Employment & Corporate (4 commands)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal employment` | `legal-employment` | 4 parallel sub-agents analyse employment contracts against Employment Rights Act 2025 reforms with commencement checks, Equality Act 2010, and WTR 1998. | document/text/URL | `/review live` | yes | yes |
| `/legal corporate` | `legal-corporate` | 3 parallel sub-agents review corporate documents against Companies Act 2006 and ECCTA 2023. Director duties checklist (ss.171-177), PSC compliance, corporate criminal liability. | document/text/URL | `/review live` | yes | yes |
| `/legal aml` | `legal-aml` | AML/KYC compliance review against Money Laundering Regulations 2017, POCA 2002, SAMLA 2018, and SRA obligations. Gap analysis, risk classification, SAR procedure assessment. | document/text/URL | `/review live` | yes | no |
| `/legal ir35` | `legal-ir35` | Structured IR35 status determination using 7-factor HMRC CEST-aligned assessment. Inside/Outside/Borderline verdict with confidence percentage. | document/text/URL | `/review live` | yes | no |

## Consumer & ESG (3 commands)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal consumer` | `legal-consumer` | Consumer contract compliance against CRA 2015, DMCCA 2024, CCR 2013, UCTA 1977. Subscription regime checks, CMA enforcement risk with penalty exposure. | document/text/URL | `/review live` | yes | yes |
| `/legal esg` | `legal-esg` | ESG and sustainability compliance review. Modern Slavery Act s.54 statement audit, UK SRS readiness, climate disclosure gap analysis, supply chain risk. | document/text/URL | `/review live` | yes | no |
| `/legal dispute` | `legal-dispute` | Dispute resolution clause analysis. Pre-action protocol compliance, ADR enforceability, fixed recoverable costs band estimate, limitation period tracker. | document/text/URL | `/review live` | yes | no |

## Platform Tools (1 command)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal ai-compliance` | `legal-ai-compliance` | AI compliance self-assessment for law firms. SRA Standards alignment, UK AI principles, ICO AI guidance, EU AI Act exposure. Governance framework review. | document/text/URL | `/review live` | yes | no |

## Specialist (6 commands)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal gdpr` | `legal-gdpr` | In-depth UK GDPR, DPA 2018, and PECR compliance audit. Covers commenced and prospective Data (Use and Access) Act 2025 changes, ICO enforcement risk, transfers, DPIAs, and breach readiness. | document/text/URL | `/review live` | yes | yes |
| `/legal tenancy` | `legal-tenancy` | Tenancy agreement review against Housing Act 1988, Tenant Fees Act 2019, and Renters' Rights Act 2025 reforms with commencement and transitional checks. | document/text/URL | `/review live` | yes | yes |
| `/legal ip` | `legal-ip` | Intellectual property review — licence agreements, assignments, trade marks, patents, software licences. CDPA 1988, Patents Act 1977, AI-generated works analysis. | document/text/URL | `/review live` | yes | no |
| `/legal debt` | `legal-debt` | Debt recovery and enforcement analysis. Pre-action protocol compliance, limitation period checks, enforcement route recommendations, Late Payment of Commercial Debts Act 1998. | document/text/URL | `/review live` | yes | no |
| `/legal immigration` | `legal-immigration` | UK immigration and visa compliance review. Sponsor licence audits, Right to Work checks, Skilled Worker visa requirements, civil penalty exposure up to £60,000 per illegal worker. | document/text/URL | `/review live` | yes | no |
| `/legal wills` | `legal-wills` | Will and probate document review. Wills Act 1837 execution compliance, IHT planning (nil-rate bands, BPR, APR), Inheritance Act 1975 claim risk, LPA compliance. | document/text/URL | `/review live` | yes | no |

## Business Intelligence (5 commands)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal benchmark` | `legal-benchmark` | Compares every contract clause against England & Wales market-standard positions. 80+ clause benchmarks across 14 contract types. Favourability assessment. | document/text/URL | `/review live` | yes | no |
| `/legal due-diligence` | `legal-due-diligence` | M&A due diligence gap analysis. 60-item checklist across 8 categories (corporate, financial, commercial, employment, property, IP, regulatory, litigation). | document/text/URL | `/review live` | yes | no |
| `/legal board-pack` | `legal-board-pack` | Generates Companies Act compliant board documents — minutes, resolutions, written resolutions, conflict declarations, director appointments, dividends, share allotments. | generation | `/generate` | no | no |
| `/legal regulatory-calendar` | `legal-regulatory-calendar` | 12-month regulatory filing calendar based on company profile. Companies House, HMRC, ICO, FCA, SRA deadlines with penalties, advance warnings, and delegation matrix. | document/text/URL | `/review live` | yes | no |
| `/legal matter-brief` | `legal-matter-brief` | State-of-the-matter brief consolidating legal posture across all documents, prior reviews, deadlines, and outstanding redlines for a single matter. Designed for partner check-ins, client updates, and pre-meeting prep. | document/text/URL | `/review live` | yes | no |

## Utility (1 command)

| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |
|---------|----------|-------------|-------|-------|:-----------:|:------------------:|
| `/legal fetch-samples` | `legal-fetch-samples` | Finds and catalogues public UK legal sample documents from official or licence-compatible sources for testing and demonstration. | utility | `/skills` | no | no |

## Quick Reference

### Case Law
- `/legal caselaw` — Case Law Search

### Contract Analysis
- `/legal review` — Contract Review
- `/legal risks` — Risk Analysis
- `/legal compare` — Contract Compare
- `/legal negotiate` — Negotiate
- `/legal missing` — Missing Protections
- `/legal plain` — Plain English
- `/legal first-read` — First Read

### Property Law
- `/legal property` — Property Law

### Document Generation
- `/legal nda` — NDA Generator
- `/legal terms` — Terms of Service
- `/legal privacy` — Privacy Policy
- `/legal agreement` — Agreement Generator
- `/legal freelancer` — Freelancer Review

### Compliance & Reporting
- `/legal compliance` — Compliance Audit
- `/legal report-pdf` — PDF Report
- `/legal legislation-tracker` — Legislation Tracker
- `/legal pre-launch` — Pre-Launch Counsel

### Employment & Corporate
- `/legal employment` — Employment Review
- `/legal corporate` — Corporate Review
- `/legal aml` — AML Compliance
- `/legal ir35` — IR35 Assessment

### Consumer & ESG
- `/legal consumer` — Consumer Compliance
- `/legal esg` — ESG Compliance
- `/legal dispute` — Dispute Resolution

### Platform Tools
- `/legal ai-compliance` — AI Compliance

### Specialist
- `/legal gdpr` — GDPR Deep-Dive
- `/legal tenancy` — Tenancy Review
- `/legal ip` — IP Review
- `/legal debt` — Debt Recovery
- `/legal immigration` — Immigration Compliance
- `/legal wills` — Wills & Probate

### Business Intelligence
- `/legal benchmark` — Benchmark
- `/legal due-diligence` — Due Diligence
- `/legal board-pack` — Board Pack
- `/legal regulatory-calendar` — Regulatory Calendar
- `/legal matter-brief` — Matter Brief

### Utility
- `/legal fetch-samples` — Fetch Samples

## Command Count by Category

| Category | Commands |
|----------|:--------:|
| Case Law | 1 |
| Contract Analysis | 7 |
| Property Law | 1 |
| Document Generation | 5 |
| Compliance & Reporting | 4 |
| Employment & Corporate | 4 |
| Consumer & ESG | 3 |
| Platform Tools | 1 |
| Specialist | 6 |
| Business Intelligence | 5 |
| Utility | 1 |
| **Total** | **38** |

