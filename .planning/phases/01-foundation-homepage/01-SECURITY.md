---
phase: 01
slug: foundation-homepage
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-26T14:45:00Z
---

# Phase 01 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Client Browser | React SPA running in user browser | User input via forms |
| External Services | WhatsApp API, Google Fonts CDN | No sensitive data crossing |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-01-01 | Information Disclosure | Form Input Data | accept | Forms collect name/phone for lead submission only; no PII stored client-side | closed |
| T-01-02 | Injection | Form Validation | mitigate | Client-side validation only (required fields, Arabic error messages); submitLead returns resolved promise (no backend in scope) | closed |
| T-01-03 | Client-Side Manipulation | Portfolio/FAQ Filters | accept | Filter state is cosmetic; no server-side impact in static implementation | closed |
| T-01-04 | External Link Abuse | WhatsApp Floating Button | mitigate | WhatsApp link uses standard `wa.me` protocol URL with SWEED number; no user data passed | closed |

*Status: open · closed*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| R-01-01 | T-01-01 | Phase 1 is a static frontend with no backend storage. Form data submitted to WhatsApp or stubbed submitLead function. No PII persists. | SWEED Project | 2026-04-26 |

*Accepted risks do not resurface in future audit runs.*

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-26 | 4 | 4 | 0 | agent (gsd-security-auditor) |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-26