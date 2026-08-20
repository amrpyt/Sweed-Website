# SWEED About Brand-System Alignment

## Goal

Bring `/about` into the current SWEED visual system without changing the approved About page content, section order, layout, motion, or interaction model.

## Scope

- Keep the approved About reference HTML as the structural source of truth.
- Switch the route from isolated `exact` presentation to the existing themed `reference` presentation.
- Use the shared SWEED header and footer instead of the prototype page chrome.
- Apply the existing SWEED Helvetica Arabic typography, `#261b3e` / `#ed2062` / `#6d6e70` palette bridge, and canonical shared CTA button mechanism.
- Preserve the existing sections, copy, media, animations, carousel, and responsive composition.

## Verification

1. Add a focused route/reference contract test and observe the pre-change failure.
2. Run focused About/reference tests after the route change.
3. Run typography/color/button/duplicate-chrome browser checks.
4. Run TypeScript, lint, relevant design guards, and production build.
5. Review desktop 1440×900, tablet 1024×768, mobile 390×844 and 320×568 with zero horizontal overflow, broken images, or browser errors.
6. Push `main` and verify Vercel production only after local verification succeeds.
