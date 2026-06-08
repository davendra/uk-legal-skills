---
layout: home
hero:
  name: "UK Legal Skills"
  text: "The Counsel"
  tagline: "A junior counsel in your pocket. Thirty-eight legal skills, twelve agents, and the entirety of England & Wales statute — assembled into a single quiet assistant for the work of reading, drafting and risking contracts."
  image:
    src: /the-counsel-logo.svg
    alt: The Counsel
  actions:
    - theme: brand
      text: Begin a review
      link: /getting-started/
    - theme: alt
      text: CLI commands
      link: /cli/
    - theme: alt
      text: View on GitHub
      link: https://github.com/davendra/uk-legal-skills

features:
  - icon: "I."
    title: Read any contract
    details: Drop in a PDF, DOCX or scanned page. The Counsel returns a marked-up version with commentary, risk flags and the precise statute it relies upon. Five agents review in parallel and aggregate to a single Contract Safety Score.
  - icon: "II."
    title: Draft from facts
    details: Tell it the parties, the consideration and the term. Receive a clean NDA, employment contract, terms of service or board pack — citing English law, not Delaware. Six drafting skills covering the documents most contracts of England & Wales rely on.
  - icon: "III."
    title: Reason like a panel
    details: Twelve agents — junior counsel, senior counsel, devil's advocate, costs draftsman — debate before a single conclusion is reached. Three orchestrators (review, employment, corporate) aggregate weighted scores into one verdict.
  - icon: "IV."
    title: Live UK statute and caselaw
    details: Wired to legislation.gov.uk and the National Archives Lex Graph (63,000+ judgments). In-force, commencement and amendment checks happen on every analysis, so the law you see is the law in force this morning.
  - icon: "V."
    title: Reads like an editorial broadsheet
    details: Reports are written the way solicitors read — masthead, marginalia, drop-caps and Roman-numeral cells, with risk flags and the precise statute in the margin — because reading carefully is half the job.
  - icon: "VI."
    title: Source-available (FSL-1.1)
    details: Use it inside your firm, for research, and when serving your own clients — the skills run inside your own agent host with your own provider key, so your contract text stays on your machine and never touches a third-party server. Building a competing product or hosted service needs a commercial licence; each release converts to Apache 2.0 after two years.
---

## The principle

> *In the matter of any contract before you, the question is rarely* what does the document say. *It is what the document* **does** *— to your money, your obligations, and the next twenty years of your professional life.*

**Specialist before general. Fact before form.** The Counsel is built around how solicitors actually reason — not how chatbots usually answer.

---

## Who the Counsel is for

**Freelancers & contractors** — Check your contracts for IR35 traps, unfair payment terms, and missing protections before you sign. Understand what that 20-page consultancy agreement actually says, in plain English.

**Small business owners** — Review supplier contracts without a solicitor on retainer. Generate NDAs for new partnerships. Audit your website's UK GDPR compliance. Get a second opinion on that lease renewal in seconds.

**Property professionals** — Analyse commercial leases clause by clause. Check tenancy agreements against the Renters' Rights Act 2025. Spot missing break clauses, unfair deposit terms, and repair obligations before they become problems.

**In-house legal teams** — Use the Counsel as a first-pass review tool so your solicitors can focus on the issues that actually matter, not reading boilerplate. Triage a stack of contracts in minutes; export an A4 PDF report for the file.

**Developers & legal tech** — Extend the platform with new legal skills, build on the API, contribute analysis domains, or integrate the MCP legislation server into your own applications. The entire codebase is open and documented.

---

## Install and run

If you already use Claude Code, Codex, or another compatible agent host, install the legal skills and run them directly from your terminal. Review contracts, generate documents, and run compliance checks without leaving your workflow.

```bash
# Clone and install the skills, agents and MCP servers into your agent host
git clone https://github.com/davendra/uk-legal-skills.git
cd uk-legal-skills
./install.sh

# Then in your agent host
/legal review my-contract.pdf
```

Or install in one line straight from the repo:

```bash
curl -fsSL https://raw.githubusercontent.com/davendra/uk-legal-skills/main/install.sh | bash
```

`install.sh` copies the **38 skills**, **12 agents**, and the MCP legislation and caselaw servers into your agent host. See the [getting-started guide](/getting-started/) for the full walkthrough.

::: tip Prefer a hosted web app?
**The Counsel** ([the-counsel.co.uk](https://the-counsel.co.uk)) is a hosted product built on these skills — sign in and start with no installation. This repository is the open-source skills, agents and MCP servers only.
:::

::: tip England & Wales only
All analysis is scoped to the laws of England & Wales. Scottish, Northern Irish, and other jurisdictions are not covered.
:::

---

<p style="text-align: center; font-style: italic; color: var(--vp-c-text-2);">
  UK Legal Skills — Established MMXXVI · Built for England &amp; Wales · FSL-1.1
</p>
