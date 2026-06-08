# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository. There is a sibling `AGENTS.md` that mirrors this file for Codex and other hosts — if you change an architecture fact here, mirror it there.

## What this repo is

Source-available **Claude Code skills + agents** for **England & Wales** legal work: 38 `/legal …` commands, 12 subagents, and two MCP servers for live UK legislation and case law. Each skill is a self-contained Markdown prompt — no runtime, no SDK, no API key. They install into `~/.claude/` via `install.sh`.

A separate hosted web product, **The Counsel** (https://the-counsel.co.uk), is built on these same skills but lives in its own private repository and is **not** part of this repo. Keep everything here platform-neutral (it should run cleanly in Claude Code, OpenAI, Codex, and other agent hosts).

## Common commands

```bash
./install.sh            # copy legal/, skills/, agents/, scripts/*.py, templates/ into ~/.claude/
./uninstall.sh          # remove them

npm run test:skills       # parity guard: 38 skills ↔ 12 agents ↔ router ↔ registry
npm run test:docs         # regenerate command reference + docs parity audit
npm run test:evaluations  # validate the expected-findings eval corpus
npm run docs:generate     # rebuild doc-site/reference/all-commands.md from the registry
```

MCP servers (`mcp-servers/{uk-legislation,caselaw}`) each use the same layout:

```bash
npm install && npm run build && npm test   # tsx dev server, tsc build, node --test
```

## Architecture

`legal/SKILL.md` is the top-level router for `/legal <command>`. It dispatches to one of the **38 skills** under `skills/legal-*/SKILL.md`. To add or change a command: edit the skill file, update the command table in `legal/SKILL.md`, **and** update `registry/skill-registry.json`. `scripts/audit_skills.mjs` enforces this parity — run it after any registry change.

Three skills are **orchestrators** that launch parallel subagents via the host's Agent capability:

- `skills/legal-review/SKILL.md` — flagship `/legal review`. Phase 2 launches **5 parallel agents** (`legal-clauses`, `legal-risks`, `legal-compliance`, `legal-terms`, `legal-recommendations`); Phase 3 aggregates weighted scores (20/25/20/15/20) into a Contract Safety Score.
- `skills/legal-employment/SKILL.md` — **4 parallel agents** (`legal-employment-contract`, `-rights`, `-discrimination`, `-obligations`), equal weights.
- `skills/legal-corporate/SKILL.md` — **3 parallel agents** (`legal-corporate-compliance`, `-documents`, `-risk`), weights 35/35/30.

Subagents live in `agents/legal-*.md` and install into `~/.claude/agents/`. When you change a subagent's output contract (e.g. its `Component Score:` field), update the aggregation step in the parent orchestrator.

### The canonical registry

`registry/skill-registry.json` is the single source of truth for command metadata (id, name, command, category, description, route, inputContract, and review/commencement flags). The router table, docs, and audits all derive from it. `scripts/generate_docs_from_registry.mjs` regenerates `doc-site/reference/all-commands.md`; `scripts/audit_docs.mjs` checks the README and every doc-site page against it.

### MCP integration

Three MCP entries are wired in `.mcp.json`:
- `uk-legislation` (`mcp-servers/uk-legislation/src/index.ts`) — legislation.gov.uk XML API: `search_legislation`, `lookup_statute`, `lookup_section`, `check_in_force`, `check_amendments`, `get_extent`.
- `caselaw` (`mcp-servers/caselaw/src/index.ts`) — caselaw.nationalarchives.gov.uk: `search_caselaw`, `lookup_judgment`, `summarise_judgment`, `get_judgments_for_section`, plus search-by-judge/party.
- `lex` (remote HTTP) — 63,000 judgments with semantic search; complements the local `caselaw` server.

Commencement-aware skills (`employment`, `tenancy`, `gdpr`, `consumer`, `corporate`, `legislation-tracker`) run live in-force checks through these tools before treating a post-2024 reform as binding.

## Conventions that matter

- **Jurisdiction is England & Wales only.** Scots law and NI law are out of scope.
- **Every user-facing output starts with the disclaimer block** defined in `legal/SKILL.md` (AI-generated, not legal advice, consult a solicitor, England & Wales). It is load-bearing — don't omit or paraphrase it.
- **Risk indicators are standardised:** 🔴 High, 🟡 Medium, 🟢 Low.
- **Input is always one of three shapes:** file path (read tool), pasted text, or URL (web fetch). Orchestrators expect this trichotomy.
- **Generated documents** save as Markdown to the cwd with the naming conventions in `legal/SKILL.md` (e.g. `CONTRACT-REVIEW-[name]-[date].md`, `NDA-[party]-[date].md`).
- **Escalation triggers** (active litigation, regulator action, large data breach, criminal liability, imminent limitation, director personal liability, whistleblowing) prepend an escalation banner above the disclaimer — see `legal/SKILL.md`.
