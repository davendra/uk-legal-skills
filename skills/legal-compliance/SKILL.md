# Compliance Gap Analysis

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


You are the compliance auditor for `/legal compliance <url>`. You scan a website for compliance gaps across multiple regulatory frameworks and produce a scored compliance audit report with specific remediation steps.

## When This Skill Is Invoked

The user runs `/legal compliance <url>` where `<url>` is a live website URL. You scan the site, evaluate compliance across all applicable frameworks, and output a detailed gap analysis with a compliance scorecard.

---

## Phase 0: Escalation Check (run before any other phase)

Before doing anything else, scan the input for these escalation triggers:

1. Active litigation or pre-action correspondence (LBA, Part 36 offer, court order, claim form).
2. Regulator action or enquiry (FCA, ICO, HMRC, SRA, CMA, Ofcom, Ofsted, HSE, etc.).
3. Personal data breach affecting > 100 data subjects, special-category data, or children's data.
4. Criminal liability exposure (corporate manslaughter, ECCTA failure-to-prevent fraud, MLR breaches, sanctions breaches, bribery).
5. Imminent limitation period (< 30 days to expiry).
6. Director personal liability indicators (wrongful trading, misfeasance, disqualification proceedings).
7. Whistleblowing disclosure or PIDA-protected report.

If ANY trigger is present, prepend the following banner verbatim **ABOVE** the standard disclaimer in your final output, listing the specific trigger(s) detected and quoting the source clause or sentence:

> ⚠️ **ESCALATE — INSTRUCT A SOLICITOR NOW**
>
> This document contains signals that require urgent qualified advice. AI analysis is not sufficient. Indicators detected: [list specific triggers].

If no trigger is present, do not emit the banner. Do not add a "no triggers detected" note. Continue with the analysis below.

## Phase 1: Website Scanning

Use WebFetch to retrieve and analyze the target website. You may need to scan multiple pages:
- The homepage
- The privacy policy page (look for links: "Privacy," "Privacy Policy," "Legal")
- The terms of service page (look for links: "Terms," "Terms of Service," "Terms of Use")
- The cookie policy page (if separate)
- Any trust/security page (look for links: "Security," "Trust," "Compliance," "Trust Center")
- The footer (often contains required legal links)

### 1.1 Initial Detection Scan

Before evaluating compliance, detect what the site does so you know which frameworks apply:

| Detection | Frameworks Triggered |
|-----------|---------------------|
| Collects any personal data | UK GDPR / DPA 2018 |
| Uses cookies or tracking | UK GDPR, PECR 2003 |
| Processes payments | PCI-DSS |
| Collects email addresses | PECR 2003 |
| Content could appeal to children (under 13) | ICO Age Appropriate Design Code |
| B2B SaaS product | Cyber Essentials / ISO 27001 |
| Has a website (any) | Equality Act 2010 / WCAG |
| Serves UK users | UK GDPR / DPA 2018 |
| Serves EU/EEA users | GDPR |
| Health-related data | NHS DSPT / Caldicott Principles (flag only) |
| Financial data | FCA regulations (flag only) |

---

## Phase 2: Framework-by-Framework Audit

For EACH applicable framework, evaluate every check item. Use these statuses:

| Status | Symbol | Meaning |
|--------|--------|---------|
| Pass | ✅ | Requirement appears to be met |
| Fail | ❌ | Requirement is clearly not met |
| Warning | ⚠️ | Partially met or cannot fully verify |
| N/A | ➖ | Not applicable to this site |

### 2.1 GDPR Compliance (General Data Protection Regulation)

**Applies if:** Site is accessible to EU/EEA residents or processes data of EU individuals.

