# SWEED Public Page Executive Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the main SWEED public routes from the approved executive briefs as modular, mobile-first React/Next pages without copying standalone HTML into production.

**Architecture:** Keep route files as Server Components and move page copy into typed sources under `apps/web/src/content/public-site`. Build small route-specific sections under `apps/web/src/features/public-site`, with isolated Client Components only for search, filters, diagnostics, comparison UI, and form submission. Reuse the existing SWEED visual tokens, Carbon 2x spacing aliases, shared shell, existing lead API, and existing accessibility/motion infrastructure.

**Tech Stack:** Next.js App Router 16.2.4, React 19.2.5, TypeScript 5.8, CSS Modules, Bun, GSAP 3.15 where motion is necessary, Playwright, existing SWEED UI primitives.

## Global Constraints

- Base CSS targets 320px to 390px first. Add larger layouts with `min-width` media queries or container queries.
- Use the existing Carbon 2x spacing scale through SWEED semantic aliases. Do not add arbitrary public `margin`, `padding`, or `gap` values.
- Keep readable public text at 14px or larger on mobile.
- Keep every interactive target at least 44px on mobile.
- Preserve one visible `h1` and one `main` landmark per route.
- Keep semantic heading levels in order.
- Keep essential content in natural document flow and available without animation or hover.
- Use `prefers-reduced-motion` fallbacks for every new animation.
- Use logical CSS properties for RTL.
- Do not publish invented results, prices, client names, testimonials, metrics, or guarantees.
- Do not install another design system.
- Do not migrate the backend or CMS in this batch.
- Do not redesign the homepage unless a shared primitive requires a compatible update.
- `/services/development` must permanently redirect to `/services/software-development`.
- Do not push to GitHub without explicit user approval.
- Complete and commit each route phase before starting the next route phase.

---

## File Structure

### Shared contracts and helpers

- Modify: `apps/web/src/content/types.ts` — add only fields needed by the approved public pages.
- Modify: `apps/web/src/features/public-site/page-composers/types.ts` — define route model interfaces.
- Modify: `apps/web/src/features/public-site/page-composers/public-page-models.ts` — compose typed route models.
- Modify: `apps/web/src/features/public-site/repositories/public-site-content-repository.ts` — expose route content and canonical service routing data.
- Create: `apps/web/src/features/public-site/shared/sticky-chip-strip.tsx` — reusable accessible horizontal route/filter strip.
- Create: `apps/web/src/features/public-site/shared/sticky-chip-strip.module.css`.
- Create: `apps/web/src/features/public-site/shared/proof-state-label.tsx` — reusable verified/pending proof label.
- Create: `apps/web/src/features/public-site/shared/proof-state-label.module.css`.
- Create: `apps/web/src/features/public-site/shared/public-page-hero.tsx` — shared semantic hero shell without page-specific artwork.
- Create: `apps/web/src/features/public-site/shared/public-page-hero.module.css`.
- Create: `apps/web/src/features/public-site/shared/service-route.ts` — canonical detail slug helper and redirect map.

### Services

- Rewrite: `apps/web/src/content/public-site/services-page.ts`.
- Create: `apps/web/src/features/public-site/services/services-executive-page.tsx`.
- Create: `apps/web/src/features/public-site/services/services-executive-page.module.css`.
- Create: `apps/web/src/features/public-site/services/services-route-map.tsx`.
- Create: `apps/web/src/features/public-site/services/services-route-map.module.css`.
- Modify: `apps/web/src/app/(marketing)/services/page.tsx`.

### Software development detail

- Create: `apps/web/src/content/public-site/software-development-page.ts`.
- Create: `apps/web/src/features/public-site/software-development/software-development-page.tsx`.
- Create: `apps/web/src/features/public-site/software-development/software-development-page.module.css`.
- Create: `apps/web/src/features/public-site/software-development/software-fault-diagnostic.tsx`.
- Create: `apps/web/src/features/public-site/software-development/software-fault-diagnostic.module.css`.
- Create: `apps/web/src/features/public-site/software-development/software-module-explorer.tsx`.
- Create: `apps/web/src/features/public-site/software-development/software-module-explorer.module.css`.
- Modify: `apps/web/src/app/(marketing)/services/[slug]/page.tsx`.

### Portfolio

- Create: `apps/web/src/content/public-site/portfolio-page.ts`.
- Create: `apps/web/src/features/public-site/portfolio/portfolio-executive-page.tsx`.
- Create: `apps/web/src/features/public-site/portfolio/portfolio-executive-page.module.css`.
- Create: `apps/web/src/features/public-site/portfolio/portfolio-filter-strip.tsx`.
- Modify: `apps/web/src/app/(marketing)/portfolio/page.tsx`.

### Offers

