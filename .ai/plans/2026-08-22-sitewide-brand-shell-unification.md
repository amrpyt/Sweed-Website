# SWEED Sitewide Brand Shell Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every public SWEED route use the approved shared navbar/footer, SWEED Helvetica Arabic identity, and canonical SWEED marketing-action buttons without redesigning page-specific content, layout, filters, tabs, or demo interactions.

**Architecture:** Keep `LegacyHeader`, `LegacyFooter`, `PublicPageShell`, `BrandActionButton`, and the reference theme bridge as the shared system. Move isolated reference pages onto `presentation="reference"`, theme the remaining legacy Products body without changing its behavior, and wrap standalone public/demo/state routes with shared chrome while retaining their internal UI. Purpose-specific controls such as tabs, filters, carousel controls, channel selectors, and demo reset buttons remain non-CTA controls.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Bun, managed `agent-browser`.

**Spec:** `DESIGN.md`, `.ai/decisions/DEC-014-reference-fidelity-with-sweed-theme-bridge.md`, `.ai/decisions/DEC-015-canonical-sitewide-action-buttons.md`.

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

- [ ] Write route-contract assertions requiring `presentation="reference"` for Portfolio and Offers.
- [ ] Run the focused route/reference tests and observe the current `exact` routes fail the new contract.
- [ ] Switch only the presentation mode to `reference`.
- [ ] Verify the reference bridge strips prototype nav/footer, injects the shared SWEED shell, preserves page content, and applies SWEED font/palette/action bridge.
- [ ] Agent Browser desktop/mobile checks for shell, font, CTA geometry, overflow, and primary interactions.
- [ ] Commit the task independently.

### Task 2: Products typography and action system

**Files:**
- Modify: `apps/web/src/features/legacy-site/legacy-page.tsx` or the narrow Products integration seam selected after inspection.
- Modify/Test: focused legacy Products/theme tests under `apps/web/src/features/legacy-site/`.

- [ ] Add a regression contract showing Products keeps its existing shared header/footer while body typography must compute to SWEED Helvetica Arabic.
- [ ] Add a contract that product purchase CTAs use the canonical SWEED action mechanism while category/filter controls remain purpose-specific.
- [ ] Apply the smallest Products-only theme/action bridge; do not change product content, filters, cards, or purchase destinations.
- [ ] Agent Browser desktop/mobile checks for font, purchase CTA styling, filters, shell, and overflow.
- [ ] Commit the task independently.

### Task 3: Standalone CRM demo shell

**Files:**
- Modify: `apps/web/src/app/(marketing)/crm-ai-demo/page.tsx`
- Modify: `apps/web/src/features/crm-ai-demo/crm-ai-demo-page.tsx`
- Modify/Test: CRM demo tests if present, otherwise add a route shell contract.

- [ ] Add a route contract requiring shared header/footer around the demo.
- [ ] Remove or demote only the local site-level chrome that duplicates the global shell; keep the CRM story/frame/channel controls unchanged.
- [ ] Keep the AI execution action canonical and keep channel/reset controls purpose-specific.
- [ ] Agent Browser desktop/mobile checks including channel selection and primary demo action.
- [ ] Commit independently.

### Task 4: Midu clone public shell

**Files:**
- Modify: `apps/web/src/app/(marketing)/midu-clone/page.tsx`
- Modify: `apps/web/src/app/(marketing)/midu-clone/midu-clone.module.css`
- Add/Modify: focused route shell test.

- [ ] Add a failing contract requiring shared SWEED header/footer and no duplicate local site nav/footer.
- [ ] Preserve the experimental body composition and existing canonical `ButtonLink` CTAs, but remove the local global nav/footer layer.
- [ ] Verify the page still has no horizontal overflow and its in-page anchor actions remain functional.
- [ ] Commit independently.

### Task 5: 404 shared shell

**Files:**
- Modify: `apps/web/src/app/not-found.tsx`
- Add/Modify: state-page route/shell test.

- [ ] Add a failing contract requiring the approved shared header/footer around the 404 content.
- [ ] Wrap the existing 404 message and canonical return action without changing its copy.
- [ ] Verify desktop/mobile shell and action geometry.
- [ ] Commit independently.

### Task 6: Sitewide shell regression matrix and delivery

**Files:**
- Add/Modify: focused shell contract test(s) covering public route implementation seams.
- Update: project memory evidence after verification.

- [ ] Run focused brand-shell/reference/button suites.
- [ ] Run `bun run check` and record any pre-existing unrelated failure separately from introduced regressions.
- [ ] Run `bun run build`.
- [ ] Run Impeccable detector once over changed UI targets.
- [ ] Agent Browser desktop audit over all 26 public surfaces: shared shell expectations, SWEED font, canonical marketing actions, zero overflow.
- [ ] Agent Browser 390px audit on all changed routes; exercise mobile menu and one primary interaction per changed route.
- [ ] Fetch `origin/main`, integrate any concurrent upstream changes without overwriting them, rerun focused checks/build if integration changed affected files.
- [ ] Push `main`, monitor Vercel to success, and repeat production spot checks on every changed route.

