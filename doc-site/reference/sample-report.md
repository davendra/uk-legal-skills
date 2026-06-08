# Example output — a contract review

This page shows what a real `/legal review` deliverable looks like, so you know what to expect before you run the command. The flagship review launches five parallel agents, scores the contract out of 100, and writes a Markdown report to your working directory. What follows is a trimmed version of one such report.

::: warning Illustrative example only
Everything below is a worked example built around a fictional consultancy agreement between a bank and a security consultancy. The figures, clauses, and score are illustrative — they are **not** a template and **not** advice on any real document. Run `/legal review` on your own contract to get a report keyed to its actual terms, with live in-force checks on any statutes it cites. See [/legal review](/cli/contract-analysis) for how the command works.
:::

---

# Contract Review Report

```
AI-Generated Legal Analysis — This output is produced by AI and does not constitute legal advice.
It is intended as a starting point for review. Always consult a qualified solicitor before
signing contracts or relying on generated legal documents. This tool is designed for use
under the laws of England and Wales.
```

## Contract Safety Score: 64/100 — Grade: C (Caution)

> Multiple risky clauses. Negotiate before signing.

## Executive Summary

This is an 18-month information security consultancy engagement under which the Consultant supplies a named individual to the Client's premises for a minimum of three days a week at a day rate of GBP 1,200. The drafting is competent and the liability, confidentiality, and regulatory-compliance clauses are broadly fair. The principal concern is **off-payroll (IR35) status risk**: a fettered substitution right, fixed minimum on-site days, and Client-supplied facilities point towards a relationship that could be treated as deemed employment, with the Client (a medium/large business) carrying the status-determination obligation. Resolve the IR35 exposure and tighten the substitution and personal-data clauses before signing.

## Contract Details

| Field | Value |
|-------|-------|
| Contract Type | Consultancy / contractor agreement |
| Parties | FinanceFirst Bank plc ↔ InfoSec Consulting Ltd |
| Effective Date | 1 April 2026 (Commencement Date) |
| Term | 18 months (to 30 September 2027) |
| Total Value | ~GBP 280,000 (est. at 3 days/week × day rate) |
| Governing Law | England and Wales |

## Risk Dashboard

| Risk Level | Count | Clauses |
|------------|-------|---------|
| 🔴 High Risk | 2 | Substitution & minimum on-site days (cll. 3.3, 3.5 — IR35), Data protection deferral (cl. 8.1) |
| 🟡 Medium Risk | 3 | Liability cap basis (cl. 9.2), Termination for convenience (cl. 10.1(a)), Overtime pro-rata definition (cl. 5.2) |
| 🟢 Low Risk | 6 | IP ownership (cl. 6), Confidentiality (cl. 7), Insurance (cl. 3.6), Regulatory co-operation (cl. 11), Dispute escalation (cl. 12), Governing law (cl. 14) |

## Clause-by-Clause Analysis

### 🔴 HIGH RISK CLAUSES

#### Substitution & Minimum On-Site Days — Sections 3.3 & 3.5 (IR35 status risk)

> **What it says (quoted):** *"The Consultant shall provide the Services at the Client's premises … for a minimum of 3 (three) days per week"* (cl. 3.3), and *"The Consultant may substitute Marcus Webb with an alternative consultant … provided that the Client has given its prior written approval … The substitute must hold current SC security clearance"* (cl. 3.5).

- **Plain-English meaning:** A named person must do the work in person, on the Client's premises, on fixed days each week, and the Consultant can only send someone else if the Client agrees first. In practice the Consultant cannot freely swap people in and out.
- **Why it matters:** These are three of the classic markers HMRC weighs when deciding whether an off-payroll engagement is really *deemed employment* under the IR35 / off-payroll rules. A substitution right that is fettered by Client approval is weak evidence of genuine self-employment; fixed minimum days and Client-controlled facilities point the same way (*personal service*, *control*, *mutuality*). Because the Client is a medium/large business, **the Client — not the Consultant's company — carries the status-determination obligation** and the PAYE/NICs exposure if the determination is wrong. The skill flags this as 🔴 High and confirms the current off-payroll regime against live legislation before relying on it.
- **Suggested replacement language:** *"The Consultant may provide the Services through any suitably qualified and security-cleared personnel of its choosing and may substitute such personnel at its discretion, subject only to the substitute holding current SC clearance; the Client's consent is not required. The Consultant shall determine the manner, hours, and location in which the Services are performed, save where physical site access is operationally necessary."* Pair this with a contemporaneous Status Determination Statement (CEST or equivalent) retained on file.

