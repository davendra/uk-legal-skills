---
name: legal-debt
description: Debt recovery and enforcement review for England & Wales
---

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


# /legal debt — Debt Recovery & Enforcement

## Jurisdiction
England & Wales only.

## Disclaimer
> **AI-Generated Legal Analysis** — This output is produced by AI and does not constitute legal advice. It is for informational purposes only. Always consult a qualified solicitor for advice specific to your circumstances. England & Wales law only.

## Purpose
Review debt recovery documents — letters before action, county court claims, statutory demands, payment agreements, guarantees, and enforcement options — against CPR pre-action protocols, Limitation Act 1980, and current enforcement procedures.

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
- Letter before action / letter of claim
- County Court claim (N1 form / Particulars of Claim)
- Statutory demand (s.123 Insolvency Act 1986)
- Payment plan / instalment agreement
- Personal guarantee
- Deed of settlement / compromise agreement
- Charging order application
- Writ of control / warrant of execution
- Third-party debt order
- Other (describe)

### Phase 2: Analysis

**Pre-Action Protocol Compliance (CPR Practice Direction — Pre-Action Conduct)**
- Sufficient information provided to debtor
- Response period (typically 30 days for business, 14 for individual)
- Alternative dispute resolution considered
- Proportionality of claim

**Limitation Period Check (Limitation Act 1980)**
- Simple contract: 6 years (s.5)
- Deed: 12 years (s.8)
- Personal injury: 3 years (s.11)
- Acknowledgement or part payment restart (ss.29-30)
- Date of cause of action vs date of knowledge

**Debt Amount Verification**
- Principal sum
- Interest calculation (Late Payment of Commercial Debts Act 1998: 8% + BoE base rate for B2B)
- County Court Act 1984 s.69 interest (8% simple)
- Contractual interest rate vs statutory
- Reasonable costs of recovery

**Enforcement Options Assessment**
Based on debt amount and debtor profile, recommend:
- County Court claim (< £100,000) / High Court (> £100,000)
- Small claims track (< £10,000) / Fast track (< £25,000) / Multi-track
- Statutory demand → winding up / bankruptcy petition
- Charging order on property
- Attachment of earnings
- Third-party debt order
- Writ of control / warrant of execution
- Insolvency route (if debt > £750 company / £5,000 individual)

**Consumer Debt Protections**
- Consumer Credit Act 1974 compliance
- FCA debt collection guidelines (CONC 7)
- Breathing space (Debt Respite Scheme)
- County Court Administration Order
- Individual Voluntary Arrangement (IVA)

### Phase 3: Scored Output

### Output Format
```
## Debt Recovery Assessment

### Claim Summary
- Creditor: [name]
- Debtor: [name]
- Principal: [£ amount]
- Interest accrued: [£ amount]
- Total claimed: [£ amount]

### Overall Strength Score: [0-100] — Grade: [A-F]

### Pre-Action Compliance
| Requirement | Status | Issue |
|-------------|--------|-------|
| Letter before action | ... | ... |
| Response period | ... | ... |
| ADR consideration | ... | ... |

### Limitation Period
- Cause of action date: [date]
- Limitation expires: [date]
- Status: [In time / Time-barred / At risk]

### Recommended Recovery Route
[Best enforcement pathway with estimated costs and timeline]

### Risk Factors
[Prioritised list of risks to successful recovery]

### Action Plan
[Step-by-step recovery strategy with deadlines]
```

### File Naming
Save output as: `DEBT-REVIEW-[debtor]-[YYYY-MM-DD].md`
