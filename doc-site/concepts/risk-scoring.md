# Risk Scoring System

Every analysis produces a risk score so you can quickly understand how safe a document is. Here's what the numbers mean in plain English.

## What Do The Scores Mean?

- **81-100 (Grade A, Strong):** This is a well-drafted document with minimal risk. A solicitor might find a few tweaks, but nothing alarming.
- **61-80 (Grade B, Acceptable):** Generally fair, but there are some clauses that could bite you. Worth addressing before signing.
- **41-60 (Grade C, Needs Work):** Significant issues. Several clauses favour the other party or don't adequately protect you. Don't sign without changes.
- **21-40 (Grade D, Poor):** Major problems. This contract is heavily weighted against you. You need professional legal advice before proceeding.
- **0-20 (Grade F, Critical):** This contract has serious deficiencies that could expose you to significant legal and financial risk. Do not sign.

![Risk scoring (broadsheet rebrand) — the methodology, refuse to sign](/images/risk-scoring-2026.jpg)

*Plate I — the broadsheet rebrand.*

![Risk scoring visual guide — from Grade A (safe) to Grade F (critical)](/images/risk-scoring.jpg)

*Plate I.a — the original, kept for reference.*

## Detailed Scoring Reference

AI Legal UK uses a consistent scoring system across all skills to communicate risk clearly and actionably.

## Overall Review Score

Every review produces an **overall score from 0 to 100** with a corresponding letter grade:

| Grade | Score Range | Meaning |
|-------|-------------|---------|
| **A** | 81 -- 100 | Strong. Low risk, well-drafted, minor improvements only |
| **B** | 61 -- 80 | Acceptable. Some risks, but generally sound |
| **C** | 41 -- 60 | Concerning. Material risks requiring attention |
| **D** | 21 -- 40 | Poor. Significant issues, professional review essential |
| **F** | 0 -- 20 | Critical. Fundamental problems, do not sign without legal advice |

::: warning
A high score does not mean legal advice is unnecessary. Even an A-grade document should be reviewed by a qualified solicitor before execution.
:::

## Clause-Level Scoring

Each clause analysed receives its own `riskScore` from 0 to 100. The visual indicators map to score bands:

| Indicator | Score Range | Label |
|-----------|-------------|-------|
| :red_circle: Red | 0 -- 30 | High Risk |
| :yellow_circle: Yellow / Orange | 31 -- 60 | Medium Risk |
| :large_blue_circle: Blue | 61 -- 80 | Acceptable |
| :green_circle: Green | 81 -- 100 | Strong |

::: tip
Risk scores are inverted from what you might expect -- a **low** riskScore means **high** risk. This matches the convention where 100 = best possible protection.
:::

## Contract Safety Score (Flagship Review)

The `/legal review` command produces a **Contract Safety Score** -- a weighted average from five parallel agents:

| Agent | Weight |
|-------|--------|
| Clause Analysis | 20% |
| Risk Assessment | 25% |
| Compliance Check | 20% |
| Terms Analysis | 15% |
| Recommendations | 20% |

```
Contract Safety Score = (clauses × 0.20) + (risks × 0.25) + (compliance × 0.20)
                      + (terms × 0.15) + (recommendations × 0.20)
```

## IR35 Assessment Scoring

The `/legal ir35` command uses a separate scoring model:

| Field | Range | Description |
|-------|-------|-------------|
| `ir35Score` | 0 -- 100 | Overall IR35 risk score |
| `status` | `inside` / `outside` / `borderline` | Determination result |
| `confidence` | 0 -- 100% | Model confidence in the determination |

Each of the 7+ assessment factors is scored individually:

- Personal service / right of substitution
- Mutuality of obligation
- Control (what, how, when, where)
- Financial risk
- Equipment provision
- Part and parcel of the organisation
- Exclusivity

Each factor returns a `status` of `inside`, `outside`, or `neutral` with supporting evidence.

## Compliance Framework Scoring

The `/legal compliance` command scores against multiple frameworks:

```json
{
  "framework": "UK GDPR",
  "score": 72,
  "maxScore": 100,
  "weight": 0.35,
  "status": "warning",
  "checks": [
    {
      "item": "Lawful basis identified for each processing activity",
      "status": "pass",
      "reference": "Art. 6 UK GDPR"
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `score` | Points achieved for this framework |
| `maxScore` | Maximum possible points |
| `weight` | Framework weight in overall calculation |
| `status` | `pass`, `fail`, or `warning` |
| `checks` | Individual compliance check items with statute references |

The overall compliance score is a weighted sum across all frameworks.

## Recommendation Priority Levels

All skills produce recommendations with a priority level:

| Priority | Meaning | Action |
|----------|---------|--------|
| **Critical** | Fundamental legal risk, potential invalidity | Must address before signing |
| **High** | Significant exposure, material disadvantage | Should address before signing |
| **Medium** | Improvement opportunity, minor risk | Address during negotiation |
| **Low** | Best practice, drafting quality | Address if convenient |

Each recommendation includes:

- **Clause reference** -- which clause is affected
- **Issue** -- what the problem is
- **Current text** -- the problematic wording
- **Replacement text** -- suggested alternative language

## Employment Review Scoring

The `/legal employment` command produces additional structured scores:

- **ERA 2025 compliance dashboard** -- pass/fail/warning for each employment right
- **Equality Act matrix** -- status per protected characteristic
- **Financial exposure** -- estimated liability in GBP for non-compliance
- **Obligations mapping** -- employer and employee duties with triggers and deadlines

## Risk Analysis Scoring (`/legal risks`)

The deep risk analysis skill uses a 1--10 severity scale per clause (distinct from the 0--100 riskScore used elsewhere):

| Severity | Level | Description |
|----------|-------|-------------|
| 9 -- 10 | Critical | Could invalidate the contract or create unlimited liability |
| 7 -- 8 | High | Material financial exposure or significant legal risk |
| 4 -- 6 | Medium | Notable risk but manageable with amendments |
| 1 -- 3 | Low | Minor drafting improvement, minimal exposure |

Financial exposure is estimated in GBP where quantifiable.
