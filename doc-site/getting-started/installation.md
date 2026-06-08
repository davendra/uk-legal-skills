# Installation

There are three ways to install the `/legal` skills. Choose whichever suits your workflow.

## Method 1: One-line install (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/davendra/uk-legal-skills/main/install.sh | bash
```

This clones the repository into a temporary directory, copies the skills and agents into `~/.claude/`, and cleans up after itself.

## Method 2: Clone and install

```bash
git clone https://github.com/davendra/uk-legal-skills.git
cd uk-legal-skills
./install.sh
```

Use this method if you want to keep a local copy for contributing or customising skills.

## Method 3: Manual copy

If you prefer full control, copy the files yourself:

```bash
# Clone the repo
git clone https://github.com/davendra/uk-legal-skills.git
cd uk-legal-skills

# Create target directories
mkdir -p ~/.claude/skills
mkdir -p ~/.claude/agents

# Copy the orchestrator
cp -r legal ~/.claude/skills/legal

# Copy all sub-skills
cp -r skills/legal-* ~/.claude/skills/

# Copy all agents
cp agents/*.md ~/.claude/agents/

# Copy scripts and templates
cp scripts/*.py ~/.claude/skills/legal/scripts/
cp templates/*.md ~/.claude/skills/legal/templates/
```

## What install.sh does

The installer performs these steps:

1. **Detects local vs remote** --- if run from a local clone it uses those files; otherwise it clones `davendra/uk-legal-skills` from GitHub into a temp directory
2. **Creates directories** --- `~/.claude/skills/` and `~/.claude/agents/`
3. **Copies the skill files** --- the main orchestrator (`legal/SKILL.md`) plus the 38 command skills (`skills/legal-*/SKILL.md`)
4. **Copies 12 agent files** --- parallel analysis agents used by the review, employment, and corporate orchestrators
5. **Copies scripts and templates** --- Python scripts for PDF generation and Markdown templates for document generation
6. **Checks prerequisites** --- warns if the agent host, Python 3, or reportlab are missing (installation still succeeds)
7. **Prints a summary** --- installed counts and a command reference table

::: tip Verify the installation
After installing, open your agent host and type `/legal`. You should see the full command menu with all 38 skills listed.
:::

## MCP server setup

Two MCP servers provide real-time legal data. `uk-legislation` looks up statutes against legislation.gov.uk; `caselaw` searches court judgments via the National Archives caselaw service. Both query public government APIs and need no API key. They require Node.js 18+.

Build and run a server from its directory:

```bash
cd mcp-servers/uk-legislation
npm install
npm run build     # tsc → dist/
npm run dev       # tsx src/index.ts — stdio MCP server
```

The `caselaw` server has the same npm layout:

```bash
cd mcp-servers/caselaw
npm install
npm run build
npm run dev
```

The project's `.mcp.json` registers `uk-legislation` and `caselaw` for local use, plus the remote `lex` server for additional court-case search.

### Available MCP tools (uk-legislation)

| Tool | Description |
|------|-------------|
| `search_legislation` | Full-text search across UK legislation |
| `lookup_statute` | Look up a specific Act by title and year |
| `lookup_section` | Retrieve a specific section of an Act |
| `check_in_force` | Verify whether a provision is currently in force |
| `check_amendments` | List amendments to a section |
| `get_extent` | Check geographic extent (E+W, S, NI) |

## Uninstalling

To remove all installed skills and agents:

```bash
./uninstall.sh
```

This removes the skill directories from `~/.claude/skills/` and agent files from `~/.claude/agents/`. Your agent host installation is otherwise unchanged. The MCP servers are not affected --- delete their directories manually if needed.
