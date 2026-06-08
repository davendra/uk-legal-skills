#!/usr/bin/env node

/**
 * UK Legislation MCP Server
 *
 * Provides real-time access to UK statute data from legislation.gov.uk
 * using the Open Government Licence v3.0 (no API key required).
 *
 * Tools:
 *   1. lookup_statute    - Full Act/SI metadata and text
 *   2. lookup_section    - Specific section of an Act
 *   3. search_legislation - Search by title keywords
 *   4. check_amendments  - Amendments affecting a statute
 *   5. get_extent        - Territorial extent of a statute
 *   6. check_in_force    - Whether a provision is in force
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import {
  cleanText,
  extractText,
  findNodes,
  parseSearchResults,
  truncate,
} from "./legislation-utils.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL = "https://www.legislation.gov.uk";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_MAX_ENTRIES = 500;
const FETCH_TIMEOUT_MS = 30_000;
const LEGISLATION_TYPES = [
  "ukpga",
  "uksi",
  "asp",
  "asc",
  "anaw",
  "mwa",
  "nia",
  "nisi",
  "nisr",
  "ssi",
  "wsi",
  "ukla",
  "ukcm",
  "ukci",
  "uksro",
] as const;

type LegislationType = (typeof LEGISLATION_TYPES)[number];

// ---------------------------------------------------------------------------
// XML parser — configured once
// ---------------------------------------------------------------------------

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
  parseAttributeValue: false,
  removeNSPrefix: true,
});

// ---------------------------------------------------------------------------
// In-memory cache
// ---------------------------------------------------------------------------

interface CacheEntry {
  data: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

function getCached(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key: string, data: string): void {
  // Evict oldest entries if cache is full
  if (cache.size >= CACHE_MAX_ENTRIES) {
    let oldestKey = "";
    let oldestTime = Infinity;
    for (const [k, v] of cache) {
      if (v.timestamp < oldestTime) {
        oldestTime = v.timestamp;
        oldestKey = k;
      }
    }
    if (oldestKey) cache.delete(oldestKey);
  }
  cache.set(key, { data, timestamp: Date.now() });
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

function log(msg: string): void {
  process.stderr.write(`[uk-legislation] ${msg}\n`);
}

async function fetchXml(url: string): Promise<string> {
  const cached = getCached(url);
  if (cached) {
    log(`Cache hit: ${url}`);
    return cached;
  }

  log(`Fetching: ${url}`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Accept: "application/xml, text/xml, application/atom+xml, */*",
        "User-Agent": "ai-legal-uk-mcp/1.0",
      },
      redirect: "follow",
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Request timed out after ${FETCH_TIMEOUT_MS / 1000}s: ${url}`);
    }
    throw err;
  }
  clearTimeout(timeout);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Not found: ${url}`);
    }
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }

  const text = await res.text();
  setCache(url, text);
  return text;
}

// ---------------------------------------------------------------------------
// Text extraction helpers
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Tool implementations
// ---------------------------------------------------------------------------

