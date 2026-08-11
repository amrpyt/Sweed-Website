# Reference HTML Fidelity Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore `/services`, `/portfolio`, and `/offers` to the exact newly uploaded HTML reference bodies while keeping the current shared SWEED shell.

**Architecture:** Keep the approved raw HTML bytes in `apps/web/site/pages` and render them through the existing server-side legacy parser. Add a dedicated `reference` presentation path that strips only reference chrome, scopes broad shell-leaking CSS selectors, keeps the extracted reference scripts, and skips old runtime enhancement layers that would alter the page body.

**Tech Stack:** Next.js App Router, React Server Components, Bun tests, GSAP/ScrollTrigger from the reference HTML, existing LegacyPage shell, agent-browser.

## Global Constraints

- Uploaded HTML is the visual and motion source of truth for Services, Portfolio, and Offers.
- Preserve the raw source SHA-256 fingerprints recorded in the approved spec.
- Shared header, footer, AI advisor, routing, and shell typography remain current.
- Do not redesign reference sections or translate them into new React compositions.
- Do not claim Articles HTML fidelity because no Articles HTML was uploaded in this batch.
- Do not push to GitHub without explicit user approval.

---

### Task 1: Install exact uploaded HTML sources and lock their fingerprints

**Files:**
- Replace: `apps/web/site/pages/services.html`
- Replace: `apps/web/site/pages/portfolio.html`
- Replace: `apps/web/site/pages/offers.html`
- Create: `apps/web/src/features/legacy-site/reference-html-fidelity.test.ts`

**Interfaces:**
- Consumes: uploaded raw HTML bytes.
- Produces: exact on-disk source files consumed by `getLegacyPage`.

- [ ] **Step 1: Write the failing fingerprint test**

Create a Bun test that reads each raw source as bytes, hashes it with `createHash("sha256")`, and asserts these exact values:

```ts
const expected = {
  services: "ee21eca6b83d2b3774b127ce3be5a1512d5b2b07a0b9ea315f2abe6ea6008662",
  portfolio: "bfcc2e73fda056cf0103472438a3d93c998bf0f51c04999d83cc009a64fba240",
  offers: "6aeb87c77f01f475936352a966c00de6f412d12380e56e74e41803183d1ebfde",
} as const;
```

- [ ] **Step 2: Run the fingerprint test and verify it fails against the current repository files**

Run:

```bash
PATH=/home/amr/.bun/bin:$PATH bun test apps/web/src/features/legacy-site/reference-html-fidelity.test.ts
```

Expected: all three fingerprint assertions fail.

- [ ] **Step 3: Replace each raw source with the exact uploaded HTML content**

Use the uploaded Services HTML for `services.html`, Portfolio HTML for `portfolio.html`, and Offers HTML for `offers.html`. Do not reformat the source.

- [ ] **Step 4: Verify exact fingerprints**

Run the focused test again and also run `sha256sum` on all three files.

Expected: all three hashes match the approved values exactly.

- [ ] **Step 5: Commit the raw source restoration**

```bash
git add apps/web/site/pages/services.html apps/web/site/pages/portfolio.html apps/web/site/pages/offers.html apps/web/src/features/legacy-site/reference-html-fidelity.test.ts
git commit -m "fix: restore uploaded reference HTML sources"
```

---

### Task 2: Add an isolated reference presentation mode

**Files:**
- Modify: `apps/web/src/features/legacy-site/legacy-html.ts`
- Modify: `apps/web/src/features/legacy-site/legacy-page.tsx`
- Modify: `apps/web/src/features/legacy-site/legacy-html.test.ts`
- Create: `apps/web/src/features/legacy-site/reference-page.test.ts`

**Interfaces:**
- Produces: `LegacyPresentation = "legacy" | "reference"`.
- Produces: `getLegacyPage(page, { presentation })` with legacy behavior unchanged by default.
- Produces: `<LegacyPage page="..." presentation="reference" />`.

- [ ] **Step 1: Write failing parser tests for reference mode**

The tests must assert:

```ts
const services = getLegacyPage("services", { presentation: "reference" });
expect(services.bodyHtml).toContain('id="services-hero"');
expect(services.bodyHtml).not.toContain('<nav class="nav"');
expect(services.bodyHtml).not.toMatch(/<footer\b/i);
expect(services.headHtml).toContain(".sweed-reference-page");
expect(services.scripts.some((script) => script.src?.includes("gsap"))).toBe(true);
```

Add equivalent route-specific marker assertions for Portfolio and Offers.

- [ ] **Step 2: Run the focused tests and verify they fail before implementation**

Run:

```bash
PATH=/home/amr/.bun/bin:$PATH bun test apps/web/src/features/legacy-site/legacy-html.test.ts apps/web/src/features/legacy-site/reference-page.test.ts
```

- [ ] **Step 3: Implement parser-level reference isolation**

Add a `LegacyPresentation` type and an optional presentation argument to `getLegacyPage`.

For `reference` mode only:

1. Strip `<nav class="nav" ...>...</nav>` from the extracted body.
2. Strip the reference footer.
3. Do not run `normalizeLegacyAccessibility` or `addSectionAnchors` on the reference body.
4. Continue safe internal-link, asset, and contact rewrites.
5. Rewrite the reference CSS `body` selector to `.sweed-reference-page`.
6. Rewrite generic `footer` selectors so they cannot target `LegacyFooter`.
7. Leave all reference component declarations, SVG styles, media queries, keyframes, and timings unchanged.
8. Extract and preserve the exact reference scripts.

