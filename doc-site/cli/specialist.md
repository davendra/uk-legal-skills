# Specialist Skills

Life does not fit into neat legal categories. These specialist commands handle the situations that fall outside standard contract review -- from disputes and debt recovery to intellectual property, immigration, and estate planning.

Five commands for dispute resolution, M&A due diligence, intellectual property, debt recovery, and wills and probate. Each command produces a scored assessment report with detailed recommendations under England and Wales law.

![Specialist hub (broadsheet rebrand) — five fields, one panel](/images/specialist-hub-2026.jpg)

*Plate I — the broadsheet rebrand.*

![Five specialist legal analysis areas](/images/specialist-hub.jpg)

*Plate I.a — the original, kept for reference.*

## /legal dispute

**Why use this?** You are in a disagreement that might end up in court, or you want to check whether a contract has proper dispute resolution provisions. This command assesses your position, checks limitation periods (miss the deadline and your claim is gone), and recommends the best route -- mediation, arbitration, or litigation.

Dispute resolution analysis covering CPR pre-action protocols, ADR enforceability, arbitration, limitation periods, fixed recoverable costs, and Part 36 offers.

### Syntax

```bash
/legal dispute <file>
```

### Document Types Accepted

| Document Type | Key Indicators |
|---------------|----------------|
| Contract with DR clauses | Arbitration clause, mediation clause, jurisdiction clause, escalation procedure |
| ADR agreement | Mediation agreement, arbitration agreement, expert determination agreement |
| Pre-action letter | Letter before claim, letter of response, Part 36 offer |
| Arbitration agreement | Seat of arbitration, arbitral institution, number of arbitrators |
| Settlement agreement | Tomlin order, consent order, full and final settlement, release of claims |
| Jurisdiction agreement | Exclusive/non-exclusive jurisdiction, service of process |

### Assessment Frameworks

The analysis is scored across six weighted frameworks:

| Framework | Weight | What Is Assessed |
|-----------|--------|------------------|
| **Pre-Action Protocols (CPR)** | 20% | Correct protocol identified, letter of claim requirements, response timelines, ADR consideration, document disclosure, expert evidence |
| **ADR Clauses** | 25% | Mediation provisions, Arbitration Act 1996 compliance (seat, rules, confidentiality), expert determination, escalation procedures, enforceability |
| **Fixed Recoverable Costs** | 10% | FRC regime applicability (up to 100k), complexity band assignment (1--4), disbursement limits |
| **Limitation Periods** | 25% | Primary limitation under Limitation Act 1980 (6yr contract, 12yr deed, 3yr PI), latent damage (s.14A), date of knowledge, standstill agreements |
| **Jurisdiction & Enforcement** | 10% | Exclusive vs non-exclusive jurisdiction, Hague Convention compliance, service out of jurisdiction, foreign judgment enforcement |
| **Costs Provisions** | 10% | QOCS, Part 36 offers (21-day relevant period, consequences of failing to beat), costs budgeting, indemnity vs standard basis, Calderbank offers |

::: tip Part 36 Consequences
A valid Part 36 offer that the opponent fails to beat at trial triggers automatic consequences: for a claimant's rejected offer, the defendant faces indemnity costs, enhanced interest (up to 10% above base rate), and an additional amount (up to 75,000 pounds). These are assessed automatically.
:::

::: warning Limitation Is Fatal
Limitation carries 25% weight because it is a complete defence. If the limitation period has expired, the claim is extinguished regardless of merits. The analysis flags expiring and expired periods prominently.
:::

### Scoring

Each check item within a framework is scored as Pass (full points), Warning (half points), Fail (0 points), or N/A (excluded). The overall Dispute Resolution Assessment Score (0--100) is the weighted aggregate.

| Grade | Score | Meaning |
|-------|-------|---------|
| A | 90--100 | Robust dispute resolution framework |
| B | 75--89 | Good with minor gaps |
| C | 60--74 | Moderate gaps requiring attention |
| D | 40--59 | Significant dispute resolution risks |
| F | 0--39 | Critical deficiencies -- urgent action required |

