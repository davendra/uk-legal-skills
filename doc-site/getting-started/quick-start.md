# Quick Start

Get your first contract review in 60 seconds. No legal expertise required — point a `/legal` command at a document and let the analysis do the work.

---

## 1. Install the skills

```bash
curl -fsSL https://raw.githubusercontent.com/davendra/uk-legal-skills/main/install.sh | bash
```

Or clone and run the installer locally:

```bash
git clone https://github.com/davendra/uk-legal-skills.git
cd uk-legal-skills
./install.sh
```

This installs the 38 `/legal` commands and 12 agents into `~/.claude/`. It takes about 10 seconds.

## 2. Open your agent host

Launch Claude Code (or another compatible agent host) in your terminal. Navigate to the directory containing the contract you want to review.

## 3. See the command menu

Type `/legal` on its own to see the full command menu organised by category:

```bash
/legal
```

## 4. Get a first read

For a quick triage before a full review, use `first-read`:

```bash
/legal first-read contract.pdf
```

This gives you a fast plain-English summary and a heads-up on the biggest risks.

## 5. Run a full review

```bash
/legal review contract.pdf
```

You can also paste text directly or provide a URL — every `/legal` command accepts the same three input sources: a file path, pasted text, or a URL.

```bash
# Paste text
/legal review
# (your agent host will prompt you to paste the contract text)

# From a URL
/legal review https://example.com/contract.pdf
```

The review produces:

- A **Contract Safety Score** (0--100) with a colour-coded rating
- Clause-by-clause analysis with risk indicators: :red_circle: High, :yellow_circle: Medium, :green_circle: Low
- Specific issues with suggested alternative language
- An overall risk summary and recommended next steps
- A saved Markdown report in your current directory

## 6. Search the case law

Look up relevant judgments straight from the terminal:

```bash
/legal caselaw "unfair dismissal qualifying period"
```

This searches the 63,000+ judgment corpus and returns the most relevant cases for your query.

## 7. Try more commands

```bash
/legal risks contract.pdf         # Deep risk analysis
/legal negotiate contract.pdf     # Generate counter-proposals
/legal plain contract.pdf         # Translate to plain English
/legal missing contract.pdf       # Find missing protections
/legal compare old.pdf new.pdf    # Compare two versions
```

::: tip See all 38 commands
Type `/legal` on its own to see the full command menu organised by category.
:::

---

## What to try next

Here are the most popular things people use the skills for. Pick the one closest to your situation:

| What you want to do | Command |
|------|-----------------|
| Review an employment contract | `/legal employment contract.pdf` |
| Check if a contractor is inside IR35 | `/legal ir35 engagement-letter.pdf` |
| Generate an NDA for a new business relationship | `/legal nda "Two-way NDA between Acme Ltd and Beta Corp for software integration project"` |
| Audit your website's GDPR compliance | `/legal gdpr privacy-policy.pdf` |
| Review a tenancy agreement before signing | `/legal tenancy tenancy.pdf` |
| Analyse a will for tax planning issues | `/legal wills last-will.pdf` |
| Check a commercial lease | `/legal property lease.pdf` |
| Run a compliance audit | `/legal compliance https://example.com` |
| Generate terms of service for your website | `/legal terms https://myapp.com` |

::: tip Full command reference
See the [CLI Commands](/cli/) section for detailed documentation on every skill, including input formats, output structure, and example usage.
:::
