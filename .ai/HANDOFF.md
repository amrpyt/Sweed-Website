# Handoff

Updated: 2026-08-13T21:05:00+03:00

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
- Do not reintroduce reference Cairo/IBM Plex or the old `#241238` / `#D6246E` identity unless explicitly requested.
- Do not redesign or modernize the page compositions without explicit approval.
- Shared header, footer, AI advisor, routing, and Next runtime stay current.

## Latest Application Change

`fix: unify SWEED button system across public pages`

The reference normalizer now:
- keeps exact uploaded source bytes untouched;
- maps runtime reference colors to current SWEED brand roles;
- maps display/body typography to `SWEED Helvetica Arabic`;
- removes reference Google Fonts requests;
- themes inline SVG and script color literals;
- lets headings inherit section color so hero titles remain white;
- injects a dedicated scoped button theme without changing reference markup or source bytes.

## Verification

- Focused fidelity/reference tests: 12 passed.
- `bun run check`: 111/111 tests plus type/lint/design guards passed.
- Production build: 29 routes, passed.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual skip.
- Desktop 1440×900 and mobile 390×844 / 320×568: no horizontal overflow or browser errors on tested public routes.
- Primary reference CTAs: 48px minimum, 16px shared radius, SWEED font weight 700, purple base, white text, pink interaction/focus accent.
- Choice controls: 44px minimum with consistent inactive/active hierarchy; film tabs retain their dark-context white/purple state for contrast.
- Services sticky navigation and CTA links passed; Portfolio filters/tabs/chips passed; Offers quiz/comparison/tabs/drawers/package selection/form stepper passed.
- GSAP remains Services 76 / Portfolio 71 / Offers 42 ScrollTriggers.
- Google Fonts requests on the three reference pages: 0.
- Service active; public routes HTTP 200.

## Remaining Boundary

- Articles is not an executable-HTML fidelity route in the current reference batch.
- Do not push without explicit user approval.
