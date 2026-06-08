# Document Generation

Sometimes you do not need to review a document -- you need to create one from scratch. These commands generate professional legal documents tailored to your situation, all compliant with England and Wales law.

Five commands for generating legal documents from scratch -- NDAs, terms of service, privacy policies, business agreements, and board packs.

![Document generation (broadsheet rebrand) — five instruments drafted from facts](/images/doc-generation-2026.jpg)

*Plate I — the broadsheet rebrand.*

![Five document types you can generate from scratch](/images/doc-generation.jpg)

*Plate I.a — the original, kept for reference.*

## /legal nda

Generates a complete, customised Non-Disclosure Agreement with plain English annotations.

### Syntax

```bash
/legal nda <description>
```

The `<description>` is a brief description of the NDA needed.

### NDA types

| Type | When to use |
|------|------------|
| **Mutual** | Both parties share confidential information |
| **One-way** | Only one party discloses |
| **Employee** | Employees or contractors joining a company |
| **Vendor** | Vendors or service providers accessing company information |

### Information gathered

The command extracts or asks for:
- **Parties**: Full legal names of both sides
- **Purpose**: What the confidential information will be used for
- **Confidential information**: Types of information shared (technical data, business plans, customer lists, financials, source code, etc.)
- **Duration**: How long the NDA lasts (default: 2 years)
- **Survival period**: How long confidentiality lasts after expiry (default: 3 years for business info, 5 years for trade secrets)
- **Governing law**: Jurisdiction

### Generated content

The NDA includes:
- Recitals and defined terms
- Confidential information definition with standard exclusions
- Permitted use and permitted disclosures
- Return or destruction of materials
- Injunctive relief provisions
- Costs-follow-the-event clause
- Plain English annotations for every section

### Example

```bash
/legal nda "Mutual NDA between Acme Corp and Beta Inc for discussing a potential partnership"
```

```bash
/legal nda "One-way NDA for a freelance designer working on our rebrand"
```

### Output filename

`NDA-[party-name]-[date].md`

---

## /legal terms

Generates complete Terms of Service for a website or SaaS product by scanning what it does.

### Syntax

```bash
/legal terms <url>
```

### What it does

1. **Scans the website** using WebFetch to understand:
   - Business type (SaaS, marketplace, e-commerce, content platform, API service)
   - Core functionality
   - Data collection practices
   - User accounts and authentication
   - Payment processing (subscription, one-time, free tier)
   - User-generated content capabilities
   - API access
   - Third-party integrations
   - Target audience (B2B, B2C, age restrictions)

2. **Generates Terms of Service** that are:
   - UK GDPR / DPA 2018 / PECR compliant
   - Tailored to what the website actually does
   - Written with plain English summaries for each section (inspired by Basecamp and Notion)

### Example

```bash
/legal terms https://myapp.example.com
```

### Output filename

`TERMS-OF-SERVICE-[company]-[date].md`

### Key legislation

UK GDPR, Data Protection Act 2018, Consumer Rights Act 2015, Electronic Commerce (EC Directive) Regulations 2002, PECR 2003.

---

## /legal privacy

Generates a privacy policy by detecting a website's actual data collection practices.

### Syntax

```bash
/legal privacy <url>
```

### What it does

1. **Scans the website** for data collection signals:
   - Cookies and tracking (Google Analytics, Mixpanel, Segment, Hotjar, Meta Pixel, GTM)
   - Forms and user input fields
   - Payment processors
   - Authentication systems
   - Third-party scripts and SDKs
   - Fingerprinting scripts

2. **Generates a privacy policy** covering:
   - Data controller identification
   - ICO as supervisory authority
   - Lawful bases for each processing activity (Article 6)
   - Special category data handling (Article 9)
   - Cookie categories and consent requirements
   - UK international transfer mechanisms (UK IDTA, adequacy decisions)
   - Data subject rights (access, rectification, erasure, portability, objection)
   - Retention periods
   - Children's data provisions
   - Breach notification procedures