### Priority Classification

| Priority | Criteria | Examples |
|----------|----------|----------|
| :red_circle: Critical | Active legal exposure; loss of claim or unenforceable clause | Limitation expired, arbitration clause void for uncertainty, no PAP compliance |
| :yellow_circle: High | Significant gap; address within 14 days | Part 36 offer technically invalid, inadequate ADR enforceability |
| :yellow_circle: Medium | Important but not immediately irrecoverable | Incomplete costs budgeting, asymmetric jurisdiction clause |
| :green_circle: Low | Best practice improvements | No Calderbank strategy, mediation clause could be strengthened |

### Key Legislation

- Civil Procedure Rules (CPR) Parts 36, 44--47
- Arbitration Act 1996
- Limitation Act 1980
- Hague Convention on Choice of Court Agreements 2005
- Senior Courts Act 1981

### Key Case Law

- *Halsey v Milton Keynes General NHS Trust* [2004] EWCA Civ 576 (ADR refusal and costs)
- *Churchill v Merthyr Tydfil CBC* [2023] EWCA Civ 1416 (courts can order ADR)
- *Walford v Miles* [1992] 1 AC 128 (agreement to negotiate unenforceable)
- *Cable & Wireless v IBM* [2002] EWHC 2059 (defined ADR process enforceable)
- *Enka v Chubb* [2020] UKSC 38 (governing law of arbitration agreement)

### Example

```bash
/legal dispute ./contracts/distribution-agreement.pdf
```

### Output

`DISPUTE-RESOLUTION-REVIEW-[identifier]-[YYYY-MM-DD].md`

The report includes a scorecard, executive summary, limitation period tracker, costs risk assessment, gap analysis table, framework detail sections, recommended clause amendments, and a remediation roadmap with immediate/weekly/monthly action items.

---

## /legal due-diligence

**Why use this?** You are buying or investing in a business and need to know what documents are missing from the data room, what red flags to worry about, and whether the deal is ready to complete. This runs a 60-item checklist across corporate, financial, commercial, employment, property, IP, regulatory, and litigation categories.

M&A due diligence gap analysis with a 60-item checklist across 8 categories and traffic-light status per category.

### Syntax

```bash
/legal due-diligence <file>
```

### Transaction Types

| Type | Key Indicators |
|------|----------------|
| **Share purchase** | Share purchase agreement, completion accounts, warranty and indemnity provisions |
| **Asset purchase** | Asset schedules, novation of contracts, TUPE transfer |
| **Merger** | Scheme of arrangement, court-sanctioned process, shareholder circulars |
| **MBO/MBI** | Management equity participation, vendor loan notes, ratchet provisions |
| **Joint venture** | JV agreement, deadlock provisions, exit mechanisms |
| **Investment** | Subscription agreement, anti-dilution provisions, drag/tag rights |

### Due Diligence Checklist (60 Items, 8 Categories)

| # | Category | Weight | Items | Key Documents |
|---|----------|--------|-------|---------------|
| 1 | **Corporate** | 20% | 9 items (C1--C9) | Certificate of incorporation, articles of association, shareholder register, PSC register, board minutes (3 years), director service contracts, group structure chart |
| 2 | **Financial** | 20% | 9 items (F1--F9) | Audited accounts (3 years), management accounts, aged debtors/creditors, bank facilities, charges register, tax computations, HMRC correspondence |
| 3 | **Commercial** | 15% | 7 items (CO1--CO7) | Material contracts (over 50k or 12+ months), top 10 customer and supplier contracts, distribution/agency agreements, change of control schedule |
| 4 | **Employment** | 15% | 8 items (E1--E8) | Employee list with terms, pension arrangements, bonus/incentive schemes, tribunal claims, settlement agreements, collective agreements, TUPE analysis, key person dependencies |
| 5 | **Property** | 10% | 7 items (P1--P7) | Title deeds, leases, planning permissions, environmental reports, building surveys, rates assessments, service charge budgets |
| 6 | **IP** | 10% | 8 items (IP1--IP8) | Patent/trade mark/design registrations, unregistered IP, domain names, software licences, open-source audit, IP assignments from employees/contractors |
| 7 | **Regulatory** | 5% | 6 items (R1--R6) | Licences and permits, regulatory correspondence, GDPR/UK GDPR compliance, H&S records, insurance policies, compliance certifications |
| 8 | **Litigation** | 5% | 6 items (L1--L6) | Current and threatened claims, regulatory investigations, settlement agreements, court orders, unsatisfied judgments |

