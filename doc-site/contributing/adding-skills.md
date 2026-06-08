# Adding a New Skill

This guide walks through creating a new `/legal` command from scratch. Skills are self-contained Markdown files -- no runtime code, no shared library, no build step.

## Overview

| Step | Action | File(s) |
|------|--------|---------|
| 1 | Create the skill file | `skills/legal-yourskill/SKILL.md` |
| 2 | Structure the skill content | Same file |
| 3 | Register the command in the router | `legal/SKILL.md` |
| 4 | Register the skill | `registry/skill-registry.json` |
| 5 | Test in Claude Code | Terminal |

---

## Step 1: Create the Skill File

Create a new directory and `SKILL.md` file:

```bash
mkdir -p skills/legal-yourskill
touch skills/legal-yourskill/SKILL.md
```

The directory name must follow the pattern `legal-<name>` where `<name>` is the command suffix the user will type.

::: tip Naming Convention
The directory name determines the command. `skills/legal-partnership/` means the user types `/legal partnership`. Keep names short, descriptive, and lowercase with hyphens.
:::

Start with a clear title and purpose:

```markdown
# Your Skill Title -- Analysis Engine

You are the [domain] analysis engine for `/legal yourskill <file>`.
You produce a scored report with findings and recommendations.

## When This Skill Is Invoked

The user runs `/legal yourskill <file>`.
```

---

## Step 2: Structure the Skill Content

Every skill file must include the following sections. These are load-bearing -- omitting any of them will produce incomplete output.

### 2.1 Jurisdiction Declaration

```markdown
---

## Jurisdiction

This analysis applies exclusively to the laws of **England and Wales**.
Scottish law and Northern Ireland law are out of scope. Do not reference
Scottish statutes (e.g., Land Registration (Scotland) Act) or Northern
Irish equivalents.
```

::: warning Critical Rule
This is mandatory. The entire tool suite is scoped to England & Wales law. Never add references to Scots law or Northern Ireland law. If a statute applies differently in Scotland or NI, simply omit the non-E&W version.
:::

### 2.2 Disclaimer Block

Every skill must include this exact disclaimer in its output template:

```
AI-Generated Legal Analysis -- This output is produced by AI and does not
constitute legal advice. It is intended as a starting point for review.
Always consult a qualified solicitor before signing contracts or relying
on generated legal documents. This tool is designed for use under the laws
of England and Wales.
```

::: info
Do not paraphrase, shorten, or rephrase this disclaimer. Use it verbatim. It appears at the top of every output.
:::

### 2.3 Purpose Section

Explain what the skill analyses and why it matters. Reference the specific UK statutes that apply:

```markdown
## Purpose

Analyses [document type] against [relevant legislation]. Identifies
[what it finds], scores [what it scores], and recommends [what actions].
```

### 2.4 Input Handling (File / Text / URL)

Every skill must support exactly three input methods:

```markdown
## Input

Accept input from one of these sources:
1. **File path** -- Read the file directly using the Read tool
2. **Pasted text** -- The user pastes content directly into the chat
3. **URL** -- Fetch content from a URL using WebFetch

If the user invokes the command without specifying input, ask:
"Please provide the document to review. You can paste the text directly,
provide a file path, or share a URL."
```

### 2.5 Analysis Framework with Phases

Structure your analysis into clear, numbered phases:

```markdown
## Phase 1: Document Ingestion
- Classify the document type
- Extract metadata (parties, dates, governing law)
- Identify the relevant legislation

## Phase 2: Core Analysis
- Clause-by-clause review
- Risk scoring (0-100 per clause)
- Compliance checks against [relevant Acts]
- [Skill-specific analysis steps]

## Phase 3: Scoring & Output
- Calculate overall score (0-100)
- Assign letter grade (A-F)
- Generate prioritised recommendations
- Produce executive summary
```

### 2.6 Output Format Template

Define the exact Markdown structure the skill will produce. Include:
- Score and grade (if applicable)
- Risk indicators using standard format: `🔴 High Risk`, `🟡 Medium Risk`, `🟢 Low Risk`
- Tables for structured findings
- Actionable recommendations with specific replacement language

```markdown
## Output Format

### Header
- Document name, date, parties
- Overall score and grade
- Risk indicator summary

### Executive Summary
2-3 paragraph overview of key findings

### Findings Table
| # | Area | Finding | Risk | Statute | Remediation |
|---|------|---------|------|---------|-------------|
| 1 | [area] | [finding] | High/Medium/Low | [Act s.X] | [action] |

### Recommendations
Ordered by priority: critical > high > medium > low.
Include current text and replacement text for each.

### Appendix
Legislation references, glossary, methodology
```

### 2.7 File Naming Convention

Specify the output filename pattern:

```markdown
## Output File

Save as: `YOUR-SKILL-[name]-[YYYY-MM-DD].md`
- `[name]` = extracted from the document (party name, company, address, etc.)
- `[YYYY-MM-DD]` = today's date
```

---

## Step 3: Update the Routing Table

Open `legal/SKILL.md` and add your command to both the command menu and the routing table.

### Add to the Command Menu

Find the appropriate category section and add your command:

```markdown
CATEGORY:
  /legal yourskill <file>       Brief description of what it does
```

### Add to the Routing Table

