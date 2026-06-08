# Compliance & Reporting

Data protection fines can reach 17.5 million pounds. Consumer law penalties are getting tougher. These commands audit your documents and policies against the regulations that matter most -- so you can fix gaps before a regulator finds them.

Seven commands covering regulatory compliance, data protection, consumer law, ESG, AI governance, legislation tracking, and regulatory calendars.

![Compliance radar (broadsheet rebrand) — six frameworks, one contract](/images/compliance-radar-2026.jpg)

*Plate I — the broadsheet rebrand.*

![Multi-framework compliance radar — see your coverage at a glance](/images/compliance-radar.jpg)

*Plate I.a — the original, kept for reference.*

## /legal compliance

Multi-framework compliance gap analysis for websites.

### Syntax

```bash
/legal compliance <url>
```

### What it does

1. Scans the target website (homepage, privacy policy, terms, cookie policy, trust/security page, footer).
2. Detects what the site does to determine applicable frameworks.
3. Evaluates compliance against every applicable framework and produces a scored audit.

### Frameworks assessed

| Trigger | Framework |
|---------|-----------|
| Collects any personal data | UK GDPR / DPA 2018 |
| Uses cookies or tracking | UK GDPR, PECR 2003 |
| Processes payments | PCI-DSS |
| Collects email addresses | PECR 2003 |
| Industry-specific activity | Cyber Essentials, sector regulations |

### Example

```bash
/legal compliance https://example.com
```

### Output filename

`COMPLIANCE-AUDIT-[domain]-[date].md`

### Key legislation

UK GDPR (retained EU Regulation 2016/679), Data Protection Act 2018, Privacy and Electronic Communications Regulations 2003, Cyber Essentials scheme.

---

## /legal gdpr

Deep-dive GDPR and data protection compliance audit.

### Syntax

```bash
/legal gdpr <file>
```

### What it checks

Accepts privacy policies, data processing agreements, DPIAs, records of processing, consent mechanisms, international transfer documents, or data breach response plans.

| Area | What is assessed |
|------|-----------------|
| **Data (Use and Access) Act 2025** | New provisions including "recognised legitimate interest" basis |
| **Lawful basis** | All six bases under Article 6, special category data under Article 9 |
| **PECR 2003** | Updated penalties (up to GBP 17.5 million), cookie consent, direct marketing |
| **International transfers** | Adequacy decisions, UK IDTA, Standard Contractual Clauses, Transfer Risk Assessments |
| **DPIAs** | When required, methodology, ICO consultation triggers |
| **Breach notification** | 72-hour reporting to ICO, communication to data subjects |
| **Data subject rights** | Access, rectification, erasure, restriction, portability, objection |
| **Records of processing** | Article 30 compliance |

### Example

```bash
/legal gdpr ./policies/privacy-policy.md
```

### Output filename

`GDPR-AUDIT-[name]-[date].md`

### Key legislation

UK GDPR, Data Protection Act 2018, Data (Use and Access) Act 2025, Privacy and Electronic Communications Regulations 2003 (PECR).

---

## /legal consumer

Consumer protection compliance review.

### Syntax

```bash
/legal consumer <file>
```

### What it checks

Reviews consumer-facing contracts, terms and conditions, subscription agreements, returns policies, and digital content terms.

| Area | What is assessed |
|------|-----------------|
| **CRA 2015** | Goods conformity, digital content rights, services (reasonable care and skill), unfair terms (Part 2) |
| **DMCCA 2024** | Digital Markets, Competition and Consumers Act: subscription terms, auto-renewal transparency, cooling-off, CMA penalty exposure |
| **CCR 2013** | Consumer Contracts Regulations: pre-contract information, 14-day cancellation right, refund obligations |
| **UCTA 1977** | Unfair Contract Terms Act: reasonableness test, prohibited exclusions |
| **Subscription terms** | Renewal notices, easy cancellation, reminder obligations under DMCCA 2024 |

### Example

```bash
/legal consumer ./terms/subscription-terms.pdf
```

### Output filename

`CONSUMER-REVIEW-[name]-[date].md`

### Key legislation

Consumer Rights Act 2015, Digital Markets, Competition and Consumers Act 2024 (DMCCA), Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 (CCR), Unfair Contract Terms Act 1977 (UCTA).

---

## /legal esg

ESG and sustainability compliance review.

### Syntax

```bash
/legal esg <file>
```

### What it checks

Reviews modern slavery statements, sustainability reports, climate disclosures, ESG policies, strategic reports, supply chain policies, net zero plans, and biodiversity statements.

| Area | What is assessed |
|------|-----------------|
| **Modern Slavery Act s.54** | Board sign-off, six recommended areas, supply chain disclosures, turnover threshold |
| **Companies Act s.414C** | Strategic report non-financial information, s.172 statement, stakeholder considerations |
| **TCFD** | Task Force on Climate-related Financial Disclosures alignment: governance, strategy, risk management, metrics and targets |
| **ISSB** | International Sustainability Standards Board: IFRS S1 and S2 alignment |
| **Biodiversity** | Biodiversity net gain, TNFD alignment, habitat assessments |
| **Net zero** | Science-based targets, interim milestones, decarbonisation pathway |

