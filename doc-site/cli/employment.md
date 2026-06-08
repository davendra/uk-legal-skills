# Employment

Employment law in the UK changed dramatically in 2025. These commands help you check whether employment contracts comply with the latest legislation -- including unfair dismissal from day one, flexible working rights, and the new zero-hours protections.

Three commands for employment contracts, IR35 determinations, and freelancer contract reviews.

![Employment review (broadsheet rebrand) — four agents in parallel](/images/employment-agents-2026.jpg)

*Plate I — the broadsheet rebrand.*

![Four parallel agents review employment contracts simultaneously](/images/employment-agents.jpg)

*Plate I.a — the original, kept for reference.*

## /legal employment

**Why use this?** You are hiring someone, or you have been offered a job, and you want to make sure the contract is legally compliant and fair. This is especially important since the Employment Rights Act 2025 introduced day-one unfair dismissal rights and other major changes.

Launches **4 parallel agents** to produce a comprehensive employment document review with an ERA 2025 compliance dashboard.

### Syntax

```bash
/legal employment <file>
```

### What it does

1. **Ingestion**: Classifies the document (employment contract, offer letter, settlement agreement, policy document, handbook extract) and extracts metadata (employer, employee, role, salary, notice periods, probation).
2. **Parallel analysis**: Launches four equal-weight (25% each) subagents:

| Agent | Role |
|-------|------|
| `legal-employment-contract` | Analyses every clause against UK employment legislation, verifies written particulars compliance, assesses restrictive covenants, performs ERA 2025 impact assessment |
| `legal-employment-rights` | Verifies all 11 statutory employment rights: day-one unfair dismissal, SSP, flexible working, family leave, whistleblowing, working time, holiday, NMW/NLW, pension, tribunal time limits, zero-hours protections |
| `legal-employment-discrimination` | Scans every clause against all 9 protected characteristics, assesses harassment policy adequacy, evaluates equal pay provisions, identifies indirect discrimination risk |
| `legal-employment-obligations` | Extracts all obligations, maps key dates, builds operational timeline, calculates financial exposure on termination, assesses restrictive covenant enforceability |

3. **Aggregation**: Produces Employment Review Score (0--100) with grade A+ to F.

### Key legislation

| Statute | What it covers |
|---------|---------------|
| Employment Rights Act 2025 | Day-one unfair dismissal, probation framework, SSP from day one, flexible working, zero-hours protections, third-party harassment duty, extended tribunal time limits |
| Equality Act 2010 | 9 protected characteristics, harassment (ss.26--27), equal pay (ss.64--80), pay secrecy (s.77), preventative duty (s.40A) |
| Working Time Regulations 1998 | Maximum 48-hour week, rest breaks, holiday entitlement |
| National Minimum Wage Act 1998 | Minimum pay rates by age band |

### Output sections

- Employment Review Score with grade
- ERA 2025 Compliance Dashboard (8 requirements, pass/fail/warning)
- Equality Act 2010 Compliance Matrix (9 protected characteristics)
- Harassment Policy Assessment
- Equal Pay Analysis
- Written Particulars Compliance (s.1 ERA 1996) -- 16 required particulars
- Clause-by-clause analysis sorted by risk
- Obligations timeline (during employment, on termination, post-termination restrictions)
- Financial exposure summary (notice pay, redundancy, bonus, holiday, pension, training clawback)
- Missing protections
- Prioritised recommendations

### Example

```bash
/legal employment ./hr/employment-contract-draft.docx
```

### Output filename

`EMPLOYMENT-REVIEW-[name]-[date].md`

---

## /legal ir35

**Why use this?** You are engaging a contractor (or you are a contractor) and need to know whether HMRC would consider the arrangement to be employment in disguise. Getting this wrong can mean a large unexpected tax bill.

7-factor HMRC CEST-aligned IR35 status determination for contractor and consultancy agreements.

### Syntax

```bash
/legal ir35 <file>
```

### What it does

Analyses a contractor agreement against seven factors derived from leading case law, each scored on a 5-point scale (+2 Strong Inside to -2 Strong Outside):

| # | Factor | Inside indicator | Outside indicator |
|---|--------|-----------------|-------------------|
| 1 | **Control** | Client dictates methods, hours, location | Worker decides how, when, where |
| 2 | **Substitution** | Must perform personally, no substitute right | Genuine unfettered right to send a substitute |
| 3 | **Mutuality of obligation** | Ongoing obligation to provide and accept work | Project-by-project, no obligation between engagements |
| 4 | **Financial risk** | Fixed rate, no rework liability | Fixed-price deliverables, bears cost of defects |
| 5 | **Part and parcel** | Client email, org chart, staff meetings | Own company branding, visitor access only |
| 6 | **Equipment** | Client provides all tools | Worker provides own significant equipment |
| 7 | **Exclusivity** | Cannot work for others | Free to take on other clients |