Add a row to the routing table:

```markdown
| `/legal yourskill` | legal-yourskill | Brief description |
```

::: info
After updating `legal/SKILL.md`, run `./install.sh` to copy the updated files to `~/.claude/skills/`. Changes do not take effect until the files are installed.
:::

---

## Step 4: Register the Skill

Add an entry for your skill to `registry/skill-registry.json` so it is discoverable and so the parity check can verify it:

```json
{
  "id": "legal-yourskill",
  "name": "Your Skill Name",
  "command": "/legal yourskill",
  "category": "Category Name",
  "description": "One-paragraph description of what the skill does.",
  "route": "legal-yourskill",
  "inputContract": ["file", "text", "url"]
}
```

Then run the parity check to confirm the skill, its agent (if any), the `legal/SKILL.md` router table, and the registry all stay in sync:

```bash
npm run test:skills
```

This verifies skill/agent/router/registry parity across all 38 skills and 12 agents. If it fails, the error message tells you which of the four sources is out of step.

---

## Step 5: Test in Claude Code

```bash
# Install the updated skills
./install.sh

# Test with a file
/legal yourskill path/to/test-file.pdf

# Test with pasted text
/legal yourskill
# (then paste text when prompted)
```

### Verification Checklist

- [ ] The disclaimer appears at the top of the output
- [ ] Risk indicators use the correct format (`🔴`, `🟡`, `🟢`)
- [ ] Output file is saved with the correct naming convention
- [ ] All referenced legislation is England & Wales only
- [ ] The output is actionable and includes specific recommendations
- [ ] All three input methods work (file path, paste, URL)
- [ ] Phase structure produces complete output (no missing sections)

---

## Template: Complete SKILL.md Example

::: details Click to expand a complete SKILL.md template

```markdown
# Partnership Agreement Review

You are the partnership agreement analysis engine for `/legal partnership <file>`.
You produce a scored compliance report with findings and recommendations.

## When This Skill Is Invoked

The user runs `/legal partnership <file>`. This analyses partnership agreements,
LLP agreements, and joint venture agreements.

---

## Jurisdiction

This analysis applies exclusively to the laws of **England and Wales**.
Scottish law and Northern Ireland law are out of scope.

## Purpose

Analyses partnership agreements against the Partnership Act 1890,
Limited Partnerships Act 1907, and Limited Liability Partnerships Act 2000.
Identifies governance gaps, profit-sharing imbalances, exit provision
weaknesses, and dissolution triggers.

## Input

Accept input from one of these sources:
1. **File path** -- Read the file directly using the Read tool
2. **Pasted text** -- The user pastes content directly into the chat
3. **URL** -- Fetch content from a URL using WebFetch

If no input is provided, ask: "Please provide the partnership agreement
to review. You can paste the text directly, provide a file path, or
share a URL."

## Phase 1: Document Ingestion

### 1.1 Classify the Partnership Type

| Type | Detection Signals |
|------|-------------------|
| General Partnership | "partners," "profit sharing," no limited references |
| Limited Partnership | "limited partner," "general partner," LP registration |
| LLP | "limited liability partnership," "designated members" |
| Joint Venture | "JV," "joint venture," "special purpose" |

### 1.2 Extract Metadata

- Partnership name and type
- Partners (names, roles, capital contributions)
- Commencement date and term
- Profit-sharing ratio
- Governing law

## Phase 2: Analysis

### 2.1 Default Provisions Check (PA 1890 ss.24-31)

Has the agreement displaced default provisions? Defaults often cause
problems when partners assume they do not apply.

### 2.2 Governance Review

- Decision-making authority (ordinary vs extraordinary matters)
- Voting rights and deadlock resolution
- Admission of new partners
- Expulsion provisions

### 2.3 Financial Provisions

- Capital contributions and returns
- Profit and loss allocation
- Drawings and distributions
- Valuation methodology

### 2.4 Exit and Dissolution

- Retirement provisions and notice periods
- Death and incapacity
- Compulsory transfer triggers
- Dissolution events and winding-up

## Phase 3: Scoring & Output

Generate `PARTNERSHIP-REVIEW-[name]-[YYYY-MM-DD].md`:

AI-Generated Legal Analysis -- This output is produced by AI and does not
constitute legal advice. It is intended as a starting point for review.
Always consult a qualified solicitor before signing contracts or relying
on generated legal documents. This tool is designed for use under the
laws of England and Wales.

## Score: [X]/100 -- Grade: [LETTER]

## Executive Summary
[3-4 sentence overview]

## Risk Dashboard

| Risk Level | Count | Areas |
|------------|-------|-------|
| 🔴 High Risk | [n] | [areas] |
| 🟡 Medium Risk | [n] | [areas] |
| 🟢 Low Risk | [n] | [areas] |

## Findings

| # | Area | Finding | Risk | Statute | Remediation |
|---|------|---------|------|---------|-------------|
| 1 | [area] | [finding] | High/Medium/Low | [Act s.X] | [action] |

## Recommendations
1. [Most urgent action]
2. [Second priority]
3. Consult a qualified solicitor

## Recommended Next Steps
1. [ ] [Action item]
2. [ ] [Action item]
3. [ ] Consult a qualified solicitor before acting
```

:::
