# Adding Parallel Agents

Agents are subagents launched in parallel by orchestrator skills. They perform focused analysis on a specific aspect of a document, and their results are aggregated by the parent orchestrator into a unified report. This guide explains how to create new agents and integrate them into existing or new orchestrator patterns.

## Understanding the Agent Patterns

The system uses three orchestrator patterns with different parallelism levels:

### Contract Review: 5 Parallel Agents (20/25/20/15/20 Weights)

The flagship `/legal review` skill (`skills/legal-review/SKILL.md`) launches 5 agents simultaneously:

| Agent File | Role | Weight |
|------------|------|--------|
| `agents/legal-clauses.md` | Clause Identification & Categorization | 20% |
| `agents/legal-risks.md` | Risk Assessment (1-10 scoring per clause) | 25% |
| `agents/legal-compliance.md` | Regulatory & Legal Compliance Flags | 20% |
| `agents/legal-terms.md` | Terms, Obligations, Deadlines & Triggers | 15% |
| `agents/legal-recommendations.md` | Specific Fixes & Alternative Language | 20% |

**Total: 100%.** The Contract Safety Score (0-100) is the weighted aggregate of all agent scores.

### Employment Review: 4 Parallel Agents (Equal 25% Weights)

The `/legal employment` skill (`skills/legal-employment/SKILL.md`) launches 4 agents:

| Agent File | Role | Weight |
|------------|------|--------|
| `agents/legal-employment-contract.md` | Contract Terms vs UK Employment Legislation | 25% |
| `agents/legal-employment-rights.md` | Statutory Rights (ERA 2025, day-one rights, WTR 1998, NMW) | 25% |
| `agents/legal-employment-discrimination.md` | Equality Act 2010 (9 protected characteristics) | 25% |
| `agents/legal-employment-obligations.md` | Obligations Timeline & Financial Exposure | 25% |

### Corporate Review: 3 Parallel Agents (35/35/30 Weights)

The `/legal corporate` skill (`skills/legal-corporate/SKILL.md`) launches 3 agents:

| Agent File | Role | Weight |
|------------|------|--------|
| `agents/legal-corporate-compliance.md` | Companies Act 2006 & ECCTA 2023 Compliance | 35% |
| `agents/legal-corporate-documents.md` | Document Completeness & Execution Validity (s.44) | 35% |
| `agents/legal-corporate-risk.md` | Risk Assessment & Liability Exposure | 30% |

::: info When to Use Agents
Use parallel agents when the analysis has **distinct domains** that benefit from focused expertise (e.g., risk vs compliance vs terms), when the document is **complex enough** to warrant multi-perspective analysis, or when you want to **speed up** analysis by running tasks simultaneously. Do not use agents for simple, single-focus skills -- the overhead is not worth it.
:::

---

## Step 1: Create the Agent File

Agent files live in the `agents/` directory at the project root:

```bash
touch agents/legal-youragent.md
```

### Required Agent File Structure

Every agent file must include these sections:

```markdown
# Agent Title Subagent

## Role
You are the **[Agent Title] Subagent**, one of [N] parallel subagents
launched during `/legal [command]`. Your specific responsibility is
**[focus area]**, which accounts for **[X]% of the overall [Review] Score**.
Your output feeds directly into [downstream agents/aggregation], making
your accuracy foundational to the entire review.

## Mission
[One paragraph describing exactly what this agent analyses, why
accuracy matters, and what happens if this agent misses something.]

## [Domain] Framework
[Detailed framework: tables, checklists, statutory references,
scoring criteria that the agent uses for analysis.]

## Analysis Process
### Step 1: [First step]
### Step 2: [Second step]
### Step 3: [Third step]

## Scoring Criteria
[How the agent scores its findings -- completeness scales,
compliance ratings, risk levels, etc.]

## Output Format
[Exact structure of the agent's output -- tables, summary stats,
and templates. This is the output contract.]

## Handoff to Other Agents
[Which agents consume this agent's output and how they use it.]

## Legal Disclaimer
[Standard disclaimer block.]
```

---

## Step 2: Define the Output Contract

The output contract is the structured format that your agent must return. The parent orchestrator depends on this exact structure to build the aggregated report.

### Example: Compliance Agent Output Contract

```markdown
### Compliance Assessment

| # | Area | Requirement | Statute | Status | Risk Level | Finding | Remediation |
|---|------|-------------|---------|--------|------------|---------|-------------|
| 1 | Data Protection | Privacy notice required | UK GDPR Art.13 | Non-Compliant | High | No privacy notice provided | Draft and publish privacy notice within 30 days |
| 2 | Employment | Written particulars | ERA 1996 s.1 | Compliant | -- | Written particulars provided on day one | None required |

### Summary Statistics
Total Checks Performed: [n]
Compliant: [n]
Partially Compliant: [n]
Non-Compliant: [n]
Unclear: [n]

Risk Distribution:
  Critical: [n]
  High: [n]
  Medium: [n]
  Low: [n]

Overall Compliance Score: [n]/100
```

