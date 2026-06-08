# Output File Naming

All output from the AI Legal Assistant is saved as Markdown files in the **current working directory**. This page documents every naming convention used across the 38 skills.

---

## Naming Format

All output files follow this general pattern:

```
[TYPE]-[identifier]-[YYYY-MM-DD].md
```

| Component | Description | Source |
|-----------|-------------|--------|
| `[TYPE]` | Uppercase skill output prefix | Defined by each skill (e.g., `CONTRACT-REVIEW`, `NDA`, `GDPR-AUDIT`) |
| `[identifier]` | Document-specific identifier | Extracted from the analysed document during the ingestion phase |
| `[YYYY-MM-DD]` | Date the analysis was generated | Today's date at time of execution |

::: info
The identifier field (name, party, address, company, etc.) is extracted automatically from the document being analysed. If the value cannot be determined, a generic placeholder is used. Spaces are replaced with hyphens and special characters are removed.
:::

---

## Complete File Naming Table

| Skill | Command | File Pattern | Example |
|-------|---------|-------------|---------|
| Contract Review | `/legal review` | `CONTRACT-REVIEW-[name]-[date].md` | `CONTRACT-REVIEW-Acme-Corp-2025-03-15.md` |
| Contract Comparison | `/legal compare` | `CONTRACT-COMPARISON-[date].md` | `CONTRACT-COMPARISON-2025-03-15.md` |
| NDA Generator | `/legal nda` | `NDA-[party-name]-[date].md` | `NDA-TechStart-Ltd-2025-03-15.md` |
| Terms of Service | `/legal terms` | `TERMS-OF-SERVICE-[company]-[date].md` | `TERMS-OF-SERVICE-Widgets-Inc-2025-03-15.md` |
| Privacy Policy | `/legal privacy` | `PRIVACY-POLICY-[company]-[date].md` | `PRIVACY-POLICY-Widgets-Inc-2025-03-15.md` |
| Property Analysis | `/legal property` | `PROPERTY-ANALYSIS-[address]-[date].md` | `PROPERTY-ANALYSIS-42-High-Street-2025-03-15.md` |
| Tenancy Review | `/legal tenancy` | `TENANCY-REVIEW-[address]-[date].md` | `TENANCY-REVIEW-Flat-3-Oak-Lane-2025-03-15.md` |
| GDPR Audit | `/legal gdpr` | `GDPR-AUDIT-[name]-[date].md` | `GDPR-AUDIT-DataFlow-Ltd-2025-03-15.md` |
| IP Review | `/legal ip` | `IP-REVIEW-[name]-[date].md` | `IP-REVIEW-PatentCo-2025-03-15.md` |
| Debt Review | `/legal debt` | `DEBT-REVIEW-[debtor]-[date].md` | `DEBT-REVIEW-Smith-Trading-2025-03-15.md` |
| Immigration Review | `/legal immigration` | `IMMIGRATION-REVIEW-[name]-[date].md` | `IMMIGRATION-REVIEW-J-Patel-2025-03-15.md` |
| Will Review | `/legal wills` | `WILL-REVIEW-[testator]-[date].md` | `WILL-REVIEW-E-Thompson-2025-03-15.md` |
| PDF Report | `/legal report-pdf` | `LEGAL-REPORT-[name]-[date].pdf` | `LEGAL-REPORT-Acme-Corp-2025-03-15.pdf` |

---

## Identifier Extraction Rules

The `[identifier]` component varies by skill type. The table below shows where each identifier comes from:

| Skill Category | Identifier Field | Extraction Source | Fallback |
|----------------|-----------------|-------------------|----------|
| Contract skills | `[name]` | Name of the primary contracting party or contract title | `untitled` |
| NDA | `[party-name]` | Name of the disclosing or receiving party | `custom-nda` |
| Terms of Service | `[company]` | Company name extracted from the URL domain or document content | URL hostname |
| Privacy Policy | `[company]` | Company name from URL or document header | URL hostname |
| Property | `[address]` | Property address from the lease or tenancy agreement | `property` |
| Tenancy | `[address]` | Property address from the tenancy agreement | `tenancy` |
| GDPR Audit | `[name]` | Organisation name from the audited document or policy | `audit` |
| IP Review | `[name]` | Company name or rights holder from the IP document | `ip-document` |
| Debt Review | `[debtor]` | Name of the debtor party from the debt instrument | `debtor` |
| Immigration | `[name]` | Name of the individual or sponsoring employer | `review` |
| Will Review | `[testator]` | Name of the testator (person making the will) | `will` |
| Contract Comparison | *(none)* | Date only -- no identifier since two documents are compared | -- |

### Special Character Handling

| Original | Transformed | Rule |
|----------|-------------|------|
| Spaces | Hyphens | `"Acme Corp"` becomes `Acme-Corp` |
| Apostrophes | Removed | `"O'Brien"` becomes `OBrien` |
| Ampersands | Removed | `"Smith & Jones"` becomes `Smith-Jones` |
| Ltd/Limited | Kept | `"TechStart Ltd"` stays `TechStart-Ltd` |
| Commas, dots | Removed | `"123 High St., London"` becomes `123-High-St-London` |

