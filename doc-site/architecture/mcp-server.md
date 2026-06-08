# MCP Server Internals

The MCP (Model Context Protocol) server provides real-time access to UK statute data from legislation.gov.uk. It enables skills (and other MCP clients) to query live legislative information without an API key, using the Open Government Licence v3.0 public API.

## Overview

| Property | Value |
|----------|-------|
| Language | TypeScript |
| SDK | `@modelcontextprotocol/sdk` |
| XML Parser | `fast-xml-parser` |
| Validation | Zod schemas |
| Transport | `StdioServerTransport` (local mode) |
| Data Source | legislation.gov.uk |
| API Key | Not required -- public API |
| Base URL | `https://www.legislation.gov.uk` |

## Architecture

```
Claude Code / MCP client
        │
        ▼
┌─────────────────────┐
│   MCP Server        │
│   (StdioTransport)  │
├─────────────────────┤
│   6 tools           │
│   (Zod schemas)     │
├─────────────────────┤
│   In-memory cache   │
│   (24h TTL, LRU)    │
├─────────────────────┤
│   fetchXml()        │
│   (AbortController) │
├─────────────────────┤
│   fast-xml-parser   │
│   + legislation-    │
│     utils.ts        │
└────────┬────────────┘
         │
         ▼
  legislation.gov.uk
  (XML/Atom feeds)
```

## Tools (6 Registered)

Each tool is registered via `server.tool()` with a Zod schema for input validation.

### `search_legislation`

Search legislation.gov.uk by title keywords, optionally filtered by type and year.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | `string` | Yes | Search keywords for the legislation title |
| `type` | `LegislationType` | No | Filter by legislation type (e.g., `ukpga`, `uksi`) |
| `year` | `number` | No | Filter by year |

```
Input:  { title: "employment rights", type: "ukpga", year: 2025 }
Output: List of matching Acts/SIs with title, type, year, number, URI
```

Returns up to 20 results. Parses Atom feed entries from the search endpoint.

### `lookup_statute`

Retrieve full Act/SI metadata and text.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `LegislationType` | Yes | Legislation type |
| `year` | `number` (1200--2100) | Yes | Year of the legislation |
| `number` | `number` (min 1) | Yes | Number within that year |

```
Input:  { type: "ukpga", year: 2006, number: 46 }
Output: Full text and metadata for Companies Act 2006
```

Fetches `/[type]/[year]/[number]/data.xml` and extracts: title, type, year, number, enacted date, territorial extent, parts count, sections count, provisions count, subject, and truncated body text.

### `lookup_section`

Retrieve a specific section of an Act, including amendment notes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `LegislationType` | Yes | Legislation type |
| `year` | `number` | Yes | Year |
| `number` | `number` | Yes | Number |
| `section` | `string` | Yes | Section number or identifier (e.g., `"1"`, `"10A"`) |

```
Input:  { type: "ukpga", year: 2006, number: 46, section: "171" }
Output: Text of s.171 Companies Act 2006 with amendment notes
```

Fetches `/[type]/[year]/[number]/section/[section]/data.xml`. Extracts section title, body text, Commentary nodes (amendment annotations), and CommentaryRef counts.

### `check_in_force`

Check if a statute or specific provision is currently in force, with commencement dates.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `LegislationType` | Yes | Legislation type |
| `year` | `number` | Yes | Year |
| `number` | `number` | Yes | Number |
| `section` | `string` | No | Specific section to check |

```
Input:  { type: "ukpga", year: 2025, number: 3, section: "1" }
Output: In-force status with commencement date(s)
```

Walks the XML tree collecting `@_RestrictStartDate`, `@_RestrictEndDate`, `@_Status`, and `@_Match` attributes. Categorises provisions into: In Force, Not Yet In Force, Prospective, and Repealed.

### `check_amendments`

List amendments affecting a statute from the changes feed.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `LegislationType` | Yes | Legislation type |
| `year` | `number` | Yes | Year |
| `number` | `number` | Yes | Number |

