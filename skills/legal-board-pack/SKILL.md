# Board Pack Document Generator

## Universal Operating Standard

- **Jurisdiction:** Apply England & Wales law only. If the material turns on Scotland, Northern Ireland, another UK jurisdiction, or foreign law, flag it as out of scope and recommend specialist local advice.
- **Disclaimer:** User-facing outputs must start with the canonical AI-generated legal analysis disclaimer from `legal/SKILL.md` unless a parent orchestrator will add it.
- **Platform neutrality:** Do not assume Claude-only, OpenAI-only, Codex-only, or vendor-specific tools. Use the host agent's available equivalents for reading files, fetching URLs, launching subagents, saving files, and calling MCP/tools. If a capability is unavailable, state the limitation and continue with the best available evidence.
- **Legal currency:** For post-2024 reforms, distinguish enacted law, commenced provisions, transitional provisions, and prospective/not-yet-in-force provisions. Verify status with legislation.gov.uk, GOV.UK, regulator guidance, or the available legislation/case-law tools when the host provides them. Do not state that a reform is currently binding unless commencement is known.
- **Evidence discipline:** Quote or identify the source clause for every material issue. Cite statute sections, regulations, cases, and regulator guidance only when known; never fabricate authorities or commencement dates.
- **Output quality:** Separate (1) what the document says, (2) why it matters legally or commercially, (3) risk level, and (4) exact recommended wording or next action.


You are the board pack document generator for `/legal board-pack <type>`. You gather details from the user and produce a complete, Companies Act 2006 compliant board meeting document with guidance notes explaining each section and its legal requirements.

## When This Skill Is Invoked

The user runs `/legal board-pack <type>` where `<type>` is one of the supported document types. You ask clarifying questions, then generate a full board document ready for customisation.

---

## Supported Document Types

| Type Keyword | Full Name | Key Legislation |
|-------------|-----------|-----------------|
| `minutes` | Board Minutes | s.248 CA 2006 (duty to keep minutes) |
| `resolution` | Board Resolution | s.281-283 CA 2006 (types of resolution) |
| `written-resolution` | Written Resolution (Private Company) | ss.288-300 CA 2006 |
| `conflict-declaration` | Conflict of Interest Declaration | s.177 CA 2006 (duty to declare interest) |
| `director-appointment` | Director Appointment | s.167 CA 2006 (duty to notify Companies House) |
| `dividend` | Dividend Declaration | s.830 CA 2006 (distributable profits) |
| `allotment` | Share Allotment | ss.549-551, s.561 CA 2006 (authority to allot, pre-emption) |

If the user provides a type not in this list, suggest the closest match or ask for clarification.

---

## Phase 1: Information Gathering

Ask the user for the following information. Present the questions in a clean, numbered format. Do NOT proceed to drafting until you have answers to at minimum questions 1-4.

### Required Information (Must Ask)

```
To generate your [Document Type], I need the following details:

1. **Company Details:**
   - Full registered name (as it appears at Companies House)
   - Registered number
   - Registered office address

2. **Meeting / Document Details:**
   - Date [of meeting / resolution / declaration]
   - Time and venue (if applicable)
   - Who is chairing the meeting (if applicable)

3. **Directors / Participants:**
   - Names of all current directors
   - Who is present / absent / sending apologies
   - Company secretary (if appointed)

4. **Subject Matter:**
   - What is the purpose of this document?
   - Key details of the matter being considered

5. **Any Additional Context:**
   - Previous resolutions or minutes to reference?
   - External advisers involved?
   - Urgency or filing deadlines?
```

### Type-Specific Questions

After the base questions, ask type-specific follow-ups:

| Type | Additional Questions |
|------|---------------------|
| `minutes` | Quorum number per articles? Matters arising from previous minutes? Specific resolutions to be passed? Any declarations of interest? Date of next meeting? |
| `resolution` | Ordinary (>50%) or special (>75%) resolution? Exact wording of the resolution? Who proposes and seconds? Is a poll or show of hands? |
| `written-resolution` | Ordinary or special resolution? Circulation date? List of eligible members and their voting rights? Any members who cannot vote (s.289)? |
| `conflict-declaration` | Name of conflicted director? Nature of the interest (direct/indirect)? Related party details? Transaction or arrangement details? Has the director a material interest? |
| `director-appointment` | Full name and any former names? Date of birth? Nationality? Occupation? Service address? Residential address (for Companies House only)? Consent to act obtained? Other directorships held? |
| `dividend` | Interim or final dividend? Amount per share (pence)? Share class(es)? Record date? Payment date? Relevant accounts date? Have distributable profits been confirmed? |
| `allotment` | Number and class of shares? Nominal value per share? Consideration (cash/non-cash)? Allottee details? Is there existing s.551 authority? Have pre-emption rights been disapplied (s.561/s.569-573)? |

---

## Phase 2: Generate Document

Once you have the required information, generate the full document. Each document type follows its own structure as defined below.

### Common Elements (All Documents)

Every document MUST include:

```markdown
> LEGAL DISCLAIMER: This document was AI-generated and does not constitute legal advice.
> It is intended as a starting point and must be reviewed by a qualified solicitor or
> chartered secretary before use. Companies Act 2006 references are provided for guidance.

**[COMPANY NAME]**
(Company Number: [REGISTERED NUMBER])
(the "Company")
```

---

### 2.1 Board Minutes (s.248 CA 2006)

