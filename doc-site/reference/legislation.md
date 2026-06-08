# UK Legislation Reference

This page catalogues every UK statute referenced by the AI Legal Assistant, organised by legal area. Each entry includes the full name, common abbreviation used in the tool, and which skills reference it.

::: info Jurisdiction
All legislation listed here applies to **England & Wales** only. Scottish and Northern Irish equivalents are intentionally excluded from the tool suite.
:::

::: warning Commencement — 2025 reforms are not all in force
Several Acts catalogued below received Royal Assent in 2025 but commence **in phases**, not on a single switch-on date. In particular, the **Employment Rights Act 2025**, the **Renters' Rights Act 2025** (Royal Assent 27 October 2025; GOV.UK's roadmap puts the first major private-rented-sector phase at **1 May 2026**), and the **Data (Use and Access) Act 2025** each contain provisions that come into force on later dates set by commencement regulations. Treat the descriptions on this page as a guide to the *enacted* framework, not a statement that every provision binds today. The skills run **live in-force checks** at analysis time — via the `uk-legislation` MCP server's `check_in_force` and `check_amendments` tools against legislation.gov.uk — and classify each finding as current, transitional, or prospective. See [Jurisdiction & legal currency](/concepts/jurisdiction).
:::

---

## Employment Law

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Employment Rights Act 2025 | 2025 | ERA 2025 | `legal-employment`, `legal-freelancer` |
| Employment Rights Act 1996 | 1996 | ERA 1996 | `legal-employment`, `legal-freelancer`, `legal-ir35` |
| Equality Act 2010 | 2010 | EA 2010 | `legal-employment`, `legal-compliance` |
| Working Time Regulations 1998 | 1998 | WTR 1998 | `legal-employment` |
| National Minimum Wage Act 1998 | 1998 | NMW Act 1998 | `legal-employment` |
| Income Tax (Earnings and Pensions) Act 2003 | 2003 | ITEPA 2003 | `legal-ir35`, `legal-freelancer` |

### Key Provisions

::: info ERA 2025
The Employment Rights Act 2025 is the most substantial reshaping of UK employment law in a generation, but its provisions **commence in phases** — several are not yet binding and depend on commencement regulations. The skill checks what is actually in force at analysis time. Headline measures, *as and when each commences*, include:
- **Day-one unfair dismissal** protection (removal of the 2-year qualifying period)
- **Guaranteed hours** for zero-hours workers
- **Statutory flexible working** from day one
- Strengthened family leave entitlements
- Enhanced whistleblowing protections

Until a given provision commences, the prior position under the **Employment Rights Act 1996** continues to apply — the skill labels each finding current, transitional, or prospective accordingly.
:::

**Equality Act 2010** protects 9 characteristics: age, disability, gender reassignment, marriage/civil partnership, pregnancy/maternity, race, religion/belief, sex, and sexual orientation. Covers direct discrimination, indirect discrimination, harassment, and victimisation.

**Working Time Regulations 1998**: 48-hour maximum working week, 20-minute rest break per 6-hour shift, 5.6 weeks (28 days) annual leave entitlement.

**ITEPA 2003**: Employment status for tax purposes, IR35 intermediaries legislation, off-payroll working rules (Chapters 8-10).

---

## Data Protection

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| UK General Data Protection Regulation | 2018 | UK GDPR | `legal-gdpr`, `legal-compliance`, `legal-terms`, `legal-privacy`, `legal-ai-compliance` |
| Data Protection Act 2018 | 2018 | DPA 2018 | `legal-gdpr`, `legal-compliance`, `legal-terms`, `legal-privacy`, `legal-ai-compliance` |
| Privacy and Electronic Communications Regulations 2003 | 2003 | PECR 2003 | `legal-gdpr`, `legal-compliance`, `legal-terms`, `legal-consumer` |
| Data (Use and Access) Act 2025 | 2025 | DUAA 2025 | `legal-gdpr` |

### Key Provisions

