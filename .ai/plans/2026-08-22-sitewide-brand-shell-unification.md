# SWEED Sitewide Brand Shell Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every public SWEED route use the approved shared navbar/footer, SWEED Helvetica Arabic identity, and canonical SWEED marketing-action buttons without redesigning page-specific content, layout, filters, tabs, or demo interactions.

**Architecture:** Keep `LegacyHeader`, `LegacyFooter`, `PublicPageShell`, `BrandActionButton`, and the reference theme bridge as the shared system. Move isolated reference pages onto `presentation="reference"`, theme the remaining legacy Products body without changing its behavior, and wrap standalone public/demo/state routes with shared chrome while retaining their internal UI. Purpose-specific controls such as tabs, filters, carousel controls, channel selectors, and demo reset buttons remain non-CTA controls.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Bun, managed `agent-browser`.

**Spec:** `DESIGN.md`, `.ai/decisions/DEC-014-reference-fidelity-with-sweed-theme-bridge.md`, `.ai/decisions/DEC-015-canonical-sitewide-action-buttons.md`.

**Implementation outcome (2026-08-23):** Complete. Portfolio/Offers could not safely use plain `presentation="reference"` because browser comparison showed it changed the enhanced exact content/runtime. The delivered solution adds `presentation="branded"`: exact approved content/runtime plus stripped prototype chrome, the shared SWEED shell, SWEED typography/theme bridge, and canonical CTA decoration.

## Global Constraints

- Shared desktop navbar stays at the approved compact contract: 77px header spacer, 76px nav, logo physical left, consultation action physical right.
- Shared CTA label remains `احجز استشارتك المجانية` → `/contact`.
- Primary actions: `#261b3e` surface, white label, SWEED pink expanding fill; secondary: white/purple; 16px radius; 48px standard controls.
- SWEED content typography uses `SWEED Helvetica Arabic` with the existing Arabic fallback stack.
- Do not alter approved reference-page section order, copy, layout, motion, or business claims just to align branding.
- Do not convert tabs, filters, selectors, arrows, icon controls, or demo channel buttons into marketing CTAs.
- Preserve zero horizontal overflow at 320px and above.

---

### Task 1: Portfolio and Offers reference shell

**Files:**
- Modify: `apps/web/src/app/(marketing)/portfolio/page.tsx`
- Modify: `apps/web/src/app/(marketing)/offers/page.tsx`
- Modify/Test: `apps/web/src/features/public-site/routes/reference-route-contract.test.ts`

- [x] Write route-contract assertions requiring a shared-brand presentation for Portfolio and Offers.
- [x] Run the focused route/reference tests and observe the current `exact` routes fail the new contract.
- [x] Add and use `presentation="branded"` after plain `reference` failed approved-content browser comparison.
- [x] Verify the branded bridge strips prototype nav/footer, injects the shared SWEED shell, preserves exact page content/runtime, and applies SWEED font/palette/action bridge.
- [x] Agent Browser desktop/mobile checks for shell, font, CTA geometry, overflow, and primary interactions.
- [x] Commit the task independently.

### Task 2: Products typography and action system

**Files:**
- Modify: `apps/web/src/features/legacy-site/legacy-page.tsx` or the narrow Products integration seam selected after inspection.
- Modify/Test: focused legacy Products/theme tests under `apps/web/src/features/legacy-site/`.

- [x] Add a regression contract showing Products keeps its existing shared header/footer while body typography must compute to SWEED Helvetica Arabic.
- [x] Add a contract that product purchase CTAs use the canonical SWEED action mechanism while category/filter controls remain purpose-specific.
- [x] Apply the smallest Products-only theme/action bridge; do not change product content, filters, cards, or purchase destinations.
- [x] Agent Browser desktop/mobile checks for font, purchase CTA styling, filters, shell, and overflow.
- [x] Commit the task independently.

### Task 3: Standalone CRM demo shell

**Files:**
- Modify: `apps/web/src/app/(marketing)/crm-ai-demo/page.tsx`
- Modify: `apps/web/src/features/crm-ai-demo/crm-ai-demo-page.tsx`
- Modify/Test: CRM demo tests if present, otherwise add a route shell contract.

- [x] Add a route contract requiring shared header/footer around the demo.
- [x] Remove or demote only the local site-level chrome that duplicates the global shell; keep the CRM story/frame/channel controls unchanged.
- [x] Keep the AI execution action canonical and keep channel/reset controls purpose-specific.
- [x] Agent Browser desktop/mobile checks including channel selection and primary demo action.
- [x] Commit independently.

### Task 4: Midu clone public shell

**Files:**
- Modify: `apps/web/src/app/(marketing)/midu-clone/page.tsx`
- Modify: `apps/web/src/app/(marketing)/midu-clone/midu-clone.module.css`
- Add/Modify: focused route shell test.

- [x] Add a failing contract requiring shared SWEED header/footer and no duplicate local site nav/footer.
- [x] Preserve the experimental body composition and existing canonical `ButtonLink` CTAs, but remove the local global nav/footer layer.
- [x] Verify the page still has no horizontal overflow and its in-page anchor actions remain functional.
- [x] Commit independently.

### Task 5: 404 shared shell

**Files:**
- Modify: `apps/web/src/app/not-found.tsx`
- Add/Modify: state-page route/shell test.

- [x] Add a failing contract requiring the approved shared header/footer around the 404 content.
- [x] Wrap the existing 404 message and canonical return action without changing its copy.
- [x] Verify desktop/mobile shell and action geometry.
- [x] Commit independently.

### Task 6: Sitewide shell regression matrix and delivery

**Files:**
- Add/Modify: focused shell contract test(s) covering public route implementation seams.
- Update: project memory evidence after verification.

- [x] Run focused brand-shell/reference/button suites.
- [x] Run `bun run check` and record pre-existing unrelated spacing/unit debt separately from introduced regressions.
- [x] Run `bun run build`.
- [x] Run Impeccable detector once over changed UI targets; all five warnings are proven pre-existing in `origin/main`.
- [x] Agent Browser desktop audit over all 26 public surfaces: shared shell expectations, SWEED font, canonical marketing actions, zero overflow.
- [x] Agent Browser 390px audit on all changed routes; exercise mobile menu and primary interactions.
- [x] Fetch `origin/main`; confirm no concurrent upstream commits and fast-forward-safe delivery.
- [x] Push `main` and monitor Vercel to success. Production browser spot checks reached the real Portfolio/Offers deployment before Vercel Security Checkpoint Code 21 blocked further automated traversal from the VPS IP; this external limitation is recorded in STATE/TASKS/HANDOFF.

