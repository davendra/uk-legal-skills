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

---

## /legal pre-launch

Forward-looking regulatory gate for a product or feature about to ship. You are the General Counsel briefing the CEO the day before launch -- the command profiles the proposal, then runs a regulator-by-regulator analysis returning **APPLIES / MAY APPLY / NOT APPLICABLE** verdicts with in-force dates and a prioritised action plan.

**Why use this?** You have spent months on design and engineering and you are about to ship. This is the last check before launch: does the Online Safety Act apply to your messaging feature? Do you need a DPIA before you process that data? Is your AI feature touching an EU AI Act prohibition? It clears the regulatory blockers, surfaces the non-obvious exposure, and turns vague policy into a dated, owner-assigned action list -- so a regulator does not find the gap for you.

### Syntax

```bash
/legal pre-launch <product>
```

The `<product>` can be a free-text product or feature description, a file path (PRD, product brief, one-pager), or a URL (landing page, marketing draft, product announcement):

```bash
/legal pre-launch "AI summarisation feature for a UK consumer app aimed at over-13s, EU users included"
/legal pre-launch ./product/prd-bnpl-dashboard.md
/legal pre-launch https://example.com/coming-soon
```

If the description is too thin to profile (no sector, no audience, no data signal), the skill asks one targeted clarifying question before proceeding rather than inventing product facts.

### What it does

1. **Escalation check** -- before anything else, scans for active litigation, regulator enquiry, large or special-category data breach, criminal-liability exposure, imminent limitation deadlines, director personal-liability indicators, or whistleblowing disclosures. If any are present, it prepends an **ESCALATE -- instruct a solicitor now** banner above the disclaimer.
2. **Product profile** -- builds a profile table across sector, audience, geography, personal-data class, AI involvement, user-generated content / messaging, financial promotions, advertising claims, cookies / e-marketing, and turnover band. Every downstream verdict depends on it; unknown fields are marked `Unknown -- assumed [X]` rather than skipped.
3. **Regulator-by-regulator memos** -- for each framework, a verdict tied to specific profile facts, the key obligations with section / regulation / article numbers, the in-force status, and a prescriptive action.
4. **Prioritised action plan** -- consolidates every action into three tiers by legal exposure and timing.

### Commencement-aware by design

This is a forward-looking gate, so getting **what is actually in force** right is the whole job. The skill never states a post-2024 reform as already binding without checking. It runs live commencement checks through the legislation MCP tools -- `lookup_statute`, `lookup_section`, `check_in_force`, and `check_amendments` -- and falls back to legislation.gov.uk, GOV.UK, or named regulator guidance, labelling the limitation when live tools are unavailable.

Each finding is classified as **commenced**, **transitional**, or **prospective**. Where a provision is not yet commenced, the skill applies the pre-reform position and signals the change as prospective rather than treating it as law:

| Reform | How the skill treats it |
|--------|------------------------|
| **Online Safety Act 2023** | Duties and Ofcom codes (Illegal Harms Code, Protection of Children Code) are phased through 2024--2026 -- the skill confirms which duties have commenced before requiring a risk assessment |
| **Data (Use and Access) Act 2025** | Operative provisions on lawful basis, automated decision-making, and PECR cookie exemptions are subject to commencement orders -- verified with `check_in_force` before being stated as binding; the pre-DUA position applies until then |
| **DMCCA 2024 subscription rules** | The new pre-contract information, reminder notices, and easy-exit duties (Part 4) commence in stages -- the operative date is verified before they are treated as in force |
| **EU AI Act (Reg (EU) 2024/1689)** | Phased: Article 5 prohibitions (2 Feb 2025), GPAI obligations (2 Aug 2025), most Annex III high-risk obligations (2 Aug 2026) -- relevant to UK products only via extraterritoriality (EU users or EU output) |
| **Modern Slavery Act 2015 s.54** | Applies above the £36m turnover threshold; the consultation on lowering it is treated as prospective, not current law |

### Frameworks assessed

The analysis covers ten UK frameworks in a fixed order, each with a verdict and an in-force status:

