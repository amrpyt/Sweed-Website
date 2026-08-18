# Homepage Visual Consistency Pass

Date: 2026-08-18
Task: SWEED-039

## Goal

Remove the remaining homepage/header control drift so public actions read as one SWEED system, while preserving existing layout, content, interactions, and the approved reference-page fidelity boundary.

## Scope

- Normalize homepage/header CTA geometry to the shared `--shape-control`, 48px minimum control height, approved font weight, focus language, and existing optical-centering contract.
- Keep pills only where the control is semantically a badge/tag/status or intentionally pill-shaped utility.
- Preserve the mobile Problem Selector as individual SWEED cards instead of flattening each option to square rows.
- Keep Primary / Secondary / Text action hierarchy explicit; do not convert text links or icon-only controls into primary CTAs.
- Do not edit the Services/Portfolio/Offers reference HTML source bytes.

## Test-First Verification

1. Add focused regression assertions for header CTA geometry, homepage CTA shape usage, and mobile Problem Selector radius.
2. Confirm the focused test fails for the current drift.
3. Apply the smallest shared-CSS changes needed to pass.
4. Run focused tests, `bun run check`, and `bun run build`.
5. Restart `sweed-demo.service` and wait for local HTTP 200.
6. Browser QA at 1440x900, 1024x768, 390x844, and 320x568, including focus/hover/active, overflow, console errors, reduced motion, and the Problem Selector interaction.
7. Run production Playwright smoke.
8. Create one logical implementation commit. Do not push.

## Fidelity Boundary

No reference HTML bytes, SVG composition, GSAP choreography, filters, tabs, drawers, overlays, or other interaction logic may change.
