# Contract Analysis

Contract analysis is the heart of UK Legal Skills. These seven commands help you understand exactly what you are signing -- before you sign it. Whether you need a full review, a risk breakdown, or help negotiating better terms, there is a command for it.

Seven commands for reviewing, comparing, and benchmarking contracts under the laws of England and Wales.

![Contract review process (broadsheet rebrand) — the panel convenes](/images/review-process-2026.jpg)

*Plate I — the broadsheet rebrand.*

![The contract review process — upload, analyse, score, report](/images/review-process.jpg)

*Plate I.a — the original, kept for reference.*

## /legal first-read

**Why use this?** A contract has just landed in your inbox and you need a view in seconds, not an afternoon. This is the senior-counsel triage: a sub-15-second opinionated first read that classifies the contract, scores the top issues on a likelihood × severity matrix, and hands you one verdict -- SIGN, NEGOTIATE, or WALK -- before you commit to a full review.

The natural entry point. It does not exposit clause-by-clause -- it forms a view. Think of a senior partner reading a contract over coffee: fifteen seconds, one verdict, a tight risk matrix, and a steer. The deep work, if it is needed, follows -- RED-tier contracts auto-route to [/legal review](/cli/contract-analysis#legal-review).

![First read (broadsheet rebrand) — the partner forms a view](/images/first-read-2026.jpg)

*Plate II — the senior-counsel triage.*

### Syntax

```bash
/legal first-read <file>
```

Accepts all three input shapes: a file path, pasted contract text, or a URL to a contract document.

### What it does

1. **Phase 0 -- Escalation check (runs first)**: Scans for signals that demand a solicitor *now* -- active litigation or pre-action correspondence (LBA, Part 36, claim form), regulator action (FCA, ICO, HMRC, SRA, CMA, Ofcom, HSE), a personal data breach affecting 100+ subjects or special-category/children's data, criminal-liability exposure (ECCTA failure-to-prevent fraud, MLR, bribery, sanctions), a limitation period under 30 days, director personal-liability indicators, or a whistleblowing disclosure. If any fire, the output is topped with an **ESCALATE -- INSTRUCT A SOLICITOR NOW** banner naming the trigger.
2. **Phase 1 -- Classify**: Identifies the contract type in the first pass and calibrates severity and likelihood priors against it (see the type lookup below).
3. **Phase 2 -- Matrix**: Picks the top five issues maximum (fewer is better on a clean contract), scores each for severity and likelihood, and reads off the tier.
4. **Phase 3 -- Verdict**: Returns one editorial headline -- SIGN, NEGOTIATE, or WALK -- with a two-to-three-sentence partner-style rationale.
5. **Phase 4 -- Auto-escalate**: Where the trigger conditions fire, ends with an explicit hand-off to [/legal review](/cli/contract-analysis#legal-review) for the full five-agent deep dive.

### Contract types it triages

The classifier maps signals to type and to where the money typically goes wrong:

| Signals | Likely type | Where the money goes wrong |
|---------|-------------|----------------------------|
| Deliverables, retainer, statement of work | Services / MSA / SOW | Scope creep, payment timing, IP ownership, termination for convenience |
| Salary, notice period, post-termination restrictions | Employment | Restrictive covenants, IP assignment, statutory floor, discrimination |
| Confidential information, receiving party, residual knowledge | NDA | Definition breadth, term, permitted disclosures, IP carve-outs |
| Subscription, SLA, uptime, licence grant, processor terms | SaaS | Auto-renewal, data ownership, liability cap vs fees, UK GDPR Art. 28 |
| Independent contractor, IR35, off-payroll, kill fee | Freelance / Contractor | Worker-status risk, IP assignment, substitution clauses |
| Landlord, tenant, premises, rent review, break clause | Lease / Tenancy | Repair obligations, dilapidations, break conditionality |
| Buyer, seller, purchase price, completion accounts, warranties | M&A / SPA | Warranty cap, indemnity scope, disclosure letter, earn-out mechanics |
| Investor, valuation cap, drag/tag, pre-emption | Investment / SHA / SAFE | Liquidation preference, board control, dilution, founder vesting |
| Facility, security, covenants, events of default | Finance | Cross-default, MAC clauses, security perfection, enforcement triggers |

For employment and lease signals the skill applies the [Employment Rights Act 1996](/reference/legislation) statutory floor and notes any reform whose status it needs to verify (for example the Renters' Rights Act 2025 as its provisions commence, or post-2024 employment reforms) -- it labels these "status to verify" rather than asserting they are in force, and the skills run live in-force checks where the host provides legislation tools.

### The likelihood × severity matrix

Each issue is scored on two axes and the tier read straight off the grid.

**Severity** -- financial exposure plus enforceability under England and Wales law:

| Level | What it means |
|-------|---------------|
| **HIGH** | Uncapped or multi-million exposure; loss of a core asset (IP, key data, premises); criminal or regulatory liability; breach of a statutory floor |
| **MEDIUM** | Capped but material exposure; meaningful operational drag; defensible if litigated |
| **LOW** | Annoying, asymmetric, but commercially survivable |

**Likelihood** -- the probability the clause actually bites, calibrated to counterparty, deal size, industry norms, and whether the trigger is mandatory or discretionary: **LIKELY**, **POSSIBLE**, or **UNLIKELY**.

| Severity \ Likelihood | LIKELY | POSSIBLE | UNLIKELY |
|-----------------------|--------|----------|----------|
| **HIGH**              | RED    | RED      | AMBER    |
| **MEDIUM**            | AMBER  | YELLOW   | YELLOW   |
| **LOW**               | YELLOW | GREEN    | GREEN    |

::: tip Likelihood is the point
This skill weights likelihood deliberately -- the half the deeper reviews tend to under-weight. A theoretical uncapped indemnity that no rational counterparty would ever invoke is not the same risk as one with an easy trigger and a clear motive. The triage calibrates to deal context rather than treating every clause as live.
:::

### The verdict

| Verdict | When |
|---------|------|
| **SIGN** | Only GREEN and YELLOW issues. Within market norms for the type. A defensible commercial decision today. |
| **NEGOTIATE** | YELLOW plus AMBER, where the AMBER is fixable in a single round of mark-up. Worth pushing back on; not worth walking. |
| **WALK** | Any RED-tier issue, or AMBER concentrated in unilateral terms (one-sided termination, uncapped indemnity, broad assignment, sole-discretion drafting). Not salvageable as written without a structural rewrite. |

### When it auto-routes to /legal review

The triage forces a hand-off to the deep review when:

1. Any **RED**-tier issue appears in the matrix.
2. The type is **M&A / SPA**, **Investment / SHA / SAFE**, **Employment with post-termination restrictive covenants**, **Lease with a term over five years**, or a **Finance facility with security**.
3. The verdict is **WALK**.
4. The prompt signals high stakes (deal value, regulatory sensitivity, board approval pending).

In those cases the output ends with an explicit line pointing to [/legal review](/cli/contract-analysis#legal-review) for the weighted Contract Safety Score across five parallel agents.

### Example

```bash
/legal first-read ./contracts/acme-msa.pdf
```

### Output

`FIRST-READ-[short-name]-[date].md` containing:
- The canonical AI-generated legal analysis disclaimer (and, where triggered, the ESCALATE banner above it)
- A metadata table (contract type, parties, effective date, governing law, analysis date)
- The **VERDICT** headline (SIGN / NEGOTIATE / WALK) with a partner-voice rationale
- The risk matrix (up to five issues, each with severity, likelihood, tier, and a one-line rationale)
- A "Top 3 to push back on" or "Top 3 walk-away reasons" list (omitted when the verdict is SIGN)
- A hand-off to `/legal review` for the full deep dive

::: warning Plain-text tiers, not the usual indicators
The deeper skills use 🔴 / 🟡 / 🟢. This triage deliberately uses RED / AMBER / YELLOW / GREEN labels in plain text -- it is a different register, the broadsheet leader column rather than the clause-by-clause file note.
:::

### Related commands

- [/legal review](/cli/contract-analysis#legal-review) -- the full five-agent deep dive a RED-tier first read routes to
- [/legal risks](/cli/contract-analysis#legal-risks) -- clause-by-clause severity scoring with financial exposure
- [/legal negotiate](/cli/contract-analysis#legal-negotiate) -- counter-proposals and replacement language once you decide to push back
- [/legal missing](/cli/contract-analysis#legal-missing) -- protections that should be present but are not

---

## /legal review

**Why use this?** You have been sent a contract. Before you sign, you want to know: is this safe? What are the risks? What should I push back on?

The flagship command. Launches **5 parallel agents** that analyse every aspect of a contract and produce a unified report with a Contract Safety Score.

### Syntax

```bash
/legal review <file>
```

### What it does

1. **Phase 1 -- Ingestion**: Reads the contract, classifies the type (service agreement, employment, NDA, SaaS, freelancer, partnership, lease, sales, investment), and extracts metadata (parties, dates, value, governing law).
2. **Phase 2 -- Parallel analysis**: Launches five subagents simultaneously:

| Agent | Role | Weight |
|-------|------|--------|
| `legal-clauses` | Identifies and categorises every clause | 20% |
| `legal-risks` | Scores each clause for risk level | 25% |
| `legal-compliance` | Flags regulatory and legal issues | 20% |
| `legal-terms` | Maps duties, deadlines, and triggers | 15% |
| `legal-recommendations` | Generates specific fixes for every issue | 20% |

3. **Phase 3 -- Aggregation**: Merges findings into a weighted Contract Safety Score (0--100).

### Scoring

| Score | Grade | Label |
|-------|-------|-------|
| 90--100 | A+ | Safe |
| 80--89 | A | Good |
| 70--79 | B | Fair |
| 60--69 | C | Caution |
| 40--59 | D | Risky |
| 0--39 | F | Dangerous |

### Example

```bash
/legal review ./contracts/saas-agreement.pdf
```

### Output

`CONTRACT-REVIEW-[name]-[date].md` containing:
- Contract Safety Score with grade
- Executive summary
- Risk dashboard (high/medium/low counts)
- Clause-by-clause analysis with replacement language
- Missing protections
- Obligations and deadlines table
- Negotiation priorities (ranked)
- Recommended next steps checklist

---

## /legal risks

**Why use this?** You want to know the financial exposure of every clause. How much could each provision actually cost you?

Deep clause-by-clause risk analysis with severity scoring and financial exposure estimates.

### Syntax

```bash
/legal risks <file>
```

### What it checks

Every clause is scored 1--10 across these risk categories:

| Category | Examples |
|----------|---------|
| Financial Exposure | Uncapped liability, penalty clauses, liquidated damages |
| Liability Transfer | Broad indemnification, hold harmless, insurance shifts |
| Restrictive Covenants | Non-competes, exclusivity, right of first refusal |
| Unclear/Ambiguous Terms | "Reasonable efforts," undefined key terms |
| Missing Protections | No liability cap, no termination for convenience |
| One-Sided Terms | Unilateral amendment, asymmetric termination |
| Auto-Renewal Traps | Short cancellation windows, price escalation |
| IP Assignment Overreach | Pre-existing IP capture, broad "arising from" language |

### Hidden risk detection

The command specifically hunts for patterns that are commonly missed:

- **Definition landmines** -- terms defined broadly in Section 1 that expand liability later
- **Cross-reference traps** -- clauses referencing other sections to quietly expand obligations
- **Buried carve-outs** -- exceptions in sub-sub-clauses that override earlier protections
- **Survival clauses** -- obligations surviving termination indefinitely
- **Incorporation by reference** -- external documents that can change without notice
- **Defined term drift** -- terms defined one way but used differently in the body

### Example

```bash
/legal risks ./contracts/vendor-agreement.docx
```

### Output

`RISK-ANALYSIS.md` containing:
- Overall risk score (X/10)
- Risk matrix table with financial exposure per clause
- Total estimated financial exposure
- Detailed analysis per risky clause with quoted text, plain English, and replacement language
- Hidden risks section
- Top 5 priorities to fix first

### Key legislation

UCTA 1977, CRA 2015.

---

## /legal compare

**Why use this?** Your counterparty sent a revised version. What did they actually change, and does it favour you or them?

Side-by-side comparison of two contract versions or two different contracts.

### Syntax

```bash
/legal compare <file1> <file2>
```

### What it does

1. Reads both documents and determines whether they are two versions of the same contract or two different contracts.
2. Maps structural differences: sections added, removed, and renumbered.
3. Classifies every change:

| Change type | Description |
|-------------|-------------|
| Added | New clause in Document B only |
| Removed | Clause in Document A only |
| Modified -- Substantive | Language changed affecting rights or risk |
| Modified -- Cosmetic | Formatting or word choice, no substantive impact |
| Unchanged | Identical in both |

4. For each change, assigns **favourability** (favours Party A / Party B / neutral) and **significance** (Major / Minor / Cosmetic).

### Dangerous patterns flagged

- Sneaked-in clauses buried in boilerplate
- Stripped protections (liability caps, termination rights removed)
- Scope expansion through broadened definitions
- Financial term changes
- IP rights shifts
- Governing law or venue changes
- New unilateral amendment rights

### Example

```bash
/legal compare ./contracts/nda-v1.pdf ./contracts/nda-v2.pdf
```

### Output

`CONTRACT-COMPARISON-[date].md` containing:
- Document overview table
- Executive summary with overall favourability shift
- Change summary table with totals
- Dangerous changes section (requires immediate attention)
- Detailed change analysis with exact quoted text from both versions
- Sections unchanged
- Recommendation on which version is more favourable

---

## /legal plain

**Why use this?** You cannot understand the legal jargon. You want every clause explained in simple English.

Translates every clause from legalese to plain English.

### Syntax

```bash
/legal plain <file>
```

### What it does

Goes through the contract section by section and provides:
1. The original legal text
2. A plain English translation
3. A glossary of all defined terms
4. Flags for deliberately confusing or misleading language -- clauses where the plain meaning is surprising or where legalese is used to obscure unfavourable terms

### Example

```bash
/legal plain ./contracts/lease-agreement.pdf
```

### Output

`PLAIN-ENGLISH-[name]-[date].md`

---

## /legal negotiate

**Why use this?** You have found issues in the contract. You need specific counter-proposals with professional language you can send to the other side.

Generates counter-proposals with replacement language, talking points, and a ready-to-send email template.

### Syntax

```bash
/legal negotiate <file>
```

### What it does

1. Identifies every unfavourable or risky clause.
2. For each, generates:
   - Specific replacement language
   - Persuasive talking points explaining why the change is reasonable
   - A professional email template the user can send to request changes
3. Ranks counter-proposals by priority.

### Example

```bash
/legal negotiate ./contracts/service-agreement.docx
```

### Output

`NEGOTIATION-[name]-[date].md`

---

## /legal missing

**Why use this?** You suspect the contract is missing protections. What should be there that is not?

Finds protections that should be present but are not.

### Syntax

```bash
/legal missing <file>
```

### What it does

1. Classifies the contract type.
2. Compares against a comprehensive checklist of protections expected for that type (SaaS, employment, NDA, MSA, partnership, lease, etc.).
3. For each missing protection, provides:
   - Why it matters
   - Urgency rating: **Critical**, **High**, **Medium**, or **Low**
   - Ready-to-insert clause language

### Example

```bash
/legal missing ./contracts/saas-terms.pdf
```

### Output

`MISSING-PROTECTIONS-[name]-[date].md`

---

## /legal benchmark

**Why use this?** Is this contract fair? How does it compare to what is standard in the market?

Compares every clause against England and Wales market-standard positions.

### Syntax

```bash
/legal benchmark <file>
```

### What it does

1. Classifies the contract into one of 14 types: SaaS, services, employment, NDA, freelancer/contractor, commercial lease, shareholder agreement, partnership, supply, distribution, investment, franchise, licence, or loan agreement.
2. Compares **80+ clause categories** against market-standard benchmarks for that type.
3. For each clause, scores the deviation from market norm and identifies whether the position favours the drafter or the counterparty.

### Example

```bash
/legal benchmark ./contracts/franchise-agreement.pdf
```

### Output

`BENCHMARK-REPORT-[name]-[date].md` containing:
- Contract type classification
- Market benchmark scorecard
- Clause-by-clause deviation analysis
- Renegotiation priorities ranked by impact