**UK GDPR** retained the EU GDPR framework post-Brexit with modifications:
- Lawful bases for processing (Article 6), including the "recognised legitimate interest" ground introduced by DUAA 2025 (in force as its provisions commence — the skill checks the live position)
- Data subject rights (Articles 15-22): access, rectification, erasure, portability, objection
- Controller-processor obligations (Articles 28-29)
- Data Protection Impact Assessments (Article 35)
- International transfers via UK International Data Transfer Agreement (UK IDTA) and Standard Contractual Clauses (SCCs)
- Breach notification: 72 hours to ICO (Article 33), without undue delay to data subjects (Article 34)
- ICO is the supervisory authority

**PECR 2003** governs electronic marketing (email, SMS, calls) and cookie consent. Penalties have been aligned with UK GDPR levels (up to GBP 17.5 million or 4% of annual global turnover).

::: tip
The Data (Use and Access) Act 2025 introduces "recognised legitimate interests" as a lawful basis under Article 6, smart data schemes, digital verification services, and reforms to automated decision-making provisions. These changes **commence on dates set by regulations** rather than all at once, so the skill verifies what is actually in force (via the `uk-legislation` MCP server) before treating any DUAA reform as binding.
:::

---

## Consumer Protection

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Consumer Rights Act 2015 | 2015 | CRA 2015 | `legal-review`, `legal-consumer`, `legal-terms` |
| Digital Markets, Competition and Consumers Act 2024 | 2024 | DMCCA 2024 | `legal-consumer` |
| Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 | 2013 | CCR 2013 | `legal-consumer` |
| Unfair Contract Terms Act 1977 | 1977 | UCTA 1977 | `legal-review`, `legal-risks`, `legal-consumer` |

### Key Provisions

**CRA 2015** consolidated consumer rights:
- Goods must be of satisfactory quality, fit for purpose, and as described
- Digital content rights (Chapter 3)
- Unfair terms regime (Part 2) -- terms must be fair and transparent
- Consumer remedies: repair, replacement, or refund (30-day short-term right to reject)

::: info DMCCA 2024
The Digital Markets, Competition and Consumers Act 2024 is the most significant consumer protection reform in a decade:
- **Subscription transparency regime**: auto-renewal notices, cooling-off rights, easy cancellation
- **CMA direct enforcement powers**: fines without court orders (up to 10% of global turnover)
- **Digital markets regime**: companies with "Strategic Market Status"
- **Banned practices**: drip pricing, fake reviews, pressure selling
:::

**UCTA 1977**: Applies to B2B contracts. Cannot exclude liability for death/personal injury from negligence (s.2(1)). Other exclusions must pass the reasonableness test (s.11).

**CCR 2013**: 14-day cooling-off period for distance and off-premises contracts, pre-contract information requirements.

---

## Corporate Law

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Companies Act 2006 | 2006 | CA 2006 | `legal-corporate`, `legal-board-pack`, `legal-regulatory-calendar`, `legal-due-diligence`, `legal-esg` |
| Economic Crime and Corporate Transparency Act 2023 | 2023 | ECCTA 2023 | `legal-corporate` |

### Key Provisions

**Companies Act 2006** -- the primary corporate statute:

| Section(s) | Topic | Description |
|------------|-------|-------------|
| ss.171-177 | Director duties | Act within powers, promote success, independent judgement, reasonable care/skill/diligence, avoid conflicts, decline third-party benefits, declare interests |
| s.44 | Document execution | Two directors, or one director plus witness, or company seal |
| s.172(1) | Strategic report | s.172 statement required for large companies |
| s.414C | ESG reporting | Strategic report must cover environmental, employee, social, and anti-bribery matters |
| s.555 | Share allotments | Return of allotment within 28 days |
| ss.270-274 | Company secretary | Public companies must have one; qualifications requirements |

**ECCTA 2023** reforms:
- **s.199 -- Failure to prevent fraud**: Large organisations criminally liable unless reasonable fraud prevention procedures in place
- Identity verification for directors and PSCs
- Enhanced Companies House powers (query, annotate, remove information)
- Registered office must be an "appropriate address"
- Lawful purpose confirmation