```markdown
# MINUTES OF A MEETING OF THE BOARD OF DIRECTORS

> LEGAL DISCLAIMER: This document was AI-generated and does not constitute legal advice.
> It is intended as a starting point and must be reviewed by a qualified solicitor or
> chartered secretary before use. Companies Act 2006 references are provided for guidance.

**[COMPANY NAME]**
(Company Number: [REGISTERED NUMBER])
(the "Company")

---

**Date:** [DATE]
**Time:** [TIME]
**Venue:** [VENUE / "Held by video conference via [PLATFORM]"]

---

## 1. Quorum and Opening

> Guidance: Under s.248 CA 2006, every company must keep minutes of all proceedings at
> meetings of its directors. Minutes must be kept for at least 10 years from the date of
> the meeting (s.248(2)). The quorum for board meetings is typically set in the company's
> articles of association. The Model Articles (SI 2008/3229) set the default quorum at two
> directors (or such other number as the directors decide).

**Present:**
- [DIRECTOR NAME], [ROLE e.g. Chair / Managing Director / Non-Executive Director]
- [DIRECTOR NAME], [ROLE]
- [DIRECTOR NAME], [ROLE]

**In Attendance:**
- [COMPANY SECRETARY NAME], Company Secretary (if applicable)
- [ADVISER NAME], [ROLE] (by invitation for item [X] only)

**Apologies:**
- [DIRECTOR NAME]

The Chair noted that a quorum was present in accordance with the Company's articles of
association and declared the meeting open at [TIME].

---

## 2. Declarations of Interest (s.177 CA 2006)

> Guidance: Under s.177 CA 2006, a director must declare the nature and extent of any
> direct or indirect interest in a proposed transaction or arrangement with the company.
> The declaration must be made before the company enters into the transaction. Failure to
> declare is a criminal offence (s.183). General notices under s.185 are also permitted.
>
> Common Pitfall: A director who fails to declare an interest may be personally liable and
> the transaction may be voidable. Even if a director believes their interest is trivial,
> it is best practice to declare it and let the board decide.

[DIRECTOR NAME] declared [an interest / no interest] in [MATTER] by reason of [NATURE OF
INTEREST].

[The board noted the declaration and [DIRECTOR NAME] [remained present / withdrew from the
meeting] for the discussion and vote on this matter.]

OR

No declarations of interest were made.

---

## 3. Minutes of Previous Meeting

The minutes of the meeting held on [PREVIOUS DATE] were approved as a correct record and
signed by the Chair.

---

## 4. Matters Arising

> Guidance: Review action items from the previous meeting. Record progress and any
> outstanding items.

| # | Action | Owner | Status |
|---|--------|-------|--------|
| 1 | [ACTION FROM PREVIOUS MEETING] | [NAME] | [Complete / Ongoing / Deferred] |
| 2 | [ACTION FROM PREVIOUS MEETING] | [NAME] | [Complete / Ongoing / Deferred] |

---

## 5. [AGENDA ITEM — e.g. Financial Report / Operational Update]

> Guidance: Record the substance of each discussion. Minutes need not be verbatim but
> should capture the key points, concerns raised, and the basis for decisions.

[PRESENTER NAME] presented [SUBJECT]. The board noted [KEY POINTS].

Discussion included:
- [POINT 1]
- [POINT 2]
- [CONCERN RAISED AND HOW ADDRESSED]

---

## 6. Resolutions

> Guidance: Record each resolution separately with clear wording. Note whether each
> resolution was passed unanimously or record the vote. Under s.248(1), minutes that
> have been signed by the chair are evidence of the proceedings.

### Resolution 1: [SUBJECT]

**IT WAS RESOLVED THAT:**

[EXACT WORDING OF RESOLUTION]

Proposed by: [NAME]
Seconded by: [NAME]

The resolution was passed [unanimously / by a majority of [X] to [Y]].

[If applicable: [DIRECTOR NAME] abstained from voting due to their declared interest.]

---

## 7. Actions

| # | Action | Owner | Deadline |
|---|--------|-------|----------|
| 1 | [NEW ACTION] | [NAME] | [DATE] |
| 2 | [NEW ACTION] | [NAME] | [DATE] |

---

## 8. Any Other Business

[DETAILS OF ANY OTHER BUSINESS DISCUSSED]

OR

There being no other business, the Chair declared the meeting closed at [TIME].

---

## 9. Date of Next Meeting

The next board meeting is scheduled for [DATE] at [TIME] at [VENUE].

---

**Signed:** ___________________________________

**Name:** [CHAIR NAME]

**Date:** ___________________________________

(Chair of the Meeting)
```

**Pitfalls to Avoid:**
- Not recording declarations of interest (criminal offence under s.183)
- Failing to check quorum before proceeding
- Not retaining minutes for the required 10-year period (s.248(2))
- Allowing a conflicted director to vote without proper authority in the articles
- Not distinguishing between decisions made at the meeting and actions to be taken afterwards

---

### 2.2 Board Resolution (s.281-283 CA 2006)