async function lookupStatute(
  type: LegislationType,
  year: number,
  number: number,
): Promise<string> {
  const url = `${BASE_URL}/${type}/${year}/${number}/data.xml`;
  const xml = await fetchXml(url);
  const parsed = xmlParser.parse(xml);

  // Extract metadata
  const metadata = parsed?.Legislation?.Metadata ?? parsed?.Legislation?.ukm?.Metadata ?? {};
  const dcTitle =
    findNodes(parsed, "Title")?.[0] ??
    findNodes(parsed, "title")?.[0] ??
    findNodes(metadata, "Title")?.[0];
  const title = typeof dcTitle === "object" ? extractText(dcTitle) : String(dcTitle ?? "Unknown");

  const description = extractText(findNodes(parsed, "Subject")?.[0] ?? findNodes(parsed, "subject")?.[0] ?? "");
  const enacted = extractText(findNodes(metadata, "EnactmentDate")?.[0] ?? "");
  const year_ = extractText(findNodes(metadata, "Year")?.[0] ?? String(year));
  const number_ = extractText(findNodes(metadata, "Number")?.[0] ?? String(number));

  // Extent
  const extentNodes = findNodes(parsed, "PrimaryPrelims") as Record<string, unknown>[];
  let extent = "";
  for (const node of extentNodes) {
    if (node && typeof node === "object" && "@_RestrictExtent" in node) {
      extent = String(node["@_RestrictExtent"]);
      break;
    }
  }
  if (!extent) {
    // Try top-level Legislation node
    const legNode = parsed?.Legislation;
    if (legNode && typeof legNode === "object" && "@_RestrictExtent" in legNode) {
      extent = String(legNode["@_RestrictExtent"]);
    }
  }

  // Body text
  const body = parsed?.Legislation?.Body ?? parsed?.Legislation?.Primary?.Body ?? {};
  const fullText = cleanText(extractText(body));

  // Count provisions (Parts/Sections)
  const parts = findNodes(body, "Part");
  const sections = findNodes(body, "Pblock");
  const pNumbers = findNodes(body, "P1");

  const lines: string[] = [
    `# ${cleanText(title)}`,
    "",
    `- **Type:** ${type}`,
    `- **Year:** ${year_}`,
    `- **Number:** ${number_}`,
    `- **Enacted:** ${enacted || "N/A"}`,
    `- **Extent:** ${extent || "N/A"}`,
    `- **Parts:** ${parts.length}`,
    `- **Sections/Blocks:** ${sections.length}`,
    `- **Provisions (P1):** ${pNumbers.length}`,
  ];

  if (description) {
    lines.push(`- **Subject:** ${cleanText(description)}`);
  }

  lines.push("", "## Text", "", truncate(fullText));

  return lines.join("\n");
}

async function lookupSection(
  type: LegislationType,
  year: number,
  number: number,
  section: string,
): Promise<string> {
  const url = `${BASE_URL}/${type}/${year}/${number}/section/${section}/data.xml`;
  const xml = await fetchXml(url);
  const parsed = xmlParser.parse(xml);

  // Section title
  const titles = findNodes(parsed, "Title");
  const sectionTitle = titles.length > 0 ? cleanText(extractText(titles[titles.length - 1])) : `Section ${section}`;

  // Section text
  const body =
    parsed?.Legislation?.Body ??
    parsed?.Legislation?.Primary?.Body ??
    parsed?.Legislation ??
    {};
  const fullText = cleanText(extractText(body));

  // Amendment notes (CommentaryRef or Annotations)
  const commentaryRefs = findNodes(parsed, "CommentaryRef");
  const annotations = findNodes(parsed, "Annotations");
  const commentaries = findNodes(parsed, "Commentary");

  const amendmentNotes: string[] = [];
  for (const c of commentaries) {
    if (c && typeof c === "object") {
      const rec = c as Record<string, unknown>;
      const id = rec["@_id"] ?? "";
      const type_ = rec["@_Type"] ?? "";
      const text = cleanText(extractText(c));
      if (text) {
        amendmentNotes.push(`[${id}] (${type_}) ${text}`);
      }
    }
  }

  const lines: string[] = [
    `# ${sectionTitle}`,
    `*${type} ${year} c.${number}, Section ${section}*`,
    "",
    "## Text",
    "",
    truncate(fullText),
  ];

  if (amendmentNotes.length > 0) {
    lines.push("", "## Amendment Notes", "");
    for (const note of amendmentNotes) {
      lines.push(`- ${note}`);
    }
  }

  if (commentaryRefs.length > 0) {
    lines.push("", `*${commentaryRefs.length} commentary reference(s) in this section.*`);
  }

  return lines.join("\n");
}