::: warning Output Contract Stability
When you change an agent's output contract, you **must** update the aggregation step in the parent orchestrator skill that consumes it. Mismatched contracts will produce broken reports. Always update both the agent file and the parent orchestrator together.
:::

---

## Step 3: Update the Parent Orchestrator

Open the parent skill file (e.g., `skills/legal-review/SKILL.md`) and add your agent to Phase 2.

### Add to the Subagent Assignments Table

```markdown
### Subagent Assignments

| Agent File | Role | Weight |
|------------|------|--------|
| `legal-clauses.md` | Clause Analysis | 18% |
| `legal-risks.md` | Risk Assessment | 22% |
| `legal-compliance.md` | Compliance Check | 18% |
| `legal-terms.md` | Terms & Obligations | 14% |
| `legal-recommendations.md` | Recommendations | 18% |
| `legal-youragent.md` | Your New Analysis | 10% |  <!-- NEW -->
```

### Add the Agent Launch Instruction

In the orchestrator's agent launch section, add:

```markdown
Launch each agent with this prompt structure:

"You are the [Agent Role] subagent for the AI Legal Assistant.
Analyse the following contract and return your findings in the specified format.

CONTRACT TYPE: [detected type]
CONTRACT METADATA: [extracted metadata]

FULL CONTRACT TEXT:
[paste full contract text]

Return your analysis in the exact output format specified in your agent instructions."
```

::: warning Weight Rebalancing
When adding a new agent, you must rebalance all weights so they sum to **exactly 100%**. Reduce existing agent weights proportionally to accommodate the new agent. Never exceed 100%.
:::

---

## Step 4: Set Aggregation Weights in Phase 3

In the parent orchestrator's Phase 3 (Aggregate Results), update the weighted scoring formula:

```markdown
### Calculate Overall Score

Weighted scoring:
- Clause Analysis: [score] x 0.18 = [weighted]
- Risk Assessment: [score] x 0.22 = [weighted]
- Compliance Check: [score] x 0.18 = [weighted]
- Terms & Obligations: [score] x 0.14 = [weighted]
- Recommendations: [score] x 0.18 = [weighted]
- Your New Analysis: [score] x 0.10 = [weighted]
- **Total: [sum of weighted scores]**
```

Also update the report template in Phase 3 to include a section for your agent's findings:

```markdown
## [Your Domain] Analysis

[Findings from legal-youragent integrated into the unified report]
```

### Grading Scale (Shared Across All Orchestrators)

| Score Range | Grade | Label | Meaning |
|-------------|-------|-------|---------|
| 90-100 | A+ | Safe | Low risk, standard favourable terms |
| 80-89 | A | Good | Minor issues, generally favourable |
| 70-79 | B | Fair | Some concerning clauses need attention |
| 60-69 | C | Caution | Multiple risky clauses, negotiate before signing |
| 40-59 | D | Risky | Significant risks, strong negotiation needed |
| 0-39 | F | Dangerous | Do not sign without major revisions |

---

## Step 5: Test the Agent

### Test Independently

Run the agent in isolation first to verify its output format matches the contract:

```
You are the [Agent Role] subagent for the AI Legal Assistant.
Analyse the following contract and return your findings in the specified format.

CONTRACT TYPE: Service Agreement
CONTRACT METADATA: Parties: Acme Ltd and Widget Corp. Effective Date: 2025-01-01.
Governing Law: England and Wales.

FULL CONTRACT TEXT:
[paste a test contract]
```

**Verify independently:**
- [ ] Output matches the defined contract structure exactly
- [ ] All table columns are populated
- [ ] Scoring criteria are applied consistently
- [ ] Statute references are correct and England & Wales only
- [ ] Summary statistics match the detail rows

### Test Full Orchestration

Install and run the parent skill with a test file:

```bash
./install.sh
/legal review test-contract.pdf
```

**Verify in orchestration:**
- [ ] All agents launch in parallel (check for the Agent tool calls in output)
- [ ] Agent outputs are aggregated correctly into the unified report
- [ ] Weighted scores sum to the correct total
- [ ] The unified report includes data from all agents including yours
- [ ] No data is lost during aggregation

---

## Complete Checklist

