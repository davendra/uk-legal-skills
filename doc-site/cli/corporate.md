# Corporate

Running a business means dealing with corporate law, anti-money laundering rules, and sometimes immigration compliance. These commands help you check that your corporate documents and processes meet current requirements.

Three commands for corporate governance, AML/KYC compliance, and immigration.

## /legal corporate

Launches **3 parallel agents** to review corporate governance documents with a Corporate Compliance Score.

### Syntax

```bash
/legal corporate <file>
```

### What it does

1. **Ingestion**: Classifies the document (articles of association, shareholder agreement, board resolution, director service contract, partnership/LLP agreement, company policy) and extracts metadata (company name, number, type, size classification).
2. **Parallel analysis**: Launches three subagents:

| Agent | Role | Weight |
|-------|------|--------|
| `legal-corporate-compliance` | Companies Act and ECCTA compliance: director duties (ss.171--177), ECCTA 2023 transparency, filing obligations, document execution (s.44), company secretary requirements | 35% |
| `legal-corporate-documents` | Document analysis for completeness, enforceability, hidden risks against legal frameworks and market-standard provisions | 35% |
| `legal-corporate-risk` | Corporate criminal liability exposure (ECCTA fraud, Bribery Act, Modern Slavery Act), director personal risk, insolvency duties, insurance/indemnity adequacy | 30% |

3. **Aggregation**: Produces Corporate Compliance Score (0--100) with grade A+ to F.

### Director duties checklist

The report includes a pass/fail assessment of all seven codified duties:

| # | Duty | Section |
|---|------|---------|
| 1 | Act within powers | s.171 CA 2006 |
| 2 | Promote success of the company | s.172 CA 2006 |
| 3 | Exercise independent judgement | s.173 CA 2006 |
| 4 | Exercise reasonable care, skill and diligence | s.174 CA 2006 |
| 5 | Avoid conflicts of interest | s.175 CA 2006 |
| 6 | Not accept benefits from third parties | s.176 CA 2006 |
| 7 | Declare interest in proposed transactions | s.177 CA 2006 |

### ECCTA 2023 compliance dashboard

Six requirements checked: identity verification (directors and PSCs), PSC register accuracy, confirmation statement declarations, registered office appropriateness, lawful purpose statement, failure to prevent fraud (s.199).

### Output sections

- Corporate Compliance Score with grade
- Director Duties Checklist (7 duties -- pass/fail/warning)
- Shadow Director Assessment
- ECCTA 2023 Compliance Dashboard (6 requirements)
- Document findings by risk (critical/high/medium/low)
- Corporate Risk Register with likelihood/impact matrix
- Director Personal Risk Summary
- Filing Obligation Timeline (overdue, upcoming, recurring)
- Document execution assessment (s.44 CA 2006 compliance)
- Missing protections
- Cross-document conflicts
- Prioritised recommendations

### Example

```bash
/legal corporate ./governance/articles-of-association.pdf
```

### Output filename

`CORPORATE-REVIEW-[company]-[date].md`

### Key legislation

Companies Act 2006 (especially ss.171--177, s.44, s.188, ss.215--222, s.248, s.251), Economic Crime and Corporate Transparency Act 2023 (ECCTA), Partnership Act 1890, Limited Liability Partnerships Act 2000.

---

## /legal aml

AML/KYC compliance review against UK anti-money laundering regulations.

### Syntax

```bash
/legal aml <file>
```

### What it checks

Reviews AML policies, CDD procedures, onboarding documents, and compliance materials against:

| Area | What is assessed |
|------|-----------------|
| **CDD** | Customer Due Diligence procedures, identity verification, document requirements, risk ratings |
| **EDD** | Enhanced Due Diligence for PEPs, high-risk jurisdictions, source of wealth verification |
| **Sanctions screening** | HMT consolidated list, OFSI compliance, asset freezing obligations |
| **SAR procedures** | Internal reporting process, NCA referral, consent regime, tipping off |
| **MLRO** | Money Laundering Reporting Officer role, authority, reporting lines, deputisation |
| **Firm-wide risk assessment** | Risk factors by client type, service, and jurisdiction |

### Example

```bash
/legal aml ./compliance/aml-policy.pdf
```

### Output filename

`AML-REVIEW-[name]-[date].md`

### Key legislation

Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017), Proceeds of Crime Act 2002 (POCA), Sanctions and Anti-Money Laundering Act 2018 (SAMLA), SRA Anti-Money Laundering guidance.

---

## /legal immigration

Immigration and visa compliance review for employers and sponsors.

### Syntax

```bash
/legal immigration <file>
```

### What it checks

| Area | What is assessed |
|------|-----------------|
| **Sponsor licence** | Application completeness, compliance audit readiness, Key Personnel appointments, SMS duties |
| **Skilled Worker visa** | Certificate of Sponsorship (CoS) assignment, salary thresholds, SOC code accuracy, genuine vacancy test |
| **Right to Work** | Document check procedures, prescribed documents, repeat check schedules, manual vs IDVT checks |
| **Civil penalties** | Risk assessment for employing illegal workers -- penalties up to GBP 60,000 per worker |
| **Compliance** | Record-keeping, reporting duties (changes in circumstances), sponsor management system |

### Document types supported

- Sponsor licence applications and compliance audits
- Certificates of Sponsorship (CoS)
- Skilled Worker visa applications
- Global Talent / Innovator Founder visa applications
- Graduate visa / Student visa applications
- Right to Work checklists and procedures
- Employer immigration policies

### Example

```bash
/legal immigration ./hr/right-to-work-policy.docx
```

### Output filename

`IMMIGRATION-REVIEW-[name]-[date].md`

### Key legislation

Immigration Rules HC 395, Immigration, Asylum and Nationality Act 2006 (s.15 civil penalties), Immigration Act 2014/2016 (Right to Work), Points-Based System guidance.

---

## Related commands

- [/legal review](/cli/contract-analysis) — full clause-by-clause contract review
- [/legal due-diligence](/cli/specialist) — M&A due-diligence checklist
- [/legal board-pack](/cli/document-generation) — Companies Act board documents
- [UK legislation reference](/reference/legislation) — the statutes these checks rely on
