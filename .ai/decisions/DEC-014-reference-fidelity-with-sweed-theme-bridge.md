# DEC-014 — Reference fidelity with SWEED theme bridge

Date: 2026-08-12
Status: accepted
Task: SWEED-036

## Context

Services, Portfolio, and Offers now render from the exact uploaded executable HTML references. After the fidelity restoration, the user explicitly asked for those pages to feel like the homepage because the reference files used different typography and a slightly different purple/pink palette.

The requirement is therefore no longer literal visual-byte fidelity at runtime. The executable HTML remains the source of truth for structure, SVG composition, motion, interaction, and responsive behavior, while the active SWEED website identity must govern typography and brand colors.

## Decision

1. Preserve the uploaded reference bytes unchanged and keep their SHA-256 fidelity tests.
2. Preserve the reference layout, section composition, SVG geometry, GSAP timings, ScrollTrigger behavior, filters, tabs, quiz, drawers, and overlays.
3. Apply a runtime-only theme bridge inside `.sweed-reference-page`.
4. Use the same public typography stack as the homepage: `SWEED Helvetica Arabic` with the existing Cairo/SF Arabic fallbacks.
5. Normalize the reference brand roles to the live homepage identity:
   - Primary purple: `#261b3e`
   - Primary pink: `#ed2062`
   - Muted text: `#6d6e70`
   - Surface/background: `#f7f8fb` / `#f8f9fa`
6. Remove the reference Google Fonts requests because Cairo/IBM Plex are no longer runtime dependencies for these pages.
7. Theme inline SVG and scripted animation colors through the same runtime normalization so motion and static states use one palette.
8. Keep reference heading colors inheriting from their section so dark heroes retain white text while light sections retain SWEED purple text.

## Consequences

- The three pages keep the exact interaction and composition delivered by the executable references while visually belonging to the current SWEED website.
- Source-fidelity hashes remain meaningful because raw uploaded sources are not edited.
- Runtime snapshots intentionally differ from the original reference only in approved brand typography and palette roles, plus the already-approved shared header/footer integration.
- Future layout or motion changes still require explicit user approval.

## Verification

- Exact source SHA-256 tests still pass for Services, Portfolio, and Offers.
- Browser comparison confirms homepage and reference routes compute the same `SWEED Helvetica Arabic`, `#261b3e`, and `#ed2062` identity values.
- Google Fonts requests are absent on all three reference pages.
- Services, Portfolio, and Offers retain 76, 71, and 42 ScrollTriggers respectively.
- Desktop, 390px, and 320px checks show no horizontal overflow or browser errors.
- Production Playwright remains green.

## Revisit trigger

Revisit if the official SWEED font or brand palette changes, or if the user explicitly asks for a reference page to retain its original typography/colors instead of the website-wide identity.