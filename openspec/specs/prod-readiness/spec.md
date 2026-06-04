# prod-readiness Specification

## Purpose
TBD - created by archiving change prod-readiness-hardening. Update Purpose after archive.
## Requirements
### Requirement: Canonical production URL

The public site SHALL use a non-placeholder canonical URL for sitemap, robots, canonical metadata, and social metadata.

#### Scenario: Sitemap and robots are requested

- **WHEN** `/sitemap.xml` and `/robots.txt` are requested
- **THEN** generated URLs SHALL use `https://sweed.com` unless overridden by `NEXT_PUBLIC_SITE_URL`
- **AND** generated URLs SHALL NOT contain `sweed.example`

### Requirement: Production-safe security headers

The public site SHALL keep security headers enabled and SHALL avoid development-only CSP allowances in production.

#### Scenario: Production headers are generated

- **WHEN** the app runs with `NODE_ENV=production`
- **THEN** the CSP SHALL NOT include `'unsafe-eval'`
- **AND** the CSP SHALL NOT include localhost development connection origins

### Requirement: Consistent public contact data

The public site SHALL display the same public email address across legacy-backed pages.

#### Scenario: Public pages are rendered

- **WHEN** public legacy-backed pages are visited
- **THEN** they SHALL display `info@sweed.com`
- **AND** they SHALL NOT display stale `sweid.com` or personal Gmail contact addresses