- Create: `apps/web/src/content/public-site/offers-page.ts`.
- Create: `apps/web/src/features/public-site/offers/offers-executive-page.tsx`.
- Create: `apps/web/src/features/public-site/offers/offers-executive-page.module.css`.
- Create: `apps/web/src/features/public-site/offers/needs-selector.tsx`.
- Create: `apps/web/src/features/public-site/offers/needs-selector.module.css`.
- Create: `apps/web/src/features/public-site/offers/package-comparison.tsx`.
- Create: `apps/web/src/features/public-site/offers/package-comparison.module.css`.
- Modify: `apps/web/src/app/(marketing)/offers/page.tsx`.

### Articles

- Rewrite: `apps/web/src/content/public-site/articles-page.ts`.
- Create: `apps/web/src/features/public-site/articles/articles-executive-page.tsx`.
- Create: `apps/web/src/features/public-site/articles/articles-executive-page.module.css`.
- Create: `apps/web/src/features/public-site/articles/article-browser.tsx`.
- Create: `apps/web/src/features/public-site/articles/article-browser.module.css`.
- Rewrite: `apps/web/src/features/public-site/pages/article-detail-public-page.tsx`.
- Extend: `apps/web/src/features/public-site/pages/content-detail-public-page.module.css`.
- Modify: `apps/web/src/app/(marketing)/articles/page.tsx`.
- Modify: `apps/web/src/app/(marketing)/articles/[slug]/page.tsx`.

### Contact

- Rewrite: `apps/web/src/content/public-site/contact-page.ts`.
- Rewrite: `apps/web/src/features/public-site/pages/contact-public-page.tsx`.
- Rewrite: `apps/web/src/features/public-site/pages/contact-public-page.module.css`.
- Rewrite: `apps/web/src/features/public-site/pages/contact-inquiry-form.tsx`.

### SEO and regression

- Modify: `apps/web/src/app/sitemap.ts`.
- Modify: `apps/web/src/features/public-site/index.ts`.
- Modify: `apps/web/tests/smoke/public-site.spec.ts`.
- Create focused Bun tests next to route content/composers as listed in each task.

---

### Task 1: Shared typed contracts and public-page primitives

**Files:**
- Modify: `apps/web/src/content/types.ts`
- Modify: `apps/web/src/features/public-site/page-composers/types.ts`
- Modify: `apps/web/src/features/public-site/repositories/public-site-content-repository.ts`
- Create: `apps/web/src/features/public-site/shared/sticky-chip-strip.tsx`
- Create: `apps/web/src/features/public-site/shared/sticky-chip-strip.module.css`
- Create: `apps/web/src/features/public-site/shared/proof-state-label.tsx`
- Create: `apps/web/src/features/public-site/shared/proof-state-label.module.css`
- Create: `apps/web/src/features/public-site/shared/public-page-hero.tsx`
- Create: `apps/web/src/features/public-site/shared/public-page-hero.module.css`
- Create: `apps/web/src/features/public-site/shared/service-route.ts`
- Test: `apps/web/src/features/public-site/page-composers/public-page-models.test.ts`
- Test: `apps/web/src/features/public-site/repositories/public-site-content-repository.test.ts`

**Interfaces:**
- Produces: `ProofState = "verified" | "pending"`.
- Produces: `ServiceRouteRecord { id: string; canonicalSlug: string; legacySlugs: string[] }`.
- Produces: `getCanonicalServiceSlug(slug: string): string | null`.
- Produces: `getServiceDetailHref(serviceId: string): string`.
- Produces: `<StickyChipStrip ariaLabel items activeId onSelect?>`.
- Produces: `<ProofStateLabel state label?>`.
- Produces: `<PublicPageHero eyebrow title summary actions children?>`.

- [ ] **Step 1: Write failing contract tests**

Add assertions that the development service resolves to the canonical detail route and that proof states reject arbitrary strings.

```ts
import { describe, expect, test } from "bun:test";
import { getCanonicalServiceSlug, getServiceDetailHref } from "../shared/service-route";

describe("service public routing", () => {
  test("maps the development service to the canonical software-development route", () => {
    expect(getCanonicalServiceSlug("software-development")).toBe("software-development");
    expect(getCanonicalServiceSlug("development")).toBe("software-development");
    expect(getServiceDetailHref("development")).toBe("/services/software-development");
  });
});
```

- [ ] **Step 2: Run the focused tests and confirm failure**

Run:

```bash
cd apps/web
PATH=/home/amr/.bun/bin:$PATH bun test src/features/public-site/page-composers/public-page-models.test.ts src/features/public-site/repositories/public-site-content-repository.test.ts
```

Expected: FAIL because the routing helper and new route model fields do not exist.

- [ ] **Step 3: Add minimal typed contracts**