::: details Why this single clause moves the score
The IR35 markers sit inside the 25%-weighted **Risk** lane and the 20%-weighted **Compliance** lane, so a 🔴 finding here pulls the aggregate Contract Safety Score down materially even though most of the agreement is well drafted. That is why an otherwise tidy contract lands at *Caution* rather than *Good*.
:::

*(The full report also works through the 🔴 data-protection-deferral clause and each 🟡 clause in the same quoted → meaning → replacement format. They are omitted here for length.)*

### 🟡 MEDIUM RISK CLAUSES

- **Liability cap basis (cl. 9.2)** — cap is the *greater of* GBP 500,000 or 12 months' fees, which can run well above contract value; consider a single fixed cap tied to fees paid.
- **Termination for convenience (cl. 10.1(a))** — either party may exit on 30 days' notice, leaving the Consultant exposed to early termination of an 18-month engagement; consider a minimum committed period or a kill fee.
- **Overtime definition (cl. 5.2)** — "a day" is 8 hours with pro-rata charging beyond that, but there is no cap or approval gate on out-of-hours work.

### 🟢 LOW RISK / STANDARD CLAUSES

IP ownership (cl. 6) correctly vests bespoke Deliverables in the Client on payment while preserving Consultant background IP under licence; confidentiality (cl. 7), insurance levels (cl. 3.6), FCA/PRA co-operation (cl. 11), tiered dispute resolution (cl. 12), and the England & Wales governing-law/jurisdiction clauses (cl. 14) are all market-standard and acceptable.

## Missing Protections

- No express **Status Determination Statement** or IR35 indemnity allocation.
- No data-processing terms in the body — cl. 8.1 defers everything to a *separate* DPA that is not provided, so UK GDPR Article 28 processor obligations are unverified.
- No service levels or acceptance criteria tied to the Schedule 1 deliverables.

## Obligations & Deadlines

| Obligation | Party | Deadline | Consequence of Missing |
|------------|-------|----------|------------------------|
| Pay each invoice | Client | 30 days of receipt | Statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998 |
| Remedy material breach | Either | 14 days of notice | Immediate termination right arises (cl. 10.1(b)) |
| Provide insurance certificates | Consultant | On request | Breach of cl. 3.7; potential cover gap |

## Compliance Flags

- **IR35 / off-payroll working** — status-determination obligation sits with the Client; verify the current regime against legislation.gov.uk before finalising.
- **UK GDPR / Data Protection Act 2018** — processor terms deferred to an unseen DPA; Article 28 compliance cannot be confirmed.
- **FCA/PRA outsourcing** — cl. 11 co-operation is present and adequate for a regulated client.

## Negotiation Priorities

1. **Fix the IR35 markers** — unfettered substitution wording plus a documented status determination (proposed language above).
2. **Attach the DPA** — bring Article 28 processor terms into the agreement or annex the executed DPA before signing.
3. **Re-base the liability cap** — replace "greater of" with a single fixed cap proportionate to fees.

## Recommended Next Steps

1. [ ] Send the substitution and minimum-on-site-days redrafts (cll. 3.3 / 3.5) and request a Status Determination Statement.
2. [ ] Request the referenced Data Processing Agreement and confirm UK GDPR Article 28 coverage.
3. [ ] Re-negotiate the liability cap (cl. 9.2) to a single fixed figure.
4. [ ] Run `/legal ir35` on this contract for a dedicated off-payroll status determination.
5. [ ] Run `/legal report-pdf` to produce a client-ready PDF of this analysis.
6. [ ] Consult a qualified solicitor before signing.

---

::: tip Want the same report as a PDF?
After any review, run `/legal report-pdf` to turn the most recent analysis into a branded, A4 PDF for client delivery. See [/legal report-pdf](/cli/utilities#legal-report-pdf).
:::

The report above saves to your working directory as `CONTRACT-REVIEW-[name]-[date].md` — for this example, `CONTRACT-REVIEW-infosec-consultancy-2026-06-08.md`.

## Related commands

- [/legal review](/cli/contract-analysis) — the flagship command that produces this report.
- [/legal report-pdf](/cli/utilities#legal-report-pdf) — turn the report into a branded PDF.
- [/legal ir35](/cli/employment) — dedicated off-payroll status determination for the kind of risk flagged above.
- [/legal negotiate](/cli/contract-analysis) — generate counter-proposal language for the risky clauses.