### Determination thresholds

| Total score | Status | Meaning |
|-------------|--------|---------|
| +5 to +14 | **Inside IR35** | Hallmarks of employment; PAYE applies |
| -4 to +4 | **Borderline** | Finely balanced; professional advice recommended |
| -14 to -5 | **Outside IR35** | Genuine self-employment |

### Case law cross-reference

The assessment is evaluated against:
- *Ready Mixed Concrete v Minister of Pensions* [1968] -- 3-part test
- *Market Investigations v Minister of Social Security* [1969] -- "in business on own account"
- *Hall v Lorimer* [1994] -- "painting a picture from accumulation of detail"
- *Autoclenz v Belcher* [2011] -- sham clauses disregarded
- *Pimlico Plumbers v Smith* [2018] -- substitution must be genuine and unfettered

### Financial exposure estimate

Calculates the tax exposure if the engagement is determined inside IR35:
- Lost dividend efficiency for the worker/PSC
- Additional Income Tax and Employee NICs
- Employer NICs for the fee-payer (13.8% above threshold)
- Backdated liability risk (up to 6 years)

### Example

```bash
/legal ir35 ./contracts/consultancy-agreement.pdf
```

### Output filename

`IR35-ASSESSMENT-[party-names]-[date].md`

### Key legislation

ITEPA 2003 (Chapter 10 -- off-payroll working rules), Companies Act 2006 (small company exemption thresholds).

---

## /legal freelancer

**Why use this?** You are a freelancer or contractor who has been sent a contract. You want to know whether the terms are fair, whether you are being misclassified, and what traps to watch out for -- like unlimited revisions, no kill fee, or an overly broad non-compete.

Reviews a contract specifically from the freelancer's perspective, including a Freelancer Bill of Rights checklist.

### Syntax

```bash
/legal freelancer <file>
```

### What it does

Analyses every clause through 14 critical lenses:

| # | Lens | Key concern |
|---|------|-------------|
| 1 | Misclassification risk | IR35 red flags |
| 2 | IP ownership | Default ownership under CDPA 1988, blanket assignment traps |
| 3 | Payment terms | Net-90+, pay-when-paid, no kill fee |
| 4 | Kill fee / cancellation | Compensation if client terminates early |
| 5 | Scope creep protections | Change order process, vague scope language |
| 6 | Revision limits | Unlimited revisions trap |
| 7 | Non-compete | Duration, geography, activity scope, enforceability |
| 8 | Non-solicit | Client customers, employees, mutuality |
| 9 | Confidentiality scope | Overly broad definitions, portfolio restrictions |
| 10 | Liability and indemnification | Uncapped liability, one-sided indemnification |
| 11 | Portfolio usage rights | Right to showcase work |
| 12 | Insurance requirements | Proportionality to project scope |
| 13 | Tax responsibilities | Self Assessment, UTR, PAYE provisions |
| 14 | Dispute resolution | Forced arbitration, distant venue |

### Freelancer Fairness Score

| Category | Weight |
|----------|--------|
| Payment terms and kill fee | 20% |
| IP ownership and portfolio rights | 20% |
| Scope and revision protections | 15% |
| Non-compete / non-solicit | 15% |
| Liability and indemnification | 10% |
| Misclassification risk | 10% |
| Confidentiality scope | 5% |
| Dispute resolution | 5% |

| Score | Grade | Verdict |
|-------|-------|---------|
| 85--100 | A | Freelancer-friendly. Sign with confidence. |
| 70--84 | B | Mostly fair. Negotiate minor issues. |
| 55--69 | C | Mixed. Several terms need negotiation. |
| 40--54 | D | Client-favouring. Significant negotiation needed. |
| 0--39 | F | Exploitative. Do not sign without major revisions. |

### Common traps detected

Unlimited revisions, no kill fee, overly broad non-compete, blanket IP assignment, Net-90+ payment, vague scope, pay-when-paid, one-sided indemnification, no portfolio rights, forced arbitration, pre-existing IP grab, automatic renewal.

### Example

```bash
/legal freelancer ./contracts/design-contract.pdf
```

### Output filename

`FREELANCER-REVIEW-[date].md`

### Key legislation

ITEPA 2003 (IR35), ERA 1996 (employment status), CDPA 1988 (copyright ownership).
