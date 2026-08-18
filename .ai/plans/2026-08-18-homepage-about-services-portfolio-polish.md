# Homepage About, Services, and Portfolio Polish

ID: SWEED-044
Created: 2026-08-18
Updated: 2026-08-18T19:17:00+03:00
Status: active
Related tasks: SWEED-044

## Goal

Rebalance the homepage About/slogan area, simplify and densify Services, and turn Selected Work into a self-moving horizontal showcase without changing the approved SWEED identity or unrelated routes.

## Current System Evidence

- `home-blit-scroll-section.tsx` renders a standalone `من 2011` line before the About lead.
- `home-gap-section.tsx` inserts a circular `N` compass mark between the two slogan phrases, which visually interrupts the centered statement.
- `home-services-scroll-section.tsx` renders the long services intro and the all-services CTA before the service list; desktop services are one full-width row per service.
- `home-archigreen-projects-section.tsx` is a manually controlled horizontal carousel rather than an automatically moving strip.
- The working tree already contains unrelated in-progress SWEED-042 route changes; those files must be preserved untouched by this task.

## Intended Behavior

- About no longer has a separate `من 2011` line; the date remains inside the approved descriptive paragraph.
- The slogan is visually centered without the circular `N` mark.
- Services heading stays on one line at wide desktop widths, the long intro paragraph is removed from the rendered section, services use two columns on desktop, and `شوف كل الخدمات` appears after all service cards.
- Selected Work continuously moves as a horizontal loop, can be paused by the visitor, pauses on hover/focus, and becomes a static manually scrollable strip under reduced motion.

## Scope

- Homepage React section markup and CSS only.
- Focused rendering/contract tests for the requested visible behavior.
- Desktop/tablet/mobile/reduced-motion browser QA on `/`.

## Non-Goals

- No changes to `/services`, `/portfolio`, or `/offers` reference routes.
- No new portfolio claims, metrics, assets, or backend behavior.
- No push to GitHub.

## File and System Map

- Modify: `apps/web/src/features/homepage/home-blit-scroll-section.tsx`
- Modify: `apps/web/src/features/homepage/home-blit-scroll-section.module.css`
- Modify: `apps/web/src/features/homepage/home-gap-section.tsx`
- Modify: `apps/web/src/features/homepage/home-gap-section.module.css`
- Modify: `apps/web/src/features/homepage/home-services-scroll-section.tsx`
- Modify: `apps/web/src/features/homepage/home-services-section.module.css`
- Modify: `apps/web/src/features/homepage/home-archigreen-projects-section.tsx`
- Modify: `apps/web/src/features/homepage/home-archigreen-projects-section.module.css`
- Test: `apps/web/src/features/homepage/homepage-layout-contract.test.tsx`
- Runtime: `sweed-demo.service` and `https://sweed-demo.coderaai.com/`

## Implementation Stages

### Stage 1 — Render-contract tests

Status: in-progress

1. Add focused tests for About, slogan, Services ordering/copy, and portfolio motion controls.
2. Run them and observe the expected failures before implementation.

### Stage 2 — About and slogan balance

Status: not-started

1. Remove the standalone date line and obsolete style.
2. Remove the circular compass mark and simplify slogan alignment/wrapping.

### Stage 3 — Services layout

Status: not-started

1. Remove the rendered long intro paragraph.
2. Move the all-services CTA below the service list.
3. Use a two-column desktop service grid with a compact card composition and preserve single-column mobile/tablet flow.
4. Keep the heading on one line only where the viewport safely supports it.

### Stage 4 — Selected Work auto-strip

Status: not-started

1. Duplicate presentation items for a seamless visual loop while hiding the duplicate set from assistive technology.
2. Add a visible pause/resume control and hover/focus pause behavior.
3. Disable autoplay under `prefers-reduced-motion` and preserve manual horizontal access.

### Stage 5 — Verification and delivery

Status: not-started

1. Run focused tests, `bun run check`, and `bun run build`.
2. Deploy safely without overwriting unrelated dirty work.
3. Browser-QA 1440×900, 1024×768, 390×844, and 320×568 plus reduced motion, overflow, console, and primary controls.
4. Commit only SWEED-044 files; do not push.

## Acceptance Criteria

- No standalone `من 2011` row remains in About.
- No circular `N` compass marker remains in the slogan.
- Services long intro is not rendered; CTA follows the six services; desktop shows two service columns and wide-desktop heading stays one line.
- Portfolio cards move automatically in a seamless strip and expose pause/resume; reduced motion disables autoplay.
- No horizontal overflow at 320px+ and no console/page errors in QA.
- Focused tests, full check, build, deployment health, and public browser QA pass.

## Risks

- Infinite-track duplication can create duplicate screen-reader content; mark the duplicate presentation set `aria-hidden` and non-interactive.
- Desktop two-column cards can become cramped near tablet widths; switch to two columns only at a content-safe desktop breakpoint.
- Autoplay can violate motion preferences; gate it behind `prefers-reduced-motion: no-preference` and provide an explicit pause control.
- Existing SWEED-042 dirty files must not be staged or modified by this task.

## Verification

- `bun test apps/web/src/features/homepage/homepage-layout-contract.test.tsx`
- `PATH=/home/amr/.bun/bin:$PATH bun run check`
- `PATH=/home/amr/.bun/bin:$PATH bun run build`
- Managed `agent-browser` desktop/tablet/mobile/reduced-motion QA on `/`.
- Service/local/public HTTP health checks after deploy.

## Rollback and Recovery

- Revert the SWEED-044 commit only; the task does not require schema, content-source, or infrastructure changes.
- Preserve the pre-existing SWEED-042 dirty files throughout staging, build, and commit steps.