```
Input:  { type: "ukpga", year: 1996, number: 18 }
Output: List of amendments with affecting instrument, provision, effect type, and date
```

Fetches `/changes/affected/[type]/[year]/[number]/data.feed`. Returns up to 30 amendments with: affecting title, affected provisions, effect type, and date.

### `get_extent`

Check the territorial extent of a statute (which jurisdictions it applies to).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `LegislationType` | Yes | Legislation type |
| `year` | `number` | Yes | Year |
| `number` | `number` | Yes | Number |

```
Input:  { type: "ukpga", year: 2010, number: 15 }
Output: Extent map with jurisdiction codes
```

Walks the entire XML tree collecting `@_RestrictExtent` attributes at both the Act level and provision level. Decodes extent abbreviations:

| Code | Jurisdiction |
|------|-------------|
| `E+W+S+N.I.` | England, Wales, Scotland, Northern Ireland (UK-wide) |
| `E+W+S` | England, Wales, Scotland (Great Britain) |
| `E+W` | England and Wales |
| `E` | England only |
| `W` | Wales only |
| `S` | Scotland only |
| `N.I.` | Northern Ireland only |

## Supported Legislation Types

| Code | Description |
|------|-------------|
| `ukpga` | UK Public General Act |
| `uksi` | UK Statutory Instrument |
| `asp` | Act of the Scottish Parliament |
| `asc` | Act of Senedd Cymru |
| `anaw` | Act of the National Assembly for Wales |
| `mwa` | Measure of the National Assembly for Wales |
| `nia` | Northern Ireland Act |
| `nisi` | Northern Ireland Order in Council |
| `nisr` | Northern Ireland Statutory Rule |
| `ssi` | Scottish Statutory Instrument |
| `wsi` | Wales Statutory Instrument |
| `ukla` | UK Local Act |
| `ukcm` | UK Church Measure |
| `ukci` | UK Church Instrument |
| `uksro` | UK Statutory Rules and Orders |

## In-Memory Cache

The server caches fetched XML responses to reduce API calls to legislation.gov.uk.

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| TTL | 24 hours (`86_400_000` ms) | Legislation changes infrequently; daily refresh is sufficient |
| Max entries | 500 | Prevents unbounded memory growth |
| Eviction | LRU (oldest timestamp) | When cache is full, the entry with the oldest `timestamp` is evicted |
| Key | Full URL string | Each unique URL is cached independently |

```typescript
interface CacheEntry {
  data: string;      // Raw XML response
  timestamp: number; // Date.now() at cache time
}
```

::: tip Cache Behaviour
- Cache hit: returns data immediately, logs `Cache hit: <url>` to stderr
- Cache miss: fetches from legislation.gov.uk, stores result, returns data
- TTL expiry: stale entries are deleted on next access (lazy eviction)
- Overflow: when `cache.size >= 500`, the oldest entry is found by iterating all entries and comparing timestamps, then deleted before inserting the new entry
:::

## Network Configuration

| Parameter | Value |
|-----------|-------|
| Fetch timeout | 30 seconds (`30_000` ms) |
| Timeout mechanism | `AbortController` with `setTimeout` |
| Accept header | `application/xml, text/xml, application/atom+xml, */*` |
| User-Agent | `uk-legal-skills-mcp/1.0` |
| Redirect | `follow` |

::: warning Timeout Handling
If a request to legislation.gov.uk exceeds 30 seconds, the `AbortController` fires and the server throws:
```
Request timed out after 30s: <url>
```
404 responses are caught separately and throw `Not found: <url>`.
:::

## XML Parser Configuration

The `fast-xml-parser` instance is configured once at module level:

```typescript
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
  parseAttributeValue: false,
  removeNSPrefix: true,
});
```

| Option | Value | Purpose |
|--------|-------|---------|
| `ignoreAttributes` | `false` | Preserves attributes like `@_RestrictExtent`, `@_id` |
| `attributeNamePrefix` | `"@_"` | Distinguishes attributes from child elements |
| `textNodeName` | `"#text"` | Explicit key for text content within elements |
| `trimValues` | `true` | Removes leading/trailing whitespace from values |
| `parseAttributeValue` | `false` | Keeps all attribute values as strings |
| `removeNSPrefix` | `true` | Strips namespace prefixes (e.g., `leg:` becomes just the local name) |