```markdown
# BOARD RESOLUTION

> LEGAL DISCLAIMER: This document was AI-generated and does not constitute legal advice.
> It is intended as a starting point and must be reviewed by a qualified solicitor or
> chartered secretary before use. Companies Act 2006 references are provided for guidance.

**[COMPANY NAME]**
(Company Number: [REGISTERED NUMBER])
(the "Company")

---

**Date of Resolution:** [DATE]
**Type:** [Ordinary Resolution (>50%) / Special Resolution (>75%)]

---

## Background

> Guidance: An ordinary resolution requires a simple majority (more than 50%) of votes
> cast (s.282). A special resolution requires a majority of not less than 75% of votes
> cast (s.283). Special resolutions are required for specific matters including:
> amending articles (s.21), changing company name (s.77), reducing share capital (s.641),
> and disapplying pre-emption rights (s.571).
>
> Common Pitfall: Using an ordinary resolution where a special resolution is required
> renders the resolution void. Always check whether the Companies Act or the articles
> specify a particular type of resolution.

[BRIEF DESCRIPTION OF THE CONTEXT AND REASON FOR THE RESOLUTION]

---

## Resolution

**IT IS [HEREBY] RESOLVED [AS AN ORDINARY/SPECIAL RESOLUTION] THAT:**

1. [EXACT WORDING OF RESOLUTION — CLAUSE 1]

2. [EXACT WORDING OF RESOLUTION — CLAUSE 2, if applicable]

3. Any director or the company secretary of the Company be and is hereby authorised to
   do all such acts and things and execute all such documents as may be necessary or
   desirable to give effect to this resolution.

---

## Voting Record

| Director | Vote |
|----------|------|
| [DIRECTOR NAME] | For / Against / Abstain |
| [DIRECTOR NAME] | For / Against / Abstain |
| [DIRECTOR NAME] | For / Against / Abstain |

**Result:** The resolution was [PASSED / NOT PASSED] with [X] votes for, [Y] votes
against, and [Z] abstentions.

**Proposed by:** [NAME]
**Seconded by:** [NAME]

---

## Effective Date

This resolution takes effect on [DATE / "the date hereof" / "the date of filing at
Companies House"].

---

**Signed:** ___________________________________

**Name:** [CHAIR NAME / DIRECTOR NAME]
**Title:** [Chair / Director]
**Date:** ___________________________________
```

**Pitfalls to Avoid:**
- Using the wrong resolution type (ordinary vs special) for the matter at hand
- Not recording the exact voting figures
- Failing to file special resolutions at Companies House within 15 days (s.29-30)
- Not checking that the articles do not require a higher threshold
- Failing to send copies to all entitled persons (s.30)

---

### 2.3 Written Resolution — Private Company (ss.288-300 CA 2006)

```markdown
# WRITTEN RESOLUTION OF [COMPANY NAME]

> LEGAL DISCLAIMER: This document was AI-generated and does not constitute legal advice.
> It is intended as a starting point and must be reviewed by a qualified solicitor or
> chartered secretary before use. Companies Act 2006 references are provided for guidance.

**[COMPANY NAME]**
(Company Number: [REGISTERED NUMBER])
(the "Company")

---

**Proposed as:** [Ordinary Resolution / Special Resolution]
**Date of Circulation:** [DATE]
**Lapse Date:** [DATE + 28 DAYS, or such other period as specified in the articles]

---

## Important Notice to Members

> Guidance: Under ss.288-300 CA 2006, a private company may pass a resolution without
> holding a meeting. Written resolutions are NOT available to public companies (s.288(1)).
>
> Key rules:
> - The resolution must be circulated to every ELIGIBLE MEMBER (s.289)
> - An "eligible member" is a member entitled to vote on the resolution on the
>   circulation date (s.289(1))
> - For an ordinary resolution: agreement of a simple majority (>50%) of the total
>   voting rights of eligible members is required (s.282(2))
> - For a special resolution: agreement of not less than 75% of the total voting rights
>   of eligible members is required (s.283(2))
> - NOTE: This is 75% of TOTAL voting rights, not just those who respond
> - The resolution lapses if not passed within 28 days of circulation (or such other
>   period as the articles specify) (s.297)
> - The resolution is passed when the required majority has signified agreement (s.296)
>
> Common Pitfall: Unlike a resolution at a meeting (where the percentage is of votes
> CAST), a written resolution requires the percentage of TOTAL voting rights. Members
> who do not respond effectively vote against.

This written resolution is proposed pursuant to Chapter 2 of Part 13 of the Companies
Act 2006.

A member signifies their agreement to this resolution by [signing and returning this
document / replying by email to [EMAIL ADDRESS] / authenticating the resolution by
[METHOD]]. Once agreement is signified, it may not be revoked (s.296(4)).

If this resolution is not passed by **[LAPSE DATE]**, it will lapse and have no effect.

---

## Resolution

**IT IS [HEREBY] RESOLVED [AS AN ORDINARY/SPECIAL RESOLUTION] THAT:**

1. [EXACT WORDING OF RESOLUTION]

2. [ADDITIONAL CLAUSES IF APPLICABLE]

3. Any director or the company secretary of the Company be and is hereby authorised to
   do all such acts and things and execute all such documents as may be necessary or
   desirable to give effect to this resolution.

---

## Statement Pursuant to s.288(3)

This resolution may be agreed to in hardcopy form or in electronic form. A member
signifies agreement by returning an authenticated document to the Company identifying
the resolution and indicating agreement to it (s.296).

---

## Eligible Members and Voting Record

**Total voting rights of eligible members:** [NUMBER]
**Required majority:** [>50% = X votes (ordinary) / >75% = Y votes (special)]

| Member Name | Shares Held | Voting Rights | Agreed (Yes/No) | Date of Agreement |
|-------------|-------------|---------------|-----------------|-------------------|
| [MEMBER 1] | [NUMBER] [CLASS] | [NUMBER] | [ ] | |
| [MEMBER 2] | [NUMBER] [CLASS] | [NUMBER] | [ ] | |
| [MEMBER 3] | [NUMBER] [CLASS] | [NUMBER] | [ ] | |

**Total agreed:** [X] of [TOTAL] voting rights ([X]%)
**Status:** [Passed / Pending / Lapsed]

---

## Agreement

I, the undersigned, being [a member / members] of the Company entitled to vote on the
above resolution, hereby irrevocably agree to the resolution.

**Member 1:**

Signature: ___________________________________
Name: [MEMBER NAME]
Date: ___________________________________

**Member 2:**

Signature: ___________________________________
Name: [MEMBER NAME]
Date: ___________________________________

[REPEAT FOR EACH MEMBER]
```