### Example

```bash
/legal privacy https://myapp.example.com
```

### Output filename

`PRIVACY-POLICY-[company]-[date].md`

### Key legislation

UK GDPR, Data Protection Act 2018, Privacy and Electronic Communications Regulations 2003 (PECR), ICO guidance.

---

## /legal agreement

Generates complete business agreements for various engagement types.

### Syntax

```bash
/legal agreement <type>
```

### Supported types

| Type keyword | Full name | Description |
|-------------|-----------|-------------|
| `freelancer-contract` | Freelancer/Contractor Agreement | Independent contractor engagement with scope, payment, IP terms. IR35-aware. |
| `partnership-agreement` | Partnership Agreement | Business partnership with profit sharing, roles, dissolution terms |
| `service-agreement` | Service Agreement | General services engagement between provider and client |
| `licensing-agreement` | Licensing Agreement | Rights to use IP, software, or content |
| `consulting-agreement` | Consulting Agreement | Advisory engagement with defined deliverables |
| `sow` | Statement of Work | Project-specific scope, milestones, deliverables |
| `msa` | Master Service Agreement | Umbrella agreement for ongoing business relationship |
| `joint-venture` | Joint Venture Agreement | Collaborative business venture between parties |
| `distribution-agreement` | Distribution Agreement | Product distribution rights in defined territories |
| `referral-agreement` | Referral Agreement | Referral fee arrangement |

### How it works

1. Asks clarifying questions about parties, commercial terms, and specific requirements.
2. Generates a complete agreement with:
   - Full defined terms
   - All standard commercial clauses
   - IR35-aware contractor provisions (where applicable)
   - Plain English annotations for every section
   - Execution blocks

### Example

```bash
/legal agreement freelancer-contract
```

```bash
/legal agreement msa
```

### Output filename

`AGREEMENT-[type]-[party]-[date].md`

---

## /legal board-pack

Generates Companies Act 2006 compliant board meeting documents.

### Syntax

```bash
/legal board-pack <type>
```

### Supported document types

| Type keyword | Full name | Key legislation |
|-------------|-----------|-----------------|
| `minutes` | Board Minutes | s.248 CA 2006 (duty to keep minutes) |
| `resolution` | Board Resolution | ss.281--283 CA 2006 (types of resolution) |
| `written-resolution` | Written Resolution (Private Company) | ss.288--300 CA 2006 |
| `conflict-declaration` | Conflict of Interest Declaration | s.177 CA 2006 (duty to declare interest) |
| `director-appointment` | Director Appointment | s.167 CA 2006 (duty to notify Companies House) |
| `dividend` | Dividend Declaration | s.830 CA 2006 (distributable profits) |
| `allotment` | Share Allotment | ss.549--551, s.561 CA 2006 (authority to allot, pre-emption) |

### How it works

1. Asks for essential information (company name, directors present, date, and type-specific details).
2. Generates a complete document with:
   - Proper Companies Act formatting
   - Quorum and attendance records
   - Conflict of interest declarations
   - Resolution text with statutory references
   - Guidance notes explaining each section's legal requirements
   - Companies House filing reminders where applicable

### Example

```bash
/legal board-pack minutes
```

```bash
/legal board-pack dividend
```

```bash
/legal board-pack written-resolution
```

### Output filename

`BOARD-[type]-[company]-[date].md`

### Key legislation

Companies Act 2006 (ss.248, 281--283, 288--300, 167, 177, 549--551, 561, 830).

---

## Related commands

- [/legal review](/cli/contract-analysis) — review a generated or third-party draft
- [/legal freelancer](/cli/employment) — contractor-side review of an agreement
- [/legal compliance](/cli/compliance) — check a generated policy against UK GDPR / PECR
- [Example output](/reference/sample-report) — what a review report looks like