---

## Property Law

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Housing Act 1988 | 1988 | HA 1988 | `legal-property`, `legal-tenancy` |
| Landlord and Tenant Act 1954 | 1954 | LTA 1954 | `legal-property` |
| Renters' Rights Act 2025 | 2025 | RRA 2025 | `legal-property`, `legal-tenancy` |
| Land Registration Act 2002 | 2002 | LRA 2002 | `legal-property` |
| Tenant Fees Act 2019 | 2019 | TFA 2019 | `legal-property`, `legal-tenancy` |
| Leasehold Reform Act 2022 | 2022 | LRA 2022 | `legal-property` |

### Key Provisions

::: info Renters' Rights Act 2025
The RRA 2025 received Royal Assent on **27 October 2025** and brings major reforms to the private rented sector — but they **commence in phases**, not on Royal Assent. GOV.UK's implementation roadmap puts the first major phase at **1 May 2026**. The skill checks the live commencement position and flags each finding as current, transitional, or prospective:
- **Section 21 abolition** (commencing in phases from 2026): the "no-fault" eviction route is removed from its operative date — verify whether a given tenancy and notice fall before or after commencement before treating abolition as operative
- **Periodic tenancies**: assured shorthold and fixed-term tenancies convert to assured periodic tenancies as the relevant provisions commence
- **Rent increase limits**: rent increases move to the statutory s.13 mechanism (once per year) on commencement
- **Pet rights**: landlords cannot unreasonably refuse pet requests, as those provisions commence
- **Decent Homes Standard**: extended to the private rented sector via secondary legislation expected to follow
- **PRS Database**: mandatory landlord registration, switched on by commencement regulations
:::

**Tenant Fees Act 2019** prohibits most tenant fees:
- Permitted payments only: rent, tenancy deposit (capped at 5 weeks' rent where annual rent is under GBP 50,000), holding deposit (1 week's rent)
- Deposit must be registered with a government-approved scheme within 30 days
- All other fees are banned (admin fees, reference fees, credit check fees)

**LTA 1954 Part II**: Security of tenure for business tenancies. Tenant has the right to renew unless the landlord can prove one of the statutory grounds (s.30). Can be contracted out by agreement before the lease is entered into.

---

## AML / KYC

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 | 2017 | MLR 2017 | `legal-aml` |
| Proceeds of Crime Act 2002 | 2002 | POCA 2002 | `legal-aml` |
| Sanctions and Anti-Money Laundering Act 2018 | 2018 | SAMLA 2018 | `legal-aml` |

### Key Provisions

**MLR 2017** (as amended) requires regulated firms to:
- Conduct Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) for high-risk situations
- Screen against OFSI/HMT consolidated sanctions list
- Screen for Politically Exposed Persons (PEPs)
- Appoint a Money Laundering Reporting Officer (MLRO)
- Maintain records for 5 years after the end of the business relationship
- Conduct firm-wide risk assessments
- Provide staff training

**POCA 2002** creates:
- Money laundering offences (ss.327-329): concealing, arranging, acquiring criminal property
- Suspicious Activity Report (SAR) obligation (s.330): failure to disclose is a criminal offence
- Consent regime for proceeding with suspicious transactions
- Confiscation orders

**SAMLA 2018**: OFSI sanctions regime, financial sanctions compliance, framework for overseas territories AML requirements.

---

## Intellectual Property

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Copyright, Designs and Patents Act 1988 | 1988 | CDPA 1988 | `legal-ip` |
| Patents Act 1977 | 1977 | PA 1977 | `legal-ip` |
| Trade Marks Act 1994 | 1994 | TMA 1994 | `legal-ip` |
| Trade Secrets (Enforcement, etc.) Regulations 2018 | 2018 | TSR 2018 | `legal-ip` |

### Key Provisions

