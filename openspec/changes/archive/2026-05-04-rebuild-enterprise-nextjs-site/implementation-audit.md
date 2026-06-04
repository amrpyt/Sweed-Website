## Runtime And Reference Audit

Date: 2026-05-04

## Active Runtime Before Rebuild

- `package.json` currently runs a Vite app through `vite --port=3000 --host=0.0.0.0`.
- `vite.config.ts`, `tsconfig.json`, `package-lock.json`, `node_modules/`, and `dist/` belong to the current Vite-era runtime.
- Root `public/` contains reusable production assets:
  - `public/sweed-logo.png`
  - `public/fonts/sf-arabic-*.ttf`

## Reference Content And Design Sources

- `site/` contains static HTML pages and mobile polish assets. Treat as the closest current page reference, not as runtime architecture.
  - `site/index.html`
  - `site/pages/about.html`
  - `site/pages/services.html`
  - `site/pages/service-detail.html`
  - `site/pages/offers.html`
  - `site/pages/products.html`
  - `site/pages/portfolio.html`
  - `site/pages/blog.html`
  - `site/pages/article.html`
  - `site/pages/faq.html`
  - `site/pages/contact.html`
- `v2/` and `v3/` contain duplicated design drafts, screenshots, source snippets, document/PDF content references, and old Vite/package metadata. Treat as archive/reference only.
- Existing screenshots at the repo root are visual QA references only.

## Rebuild Decision

- Active v1 runtime will move to root Next.js App Router files.
- Existing static/draft folders stay untouched during migration so rollback/reference remains possible.
- Bun is the required package manager and script runner.
- `package-lock.json` should be replaced by `bun.lock` once dependencies are installed through Bun.

## Initial Route Map

- `/`
- `/about`
- `/services`
- `/services/[slug]`
- `/offers`
- `/products`
- `/portfolio`
- `/articles`
- `/articles/[slug]`
- `/faq`
- `/contact`

