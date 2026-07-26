# Full-site production hardening audit

Date: 2026-07-26
Task: SWEED-020
Application commit: `b2cdb07 fix: harden public site for production`
Public runtime: `https://sweed-demo.coderaai.com`

## Executive result

Final audit health: **18/20 — Excellent, with dependency patching remaining**.

| Dimension | Score | Final evidence |
|---|---:|---|
| Accessibility | 4/4 | Landmarks, heading order, labels, keyboard names, skip links, focus, 44px targets, and representative CTA contrast pass. |
| Performance | 4/4 | Homepage TTFB 8.4ms, FCP/LCP 524ms, CLS 0; below-fold media remains lazy; unused legacy font requests removed. |
| Responsive | 4/4 | Desktop, 390px, and 320px checks have no horizontal overflow, duplicate IDs, missing landmarks, or undersized visible controls. |
| Theming | 3/4 | Brand tokens and a dedicated accessible action-pink token are in place; some legacy CSS still contains historical hard-coded presentation values. |
| Anti-patterns | 3/4 | Main public surfaces are intentional and branded; legacy pages and the unused preloader still contain older decorative patterns that are not release blockers. |

## Severity outcome

- P0: 1 confirmed exposure fixed and verified closed.
- P1: accessibility semantics, form names, contrast, test operability, and build-warning issues fixed. One dependency-upgrade blocker remains documented.
- P2: touch targets, width-based animation, duplicate font loading, and stale production-test assumptions fixed.
- P3: no noisy polish backlog retained; only non-blocking legacy styling debt remains.

## Material fixes

- Added one `main` landmark and one stable skip destination to legacy public pages.
- Restored logical heading hierarchy on Portfolio.
- Added accessible names and label associations to article search/newsletter, product filters, offer sliders, and article pagination.
- Raised visible mobile/desktop controls to at least 44×44px where required.
- Added `--color-action` and used an accessible action pink for white-text CTAs; representative contrast is 4.65:1.
- Removed all ESLint warnings by converting reusable images to `next/image`, correcting hook dependencies, and removing dead variables.
- Replaced layout-driving progress/dot animations with transform-based animation.
- Reduced fallback Cairo weights while preserving the stakeholder-approved `SWEED Helvetica Arabic` as the actual primary public font.
- Configured Turbopack root and statically scoped legacy file reads; production build now has zero warnings.
- Repaired the production Playwright runner to use system Chromium and assert the real shared header contract.
- Added reusable bounded-body and sliding-window request guards and corresponding tests.
- Hid unconfigured admin/debug surfaces and closed the private compatibility route by default.

## Verification

- `bun run check`: passed, zero errors and zero warnings.
- Focused tests: 12 passed, 0 failed.
- Production build: passed, zero framework warnings.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile-only screenshot skip.
- Browser console/errors: empty on final homepage run.
- Homepage final synthetic metrics: TTFB 8.4ms, FCP 524ms, LCP 524ms, CLS 0.
- Public service: active; homepage and core routes return HTTP 200.
- Admin without credentials: HTTP 404.
- Private compatibility endpoint without token: HTTP 404.
- Security headers verified: CSP, HSTS, X-Frame-Options DENY, nosniff, strict-origin referrer policy.

## Remaining blocker

The installed runtime and lockfile still pin Next.js `16.2.4`; `bun audit` reports dependency advisories. The manifest range already permits a newer compatible patch, but changing the lockfile/runtime requires a controlled package-install batch that was not performed through the read/edit/build-only production workspace tooling. Upgrade Next.js and its matching lint packages, rebuild, rerun unit/Playwright/browser tests, and re-run `bun audit` before declaring dependency debt closed.

## Reviewer talking points

- The site is not relying on a successful build alone: production routes, security headers, browser runtime, accessibility semantics, responsive geometry, and Core Web Vitals have evidence.
- Build and lint are clean, not merely passing with warnings.
- Production smoke tests execute against the deployed domain on desktop and mobile projects.
- Remaining dependency risk is explicitly isolated and has a controlled follow-up path rather than a rushed pre-meeting upgrade.