| Framework | Trigger signal | Key provisions |
|-----------|---------------|----------------|
| **Online Safety Act 2023** | User-generated content, messaging, search, livestream; UK users | Part 3 user-to-user / search service (s.3), illegal content duties (ss.9--11), children's safety duties (ss.11--12, s.36) |
| **UK GDPR / DPA 2018** | Any processing of UK residents' personal data | Lawful basis (Art. 6), special category conditions (Art. 9 + DPA Sch 1), DPIA (Art. 35), transfers (Arts. 44--49) |
| **PECR 2003** | Cookies, tracking, email or SMS marketing | Prior consent for non-essential cookies (reg. 6), soft opt-in (reg. 22(3)), sender identification (reg. 23) |
| **ICO Children's Code** | Any UK user could be under 18 | 15 standards including high-privacy defaults, geolocation off, profiling off; statutory under DPA 2018 s.123 |
| **EU AI Act** | AI involvement **and** EU users / establishment / output | Art. 5 prohibitions, Annex III high-risk classification, GPAI obligations, Art. 50 transparency |
| **FCA Consumer Duty + financial promotions** | Regulated activity, financial promotions, consumer credit, payment services | PRIN 2A four outcomes, FSMA 2000 s.21 promotions gateway, vulnerable-customer guidance (FG21/1) |
| **Consumer Rights Act 2015 + DMCCA 2024** | Any consumer-facing transaction, sale, subscription | CRA Part 1 (goods, digital content, services), unfair terms (Part 2), DMCCA subscriptions, fake reviews, drip pricing |
| **Equality Act 2010** | Any public-facing service or algorithmic decision | Service-provider duty (s.29), reasonable adjustments (s.20), indirect discrimination (s.19), WCAG 2.2 AA benchmark |
| **ASA / CAP Code** | Any marketing communication, including AI-generated copy | CAP Code sections 3, 5, 12, 14, 15; ASA AI guidance; influencer disclosure under CPRs 2008 |
| **Modern Slavery Act 2015 s.54** | Group turnover above £36m doing UK business | Annual board-approved statement, signed by a director, linked from the homepage |

### Output

The report opens with the product profile table and a **verdict headline** (`READY TO SHIP` / `BLOCKED -- N items` / `PROCEED WITH CAUTION -- N items`), then a regulator matrix, the detailed regulator memos, and a three-tier action plan:

- 🔴 **Tier 1 -- MUST DO before launch** -- regulatory blockers, criminal liability, immediate enforcement risk, or a clear-cut prohibition (e.g. an Article 5 EU AI Act prohibited practice, an Online Safety Act children's duty with no risk assessment, processing without a lawful basis, an unauthorised FSMA s.21 financial promotion).
- 🟡 **Tier 2 -- SHOULD DO before launch** -- material penalty exposure or high probability of enforcement within 6--12 months (e.g. missing Consumer Duty evidence, a non-compliant cookie banner, an incomplete Art. 13/14 transparency notice).
- 🟢 **Tier 3 -- DO WITHIN 90 DAYS** -- process, governance, and documentation that can be in-flight without holding launch (e.g. ROPA entry, vendor due diligence pack, GPAI training-data documentation).

Each action item carries the owning regulator, the citation, the concrete deliverable, and the latest acceptable date.

### Output filename

`PRE-LAUNCH-[product-slug]-[date].md`

### Key legislation

Online Safety Act 2023, UK GDPR, Data Protection Act 2018, Data (Use and Access) Act 2025, Privacy and Electronic Communications Regulations 2003 (PECR), ICO Age Appropriate Design Code (Children's Code), EU AI Act (Regulation (EU) 2024/1689), Financial Services and Markets Act 2000 (s.21) with FCA Consumer Duty (PRIN 2A), Consumer Rights Act 2015, Digital Markets, Competition and Consumers Act 2024 (DMCCA), Equality Act 2010, CAP Code, Modern Slavery Act 2015 (s.54).

## Related commands

- [/legal gdpr](/cli/compliance) -- deep Article-by-Article UK GDPR audit for any framework that scores APPLIES with data gaps
- [/legal ai-compliance](/cli/compliance) -- AI governance self-assessment, including EU AI Act exposure
- [/legal consumer](/cli/compliance) -- detailed Consumer Rights Act 2015 and DMCCA 2024 review
- [/legal legislation-tracker](/cli/compliance) -- confirms whether cited provisions are current, amended, repealed, or not yet in force

For the underlying in-force and commencement data behind every verdict, see [the legislation reference](/reference/legislation).
