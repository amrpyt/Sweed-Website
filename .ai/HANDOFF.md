# Handoff

Updated: 2026-08-18T16:40:00+03:00

## Read First

- `.ai/PROJECT.md`
- `.ai/STATE.md`
- `.ai/TASKS.md`
- `.ai/decisions/DEC-013-uploaded-html-is-fidelity-source.md`
- `.ai/decisions/DEC-014-reference-fidelity-with-sweed-theme-bridge.md`
- `docs/superpowers/specs/2026-08-12-reference-html-fidelity-restoration-design.md`

## Current Public Contract

- `/services`, `/portfolio`, and `/offers` use the exact approved executable HTML references as their structure/motion/interaction source.
- Their runtime typography and brand palette intentionally match the homepage: `SWEED Helvetica Arabic`, `#261b3e`, `#ed2062`, `#6d6e70`, and current light surfaces.
- Their runtime buttons now follow the homepage SWEED control language through a scoped Theme Bridge: purple primary, light/contextual secondary, compact choice controls, shared radius, touch targets, pink focus/interaction accents.
- Arabic button labels use shared optical-centering tokens: tight control leading plus a measured 3px visual correction. Do not replace this with generic geometric centering only; the SWEED Helvetica Arabic glyph box sits visually low without compensation.
- Do not reintroduce reference Cairo/IBM Plex or the old `#241238` / `#D6246E` identity unless explicitly requested.
- Do not redesign or modernize the page compositions without explicit approval.
- Shared header, footer, AI advisor, routing, and Next runtime stay current.
- Homepage primary CTA-style actions now use the same 48px control height, 16px `--shape-control` radius, strong 700 weight, and SWEED focus language. Text actions remain text actions; semantic badges/tags and icon utilities may remain pill/circular.
- Mobile Problem Selector options remain individual 12px-radius cards with separated borders and a pink selected state; do not collapse them back into zero-radius table rows.

## Latest Application Change

`fix: unify homepage control geometry`

The current control system now:
- normalizes the shared desktop/mobile header CTA to the 48px control contract and keeps the Arabic label optically centered independently from its icon;
- scopes the homepage mobile 44px touch floor with zero specificity so it cannot override component-specific 48px CTA sizing;
- preserves component radius during `focus-visible` instead of forcing a smaller focus-only radius;
- uses `--shape-control` for About, Offers, Blog, and Contact CTA-style actions while preserving semantic pills and text actions;
- keeps mobile Problem Selector choices as separated rounded cards rather than one square-row list;
- defines one semantic optical-centering contract in `tokens.css`;
- keeps shared brand-action icons geometrically centered while moving only the Arabic label by the optical correction;
- keeps compact/mobile brand-action icon geometry inside the 48px control;
- applies the same line-height and optical block padding to reference CTAs and compact choice controls;
- keeps exact uploaded source bytes untouched;
- maps runtime reference colors to current SWEED brand roles;
- maps display/body typography to `SWEED Helvetica Arabic`;
- removes reference Google Fonts requests;
- themes inline SVG and script color literals;
- lets headings inherit section color so hero titles remain white;
- injects a dedicated scoped button theme without changing reference markup or source bytes.

## Verification

- Focused homepage/fidelity/reference tests: 18 passed, 0 failed.
- `bun run check`: 117/117 tests plus type/lint/design guards passed.
- Production build: 29 routes, passed. Final deploy was built while `sweed-demo.service` was stopped, verified `apps/web/.next/BUILD_ID`, then started cleanly.
- Homepage CTA metrics: 48px height, 16px radius, weight 700 for Header/About/Offers/Blog/Contact primary actions at the tested widths.
- Mobile Problem Selector: individual 12px-radius cards at 390px and 320px, pink active border/background, `aria-pressed=true` after selection.
- Browser QA: 1440×900, 1024×768, 390×844, and 320×568; no horizontal overflow, broken loaded images, console errors, or page errors in final checks.
- Reference GSAP/ScrollTrigger lifecycle remains 76 / 71 / 42 for Services / Portfolio / Offers, with zero overflow at 1440px, 390px, and 320px.
- Reduced motion leaves homepage problem choices and reference reveal content visible.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual skip.
- Service active; `/`, `/services`, `/portfolio`, and `/offers` return HTTP 200 locally and publicly.

Previous optical-centering verification remains valid:
- Focused optical/fidelity/reference tests: 14 passed.
- `bun run check`: 113/113 tests plus type/lint/design guards passed.
- Production build: 29 routes, passed.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual skip.
- Measured visible-text alignment on mobile: Services reference CTA `+0.5px`; homepage primary CTA `-0.5px` from geometric center.
- Homepage 320px brand action: 48px height, 28px icon fully contained, label fully contained; Services/Portfolio/Offers controls use the same optical contract and have zero 320px/390px horizontal overflow.
- Desktop 1440×900 and mobile 390×844 / 320×568: no horizontal overflow or browser errors on tested public routes.
- Primary reference CTAs: 48px minimum, 16px shared radius, SWEED font weight 700, purple base, white text, pink interaction/focus accent.
- Choice controls: 44px minimum with consistent inactive/active hierarchy; film tabs retain their dark-context white/purple state for contrast.
- Services sticky navigation and CTA links passed; Portfolio filters/tabs/chips passed; Offers quiz/comparison/tabs/drawers/package selection/form stepper passed.
- GSAP remains Services 76 / Portfolio 71 / Offers 42 ScrollTriggers.
- Google Fonts requests on the three reference pages: 0.
- Service active; public routes HTTP 200.

## Deployment Note

- With Next 16, do not run `next build` against the same `.next` directory while `sweed-demo.service` is actively serving it. Stop the service first, build, verify `.next/BUILD_ID`, then start the service. A concurrent build/restart race was observed and recovered during SWEED-039.

## Remaining Boundary

- Articles is not an executable-HTML fidelity route in the current reference batch.
- Do not push without explicit user approval.
