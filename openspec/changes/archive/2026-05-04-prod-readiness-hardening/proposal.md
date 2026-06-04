## Why

The public site has passing visual smoke coverage, but production readiness also needs deployment-safe SEO, security headers, and consistent public contact data.

## What Changes

- Use a real configurable canonical site URL for sitemap, robots, canonical, and social metadata.
- Harden security headers so development-only CSP allowances are not shipped to production.
- Normalize stale legacy contact emails during legacy HTML rendering.
- Document remaining launch blockers after automated verification.

## Impact

- Affected code: site config, Next headers, legacy HTML adapter, smoke tests.
- Non-goals: real contact-form delivery, analytics setup, CRM/Sanity/Mastra integrations.