**CDPA 1988**:
- Copyright ownership (s.11): employer owns work created in the course of employment
- Moral rights (ss.77-89): right to be identified as author, right to object to derogatory treatment
- Fair dealing exceptions (ss.28-76): research, private study, criticism, review, reporting
- AI-generated works (s.9(3)): author is "the person by whom the arrangements necessary for the creation of the work are undertaken"
- Database right (Part III)

**Patents Act 1977**: Employee inventions (ss.39-43) -- inventions made in the course of normal duties or specifically assigned duties belong to the employer. Compensation available under s.40 if the patent is of outstanding benefit.

**Trade Marks Act 1994**: Registration (s.1), grounds for refusal (ss.3-5), infringement (s.10), groundless threats (s.21).

**Trade Secrets Regulations 2018**: Implements EU Trade Secrets Directive. Unlawful acquisition, use, and disclosure of trade secrets. Interim injunctions and preservation orders available.

---

## Dispute Resolution

| Statute / Rules | Year | Abbreviation | Skills That Reference It |
|-----------------|------|-------------|--------------------------|
| Civil Procedure Rules | 1998 | CPR | `legal-dispute`, `legal-debt` |
| Arbitration Act 1996 | 1996 | AA 1996 | `legal-dispute` |

### Key Provisions

**CPR** governs civil litigation in England & Wales:
- Pre-action protocols (mandatory before issuing proceedings)
- Part 36 offers (costs consequences for unreasonable refusal)
- Fixed recoverable costs regime (most claims up to GBP 100,000)
- Case management and disclosure obligations

**Arbitration Act 1996**:
- Party autonomy (s.1): parties free to agree how disputes are resolved
- Seat of arbitration determines the supervisory court
- Limited grounds to challenge awards (ss.67-69: jurisdiction, serious irregularity, point of law)

---

## Debt Recovery & Consumer Credit

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Limitation Act 1980 | 1980 | LA 1980 | `legal-debt` |
| Late Payment of Commercial Debts (Interest) Act 1998 | 1998 | LPCDA 1998 | `legal-debt` |
| Consumer Credit Act 1974 | 1974 | CCA 1974 | `legal-debt` |
| Insolvency Act 1986 | 1986 | IA 1986 | `legal-debt` |

### Key Provisions

**Limitation Act 1980** -- time limits for claims:

| Claim Type | Period | Section |
|------------|--------|---------|
| Simple contract | 6 years | s.5 |
| Deed | 12 years | s.8 |
| Personal injury | 3 years | s.11 |
| Contribution | 2 years | s.10 |

Time runs from the date the cause of action accrued.

**LPCDA 1998** -- statutory interest on late B2B payments:
- Rate: 8% above Bank of England base rate
- Fixed compensation: GBP 40 (debts up to GBP 999.99), GBP 70 (GBP 1,000-9,999.99), GBP 100 (GBP 10,000+)
- Reasonable recovery costs on top

**CCA 1974**: Regulated credit agreements, unfair relationship provisions (ss.140A-C), enforcement orders, and the breathing space scheme for individuals in debt.

**Insolvency Act 1986**: Statutory demands (s.268), winding-up petitions, administration, individual voluntary arrangements (IVAs), bankruptcy.

---

## Wills & Probate

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Wills Act 1837 | 1837 | WA 1837 | `legal-wills` |
| Inheritance Tax Act 1984 | 1984 | IHTA 1984 | `legal-wills` |
| Inheritance (Provision for Family and Dependants) Act 1975 | 1975 | I(PFD)A 1975 | `legal-wills` |
| Mental Capacity Act 2005 | 2005 | MCA 2005 | `legal-wills` |

### Key Provisions

