# Plan — SWEED Visual System v2

Updated: 2026-07-26
Status: completed
Task: SWEED-021

## Goal

Consolidate SWEED typography, spacing, section rhythm, buttons, containers, and shape rules into semantic tokens that remain responsive across desktop, tablet, and mobile without adding a competing design-system dependency.

## Scope

- Semantic typography, spacing, measure, control, and shape tokens.
- Shared `Section`, `SectionHeader`, and Button primitives.
- Homepage hero, problems, services, why, portfolio, offers, FAQ/blog, and contact sections.
- Updated project design contract.
- Check, build, deployment, and responsive browser verification.

## Decisions

- Keep SWEED's existing React/Next and CSS Modules architecture.
- Use DTCG-style semantic naming and Utopia/Open Props principles as references only.
- Do not add Material, Carbon, Tailwind, or another full runtime design system.
- Preserve bespoke section art direction while forcing shared structural tokens.

## Acceptance Criteria

- [x] Semantic typography roles exist and replace major homepage local heading scales.
- [x] Approved font-weight roles replace fractional heading weights in migrated sections.
- [x] Compact/default/feature section rhythm exists.
- [x] Shared page gutters, content measures, controls, and shape roles exist.
- [x] Shared Section and Button primitives consume the new tokens.
- [x] Homepage major sections consume the system.
- [x] Check and production build pass.
- [x] Public demo returns 200 after deployment.
- [x] 1440, 1024, 390, and 320 viewports have no document-level horizontal overflow.
- [x] Browser console and page errors remain empty.

## Verification

- `bun run check`: passed.
- `bun run build`: passed, 29 routes generated.
- `sweed-demo.service`: active.
- Public homepage: HTTP 200.
- Responsive matrix: no document overflow at 1440×900, 1024×768, 390×844, or 320×568.
- Visible heading structure: exactly one H1.
- Desktop computed font-size count reduced from 29 to 27 while major headings now share semantic roles; remaining variation belongs to legacy/detail UI and future cleanup.