- [ ] Agent file created in `agents/legal-youragent.md`
- [ ] Role and scope clearly defined
- [ ] Output contract documented with exact table/field structure
- [ ] Parent orchestrator updated to launch the agent
- [ ] Aggregation weights redistributed (all weights sum to 100%)
- [ ] Report template includes new agent's section
- [ ] Agent tested independently with sample documents
- [ ] Full orchestration tested end-to-end
- [ ] `./install.sh` run to deploy
- [ ] All statute references are England & Wales only

---

## All 12 Existing Agents Reference

| Agent | Parent Skill | Weight | Focus Area |
|-------|-------------|--------|------------|
| `legal-clauses.md` | `/legal review` | 20% | Clause identification, categorization, gap analysis, defined terms registry |
| `legal-risks.md` | `/legal review` | 25% | Risk scoring (1-10), financial exposure, hidden dangers |
| `legal-compliance.md` | `/legal review` | 20% | Regulatory compliance, statutory requirements |
| `legal-terms.md` | `/legal review` | 15% | Terms, obligations, deadlines, triggers |
| `legal-recommendations.md` | `/legal review` | 20% | Specific fixes, alternative language, prioritised actions |
| `legal-employment-contract.md` | `/legal employment` | 25% | Contract terms vs UK employment legislation |
| `legal-employment-rights.md` | `/legal employment` | 25% | 11 statutory rights (ERA 2025 day-one rights) |
| `legal-employment-discrimination.md` | `/legal employment` | 25% | Equality Act 2010, 9 protected characteristics |
| `legal-employment-obligations.md` | `/legal employment` | 25% | Obligations timeline, financial exposure, covenant enforceability |
| `legal-corporate-compliance.md` | `/legal corporate` | 35% | Companies Act 2006 ss.171-177, ECCTA 2023 |
| `legal-corporate-documents.md` | `/legal corporate` | 35% | Document completeness, execution validity (s.44) |
| `legal-corporate-risk.md` | `/legal corporate` | 30% | Corporate risk, director liability, criminal exposure |

---

## Example: Complete Agent File

::: details Click to expand a complete agent example

```markdown
# Legal Data Protection Subagent

## Role
You are the **Data Protection Subagent**, one of [N] parallel subagents
launched during `/legal [command]`. Your specific responsibility is
**UK GDPR and DPA 2018 compliance assessment**, which accounts for
**[X]% of the overall Score**. Your output feeds directly into the
aggregation phase, making your accuracy foundational to the entire review.

## Mission
Assess every data protection provision in the document against UK GDPR,
DPA 2018, and PECR 2003. Missing or inadequate data protection clauses
can result in ICO enforcement action with fines up to GBP 17.5 million
or 4% of annual global turnover.

## Analysis Framework

| Check | Requirement | Statute | Risk if Non-Compliant |
|-------|-------------|---------|----------------------|
| 1 | Lawful basis identified | UK GDPR Art.6 | ICO enforcement notice; potential fine |
| 2 | Privacy notice provided | UK GDPR Arts.13-14 | Transparency breach; fine |
| 3 | Data processing agreement | UK GDPR Art.28 | Controller liability for processor acts |
| 4 | International transfer mechanism | UK GDPR Ch.V | Unlawful transfer; fine |
| 5 | DPIA conducted (if high risk) | UK GDPR Art.35 | Regulatory action |

## Analysis Process

### Step 1: Identify Data Flows
Read the entire document and identify all references to personal data
processing, data subjects, data controllers, and data processors.

### Step 2: Map Against Requirements
For each data flow, assess compliance against the framework above.

### Step 3: Cross-Reference
Check for conflicts between data protection clauses and other provisions
(e.g., confidentiality clauses that conflict with data subject rights).

## Scoring Criteria

| Rating | Meaning | Criteria |
|--------|---------|----------|
| Compliant | Fully meets requirements | All applicable checks pass |
| Partially Compliant | Minor gaps | Most checks pass, minor documentation gaps |
| Non-Compliant | Material breach | One or more critical checks fail |

## Output Format

### Data Protection Findings

| # | Area | Finding | Status | Risk | Statute | Remediation |
|---|------|---------|--------|------|---------|-------------|
| 1 | [area] | [finding] | Pass/Fail/Warning | High/Med/Low | [ref] | [action] |

### Summary Statistics
Total Checks: [n]
Compliant: [n]
Non-Compliant: [n]
Score: [n]/100

## Handoff to Other Agents
Your analysis is consumed by:
- **Risk Assessment Agent**: Uses your findings to score data protection risk
- **Recommendations Agent**: Uses your non-compliant items to generate fixes

Ensure every finding has a unique identifier (DP-001, DP-002, etc.)
so other agents can reference them precisely.

## Legal Disclaimer
DISCLAIMER: This analysis is generated by an AI assistant and does not
constitute legal advice. All findings should be reviewed by a qualified
solicitor. This tool is designed for use under the laws of England
and Wales.
```

:::