::: tip Weight Adjustment
Category weights are adjusted based on the target business. For technology companies, IP weight increases. For regulated entities, regulatory weight increases. For real estate businesses, property weight increases.
:::

### Status Indicators

| Status | Symbol | Meaning |
|--------|--------|---------|
| Provided | :white_check_mark: | Document appears to have been provided |
| Missing | :x: | Document is not provided and not referenced |
| Incomplete | :warning: | Document is partially provided, outdated, or requires further information |
| N/A | -- | Not applicable to this transaction type |

### Criticality Levels

| Criticality | Transaction Impact |
|-------------|-------------------|
| :red_circle: **Essential** | Transaction may not complete; may require specific indemnity; W&I insurer may refuse cover |
| :yellow_circle: **Important** | May delay completion; may affect valuation or require escrow |
| :green_circle: **Nice to Have** | Unlikely to delay completion; can be addressed post-completion |

### Red Flag Categories

The analysis automatically flags red flags in these categories:

- **Title defects** -- gaps in share ownership chain, unresolved charges
- **Financial irregularities** -- qualified audit opinions, going concern doubts
- **Change of control risk** -- material contracts with termination rights
- **Employment exposure** -- unfunded pension liabilities, TUPE non-compliance
- **Regulatory risk** -- lapsed licences, open investigations, data breaches
- **Litigation exposure** -- material claims, unsatisfied CCJs
- **IP deficiencies** -- gaps in ownership chain, open-source GPL contamination
- **Environmental liability** -- contaminated land, outstanding remediation

### Key Legislation

- Companies Act 2006 (corporate documents, director duties, charges)
- Employment Rights Act 1996 (employment terms, unfair dismissal)
- TUPE Regulations 2006 (transfer of undertakings)
- Enterprise Act 2002 (merger control)
- UK GDPR / Data Protection Act 2018

### Example

```bash
/legal due-diligence ./dataroom/index.pdf
```

### Output

`DUE-DILIGENCE-GAP-ANALYSIS-[identifier]-[YYYY-MM-DD].md`

The report includes a readiness scorecard (grade A--F), executive summary, full gap analysis table (60 items), red flags section, category detail tables, missing documents priority schedule (essential/important/nice-to-have), W&I insurance considerations, and an estimated completion timeline.

---

## /legal ip

**Why use this?** You need to check who actually owns the intellectual property in a contract -- whether that is copyright, patents, trade marks, or trade secrets. This is especially important if you are licensing software, hiring contractors to create work, or dealing with AI-generated content where ownership rules are unclear.

Intellectual property review and protection assessment.

### Syntax

```bash
/legal ip <file>
```

### Document Types

- IP licence agreements (exclusive / non-exclusive / sole)
- IP assignment deeds
- Trade mark licences and co-existence agreements
- Patent licences
- Software licences (SaaS, on-premise, open source)
- Employment and consultancy IP clauses
- Confidentiality / NDA with IP provisions
- IP portfolio summaries and due diligence reports

### Analysis Framework

| Area | Legislation | What Is Assessed |
|------|-------------|------------------|
| **Copyright** | CDPA 1988 | Ownership (s.11 -- employer vs contractor), assignment requirements (s.90), moral rights and waivers (s.87), duration, fair dealing |
| **Patents** | Patents Act 1977 | Employee inventions (ss.39--43), patent validity, infringement risk, supplementary protection certificates |
| **Trade marks** | Trade Marks Act 1994 | Registration status, distinctiveness, infringement risk, passing off, co-existence |
| **Trade secrets** | Trade Secrets Regs 2018 | Adequacy of confidentiality protections, springboard injunctions, reasonable steps requirement |
| **AI-generated works** | CDPA 1988 s.9(3) | Computer-generated works ownership, training data rights, AI inventorship (*Thaler v Comptroller-General* DABUS ruling) |
| **Open source** | Various licences | Copyleft contamination risk (GPL, AGPL), licence compatibility, FOSS compliance obligations |

