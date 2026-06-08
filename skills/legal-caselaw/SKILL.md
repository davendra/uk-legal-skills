# Find Case Law — /legal caselaw

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


Search, retrieve, and summarise UK case law from caselaw.nationalarchives.gov.uk (63,000+ judgments, Open Justice Licence, free commercial reuse). Backed by the `caselaw` MCP server registered in `.mcp.json`.

## Disclaimer

Always start your response with this disclaimer:

```
⚠️ LEGAL DISCLAIMER: Case law results are AI-retrieved from Find Case Law
(National Archives, Open Justice Licence). This is not legal advice. Always
verify citations and consult a qualified solicitor before relying on any case
for a legal matter. England & Wales jurisdiction only.
```

## Invocation

Positional arg is either a search query (default) or a judgment URI when a per-judgment flag is present.

```
/legal caselaw <query>                             # free text search
/legal caselaw --court ewca <query>                # filter by court code
/legal caselaw --party "Polkey"                    # search by party
/legal caselaw --judge "Lord Hoffmann"             # search by judge
/legal caselaw --statute ukpga/1996/18 --section 94  # cases citing a section
/legal caselaw --recent                            # latest judgments
/legal caselaw --recent --court uksc               # latest from specified court
/legal caselaw --lookup <uri>                      # full judgment metadata + body
/legal caselaw --download <uri>                    # download PDF to cwd
/legal caselaw --summarise <uri>                   # AI summary (needs Anthropic key)
/legal caselaw --summarise <uri> --format detailed # summary style: brief | detailed | plain-english
```

## Tool Dispatch Priority

When multiple flags are present, use this priority to pick a single tool:

1. `--download` → call `download_judgment_pdf(uri, output_path?)`
2. `--summarise` → call `summarise_judgment(uri, style?, apiKey)`
3. `--lookup` → call `lookup_judgment(uri)`
4. `--statute` and `--section` → call `get_judgments_for_section(legislation_id, section_number)`
5. `--recent` → call `get_recent_judgments(court?, limit?)`
6. `--party` (with or without query) → call `search_by_party(party_name, court?, limit?)`
7. `--judge` → call `search_by_judge(judge_name, court?, limit?)`
8. Default (positional query) → call `search_caselaw(query, court?, limit?)`

## Common Court Codes

```
uksc    UK Supreme Court
ewca    Court of Appeal (England and Wales)
ewhc    High Court (England and Wales)
ukftt   First-tier Tribunal
ukut    Upper Tribunal
ukeat   Employment Appeal Tribunal
ukpc    Privy Council
ewfc    Family Court

Sub-courts: ewca/civ, ewca/crim, ewhc/pat, ewhc/ch, ewhc/fam, ewhc/kb, ewhc/admin
```

## Output Format

After the disclaimer, render the MCP tool's text output verbatim. The tools already return markdown.

## Requiring a Model Provider Key

For `--summarise`, use the current host's configured model provider. If the MCP/tool implementation requires an API key and the user has not provided one in the session, ask for the relevant provider key. Store the key in memory for this conversation only — do NOT write it to disk. Pass it to `summarise_judgment` as the `apiKey` parameter only when that tool requires it.
