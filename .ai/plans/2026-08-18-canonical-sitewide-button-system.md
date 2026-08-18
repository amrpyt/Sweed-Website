# Canonical site-wide SWEED button system

Source: user approval on 2026-08-18 to adopt the restored button design across the whole website.

## Goal

Make the restored SWEED action button the single visual contract for public CTA-style buttons: deep-purple primary, white secondary/light, pink inset fill interaction, shared radius, Arabic optical centering, focus, disabled, and reduced-motion behavior.

## Scope

1. Lock the visual contract in shared semantic tokens and `DESIGN.md`.
2. Keep `Button` / `ButtonLink` and `BrandActionButton` as the canonical React implementation.
3. Remove page-level CTA styling that attempts to repaint canonical buttons.
4. Migrate remaining public CTA-looking links/buttons that bypass the shared implementation where doing so preserves their existing role.
5. Keep non-CTA controls distinct: tabs, filters, carousel arrows/dots, icon-only buttons, menu controls, quick prompts, selectors, and other compact product controls do not become marketing CTAs.
6. Preserve the reference-page runtime bridge and legacy product CTA bridge on the same purple/white/pink mechanism without modifying approved reference HTML bytes.
7. Add regression coverage so future refactors cannot silently invert or repaint the canonical hierarchy.

## Verification

- Observe the new site-wide contract test fail before implementation.
- Focused button/public-route tests pass.
- Impeccable detector passes for changed UI targets.
- `bun run check` and `bun run build` pass.
- Deploy safely to `sweed-demo.service` from a clean committed state.
- Browser QA on representative public routes at 1440×900, 1024×768, 390×844, and 320×568 checks primary/secondary colors, fill hover, focus, optical centering, overflow, broken images, and browser errors.

## Delivery constraints

- Preserve unrelated dirty SWEED-042 reference-service work.
- Commit the canonicalization atomically.
- Do not push.
