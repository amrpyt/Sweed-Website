# Plan — Full-site senior audit and hardening

Updated: 2026-07-26
Status: completed
Task: SWEED-020

## Goal

Run a production-grade senior engineering audit across the complete SWEED public website, identify measurable risks before a full-stack review, fix confirmed P0/P1 issues and low-risk P2 issues, then re-audit and document the remaining technical debt honestly.

## Audit Framework

1. Build and code quality
   - TypeScript, ESLint, unit tests, production build, route generation, Git hygiene.
   - Dependency and bundle inspection, client/server boundary review, dead or duplicate runtime code.
2. Runtime performance
   - Core Web Vitals, request waterfall, asset sizes, caching/compression, script cost, image/font loading, animation frame stability.
3. Accessibility
   - Semantics, landmarks, heading order, labels, keyboard navigation, focus states, touch targets, reduced motion, contrast.
4. Responsive and visual quality
   - 320, 360, 390, 768, 1024, 1280, 1440, and short-landscape checks.
   - Overflow, clipping, broken images, blank animation states, layout shifts, navigation, forms, dialogs, sliders, pinned sections.
5. Reliability and security posture
   - Internal/external links, 404s, metadata, robots/sitemap, security headers, exposed debug/admin surfaces, error handling, placeholder production data.
6. UX anti-patterns
   - Apply Impeccable audit and UI UX Pro Max pre-delivery checks: contrast, focus, responsive breakpoints, hover states, reduced motion, icon consistency, and AI-template tells.

## Scope

- Public routes and representative dynamic routes.
- Shared shell, navigation, footer, motion runtime, images/fonts, contact and AI-advisor entry points.
- Build/deployment configuration and public HTTP behavior.
- Targeted fixes for verified release-blocking or reviewer-obvious issues.

## Non-goals

- No broad visual redesign without evidence.
- No dependency upgrades merely because newer versions exist.
- No infrastructure/domain changes.
- No fabricated business content or replacement of documented placeholders without official inputs.
- No push unless explicitly requested.

## Ordered Execution

1. Establish baseline: Git, check, build, route inventory, server headers, asset inventory.
2. Run automated browser crawl and page-level vitals on all core routes.
3. Run accessibility/keyboard/touch/contrast inspection on representative pages.
4. Run network, image, font, JS and animation profiling.
5. Run visual responsive matrix and interaction smoke tests.
6. Classify findings P0–P3 with evidence and score 5 audit dimensions.
7. Fix confirmed P0/P1 and safe P2 issues in atomic commits.
8. Rebuild, deploy, re-run the audit matrix, and record before/after evidence.
9. Produce an executive report suitable for discussion with a senior full-stack engineer.

## Acceptance Criteria

- [x] Every public route returns the intended status and has no broken internal link/hash.
- [x] TypeScript, lint, unit tests, production build, and production smoke tests pass.
- [x] No P0 issues remain.
- [x] No confirmed P1 performance, accessibility, responsive, or security issue remains unfixed without a documented blocker.
- [x] Core routes have measured Web Vitals and no browser/console errors.
- [x] No horizontal overflow, clipped visible Arabic text, broken images, or blank motion-gated content at tested sizes.
- [x] Keyboard navigation, focus return, dialogs, forms, mobile top sheet, sliders, and pinned methodology flow work.
- [x] Reduced motion disables non-essential animation while keeping content complete.
- [x] Asset and network audit identifies oversized, uncached, duplicate, or render-blocking resources.
- [x] Security and cache headers are assessed and critical gaps fixed or documented.
- [x] Final audit evidence includes score, fixed issues, remaining debt, and reviewer talking points.

## Risks

- Synthetic Web Vitals vary by warm/cold cache; record conditions and repeat key measurements.
- Pinning and Lenis can behave differently with real wheel/touch input; test forward, reverse, resize, and reduced motion.
- Visual placeholders on About are intentional pre-launch content boundaries, not implementation defects.
- Admin/debug routes may be intentionally present; assess exposure before changing behavior.

## Completion Evidence

- Application commit: `b2cdb07 fix: harden public site for production`.
- `bun run check`: zero TypeScript errors, zero ESLint warnings, all configured unit tests pass.
- Focused accessibility/content tests: 12 passed, 0 failed.
- Production build: successful with zero Next.js/Turbopack warnings.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-test skip.
- Browser matrix: no overflow, duplicate IDs, unlabeled visible controls, missing main landmarks, heading jumps, or sub-44px visible controls on tested public routes.
- Final homepage synthetic measurement: TTFB 8.4ms, FCP/LCP 524ms, CLS 0.
- The stakeholder-approved `SWEED Helvetica Arabic` font is restored as the computed primary font, with Cairo and SF Arabic retained only as fallbacks.
- White-on-action-pink contrast measured 4.65:1 for representative CTAs and badges.
- Production admin/debug surfaces return 404 when credentials are not configured; the private compatibility proxy returns 404 without its server token.
- Security headers include CSP, HSTS, frame denial, nosniff, and strict-origin referrer policy.
- Remaining dependency debt: runtime remains locked to Next.js 16.2.4 and `bun audit` reports advisories. The package range permits a patch update, but the lockfile/runtime upgrade requires a controlled dependency-install batch and full regression rerun.

## Rollback

Revert `b2cdb07` to remove the application hardening changes; preserve this audit evidence and the follow-up dependency-upgrade task.
