# How UK Legal Skills Works

When you ask UK Legal Skills to review a contract, something clever happens behind the scenes. Instead of one AI reading the whole thing, the system splits the work across multiple specialist AI agents -- each one focused on a different aspect of the law. This is like sending your contract to five different solicitors simultaneously, then getting a combined report.

## The 60-Second Version

1. You upload a contract
2. AI reads it and figures out what type of document it is
3. Multiple AI agents analyse it simultaneously -- one checks for risks, another checks compliance, another looks for missing protections
4. The results are combined into a single scored report
5. You get a Contract Safety Score (0-100) with specific recommendations

![Contract review process (broadsheet rebrand) — the panel convenes](/images/review-process-2026.jpg)

*Plate I — the broadsheet rebrand.*

![How the review process works — from upload to scored report](/images/review-process.jpg)

*Plate I.a — the original, kept for reference.*

## The Technical Detail

UK Legal Skills analyses legal documents using a large language model supplied by your agent host. Rather than traditional code, the system is built from **markdown prompt files** that direct the model in how to reason about English law.

## Skills Are Markdown Prompts

Every `/legal` command maps to a **SKILL.md** file inside `skills/legal-*/`. Each file is a self-contained prompt that tells the model:

- What jurisdiction to apply (England & Wales)
- What legislation to reference
- How to structure the analysis (phases, checklists, scoring)
- What output format to produce

There is no shared library, no runtime code, and no compiled artefacts. A skill is pure text.

## The Orchestrator

When you run `/legal review`, the main orchestrator at `legal/SKILL.md` reads your command and routes it to the correct skill file. The routing table maps every command to its skill directory:

```
/legal review     →  skills/legal-review/SKILL.md
/legal employment →  skills/legal-employment/SKILL.md
/legal ir35       →  skills/legal-ir35/SKILL.md
...
```

![Parallel agent orchestration (broadsheet rebrand) — 5, 4 and 3 agent patterns](/images/parallel-agents-2026.jpg)

*Plate I — the broadsheet rebrand.*

![Five parallel agents analyse your contract simultaneously](/images/parallel-agents.jpg)

*Plate I.a — the original, kept for reference.*

## Single-Agent vs Multi-Agent Skills

Most skills run the full analysis in **one pass** -- Claude reads the document and produces a scored report directly.

Three flagship skills launch **parallel AI agents** for deeper, multi-perspective analysis:

### `/legal review` -- 5 Parallel Agents

| Agent | File | Weight |
|-------|------|--------|
| Clause Analysis | `agents/legal-clauses.md` | 20% |
| Risk Assessment | `agents/legal-risks.md` | 25% |
| Compliance Check | `agents/legal-compliance.md` | 20% |
| Terms Analysis | `agents/legal-terms.md` | 15% |
| Recommendations | `agents/legal-recommendations.md` | 20% |

The parent skill aggregates the five agent outputs into a single **Contract Safety Score** (0--100).

### `/legal employment` -- 4 Parallel Agents

| Agent | File | Weight |
|-------|------|--------|
| Contract Review | `agents/legal-employment-contract.md` | 25% |
| Employment Rights | `agents/legal-employment-rights.md` | 25% |
| Discrimination Scan | `agents/legal-employment-discrimination.md` | 25% |
| Obligations Map | `agents/legal-employment-obligations.md` | 25% |

All four agents carry equal weight.

### `/legal corporate` -- 3 Parallel Agents

| Agent | File | Weight |
|-------|------|--------|
| Compliance | `agents/legal-corporate-compliance.md` | 35% |
| Documents | `agents/legal-corporate-documents.md` | 35% |
| Risk | `agents/legal-corporate-risk.md` | 30% |

## How Agents Work

Each agent is a separate markdown file in `agents/` that defines a focused analysis task. When the parent orchestrator skill runs, it launches all its agents **simultaneously** using the Agent tool. Each agent:

1. Receives the ingested document text
2. Performs its specialised analysis
3. Returns a structured result (scores, findings, recommendations)

The parent skill then collects all agent responses and **aggregates** them using the defined weights into a final scored report.

::: tip
Parallel agents are significantly faster than running analyses sequentially. A 5-agent contract review completes in roughly the same wall-clock time as a single-agent skill.
:::

## Beyond the Command Line

A hosted web app, [The Counsel](https://the-counsel.co.uk), is built on the same skills but lives in a separate repository.
