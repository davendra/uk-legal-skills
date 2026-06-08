# Sample Legal Documents

Test documents for AI Legal UK across 3 quality tiers.

## Generated Documents (30)

### Good Tier (`generated/good/`) — Score 70-90
10 well-drafted documents with minor issues only. Tests baseline accuracy.

### Mixed Tier (`generated/mixed/`) — Score 40-69
10 documents with 2-3 deliberate issues. Tests detection of common problems.

### Bad Tier (`generated/bad/`) — Score 10-39
10 heavily problematic documents with 4-6 serious issues. Tests critical risk flagging.

## Fetched Documents (`fetched/`)

Real public legal documents downloaded from UK government and legal sources.
Run `/legal fetch-samples <type>` to populate.

See `fetched/catalogue.json` for metadata index.

## Document Types Covered

| Category | Good | Mixed | Bad |
|----------|------|-------|-----|
| Contract/SaaS | 1 | 2 | 2 |
| Employment | 1 | 1 | 1 |
| Property | 1 | 1 | 1 |
| Corporate | 1 | 2 | 1 |
| Compliance/Privacy | 1 | 2 | 1 |
| NDA | 1 | 0 | 1 |
| AML | 1 | 0 | 1 |
| ESG | 1 | 0 | 0 |
| IR35/Freelancer | 0 | 2 | 1 |
| Settlement/Dispute | 1 | 0 | 1 |
| Board Pack | 1 | 0 | 0 |
