# SWEED Reference Button System Unification

Updated: 2026-08-13T20:24:00+03:00
Task: SWEED-037

## Goal

Make `/services`, `/portfolio`, and `/offers` use the same SWEED button language as the homepage without changing the approved reference HTML bytes, layout, SVG composition, GSAP choreography, or interaction logic.

## Implementation

1. Extract the incumbent homepage control language from `button.module.css`, `brand-action-button.module.css`, `button.tsx`, and `tokens.css`.
2. Add regression assertions to `reference-page.test.ts` for three runtime families: primary CTA, secondary/ghost, and choice/filter/tab controls.
3. Run the focused test and confirm the new assertions fail before implementation.
4. Extend the runtime reference theme bridge in `reference-html-normalizer.ts` with scoped SWEED button rules only. Preserve existing reference markup and scripts.
5. Keep primary CTAs purple with pink interaction accents; keep secondary controls light/transparent; keep choice controls compact with distinct inactive and active states.
6. Preserve minimum 44px touch targets, SWEED Helvetica Arabic, `--shape-control`, visible pink `:focus-visible`, restrained hover/active motion, and reduced-motion behavior.
7. Run focused fidelity/reference tests, `bun run check`, `bun run build`, restart `sweed-demo.service`, and wait for local HTTP 200.
8. Run browser QA on homepage + three reference routes at 1440×900, 390×844, and 320×568. Exercise the requested Services, Portfolio, and Offers interactions and inspect styles, overflow, assets, console/page errors, GSAP, and ScrollTrigger lifecycle.
9. Run production Playwright smoke. If all verification is green, create one implementation commit only: `fix: unify SWEED button system across public pages`.

## Constraints

- Do not edit deterministic reference source bytes.
- Do not redesign reference layouts or rewrite their interactions.
- Do not push GitHub.
- Do not create per-step commits.
- Preserve unrelated work.