### Example

```bash
/legal esg ./reports/modern-slavery-statement.pdf
```

### Output filename

`ESG-REVIEW-[name]-[date].md`

### Key legislation

Modern Slavery Act 2015 (s.54), Companies Act 2006 (s.414C, s.172), Environment Act 2021 (biodiversity net gain), Climate Change Act 2008.

---

## /legal ai-compliance

AI compliance self-assessment for law firms and businesses using AI.

### Syntax

```bash
/legal ai-compliance <file>
```

### What it checks

Reviews AI usage policies, governance frameworks, client AI disclosures, risk assessments, DPIAs, acceptable use policies, vendor/procurement policies, and training records.

| Framework | What is assessed |
|-----------|-----------------|
| **SRA Standards** | SRA Codes of Conduct, competence, supervision, client confidentiality, transparency |
| **UK AI principles** | The UK's pro-innovation AI regulatory framework: safety, transparency, fairness, accountability, contestability |
| **ICO AI guidance** | AI and data protection, automated decision-making under UK GDPR Article 22 |
| **EU AI Act exposure** | Potential exposure for firms with EU clients or cross-border operations |

### Document types supported

- AI usage policies
- AI governance frameworks
- Client-facing AI disclosures
- AI risk assessments
- DPIAs covering AI processing
- AI acceptable use policies
- AI procurement/vendor policies
- AI training and competence records

### Example

```bash
/legal ai-compliance ./policies/ai-usage-policy.docx
```

### Output filename

`AI-COMPLIANCE-REVIEW-[name]-[date].md`

---

## /legal legislation-tracker

Scans documents for statutory references and flags outdated, amended, or repealed legislation.

### Syntax

```bash
/legal legislation-tracker <file>
```

### What it does

1. **Extraction**: Identifies every reference to Acts of Parliament, Regulations, Statutory Instruments, EU retained law, section references, amendments, and commencement orders.
2. **Currency check**: For each reference, determines whether the cited provision is:
   - Current and in force
   - Amended (with details of what changed)
   - Repealed or revoked
   - Not yet in force (commencement pending)
   - Superseded by newer legislation
3. **Report**: Produces a legislation audit with replacement suggestions for outdated references.

### Pattern recognition

| Pattern | Examples |
|---------|---------|
| Acts of Parliament | "Data Protection Act 2018", "Companies Act 2006", "the 2006 Act" |
| Regulations | "Money Laundering Regulations 2017", "the MLR 2017" |
| Statutory Instruments | "SI 2017/692" |
| EU retained law | "Regulation (EU) 2016/679", "the GDPR" |
| Section references | "s.21", "section 44", "Schedule 2, Part 1", "Article 6(1)(f)" |

### Example

```bash
/legal legislation-tracker ./contracts/old-employment-contract.pdf
```

### Output filename

`LEGISLATION-AUDIT-[name]-[date].md`

---

## /legal regulatory-calendar

Generates a 12-month regulatory filing calendar based on company profile.

### Syntax

```bash
/legal regulatory-calendar <company-profile>
```

The `<company-profile>` can be pasted text or a file describing the company (type, size, sector, employees, turnover, data processing activities).

### What it does

1. Parses the company profile and extracts classification factors: company type, incorporation date, financial year end, sector, employee count, turnover, VAT/PAYE registration.
2. Determines which regulators and filing obligations apply.
3. Generates a complete calendar with deadlines, penalties, preparation windows, and a delegation matrix.

### Regulators and deadlines covered

| Regulator | Example obligations |
|-----------|-------------------|
| **Companies House** | Confirmation statement (CS01), annual accounts, director/PSC changes, share allotments, special resolutions |
| **HMRC** | Corporation Tax return (CT600), VAT returns, PAYE RTI submissions, P11D, annual tax on enveloped dwellings |
| **ICO** | Data protection fee, breach notifications |
| **FCA** | Regulatory returns (if applicable), annual reporting |
| **SRA** | Practising certificate renewal, accountant's report, diversity data |

### Penalties

Each deadline includes the penalty for late filing. For example:
- Companies House late accounts: GBP 150 to GBP 1,500 (doubled if consecutive)
- CS01 overdue: criminal offence, company may be struck off
- PSC notification late: criminal offence with daily default fine

### Example

```bash
/legal regulatory-calendar "Acme Ltd, private limited company, incorporated 2019-03-15, FY end 31 March, 45 employees, turnover GBP 4.2m, VAT registered, PAYE registered, processes personal data"
```

### Output filename

`REGULATORY-CALENDAR-[company]-[date].md`