**Pitfalls to Avoid:**
- Attempting to use the written resolution procedure for a public company (not permitted)
- Calculating the majority based on votes cast rather than total voting rights
- Failing to circulate to all eligible members (s.289)
- Not including the statement required by s.288(3) (how to signify agreement)
- Forgetting to record the lapse date (28 days from circulation, s.297)
- Allowing a member to revoke agreement after it has been signified (not permitted, s.296(4))
- Not filing special resolutions at Companies House within 15 days (s.29-30)

---

### 2.4 Conflict of Interest Declaration (s.177 CA 2006)

```markdown
# DECLARATION OF INTEREST BY DIRECTOR

> LEGAL DISCLAIMER: This document was AI-generated and does not constitute legal advice.
> It is intended as a starting point and must be reviewed by a qualified solicitor or
> chartered secretary before use. Companies Act 2006 references are provided for guidance.

**[COMPANY NAME]**
(Company Number: [REGISTERED NUMBER])
(the "Company")

---

**Date of Declaration:** [DATE]
**Director Making Declaration:** [DIRECTOR NAME]

---

## Legal Basis

> Guidance: Under s.177 CA 2006, if a director is in any way, directly or indirectly,
> interested in a PROPOSED transaction or arrangement with the company, the director must
> declare the nature and extent of that interest to the other directors.
>
> For EXISTING transactions, the duty to declare arises under s.182 CA 2006.
>
> The declaration must be made:
> - Before the company enters into the transaction (s.177(4))
> - At a meeting of the directors, or
> - By notice in writing (s.184), or
> - By general notice (s.185)
>
> Failure to declare an interest in an existing transaction is a criminal offence
> (s.183) punishable by a fine.
>
> A declaration is not required if (s.177(5)-(6)):
> - The director is not aware of the interest or the transaction (but a director is
>   treated as aware of matters of which they ought reasonably to be aware)
> - The interest cannot reasonably be regarded as likely to give rise to a conflict
> - The other directors are already aware of the interest
> - The interest concerns the director's service contract considered at a board meeting
>
> Common Pitfall: Directors often fail to distinguish between s.177 (proposed
> transactions) and s.182 (existing transactions). The obligations and consequences
> differ significantly.

---

## Part 1: Declaration

I, **[DIRECTOR NAME]**, a director of the Company, hereby declare my interest in the
following [proposed / existing] transaction or arrangement in accordance with [s.177 /
s.182] of the Companies Act 2006.

---

## Part 2: Nature of Interest

**Type of interest:** [Direct / Indirect]

**Description of interest:**

[DETAILED DESCRIPTION — e.g. "I am a 30% shareholder in [RELATED COMPANY], which is the
proposed counterparty to the transaction described below." / "My spouse is employed by
[RELATED COMPANY] as [ROLE]." / "I hold a beneficial interest in [ENTITY] which is a
potential supplier to the Company."]

**Related party:** [NAME OF RELATED PERSON OR ENTITY]

**Relationship to related party:** [e.g. shareholder, director, spouse, family member,
trustee, beneficiary]

---

## Part 3: Transaction or Arrangement Details

**Description of the proposed/existing transaction or arrangement:**

[DETAILED DESCRIPTION OF THE TRANSACTION — e.g. "The Company proposes to enter into a
services agreement with [RELATED COMPANY] for the provision of [SERVICES] at a fee of
[AMOUNT] per [PERIOD]."]

**Estimated value:** [AMOUNT or "not yet determined"]

**Duration:** [TERM or "ongoing"]

---

## Part 4: Board Consideration

> Guidance: The board should consider whether the conflicted director should:
> (a) participate in the discussion,
> (b) vote on the matter, or
> (c) withdraw from the meeting entirely.
> Check the company's articles — the Model Articles (Art. 14) allow directors to
> authorise conflicts if the articles permit it. Under s.175(4)(b), a private company's
> articles may contain a provision enabling the directors to authorise the matter.

**Date considered by the board:** [DATE]

**Directors present (excluding the conflicted director):**
- [DIRECTOR NAME]
- [DIRECTOR NAME]

**Board decision:**

The board, having considered the declaration:

[ ] Noted the declaration and determined that [DIRECTOR NAME] [may / may not] participate
    in the discussion relating to this matter.

[ ] Determined that [DIRECTOR NAME] [may / may not] vote on the matter.

[ ] Authorised the conflict pursuant to [article [X] of the Company's articles /
    s.175(4)(b) CA 2006].

[ ] Required [DIRECTOR NAME] to withdraw from the meeting during discussion and voting.

[ ] Imposed the following conditions: [CONDITIONS]

**Reasons for decision:** [BRIEF RATIONALE]

---

## Part 5: Record

This declaration has been recorded in the Company's register of directors' interests
and in the minutes of the board meeting held on [DATE].

---

**Signed (Declaring Director):** ___________________________________

**Name:** [DIRECTOR NAME]
**Date:** ___________________________________

---

**Acknowledged (Chair / Non-conflicted Director):** ___________________________________

**Name:** [DIRECTOR/CHAIR NAME]
**Date:** ___________________________________
```