async function searchLegislation(
  title: string,
  type?: LegislationType,
  year?: number,
): Promise<string> {
  // Build search URL
  const encodedTitle = encodeURIComponent(title);
  let url: string;

  if (type) {
    url = `${BASE_URL}/${type}`;
    const params: string[] = [`title=${encodedTitle}`];
    if (year) params.push(`year=${year}`);
    url += `?${params.join("&")}`;
  } else {
    url = `${BASE_URL}/id?title=${encodedTitle}`;
  }

  // Use Atom feed for richer results
  const feedUrl = type ? url : `${BASE_URL}/search?title=${encodedTitle}${year ? `&year=${year}` : ""}`;

  let xml: string;
  try {
    xml = await fetchXml(feedUrl);
  } catch {
    // Fallback to direct title search
    xml = await fetchXml(url);
  }

  const parsed = xmlParser.parse(xml);

  // Parse Atom feed entries
  const entryList = parseSearchResults(parsed);

  if (entryList.length === 0) {
    // Try alternate structure
    const links = findNodes(parsed, "link");
    if (links.length > 0) {
      return `Search for "${title}" found references but no structured results.\n\nTry a more specific search or use lookup_statute with known type/year/number.`;
    }
    return `No results found for "${title}".`;
  }

  const results: string[] = [`# Search Results for "${title}"`, "", `Found ${entryList.length} result(s):`, ""];

  for (const entry of entryList.slice(0, 20)) {
    const parts: string[] = [`### ${entry.title}`];
    if (entry.type) {
      parts.push(`- **Type:** ${entry.type}`);
      parts.push(`- **Year:** ${entry.year}`);
      parts.push(`- **Number:** ${entry.number}`);
    }
    if (entry.updated) parts.push(`- **Updated:** ${entry.updated}`);
    if (entry.uri) parts.push(`- **URI:** ${entry.uri}`);
    parts.push("");

    results.push(parts.join("\n"));
  }

  if (entryList.length > 20) {
    results.push(`\n*...and ${entryList.length - 20} more results.*`);
  }

  return results.join("\n");
}

async function checkAmendments(
  type: LegislationType,
  year: number,
  number: number,
): Promise<string> {
  const url = `${BASE_URL}/changes/affected/${type}/${year}/${number}/data.feed`;
  let xml: string;
  try {
    xml = await fetchXml(url);
  } catch (err) {
    // Try CSV fallback info
    return `Could not retrieve amendments feed for ${type}/${year}/${number}. The legislation.gov.uk changes feed may not be available for this item.\n\nError: ${err instanceof Error ? err.message : String(err)}`;
  }

  const parsed = xmlParser.parse(xml);

  const entries = parsed?.feed?.entry ?? [];
  const entryList = Array.isArray(entries) ? entries : entries ? [entries] : [];

  if (entryList.length === 0) {
    return `No amendments found affecting ${type}/${year}/${number}.\n\nThis may mean the legislation has not been amended, or amendments data is not yet available in the changes feed.`;
  }

  const lines: string[] = [
    `# Amendments Affecting ${type.toUpperCase()} ${year}/${number}`,
    "",
    `Found ${entryList.length} amendment(s):`,
    "",
  ];

  for (const entry of entryList.slice(0, 30)) {
    const title = cleanText(extractText(entry?.title ?? ""));
    const updated = extractText(entry?.updated ?? "");
    const content = cleanText(extractText(entry?.content ?? ""));

    // Extract affected provision and affecting legislation from UKLA-specific elements
    const affectingTitle = extractText(
      findNodes(entry, "AffectingTitle")?.[0] ??
        findNodes(entry, "affectingTitle")?.[0] ??
        "",
    );
    const affectedProvision = extractText(
      findNodes(entry, "AffectedProvisions")?.[0] ??
        findNodes(entry, "affectedProvisions")?.[0] ??
        "",
    );
    const effectType = extractText(
      findNodes(entry, "TypeOfEffect")?.[0] ??
        findNodes(entry, "typeOfEffect")?.[0] ??
        "",
    );

    lines.push(`### ${title || "Amendment"}`);
    if (affectingTitle) lines.push(`- **Amending instrument:** ${affectingTitle}`);
    if (affectedProvision) lines.push(`- **Affected provision:** ${affectedProvision}`);
    if (effectType) lines.push(`- **Effect type:** ${effectType}`);
    if (updated) lines.push(`- **Date:** ${updated}`);
    if (content && content !== title) lines.push(`- **Details:** ${truncate(content, 300)}`);
    lines.push("");
  }

  if (entryList.length > 30) {
    lines.push(`*...and ${entryList.length - 30} more amendments.*`);
  }

  return lines.join("\n");
}

