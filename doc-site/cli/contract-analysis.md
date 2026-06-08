# Contract Analysis

Contract analysis is the heart of AI Legal UK. These seven commands help you understand exactly what you are signing -- before you sign it. Whether you need a full review, a risk breakdown, or help negotiating better terms, there is a command for it.

Seven commands for reviewing, comparing, and benchmarking contracts under the laws of England and Wales.

![Contract review process (broadsheet rebrand) — the panel convenes](/images/review-process-2026.jpg)

*Plate I — the broadsheet rebrand.*

![The contract review process — upload, analyse, score, report](/images/review-process.jpg)

*Plate I.a — the original, kept for reference.*

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
