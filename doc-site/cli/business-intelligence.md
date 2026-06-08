# Business Intelligence

Most legal work is not a single document in isolation -- it is a matter that accumulates contracts, prior reviews, redlines, and deadlines over weeks. These commands sit one level up from clause analysis: they consolidate, benchmark, and report across everything in a matter so a partner, a board, or a client can see the whole picture at a glance.

Five commands. One is documented in full here -- `/legal matter-brief`, the state-of-the-matter consolidator. The other four already live under their natural home categories and are summarised below with links.

## /legal matter-brief

State-of-the-matter brief consolidating legal posture across every document, prior review, deadline, and outstanding redline for a single matter.

**Why use this?** A partner walks into a client call in fifteen minutes and needs the whole matter in one page -- where it sits, the dominant risk, what is blocking progress, and what to do next. This command does not re-analyse the contracts; it folds every prior `/legal review`, every open redline, and every deadline into one crisp, action-oriented briefing pack written in a senior associate's voice.

### Syntax

```bash
/legal matter-brief <matter>
```

The `<matter>` argument resolves three ways, so the same skill works whether you run it inside a hosted matter store or from a plain working directory:

| Input source | What you pass | How it resolves |
|--------------|---------------|-----------------|
| Matter id | A reference the host can look up | The host pre-loads a structured dossier (matter, documents, reviews, deadlines) and hands it to the skill |
| Matter dossier | Pasted text describing the matter, parties, documents, prior findings, and known deadlines | Parsed directly as the dossier |
| Folder path | A directory full of contracts and prior `/legal review` outputs | Each file is treated as a document; lightweight inline summarisation runs in place of consolidated review findings |

The skill is host-agnostic: it does not define how the data is fetched, only the shape of the dossier it consumes and the brief it produces. Any field it cannot find is marked `Unknown` rather than invented.

### What it consolidates

The brief is built in phases, each becoming a section of the final pack:

| Phase | What it produces |
|-------|------------------|
| **Phase 0 -- Escalation check** | Runs first. Scans for active litigation, regulator action, a personal-data breach affecting 100+ subjects, criminal-liability exposure, an imminent limitation period (under 30 days), director personal liability, or a whistleblowing disclosure |
| **Phase 1 -- Matter context** | Title, reference, type, stage, counterparty, effective date, key dates, governing law, open/closed status -- confirmed England and Wales |
| **Phase 2 -- Document inventory** | One row per document, sorted most-recent-first; documents referenced elsewhere but not provided are listed as `referenced -- not provided` so they can be chased |
| **Phase 3 -- Prior review consolidation** | Folds every prior deep-skill output into outstanding 🔴 HIGH risks, 🟡 MEDIUM risks, resolved/mitigated items, and negotiation status (on the table / counterparty agreed / unresolved) |
| **Phase 4 -- Deadlines and tickler** | Every deadline sorted soonest-first; inside 14 days is flagged URGENT, inside 30 days near-term, and past deadlines stay marked MISSED so nothing silently slips |
| **Phase 5 -- Recommended next move** | Partner-voice: where we are, three verb-led actions each with an owner and a date, and issues to escalate |

::: warning Escalation runs first
If the dossier contains any escalation trigger -- a claim form, a Part 36 offer, a regulator enquiry, an imminent limitation deadline, or a director-liability signal -- the brief prepends an **ESCALATE -- INSTRUCT A SOLICITOR NOW** banner above the standard disclaimer and names the specific trigger. AI consolidation is not a substitute for qualified advice on those signals.
:::

::: tip It consolidates, it does not re-review
The brief deduplicates findings across reviews and keeps the highest severity rating; it does not re-run clause analysis. If a document has no prior review, the brief says so plainly and recommends running [/legal review](/cli/contract-analysis) before the next partner check-in rather than guessing at risks.
:::

### Risk consolidation

Only 🔴 HIGH and 🟡 MEDIUM risks reach the partner's pack -- clause-level noise is deliberately left out. Each risk row carries its source document, the source review and date, a one-line "why it matters", and an owner.

| Bucket | What it holds |
|--------|---------------|
| 🔴 Outstanding HIGH | Live exposure across all documents, deduplicated, highest severity retained |
| 🟡 Outstanding MEDIUM | Important but not immediately irrecoverable issues |
| 🟢 Resolved or mitigated | Counter-drafted, waived, indemnified, or accepted by the client, with resolution date |
| Negotiation status | Item, our position, their position, status (agreed / rejected / open / parked) |

If the matter touches Scots, Northern Irish, or foreign law, that is surfaced as a HIGH risk and the brief continues on the England and Wales elements only.

### Use cases

| Scenario | What the brief gives you |
|----------|--------------------------|
| **Partner check-in** | A one-page state-of-play to walk into a supervision meeting without re-reading the file |
| **Client update** | Plain-English "where we are" and "what happens next", owners and dates attached |
| **Pre-meeting prep** | The dominant risk, the nearest deadline, and the unresolved items needing a decision, ready fifteen minutes out |

### Example

```bash
/legal matter-brief ./matters/project-aurora/
```

### Output

`MATTER-BRIEF-[matter-ref]-[YYYY-MM-DD].md`

The brief opens with the standard disclaimer (preceded by the escalation banner where triggered), then a matter header table, an executive summary written in editorial broadsheet voice, the document inventory, the risk consolidation tables, the negotiation status, the deadlines tickler, and the load-bearing Recommended Next Move -- one paragraph on where the matter sits and three dated, owned actions. The brief is a living document: each run replaces the previous one.

---

## The rest of the suite

The other four Business Intelligence commands are documented in full under their natural home categories. Short summaries and links below.

### /legal benchmark

Compares every contract clause against England and Wales market-standard positions -- 80+ clause benchmarks across 14 contract types, with a favourability assessment per clause. Use it to answer "is this term normal, or is the counterparty pushing?" before you negotiate.

→ Full walkthrough: [/legal benchmark](/cli/contract-analysis#legal-benchmark)

### /legal due-diligence

M&A due-diligence gap analysis: a 60-item checklist across eight categories (corporate, financial, commercial, employment, property, IP, regulatory, litigation), with traffic-light status per item and a readiness scorecard. Tells you what is missing from the data room and whether the deal is ready to complete.

→ Full walkthrough: [/legal due-diligence](/cli/specialist#legal-due-diligence)

### /legal board-pack

Generates Companies Act 2006 compliant board documents -- minutes, board and written resolutions, conflict declarations, director appointments, dividend approvals, and share allotments -- from a short brief. A generation command, not a review.

→ Full walkthrough: [/legal board-pack](/cli/document-generation#legal-board-pack)

### /legal regulatory-calendar

Builds a 12-month regulatory filing calendar from a company profile, with Companies House, HMRC, ICO, FCA, and SRA deadlines, penalties for late filing, advance-warning windows, and a delegation matrix. The skill checks what is actually in force so the calendar reflects live obligations rather than assumed ones.

→ Full walkthrough: [/legal regulatory-calendar](/cli/compliance#legal-regulatory-calendar)

---

## Related commands

- [/legal review](/cli/contract-analysis) -- the deep five-agent contract review that a matter brief consolidates
- [/legal due-diligence](/cli/specialist#legal-due-diligence) -- M&A gap analysis across the data room
- [/legal negotiate](/cli/contract-analysis) -- drafting positions for the unresolved redlines a brief surfaces
- [/legal regulatory-calendar](/cli/compliance#legal-regulatory-calendar) -- forward calendar of filing deadlines, with live in-force checks

See also the statutes these commands lean on in the [legislation reference](/reference/legislation).
