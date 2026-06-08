# CLI Commands

These are the commands you can run inside Claude Code, Codex, or another compatible agent host to analyse legal documents. Think of each command as a specialist who knows one area of law inside out — you give them a document, they give you back a detailed analysis with risk scores, recommendations, and specific language you can use.

UK Legal Skills provides **38 commands** that run inside any compatible agent host as skills. Every command is invoked with the `/legal` prefix.

![The instrument (broadsheet rebrand) — 38 skills across 10 parts](/images/skill-categories-2026.jpg)

*Plate I — the broadsheet rebrand.*

![38 skills across 10 legal categories](/images/skill-categories.jpg)

*Plate I.a — the original, kept for reference.*

## Which Command Do I Need?

Not sure where to start? Find your situation below:

| I need to... | Command |
|--------------|---------|
| Review a contract before signing | `/legal review` |
| Know what risks are in my contract | `/legal risks` |
| Check my freelancer contract | `/legal freelancer` |
| Check if a contractor is inside IR35 | `/legal ir35` |
| Compare two versions of a contract | `/legal compare` |
| Get an NDA quickly | `/legal nda` |
| Check my website is GDPR compliant | `/legal compliance` or `/legal gdpr` |
| Review my tenancy agreement (landlord or tenant) | `/legal tenancy` |
| Review a will | `/legal wills` |
| Check a property lease | `/legal property` |
| Recover a debt | `/legal debt` |
| Check employment law compliance | `/legal employment` |

![CLI workflow (broadsheet rebrand) — install, invoke, ingest, analyse, deliver](/images/cli-workflow-2026.jpg)

*Plate I — the broadsheet rebrand.*

![CLI workflow — three input methods converge into AI analysis](/images/cli-workflow.jpg)

*Plate I.a — the original, kept for reference.*

## How it works

Each command is a self-contained Markdown prompt installed into `~/.claude/skills/`. When you type `/legal <command>`, Claude Code routes to the matching skill, which reads your document, runs the analysis, and writes a Markdown report to your current working directory.

### Input methods

Every command accepts input in one of three ways:

| Method | How | Tool used |
|--------|-----|-----------|
| **File path** | Provide a local file path | Read |
| **Pasted text** | Paste content directly into the chat | Direct |
| **URL** | Provide a web address | WebFetch |

If you run a command without specifying input, you will be prompted to provide it.

### Output

All generated reports are saved as Markdown files in the current working directory with standardised naming:

```
CONTRACT-REVIEW-[name]-[date].md
NDA-[party]-[date].md
EMPLOYMENT-REVIEW-[name]-[date].md
CORPORATE-REVIEW-[company]-[date].md
PROPERTY-ANALYSIS-[address]-[date].md
```

### Disclaimer

Every output starts with the mandatory disclaimer:

> AI-Generated Legal Analysis -- This output is produced by AI and does not constitute legal advice. It is intended as a starting point for review. Always consult a qualified solicitor before signing contracts or relying on generated legal documents. This tool is designed for use under the laws of England and Wales.

### Risk indicators

All commands use a standardised risk-level system:

| Indicator | Level |
|-----------|-------|
| :red_circle: | High Risk |
| :yellow_circle: | Medium Risk |
| :green_circle: | Low Risk |

## Command categories

| Category | Commands | Page |
|----------|----------|------|
| [Contract Analysis](./contract-analysis) | 7 commands | Full review, risks, compare, plain English, negotiate, missing protections, benchmarking |
| [Employment](./employment) | 3 commands | Employment review, IR35 determination, freelancer review |
| [Corporate](./corporate) | 3 commands | Corporate review, AML/KYC, immigration compliance |
| [Property](./property) | 2 commands | Property analysis, tenancy agreement review |
| [Compliance & Reporting](./compliance) | 7 commands | Compliance audit, GDPR, consumer, ESG, AI compliance, legislation tracker, regulatory calendar |
| [Document Generation](./document-generation) | 5 commands | NDA, terms of service, privacy policy, agreements, board packs |
| [Specialist](./specialist) | 5 commands | Dispute resolution, due diligence, IP, debt recovery, wills & probate |
| [Utilities](./utilities) | 2 commands | PDF report generation, sample document fetcher |

## Quick reference

```
CONTRACT ANALYSIS:
  /legal review <file>            Full contract review (5 parallel agents)
  /legal risks <file>             Deep risk analysis with severity scoring
  /legal compare <file1> <file2>  Side-by-side contract comparison
  /legal plain <file>             Translate legalese to plain English
  /legal negotiate <file>         Counter-proposal generator
  /legal missing <file>           Missing protections finder
  /legal benchmark <file>         Market-standard clause benchmarking

PROPERTY:
  /legal property <file>          UK property document analysis
  /legal tenancy <file>           Tenancy agreement review

EMPLOYMENT & CORPORATE:
  /legal employment <file>        Employment contract review (4 parallel agents)
  /legal corporate <file>         Corporate document review (3 parallel agents)
  /legal ir35 <file>              IR35 status determination
  /legal aml <file>               AML/KYC compliance review
  /legal immigration <file>       Immigration & visa compliance

DOCUMENT GENERATION:
  /legal nda <description>        Generate custom NDA
  /legal terms <url>              Generate terms of service
  /legal privacy <url>            Generate privacy policy
  /legal agreement <type>         Generate business agreements
  /legal freelancer <file>        Freelancer/contractor review
  /legal board-pack <details>     Board pack document generation

COMPLIANCE & REPORTING:
  /legal compliance <url>         Compliance gap analysis
  /legal gdpr <file>              GDPR & data protection deep-dive
  /legal consumer <file>          Consumer protection compliance
  /legal esg <file>               ESG & sustainability compliance
  /legal ai-compliance <file>     AI compliance self-assessment
  /legal legislation-tracker <file>  Legislation currency audit
  /legal regulatory-calendar      12-month regulatory filing calendar
  /legal report-pdf               Professional PDF report

SPECIALIST:
  /legal dispute <file>           Dispute resolution analysis
  /legal due-diligence <file>     M&A due diligence gap analysis
  /legal ip <file>                Intellectual property review
  /legal debt <file>              Debt recovery & enforcement
  /legal wills <file>             Wills & probate review

UTILITY:
  /legal fetch-samples            Download sample legal documents
```
