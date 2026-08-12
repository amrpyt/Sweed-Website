# SWEED-035 — Reference HTML fidelity restoration

Date: 2026-08-12
Status: completed
Detailed spec: `docs/superpowers/specs/2026-08-12-reference-html-fidelity-restoration-design.md`
Detailed implementation plan: `docs/superpowers/plans/2026-08-12-reference-html-fidelity-restoration.md`

## Goal

Restore `/services`, `/portfolio`, and `/offers` to the newly uploaded executive HTML references while keeping the current shared SWEED header, footer, widget, routing, and runtime.

## Current evidence

- Current `main` HEAD is `a4bebad` and the working tree was clean at task start.
- SWEED-024 replaced the HTML-backed route bodies with React executive composers.
- The current raw files under `apps/web/site/pages` do not match the new uploaded references.
- The uploaded reference SHA-256 values are recorded in the detailed spec and will be asserted against decoded exact bytes.
- Articles has an uploaded DOCX but no uploaded HTML source in this batch.

## Scope

- Store the three uploaded HTML sources as deterministic gzip plus Base64 chunks in a server-side reference source module.
- Decode and hash the exact uploaded bytes before any runtime normalization.
- Add a reference presentation mode to the legacy renderer while keeping the old `site/pages` files unchanged for rollback.
- Restore the three route bodies to that renderer.
- Prevent reference CSS and chrome from leaking into the shared shell.
- Add hash and renderer regression tests.
- Deploy and run browser interaction QA on all three routes.

## Non-goals

- No redesign.
- No Articles HTML fidelity claim without its missing HTML source.
- No homepage, About, Contact, detail-page, or typography-system change.
- No Git push.

## Acceptance criteria

- [x] Decoded Services reference hash equals `ee21eca6b83d2b3774b127ce3be5a1512d5b2b07a0b9ea315f2abe6ea6008662`.
- [x] Decoded Portfolio reference hash equals `bfcc2e73fda056cf0103472438a3d93c998bf0f51c04999d83cc009a64fba240`.
- [x] Decoded Offers reference hash equals `6aeb87c77f01f475936352a966c00de6f412d12380e56e74e41803183d1ebfde`.
- [x] `/services`, `/portfolio`, and `/offers` use reference presentation.
- [x] Each page has one shared header, one footer, and no duplicate inline reference navbar.
- [x] Reference hero/sections/GSAP interactions remain present.
- [x] Shared shell typography is not changed globally.
- [x] Check, focused tests, build, deployment, and production smoke checks pass.
- [x] Desktop/tablet/mobile browser QA has no overflow, console errors, page errors, or broken assets.
- [x] Reduced-motion content remains complete.

## Risks

- Reference CSS contains broad selectors that can leak into shared chrome.
- Inline scripts may assume the removed reference navbar exists.
- CDN-loaded GSAP plugins may be blocked by CSP or load order.
- Existing production smoke tests may encode the React rebuild structure.

## Completion evidence

- Source fidelity: 3/3 SHA-256 assertions pass against the decoded uploaded bytes.
- Code gate: 108/108 unit tests plus TypeScript, ESLint, spacing, and mobile-first checks pass.
- Build: 29 production routes generated successfully.
- Runtime: `sweed-demo.service` active; Services, Portfolio, Offers, and Articles return HTTP 200.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.
- Browser motion: Services 76 ScrollTriggers with SplitText, Portfolio 71, Offers 42 in fresh sessions.
- Browser interactions: Services sticky map; Portfolio filters/tabs; Offers quiz/comparison/tabs/drawers all exercised successfully.
- Responsive: 1024×768, 390×844, and 320×568 pass without horizontal overflow or broken images.
- Reduced motion: zero hidden `.reveal` elements on all three reference routes.
- Screenshots: `/var/tmp/agent-browser/artifacts/sweed-reference/`.

## Rollback

Revert the route/restoration commits (`a531ce0`, `76adbbe`, `577204b`, `cfe12da`) to return the three routes to their React composers. The old `apps/web/site/pages` sources were intentionally left unchanged.
