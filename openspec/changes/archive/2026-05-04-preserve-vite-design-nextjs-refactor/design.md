## Context

The existing `site/` folder is the deployable old website source. It contains standalone HTML pages with embedded CSS and page behavior. The previous Next.js implementation incorrectly redesigned those pages. This correction must preserve the old design exactly and ignore `v2/` and `v3/`.

## Goals / Non-Goals

**Goals:**

- Render the same visual output as the old `site/` pages.
- Keep Bun and Next.js App Router.
- Use shared code for loading, parsing, route mapping, metadata, and rendering legacy pages.
- Avoid copying design from `v2/` or `v3/`.

**Non-Goals:**

- Do not redesign pages.
- Do not rewrite copy, colors, spacing, or section order.
- Do not integrate Sanity or Mastra in this correction.
- Do not delete `site/` reference files.

## Decisions

### Decision 1: Treat `site/` as the only source of truth

All visual rendering comes from `site/index.html` and `site/pages/*.html`.

Rationale: The requested output is the exact old Vite/static appearance.

### Decision 2: Use a shared legacy renderer component

Create `src/features/legacy-site` to read legacy HTML, extract head styles/body markup, rewrite known static links, and render it inside App Router pages.

Rationale: This preserves exact visuals while still moving routing and runtime to Next.js.

### Decision 3: Keep clean Next routes

Map:

- `/` -> `site/index.html`
- `/about` -> `site/pages/about.html`
- `/services` -> `site/pages/services.html`
- `/services/[slug]` -> `site/pages/service-detail.html`
- `/offers` -> `site/pages/offers.html`
- `/products` -> `site/pages/products.html`
- `/portfolio` -> `site/pages/portfolio.html`
- `/articles` -> `site/pages/blog.html`
- `/articles/[slug]` -> `site/pages/article.html`
- `/faq` -> `site/pages/faq.html`
- `/contact` -> `site/pages/contact.html`

Rationale: Users get clean routes, but the page structure stays the same.

## Risks / Trade-offs

- [Risk] Rendering full legacy HTML with `dangerouslySetInnerHTML` is less idiomatic than fully decomposed React components -> Mitigation: use it as a preservation layer first, then extract shared components section-by-section only when screenshots prove no visual drift.
- [Risk] Old inline scripts may need browser execution -> Mitigation: keep script extraction explicit and verify build/smoke routes first.
- [Risk] Link rewriting may miss a route -> Mitigation: centralize route mapping and add smoke coverage.