Add only fields required by later routes.

```ts
export type ProofState = "verified" | "pending";

export type PortfolioProof = {
  state: ProofState;
  label: string;
  summary?: string;
};
```

Keep the base `Service`, `Offer`, and `Article` entities small. Put route-only presentation data in route page sources instead of bloating core entities.

- [ ] **Step 4: Implement canonical service routing helper**

```ts
const serviceRoutes = [
  { id: "consulting", canonicalSlug: "consulting", legacySlugs: [] },
  { id: "branding", canonicalSlug: "branding", legacySlugs: [] },
  { id: "digital-marketing", canonicalSlug: "digital-marketing", legacySlugs: [] },
  { id: "development", canonicalSlug: "software-development", legacySlugs: ["development"] },
  { id: "advertising", canonicalSlug: "advertising", legacySlugs: [] },
  { id: "media", canonicalSlug: "media", legacySlugs: [] },
] as const;
```

Do not change homepage service section IDs.

- [ ] **Step 5: Implement shared primitives with mobile-first CSS**

The chip strip must render normal links when no `onSelect` callback exists. The interactive form must use buttons with `aria-pressed` when `onSelect` exists.

Base CSS uses one horizontal row with `overflow-x: auto`, `scroll-snap-type: inline mandatory`, 44px minimum controls, and visible focus state. Large screens may center the strip.

The hero primitive owns semantic spacing and text measure only. Page-specific diagrams stay outside it.

- [ ] **Step 6: Run design guards and tests**

```bash
PATH=/home/amr/.bun/bin:$PATH bun run design:spacing
PATH=/home/amr/.bun/bin:$PATH bun run design:mobile-first
cd apps/web && PATH=/home/amr/.bun/bin:$PATH bun test src/features/public-site/page-composers/public-page-models.test.ts src/features/public-site/repositories/public-site-content-repository.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit Task 1**

```bash
git add apps/web/src/content/types.ts apps/web/src/features/public-site

git commit -m "refactor: add executive public page primitives"
```

---

### Task 2: Rebuild `/services` as a decision journey

**Files:**
- Rewrite: `apps/web/src/content/public-site/services-page.ts`
- Create: `apps/web/src/features/public-site/services/services-executive-page.tsx`
- Create: `apps/web/src/features/public-site/services/services-executive-page.module.css`
- Create: `apps/web/src/features/public-site/services/services-route-map.tsx`
- Create: `apps/web/src/features/public-site/services/services-route-map.module.css`
- Modify: `apps/web/src/app/(marketing)/services/page.tsx`
- Test: `apps/web/src/features/public-site/services/services-page-content.test.ts`
- Modify: `apps/web/tests/smoke/public-site.spec.ts`

**Interfaces:**
- Consumes: `getServiceDetailHref(serviceId)` from Task 1.
- Produces: `servicesPageSource.sections` with IDs `consulting`, `branding`, `digital-marketing`, `development`, `advertising`, `media`.
- Produces: six page sections plus `integrated-path` and `services-cta`.

- [ ] **Step 1: Write a failing source-structure test**

```ts
import { describe, expect, test } from "bun:test";
import { servicesPageSource } from "@/content/public-site/services-page";