**Wills Act 1837** execution requirements (s.9):
1. Will must be in writing
2. Signed by the testator (or by some other person in the testator's presence and by their direction)
3. The testator's signature must be made or acknowledged in the presence of 2 witnesses present at the same time
4. Each witness must attest and sign the will
5. Witness independence (s.15): gifts to witnesses or their spouses are void

**IHTA 1984** -- key thresholds and reliefs:

| Threshold / Relief | Amount | Notes |
|--------------------|--------|-------|
| Nil-rate band | GBP 325,000 | Frozen since 2009 |
| Residence nil-rate band (RNRB) | GBP 175,000 | Available when a home is left to direct descendants |
| Transferable bands | 100% transfer | Between spouses/civil partners |
| Business Property Relief (BPR) | 50% or 100% | Depending on asset type |
| Agricultural Property Relief (APR) | 50% or 100% | For agricultural property |
| Charity exemption | Exempt | Gifts to charity; 36% rate available if 10%+ of net estate left to charity |

**Inheritance (Provision for Family and Dependants) Act 1975**: Categories of claimants include spouse/civil partner, former spouse, child of deceased, person treated as child of family, person maintained by deceased. Test: whether the will makes "reasonable financial provision".

**Mental Capacity Act 2005**: Lasting Powers of Attorney (Property & Financial Affairs, Health & Welfare), capacity test (ss.2-3), best interests decision-making (s.4), Court of Protection, Office of the Public Guardian (OPG) registration.

---

## Immigration

| Statute / Rules | Year | Abbreviation | Skills That Reference It |
|-----------------|------|-------------|--------------------------|
| Immigration Rules HC 395 | 1994 | IR HC 395 | `legal-immigration` |
| Immigration Act 2014 | 2014 | IA 2014 | `legal-immigration`, `legal-tenancy` |

### Key Provisions

**Immigration Rules** set out:
- Points-Based System requirements
- Skilled Worker visa salary threshold: GBP 38,700 minimum (or applicable going rate)
- Sponsor licence obligations: Annex D record-keeping, reporting duties within set timeframes, migrant tracking
- English language requirements (CEFR B1 minimum for most routes)
- Maintenance / financial requirements
- Genuine vacancy test

**Immigration Act 2014**:
- **Right to Work checks**: Employers must verify immigration status using prescribed documents or online share codes (IDVT for biometric cards)
- **Right to Rent checks**: Landlords must verify tenant immigration status before granting a tenancy
- **Civil penalties**: Up to GBP 60,000 per illegal worker (first offence: up to GBP 45,000; repeat: up to GBP 60,000)

---

## ESG & Modern Slavery

| Statute | Year | Abbreviation | Skills That Reference It |
|---------|------|-------------|--------------------------|
| Modern Slavery Act 2015 | 2015 | MSA 2015 | `legal-esg` |
| Companies Act 2006 s.414C | 2006 | CA 2006 s.414C | `legal-esg` |

### Key Provisions

**Modern Slavery Act 2015 s.54**:
- Commercial organisations with annual turnover of GBP 36 million or more must publish an annual slavery and human trafficking statement
- Statement must describe steps taken to ensure slavery and human trafficking are not taking place in the business or supply chains
- Must be approved by the board of directors and signed by a director (or equivalent)
- Must be published on the organisation's website with a link on the homepage

**Companies Act 2006 s.414C** requires the strategic report of large companies to include information about:
- Environmental matters (including greenhouse gas emissions)
- Employee matters
- Social, community, and human rights matters
- Anti-corruption and anti-bribery matters

---

## AI & Technology Governance

These are not Acts of Parliament but regulatory frameworks and guidance referenced by the AI compliance skill:

| Source | Type | Skills That Reference It |
|--------|------|--------------------------|
| SRA Standards and Regulations | Regulatory code | `legal-ai-compliance` |
| ICO AI Guidance | Regulatory guidance | `legal-ai-compliance` |
| UK AI Regulation Principles | Policy framework | `legal-ai-compliance` |
| EU AI Act | EU legislation (exposure analysis) | `legal-ai-compliance` |

The UK AI Regulation Principles are: safety, transparency, fairness, accountability, and contestability.

::: tip MCP Server
The MCP server (`uk-legislation`) can look up any of these statutes in real-time from legislation.gov.uk, including checking whether provisions are currently in force, what amendments have been made, and territorial extent. The remote `lex` server provides semantic search across 63,000+ court cases.
:::