async function getExtent(
  type: LegislationType,
  year: number,
  number: number,
): Promise<string> {
  const url = `${BASE_URL}/${type}/${year}/${number}/data.xml`;
  const xml = await fetchXml(url);
  const parsed = xmlParser.parse(xml);

  const extentMap: Record<string, string[]> = {};

  // Check top-level extent
  const legNode = parsed?.Legislation;
  if (legNode && typeof legNode === "object" && "@_RestrictExtent" in legNode) {
    extentMap["Whole Act"] = [String(legNode["@_RestrictExtent"])];
  }

  // Walk the tree for RestrictExtent attributes on provisions
  function collectExtents(node: unknown, path: string): void {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach((item, i) => collectExtents(item, `${path}[${i}]`));
      return;
    }
    const rec = node as Record<string, unknown>;
    const extent = rec["@_RestrictExtent"];
    const id = rec["@_id"] ?? rec["@_IdURI"] ?? "";
    const title = rec["Title"] ? cleanText(extractText(rec["Title"])) : "";

    if (extent) {
      const label = title || String(id) || path;
      if (!extentMap[label]) extentMap[label] = [];
      const extStr = String(extent);
      if (!extentMap[label].includes(extStr)) {
        extentMap[label].push(extStr);
      }
    }

    for (const [key, value] of Object.entries(rec)) {
      if (key.startsWith("@_")) continue;
      if (typeof value === "object" && value !== null) {
        collectExtents(value, `${path}.${key}`);
      }
    }
  }

  collectExtents(parsed, "root");

  // Decode extent abbreviations
  const extentLabels: Record<string, string> = {
    "E+W+S+N.I.": "England, Wales, Scotland, Northern Ireland (UK-wide)",
    "E+W+S": "England, Wales, Scotland (Great Britain)",
    "E+W": "England and Wales",
    E: "England only",
    W: "Wales only",
    S: "Scotland only",
    "N.I.": "Northern Ireland only",
    "E+W+N.I.": "England, Wales, Northern Ireland",
    "E+S": "England and Scotland",
    "W+S": "Wales and Scotland",
  };

  const lines: string[] = [
    `# Territorial Extent: ${type.toUpperCase()} ${year}/${number}`,
    "",
  ];

  if (Object.keys(extentMap).length === 0) {
    lines.push(
      "No explicit territorial extent markers found in the legislation XML.",
      "",
      "This may mean the Act applies UK-wide by default, or extent information",
      "is encoded differently for this particular legislation.",
    );
  } else {
    // Show whole-act extent first
    if (extentMap["Whole Act"]) {
      const codes = extentMap["Whole Act"];
      lines.push("## Overall Extent", "");
      for (const code of codes) {
        lines.push(`- **${code}** - ${extentLabels[code] ?? "See legislation for details"}`);
      }
      lines.push("");
      delete extentMap["Whole Act"];
    }

    // Show per-provision extents (summarised)
    const uniqueExtents = new Map<string, string[]>();
    for (const [label, codes] of Object.entries(extentMap)) {
      const key = codes.sort().join(", ");
      if (!uniqueExtents.has(key)) uniqueExtents.set(key, []);
      uniqueExtents.get(key)!.push(label);
    }

    if (uniqueExtents.size > 0) {
      lines.push("## Provision-level Extents", "");
      for (const [extent, labels] of uniqueExtents) {
        const decoded = extentLabels[extent] ?? extent;
        lines.push(`### ${extent} (${decoded})`);
        const displayLabels = labels.slice(0, 15);
        for (const label of displayLabels) {
          lines.push(`- ${label}`);
        }
        if (labels.length > 15) {
          lines.push(`- *...and ${labels.length - 15} more provisions*`);
        }
        lines.push("");
      }
    }
  }

  // Extent legend
  lines.push(
    "## Extent Code Reference",
    "",
    "| Code | Jurisdiction |",
    "|------|-------------|",
  );
  for (const [code, label] of Object.entries(extentLabels)) {
    lines.push(`| ${code} | ${label} |`);
  }

  return lines.join("\n");
}

