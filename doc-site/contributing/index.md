# How to Contribute

UK Legal Skills is an open-source project licensed under the MIT License. We welcome contributions across every part of the system -- from new legal skills to agent improvements, MCP server tooling, sample documents, and documentation improvements.

![Contributors route (broadsheet rebrand) — fork, branch, test, open PR](/images/contributing-2026.jpg)

*Plate I — the broadsheet rebrand.*

![How to contribute — fork, add skills, submit PR](/images/contributing.jpg)

*Plate I.a — the original, kept for reference.*

## Fork / Branch / PR Workflow

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/uk-legal-skills.git
cd uk-legal-skills

# 3. Create a feature branch
git checkout -b feat/your-feature-name

# 4. Make your changes, commit, and push
git add .
git commit -m "feat: description of your change"
git push origin feat/your-feature-name

# 5. Open a Pull Request against the main branch
```

::: tip Branch Naming Convention
Use prefixes that describe the type of change:
- `feat/` -- new features or skills
- `fix/` -- bug fixes
- `docs/` -- documentation only
- `refactor/` -- code restructuring without behaviour change
- `test/` -- adding or updating tests
:::

## Areas to Contribute

| Area | Description | Key Files / Directories |
|------|-------------|------------------------|
| **New Skills** | Add a new `/legal` command for a legal domain not yet covered | `skills/legal-*/SKILL.md`, `legal/SKILL.md` |
| **Agent Improvements** | Enhance subagent analysis depth, output format, or scoring | `agents/legal-*.md` |
| **MCP Server Tools** | Add legislation or caselaw lookup tools or improve existing ones | `mcp-servers/uk-legislation/src/`, `mcp-servers/caselaw/src/` |
| **Documentation** | Improve guides, add examples, fix errors | `doc-site/` |
| **Sample Documents** | Add realistic sample legal documents for the evaluation corpus | `samples/` |
| **Evaluation** | Improve scoring against the expected-findings corpus | `evaluation/`, `scripts/` |
| **PDF Reports** | Enhance the PDF report generator layout and styling | `scripts/generate_legal_pdf.py` |

### Ideas for New Skills

- Partnership law (Partnership Act 1890)
- Charity law (Charities Act 2011)
- Planning and construction (CDM Regulations 2015)
- Environmental compliance
- Marine and shipping law
- Insurance contract review (Insurance Act 2015)

## Before You Start

1. **Check existing issues** -- someone may already be working on it
2. **Open an issue first** for large changes to discuss the approach
3. **Read the coding standards** -- see [Coding Standards](./coding-standards.md) for rules that apply to all contributions
4. **Run the checks** before submitting your PR:

```bash
# Skill / agent / router / registry parity
npm run test:skills

# MCP server tests
cd mcp-servers/uk-legislation
npm install
npm test
```

::: warning
Run `npm run test:skills` before submitting a PR. It verifies that the 38 skills, 12 agents, the `legal/SKILL.md` router table, and `registry/skill-registry.json` all stay in sync, and CI runs the same check.
:::

## Pull Request Checklist

Before submitting a PR, verify:

- [ ] Your branch is up to date with `main`
- [ ] Skill / agent / router / registry parity passes (`npm run test:skills`)
- [ ] Any MCP server changes have appropriate test coverage
- [ ] Skill files include the standard disclaimer block
- [ ] Jurisdiction is limited to **England & Wales** only
- [ ] Risk indicators use the standard format (`🔴 High Risk`, `🟡 Medium Risk`, `🟢 Low Risk`)
- [ ] Commit messages follow conventional format (`feat:`, `fix:`, `docs:`, etc.)
- [ ] PR description clearly explains what changed and why

## Community Guidelines

- **Be respectful** -- constructive feedback, no personal attacks
- **Be specific** -- when reporting bugs, include steps to reproduce, expected behaviour, and actual behaviour
- **Be patient** -- maintainers review PRs as time allows
- **Ask questions** -- if you are unsure about the right approach, open a discussion
- **Credit others** -- if your work builds on someone else's contribution, acknowledge it
- **Focus feedback on the work, not the person** -- all contributions are welcome regardless of experience level
- **Welcome newcomers** -- help new contributors get started and find their footing

## License

This project is licensed under the **MIT License**. By contributing, you agree that your contributions will be licensed under the same terms.

```
MIT License

Copyright (c) 2025 Davendra Patel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

::: info
All skill files (`SKILL.md`) and agent files are pure Markdown with no runtime code dependencies. This makes them straightforward to write and review -- no build step is required for skill-only changes.
:::

## Quick Links

| Guide | Description |
|-------|-------------|
| [Adding Skills](./adding-skills.md) | Create a new `/legal` command |
| [Adding Agents](./adding-agents.md) | Create a parallel analysis agent |
| [Coding Standards](./coding-standards.md) | Conventions and requirements |

## Getting Help

- Open a **GitHub issue** for bugs or feature requests
- Start a **GitHub Discussion** for questions or design proposals
- Review existing skills in `skills/legal-*/SKILL.md` for examples of the expected format
