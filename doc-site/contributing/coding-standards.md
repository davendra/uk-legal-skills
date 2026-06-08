# Coding Standards

These standards apply to all contributions -- skills, agents, MCP server tools, and documentation. Following them ensures consistency and prevents common errors.

---

## Jurisdiction: England & Wales Only

::: warning Critical Rule
Every skill, agent, and output is scoped exclusively to **England & Wales** law. This is a hard requirement -- not a guideline.
:::

| Do | Do Not |
|----|--------|
| Reference the Housing Act 1988 | Reference the Housing (Scotland) Act 1987 |
| Reference the Land Registration Act 2002 | Reference the Land Registration (Scotland) Act 2012 |
| Say "England and Wales" | Say "the UK" when referring to legal jurisdiction |
| Reference ICO as the supervisory authority | Reference the Scottish Information Commissioner |
| Omit non-E&W statutes entirely | Include Scottish/NI equivalents "for completeness" |

If a user asks about Scottish or Northern Irish law, the correct response is to state that this tool is scoped to England & Wales and recommend consulting a solicitor qualified in the relevant jurisdiction.

---

## Disclaimer Block

Every user-facing output **must** start with the standard disclaimer. This is non-negotiable and load-bearing for the project:

```
AI-Generated Legal Analysis -- This output is produced by AI and does not
constitute legal advice. It is intended as a starting point for review.
Always consult a qualified solicitor before signing contracts or relying
on generated legal documents. This tool is designed for use under the
laws of England and Wales.
```

::: info
Do not omit, paraphrase, shorten, reposition, or move this disclaimer to a footer. Use it verbatim at the top of every output. Skills and agents include it in their output templates.
:::

---

## Risk Indicators

Use the standardised three-tier risk indicator format throughout all skills and agents:

| Indicator | Emoji | Meaning | Usage |
|-----------|-------|---------|-------|
| High Risk | `🔴` | Material legal exposure; must address before signing | Immediate attention required |
| Medium Risk | `🟡` | Notable concern; should address during negotiation | Should be addressed |
| Low Risk | `🟢` | Minor or no concern; well-drafted | Acceptable, standard terms |

In Markdown output:
```markdown
| Risk Level | Count | Clauses |
|------------|-------|---------|
| 🔴 High Risk | 3 | Termination, Liability, IP |
| 🟡 Medium Risk | 5 | Payment, Notice, ... |
| 🟢 Low Risk | 8 | Governing Law, Severability, ... |
```

---

## Input Handling

All skills must support exactly three input methods. Never remove support for any of them:

| # | Method | Tool | When |
|---|--------|------|------|
| 1 | **File path** | Read tool | User provides a path to a file |
| 2 | **Pasted text** | Direct input | User pastes contract text into the chat |
| 3 | **URL** | WebFetch | User provides a URL to fetch |

If the user invokes a skill without specifying input, prompt them to provide one of the three options.

---

## Output File Naming

All generated documents are saved as Markdown files in the current working directory with standardised naming:

| Document Type | Pattern | Example |
|---------------|---------|---------|
| Contract review | `CONTRACT-REVIEW-[name]-[YYYY-MM-DD].md` | `CONTRACT-REVIEW-Acme-Corp-2025-03-15.md` |
| Contract comparison | `CONTRACT-COMPARISON-[YYYY-MM-DD].md` | `CONTRACT-COMPARISON-2025-03-15.md` |
| NDA | `NDA-[party-name]-[YYYY-MM-DD].md` | `NDA-TechStart-Ltd-2025-03-15.md` |
| Terms of service | `TERMS-OF-SERVICE-[company]-[YYYY-MM-DD].md` | `TERMS-OF-SERVICE-Widgets-Inc-2025-03-15.md` |
| Privacy policy | `PRIVACY-POLICY-[company]-[YYYY-MM-DD].md` | `PRIVACY-POLICY-Widgets-Inc-2025-03-15.md` |
| Property analysis | `PROPERTY-ANALYSIS-[address]-[YYYY-MM-DD].md` | `PROPERTY-ANALYSIS-42-High-Street-2025-03-15.md` |
| Tenancy review | `TENANCY-REVIEW-[address]-[YYYY-MM-DD].md` | `TENANCY-REVIEW-Flat-3-Oak-Lane-2025-03-15.md` |
| GDPR audit | `GDPR-AUDIT-[name]-[YYYY-MM-DD].md` | `GDPR-AUDIT-DataFlow-Ltd-2025-03-15.md` |
| IP review | `IP-REVIEW-[name]-[YYYY-MM-DD].md` | `IP-REVIEW-PatentCo-2025-03-15.md` |
| Debt review | `DEBT-REVIEW-[debtor]-[YYYY-MM-DD].md` | `DEBT-REVIEW-Smith-Trading-2025-03-15.md` |
| Immigration review | `IMMIGRATION-REVIEW-[name]-[YYYY-MM-DD].md` | `IMMIGRATION-REVIEW-J-Patel-2025-03-15.md` |
| Will review | `WILL-REVIEW-[testator]-[YYYY-MM-DD].md` | `WILL-REVIEW-E-Thompson-2025-03-15.md` |

