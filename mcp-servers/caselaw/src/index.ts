#!/usr/bin/env node
/**
 * UK Find Case Law MCP Server
 * caselaw.nationalarchives.gov.uk — Open Justice Licence
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import {
  parseAtomEntries,
  parseJudgment,
  dedupeByUri,
  uriToFilename,
  type CaselawSearchResult,
} from "./caselaw-utils.js";

const BASE_URL = "https://caselaw.nationalarchives.gov.uk";
const SEARCH_TTL_MS = 60 * 60 * 1000; // 1 hour
const LOOKUP_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SUMMARY_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const CACHE_MAX_ENTRIES = 500;
const FETCH_TIMEOUT_MS = 30_000;

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
  parseAttributeValue: false,
  removeNSPrefix: true,
});

interface CacheEntry {
  data: string;
  timestamp: number;
  ttl: number;
}
const cache = new Map<string, CacheEntry>();

function cacheGet(key: string): string | null {
  const e = cache.get(key);
  if (!e) return null;
  if (Date.now() - e.timestamp > e.ttl) {
    cache.delete(key);
    return null;
  }
  return e.data;
}

function cacheSet(key: string, data: string, ttl: number): void {
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
  cache.set(key, { data, timestamp: Date.now(), ttl });
}

function log(msg: string): void {
  process.stderr.write(`[caselaw] ${msg}\n`);
}

async function fetchText(url: string, ttl: number): Promise<string> {
  const cached = cacheGet(url);
  if (cached) {
    log(`Cache hit: ${url}`);
    return cached;
  }
  log(`Fetch: ${url}`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Accept: "application/xml, application/atom+xml, */*",
        "User-Agent": "uk-legal-skills-caselaw-mcp/1.0",
      },
      redirect: "follow",
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Timeout fetching ${url}`);
    }
    throw err;
  }
  clearTimeout(timeout);
  if (res.status === 404) throw new Error(`Not found: ${url}`);
  if (res.status === 429) throw new Error(`Rate limited (429) — try again in 5 minutes`);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const text = await res.text();
  cacheSet(url, text, ttl);
  return text;
}

async function searchAtom(params: Record<string, string | number | undefined>): Promise<CaselawSearchResult[]> {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" && v !== null) qs.set(k, String(v));
  }
  const url = `${BASE_URL}/atom.xml?${qs.toString()}`;
  const xml = await fetchText(url, SEARCH_TTL_MS);
  const parsed = xmlParser.parse(xml);
  return parseAtomEntries(parsed);
}

/** Fetch a statute title from legislation.gov.uk (cached). */
async function fetchLegislationTitle(legislationId: string): Promise<string> {
  // legislationId is like "ukpga/1996/18"
  const url = `https://www.legislation.gov.uk/${legislationId}/data.xml`;
  try {
    const xml = await fetchText(url, LOOKUP_TTL_MS);
    const parsed = xmlParser.parse(xml);
    const m = parsed?.Legislation?.Metadata ?? parsed?.Legislation?.ukm?.Metadata ?? {};
    const titleRaw =
      m?.Title ?? m?.["dc:title"] ?? m?.title ?? parsed?.Legislation?.Title ?? "";
    const title =
      typeof titleRaw === "object"
        ? String((titleRaw as Record<string, unknown>)["#text"] ?? "")
        : String(titleRaw);
    return title.trim();
  } catch {
    return "";
  }
}

/** Derive a short name (e.g. "Employment Rights Act 1996" → "ERA 1996"). */
function shortenActName(title: string): string {
  const yearMatch = title.match(/\b(\d{4})\b/);
  const year = yearMatch?.[1] ?? "";
  const words = title.replace(/\b\d{4}\b/, "").trim();
  const acronym = words
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w) && !/^(Act|of|the|and|for|to)$/i.test(w))
    .map((w) => w[0])
    .join("");
  return acronym && year ? `${acronym} ${year}` : title;
}

