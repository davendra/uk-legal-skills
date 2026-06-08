# Utilities

Two utility commands: professional PDF report generation and sample document downloading for testing.

## /legal report-pdf

Generates a professional A4 PDF report from the most recent analysis output, suitable for client delivery.

### Syntax

```bash
/legal report-pdf
```

No arguments required. The command automatically locates the most recent analysis file in the current working directory.

### Prerequisites

| Requirement | Installation |
|-------------|-------------|
| Python 3.8+ | Pre-installed on macOS; `apt install python3` on Linux |
| reportlab | `pip3 install reportlab` |

::: warning Missing reportlab
If reportlab is not installed, the command will display:
```
ERROR: reportlab is required. Install with: pip3 install reportlab
```
Install it with `pip3 install reportlab` before running the command.
:::

### How It Works

The command uses `scripts/generate_legal_pdf.py` to transform analysis Markdown into a branded PDF.

**Step 1 -- Locate the source analysis.** The script searches the current directory for files matching these patterns (in priority order):

```
CONTRACT-REVIEW-*.md
FREELANCER-REVIEW-*.md
COMPLIANCE-AUDIT-*.md
NDA-REVIEW-*.md
```

It also matches any `.md` file containing "Contract Safety Score", "Freelancer Fairness Score", or "Compliance Scorecard".

**Step 2 -- Parse the Markdown.** The script extracts structured data: scores, risk levels, clauses, recommendations, and metadata.

**Step 3 -- Generate the PDF.** The output is a professional A4 document with:

| Feature | Description |
|---------|-------------|
| **Score gauges** | Circular SVG-style gauge graphics showing the overall score (0--100) with colour coding |
| **Risk charts** | Visual distribution of clause risk levels across the document |
| **Colour-coded tables** | Red for high risk, amber for medium, green for low -- matching the standard risk indicators |
| **Action checklist** | Prioritised remediation items with checkboxes |
| **Page layout** | Proper headers, footers, page numbering, and legal disclaimer on every page |
| **Branding** | Professional colour palette: dark navy primary, medium blue secondary, bright blue accent |

### Colour Palette

The PDF uses a consistent colour scheme defined in the script:

| Colour | Hex | Usage |
|--------|-----|-------|
| Primary | `#1a365d` | Headers, titles |
| Secondary | `#2d5f8a` | Subheadings, borders |
| Accent | `#3182ce` | Links, highlights |
| Success | `#38a169` | Low risk, passing checks |
| Warning | `#d69e2e` | Medium risk, warnings |
| Danger | `#e53e3e` | High risk, failures |
| Background | `#f7fafc` | Alternating table rows |

### Example Workflow

```bash
# Step 1: Run an analysis
/legal review ./contracts/service-agreement.pdf

# Step 2: Generate the PDF
/legal report-pdf
```

### Output

PDF file saved to the current working directory, named based on the source analysis file.

::: tip Client-Ready Output
The generated PDF is designed to be sent directly to clients or attached to advice letters. It includes the standard AI-generated disclaimer and professional formatting throughout.
:::

### Error Handling

| Condition | Behaviour |
|-----------|-----------|
| No analysis file found | Displays: "No contract review data found in the current directory. Please run `/legal review <file>` first." |
| reportlab not installed | Displays installation instructions and exits with code 1 |
| Parse failure | Graceful degradation -- outputs what it can extract |

---

## /legal fetch-samples

Downloads 30 sample legal documents across 3 quality tiers for testing UK Legal Skills commands.

### Syntax

```bash
/legal fetch-samples <type>
```

### Supported Types

| Type | What Is Downloaded |
|------|-------------------|
| `contracts` | Template contracts, model agreements, sample commercial terms |
| `employment` | Employment contract templates, HR policies, settlement agreements |
| `property` | Tenancy agreements, lease templates, conveyancing documents |
| `corporate` | Articles of association, shareholder agreements, board resolutions, Companies House filings |
| `compliance` | Privacy policies, GDPR templates, DPIAs, cookie policies |
| `templates` | General legal templates from law societies and government sources |
| `case-law` | Court judgments, case summaries, tribunal decisions |
| `all` | All of the above categories |

### Quality Tiers

Documents span three quality tiers for comprehensive testing:

| Tier | Count | Purpose | Characteristics |
|------|-------|---------|-----------------|
| **Good** | ~10 | Well-drafted documents | Strong protections, full compliance, market-standard clauses, proper execution |
| **Mixed** | ~10 | Average quality documents | Some gaps, partial compliance, common weaknesses, typical real-world drafting |
| **Bad** | ~10 | Deliberately flawed documents | Missing clauses, compliance failures, unfair terms, expired provisions, non-compliant execution |

::: tip Why Three Tiers?
The tier spread ensures you can test the full range of analysis output. Good-tier documents should score 80+, mixed-tier documents should score 50--79, and bad-tier documents should score below 50. This validates that the analysis correctly identifies strengths and weaknesses.
:::

### Sources

Documents are sourced from publicly available UK legal resources:

| Source | What It Provides |
|--------|-----------------|
| **GOV.UK** | Model contracts, template agreements, regulatory guidance, statutory forms |
| **ACAS** | Employment contract templates, settlement agreement guides, HR policy templates |
| **ICO** | DPIA templates, privacy notice templates, data protection guidance |
| **Law Society** | Practice notes, model clauses, standard form documents |
| **Companies House** | Filed articles of association, confirmation statements, annual accounts |

### Directory Structure

Documents are saved to a `samples/` directory in the current working directory, organised by category:

```
samples/
  contracts/
    good/
    mixed/
    bad/
  employment/
    good/
    mixed/
    bad/
  property/
    good/
    mixed/
    bad/
  ...
```

### Examples

```bash
# Download all 30 sample documents
/legal fetch-samples all

# Download only employment templates
/legal fetch-samples employment

# Download only corporate governance documents
/legal fetch-samples corporate
```

::: warning Network Required
This command downloads documents from public sources and requires an active internet connection. Downloads may take a few minutes depending on connection speed.
:::

### Using Samples for Testing

After downloading, you can test any UK Legal Skills command against the samples:

```bash
# Test contract review against a good document
/legal review ./samples/contracts/good/service-agreement.md

# Test employment review against a bad document
/legal employment ./samples/employment/bad/zero-hours-contract.md

# Generate a PDF from the analysis
/legal report-pdf
```

---

## Related commands

- [/legal review](/cli/contract-analysis) — the review whose output you export
- [Example output](/reference/sample-report) — a sample review report
- [All commands](/reference/all-commands) — the full catalogue