describe("services executive source", () => {
  test("keeps the approved six-service journey in order", () => {
    expect(servicesPageSource.services.map((item) => item.id)).toEqual([
      "consulting",
      "branding",
      "digital-marketing",
      "development",
      "advertising",
      "media",
    ]);
  });

  test("gives every service one explicit success indicator and one destination", () => {
    for (const service of servicesPageSource.services) {
      expect(service.successIndicator.length).toBeGreaterThan(10);
      expect(service.href).toMatch(/^\/services\//);
    }
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
cd apps/web
PATH=/home/amr/.bun/bin:$PATH bun test src/features/public-site/services/services-page-content.test.ts
```

Expected: FAIL because the new source model does not exist.

- [ ] **Step 3: Encode approved source content**

Use the executive services brief as the structural source. Keep the six sections and their approved hooks, descriptions, short scope lists, success indicators, and CTA intent.

Do not add pricing, metrics, or invented case-study results.

- [ ] **Step 4: Build the Server Component page**

Render this order:

```tsx
<main>
  <ServicesHero />
  <ServicesRouteMap />
  <ConsultingSection />
  <BrandingSection />
  <DigitalMarketingSection />
  <DevelopmentSection />
  <AdvertisingSection />
  <MediaSection />
  <IntegratedPathSection />
  <ServicesCta />
</main>
```

Each service section must keep the same content contract but use a different visual composition. Keep the DOM reading order identical to the mobile reading order.

- [ ] **Step 5: Add progressive route-map behavior**

Use an isolated Client Component with `IntersectionObserver`. The active state updates as service sections enter the viewport. Clicking an item scrolls to the real anchor.

Do not hide sections when a filter is selected.

- [ ] **Step 6: Add mobile-first layout and reduced-motion behavior**

Base layout: one column, natural flow, no sticky side panels.

At larger widths, allow two-column service compositions, sticky route strip, and visual diagrams. Motion may draw paths once, but content must render visible when reduced motion is active or JavaScript fails.

- [ ] **Step 7: Add route smoke assertions**

Add Playwright assertions for:

```ts
await page.goto("/services");
await expect(page.getByRole("heading", { level: 1 })).toContainText("مش كل مشكلة محتاجة نفس الخدمة");
await expect(page.locator("main section[id]" )).toHaveCount(8);
await expect(page.locator("#development").getByRole("link")).toHaveAttribute("href", "/services/software-development");
```

Also assert one `main`, one `h1`, no horizontal overflow, and visible mobile route chips.

- [ ] **Step 8: Run focused checks, full check, and build**

```bash
cd apps/web
PATH=/home/amr/.bun/bin:$PATH bun test src/features/public-site/services/services-page-content.test.ts
cd ../..
PATH=/home/amr/.bun/bin:$PATH bun run check
PATH=/home/amr/.bun/bin:$PATH bun run build
```

Expected: PASS.

- [ ] **Step 9: Browser QA at four widths**

Use managed `agent-browser` at 1440x900, 1024x768, 390x844, and 320x568. Verify the route strip, six anchors, readable text, no overlap, no horizontal overflow, visible focus, and reduced motion.

- [ ] **Step 10: Commit Task 2**

```bash
git add apps/web/src/content/public-site/services-page.ts apps/web/src/features/public-site/services 'apps/web/src/app/(marketing)/services/page.tsx' apps/web/tests/smoke/public-site.spec.ts

git commit -m "feat: rebuild services decision journey"
```

---

### Task 3: Build canonical Software Development detail page and redirect

**Files:**
- Create: `apps/web/src/content/public-site/software-development-page.ts`
- Create: `apps/web/src/features/public-site/software-development/software-development-page.tsx`
- Create: `apps/web/src/features/public-site/software-development/software-development-page.module.css`
- Create: `apps/web/src/features/public-site/software-development/software-fault-diagnostic.tsx`
- Create: `apps/web/src/features/public-site/software-development/software-fault-diagnostic.module.css`
- Create: `apps/web/src/features/public-site/software-development/software-module-explorer.tsx`
- Create: `apps/web/src/features/public-site/software-development/software-module-explorer.module.css`
- Modify: `apps/web/src/app/(marketing)/services/[slug]/page.tsx`
- Test: `apps/web/src/features/public-site/software-development/software-development-content.test.ts`
- Modify: `apps/web/tests/smoke/public-site.spec.ts`

**Interfaces:**
- Consumes: canonical route helper from Task 1.
- Produces: `SoftwareDevelopmentPageSource` with `layers`, `faultOptions`, `modules`, `process`, `useCases`, and CTA data.

- [ ] **Step 1: Write failing content tests**

```ts
expect(softwareDevelopmentPageSource.layers).toHaveLength(6);
expect(softwareDevelopmentPageSource.faultOptions.length).toBeGreaterThanOrEqual(4);
expect(softwareDevelopmentPageSource.modules.length).toBeGreaterThanOrEqual(5);
```

Also assert every diagnostic option has a `recommendation` and no promise language such as `مضمون` or `نضمن نتيجة`.

- [ ] **Step 2: Run and confirm failure**

```bash
cd apps/web
PATH=/home/amr/.bun/bin:$PATH bun test src/features/public-site/software-development/software-development-content.test.ts
```

- [ ] **Step 3: Encode the approved software-development source**

Use the uploaded software-development HTML structure:

1. Six-layer hero.
2. Fault diagnostic.
3. Screen-only versus operating-system comparison.
4. Module explorer.
5. Delivery process.
6. Use cases and integration outcomes.
7. Final CTA.

Keep the recommendation language advisory, not diagnostic or guaranteed.

- [ ] **Step 4: Implement route selection and permanent redirect**

In `services/[slug]/page.tsx`, resolve aliases before loading normal service details.

```tsx
if (slug === "development") {
  permanentRedirect("/services/software-development");
}

if (slug === "software-development") {
  return <SoftwareDevelopmentPage />;
}
```

Keep existing detail behavior for the other service slugs.

- [ ] **Step 5: Implement diagnostic Client Component**

Use native buttons. Keep the result in an `aria-live="polite"` region. A selected option sets `aria-pressed="true"` and updates the visible recommendation.

- [ ] **Step 6: Implement module explorer Client Component**

Use a tab-like interaction only if all module information remains accessible. Use `role="tablist"`, `role="tab"`, and `role="tabpanel"` with arrow-key support, or use ordinary disclosure buttons if that creates simpler accessibility.

Prefer disclosure buttons unless the source requires tab semantics.

- [ ] **Step 7: Add smoke tests**

Assert:

- `/services/software-development` returns the software-development H1.
- `/services/development` redirects to the canonical URL.
- One fault option updates a visible recommendation.
- No primary content requires hover.
- 320px has no overflow.

- [ ] **Step 8: Run checks, build, and browser QA**

Use the same four widths plus keyboard-only diagnostic/module navigation and reduced motion.

- [ ] **Step 9: Commit Task 3**

```bash
git add apps/web/src/content/public-site/software-development-page.ts apps/web/src/features/public-site/software-development 'apps/web/src/app/(marketing)/services/[slug]/page.tsx' apps/web/tests/smoke/public-site.spec.ts

git commit -m "feat: add software development service journey"
```

---

### Task 4: Rebuild `/portfolio` as proof-led narrative

**Files:**
- Create: `apps/web/src/content/public-site/portfolio-page.ts`
- Create: `apps/web/src/features/public-site/portfolio/portfolio-executive-page.tsx`
- Create: `apps/web/src/features/public-site/portfolio/portfolio-executive-page.module.css`
- Create: `apps/web/src/features/public-site/portfolio/portfolio-filter-strip.tsx`
- Modify: `apps/web/src/app/(marketing)/portfolio/page.tsx`
- Test: `apps/web/src/features/public-site/portfolio/portfolio-page-content.test.ts`
- Modify: `apps/web/tests/smoke/public-site.spec.ts`

**Interfaces:**
- Consumes: `ProofStateLabel` from Task 1.
- Produces: narrative groups for consulting, branding, marketing, media, advertising, and digital work.

- [ ] **Step 1: Write a failing proof-safety test**

```ts
for (const project of portfolioPageSource.projects) {
  if (project.proof.state === "pending") {
    expect(project.proof.metric).toBeUndefined();
  }
}
```

Also assert the six approved narrative service IDs exist.

- [ ] **Step 2: Encode source content with verification boundaries**

Use the executive brief for page structure and project presentation. Use current typed project records only for known project names, summaries, and proof that is already allowed by project memory.

Do not convert illustrative examples from the brief into factual client claims.

- [ ] **Step 3: Implement the page in natural narrative order**

The filter strip scrolls to a narrative section. It does not remove other sections from the DOM.

Each project must show:

- challenge,
- SWEED role,
- deliverable,
- proof state,
- case-study link only when a real destination exists.

- [ ] **Step 4: Add responsive compositions**

Mobile uses one-column natural flow. Desktop may use sticky context, layered identity visuals, phone/dashboard pairing, or browser mock frames, but all text stays in normal document flow.

- [ ] **Step 5: Add Playwright assertions**

Assert all six service narrative anchors, no numeric value on pending proof, and that filter controls scroll instead of hiding content.

- [ ] **Step 6: Run checks, build, four-width QA, keyboard, reduced motion**

Expected: PASS with zero overflow and zero console errors.

- [ ] **Step 7: Commit Task 4**

```bash
git add apps/web/src/content/public-site/portfolio-page.ts apps/web/src/features/public-site/portfolio 'apps/web/src/app/(marketing)/portfolio/page.tsx' apps/web/tests/smoke/public-site.spec.ts

git commit -m "feat: rebuild portfolio proof journey"
```

---

### Task 5: Rebuild `/offers` with needs selector and accessible comparison

**Files:**
- Create: `apps/web/src/content/public-site/offers-page.ts`
- Create: `apps/web/src/features/public-site/offers/offers-executive-page.tsx`
- Create: `apps/web/src/features/public-site/offers/offers-executive-page.module.css`
- Create: `apps/web/src/features/public-site/offers/needs-selector.tsx`
- Create: `apps/web/src/features/public-site/offers/needs-selector.module.css`
- Create: `apps/web/src/features/public-site/offers/package-comparison.tsx`
- Create: `apps/web/src/features/public-site/offers/package-comparison.module.css`
- Modify: `apps/web/src/app/(marketing)/offers/page.tsx`
- Test: `apps/web/src/features/public-site/offers/offers-page-content.test.ts`
- Test: `apps/web/src/features/public-site/offers/needs-selector.test.ts`
- Modify: `apps/web/tests/smoke/public-site.spec.ts`

**Interfaces:**
- Produces: `NeedsAnswers { challenge: string; stage: string; timing: string }`.
- Produces: `getOfferRecommendation(answers: NeedsAnswers): OfferRecommendation` as a pure function.
- Produces: accessible comparison sheet/panel controlled by `open`, `onClose`, and selected package IDs.

- [ ] **Step 1: Write failing pure recommendation tests**

```ts
expect(getOfferRecommendation({
  challenge: "marketing",
  stage: "growth",
  timing: "now",
}).serviceId).toBe("digital-marketing");
```

Add one test per main challenge family. Keep the result a recommendation, not a diagnosis.

- [ ] **Step 2: Encode approved packages without invented final prices**

Use the executive package names and scope. Price text must remain `يبدأ من` only when a verified number exists. Otherwise use `تسعير حسب نطاق المشروع` or `اطلب تسعير مشروعك`.

Do not fabricate time-limited offers. Omit that section when no verified offer exists.

- [ ] **Step 3: Implement three-question selector**

Render one question at a time. Keep a visible progress indicator. Allow skip. Store answers in local state only.

The recommendation result offers three actions: view package, compare, or continue to contact with query context.

- [ ] **Step 4: Implement comparison panel**

Mobile: bottom sheet. Larger screens: centered panel.

Required behaviors:

- focus moves into the panel when opened,
- Tab remains inside,
- Escape closes,
- focus returns to the trigger,
- background cannot receive pointer interaction while open,
- reduced motion removes slide animation,
- mobile compares two packages at a time with an explicit third-package switch.

- [ ] **Step 5: Build the remaining page structure**

Render integrated packages first, then sticky service tabs and service-specific package groups, FAQ, and tailored CTA.

Do not render unverified counters.

- [ ] **Step 6: Add Playwright interaction coverage**

Test full selector completion, comparison open/close/Escape/focus restoration, contact query context, and 320px comparison behavior.

- [ ] **Step 7: Run checks, build, browser QA**

Test desktop, tablet, phone, small phone, keyboard, and reduced motion.

- [ ] **Step 8: Commit Task 5**

```bash
git add apps/web/src/content/public-site/offers-page.ts apps/web/src/features/public-site/offers 'apps/web/src/app/(marketing)/offers/page.tsx' apps/web/tests/smoke/public-site.spec.ts

git commit -m "feat: rebuild offers decision flow"
```

---

### Task 6: Rebuild `/articles` as a searchable knowledge center

**Files:**
- Rewrite: `apps/web/src/content/public-site/articles-page.ts`
- Create: `apps/web/src/features/public-site/articles/articles-executive-page.tsx`
- Create: `apps/web/src/features/public-site/articles/articles-executive-page.module.css`
- Create: `apps/web/src/features/public-site/articles/article-browser.tsx`
- Create: `apps/web/src/features/public-site/articles/article-browser.module.css`
- Modify: `apps/web/src/app/(marketing)/articles/page.tsx`
- Test: `apps/web/src/features/public-site/articles/article-browser.test.ts`
- Modify: `apps/web/tests/smoke/public-site.spec.ts`

**Interfaces:**
- Produces: `filterArticles(articles, { query, category, type, sort }): Article[]` as a pure function.
- Produces: a Client Component that owns transient query/filter state.

- [ ] **Step 1: Write failing filter tests**

Test Arabic title search, category filter, empty results, and deterministic sorting.

```ts
expect(filterArticles(articles, {
  query: "ميزانية",
  category: "all",
  type: "all",
  sort: "latest",
}).map((article) => article.slug)).toContain("marketing-metrics-that-matter");
```

- [ ] **Step 2: Encode the approved knowledge-center structure**

Use the executive articles source for structure and taxonomy. Use only the typed articles that actually exist in the repository.

Do not create fake article bodies for the suggested twelve-launch list. The suggested titles may remain unpublished until their full typed content exists.

- [ ] **Step 3: Implement search and filter behavior**

Use a 250ms client debounce for search updates. Update results in place without scrolling the page to the top.

Show a helpful empty state:

`ملقيناش مقال بنفس الكلمات. جرّب كلمة أقصر أو اختار تصنيف قريب من موضوعك.`

- [ ] **Step 4: Implement page sections**

Render hero search + featured article, sticky filter strip, article grid, problem-led paths, applied guides/case-study links when available, relationship CTA, and final consultation CTA.

Do not render a most-read section until real view data exists.

- [ ] **Step 5: Add Playwright assertions**

Test search, filter, clearing filters, empty state, horizontal filter strip on 320px, one H1, and no layout jump.

- [ ] **Step 6: Run checks, build, four-width QA**

Verify keyboard search/filter flow and reduced motion.

- [ ] **Step 7: Commit Task 6**

```bash
git add apps/web/src/content/public-site/articles-page.ts apps/web/src/features/public-site/articles 'apps/web/src/app/(marketing)/articles/page.tsx' apps/web/tests/smoke/public-site.spec.ts

git commit -m "feat: rebuild articles knowledge center"
```

---

### Task 7: Upgrade `/articles/[slug]` for reading, metadata, and related paths

**Files:**
- Rewrite: `apps/web/src/features/public-site/pages/article-detail-public-page.tsx`
- Extend: `apps/web/src/features/public-site/pages/content-detail-public-page.module.css`
- Modify: `apps/web/src/app/(marketing)/articles/[slug]/page.tsx`
- Test: `apps/web/src/features/public-site/pages/article-detail-content.test.ts`
- Modify: `apps/web/tests/smoke/public-site.spec.ts`

**Interfaces:**
- Consumes: existing typed `Article` records.
- Produces: optional Article JSON-LD only when required source fields exist.

- [ ] **Step 1: Write failing related-content and metadata tests**

Test that a known slug resolves its correct H1, date, reading time, body section order, and related items from existing typed data.

- [ ] **Step 2: Implement the readable article shell**

Mobile order:

1. breadcrumb,
2. category,
3. H1,
4. summary,
5. metadata,
6. featured image when available,
7. article body,
8. related service,
9. related articles,
10. CTA.

Large screens may add an aside after the main reading column. Keep the article measure near 65 characters and never justify Arabic body text.

- [ ] **Step 3: Implement safe share actions**

Use ordinary links for WhatsApp and LinkedIn when URLs can be formed safely. Use the Web Share API only as progressive enhancement if a share button is included.

- [ ] **Step 4: Add structured data only when complete**

Render Article JSON-LD only if title, description, publication date, canonical URL, and image are available. Include author only when typed author data exists.

- [ ] **Step 5: Add Playwright reading tests**

Test one known article at desktop and mobile. Assert natural text alignment, no overflow, correct route H1, share controls named, and one main landmark.

- [ ] **Step 6: Run checks, build, browser QA**

- [ ] **Step 7: Commit Task 7**

```bash
git add apps/web/src/features/public-site/pages/article-detail-public-page.tsx apps/web/src/features/public-site/pages/content-detail-public-page.module.css 'apps/web/src/app/(marketing)/articles/[slug]/page.tsx' apps/web/tests/smoke/public-site.spec.ts

git commit -m "feat: upgrade article reading experience"
```

---

### Task 8: Rebuild `/contact` and connect its form to the real lead API

**Files:**
- Rewrite: `apps/web/src/content/public-site/contact-page.ts`
- Rewrite: `apps/web/src/features/public-site/pages/contact-public-page.tsx`
- Rewrite: `apps/web/src/features/public-site/pages/contact-public-page.module.css`
- Rewrite: `apps/web/src/features/public-site/pages/contact-inquiry-form.tsx`
- Test: `apps/web/src/features/public-site/pages/contact-inquiry-form.test.ts`
- Modify: `apps/web/tests/smoke/public-site.spec.ts`

**Interfaces:**
- Consumes: existing `/api/contact-leads` payload contract.
- Consumes: current `siteSettings` phone, email, and WhatsApp URL.
- Produces: explicit `idle | submitting | success | error` form states.

- [ ] **Step 1: Write failing validation tests**

Extract validation to a pure function in the form file or a nearby `contact-inquiry-form.logic.ts` if needed.

Test:

- name shorter than two characters,
- invalid phone,
- no selected service,
- notes shorter than ten characters,
- valid submission data.

- [ ] **Step 2: Encode the uploaded contact intent using current verified contact data**

Use the source for page promise, contact methods, working-hours structure, form intent, and success/error behavior.

Do not copy its duplicate top bar, duplicate navigation, Font Awesome CDN dependency, or generic gradient styling.

If working hours are not verified in current project data, label the area as a contact-response expectation only if supported. Otherwise omit the specific hours rather than guessing.

- [ ] **Step 3: Implement mobile-first page order**

Render:

1. promise,
2. primary phone/WhatsApp actions,
3. form,
4. contact details,
5. working-hours block only when verified.

Desktop may place details and form side by side without changing the DOM order.

- [ ] **Step 4: Implement real form submission**

Reuse the existing lead API.

```ts
const response = await fetch("/api/contact-leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: values.name,
    phone: values.phone,
    interest: values.service,
    message: values.notes,
    source: searchParams.get("source") ?? "contact-page",
    website: honeypot,
  }),
});
```

Keep query prefill support for service/offer context. Add a honeypot field. Show inline field errors, disabled submit state, `aria-busy`, `aria-live`, server error, and success state.

- [ ] **Step 5: Add Playwright form coverage**

Intercept `/api/contact-leads`, submit valid data, inspect the payload, verify success state, then test an invalid submission and server failure.

- [ ] **Step 6: Run checks, build, browser QA**

Test mobile keyboard flow and 200 percent zoom behavior.

- [ ] **Step 7: Commit Task 8**

```bash
git add apps/web/src/content/public-site/contact-page.ts apps/web/src/features/public-site/pages/contact-public-page.tsx apps/web/src/features/public-site/pages/contact-public-page.module.css apps/web/src/features/public-site/pages/contact-inquiry-form.tsx apps/web/tests/smoke/public-site.spec.ts

git commit -m "feat: rebuild contact conversion journey"
```

---

### Task 9: SEO, sitemap, full regression, deployment, and evidence

**Files:**
- Modify: `apps/web/src/app/sitemap.ts`
- Modify: `apps/web/src/features/public-site/index.ts`
- Modify: `apps/web/tests/smoke/public-site.spec.ts`
- Update: `openspec/changes/rebuild-public-pages-from-executive-briefs/tasks.md`
- Update: `.ai/TASKS.md`
- Update: `.ai/STATE.md`
- Update: `.ai/HANDOFF.md`
- Create: `.ai/sessions/2026-08-08-public-page-executive-rebuild.md`

**Interfaces:**
- Sitemap must emit `/services/software-development`, not `/services/development`.
- Public smoke matrix must include every rebuilt route and at least one dynamic article route.

- [ ] **Step 1: Write a failing sitemap assertion**

Add a focused unit test or repository assertion that the generated sitemap contains the canonical software-development route and excludes the legacy detail alias.

- [ ] **Step 2: Update route metadata and sitemap**

Use `createPageMetadata` with canonical paths for rebuilt static routes. Dynamic routes use their actual canonical slug and existing `SeoMeta` image when available.

- [ ] **Step 3: Run the full repository check**

```bash
PATH=/home/amr/.bun/bin:$PATH bun run check
```

Expected: TypeScript, ESLint, unit tests, spacing guard, and mobile-first guard all pass.

- [ ] **Step 4: Run the production build**

```bash
PATH=/home/amr/.bun/bin:$PATH bun run build
```

Expected: PASS with all marketing routes generated or server-renderable as intended.

- [ ] **Step 5: Restart the demo and poll local readiness**

```bash
sudo systemctl restart sweed-demo.service
for i in 1 2 3 4 5 6 7 8; do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3010/ || true)
  echo "$i:$code"
  [ "$code" = "200" ] && break
  sleep 2
done
systemctl is-active sweed-demo.service
```

Expected: service `active` and local homepage `200` after warm-up.

- [ ] **Step 6: Run public route HTTP matrix**

Verify `200` for:

- `/services`
- `/services/software-development`
- `/portfolio`
- `/offers`
- `/articles`
- one existing `/articles/[slug]`
- `/contact`

Verify `/services/development` redirects permanently to `/services/software-development`.

- [ ] **Step 7: Run final managed browser matrix**

For each rebuilt route, test representative desktop and mobile widths. For interaction-heavy routes, include 320px and reduced-motion mode.

Required checks:

- one H1,
- one main,
- no horizontal overflow,
- no broken meaningful images,
- no console errors,
- no page errors,
- controls at least 44px on mobile,
- text at least 14px on mobile,
- focus visible,
- keyboard flow works,
- essential content visible with reduced motion.

- [ ] **Step 8: Update OpenSpec and project memory with exact evidence**

Record command results, route matrix, viewport matrix, known omissions, and any verified-content boundaries. Do not mark SWEED-024 complete unless every acceptance criterion has evidence.

- [ ] **Step 9: Commit Task 9**

```bash
git add apps/web/src/app/sitemap.ts apps/web/src/features/public-site apps/web/tests/smoke/public-site.spec.ts openspec/changes/rebuild-public-pages-from-executive-briefs .ai/TASKS.md .ai/sessions/2026-08-08-public-page-executive-rebuild.md

git commit -m "test: verify executive public page rebuild"
```

- [ ] **Step 10: Inspect final branch state**

```bash
rtk git status --short --branch
rtk git log --oneline -12
```

Expected: clean working tree. Report branch ahead count. Do not push.

---

## Plan Self-Review

- Spec coverage: Services, Software Development, Portfolio, Offers, Articles index, Article detail, Contact, SEO, redirect, mobile-first, accessibility, verification, and deployment all map to explicit tasks.
- Source boundary: no task publishes unverified metrics, prices, working hours, testimonials, or client proof.
- Architecture boundary: Server Components own static composition. Client Components are isolated to interactive behavior.
- Mobile-first boundary: every route starts with semantic one-column DOM order and uses progressive enhancement for larger screens.
- YAGNI boundary: no new CMS, backend, runtime design system, or global motion framework is added.
- Test boundary: every route phase has a failing-test step, focused verification, full check/build gate, browser QA, and atomic commit.