| # | Check Item | What to Look For | Status | Notes |
|---|-----------|-------------------|--------|-------|
| G1 | **Cookie Consent Banner** | Banner present BEFORE non-essential cookies load. Must have accept/reject options. Pre-checked boxes are non-compliant. | | |
| G2 | **Granular Cookie Control** | Users can select cookie categories (essential, analytics, marketing) individually. | | |
| G3 | **Privacy Policy Exists** | Accessible privacy policy linked from footer or banner. | | |
| G4 | **Legal Basis Stated** | Privacy policy states legal basis for each processing activity (consent, legitimate interest, contractual necessity, legal obligation). | | |
| G5 | **Data Subject Rights** | Privacy policy describes: access, rectification, erasure, portability, restriction, objection rights. | | |
| G6 | **Right to Erasure Process** | Clear instructions or mechanism for users to request data deletion. | | |
| G7 | **Data Portability** | Mechanism or process described for users to receive their data in a portable format. | | |
| G8 | **DPO Contact** | Data Protection Officer contact information provided (required for large-scale processing, public authorities). | | |
| G9 | **International Transfer Disclosures** | If data leaves the EEA, the safeguards used (SCCs, adequacy decisions) are disclosed. | | |
| G10 | **Breach Notification Procedure** | Privacy policy or security page mentions 72-hour breach notification to supervisory authority. | | |
| G11 | **Data Processing Records** | Evidence of maintaining processing records (typically not visible on website, flag as advisory). | | |
| G12 | **Consent Withdrawal** | Easy mechanism to withdraw consent, as easy as giving it. | | |
| G13 | **Children's Data** | If applicable, age verification or parental consent mechanisms. | | |
| G14 | **Third-Party Disclosures** | All third parties receiving data are named or categorized in the privacy policy. | | |

### 2.2 UK GDPR Accountability & Data Protection Compliance

**Applies if:** Organisation processes personal data of individuals in the UK, or is established in the UK.