const SUMMARY_PROMPTS: Record<string, string> = {
  brief: "Summarise this UK court judgment in 3-4 sentences. Focus on: the holding, and the one-line reason. Do not give legal advice.",
  detailed:
    "Summarise this UK court judgment in 300-500 words. Cover: holding, ratio decidendi, key facts, procedural history. Cite paragraph numbers when relevant. Do not give legal advice.",
  "plain-english":
    "Explain this UK court judgment in plain English for a non-lawyer. What happened, what the court decided, and why it matters day-to-day. Avoid legal jargon where possible; when you must use it, define the term. Do not give legal advice.",
};

function formatResultsMarkdown(label: string, results: CaselawSearchResult[]): string {
  if (results.length === 0) return `No results for ${label}.`;
  const lines: string[] = [`# ${label}`, "", `Found ${results.length} judgment(s):`, ""];
  for (const r of results) {
    lines.push(`### ${r.name}`);
    if (r.neutralCitation) lines.push(`- **Citation:** ${r.neutralCitation}`);
    if (r.date) lines.push(`- **Updated:** ${r.date}`);
    lines.push(`- **URI:** ${r.uri}`);
    lines.push("");
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// MCP server
// ---------------------------------------------------------------------------

const server = new McpServer({ name: "caselaw", version: "1.0.0" });

// Tool 1: search_caselaw
server.tool(
  "search_caselaw",
  "Search UK Find Case Law for judgments by free-text query. Court codes include uksc, ewca, ewhc, ewhc/pat, ukeat, ukut, ukftt, etc.",
  {
    query: z.string().describe("Free-text search query"),
    court: z.string().optional().describe("Court code to filter by (e.g. 'ewca', 'uksc', 'ewhc/pat')"),
    limit: z.number().int().min(1).max(50).optional().default(20).describe("Max results"),
  },
  async ({ query, court, limit }) => {
    try {
      const results = await searchAtom({ query, court, per_page: limit });
      return { content: [{ type: "text" as const, text: formatResultsMarkdown(`Search results for "${query}"`, results) }] };
    } catch (err) {
      return { content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }], isError: true };
    }
  },
);

// Tool 4: get_recent_judgments
server.tool(
  "get_recent_judgments",
  "Get the most recently published judgments, optionally filtered by court.",
  {
    court: z.string().optional().describe("Court code"),
    limit: z.number().int().min(1).max(50).optional().default(20),
  },
  async ({ court, limit }) => {
    try {
      const results = await searchAtom({ court, order: "-date", per_page: limit });
      const label = court ? `Recent judgments — ${court}` : `Recent judgments`;
      return { content: [{ type: "text" as const, text: formatResultsMarkdown(label, results) }] };
    } catch (err) {
      return { content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }], isError: true };
    }
  },
);

// Tool 5: search_by_party
server.tool(
  "search_by_party",
  "Search for judgments involving a named party (claimant or defendant).",
  {
    party_name: z.string().describe("Name of the party"),
    court: z.string().optional(),
    limit: z.number().int().min(1).max(50).optional().default(20),
  },
  async ({ party_name, court, limit }) => {
    try {
      const results = await searchAtom({ party: party_name, court, per_page: limit });
      return { content: [{ type: "text" as const, text: formatResultsMarkdown(`Judgments involving "${party_name}"`, results) }] };
    } catch (err) {
      return { content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }], isError: true };
    }
  },
);

// Tool 6: search_by_judge
server.tool(
  "search_by_judge",
  "Search for judgments decided by a named judge.",
  {
    judge_name: z.string().describe("Name of the judge"),
    court: z.string().optional(),
    limit: z.number().int().min(1).max(50).optional().default(20),
  },
  async ({ judge_name, court, limit }) => {
    try {
      const results = await searchAtom({ judge: judge_name, court, per_page: limit });
      return { content: [{ type: "text" as const, text: formatResultsMarkdown(`Judgments by "${judge_name}"`, results) }] };
    } catch (err) {
      return { content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }], isError: true };
    }
  },
);

