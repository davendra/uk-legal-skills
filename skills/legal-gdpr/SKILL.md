---
name: legal-gdpr
description: Deep GDPR and data protection compliance audit for England & Wales
---

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


## Live Commencement Checks

Before treating any post-2024 reform as binding, run live commencement checks by default when the host provides legislation tools. Preferred order: `lookup_statute`, `lookup_section`, `check_in_force`, and `check_amendments` from the legislation MCP; then legislation.gov.uk, GOV.UK, or regulator guidance. If live tools are unavailable, include a clearly labelled limitation and classify findings as current, transitional, or prospective.

# /legal gdpr — GDPR & Data Protection Deep-Dive

## Jurisdiction
England & Wales only. References ICO as supervisory authority.

## Disclaimer
> **AI-Generated Legal Analysis** — This output is produced by AI and does not constitute legal advice. It is for informational purposes only. Always consult a qualified solicitor for advice specific to your circumstances. England & Wales law only.

## Purpose
Perform an in-depth UK GDPR, DPA 2018, and PECR 2003 compliance audit of any data-related document — privacy policies, data processing agreements, DPIAs, records of processing, consent mechanisms, international transfer documents, or data breach response plans.

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
Classify the document type:
- Privacy policy / privacy notice
- Data processing agreement (DPA / controller-processor)
- Data protection impact assessment (DPIA)
- Records of processing activities (ROPA)
- Consent mechanism / cookie policy
- International data transfer mechanism (SCCs, UK IDTA, TIA)
- Data breach response plan
- Data subject access request (DSAR) procedure
- Legitimate interest assessment (LIA)
- Other (describe)

### Phase 2: Compliance Audit

Assess against all applicable frameworks with specific section references:

**UK GDPR (as amended by Data (Use and Access) Act 2025)**
- Lawful basis identification (Art. 6) — including new "recognised legitimate interest" basis
- Special category data (Art. 9)
- Transparency and fair processing (Arts. 13-14)
- Data subject rights (Arts. 15-22) — including updated automated decision-making rules
- Data protection by design and default (Art. 25)
- Controller-processor obligations (Arts. 28-29)
- Records of processing (Art. 30)
- Data protection impact assessments (Art. 35)
- Data protection officer requirements (Arts. 37-39)
- International transfers — UK IDTA, EU SCCs, adequacy decisions (Arts. 44-49)
- Data breach notification — 72-hour ICO requirement (Arts. 33-34)

**DPA 2018**
- Exemptions (Schedules 2-4)
- Law enforcement processing (Part 3)
- Intelligence services processing (Part 4)
- Age-appropriate design code compliance

**PECR 2003 (as amended)**
- Cookie consent requirements — updated exemptions under DUA 2025
- Direct marketing rules (electronic and telephone)
- Maximum fines now aligned with UK GDPR levels (higher of £17.5m or 4% global turnover)

**ICO Guidance**
- ICO accountability framework
- ICO DPIA guidance
- ICO international transfers guidance
- ICO direct marketing code

### Phase 3: Scored Output

For each framework area, provide:
- Score (0-100)
- Status: Pass / Fail / Warning / N/A
- Specific findings with article references
- Remediation actions with priority (critical/high/medium/low)

### Output Format
```
## GDPR & Data Protection Audit

### Document Classification
[Type and description]

### Overall Compliance Score: [0-100] — Grade: [A-F]

### Framework Scores
| Framework | Score | Status | Key Gaps |
|-----------|-------|--------|----------|
| UK GDPR (core) | X/100 | ... | ... |
| DPA 2018 | X/100 | ... | ... |
| PECR 2003 | X/100 | ... | ... |
| ICO Guidance | X/100 | ... | ... |

### Critical Findings
[Numbered list of critical/high priority issues]

### Detailed Clause Analysis
[For each relevant clause: compliance status, issue, recommendation]

### Remediation Roadmap
[Prioritised action plan with estimated effort]

### Regulatory Risk Summary
- ICO enforcement risk: [High/Medium/Low]
- Maximum penalty exposure: [£ amount]
- Data subject complaint risk: [High/Medium/Low]
```

### File Naming
Save output as: `GDPR-AUDIT-[name]-[YYYY-MM-DD].md`