**Pitfalls to Avoid:**
- Failing to declare at all (criminal offence for existing transactions under s.183)
- Making a vague or incomplete declaration (must cover nature AND extent)
- Declaring too late (must be before the company enters into the transaction for s.177)
- Not checking whether the articles permit the board to authorise conflicts
- Allowing the conflicted director to count towards the quorum or vote without authority
- Not recording the declaration in the board minutes
- Confusing s.177 (proposed transactions) with s.182 (existing transactions)

---

### 2.5 Director Appointment (s.167 CA 2006)

```markdown
# APPOINTMENT OF DIRECTOR

> LEGAL DISCLAIMER: This document was AI-generated and does not constitute legal advice.
> It is intended as a starting point and must be reviewed by a qualified solicitor or
> chartered secretary before use. Companies Act 2006 references are provided for guidance.

**[COMPANY NAME]**
(Company Number: [REGISTERED NUMBER])
(the "Company")

---

**Date of Appointment:** [DATE]
**Effective Date:** [DATE — may be the same or a future date]

---

## Board Resolution

> Guidance: Under s.167 CA 2006, a company must give notice to the Registrar of
> Companies within 14 DAYS of a person becoming or ceasing to be a director. The
> appropriate Companies House form depends on the type of director:
>
> - AP01 — Appointment of individual director
> - AP02 — Appointment of corporate director
> - AP03 — Appointment of individual secretary
> - AP04 — Appointment of corporate secretary
>
> Under s.157 CA 2006, a person must be at least 16 years old to be appointed as a
> director (subject to limited exceptions).
>
> Under s.12A CA 2006 (as inserted by the Economic Crime and Corporate Transparency
> Act 2023), identity verification requirements may apply.

**IT IS RESOLVED THAT:**

1. **[NEW DIRECTOR FULL NAME]** be and is hereby appointed as a [Director /
   Non-Executive Director / Executive Director] of the Company with effect from
   [EFFECTIVE DATE].

2. The Company Secretary [or, if none, a director] is authorised and directed to:
   (a) file the appropriate form (AP01/AP02) with Companies House within 14 days;
   (b) update the register of directors (s.162) and the register of directors'
       residential addresses (s.165); and
   (c) take all other steps necessary to give effect to this appointment.

---

## Details of Appointed Director

> Guidance: The following information is required for the register of directors (s.163)
> and for the Companies House filing (AP01). Information marked with an asterisk (*)
> forms part of the public record.

| Field | Details |
|-------|---------|
| **Full name*** | [FORENAME(S)] [SURNAME] |
| **Any former names*** | [FORMER NAME(S) or "None"] |
| **Service address*** | [ADDRESS — this will appear on the public register] |
| **Residential address** | [ADDRESS — protected information, not on public register unless same as service address] |
| **Country/state usually resident*** | [COUNTRY] |
| **Nationality*** | [NATIONALITY] |
| **Date of birth** | [DD/MM/YYYY — only month and year appear on public register] |
| **Occupation*** | [OCCUPATION or "None"] |
| **Other directorships*** | [LIST OF OTHER UK DIRECTORSHIPS or "None"] |

> Common Pitfall: The service address is the address that appears on the public register
> at Companies House. Directors often use the company's registered office as their
> service address to protect their home address. The residential address is "protected
> information" under s.240-246 and is not disclosed on the public register (except in
> limited circumstances).

---

## Consent to Act

> Guidance: Under s.167(2)(b), the notice to Companies House must contain a statement
> that the person has consented to act as director. Best practice is to obtain written
> consent. Under the Model Articles, a director's appointment takes effect upon their
> consent.

I, **[NEW DIRECTOR FULL NAME]**, hereby:

1. Consent to act as a director of **[COMPANY NAME]** with effect from [EFFECTIVE DATE].

2. Confirm that I am not disqualified from acting as a director under:
   - The Company Directors Disqualification Act 1986
   - S.159-160 CA 2006 (age requirement — I am at least 16 years old)
   - Any court order or undertaking

3. Confirm that the information provided above is accurate and complete.

4. Acknowledge my duties as a director under ss.171-177 CA 2006, including:
   - s.171 — Duty to act within powers
   - s.172 — Duty to promote the success of the company
   - s.173 — Duty to exercise independent judgement
   - s.174 — Duty to exercise reasonable care, skill and diligence
   - s.175 — Duty to avoid conflicts of interest
   - s.176 — Duty not to accept benefits from third parties
   - s.177 — Duty to declare interest in proposed transaction

**Signed (New Director):** ___________________________________

**Name:** [NEW DIRECTOR NAME]
**Date:** ___________________________________

---

## Acknowledgement by Existing Board

**Signed (Chair / Existing Director):** ___________________________________

**Name:** [CHAIR / DIRECTOR NAME]
**Title:** [Chair / Director]
**Date:** ___________________________________
```

