---
name: legal-wills
description: Wills and probate document review for England & Wales
---

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


# /legal wills — Wills & Probate Review

## Jurisdiction
England & Wales only.

## Disclaimer
> **AI-Generated Legal Analysis** — This output is produced by AI and does not constitute legal advice. It is for informational purposes only. Always consult a qualified solicitor (or STEP member for complex estate planning) for advice specific to your circumstances. England & Wales law only.

## Purpose
Review wills, codicils, letters of wishes, powers of attorney, estate administration documents, and trust deeds against the Wills Act 1837, Administration of Estates Act 1925, Inheritance (Provision for Family and Dependants) Act 1975, and related legislation.

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
- Will (simple / mirror / mutual)
- Codicil
- Letter of wishes
- Lasting Power of Attorney — Property & Financial Affairs
- Lasting Power of Attorney — Health & Welfare
- Grant of Probate application
- Letters of Administration application
- IHT400 / IHT205 (inheritance tax return)
- Deed of Variation (s.142 IHTA 1984)
- Trust deed (lifetime / will trust / discretionary / interest in possession)
- Other (describe)

### Phase 2: Analysis

**Wills Act 1837 Compliance**
- Testamentary capacity (Banks v Goodfellow 1870 test)
- Knowledge and approval of contents
- Execution requirements (s.9): signed by testator, in presence of 2 witnesses
- Witness independence (beneficiary witness rule — s.15)
- Attestation clause present and adequate
- Revocation of prior wills clause

**Substantive Review**
- Executor appointment (professional vs lay, number, substitutes)
- Guardian appointment for minor children
- Specific gifts / pecuniary legacies
- Residuary estate disposition
- Trust provisions (age contingencies, trustee powers, class gifts)
- Substitutional gifts / survivorship clauses (28-day standard)
- Funeral wishes
- Digital assets provision

**Inheritance Tax (IHTA 1984)**
- Nil-rate band utilisation (£325,000)
- Residence nil-rate band (£175,000) — conditions and tapered withdrawal
- Transferable nil-rate band (spouse/civil partner)
- Potentially exempt transfers (PETs) — 7-year rule
- Chargeable lifetime transfers (CLTs)
- Business Property Relief (BPR) — 50% or 100%
- Agricultural Property Relief (APR)
- Charity exemption (10% rate reduction at 36% if 10%+ to charity)
- Excluded property (non-UK assets, non-domiciled)

**Inheritance Act 1975 Claims Risk**
- Identify potential claimants (spouse, cohabitant, child, dependant, maintained person)
- Reasonable financial provision test
- Risk factors (disinheritance, inadequate provision, cohabitation)
- Defensive provisions and statement of reasons

**Powers of Attorney**
- LPA compliance with Mental Capacity Act 2005
- Certificate provider requirements
- Named persons to be notified
- Restrictions and conditions
- Registration with OPG

### Phase 3: Scored Output

### Output Format
```
## Will & Probate Review

### Document Type: [classification]
### Testator/Donor: [name]
### Date of Document: [date]

### Overall Validity Score: [0-100] — Grade: [A-F]

### Execution Compliance (Wills Act 1837)
| Requirement | Status | Risk |
|-------------|--------|------|
| Testamentary capacity | ... | ... |
| Proper execution (s.9) | ... | ... |
| Witness independence | ... | ... |
| Attestation clause | ... | ... |
| Revocation clause | ... | ... |

### Estate Distribution Summary
| Beneficiary | Gift Type | Value/Share | Conditions |
|-------------|-----------|-------------|------------|
| ... | ... | ... | ... |

### Inheritance Tax Estimate
- Gross estate: [£ estimate if discernible]
- Available nil-rate band: [£ amount]
- RNRB: [£ amount if applicable]
- Estimated IHT liability: [£ amount]
- Tax planning opportunities: [list]

### Inheritance Act 1975 Risk
- Overall claim risk: [High/Medium/Low]
- Potential claimants: [list]
- Defensive measures: [recommendations]

### Recommendations
[Prioritised list of improvements with replacement language]
```

### File Naming
Save output as: `WILL-REVIEW-[testator]-[YYYY-MM-DD].md`
