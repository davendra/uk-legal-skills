# MCP Integration

When you ask AI Legal UK to check whether a law has been amended or is still in force, it doesn't just guess from its training data -- it actually looks it up in real time. This is possible because of something called the Model Context Protocol (MCP).

Think of MCP like giving the AI a library card. Without it, the AI can only tell you what it learned during training (which might be months out of date). With MCP, the AI can walk into the library (legislation.gov.uk and a database of 63,000 court cases) and check the actual current state of the law.

This matters because laws change constantly. The Renters' Rights Act 2025 abolished Section 21 evictions. The Data (Use and Access) Act 2025 changed GDPR rules. If your AI doesn't know about these changes, it gives you wrong advice. MCP prevents that.

![MCP concept (broadsheet rebrand) — three live sources of UK law](/images/mcp-concept-2026.jpg)

*Plate I — the broadsheet rebrand.*

![MCP connects AI to live legislation databases](/images/mcp-concept.jpg)

*Plate I.a — the original, kept for reference.*

## What Is MCP?

**Model Context Protocol (MCP)** is an open protocol that lets AI models connect to external data sources and tools in real time. Instead of relying solely on training data (which may be months or years out of date), MCP gives the AI live access to external systems during a conversation.

### Without MCP

The AI only knows what was in its training data. If a statute was amended last month, the AI may still cite the old version. If a new Act commenced last week, the AI does not know it exists.

### With MCP

The AI can:

- **Look up live legislation** from legislation.gov.uk
- **Check if a statute is still in force** or has been repealed
- **Search amendments** affecting a specific Act
- **Query 63,000+ court cases** with semantic search
- **Retrieve explanatory notes** for complex legislation

::: info Real-Time Legal Data
MCP bridges the gap between the AI's training cutoff and the current state of UK law. This is especially important for fast-moving areas like employment law (ERA 2025), consumer protection (DMCCA 2024), and corporate compliance (ECCTA 2023).
:::

## How AI Legal UK Uses MCP

AI Legal UK connects to **two MCP servers** that provide complementary coverage:

| Server | Type | Source | Coverage |
|--------|------|--------|----------|
| [uk-legislation](/mcp/uk-legislation) | Local | legislation.gov.uk | All UK statutes and SIs |
| [lex](/mcp/lex-server) | Remote | lex.lab.i.ai.gov.uk | 63,000+ court cases + semantic search |

### Configuration

Both servers are registered in `.mcp.json` at the project root:

```json
{
  "mcpServers": {
    "uk-legislation": {
      "command": "npx",
      "args": ["tsx", "mcp-servers/uk-legislation/src/index.ts"]
    },
    "lex": {
      "type": "http",
      "url": "https://lex.lab.i.ai.gov.uk/mcp"
    }
  }
}
```

- The **uk-legislation** server runs locally as a stdio process
- The **lex** server is a remote HTTP endpoint -- no local setup required

### How Skills Use MCP

Skills reference MCP tools by name in their prompts. For example, the Legislation Tracker skill may call `search_legislation` to find a statute, then `check_in_force` to verify it is still current, then `check_amendments` to see recent changes.

The skill itself does not contain code -- it is a Markdown prompt that instructs the active agent host to use the available MCP tools when it needs live data.

::: tip No Extra Setup for CLI Users
If you installed AI Legal UK via `install.sh`, the MCP configuration is already in place. The `uk-legislation` server starts automatically when Claude Code needs it. The remote `lex` server requires no local installation.
:::

## When MCP Is Used

MCP tools are called on demand during analysis. Not every skill needs live data. For example:

| Skill | Uses MCP? | Why |
|-------|-----------|-----|
| Contract Review | Sometimes | To verify statute citations in the contract |
| Legislation Tracker | Always | Core purpose is checking statute currency |
| Compliance Audit | Sometimes | To confirm regulatory provisions are current |
| Plain English | Rarely | Translation does not usually require live data |
| NDA Generator | No | Document generation uses templates, not live lookups |

The AI decides when to call MCP tools based on the analysis context. You do not need to configure anything -- it happens automatically.