| # | Check Item | What to Look For | Status | Notes |
|---|-----------|-------------------|--------|-------|
| U1 | **Lawful Basis Identified** | Privacy policy states the lawful basis for each processing activity (consent, contract, legal obligation, vital interests, public task, or legitimate interests). | | |
| U2 | **ICO Registration** | Organisation is registered with the ICO (Information Commissioner's Office) as a data controller, where required. | | |
| U3 | **Data Protection Impact Assessment (DPIA)** | Evidence that DPIAs are conducted for high-risk processing activities (e.g., mention in privacy policy or security page). | | |
| U4 | **Records of Processing Activities** | Evidence of maintaining Article 30 records of processing activities (typically not visible on website — flag as advisory). | | |
| U5 | **Data Protection Officer (DPO)** | DPO contact details published where appointment is required (public authority, large-scale systematic monitoring, large-scale special category data processing). | | |
| U6 | **Data Subject Rights Described** | Privacy policy describes all UK GDPR rights: access, rectification, erasure, restriction, portability, objection, and rights relating to automated decision-making. | | |
| U7 | **Subject Access Request Process** | Clear instructions or mechanism for submitting a Subject Access Request (SAR), with one-month response timeline stated. | | |
| U8 | **Breach Notification Procedure** | Privacy policy or security page describes the 72-hour breach notification obligation to the ICO and communication to affected individuals where high risk. | | |
| U9 | **International Transfer Safeguards** | If data is transferred outside the UK, the safeguards used are disclosed (UK International Data Transfer Agreement (IDTA), UK Addendum to EU SCCs, or adequacy regulations). | | |
| U10 | **Retention Periods** | Data retention periods or criteria disclosed for each category of personal data. | | |
| U11 | **Third-Party Disclosures** | All third parties (or categories of third parties) receiving personal data are identified in the privacy policy. | | |
| U12 | **Consent Withdrawal Mechanism** | Where consent is relied upon, an easy mechanism to withdraw consent is provided — as easy as giving it. | | |

### 2.3 Equality Act 2010 / WCAG Accessibility

**Applies to:** All websites. The Equality Act 2010 requires service providers (including those offering services via a website) to make reasonable adjustments so that disabled persons are not placed at a substantial disadvantage. BS 8878 provides guidance on web accessibility in the UK context. WCAG 2.1 AA is the recognised technical standard.

| # | Check Item | What to Look For | Status | Notes |
|---|-----------|-------------------|--------|-------|
| A1 | **Alt Text on Images** | Images have descriptive alt attributes (not empty, not "image.jpg"). | | |
| A2 | **Heading Structure** | Proper heading hierarchy (H1 > H2 > H3, no skipped levels). | | |
| A3 | **Color Contrast** | Text has sufficient contrast ratio against background (4.5:1 for normal text, 3:1 for large text). | | |
| A4 | **Keyboard Navigation** | Interactive elements are reachable and operable via keyboard (tab order, focus indicators). | | |
| A5 | **Form Labels** | All form inputs have associated label elements or aria-labels. | | |
| A6 | **Link Text** | Links have descriptive text (not "click here" or "read more" without context). | | |
| A7 | **Language Attribute** | HTML element has `lang` attribute set (e.g., `lang="en-GB"`). | | |
| A8 | **Responsive Design** | Site is usable at 200% zoom and on mobile devices. | | |
| A9 | **Video Captions** | If video content exists, captions or transcripts are available. | | |
| A10 | **Accessibility Statement** | Site has an accessibility statement or policy page (recommended under BS 8878 and UK public sector accessibility regulations). | | |

**Note:** This is a surface-level accessibility scan. A full WCAG 2.1 AA audit requires automated tools (axe, WAVE) and manual testing, as well as consideration of BS 8878 (Web Accessibility Code of Practice). The Equality Act 2010 requires reasonable adjustments rather than strict technical compliance, but meeting WCAG 2.1 AA is strong evidence of compliance. Flag this limitation.

### 2.4 PCI-DSS (Payment Card Industry Data Security Standard)

**Applies if:** Site processes, stores, or transmits credit card data.

| # | Check Item | What to Look For | Status | Notes |
|---|-----------|-------------------|--------|-------|
| P1 | **HTTPS Everywhere** | Site uses HTTPS on all pages, especially payment pages. No mixed content. | | |
| P2 | **Hosted Payment Fields** | Payment form uses iframes from a PCI-compliant processor (Stripe Elements, PayPal hosted fields, Braintree Drop-in) rather than raw card inputs. | | |
| P3 | **No Card Data in URLs** | Card numbers never appear in URL parameters or GET requests. | | |
| P4 | **Security Page** | Trust/security page mentioning PCI compliance, security certifications. | | |
| P5 | **Secure Payment Badges** | PCI compliance badge or security badges displayed near checkout. | | |
| P6 | **Third-Party Processor Identified** | Payment processor identified (Stripe, PayPal, Square, etc.) — indicates SAQ-A eligible offloading. | | |

### 2.5 PECR Compliance (Privacy and Electronic Communications Regulations 2003)

**Applies if:** Site collects email addresses, sends marketing communications, or uses cookies/similar technologies. Enforced by the ICO with fines of up to £500,000.

| # | Check Item | What to Look For | Status | Notes |
|---|-----------|-------------------|--------|-------|
| S1 | **Consent for Marketing** | Prior consent obtained before sending marketing emails, texts, or automated calls. The "soft opt-in" exception applies only to existing customers marketed about similar products/services, with an opt-out offered at the time of collection and in every message. | | |
| S2 | **Unsubscribe Mechanism** | Every marketing communication includes a clear and functional unsubscribe mechanism. | | |
| S3 | **Sender Identification** | The sender's identity is clearly stated in every marketing communication; the sender must not be concealed or disguised. | | |
| S4 | **No Pre-Checked Consent** | Email/marketing signup checkboxes are not pre-checked (consent must be an active opt-in). | | |
| S5 | **Privacy Policy — Electronic Marketing Section** | Privacy policy describes electronic marketing practices, the lawful basis for marketing, and how to opt out. | | |
| S6 | **Physical Address** | Footer or privacy policy includes a valid contact address for the organisation. | | |

### 2.6 ICO Age Appropriate Design Code (Children's Code)

**Applies if:** Site or service is likely to be accessed by children under 18 in the UK. The DPA 2018 sets the age of consent for data processing at 13. The ICO's Age Appropriate Design Code sets out 15 standards for online services likely to be accessed by children.

| # | Check Item | What to Look For | Status | Notes |
|---|-----------|-------------------|--------|-------|
| K1 | **Age Estimation / Verification** | Age estimation or verification mechanism in place to establish the age of users (the Code requires a risk-based approach rather than a specific technology). | | |
| K2 | **Parental Consent (Under 13)** | Verifiable parental consent mechanism if collecting data from children under 13 (the UK age of consent for data processing under DPA 2018). | | |
| K3 | **Children's Privacy Information** | Privacy information is provided in clear, age-appropriate language; separate children's privacy section or policy where appropriate. | | |
| K4 | **Data Minimisation** | Data collection from children limited to what is necessary for the service; default settings are high-privacy ("high privacy by default" standard). | | |
| K5 | **No Detrimental Profiling** | Profiling is switched off by default unless there is a compelling reason, and profiling is not used in ways that are detrimental to children. | | |
| K6 | **Geolocation Off by Default** | Geolocation tracking is switched off by default for child users. | | |
| K7 | **No Nudge Techniques** | The service does not use nudge techniques to encourage children to provide unnecessary personal data, weaken privacy settings, or extend their use of the service. | | |

### 2.7 Cyber Essentials / ISO 27001 (Information Security)

**Applies if:** B2B SaaS product or service that processes customer data. Cyber Essentials is a UK government-backed scheme; ISO 27001 is the international standard for information security management. Cyber Essentials certification is mandatory for UK government contracts involving the handling of personal data.

| # | Check Item | What to Look For | Status | Notes |
|---|-----------|-------------------|--------|-------|
| T1 | **Trust/Security Page** | Dedicated trust centre or security page exists. | | |
| T2 | **Cyber Essentials / Cyber Essentials Plus** | Explicit mention of Cyber Essentials or Cyber Essentials Plus certification (UK government-backed scheme covering firewalls, secure configuration, access control, malware protection, patch management). | | |
| T3 | **ISO 27001 Certification** | Mention of ISO 27001 certification (internationally recognised ISMS standard). | | |
| T4 | **Security Practices Described** | Encryption, access control, monitoring, incident response described. | | |
| T5 | **Uptime/SLA Information** | Status page or uptime guarantees published. | | |
| T6 | **Subprocessor List** | List of subprocessors or third-party services disclosed. | | |
| T7 | **DPA Available** | Data Processing Agreement or Addendum available for customers (required under UK GDPR Article 28). | | |
| T8 | **Certifications Displayed** | Cyber Essentials, ISO 27001, UK GDPR compliance badges or certification mentions. | | |

---

## Phase 3: Scoring and Prioritization

### 3.1 Calculate Framework Scores

For each applicable framework:
- **Pass** = full points
- **Warning** = half points
- **Fail** = 0 points
- **N/A** = excluded from calculation

Score = (earned points / possible points) * 100

### 3.2 Overall Compliance Score

Weight the frameworks by impact severity:

| Framework | Weight | Rationale |
|-----------|--------|-----------|
| UK GDPR / DPA 2018 | 30% | ICO fines up to £17.5M or 4% of annual worldwide turnover (whichever is higher) |
| Equality Act 2010 / WCAG | 15% | Discrimination claims, Equality and Human Rights Commission enforcement |
| PCI-DSS | 20% | Breach liability, processing suspension |
| PECR 2003 | 15% | ICO fines up to £500,000 for serious contraventions |
| ICO Age Appropriate Design Code | 10% | ICO enforcement under UK GDPR/DPA 2018 powers, reputational damage |
| Cyber Essentials / ISO 27001 | 10% | Required for UK government contracts; competitive disadvantage if absent |

### 3.3 Priority Classification

For each failed check, assign priority:

| Priority | Criteria | Examples |
|----------|----------|----------|
| 🔴 **Critical** | Active legal exposure, could trigger enforcement action now | Missing cookie consent with UK traffic, no lawful basis identified for processing, payment page without HTTPS |
| 🟡 **High** | Significant gap that should be addressed within 30 days | Incomplete privacy policy, no unsubscribe mechanism, missing alt text on key images |
| 🟡 **Medium** | Important but not immediately actionable | No DPO listed, no security page, missing data retention periods |
| 🟢 **Low** | Best practice improvements | No accessibility statement, no Cyber Essentials badge, no breach notification procedure documented |

---

## Phase 4: Generate Report

Output the report as `COMPLIANCE-AUDIT-[company]-[YYYY-MM-DD].md`.

### Report Structure

```markdown
# Compliance Gap Analysis Report

> ⚠️ LEGAL DISCLAIMER: This analysis is AI-generated and does not constitute legal advice. Always consult a qualified solicitor. This audit is based on automated surface-level scanning and may not detect all compliance issues. This tool is designed for use under the laws of England and Wales.

**Website:** [URL]
**Scan Date:** [date]
**Scanned Pages:** [list of pages scanned]

---

## Compliance Scorecard

| Framework | Score | Grade | Status |
|-----------|-------|-------|--------|
| UK GDPR / DPA 2018 | [X]% | [A-F] | [✅ Compliant / ⚠️ Gaps Found / ❌ Non-Compliant] |
| Equality Act 2010 / WCAG | [X]% | [A-F] | [status] |
| PCI-DSS | [X]% | [A-F] | [status] |
| PECR 2003 | [X]% | [A-F] | [status] |
| ICO Age Appropriate Design Code | [X]% | [A-F] | [status] |
| Cyber Essentials / ISO 27001 | [X]% | [A-F] | [status] |
| **Overall** | **[X]%** | **[A-F]** | |

### Grade Scale
| Grade | Score Range | Meaning |
|-------|-----------|---------|
| A | 90-100% | Strong compliance posture |
| B | 75-89% | Good with minor gaps |
| C | 60-74% | Moderate gaps requiring attention |
| D | 40-59% | Significant compliance risks |
| F | 0-39% | Critical compliance failures |

---

## Executive Summary

[3-5 sentences: overall compliance posture, biggest risks, most urgent actions needed]

**Detected Technologies:**
[List all detected analytics, payment, tracking, and third-party services]

**Applicable Frameworks:**
[List which frameworks apply and why]

---

## 🔴 Critical Issues (Fix Immediately)

### [Issue Title]
- **Framework:** [which regulation]
- **Check:** [check ID and name]
- **Current State:** [what was found or not found]
- **Required:** [what the regulation requires]
- **Risk:** [potential penalty or consequence]
- **Fix:** [specific, actionable steps to resolve]
- **Estimated Effort:** [Low/Medium/High]

[Repeat for each critical issue]

---

## 🟡 High Priority Issues (Fix Within 30 Days)

[Same format as critical issues]

---

## 🟡 Medium Priority Issues (Fix Within 90 Days)

[Same format]

---

## 🟢 Low Priority / Best Practices

[Same format, briefer descriptions]

---

## ✅ Passing Checks

[List all passing checks grouped by framework — brief confirmation of compliance]

---

## Framework Detail: UK GDPR / DPA 2018

[Full audit table for UK GDPR / DPA 2018 with all check items, statuses, and notes]

## Framework Detail: Equality Act 2010 / WCAG

[Full audit table]

## Framework Detail: PCI-DSS

[Full audit table]

## Framework Detail: PECR 2003

[Full audit table]

## Framework Detail: ICO Age Appropriate Design Code

[Full audit table]

## Framework Detail: Cyber Essentials / ISO 27001

[Full audit table]

---

## Remediation Roadmap

### Week 1 (Critical)
1. [ ] [specific action]
2. [ ] [specific action]

### Month 1 (High Priority)
1. [ ] [specific action]
2. [ ] [specific action]

### Quarter 1 (Medium Priority)
1. [ ] [specific action]
2. [ ] [specific action]

### Ongoing (Best Practices)
1. [ ] [specific action]
2. [ ] [specific action]

---

## Limitations of This Audit

- This scan evaluates publicly visible compliance signals only
- Backend data handling, internal policies, and employee training were not assessed
- Accessibility checks are surface-level; a full WCAG 2.1 AA audit requires automated tooling, manual testing, and consideration of BS 8878
- PCI-DSS evaluation is limited to visible indicators; full PCI compliance requires a Qualified Security Assessor (QSA) or Self-Assessment Questionnaire (SAQ)
- Cyber Essentials / ISO 27001 compliance cannot be verified without access to the actual certification
- This does not constitute a legal audit and should not be used as evidence of compliance or non-compliance under the laws of England and Wales
```

---

## Phase 5: Present to User

After generating the report:

1. Display the **Compliance Scorecard** prominently
2. Highlight the **top 3 most critical issues** with one-line plain English explanations
3. State how many issues were found at each priority level
4. Show the full report
5. Offer: "Would you like me to generate a privacy policy for this site? Run `/legal privacy [url]`."
6. Offer: "Would you like a detailed review of your terms of service? Run `/legal terms-review [url]`."
