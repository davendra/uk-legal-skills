# Security Policy

## Reporting a vulnerability

Please report security issues **privately** — do not open a public issue for
anything exploitable.

- Preferred: use GitHub's [private vulnerability reporting](https://github.com/davendra/uk-legal-skills/security/advisories/new).
- Or email **security@the-counsel.co.uk**.

Include what the issue is, how to reproduce it, and the impact you see. We aim to
acknowledge within a few working days.

## Scope

This repository contains **prompts (Markdown skills), agent definitions, and two
small MCP servers** — there is no hosted service here and no user data. The most
relevant concerns are therefore:

- **MCP servers** (`mcp-servers/uk-legislation`, `mcp-servers/caselaw`) — request
  handling, SSRF, dependency vulnerabilities, and the handling of any
  user-supplied API key (e.g. `summarise_judgment`).
- **Scripts** (`scripts/`) — the PDF/ingestion helpers.
- **Supply chain** — the `npm` dependencies of the MCP servers and the doc-site.

The `/legal` skills themselves run inside *your own* agent host with *your own*
provider key; your document text is not sent to us. Concerns about model output
quality or legal accuracy are not security issues — see the disclaimer in the
[README](README.md) and open a normal issue instead.

## Out of scope

- The hosted product **The Counsel** (the-counsel.co.uk) lives in a separate
  repository; report issues with the hosted service to
  **security@the-counsel.co.uk** directly.
- Findings that require a malicious agent host or a compromised local machine.
