# Plan — Desktop navbar cleanup

Date: 2026-07-23
Status: completed
Task: SWEED-015

## Goal

Restore a clean professional desktop navbar by removing mobile-only arrow affordances from desktop, tightening alignment, and preserving the existing iOS-style mobile top sheet.

## Problems Observed

- Every desktop navigation link shows a left arrow intended only for the mobile top sheet.
- Font Awesome display rules override the generic hidden state.
- The repeated arrows clutter the primary navigation and weaken the active-state hierarchy.
- Desktop spacing needs to remain balanced between logo, route list, and primary CTA.

## Implementation

1. Replace the Font Awesome navigation arrow element with a CSS-controlled text glyph that cannot override `display: none` on desktop.
2. Keep arrows visible only inside the mobile breakpoint.
3. Refine desktop nav gaps, link padding, and active underline placement at 1280–1700px widths.
4. Preserve mobile sheet layout, focus behavior, anchor navigation, CTA, and contact actions.

## Acceptance Criteria

- [x] Desktop route links show no arrows.
- [x] Mobile top-sheet route links retain one clear directional arrow.
- [x] Logo, route list, and CTA are vertically aligned and fit without overlap at 1280, 1440, 1590, and 1700px.
- [x] Active route remains clear without visual clutter.
- [x] Mobile 390px top sheet remains unchanged functionally and has no overflow.
- [x] Check, build, deployment, public HTTP, desktop/mobile screenshots, console, and browser errors pass.

## Completion Evidence

- Application commit: `23119c8 fix: clean desktop navigation arrows`.
- Desktop visible-arrow count is zero at 1081, 1280, 1440, 1590, and 1700px.
- Desktop links do not overlap and the page has no horizontal overflow.
- Mobile 390px top sheet retains exactly seven visible arrows and fits in a 359×600px panel without internal scrolling.
- Escape restores focus to the trigger; reduced motion removes transition duration.
- Mobile `خدماتنا` closes the sheet and lands at approximately 65px beneath the fixed header.
- Check/build, service readiness, public HTTP, browser console, and browser error checks passed.

## Delivery

- Commit application changes atomically.
- Update project memory after verification.
- Do not push unless explicitly requested.
