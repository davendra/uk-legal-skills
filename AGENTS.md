# AGENTS.md

Guidance for Codex and other agent hosts working in this repository. This mirrors `CLAUDE.md` — if you change an architecture fact in one, mirror it in the other.

## What this repo is

Source-available **agent skills** for **England & Wales** legal work: 38 `/legal …` commands, 12 subagents, and two MCP servers for live UK legislation and case law. Each skill is a self-contained Markdown prompt — no runtime, no SDK, no API key. The skills are **platform-neutral**: they must run cleanly in Claude Code, OpenAI, Codex, and other hosts. When a skill references a capability (file reading, URL fetching, subagents, MCP, PDF generation, saved output), use the equivalent provided by the current host; if the host lacks it, state the limitation and continue with the best available evidence.

A separate hosted web product, **The Counsel** (https://the-counsel.co.uk), is built on these same skills but lives in its own private repository and is **not** part of this repo.

## Common commands

```bash
./install.sh            # copy legal/, skills/, agents/, scripts/*.py, templates/ into ~/.claude/
./uninstall.sh

npm run test:skills       # parity guard: 38 skills ↔ 12 agents ↔ router ↔ registry
npm run test:docs         # regenerate command reference + docs parity audit
npm run test:evaluations  # validate the expected-findings eval corpus
npm run docs:generate     # rebuild doc-site/reference/all-commands.md from the registry
```

MCP servers (`mcp-servers/{uk-legislation,caselaw}`): `npm install && npm run build && npm test`.

## Architecture

`legal/SKILL.md` routes `/legal <command>` to one of 38 skills under `skills/legal-*/SKILL.md`. To add or change a command: edit the skill file, update the command table in `legal/SKILL.md`, and update `registry/skill-registry.json`. `scripts/audit_skills.mjs` enforces this parity.

Three orchestrator skills fan out to parallel subagents and aggregate weighted scores:
- `legal-review` → 5 agents (`legal-clauses`, `legal-risks`, `legal-compliance`, `legal-terms`, `legal-recommendations`), weights 20/25/20/15/20 → Contract Safety Score.
- `legal-employment` → 4 agents (`-contract`, `-rights`, `-discrimination`, `-obligations`), equal weights.
- `legal-corporate` → 3 agents (`-compliance`, `-documents`, `-risk`), weights 35/35/30.

Subagents live in `agents/legal-*.md`. When a subagent's output contract changes, update the aggregation step in its parent orchestrator.

`registry/skill-registry.json` is the canonical command catalogue; the router, docs, and audits derive from it.

### MCP integration (`.mcp.json`)

- `uk-legislation` — legislation.gov.uk: `search_legislation`, `lookup_statute`, `lookup_section`, `check_in_force`, `check_amendments`, `get_extent`.
- `caselaw` — caselaw.nationalarchives.gov.uk: `search_caselaw`, `lookup_judgment`, `summarise_judgment`, `get_judgments_for_section`, search-by-judge/party.
- `lex` — remote HTTP, 63,000 judgments with semantic search.

## Conventions

- **England & Wales only.** No Scots or NI law.
- **Every output starts with the disclaimer block** in `legal/SKILL.md` (load-bearing).
- **Risk indicators:** 🔴 High, 🟡 Medium, 🟢 Low.
- **Input is always:** file path, pasted text, or URL.
- **Distinguish legal currency:** enacted-and-commenced vs enacted-not-commenced vs transitional vs guidance/bills. Don't state a prospective reform is binding unless commencement is known.
- **Generated documents** save as Markdown to the cwd per the naming conventions in `legal/SKILL.md`.
