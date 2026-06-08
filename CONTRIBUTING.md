# Contributing

Contributions are welcome — new skills, agent improvements, MCP tooling, sample documents, and documentation.

## Ground rules

- **Jurisdiction is England & Wales only.** Don't add Scots law or Northern Irish equivalents — every skill pins this.
- **Every user-facing output starts with the disclaimer block** defined in `legal/SKILL.md` (AI-generated, not legal advice, consult a solicitor, England & Wales).
- **Risk indicators are standardised:** 🔴 High, 🟡 Medium, 🟢 Low.
- **Input is always one of three shapes:** file path, pasted text, or URL.

## Adding a `/legal` skill

1. **Create the skill** — add `skills/legal-<name>/SKILL.md`. Each skill is a self-contained Markdown prompt; copy the structure (including the `## Universal Operating Standard` section) from an existing skill.
2. **Wire it to the router** — add a row to the command menu and routing table in `legal/SKILL.md`.
3. **Add any subagents** it orchestrates under `agents/legal-<name>.md`.
4. **Register it** — add an entry to `registry/skill-registry.json` with `id`, `name`, `command`, `category`, `description`, `route`, and `inputContract`. Then run the parity guard:

   ```bash
   npm run test:skills      # enforces skill ↔ agent ↔ router ↔ registry parity
   npm run test:docs        # regenerates and checks the command reference
   ```

Both audits must pass before you open a PR. `npm run test:skills` will fail loudly if the skill count, router table, or registry drift out of sync.

## MCP servers

The `mcp-servers/uk-legislation` and `mcp-servers/caselaw` packages are TypeScript with `node --test` suites:

```bash
cd mcp-servers/<server>
npm install
npm run build
npm test
```

## A note on The Counsel

A separate hosted web product, [The Counsel](https://the-counsel.co.uk), is built on these skills but lives in its own private repository. Changes here do not automatically propagate there. Keep this repo focused on the platform-neutral skills, agents, and MCP servers.