async function checkInForce(
  type: LegislationType,
  year: number,
  number: number,
  section?: string,
): Promise<string> {
  // If section is provided, fetch just that section; otherwise fetch whole Act
  const url = section
    ? `${BASE_URL}/${type}/${year}/${number}/section/${section}/data.xml`
    : `${BASE_URL}/${type}/${year}/${number}/data.xml`;

  const xml = await fetchXml(url);
  const parsed = xmlParser.parse(xml);

  const statusInfo: {
    status: string;
    startDate: string;
    endDate: string;
    provisions: string[];
  }[] = [];

  function collectStatus(node: unknown, label: string): void {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach((item, i) => collectStatus(item, `${label}[${i}]`));
      return;
    }
    const rec = node as Record<string, unknown>;
    const startDate = rec["@_RestrictStartDate"];
    const endDate = rec["@_RestrictEndDate"];
    const status = rec["@_Status"];
    const match = rec["@_Match"];
    const id = rec["@_id"] ?? rec["@_IdURI"] ?? "";
    const title = rec["Title"] ? cleanText(extractText(rec["Title"])) : "";

    if (startDate || endDate || status || match) {
      const provLabel = title || String(id) || label;
      statusInfo.push({
        status: String(status ?? match ?? ""),
        startDate: String(startDate ?? ""),
        endDate: String(endDate ?? ""),
        provisions: [provLabel],
      });
    }

    for (const [key, value] of Object.entries(rec)) {
      if (key.startsWith("@_")) continue;
      if (typeof value === "object" && value !== null) {
        collectStatus(value, `${label}.${key}`);
      }
    }
  }

  collectStatus(parsed, "root");

  // Check commencement orders in metadata
  const commencementOrders = findNodes(parsed, "CommencementOrder");
  const ukCommencements = findNodes(parsed, "UnappliedEffect");

  const lines: string[] = [
    `# In-Force Status: ${type.toUpperCase()} ${year}/${number}${section ? ` Section ${section}` : ""}`,
    "",
  ];

  if (statusInfo.length === 0 && commencementOrders.length === 0) {
    lines.push(
      "No explicit commencement or status attributes found in the XML.",
      "",
      "**Interpretation:**",
      "- Most Acts that received Royal Assent come into force on the date specified",
      "  in the commencement section (usually the last section of the Act).",
      "- If no RestrictStartDate is set, the legislation may be fully in force,",
      "  or commencement information may not yet be reflected in the XML.",
      "",
      "**Recommendation:** Check the commencement section of the Act itself,",
      "or search for related Commencement Orders (Statutory Instruments).",
    );
  } else {
    // Summarise status
    const inForce: string[] = [];
    const notInForce: string[] = [];
    const prospective: string[] = [];
    const repealed: string[] = [];

    for (const info of statusInfo) {
      const s = info.status.toLowerCase();
      const label = `${info.provisions[0]}${info.startDate ? ` (from ${info.startDate})` : ""}${info.endDate ? ` (until ${info.endDate})` : ""}`;

      if (s.includes("repeal")) {
        repealed.push(label);
      } else if (s.includes("prospective") || s === "prospective") {
        prospective.push(label);
      } else if (info.startDate && new Date(info.startDate) <= new Date()) {
        inForce.push(label);
      } else if (info.startDate && new Date(info.startDate) > new Date()) {
        notInForce.push(label);
      } else {
        inForce.push(label);
      }
    }

    if (inForce.length > 0) {
      lines.push("## In Force", "");
      for (const item of inForce.slice(0, 20)) {
        lines.push(`- ${item}`);
      }
      if (inForce.length > 20) lines.push(`- *...and ${inForce.length - 20} more*`);
      lines.push("");
    }

    if (notInForce.length > 0) {
      lines.push("## Not Yet In Force", "");
      for (const item of notInForce.slice(0, 20)) {
        lines.push(`- ${item}`);
      }
      if (notInForce.length > 20) lines.push(`- *...and ${notInForce.length - 20} more*`);
      lines.push("");
    }

    if (prospective.length > 0) {
      lines.push("## Prospective", "");
      for (const item of prospective.slice(0, 20)) {
        lines.push(`- ${item}`);
      }
      lines.push("");
    }

    if (repealed.length > 0) {
      lines.push("## Repealed", "");
      for (const item of repealed.slice(0, 20)) {
        lines.push(`- ${item}`);
      }
      lines.push("");
    }
  }

  if (commencementOrders.length > 0) {
    lines.push("## Commencement Orders Referenced", "");
    for (const order of commencementOrders.slice(0, 10)) {
      lines.push(`- ${cleanText(extractText(order))}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// MCP Server setup
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "uk-legislation",
  version: "1.0.0",
});

// Tool 1: lookup_statute
server.tool(
  "lookup_statute",
  "Get metadata and full text of a specific UK Act or Statutory Instrument from legislation.gov.uk",
  {
    type: z
      .enum(LEGISLATION_TYPES)
      .describe(
        "Legislation type: ukpga (Public General Acts), uksi (Statutory Instruments), asp (Scottish Acts), nia (NI Acts), etc.",
      ),
    year: z.number().int().min(1200).max(2100).describe("Year of the legislation"),
    number: z.number().int().min(1).describe("Number of the legislation within that year"),
  },
  async ({ type, year, number }) => {
    try {
      const result = await lookupStatute(type, year, number);
      return { content: [{ type: "text" as const, text: result }] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
    }
  },
);

// Tool 2: lookup_section
server.tool(
  "lookup_section",
  "Get a specific section of a UK Act, including text and amendment notes",
  {
    type: z.enum(LEGISLATION_TYPES).describe("Legislation type (e.g. ukpga, uksi)"),
    year: z.number().int().min(1200).max(2100).describe("Year of the legislation"),
    number: z.number().int().min(1).describe("Number of the legislation"),
    section: z
      .string()
      .describe(
        "Section number or identifier (e.g. '1', '2', '10A')",
      ),
  },
  async ({ type, year, number, section }) => {
    try {
      const result = await lookupSection(type, year, number, section);
      return { content: [{ type: "text" as const, text: result }] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
    }
  },
);

// Tool 3: search_legislation
server.tool(
  "search_legislation",
  "Search UK legislation by title keywords, optionally filtered by type and year",
  {
    title: z.string().describe("Search keywords for the legislation title"),
    type: z
      .enum(LEGISLATION_TYPES)
      .optional()
      .describe("Optional: filter by legislation type"),
    year: z.number().int().optional().describe("Optional: filter by year"),
  },
  async ({ title, type, year }) => {
    try {
      const result = await searchLegislation(title, type, year);
      return { content: [{ type: "text" as const, text: result }] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
    }
  },
);

// Tool 4: check_amendments
server.tool(
  "check_amendments",
  "Get amendments affecting a specific UK statute from the changes feed",
  {
    type: z.enum(LEGISLATION_TYPES).describe("Legislation type"),
    year: z.number().int().min(1200).max(2100).describe("Year"),
    number: z.number().int().min(1).describe("Number"),
  },
  async ({ type, year, number }) => {
    try {
      const result = await checkAmendments(type, year, number);
      return { content: [{ type: "text" as const, text: result }] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
    }
  },
);

// Tool 5: get_extent
server.tool(
  "get_extent",
  "Check the territorial extent of UK legislation (which jurisdictions it applies to: E+W, S, NI)",
  {
    type: z.enum(LEGISLATION_TYPES).describe("Legislation type"),
    year: z.number().int().min(1200).max(2100).describe("Year"),
    number: z.number().int().min(1).describe("Number"),
  },
  async ({ type, year, number }) => {
    try {
      const result = await getExtent(type, year, number);
      return { content: [{ type: "text" as const, text: result }] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
    }
  },
);

// Tool 6: check_in_force
server.tool(
  "check_in_force",
  "Check if a UK statute or specific provision is currently in force, with commencement dates",
  {
    type: z.enum(LEGISLATION_TYPES).describe("Legislation type"),
    year: z.number().int().min(1200).max(2100).describe("Year"),
    number: z.number().int().min(1).describe("Number"),
    section: z
      .string()
      .optional()
      .describe("Optional: specific section number to check"),
  },
  async ({ type, year, number, section }) => {
    try {
      const result = await checkInForce(type, year, number, section);
      return { content: [{ type: "text" as const, text: result }] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
    }
  },
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  log("Starting UK Legislation MCP server...");
  await server.connect(transport);
  log("Server connected and ready.");
}

main().catch((err) => {
  log(`Fatal error: ${err}`);
  process.exit(1);
});
