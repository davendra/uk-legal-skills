# Requirements

## Required

### Compatible agent host

The `/legal` skills are platform-neutral Markdown prompts. Use Claude Code or another compatible agent host that can load `SKILL.md` files from `~/.claude/skills/`.

No API key is required for the `/legal` commands themselves — they run on the model access provided by your agent host.

### Git

Required to clone the repository (the one-line installer also clones from GitHub). Not needed if you download a release archive and run the installer from it.

```bash
git --version
```

## Optional

### Node.js 18+

Needed to build and run the MCP servers (`uk-legislation` and `caselaw`) and to run the repository's npm audit scripts. The MCP servers query public government APIs and require no API key.

```bash
node --version   # must be 18.0.0 or higher
```

The `/legal` commands work without Node.js; you only need it for live legislation and caselaw lookups via the MCP servers and for the audit tooling.

### Python 3 with reportlab

Only needed for the `/legal report-pdf` command, which generates professional PDF reports.

```bash
python3 --version          # Python 3
pip3 install reportlab     # PDF generation library
```

If Python or reportlab is missing, all other skills work normally --- only PDF export is unavailable.

## Supported platforms

| Platform | Status |
|----------|--------|
| macOS | Fully supported |
| Linux | Fully supported |
| Windows (WSL) | Supported via Windows Subsystem for Linux |
| Windows (native) | Not supported --- use WSL |

## Summary

| Prerequisite | Purpose | Required? |
|-------------|---------|-----------|
| Compatible agent host | Run `/legal` commands | Yes |
| Git | Clone the repository | Yes (if not using a release archive) |
| Node.js 18+ | Build the MCP servers and run audit scripts | Optional |
| Python 3 | PDF report generation | Optional |
| reportlab | PDF rendering | Optional |