::: warning AI-Generated Works
Section 9(3) CDPA 1988 provides that for computer-generated works, the author is "the person by whom the arrangements necessary for the creation of the work are undertaken." This creates significant uncertainty for AI-generated content. The analysis flags this risk for any IP provisions touching AI output.
:::

::: tip Employee vs Contractor IP
Under s.11 CDPA 1988, copyright in works created by employees in the course of employment belongs to the employer automatically. For contractors, ownership must be expressly assigned -- it does not vest automatically in the commissioning party. Missing contractor IP assignments are flagged as critical gaps.
:::

### Scored Output

| Dimension | Score Range | What It Measures |
|-----------|------------|------------------|
| IP ownership clarity | 0--100 | Chain of title, assignment completeness, employee/contractor coverage |
| Licence terms adequacy | 0--100 | Scope, territory, exclusivity, sublicensing, termination provisions |
| Risk of infringement | 0--100 | Third-party IP exposure, freedom to operate, indemnification |
| Commercial protection | 0--100 | Warranties, indemnities, restrictive covenants, non-compete enforceability |

### Key Legislation

- Copyright, Designs and Patents Act 1988 (CDPA)
- Patents Act 1977
- Trade Marks Act 1994
- Registered Designs Act 1949
- Trade Secrets (Enforcement, etc.) Regulations 2018

### Example

```bash
/legal ip ./contracts/software-licence.pdf
```

### Output

`IP-REVIEW-[name]-[YYYY-MM-DD].md`

The report includes an overall IP Protection Score (0--100, grade A--F), ownership analysis, licence terms assessment, risk assessment table, clause-by-clause analysis with risk scores, and prioritised recommendations with replacement language.

---

## /legal debt

**Why use this?** Someone owes you money and you want to know the best way to get it back -- or you have received a debt claim and need to understand your position. This command checks limitation periods, calculates interest owed, and recommends the most cost-effective enforcement route for your situation.

Debt recovery and enforcement review.

### Syntax

```bash
/legal debt <file>
```

### Document Types

- Letters before action / letters of claim
- County Court claims (N1 form, Particulars of Claim)
- Statutory demands (s.123 Insolvency Act 1986)
- Payment plans and instalment agreements
- Personal guarantees
- Deeds of settlement / compromise agreements
- Charging order applications
- Writs of control / warrants of execution
- Third-party debt orders

### Analysis Framework

#### Pre-Action Protocol Compliance

| Requirement | Detail |
|-------------|--------|
| Sufficient information | Debt amount, basis of claim, interest calculation provided to debtor |
| Response period | **30 days** for business debtors, **14 days** for individuals |
| ADR consideration | Genuine consideration of alternative dispute resolution |
| Proportionality | Claim proportionate to the amount owed |

#### Limitation Period Check (Limitation Act 1980)

| Cause of Action | Period | Section |
|----------------|--------|---------|
| Simple contract | 6 years from breach | s.5 |
| Deed | 12 years from breach | s.8 |
| Personal injury | 3 years from injury/knowledge | s.11 |
| Acknowledgement/part payment restart | Resets clock | ss.29--30 |

::: warning Time-Barred Debts
A debt that has passed its limitation period is unrecoverable through the courts. The analysis prominently flags debts at risk of becoming time-barred and calculates the exact expiry date.
:::

#### Interest Calculation

