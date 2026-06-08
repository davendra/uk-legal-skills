---
name: legal-ip
description: Intellectual property review and protection assessment for England & Wales
---

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


# /legal ip — Intellectual Property Review

## Jurisdiction
England & Wales only.

## Disclaimer
> **AI-Generated Legal Analysis** — This output is produced by AI and does not constitute legal advice. It is for informational purposes only. Always consult a qualified solicitor for advice specific to your circumstances. England & Wales law only.

## Purpose
Review IP-related documents — licence agreements, assignment deeds, confidentiality agreements, employment IP clauses, trade mark applications, and IP portfolios — against UK IP legislation and best practice.

## Input
Accept exactly one of:
1. **File path** — Read the file with the Read tool
2. **Pasted text** — Use directly
3. **URL** — Fetch with WebFetch

## Phase 0: Escalation Check (run before any other phase)

Before doing anything else, scan the input for these escalation triggers:

1. Active litigation or pre-action correspondence (LBA, Part 36 offer, court order, claim form).
2. Regulator action or enquiry (FCA, ICO, HMRC, SRA, CMA, Ofcom, Ofsted, HSE, etc.).
3. Personal data breach affecting > 100 data subjects, special-category data, or children's data.
4. Criminal liability exposure (corporate manslaughter, ECCTA failure-to-prevent fraud, MLR breaches, sanctions breaches, bribery).
5. Imminent limitation period (< 30 days to expiry).
6. Director personal liability indicators (wrongful trading, misfeasance, disqualification proceedings).
7. Whistleblowing disclosure or PIDA-protected report.

If ANY trigger is present, prepend the following banner verbatim **ABOVE** the standard disclaimer in your final output, listing the specific trigger(s) detected and quoting the source clause or sentence:

> ⚠️ **ESCALATE — INSTRUCT A SOLICITOR NOW**
>
> This document contains signals that require urgent qualified advice. AI analysis is not sufficient. Indicators detected: [list specific triggers].

If no trigger is present, do not emit the banner. Do not add a "no triggers detected" note. Continue with the analysis below.

## Analysis Framework

### Phase 1: Document Classification
- IP licence agreement (exclusive / non-exclusive / sole)
- IP assignment deed
- Trade mark licence / co-existence agreement
- Patent licence
- Software licence (SaaS / on-premise / open source)
- Employment IP clause / invention assignment
- Consultancy IP provisions
- Confidentiality / NDA with IP provisions
- IP due diligence report
- IP portfolio summary
- Other (describe)

### Phase 2: Legislative Compliance

**Core IP Legislation**
- Copyright, Designs and Patents Act 1988 (CDPA) — ownership, moral rights, fair dealing
- Patents Act 1977 — employee inventions (ss.39-43), patent validity
- Trade Marks Act 1994 — registration, infringement, passing off
- Registered Designs Act 1949 / Community Design Regulation
- Trade Secrets (Enforcement, etc.) Regulations 2018

**AI-Specific IP Issues**
- AI-generated works — copyright ownership uncertainty (CDPA s.9(3))
- Training data rights — Getty Images v Stability AI implications
- AI inventorship — Thaler v Comptroller-General (DABUS) ruling

**Commercial IP Provisions**
- Ownership of foreground/background IP
- Licence scope (territory, field of use, exclusivity, sublicensing)
- Warranties and indemnities (non-infringement, authority to licence)
- Moral rights waivers (CDPA s.87)
- Open source contamination risk (copyleft provisions)
- IP in employee vs contractor context (CDPA s.11)
- Restrictive covenants and non-compete (restraint of trade doctrine)

### Phase 3: Scored Output

Score each area:
- IP ownership clarity: [0-100]
- Licence terms adequacy: [0-100]
- Risk of infringement: [0-100]
- Commercial protection: [0-100]

### Output Format
```
## Intellectual Property Review

### Document Type: [classification]
### IP Assets Covered: [list]

### Overall IP Protection Score: [0-100] — Grade: [A-F]

### Ownership Analysis
[Who owns what, chain of title, gaps]

### Licence Terms Assessment
[Scope, restrictions, sublicensing, termination]

### Risk Assessment
| Risk Area | Score | Level | Key Issues |
|-----------|-------|-------|------------|
| Ownership gaps | X/100 | ... | ... |
| Infringement exposure | X/100 | ... | ... |
| Commercial adequacy | X/100 | ... | ... |
| AI/tech-specific | X/100 | ... | ... |

### Clause-by-Clause Analysis
[Each clause with risk score and recommendation]

### Recommendations
[Prioritised action items with replacement language]
```

### File Naming
Save output as: `IP-REVIEW-[name]-[YYYY-MM-DD].md`
