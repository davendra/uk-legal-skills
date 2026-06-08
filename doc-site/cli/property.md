# Property

Property transactions involve some of the most complex legal documents you will encounter. Whether you are buying, selling, leasing, or renting, these commands help you understand what you are committing to.

Two commands for property document analysis and tenancy agreement review under England and Wales law.

![Property compliance checklist (broadsheet rebrand) — five statutory checks](/images/property-checklist-2026.jpg)

*Plate I — the broadsheet rebrand.*

![Property and tenancy compliance checklist](/images/property-checklist.jpg)

*Plate I.a — the original, kept for reference.*

## /legal property

Analyses property documents including leases, tenancy agreements, freehold transfers, commercial leases, and licences to occupy.

### Syntax

```bash
/legal property <file>
```

### What it does

1. Classifies the document type and maps it to the applicable legislation.
2. Performs a comprehensive property law analysis covering risk identification, statutory compliance, and practical guidance.

### Document types and legislation

| Document type | Key legislation |
|---------------|----------------|
| Residential lease (long) | Law of Property Act 1925, Leasehold Reform Act 1993, Leasehold Reform (Ground Rent) Act 2022, Commonhold and Leasehold Reform Act 2002 |
| Assured Shorthold Tenancy (AST) | Housing Act 1988 (as amended), Deregulation Act 2015, Tenant Fees Act 2019, Renters' Rights Act 2025 |
| Commercial lease | Landlord and Tenant Act 1954 (security of tenure), Law of Property Act 1925 |
| Freehold transfer (TR1) | Land Registration Act 2002, Law of Property Act 1925 |
| Licence to occupy | Distinguished from lease per *Street v Mountford* [1985] |
| Lease extension | Leasehold Reform, Housing and Urban Development Act 1993, Leasehold Reform Act 1967 |
| Party wall | Party Wall etc. Act 1996 |
| Option agreement | Law of Property Act 1925 s.149, Land Registration Act 2002 |
| Deed of covenant | Law of Property Act 1925, Landlord and Tenant (Covenants) Act 1995 |
| Planning / Section 106 | Town and Country Planning Act 1990 |

### Example

```bash
/legal property ./property/commercial-lease.pdf
```

### Output filename

`PROPERTY-ANALYSIS-[address]-[date].md`

### Key legislation

Housing Act 1988, Landlord and Tenant Act 1954, Renters' Rights Act 2025, Land Registration Act 2002, Tenant Fees Act 2019, Leasehold Reform (Ground Rent) Act 2022.

---

## /legal tenancy

Tenancy agreement review with full Renters' Rights Act 2025 compliance assessment.

### Syntax

```bash
/legal tenancy <file>
```

### What it does

1. **Document classification**: Identifies the tenancy type -- AST, assured tenancy, assured periodic tenancy (the new default under RRA 2025), lodger agreement, licence to occupy, or HMO tenancy.
2. **Legislative compliance**: Checks against all current residential tenancy legislation.
3. **Clause-by-clause analysis**: Reviews every clause for risk, legality, and fairness.

### Renters' Rights Act 2025 checks

| Check | What is assessed |
|-------|-----------------|
| Section 21 abolition | Flags any no-fault eviction clauses (now unlawful) |
| Assured periodic tenancy conversion | Fixed-term ASTs are abolished; tenancy must be periodic |
| Rent increase limits | Section 13 notice only, once per year, market rate cap |
| Pet rights | Tenants can request pets; landlord cannot unreasonably refuse |
| Decent Homes Standard | Property must meet the standard |

### Additional compliance checks

| Area | What is assessed |
|------|-----------------|
| **Deposit protection** | 5-week cap (rent under GBP 50,000 p.a.), protection within 30 days, prescribed information served |
| **Safety compliance** | Gas Safety Certificate (annual), EICR (5-yearly), EPC (minimum E rating), smoke and CO detectors |
| **Tenant Fees Act 2019** | Only permitted payments: rent, deposit, holding deposit (1 week), default fees |
| **Section 48 notice** | Landlord address for service provided |
| **How to Rent guide** | Current version served on tenant |

### Example

```bash
/legal tenancy ./property/tenancy-agreement.pdf
```

### Output filename

`TENANCY-REVIEW-[address]-[date].md`

### Key legislation

Renters' Rights Act 2025 (commencing May 2026), Housing Act 1988, Housing Act 2004, Tenant Fees Act 2019, Deregulation Act 2015, Gas Safety (Installation and Use) Regulations 1998, Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, Energy Performance of Buildings (England and Wales) Regulations 2012, Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022.