| Type | Rate | Authority |
|------|------|-----------|
| **B2B statutory interest** | 8% + Bank of England base rate | Late Payment of Commercial Debts Act 1998 |
| **County Court interest** | 8% simple | County Court Act 1984 s.69 |
| **Contractual interest** | As stated in the contract | Subject to unfair terms assessment |
| **B2B fixed compensation** | 40--100 pounds depending on debt size | Late Payment Act 1998 |

#### Enforcement Route Recommendations

| Debt Amount | Debtor Type | Recommended Route |
|------------|-------------|-------------------|
| Under 10,000 pounds | Any | Small claims track, Money Claim Online |
| 10,000--25,000 pounds | Any | Fast track |
| Over 25,000 pounds | Any | Multi-track or High Court enforcement |
| Over 750 pounds | Company | Statutory demand, winding-up petition |
| Over 5,000 pounds | Individual | Statutory demand, bankruptcy petition |
| Any with property | Any | Charging order on property |
| Employed debtor | Individual | Attachment of earnings |
| Debtor with bank account | Any | Third-party debt order |
| Debtor with goods | Any | Writ of control (High Court) or warrant of execution (County Court) |

#### Consumer Debt Protections

| Protection | Legislation | What It Covers |
|------------|-------------|----------------|
| CCA 1974 compliance | Consumer Credit Act 1974 | Regulated agreements, default notices, unfair relationships |
| FCA debt collection | CONC 7 | Fair treatment, communication frequency, vulnerable customers |
| Breathing space | Debt Respite Scheme | 60-day moratorium on enforcement, interest, and charges |
| Administration order | County Court Act 1984 | Court-managed repayment for debts under 5,000 pounds |
| IVA | Insolvency Act 1986 | Individual Voluntary Arrangement as alternative to bankruptcy |

::: tip B2B Late Payment
For business-to-business debts, the Late Payment of Commercial Debts Act 1998 provides a statutory entitlement to 8% above the Bank of England base rate, plus fixed compensation of 40 pounds (debt under 1,000), 70 pounds (debt 1,000--9,999.99), or 100 pounds (debt 10,000+). The analysis calculates the total automatically.
:::

### Key Legislation

- Limitation Act 1980
- Late Payment of Commercial Debts (Interest) Act 1998
- Civil Procedure Rules (CPR)
- Insolvency Act 1986
- Consumer Credit Act 1974

### Example

```bash
/legal debt ./correspondence/letter-before-action.pdf
```

### Output

`DEBT-REVIEW-[debtor]-[YYYY-MM-DD].md`

The report includes a claim summary (creditor, debtor, principal, interest, total), overall strength score (0--100, grade A--F), pre-action compliance table, limitation period tracker with expiry date and status, recommended recovery route with estimated costs and timeline, risk factors, and a step-by-step action plan with deadlines.

---

## /legal wills

**Why use this?** You want to check whether a will is properly drafted and legally valid, understand the inheritance tax position, or identify who might have a claim against the estate. This is useful whether you are drafting a new will, reviewing an existing one, or dealing with probate.

Wills and probate document review.

### Syntax

```bash
/legal wills <file>
```

### Document Types

- Wills (simple, mirror, mutual)
- Codicils
- Letters of wishes
- Lasting Powers of Attorney (Property & Financial Affairs, Health & Welfare)
- Grant of Probate / Letters of Administration applications
- IHT400 / IHT205 (inheritance tax returns)
- Deeds of Variation (s.142 IHTA 1984)
- Trust deeds (lifetime, will trust, discretionary, interest in possession)

### Analysis Framework

#### Wills Act 1837 Compliance (s.9 Execution Requirements)

| Requirement | What Is Checked |
|-------------|----------------|
| Testamentary capacity | *Banks v Goodfellow* [1870] four-part test: understands nature of will-making, knows extent of estate, aware of moral claims, free from delusion |
| Knowledge and approval | Testator understood and approved the contents of the will |
| Execution (s.9) | Signed by testator (or at direction), in the presence of 2 witnesses who both attest |
| Witness independence | Beneficiary witness rule (s.15) -- gift to a witness or their spouse is void |
| Attestation clause | Present, adequate, and confirms s.9 compliance |
| Revocation clause | Express revocation of all prior wills and codicils |

