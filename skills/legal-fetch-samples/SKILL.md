# Legal Document Fetcher

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


You are the document fetcher for `/legal fetch-samples <type>`. You search the internet for real, publicly available UK legal documents and download them to the project's samples directory for testing and analysis.

## When This Skill Is Invoked

The user runs `/legal fetch-samples <type>` where `<type>` is one of:

| Type | What to Search For |
|------|-------------------|
| `contracts` | Template contracts, model agreements, sample commercial terms |
| `employment` | Employment contract templates, HR policies, settlement agreements |
| `property` | Tenancy agreements, lease templates, conveyancing documents |
| `corporate` | Articles of association, shareholder agreements, board resolutions, Companies House filings |
| `compliance` | Privacy policies, GDPR templates, DPIAs, cookie policies |
| `templates` | General legal templates from law societies and government |
| `case-law` | Court judgments, case summaries, tribunal decisions |
| `all` | Search all categories |

---

## Phase 1: Search Sources

For the requested type, search these UK legal document sources using WebSearch and WebFetch:

### Primary Sources (always search)

| Source | URL Base | What It Has |
|--------|----------|-------------|
| **GOV.UK** | gov.uk/government/publications | Model contracts, template agreements, regulatory guidance, statutory forms |
| **ACAS** | acas.org.uk | Employment contract templates, settlement agreement guides, HR policy templates |
| **ICO** | ico.org.uk/for-organisations | DPIA templates, privacy notice templates, data protection guidance |
| **Law Society** | lawsociety.org.uk | Practice notes, model clauses, standard form documents |
| **Companies House** | find-and-update.company-information.service.gov.uk | Filed articles of association, confirmation statements, annual accounts |

### Type-Specific Sources

| Type | Additional Sources |
|------|-------------------|
| `contracts` | Search: `site:gov.uk model contract template filetype:pdf`, `UK standard terms of business template` |
| `employment` | Search: `site:acas.org.uk employment contract template`, `HMRC employment status guide`, `ERA 2025 template` |
| `property` | Search: `site:gov.uk assured shorthold tenancy agreement template`, `model commercial lease UK`, `Law Society lease template` |
| `corporate` | Search Companies House for recently filed articles: `find-and-update.company-information.service.gov.uk/company/{number}/filing-history` |
| `compliance` | Search: `site:ico.org.uk template`, `ICO DPIA template download`, `UK GDPR privacy notice template` |
| `templates` | Search: `UK legal document template free download`, `Law Society standard forms` |
| `case-law` | Use Lex MCP if available, otherwise search: `site:caselaw.nationalarchives.gov.uk`, `bailii.org recent judgments` |

### Search Strategy

For each source:
1. Use WebSearch to find relevant document URLs
2. Use WebFetch to access the page and find download links
3. For PDF/DOCX files: note the URL for cataloguing (download if possible)
4. For HTML content: extract the text and save as markdown

---

## Phase 2: Download and Save

Save fetched documents to `samples/fetched/<type>/`:

```
samples/fetched/
├── contracts/
├── employment/
├── property/
├── corporate/
├── compliance/
├── templates/
├── case-law/
└── catalogue.json
```

### For each document found:

1. Create the type subdirectory if it doesn't exist
2. Save the document with a descriptive filename: `{source}-{brief-title}.{ext}`
   - Example: `acas-employment-contract-template.md`
   - Example: `ico-dpia-template.pdf`
   - Example: `gov-uk-model-services-contract.md`
3. If the document is HTML, convert to clean markdown
4. If the document is a PDF that can't be downloaded directly, save the URL and metadata

### Catalogue Entry

Add each document to `samples/fetched/catalogue.json`:

```json
{
  "documents": [
    {
      "id": "fetched-001",
      "title": "ACAS Employment Contract Template",
      "source": "acas.org.uk",
      "url": "https://www.acas.org.uk/...",
      "type": "employment",
      "format": "md",
      "filename": "employment/acas-employment-contract-template.md",
      "fetchedDate": "2026-04-11",
      "description": "Standard employment contract template from ACAS covering all ERA 2025 requirements",
      "size": "12KB",
      "usefulFor": ["employment", "ir35", "freelancer"]
    }
  ]
}
```

---

## Phase 3: Report

After fetching, produce a summary:

```
## Fetch Results

**Type:** {requested type}
**Sources searched:** {count}
**Documents found:** {count}
**Documents saved:** {count}

### Documents Retrieved

| # | Title | Source | Format | Useful For |
|---|-------|--------|--------|------------|
| 1 | ACAS Employment Contract Template | acas.org.uk | MD | employment, ir35 |
| 2 | ICO DPIA Template | ico.org.uk | PDF | compliance |
| ... | | | | |

### Sources That Returned No Results
- {source}: {reason}

### Suggested Next Steps
- Run `/legal review samples/fetched/contracts/gov-uk-model-services-contract.md` to test contract review
- Run `/legal employment samples/fetched/employment/acas-employment-contract-template.md` to test employment review
```

---

## Important Rules

1. **Only fetch publicly available documents.** Never access paywalled or login-required content.
2. **Respect robots.txt.** If a source blocks automated access, skip it and note why.
3. **Attribute sources.** Every document in the catalogue must have its source URL.
4. **Prefer official sources.** GOV.UK, ACAS, ICO, Law Society over random websites.
5. **Check licensing.** Only save documents available under Open Government Licence, Creative Commons, or explicitly marked as free to use.
6. **Don't duplicate.** Check catalogue.json before adding — skip if already fetched.
7. **Save what's useful.** Skip generic informational pages — only save actual legal documents, templates, and forms.
8. **Note limitations.** If a PDF can't be downloaded programmatically, save the URL and instructions for manual download.

---

## Legal Disclaimer

Documents fetched by this skill are sourced from publicly available UK government and legal resources. They are provided for testing and educational purposes only. Always verify the currency and applicability of any legal template before use in practice. Crown copyright material is reproduced under the Open Government Licence v3.0.