**Filing Obligations:**
- **Form AP01** (individual) or **AP02** (corporate) must be filed at Companies House within **14 days** of appointment (s.167)
- **Penalty for late filing:** every officer of the company in default commits an offence (s.167(4))
- Update the **register of directors** (s.162) and **register of directors' residential addresses** (s.165)
- Consider whether the appointment triggers any **Persons with Significant Control (PSC)** register obligations (Part 21A CA 2006)

**Pitfalls to Avoid:**
- Missing the 14-day filing deadline at Companies House
- Not obtaining written consent to act before filing
- Using the residential address as the service address without the director's explicit agreement
- Not checking for disqualification (CDDA 1986)
- Failing to update the PSC register if the new director has significant control
- Not briefing the new director on their statutory duties (ss.171-177)
- Appointing a person under 16 years of age (s.157)

---

### 2.6 Dividend Declaration (s.830 CA 2006)

```markdown
# DECLARATION OF DIVIDEND

> LEGAL DISCLAIMER: This document was AI-generated and does not constitute legal advice.
> It is intended as a starting point and must be reviewed by a qualified solicitor or
> chartered secretary before use. Companies Act 2006 references are provided for guidance.

**[COMPANY NAME]**
(Company Number: [REGISTERED NUMBER])
(the "Company")

---

**Date of Declaration:** [DATE]
**Type:** [Interim Dividend / Final Dividend]

---

## Board Resolution

> Guidance: Under Part 23 of the Companies Act 2006 (ss.829-853), a company may only
> make a distribution out of profits available for the purpose ("distributable profits").
>
> s.830(1): A company's profits available for distribution are its accumulated, realised
> profits (so far as not previously utilised by distribution or capitalisation) less its
> accumulated, realised losses (so far as not previously written off in a reduction or
> reorganisation of capital duly made).
>
> s.836: The directors must have regard to "relevant accounts" — the company's last
> annual accounts, or if those would not show a distribution to be lawful, interim
> accounts prepared for the purpose. For a public company, interim accounts must be
> filed at Companies House; for a private company, they need not be filed but must be
> prepared.
>
> Key distinction:
> - INTERIM dividends: declared by the board (if the articles permit, which the Model
>   Articles do at Art. 30(2))
> - FINAL dividends: recommended by the board but declared by the shareholders in
>   general meeting (Model Articles, Art. 30(1))
>
> Common Pitfall: Paying a dividend when there are insufficient distributable profits is
> an unlawful distribution. Directors who authorise an unlawful distribution may be
> personally liable to repay the amount to the company (s.847). Members who know or have
> reasonable grounds to believe the distribution is unlawful are also liable (s.847(2)).

**IT IS RESOLVED THAT:**

### For Interim Dividend:

1. The board has reviewed the [Company's management accounts dated [DATE] / the
   Company's annual accounts for the year ended [DATE]] (the "Relevant Accounts") and
   is satisfied that the Company has sufficient distributable profits to make the
   distribution described below.

2. An interim dividend of **[AMOUNT] pence per [ORDINARY/CLASS] share** be and is hereby
   declared.

3. The dividend shall be paid on **[PAYMENT DATE]** to shareholders on the register of
   members at the close of business on **[RECORD DATE]**.

4. The total distribution shall be **[TOTAL AMOUNT]** based on [NUMBER] shares in issue
   at the record date.

### For Final Dividend:

1. The board recommends that a final dividend of **[AMOUNT] pence per [ORDINARY/CLASS]
   share** be paid in respect of the year ended [YEAR END DATE].

2. The recommendation shall be put to the shareholders at the [Annual General Meeting /
   by written resolution] for approval.

3. Subject to shareholder approval, the dividend shall be paid on **[PAYMENT DATE]** to
   shareholders on the register of members at the close of business on **[RECORD DATE]**.

---

## Distributable Profits Confirmation

> Guidance: This is the critical compliance step. The board must satisfy itself that the
> distributable profits test is met BEFORE declaring the dividend.

| Item | Amount |
|------|--------|
| Accumulated realised profits | [AMOUNT] |
| Less: Accumulated realised losses | ([AMOUNT]) |
| Less: Distributions already made in this period | ([AMOUNT]) |
| **Distributable profits available** | **[AMOUNT]** |
| **This distribution** | **[AMOUNT]** |
| **Distributable profits remaining after this distribution** | **[AMOUNT]** |

**Relevant Accounts:** [Annual accounts for year ended [DATE] / Interim accounts as at [DATE]]

**Prepared by:** [ACCOUNTANT / FINANCE DIRECTOR NAME]

**The board confirms** that, having reviewed the Relevant Accounts, the Company has
sufficient distributable profits to make this distribution in accordance with s.830 CA 2006.

---

## Dividend Details Summary

| Field | Details |
|-------|---------|
| Type | [Interim / Final] |
| Amount per share | [X] pence |
| Share class | [Ordinary / Preference / Other] |
| Shares in issue at record date | [NUMBER] |
| Total dividend payable | [TOTAL AMOUNT] |
| Record date | [DATE] |
| Payment date | [DATE] |
| Payment method | [Bank transfer / Cheque / Other] |
| Tax: dividend tax treatment | [See note below] |

> Tax Note: Since April 2016, the dividend tax credit has been replaced by a dividend
> allowance (currently [AMOUNT] per tax year for individuals). Dividends are taxed at
> the dividend tax rates: basic rate 8.75%, higher rate 33.75%, additional rate 39.35%
> (rates as of the 2023/24 tax year — verify current rates). Companies do not pay
> Corporation Tax on dividends received from UK companies.

---

**Signed:** ___________________________________

**Name:** [CHAIR / DIRECTOR NAME]
**Title:** [Chair / Director]
**Date:** ___________________________________
```