Keep the default legacy parser path byte-for-byte compatible with its current behavior after normalization.

- [ ] **Step 4: Implement component-level reference presentation**

Update `LegacyPage` so `presentation="reference"`:

```tsx
<LegacyHeader page={page} />
<div className="sweed-reference-page" dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
<LegacyFooter />
<AiAdvisorWidget />
```

The reference path must not render `LegacyBreadcrumb`, `LegacyEnhancements`, `AutomationDemo`, or `OfferFunnelController`.

Keep all extracted reference scripts after the body.

- [ ] **Step 5: Update obsolete legacy normalization tests**

Remove or move assertions that were specific to the replaced old Offers and Portfolio HTML. Keep the Articles and Products accessibility normalization coverage because those pages still use the old legacy path.

- [ ] **Step 6: Run focused tests**

Expected: parser/reference tests pass and old legacy Articles/Products normalization tests still pass.

- [ ] **Step 7: Commit the reference presentation mode**

```bash
git add apps/web/src/features/legacy-site
git commit -m "feat: isolate exact reference page rendering"
```

---

### Task 3: Restore the three public routes to reference rendering

**Files:**
- Modify: `apps/web/src/app/(marketing)/services/page.tsx`
- Modify: `apps/web/src/app/(marketing)/portfolio/page.tsx`
- Modify: `apps/web/src/app/(marketing)/offers/page.tsx`
- Create: `apps/web/src/features/public-site/routes/reference-route-contract.test.ts`

**Interfaces:**
- Consumes: `publicLegacyRoutes` metadata and `LegacyPage` reference mode.
- Produces: public route components that render the approved HTML body inside the current shell.

- [ ] **Step 1: Write failing route-contract tests**

Read the three route source files and assert each uses `LegacyPage` with `presentation="reference"`. Also assert `/articles/page.tsx` still imports `ArticlesExecutivePage` in this batch.

- [ ] **Step 2: Run the route-contract test and verify it fails**

- [ ] **Step 3: Restore route components**

Each page must keep its current canonical metadata path while rendering:

```tsx
return <LegacyPage page="services" presentation="reference" />;
```

Use the corresponding page key for Portfolio and Offers.

Do not delete the React executive page code in this batch. It remains available for rollback until the user approves the restored references.

- [ ] **Step 4: Run route and source tests**

Expected: route contract and hash tests pass.

- [ ] **Step 5: Run the full code gate**

```bash
PATH=/home/amr/.bun/bin:$PATH bun run check
PATH=/home/amr/.bun/bin:$PATH bun run build
```

Expected: all tests, TypeScript, lint, design guards, and production build pass.

- [ ] **Step 6: Commit route restoration**

```bash
git add apps/web/src/app/'(marketing)'/services/page.tsx apps/web/src/app/'(marketing)'/portfolio/page.tsx apps/web/src/app/'(marketing)'/offers/page.tsx apps/web/src/features/public-site/routes/reference-route-contract.test.ts
git commit -m "fix: render uploaded internal page references"
```

---

### Task 4: Deploy and verify visual and interaction fidelity

**Files:**
- Modify only if QA exposes an integration defect.
- Update: `.ai/STATE.md`
- Update: `.ai/TASKS.md`
- Update: `.ai/HANDOFF.md`
- Create: `.ai/sessions/2026-08-12-reference-html-fidelity-restoration.md`

**Interfaces:**
- Produces: verified demo routes on `https://sweed-demo.coderaai.com`.

- [ ] **Step 1: Read the managed browser core skill**

Run:

```bash
agent-browser skills get core --full
```

- [ ] **Step 2: Deploy the verified build**

Restart `sweed-demo.service`, poll `http://127.0.0.1:3010/` until HTTP 200, then verify public HTTPS for all three routes.

- [ ] **Step 3: Run the production Playwright smoke suite**

```bash
PATH=/home/amr/.bun/bin:$PATH PROD_BASE_URL=https://sweed-demo.coderaai.com bun run --cwd apps/web smoke:prod
```

- [ ] **Step 4: Browser-check Services**

At 1440×900, 1024×768, 390×844, and 320×568 verify one header/footer, no extra breadcrumb, no overflow, and expected reference markers. Exercise sticky service navigation and scroll-linked motion.

- [ ] **Step 5: Browser-check Portfolio**

Verify the reference hero, trust/filter strip, consulting dossiers, brand layers, marketing phone/dashboard, filmstrip, advertising wall, digital browser section, and filter behavior.

- [ ] **Step 6: Browser-check Offers**

Exercise the three-step needs selector, main package details, comparison overlay open/close/focus, service tabs, package drawers, and final CTA.

- [ ] **Step 7: Verify reduced motion and runtime health**

For all three routes verify content stays visible with reduced motion. Check browser console, page errors, failed assets, duplicate IDs, and horizontal overflow.

- [ ] **Step 8: Fix only integration defects**

If QA finds CSS leakage, script assumptions about removed chrome, or shell collisions, fix only the integration seam. Do not redesign the reference body.

- [ ] **Step 9: Re-run all affected verification after any fix**

Repeat focused tests, `bun run check`, build, service restart, public smoke, and affected browser cases.

- [ ] **Step 10: Record evidence and final commits**

Update project memory with exact hashes, test results, deployed route results, and remaining Articles follow-up. Commit memory separately.
