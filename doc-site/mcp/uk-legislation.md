# UK Legislation MCP Server

A local MCP server providing real-time access to UK statute data from [legislation.gov.uk](https://www.legislation.gov.uk).

## Overview

| Property | Value |
|----------|-------|
| **Source** | legislation.gov.uk (Open Government Licence v3.0) |
| **API key** | Not required |
| **Transport** | stdio (runs as a local process) |
| **Location** | `mcp-servers/uk-legislation/src/index.ts` |
| **Cache** | 24-hour in-memory, 500-entry LRU |
| **Fetch timeout** | 30 seconds |

## Running the Server

```bash
cd mcp-servers/uk-legislation
npm install
npm run dev     # start the server (tsx src/index.ts)
```

For production builds:

```bash
npm run build   # compiles to dist/
npm test        # build + run tests
```

::: info Automatic Startup
When configured in `.mcp.json`, Claude Code starts the server automatically when a skill needs it. You do not need to start it manually.
:::

## Tools

The server exposes 6 tools:

### 1. `search_legislation`

Search UK legislation by title keywords.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Search keywords for the legislation title |
| `type` | string | No | Filter by legislation type (e.g., `ukpga`, `uksi`) |
| `year` | number | No | Filter by year |

**Returns:** Up to 20 results, each with title, type, year, number, and URI.

```
Example: search_legislation("Companies Act", type="ukpga")
```

### 2. `lookup_statute`

Get full metadata and text of a specific Act or Statutory Instrument.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Legislation type (e.g., `ukpga`, `uksi`) |
| `year` | number | Yes | Year of the legislation (1200-2100) |
| `number` | number | Yes | Number within that year |

**Returns:** Title, enacted date, extent, parts count, provisions count, and full text.

```
Example: lookup_statute(type="ukpga", year=2006, number=46)
         → Companies Act 2006
```

### 3. `lookup_section`

Get a specific section of an Act, including amendment notes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Legislation type |
| `year` | number | Yes | Year |
| `number` | number | Yes | Number |
| `section` | string | Yes | Section number (e.g., `"1"`, `"10A"`) |

**Returns:** Section text and commentary references (amendment notes with ID, type, and description).

```
Example: lookup_section(type="ukpga", year=2006, number=46, section="172")
         → Companies Act 2006, s.172 — Duty to promote the success of the company
```

### 4. `check_in_force`

Check whether a statute or specific provision is currently in force.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Legislation type |
| `year` | number | Yes | Year |
| `number` | number | Yes | Number |
| `section` | string | No | Specific section to check |

**Returns:** Status per provision, categorised as:
- **In Force** -- provision is currently active, with commencement date
- **Not Yet In Force** -- provision has a future commencement date
- **Prospective** -- provision is enacted but awaiting commencement order
- **Repealed** -- provision has been repealed

::: warning Commencement Complexity
Some Acts commence in stages over years. If no explicit commencement data is found in the XML, the tool recommends checking the Act's commencement section or related Commencement Orders (SIs).
:::

### 5. `check_amendments`

Get amendments affecting a specific statute from the legislation.gov.uk changes feed.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Legislation type |
| `year` | number | Yes | Year |
| `number` | number | Yes | Number |

**Returns:** Up to 30 amendments, each with:
- Amending instrument (the SI or Act that made the change)
- Affected provision (the specific section amended)
- Effect type (e.g., substituted, inserted, repealed)
- Date of the amendment

```
Example: check_amendments(type="ukpga", year=1998, number=42)
         → Amendments affecting the Human Rights Act 1998
```

### 6. `get_extent`

Check the territorial extent of UK legislation -- which jurisdictions it applies to.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Legislation type |
| `year` | number | Yes | Year |
| `number` | number | Yes | Number |

**Returns:** Overall extent and provision-level breakdown with decoded extent codes:

| Code | Jurisdiction |
|------|-------------|
| `E+W+S+N.I.` | England, Wales, Scotland, Northern Ireland (UK-wide) |
| `E+W+S` | England, Wales, Scotland (Great Britain) |
| `E+W` | England and Wales |
| `E` | England only |
| `W` | Wales only |
| `S` | Scotland only |
| `N.I.` | Northern Ireland only |

## Legislation Types

The server supports 15 legislation types:

| Code | Description |
|------|-------------|
| `ukpga` | UK Public General Acts |
| `uksi` | UK Statutory Instruments |
| `asp` | Acts of the Scottish Parliament |
| `asc` | Acts of Senedd Cymru |
| `anaw` | Acts of the National Assembly for Wales |
| `mwa` | Measures of the National Assembly for Wales |
| `nia` | Northern Ireland Acts |
| `nisi` | Northern Ireland Orders in Council |
| `nisr` | Northern Ireland Statutory Rules |
| `ssi` | Scottish Statutory Instruments |
| `wsi` | Wales Statutory Instruments |
| `ukla` | UK Local Acts |
| `ukcm` | UK Church Measures |
| `ukci` | UK Church Instruments |
| `uksro` | UK Statutory Rules and Orders |

## Caching

The server maintains a 24-hour in-memory cache to reduce load on legislation.gov.uk and improve response times.

| Property | Value |
|----------|-------|
| TTL | 24 hours |
| Max entries | 500 |
| Eviction | LRU (oldest entry removed when full) |
| Scope | Per server process (resets on restart) |

::: tip Cache Behaviour
Cache hits are logged to stderr as `[uk-legislation] Cache hit: <url>`. On a fresh start, the first request for each statute will be slower (network fetch), but subsequent requests within 24 hours return instantly.
:::

## Error Handling

| Scenario | Behaviour |
|----------|-----------|
| Statute not found | Returns `Error: Not found: <url>` |
| Network timeout | Returns `Error: Request timed out after 30s: <url>` |
| HTTP error | Returns `Error: HTTP <status> fetching <url>` |
| Amendments feed unavailable | Returns helpful message suggesting the changes feed may not be available for that item |
