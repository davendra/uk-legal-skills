export interface CaselawSearchResult {
  name: string;
  uri: string;
  date: string;
  neutralCitation: string;
  court: string;
}

export interface JudgmentDetail {
  title: string;
  neutralCitation: string;
  court: string;
  date: string;
  judges: string[];
  parties: string[];
  body: string;
}

const MAX_TEXT_LENGTH = 5000;

/** Recursively join every text value under an XML node, skipping attributes. */
export function extractText(node: unknown): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number" || typeof node === "boolean") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (typeof node === "object") {
    const parts: string[] = [];
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
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

/** Find the first URI component after caselaw.nationalarchives.gov.uk in a link. */
function uriFromLink(link: string): string {
  const m = link.match(/caselaw\.nationalarchives\.gov\.uk\/(?:id\/)?(.+?)(?:\/data\.xml)?$/);
  return m?.[1]?.replace(/\/$/, "") ?? "";
}

/** Extract neutral citation from a summary or free text (e.g., "[2024] EWCA Civ 123"). */
function extractNeutralCitation(text: string): string {
  const m = text.match(/\[\d{4}\]\s+[A-Z][A-Za-z]+(?:\s+[A-Za-z]+)*\s+\d+/);
  return m?.[0] ?? "";
}

export function parseAtomEntries(parsed: Record<string, any>): CaselawSearchResult[] {
  const entries = parsed?.feed?.entry ?? [];
  const list = Array.isArray(entries) ? entries : entries ? [entries] : [];
  return list.map((entry: Record<string, any>): CaselawSearchResult => {
    const rawTitle = cleanText(extractText(entry?.title ?? ""));
    const linkAttr =
      typeof entry?.link === "object" && !Array.isArray(entry.link)
        ? entry.link?.["@_href"] ?? ""
        : Array.isArray(entry.link)
          ? entry.link[0]?.["@_href"] ?? ""
          : "";
    const idRaw = extractText(entry?.id ?? "");
    // Prefer link.href (public URL like "ewhc/kb/2026/897") over id ("d-<uuid>" internal doc ID)
    const uri = uriFromLink(String(linkAttr || idRaw));
    const summary = cleanText(extractText(entry?.summary ?? ""));
    const neutralCitation = extractNeutralCitation(rawTitle) || extractNeutralCitation(summary);
    return {
      name: rawTitle || "Untitled judgment",
      uri,
      date: extractText(entry?.updated ?? ""),
      neutralCitation,
      court: "",
    };
  });
}

export function parseJudgment(parsed: Record<string, any>): JudgmentDetail {
  const judgment = parsed?.akomaNtoso?.judgment ?? parsed?.judgment ?? parsed ?? {};

  // FRBRdate
  const frbr = judgment?.meta?.identification?.FRBRWork?.FRBRdate;
  const date = frbr?.["@_date"] ?? "";

  const headerText = cleanText(extractText(judgment?.header ?? ""));
  const judges: string[] = [];
  const judgeMatch = headerText.match(/Before\s+(.+?)(?:\s+Between|$)/i);
  if (judgeMatch) {
    judges.push(...judgeMatch[1].split(/\s+and\s+|,\s*/).map((s) => s.trim()).filter(Boolean));
  }

  const parties: string[] = [];
  const partyMatch = headerText.match(/Between[:\s]+(.+?)(?:\s+and\s+)(.+)$/i);
  if (partyMatch) {
    parties.push(cleanText(partyMatch[1]), cleanText(partyMatch[2]));
  }

  const body = truncate(cleanText(extractText(judgment?.judgmentBody ?? "")));

  const title =
    cleanText(extractText(judgment?.meta?.identification?.FRBRWork?.FRBRalias)) ||
    (parties.length >= 2 ? `${parties[0]} v ${parties[1]}` : "Judgment");

  return {
    title,
    neutralCitation: extractNeutralCitation(title + " " + headerText),
    court: cleanText(extractText(judgment?.header?.p ?? "")).split("\n")[0] ?? "",
    date,
    judges,
    parties,
    body,
  };
}

/** Convert a judgment URI into a safe filename for downloads. */
export function uriToFilename(uri: string): string {
  const cleaned = uri
    .replace(/\.\./g, "")
    .replace(/^[/\\]+|[/\\]+$/g, "")
    .replace(/[^a-zA-Z0-9._/-]/g, "")
    .replace(/[/\\]/g, "-");
  return cleaned.endsWith(".pdf") ? cleaned : `${cleaned}.pdf`;
}

/** De-duplicate search results by URI, preserving first occurrence. */
export function dedupeByUri<T extends { uri: string }>(results: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const r of results) {
    if (r.uri && !seen.has(r.uri)) {
      seen.add(r.uri);
      out.push(r);
    }
  }
  return out;
}
