# SWEED-035 — Reference HTML fidelity restoration

Date: 2026-08-12
Status: active
Detailed spec: `docs/superpowers/specs/2026-08-12-reference-html-fidelity-restoration-design.md`
Detailed implementation plan: `docs/superpowers/plans/2026-08-12-reference-html-fidelity-restoration.md`

## Goal

Restore `/services`, `/portfolio`, and `/offers` to the newly uploaded executive HTML references while keeping the current shared SWEED header, footer, widget, routing, and runtime.

## Current evidence

- Current `main` HEAD is `a4bebad` and the working tree was clean at task start.
- SWEED-024 replaced the HTML-backed route bodies with React executive composers.
- The current raw files under `apps/web/site/pages` do not match the new uploaded references.
- The uploaded reference SHA-256 values are recorded in the detailed spec.
- Articles has an uploaded DOCX but no uploaded HTML source in this batch.

## Scope

- Replace the three raw route source files with the uploaded HTML bytes.
- Add a reference presentation mode to the legacy renderer.
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

- [ ] Raw Services HTML hash equals `ee21eca6b83d2b3774b127ce3be5a1512d5b2b07a0b9ea315f2abe6ea6008662`.
- [ ] Raw Portfolio HTML hash equals `bfcc2e73fda056cf0103472438a3d93c998bf0f51c04999d83cc009a64fba240`.
- [ ] Raw Offers HTML hash equals `6aeb87c77f01f475936352a966c00de6f412d12380e56e74e41803183d1ebfde`.
- [ ] `/services`, `/portfolio`, and `/offers` use reference presentation.
- [ ] Each page has one shared header, one footer, and no duplicate inline reference navbar.
- [ ] Reference hero/sections/GSAP interactions remain present.
- [ ] Shared shell typography is not changed globally.
- [ ] Check, focused tests, build, deployment, and production smoke checks pass.
- [ ] Desktop/tablet/mobile browser QA has no overflow, console errors, page errors, or broken assets.
- [ ] Reduced-motion content remains complete.

## Risks

- Reference CSS contains broad selectors that can leak into shared chrome.
- Inline scripts may assume the removed reference navbar exists.
- CDN-loaded GSAP plugins may be blocked by CSP or load order.
- Existing production smoke tests may encode the React rebuild structure.

## Rollback

Revert the route restoration commit and restore the prior raw `site/pages` files. Keep the spec and fidelity tests for later review.
