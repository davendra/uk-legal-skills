---
name: legal-immigration
description: UK immigration and visa compliance review for England & Wales
---

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


# /legal immigration — Immigration & Visa Compliance

## Jurisdiction
United Kingdom (immigration law is not devolved).

## Disclaimer
> **AI-Generated Legal Analysis** — This output is produced by AI and does not constitute legal advice. It is for informational purposes only. Always consult a qualified immigration solicitor (OISC registered or Law Society accredited) for advice specific to your circumstances.

## Purpose
Review immigration-related documents — sponsor licence applications, visa applications, compliance audits, Right to Work procedures, and employer immigration policies — against the Immigration Rules, Points-Based System, and Home Office guidance.

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
- Sponsor licence application / compliance audit
- Certificate of Sponsorship (CoS) assignment
- Skilled Worker visa application
- Global Talent / Innovator Founder visa
- Graduate visa / Student visa
- Family visa (spouse/partner/parent/child)
- Right to Work check documentation
- Employer immigration policy
- Settlement (ILR) application
- British citizenship (naturalisation) application
- EEA settled/pre-settled status
- Other (describe)

### Phase 2: Compliance Analysis

**Immigration Rules (HC 395, as amended)**
- Points-based system requirements (skill level, salary threshold, English language)
- Skilled Worker minimum salary: £38,700 (or going rate, whichever higher)
- Shortage Occupation List benefits
- ATAS requirements (Academic Technology Approval Scheme)
- Genuine vacancy test
- Maintenance requirements
- Immigration Health Surcharge (IHS)

**Sponsor Licence Compliance**
- Key Personnel roles (Authorising Officer, Key Contact, Level 1 User)
- Record-keeping duties (Annex D checklist)
- Reporting duties (changes within 10/20 working days)
- Migrant tracking obligations
- Right to Work checks (manual and IDVT)
- A-rated licence maintenance
- Civil penalty regime (up to £60,000 per illegal worker from Feb 2024)

**Right to Work Checks**
- Prescribed document list (List A / List B)
- Online checking service (share code)
- IDVT provider checks (certified providers only)
- Repeat checks for time-limited permission
- Statutory excuse against civil penalty
- COVID concessions (ended)

**Compliance Risk Areas**
- Absconding workers
- Curtailment / cancellation triggers
- Tier 2 / Skilled Worker cooling-off period
- Supplementary employment rules
- 20-hour work limit (student sponsors)

### Phase 3: Scored Output

### Output Format
```
## Immigration Compliance Review

### Application/Document Type: [classification]
### Applicant/Sponsor: [name]

### Overall Compliance Score: [0-100] — Grade: [A-F]

### Immigration Rules Compliance
| Requirement | Status | Risk | Notes |
|-------------|--------|------|-------|
| Salary threshold | ... | ... | ... |
| Skill level | ... | ... | ... |
| English language | ... | ... | ... |
| Genuine vacancy | ... | ... | ... |

### Sponsor Duties Compliance (if applicable)
| Duty | Status | Risk | Deadline |
|------|--------|------|----------|
| Record keeping | ... | ... | ... |
| Reporting changes | ... | ... | ... |
| Right to Work | ... | ... | ... |

### Risk Assessment
- Civil penalty exposure: [£ amount]
- Licence downgrade/revocation risk: [High/Medium/Low]
- Refusal risk: [High/Medium/Low]

### Action Plan
[Prioritised remediation steps with deadlines]
```

### File Naming
Save output as: `IMMIGRATION-REVIEW-[name]-[YYYY-MM-DD].md`