// Placeholder tools (filled in later tasks) — registered so the server starts with all 9 tools visible.
server.tool(
  "lookup_judgment",
  "Get full metadata and body text for a specific judgment by its URI (e.g. 'uksc/2024/42').",
  { uri: z.string().describe("Judgment URI, e.g. 'uksc/2024/42' or 'tna.t7sh6v3m'") },
  async ({ uri }) => {
    try {
      const cleanUri = uri.replace(/^\/+|\/+$/g, "");
      const xml = await fetchText(`${BASE_URL}/${cleanUri}/data.xml`, LOOKUP_TTL_MS);
      const parsed = xmlParser.parse(xml);
      const j = parseJudgment(parsed);

      const lines: string[] = [
        `# ${j.title}`,
        "",
        j.neutralCitation ? `- **Citation:** ${j.neutralCitation}` : "",
        j.court ? `- **Court:** ${j.court}` : "",
        j.date ? `- **Date:** ${j.date}` : "",
        j.judges.length ? `- **Judges:** ${j.judges.join(", ")}` : "",
        j.parties.length ? `- **Parties:** ${j.parties.join(" v ")}` : "",
        `- **URI:** ${cleanUri}`,
        "",
        "## Body",
        "",
        j.body || "(No body text extracted — document may be PDF-only)",
      ].filter(Boolean);

      return { content: [{ type: "text" as const, text: lines.join("\n") }] };
    } catch (err) {
      return { content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }], isError: true };
    }
  },
);
server.tool(
  "get_judgments_for_section",
  "Find judgments that cite a specific statute section. Uses multi-strategy search: full Act title + short name, deduplicated.",
  {
    legislation_id: z.string().describe("Legislation ID, e.g. 'ukpga/1996/18'"),
    section_number: z.string().describe("Section number, e.g. '94' or '10A'"),
  },
  async ({ legislation_id, section_number }) => {
    try {
      const title = await fetchLegislationTitle(legislation_id);
      const queries: string[] = [];
      if (title) queries.push(`"${title}" section ${section_number}`);
      const short = title ? shortenActName(title) : "";
      if (short && short !== title) queries.push(`"${short}" s.${section_number}`);
      if (queries.length === 0) {
        queries.push(`${legislation_id} section ${section_number}`);
      }

      const all: CaselawSearchResult[] = [];
      for (const q of queries) {
        try {
          const part = await searchAtom({ query: q, per_page: 20 });
          all.push(...part);
        } catch (err) {
          log(`strategy failed for "${q}": ${err instanceof Error ? err.message : err}`);
        }
      }

      const deduped = dedupeByUri(all).slice(0, 20);
      const label = title
        ? `Judgments citing ${title} section ${section_number}`
        : `Judgments citing ${legislation_id} section ${section_number}`;
      return { content: [{ type: "text" as const, text: formatResultsMarkdown(label, deduped) }] };
    } catch (err) {
      return { content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }], isError: true };
    }
  },
);
server.tool(
  "download_judgment_pdf",
  "Download a judgment PDF to disk. Returns the local file path.",
  {
    uri: z.string().describe("Judgment URI, e.g. 'uksc/2024/42'"),
    output_path: z.string().optional().describe("Optional absolute or relative file path. Defaults to ./{uri-slug}.pdf in cwd."),
  },
  async ({ uri, output_path }) => {
    try {
      const cleanUri = uri.replace(/^\/+|\/+$/g, "");
      const url = `${BASE_URL}/${cleanUri}/data.pdf`;

      const res = await fetch(url, {
        headers: { "User-Agent": "uk-legal-skills-caselaw-mcp/1.0" },
        redirect: "follow",
      });
      if (res.status === 404) throw new Error(`PDF not available for ${cleanUri}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);

      const buffer = Buffer.from(await res.arrayBuffer());
      const filename = output_path ?? path.join(process.cwd(), uriToFilename(cleanUri));
      const absPath = path.resolve(filename);
      await mkdir(path.dirname(absPath), { recursive: true });
      await writeFile(absPath, buffer);

      return {
        content: [
          {
            type: "text" as const,
            text: `Downloaded ${buffer.length} bytes to ${absPath}`,
          },
        ],
      };
    } catch (err) {
      return { content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }], isError: true };
    }
  },
);
// ---------------------------------------------------------------------------
// MarkItDown integration — convert HTML/PDF judgments to structured markdown
// ---------------------------------------------------------------------------

async function markitdownConvert(filePath: string): Promise<string | null> {
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const execFileAsync = promisify(execFile);

  // Try venv python first, then system python
  const pythonPaths = [
    path.resolve(process.cwd(), ".venv/bin/python3"),
    "python3",
  ];

  for (const pythonPath of pythonPaths) {
    try {
      const script = `from markitdown import MarkItDown; import sys; md = MarkItDown(); r = md.convert(sys.argv[1]); print(r.text_content)`;
      const { stdout } = await execFileAsync(pythonPath, ["-c", script, filePath], {
        maxBuffer: 10 * 1024 * 1024,
        timeout: 30_000,
      });
      const text = stdout.trim();
      if (text.length > 10) return text;
    } catch {
      continue;
    }
  }
  return null;
}

async function fetchHtmlAsMarkdown(url: string): Promise<string | null> {
  const { writeFile: writeFileAsync, mkdtemp, rm } = await import("node:fs/promises");
  const os = await import("node:os");

  try {
    const res = await fetch(url, {
      headers: { Accept: "text/html", "User-Agent": "uk-legal-skills-caselaw-mcp/1.0" },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();

    const tmpDir = await mkdtemp(path.join(os.tmpdir(), "caselaw-md-"));
    const tmpFile = path.join(tmpDir, "judgment.html");
    await writeFileAsync(tmpFile, html);

    try {
      const md = await markitdownConvert(tmpFile);
      return md;
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  } catch {
    return null;
  }
}

async function convertPdfToMarkdown(pdfBuffer: Buffer, uri: string): Promise<string | null> {
  const { writeFile: writeFileAsync, mkdtemp, rm } = await import("node:fs/promises");
  const os = await import("node:os");

  try {
    const tmpDir = await mkdtemp(path.join(os.tmpdir(), "caselaw-pdf-"));
    const tmpFile = path.join(tmpDir, `${uriToFilename(uri)}`);
    await writeFileAsync(tmpFile, pdfBuffer);

    try {
      const md = await markitdownConvert(tmpFile);
      return md;
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  } catch {
    return null;
  }
}

server.tool(
  "extract_judgment_text",
  "Extract the body text of a judgment as structured Markdown. Tries XML first, then HTML via MarkItDown, then PDF via MarkItDown.",
  { uri: z.string() },
  async ({ uri }) => {
    const cleanUri = uri.replace(/^\/+|\/+$/g, "");

    // Strategy 1: XML (fastest)
    try {
      const xml = await fetchText(`${BASE_URL}/${cleanUri}/data.xml`, LOOKUP_TTL_MS);
      const parsed = xmlParser.parse(xml);
      const j = parseJudgment(parsed);
      if (j.body && j.body.length > 0) {
        return { content: [{ type: "text" as const, text: j.body }] };
      }
    } catch (err) {
      log(`XML not available for ${cleanUri}: ${err instanceof Error ? err.message : err}`);
    }

    // Strategy 2: HTML → MarkItDown (structured markdown with headings/paragraphs)
    try {
      const md = await fetchHtmlAsMarkdown(`${BASE_URL}/${cleanUri}`);
      if (md && md.length > 50) {
        log(`MarkItDown HTML extraction succeeded for ${cleanUri}: ${md.length} chars`);
        return { content: [{ type: "text" as const, text: md }] };
      }
    } catch (err) {
      log(`HTML MarkItDown failed for ${cleanUri}: ${err instanceof Error ? err.message : err}`);
    }

    // Strategy 3: PDF → MarkItDown
    try {
      const pdfUrl = `${BASE_URL}/${cleanUri}/data.pdf`;
      const res = await fetch(pdfUrl, {
        headers: { "User-Agent": "uk-legal-skills-caselaw-mcp/1.0" },
        redirect: "follow",
      });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        const md = await convertPdfToMarkdown(buffer, cleanUri);
        if (md && md.length > 50) {
          log(`MarkItDown PDF extraction succeeded for ${cleanUri}: ${md.length} chars`);
          return { content: [{ type: "text" as const, text: md }] };
        }
      }
    } catch (err) {
      log(`PDF MarkItDown failed for ${cleanUri}: ${err instanceof Error ? err.message : err}`);
    }

    return {
      content: [
        {
          type: "text" as const,
          text: `Could not extract text for ${cleanUri}. XML, HTML, and PDF strategies all failed. The judgment may not be available in machine-readable format.`,
        },
      ],
    };
  },
);
server.tool(
  "summarise_judgment",
  "Generate an AI summary of a judgment. Requires a user-supplied Anthropic API key. Styles: brief, detailed, plain-english.",
  {
    uri: z.string(),
    style: z.enum(["brief", "detailed", "plain-english"]).optional().default("brief"),
    apiKey: z.string().describe("Anthropic API key"),
  },
  async ({ uri, style, apiKey }) => {
    try {
      const cleanUri = uri.replace(/^\/+|\/+$/g, "");
      const keyHash = createHash("sha256").update(apiKey).digest("hex").slice(0, 16);
      const cacheKey = `summary:${cleanUri}:${style}:${keyHash}`;
      const cached = cacheGet(cacheKey);
      if (cached) return { content: [{ type: "text" as const, text: cached }] };

      // 1. Get the judgment body
      const xml = await fetchText(`${BASE_URL}/${cleanUri}/data.xml`, LOOKUP_TTL_MS);
      const parsed = xmlParser.parse(xml);
      const j = parseJudgment(parsed);
      if (!j.body) {
        return {
          content: [{ type: "text" as const, text: `No XML text available for ${cleanUri}; cannot summarise without first extracting PDF text.` }],
          isError: true,
        };
      }

      // 2. Summarise via Anthropic
      const client = new Anthropic({ apiKey });
      const msg = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: style === "detailed" ? 800 : 400,
        system: SUMMARY_PROMPTS[style] ?? SUMMARY_PROMPTS.brief,
        messages: [
          {
            role: "user",
            content: `Judgment title: ${j.title}\nCitation: ${j.neutralCitation}\nDate: ${j.date}\n\nJudgment body:\n\n${j.body}`,
          },
        ],
      });

      const text = msg.content
        .filter((c): c is Anthropic.TextBlock => c.type === "text")
        .map((c) => c.text)
        .join("\n")
        .trim();

      const output = `# Summary: ${j.title}\n*Style: ${style}*\n\n${text}`;
      cacheSet(cacheKey, output, SUMMARY_TTL_MS);
      return { content: [{ type: "text" as const, text: output }] };
    } catch (err) {
      return { content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }], isError: true };
    }
  },
);

// ---- Re-export helpers for later tasks ----
export { BASE_URL, fetchText, xmlParser, cacheSet, cacheGet, LOOKUP_TTL_MS, SUMMARY_TTL_MS, log };

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  log("Starting caselaw MCP server...");
  await server.connect(transport);
  log("Server connected.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    log(`Fatal: ${err}`);
    process.exit(1);
  });
}