---

## Date Format

All dates use **ISO 8601** format: `YYYY-MM-DD`.

| Component | Format | Example |
|-----------|--------|---------|
| Year | 4 digits | `2025` |
| Month | 2 digits, zero-padded | `03` |
| Day | 2 digits, zero-padded | `15` |

The date reflects **when the analysis was generated**, not the date of the document being analysed.

---

## PDF Reports

The `/legal report-pdf` command generates a professional PDF file (not Markdown):

| Aspect | Details |
|--------|---------|
| Format | A4 PDF |
| Filename | `LEGAL-REPORT-[name]-[date].pdf` |
| Location | Current working directory |
| Contents | Score gauges, risk charts, colour-coded tables, prioritised action checklist |
| Requirements | Python 3.8+ and `reportlab` (`pip3 install reportlab`) |
| Script | `scripts/generate_legal_pdf.py` |

::: tip
Run `/legal report-pdf` after any analysis command to convert the most recent review into a professional client-ready PDF document.
:::

---

## File Contents Structure

Every generated Markdown file follows a consistent internal structure:

### 1. Disclaimer Block

The standard AI-generated analysis disclaimer at the very top of the file.

### 2. Document Header

```markdown
# CONTRACT REVIEW: Acme Supply Agreement

**Date:** 15 March 2025
**Parties:** Acme Corp Ltd / Widget Supplies Ltd
**Overall Score:** 72/100 (Grade B)
**Risk Summary:** 🔴 2 High | 🟡 5 Medium | 🟢 8 Low
```

### 3. Executive Summary

A 2-3 paragraph overview of the key findings.

### 4. Analysis Body

The main analysis content, which varies by skill type (clause tables, compliance matrices, risk assessments, etc.).

### 5. Recommendations

Prioritised action items with current text and replacement text.

### 6. Appendix

Legislation references, glossary of terms, and methodology notes.

---

## Skills Without Named Output Files

Not all skills produce a named output file. Many skills display their results directly in the chat interface without saving to disk:

| Skill | Command | Output Method |
|-------|---------|---------------|
| Risk Analysis | `/legal risks` | Inline chat display |
| Plain English | `/legal plain` | Inline chat display |
| Negotiate | `/legal negotiate` | Inline chat display |
| Missing Protections | `/legal missing` | Inline chat display |
| Benchmark | `/legal benchmark` | Inline chat display |
| Employment Review | `/legal employment` | Inline chat display |
| Corporate Review | `/legal corporate` | Inline chat display |
| IR35 Assessment | `/legal ir35` | Inline chat display |
| AML Compliance | `/legal aml` | Inline chat display |
| Freelancer Review | `/legal freelancer` | Inline chat display |
| Board Pack | `/legal board-pack` | Inline chat display |
| Compliance Audit | `/legal compliance` | Inline chat display |
| Consumer Compliance | `/legal consumer` | Inline chat display |
| ESG Compliance | `/legal esg` | Inline chat display |
| AI Compliance | `/legal ai-compliance` | Inline chat display |
| Legislation Tracker | `/legal legislation-tracker` | Inline chat display |
| Regulatory Calendar | `/legal regulatory-calendar` | Inline chat display |
| Dispute Resolution | `/legal dispute` | Inline chat display |
| Due Diligence | `/legal due-diligence` | Inline chat display |
| Agreement Generator | `/legal agreement` | Varies by agreement type |
| Fetch Samples | `/legal fetch-samples` | Downloads sample files |

::: info
Skills that produce inline output can be followed by `/legal report-pdf` to generate a professional PDF version of the most recent analysis.
:::

---

## Example: Full Workflow

```bash
# 1. Run a contract review (saves Markdown file)
/legal review service-agreement.pdf
# Output: CONTRACT-REVIEW-CloudTech-Ltd-2025-03-15.md

# 2. Generate a PDF report of the same review
/legal report-pdf
# Output: LEGAL-REPORT-CloudTech-Ltd-2025-03-15.pdf

# 3. Compare two contract versions (saves Markdown file)
/legal compare v1-agreement.pdf v2-agreement.pdf
# Output: CONTRACT-COMPARISON-2025-03-15.md

# 4. Generate an NDA (saves Markdown file)
/legal nda "Mutual NDA between TechStart Ltd and InnovateCo for product discussions"
# Output: NDA-TechStart-Ltd-2025-03-15.md

# 5. Run a risk analysis (inline display only)
/legal risks employment-contract.pdf
# Output: displayed in chat, no file saved

# 6. Run a GDPR audit (saves Markdown file)
/legal gdpr privacy-policy.pdf
# Output: GDPR-AUDIT-DataFlow-Ltd-2025-03-15.md
```

::: warning
Do not change the file naming conventions without updating `legal/SKILL.md` (the orchestrator). The naming conventions documented in the orchestrator serve as the single source of truth.
:::
