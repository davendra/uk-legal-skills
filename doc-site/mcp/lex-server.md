# Lex Remote MCP Server

A remote MCP server providing access to 63,000+ court cases and advanced legislation search with semantic capabilities.

## Overview

| Property | Value |
|----------|-------|
| **URL** | `https://lex.lab.i.ai.gov.uk/mcp` |
| **Transport** | HTTP (remote server) |
| **API key** | Not required |
| **Local setup** | None -- configured as a remote MCP endpoint |
| **Maintained by** | UK Government AI Lab (Incubator for AI, DSIT) |

::: info No Local Installation
Unlike the uk-legislation server, the Lex server runs remotely. You do not need to install or start anything locally. It is configured in `.mcp.json` and Claude Code connects to it over HTTP when needed.
:::

## Configuration

In `.mcp.json`:

```json
{
  "mcpServers": {
    "lex": {
      "type": "http",
      "url": "https://lex.lab.i.ai.gov.uk/mcp"
    }
  }
}
```

## Tools

The Lex server provides a broader set of tools compared to the local uk-legislation server, with a focus on **case law**, **semantic search**, and **explanatory notes**.

### Legislation Search

| Tool | Description |
|------|-------------|
| `search_for_legislation_acts` | Search for Acts of Parliament with semantic matching |
| `search_for_legislation_sections` | Search within specific sections of legislation |
| `search_amendments` | Find amendments affecting legislation |
| `search_amendment_sections` | Search within amendment text |

### Legislation Lookup

| Tool | Description |
|------|-------------|
| `lookup_legislation` | Look up a specific piece of legislation by identifier |
| `get_legislation_full_text` | Retrieve the complete text of legislation |
| `get_legislation_sections` | Get all sections of a statute |

### Explanatory Notes

| Tool | Description |
|------|-------------|
| `search_explanatory_note` | Search explanatory notes across legislation |
| `get_explanatory_note_by_section` | Get the explanatory note for a specific section |
| `get_explanatory_note_by_legislation` | Get all explanatory notes for a statute |

::: tip What Are Explanatory Notes?
Explanatory notes are published alongside most Acts of Parliament. They explain the purpose and effect of each section in plain language. They are not part of the law itself but are invaluable for understanding legislative intent.
:::

### Data Proxy

| Tool | Description |
|------|-------------|
| `proxy_legislation_data` | Proxy raw data requests to legislation.gov.uk |

### Server Status

| Tool | Description |
|------|-------------|
| `get_live_stats_api_stats_get` | Live API statistics |
| `health_check_healthcheck_get` | Server health check |

## When Is Lex Used?

The Lex server complements the local uk-legislation server. Skills may use either or both depending on the task:

| Need | Server | Why |
|------|--------|-----|
| Look up a specific statute | uk-legislation | Direct XML access, works offline |
| Check if a provision is in force | uk-legislation | Dedicated `check_in_force` tool |
| Search for case law | **lex** | 63,000+ court cases with semantic search |
| Get explanatory notes | **lex** | Structured explanatory note access |
| Semantic legislation search | **lex** | AI-powered relevance ranking |
| Check amendments | Either | Both provide amendment tools |

## Comparison with Local Server

| Feature | uk-legislation (local) | lex (remote) |
|---------|----------------------|--------------|
| Transport | stdio (local process) | HTTP (remote) |
| Data source | legislation.gov.uk XML | legislation.gov.uk + court cases |
| Court cases | No | Yes (63,000+) |
| Explanatory notes | No | Yes |
| Semantic search | No | Yes |
| In-force checking | Yes | No (dedicated tool) |
| Territorial extent | Yes | No (dedicated tool) |
| Offline capable | Yes (after cache) | No |
| Cache | 24h in-memory | Server-side |

::: warning Availability
The Lex server is hosted by the UK Government AI Lab. While generally available, it depends on external infrastructure. If the server is unreachable, skills that need case law or explanatory notes will fall back to what is available from the local uk-legislation server and the AI's training data.
:::

## Example Usage in Skills

When a skill like **Legislation Tracker** runs, it might call tools from both servers:

1. `search_legislation` (local) -- find the statute referenced in the contract
2. `check_in_force` (local) -- verify the statute is still in force
3. `check_amendments` (local) -- check for recent amendments
4. `get_explanatory_note_by_section` (lex) -- understand the purpose of a section
5. `search_for_legislation_acts` (lex) -- find related legislation via semantic search

This combination of local and remote MCP servers gives skills comprehensive, real-time access to UK legal data.
