---
name: legal-tenancy
description: Tenancy agreement review with Renters' Rights Act 2025 commencement checks for England & Wales
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

# /legal tenancy — Tenancy Agreement Review

## Jurisdiction
England & Wales only.

## Disclaimer
> **AI-Generated Legal Analysis** — This output is produced by AI and does not constitute legal advice. It is for informational purposes only. Always consult a qualified solicitor for advice specific to your circumstances. England & Wales law only.

## Purpose
Review residential tenancy agreements, ASTs, lodger agreements, and HMO licences against current legislation including Housing Act 1988/2004, Tenant Fees Act 2019, and Renters' Rights Act 2025 reforms. Treat the RRA 2025 as a commencement-sensitive framework: identify whether each issue is already in force, transitional, or prospective for the tenancy date.

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
- Assured Shorthold Tenancy (AST)
- Assured Tenancy
- Assured Periodic Tenancy (new default under RRA 2025 once commenced)
- Lodger agreement
- Licence to occupy
- HMO tenancy
- Commercial lease (redirect to /legal property)
- Other (describe)

### Phase 2: Legislative Compliance

**Renters' Rights Act 2025**
GOV.UK's implementation roadmap states the first major phase takes effect on 1 May 2026. For each item below, verify commencement and transitional rules before treating it as currently binding:
- Section 21 abolition — flag no-fault eviction clauses and label them current, transitional, or prospective
- Assured Periodic Tenancy conversion — fixed-term AST reform once commenced
- Rent increase limits — Section 13 notice pathway, annual limits, and market-rate challenge rules once commenced
- Pet rights — landlord cannot unreasonably refuse pets once relevant provisions commence; note pet damage insurance where applicable
- Decent Homes Standard and Awaab's Law extension to private rented sector when commenced by regulations
- New possession grounds (Grounds 1-8 reform, Ground 1A for sale, Ground 6A for repeated arrears)
- Landlord redress scheme membership and Private Rented Sector Database registration when commenced
- Blanket bidding ban and rental discrimination protections when commenced

**Housing Act 1988 (as amended)**
- Remaining valid possession grounds
- Notice periods (Section 8 / Ground-specific)
- Succession rights

**Tenant Fees Act 2019**
- Prohibited payments check (only permitted: rent, tenancy deposit capped at 5 weeks, holding deposit capped at 1 week, default fees for lost keys/late rent)
- Fees transparency

**Deposit Protection**
- Deposit registered within 30 days
- Prescribed information served
- Correct scheme (DPS, MyDeposits, TDS)
- Cap at 5 weeks' rent

**Fitness & Safety**
- Gas Safety Certificate (annual)
- EICR (every 5 years)
- EPC (minimum E rating, moving to C)
- Smoke and CO alarms (every floor)
- Legionella risk assessment
- Right to Rent checks (Immigration Act 2014)
- How to Rent guide served

### Phase 3: Scored Output

For each area provide:
- Compliance status: Pass / Fail / Warning
- Specific clause reference
- Risk level: High / Medium / Low
- Required action with deadline

### Output Format
```
## Tenancy Agreement Review

### Agreement Type: [classification]
### Parties: [landlord] and [tenant(s)]

### Overall Compliance Score: [0-100] — Grade: [A-F]

### Renters' Rights Act 2025 Compliance
| Requirement | Status | Risk | Notes |
|-------------|--------|------|-------|
| s.21 abolition | ... | ... | ... |
| Periodic tenancy | ... | ... | ... |
| Rent increase rules | ... | ... | ... |
| Pet provisions | ... | ... | ... |
| Decent Homes Standard | ... | ... | ... |
| PRS Database | ... | ... | ... |

### Deposit & Fees Compliance
[Deposit protection status, fee audit]

### Safety Compliance Checklist
[Gas, electrical, EPC, alarms, legionella]

### Clause-by-Clause Analysis
[Each material clause with risk score]

### Landlord Action Plan
[Prioritised remediation steps]

### Tenant Rights Summary
[Plain English summary of tenant protections]
```

### File Naming
Save output as: `TENANCY-REVIEW-[address]-[YYYY-MM-DD].md`