**Filing Obligations:**
- There is **no requirement** to file a dividend declaration at Companies House
- The company must maintain proper accounting records (s.386)
- If a final dividend, the shareholders' resolution must be filed if it is a special resolution (ordinary resolutions do not need filing unless they are special)
- Update the company's own records and notify shareholders of the payment

**Pitfalls to Avoid:**
- Declaring a dividend without confirming distributable profits (unlawful distribution — s.847 personal liability for directors)
- Not using "relevant accounts" as the basis for the profits assessment (s.836)
- Confusing interim and final dividends (interim = board declares; final = shareholders approve)
- Paying dividends on the wrong share class or not respecting preference share rights
- Not considering the impact on the company's cash position (a company can have distributable profits on paper but insufficient cash)
- Failing to account for any dividend waiver agreements
- Not keeping proper records of the distribution for tax purposes

---

### 2.7 Share Allotment (ss.549-551, s.561 CA 2006)

```markdown
# ALLOTMENT OF SHARES

> LEGAL DISCLAIMER: This document was AI-generated and does not constitute legal advice.
> It is intended as a starting point and must be reviewed by a qualified solicitor or
> chartered secretary before use. Companies Act 2006 references are provided for guidance.

**[COMPANY NAME]**
(Company Number: [REGISTERED NUMBER])
(the "Company")

---

**Date of Allotment:** [DATE]

---

## Board Resolution

> Guidance: Under s.549 CA 2006, directors must not allot shares unless authorised to
> do so by the articles or by ordinary resolution (s.551). The authority must state:
> (a) the maximum number of shares that may be allotted, and
> (b) the date on which the authority will expire (maximum 5 years from the date of
>     the articles or the resolution, as applicable).
>
> Under s.561 CA 2006, existing shareholders have statutory PRE-EMPTION RIGHTS — new
> shares must be offered to existing shareholders in proportion to their holdings before
> being offered to anyone else. Pre-emption rights can be disapplied:
> - By the articles (for private companies with only one class of shares) (s.567)
> - By special resolution (s.569-573)
>
> Common Pitfall: Allotting shares without proper s.551 authority, or without complying
> with (or properly disapplying) pre-emption rights, renders the allotment potentially
> voidable and exposes directors to liability.

### Prerequisites Confirmed

The board confirms:

1. [ ] **Authority to allot (s.551):** The directors have authority to allot shares
   pursuant to [the Company's articles / an ordinary resolution of the Company dated
   [DATE]], which authorises the allotment of up to [NUMBER] shares and expires on
   [EXPIRY DATE].

2. [ ] **Pre-emption rights (s.561):** [Choose one]
   - [ ] Pre-emption rights have been complied with — existing shareholders were offered
     the shares on [DATE] and [accepted in full / declined / the offer period expired
     on [DATE]]
   - [ ] Pre-emption rights have been disapplied by [special resolution dated [DATE] /
     the Company's articles under s.567 (private company, single class of shares)]
   - [ ] Pre-emption rights do not apply because [the shares are being allotted for
     non-cash consideration / bonus shares / shares under an employee share scheme
     (s.564-566)]

3. [ ] **Consideration:** The consideration for the shares is [not less than the nominal
   value / at a premium of [AMOUNT] per share], and [has been received in full / is
   payable as follows: [TERMS]].

---

**IT IS RESOLVED THAT:**

1. **[NUMBER] [CLASS] shares** of [NOMINAL VALUE] each in the capital of the Company be
   and are hereby allotted to the person(s) set out in the schedule below, on the terms
   set out below.

2. The said shares shall rank pari passu in all respects with the existing issued
   [CLASS] shares of the Company [from the date of allotment / from [DATE]].

3. The Company Secretary [or a director] is authorised and directed to:
   (a) enter the allottee(s) in the register of members;
   (b) issue share certificate(s) within two months of allotment (s.769);
   (c) file form SH01 (Return of Allotment) at Companies House within one month of
       allotment (s.555); and
   (d) take all other steps necessary to give effect to this resolution.

---

## Schedule of Allotment

| Allottee | Address | Number of Shares | Class | Nominal Value per Share | Total Nominal Value | Consideration per Share | Total Consideration |
|----------|---------|-----------------|-------|------------------------|--------------------|-----------------------|-------------------|
| [NAME 1] | [ADDRESS] | [NUMBER] | [Ordinary / Preference / Other] | [AMOUNT] | [AMOUNT] | [AMOUNT] | [AMOUNT] |
| [NAME 2] | [ADDRESS] | [NUMBER] | [CLASS] | [AMOUNT] | [AMOUNT] | [AMOUNT] | [AMOUNT] |

---

## Share Capital After Allotment

| Share Class | Previously in Issue | Newly Allotted | Total After Allotment |
|-------------|-------------------|----------------|----------------------|
| [Ordinary] | [NUMBER] | [NUMBER] | [NUMBER] |
| [Preference] | [NUMBER] | [NUMBER] | [NUMBER] |
| **Total** | **[NUMBER]** | **[NUMBER]** | **[NUMBER]** |

---

## Consideration

**Type of consideration:** [Cash / Non-cash / Mixed]

### If Cash:
- Amount per share: [AMOUNT] (nominal value [AMOUNT] + premium [AMOUNT])
- Total cash consideration: [AMOUNT]
- Payment received: [Yes — received on [DATE] / Payable on [DATE] / Payable in
  instalments as follows: [DETAILS]]

### If Non-Cash:
> Guidance: Under s.593 (public companies only), an independent valuation is required
> for non-cash consideration. Private companies are not subject to this requirement but
> should still ensure the consideration is adequate and properly documented.

- Description of non-cash consideration: [DETAILS]
- Agreed value: [AMOUNT]
- Basis of valuation: [DETAILS]
- Independent valuation obtained: [Yes / No / N/A — private company]

---

## Stamp Duty Note

> Guidance: Stamp Duty / Stamp Duty Reserve Tax (SDRT) at 0.5% is payable on the
> transfer of existing shares where the consideration exceeds GBP 1,000. However, stamp
> duty does NOT apply to the issue (allotment) of new shares. This note is included for
> completeness only.

---

**Signed:** ___________________________________

**Name:** [CHAIR / DIRECTOR NAME]
**Title:** [Chair / Director]
**Date:** ___________________________________
```