::: warning The Golden Rule
Following *Kenward v Adams* [1975], where there is any doubt about the testator's capacity (especially the elderly or seriously ill), a medical practitioner should examine the testator and record their opinion on capacity. The analysis flags high-risk capacity situations.
:::

#### Substantive Review

- Executor appointments (professional vs lay, number, substitutes)
- Guardian appointments for minor children
- Specific gifts and pecuniary legacies
- Residuary estate disposition
- Trust provisions (age contingencies, trustee powers, class gifts)
- Survivorship clauses (28-day standard)
- Digital assets provisions
- Funeral wishes

#### Inheritance Tax Planning (IHTA 1984)

| Relief/Allowance | Amount/Rate | Conditions |
|-----------------|-------------|------------|
| **Nil-rate band (NRB)** | 325,000 pounds | Available to all estates |
| **Residence nil-rate band (RNRB)** | 175,000 pounds | Must leave a qualifying residential interest to a direct descendant; tapered withdrawal for estates over 2m pounds |
| **Transferable NRB** | Up to 100% of deceased spouse's unused NRB | Spouse/civil partner must have died first without fully using their NRB |
| **Transferable RNRB** | Up to 100% of deceased spouse's unused RNRB | Same conditions as transferable NRB |
| **Business Property Relief (BPR)** | 50% or 100% | Relevant business property held for 2+ years; 100% for unquoted shares, business, interest in business; 50% for quoted shares giving control, land/buildings/machinery used by partnership/company |
| **Agricultural Property Relief (APR)** | 50% or 100% | Agricultural property occupied for 2+ years (owner-occupier) or 7 years (let); 100% if vacant possession or let on tenancy beginning after 1 Sept 1995 |
| **Charity exemption** | 40% to 36% rate reduction | Reduced rate of 36% (instead of 40%) if 10%+ of baseline amount left to charity |
| **Potentially Exempt Transfers** | Full exemption after 7 years | Taper relief applies between 3--7 years |

::: tip Maximum Combined Allowance
A married couple or civil partners can combine their allowances for a potential maximum of 1,000,000 pounds free of IHT (2 x 325,000 NRB + 2 x 175,000 RNRB), provided the RNRB conditions are met.
:::

#### Inheritance (Provision for Family and Dependants) Act 1975

The analysis assesses claim risk from potential applicants:

| Applicant Category | Test Applied |
|-------------------|--------------|
| Surviving spouse/civil partner | Such financial provision as is reasonable in all circumstances (higher standard) |
| Former spouse (not remarried) | Reasonable financial provision for maintenance |
| Cohabitant (2+ years before death) | Reasonable financial provision for maintenance |
| Child of the deceased | Reasonable financial provision for maintenance |
| Person treated as child of family | Reasonable financial provision for maintenance |
| Person maintained by the deceased | Reasonable financial provision for maintenance |

#### LPA Compliance (Mental Capacity Act 2005)

- Certificate provider requirements
- Named persons to be notified
- Restrictions and conditions
- Registration with the Office of the Public Guardian (OPG)
- Capacity presumption and best interests principles

### Key Legislation

- Wills Act 1837
- Administration of Estates Act 1925
- Inheritance Tax Act 1984 (IHTA)
- Inheritance (Provision for Family and Dependants) Act 1975
- Mental Capacity Act 2005
- Trustee Act 2000

### Key Case Law

- *Banks v Goodfellow* [1870] LR 5 QB 549 (testamentary capacity test)
- *Kenward v Adams* [1975] (golden rule for capacity assessment)

### Example

```bash
/legal wills ./estate/will-draft.pdf
```

### Output

`WILL-REVIEW-[testator]-[YYYY-MM-DD].md`

The report includes an overall validity score (0--100, grade A--F), execution compliance table (Wills Act 1837), estate distribution summary, IHT estimate with available reliefs and estimated liability, Inheritance Act 1975 claim risk assessment (high/medium/low with identified potential claimants and defensive measures), and prioritised recommendations with replacement language.