---

## Skill Files

Skills are pure Markdown prompts with no runtime code:

| Rule | Rationale |
|------|-----------|
| No imports or `require()` statements | Skills are prompt documents, not code |
| No shared library references | Each skill is self-contained |
| No environment variable access | Skills run within Claude Code, not a runtime |
| Include all analysis frameworks inline | Do not reference external files for scoring criteria |
| Use tables for structured content | Tables render consistently and are parseable |
| Include example output with exact structure | Shows the expected format precisely |
| Professional but accessible language | Explain legal concepts in plain English alongside technical terms |
| Be specific about WHY something is risky | Not just THAT it is risky |
| Always suggest specific alternative language | When flagging issues in contracts |

---

## Agent Output Contracts

Agent output must match the structure expected by the parent orchestrator:

| Rule | Rationale |
|------|-----------|
| Use the exact table format defined in the agent file | Parent orchestrator parses the output |
| Include summary statistics | Used for weighted scoring in aggregation |
| Use unique identifiers for each finding | Enables cross-referencing between agents (e.g., CL-001, DP-003) |
| Include a "Handoff to Other Agents" section | Documents dependencies explicitly |

::: warning Breaking Change Risk
Changing an agent's output contract without updating the parent orchestrator will break the aggregation step. Always update both files together in the same PR.
:::

---

## MCP Server

| Rule | Details |
|------|---------|
| TypeScript with strict mode | `tsconfig.json` has `strict: true` |
| Build to `dist/` | `npm run build` compiles with `tsc` |
| Tests run on compiled output | `npm run build`, then `node --test` on `dist/**/*.test.js` |
| Use `node:test` runner | Not Jest, not Vitest -- the project uses Node.js built-in test runner |
| Use `node:assert/strict` | Standard Node.js assertion library |
| Tool names use `snake_case` | `search_legislation`, `lookup_statute`, `check_in_force` |
| Return structured JSON | All MCP tool responses return typed objects |
| Use `zod` for input validation | Schema validation for all tool parameters |

```typescript
import { describe, it } from "node:test"
import assert from "node:assert/strict"

describe("yourTool", () => {
  it("should handle the expected case", () => {
    const result = yourTool(input)
    assert.strictEqual(result, expected)
  })

  it("should throw for invalid input", () => {
    assert.throws(() => yourTool(null), /expected error message/)
  })
})
```

---

## Git Conventions

### Branch Names

```
feat/partnership-review-skill
fix/limitation-period-calculation
docs/update-legislation-reference
refactor/extract-shared-prompt-block
test/add-caselaw-lookup-tests
```

### Commit Messages

Follow conventional commit format with imperative mood:

```
feat: add intellectual property review skill
fix: correct limitation period for deed contracts
docs: update legislation reference table
refactor: extract shared prompt block into a partial
test: add tests for caselaw lookup edge cases
chore: bump MCP server dependencies
```

| Prefix | When |
|--------|------|
| `feat:` | New feature or skill |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | Code restructuring, no behaviour change |
| `test:` | Adding or updating tests |
| `chore:` | Dependencies, tooling, configuration |

---

## What Not to Do

| Do Not | Reason |
|--------|--------|
| Reference Scottish/NI statutes | Jurisdiction is England & Wales only |
| Omit the disclaimer | Required on all output, no exceptions |
| Use non-standard risk indicators | Consistency across all 38 skills |
| Remove an input method from a skill | All three (file, paste, URL) must be supported |
| Add runtime code to skills | Skills are pure Markdown prompts |
| Change agent output without updating orchestrator | Breaks aggregation in the parent skill |
| Skip `npm run test:skills` after registry changes | Parity check guards skill/agent/router/registry sync |
| Use `any` type in MCP server TypeScript | Use `unknown` and narrow with type guards |