## Utility Functions (`legislation-utils.ts`)

Five utility functions extracted into a separate module for testability.

### `extractText(node)`

Recursively extracts all text content from parsed XML nodes. Handles strings, numbers, booleans, arrays, and objects. Skips attribute keys (those starting with `@_`).

```typescript
extractText(node: unknown): string
// Example: extractText({ "#text": "Hello", Nested: { "#text": "World" } })
// Returns: "Hello World"
```

### `cleanText(text)`

Collapses all whitespace sequences (spaces, tabs, newlines) into single spaces and trims.

```typescript
cleanText(text: string): string
// Example: cleanText("  foo   bar\n  baz  ") → "foo bar baz"
```

### `truncate(text, max?)`

Truncates text to a maximum length (default: 5,000 characters). Appends a truncation notice if text is cut.

```typescript
truncate(text: string, max?: number): string
// If text.length > max: returns text.slice(0, max) + "\n\n...truncated (full text exceeds limit)"
```

### `findNodes(obj, name)`

Walks an object tree and collects all values whose key matches `name`. Used to locate specific XML elements regardless of nesting depth.

```typescript
findNodes(obj: unknown, name: string): unknown[]
// Example: findNodes(parsed, "Title") → [all Title nodes in the tree]
```

### `parseSearchResults(parsed)`

Parses Atom feed entries from legislation.gov.uk search results into structured objects:

```typescript
interface ParsedSearchResult {
  title: string;
  link: string;
  updated: string;
  uri: string;
  type: string;   // Extracted from URI pattern
  year: number;   // Extracted from URI pattern
  number: number; // Extracted from URI pattern
}
```

Extracts type, year, and number from the URI using the regex pattern:
```
/legislation\.gov\.uk\/(?:id\/)?(\w+)\/(\d{4})\/(\d+)/
```

## Testing

5 unit tests covering all utility functions:

```bash
cd mcp-servers/uk-legislation
npm install
npm test    # tsc → dist/, then node --test on dist/**/*.test.js
```

Tests cover: `extractText` (various node types), `cleanText` (whitespace normalisation), `truncate` (within and over limit), `findNodes` (nested object search), and `parseSearchResults` (Atom feed parsing).

## Server Registration

The MCP server is registered in `.mcp.json` at the repository root:

```json
{
  "mcpServers": {
    "uk-legislation": {
      "command": "npx",
      "args": ["tsx", "mcp-servers/uk-legislation/src/index.ts"]
    },
    "lex": {
      "url": "https://lex.lab.i.ai.gov.uk/mcp"
    }
  }
}
```

| Server | Type | Description |
|--------|------|-------------|
| `uk-legislation` | Local (`StdioServerTransport`) | Runs locally via `npx tsx`. Provides 6 tools against legislation.gov.uk XML API. |
| `lex` | Remote (HTTP) | Government AI lab server providing 63,000 court cases and semantic search across legislation. |

## Development

```bash
cd mcp-servers/uk-legislation
npm install
npm run dev     # tsx src/index.ts — starts stdio MCP server
npm run build   # tsc → dist/
npm test        # build + node --test on dist/**/*.test.js
```

::: tip Logging
All log output goes to `stderr` (not stdout, which is reserved for MCP protocol messages) via the `log()` helper:
```typescript
function log(msg: string): void {
  process.stderr.write(`[uk-legislation] ${msg}\n`);
}
```
:::

## Startup Sequence

```typescript
async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  log("Starting UK Legislation MCP server...");
  await server.connect(transport);
  log("Server connected and ready.");
}
```

The server creates a `McpServer` instance with name `"uk-legislation"` and version `"1.0.0"`, registers all 6 tools, connects via `StdioServerTransport`, and then waits for incoming tool calls from the MCP client (Claude Code or another MCP client).