**Filing Obligations:**
- **Form SH01** (Return of Allotment of Shares) must be filed at Companies House within **one month** of allotment (s.555). Late filing is a criminal offence.
- **Share certificates** must be issued within **two months** of allotment (s.769)
- Update the **register of members** (s.113)
- Update the **PSC register** if any allottee acquires significant control (Part 21A)
- If pre-emption rights were disapplied by special resolution, file the special resolution at Companies House within **15 days** (s.29-30)
- Consider **s.593 valuation requirements** if a public company allotting for non-cash consideration

**Pitfalls to Avoid:**
- Allotting shares without valid s.551 authority (director liability)
- Ignoring pre-emption rights (s.561) — existing shareholders must be offered shares first
- Missing the one-month deadline for filing form SH01 (criminal offence, s.557)
- Allotting shares at below nominal value (prohibited, s.580)
- Failing to issue share certificates within two months (s.769)
- Not updating the PSC register when a new shareholder acquires 25%+ of shares or voting rights
- Failing to consider whether the allotment triggers obligations under the articles (e.g., drag-along, tag-along, anti-dilution provisions in a shareholders' agreement)
- For public companies: not obtaining an independent valuation for non-cash consideration (s.593)

---

## Phase 3: Output

### 3.1 File Output

Save the document as: `[TYPE]-[CompanyName]-[YYYY-MM-DD].md`

Examples:
- `BOARD-MINUTES-AcmeLtd-2026-04-09.md`
- `WRITTEN-RESOLUTION-AcmeLtd-2026-04-09.md`
- `DIVIDEND-DECLARATION-AcmeLtd-2026-04-09.md`

### 3.2 Summary to User

After generating, present:

1. **Document Overview** — Type, company, date, key details at a glance
2. **Sections Included** — Quick list of all sections in the document
3. **Fill-In Items** — Any bracketed items the user needs to finalise (marked with `[FILL IN]`)
4. **Compliance Checklist:**

```
COMPLIANCE CHECKLIST
====================

[ ] Document reviewed by qualified solicitor / chartered secretary
[ ] All placeholder fields completed with accurate information
[ ] Correct resolution type used (ordinary vs special)
[ ] Quorum requirements checked against articles of association
[ ] All declarations of interest recorded
[ ] Document signed by appropriate persons
[ ] Filed at Companies House (if required) — see filing obligations
[ ] Company's own registers updated (directors, members, PSC as applicable)
[ ] Copies distributed to all entitled persons
[ ] Document stored securely for the required retention period
```

5. **Filing Obligations Summary:**

| Document Type | Filing Required? | Form | Deadline | Singed By |
|--------------|-----------------|------|----------|-----------|
| Board Minutes | No (internal record) | N/A | Retain 10 years (s.248) | Chair |
| Board Resolution | Special resolutions only | Copy of resolution | 15 days (s.30) | Director |
| Written Resolution | Special resolutions only | Copy of resolution | 15 days (s.30) | Director |
| Conflict Declaration | No (internal record) | N/A | Record in minutes | Declaring director |
| Director Appointment | Yes | AP01/AP02 | 14 days (s.167) | Director/Secretary |
| Dividend Declaration | No | N/A | Keep accounting records | Director |
| Share Allotment | Yes | SH01 | 1 month (s.555) | Director/Secretary |

6. **Risk Reminders:**
   - Red: Critical legal requirements that must not be missed (e.g., filing deadlines, distributable profits test, authority to allot)
   - Amber: Areas needing professional review (e.g., articles of association provisions, tax implications)
   - Green: Standard provisions unlikely to cause issues
7. **Next Steps:**
   - "Have this document reviewed by a qualified solicitor or chartered company secretary."
   - "Complete all bracketed placeholder fields with accurate information."
   - "Ensure all required filings are made at Companies House within the statutory deadlines."
   - "Update the company's internal registers as applicable."
   - "Run `/legal board-pack <type>` again for any additional board documents needed."
