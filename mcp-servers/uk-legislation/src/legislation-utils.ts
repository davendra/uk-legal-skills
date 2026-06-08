const MAX_TEXT_LENGTH = 5000;

/** Recursively extract text content from parsed XML nodes. */
export function extractText(node: unknown): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number" || typeof node === "boolean") return String(node);

  if (Array.isArray(node)) {
    return node.map(extractText).join(" ");
  }

  if (typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const parts: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith("@_")) continue;
      parts.push(extractText(value));
    }
    return parts.join(" ");
  }

  return "";
}

export function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function truncate(text: string, max: number = MAX_TEXT_LENGTH): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + "\n\n...truncated (full text exceeds limit)";
}

/** Walk an object tree and collect all nodes whose key matches `name`. */
export function findNodes(obj: unknown, name: string): unknown[] {
  const results: unknown[] = [];

  function walk(node: unknown): void {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    const rec = node as Record<string, unknown>;
    for (const [key, value] of Object.entries(rec)) {
      if (key === name) {
        results.push(value);
      }
      if (typeof value === "object" && value !== null) {
        walk(value);
      }
    }
  }

  walk(obj);
  return results;
}

export interface ParsedSearchResult {
  title: string;
  link: string;
  updated: string;
  uri: string;
  type: string;
  year: number;
  number: number;
}

export function parseSearchResults(parsed: Record<string, any>): ParsedSearchResult[] {
  const entries = parsed?.feed?.entry ?? parsed?.searchresults?.entry ?? [];
  const entryList = Array.isArray(entries) ? entries : entries ? [entries] : [];

  return entryList.map((entry: Record<string, any>) => {
    const title = cleanText(extractText(entry?.title ?? "")) || "Untitled";
    const link =
      typeof entry?.link === "object" && !Array.isArray(entry.link)
        ? entry.link?.["@_href"] ?? ""
        : Array.isArray(entry.link)
          ? entry.link[0]?.["@_href"] ?? ""
          : "";
    const updated = extractText(entry?.updated ?? "");
    const uri = extractText(entry?.id ?? "") || String(link);
    const uriMatch = String(uri || link).match(
      /legislation\.gov\.uk\/(?:id\/)?(\w+)\/(\d{4})\/(\d+)/,
    );

    return {
      title,
      link: String(link),
      updated,
      uri: String(uri),
      type: uriMatch?.[1] ?? "",
      year: uriMatch ? parseInt(uriMatch[2], 10) : 0,
      number: uriMatch ? parseInt(uriMatch[3], 10) : 0,
    };
  });
}
