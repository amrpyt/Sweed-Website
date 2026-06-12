# Superpowers Workflow Log

## 2026-06-12 HeroUI Design-System Foundation

Context: The project had moved toward modular React, but the UI system was still mostly custom CSS Modules and legacy styling. The goal was to stop random UI drift before continuing homepage work.

Decision:

- Adopt HeroUI v3 as the single React design-system foundation.
- Keep SWEED brand tokens as the visual layer instead of shipping default HeroUI styling.
- Add Tailwind v4 utilities without Tailwind Preflight, because Preflight changed existing CSS Module baselines.
- Add `PRODUCT.md`, `DESIGN.md`, and `docs/engineering/design-system.md` as the design contract.
- Add `bun run design:detect` using Impeccable against active modular surfaces, excluding legacy debt from blocking new work.

Files changed:

- `apps/web/package.json`
- `apps/web/postcss.config.mjs`
- `apps/web/src/app/globals.css`
- `apps/web/src/styles/tokens.css`
- `package.json`
- `DESIGN.md`
- `PRODUCT.md`
- `docs/engineering/design-system.md`

Verification run:

- `bun run design:detect`
- `bun run check`
- `bun run build`
- `bun run --cwd apps/web smoke tests/smoke/homepage-visual.spec.ts`

Commit:

- `ae3d68b feat: add heroui design system foundation`
- `9f8f088 test: refresh visual baselines for design system css`

## 2026-06-12 Archived Homepage React Reconstruction

Context: The archived HTML homepage under `.archive/legacy-homepage/index-before-react-migration.html` was the visual reference. The existing React homepage was too generic and had corrupted Arabic text.

Decision:

- Rebuild the React homepage to follow the archived HTML section order and visual language.
- Keep the active route as modular React under `apps/web/src/features/homepage`.
- Preserve existing header, footer, offer funnel, AI advisor, and route behavior.
- Clean corrupted Arabic copy in `apps/web/src/content/homepage.ts`.
- Add a small client-only HeroUI bridge for `Button`, `Card`, and `Chip` primitives while keeping the homepage mostly server-rendered.
- Use custom CSS Modules for pixel-sensitive layout, gradients, cards, and responsive behavior where HeroUI primitives are not enough.
- Refresh section-by-section homepage visual baselines after browser review.

Files changed:

- `apps/web/src/content/homepage.ts`
- `apps/web/src/features/homepage/home-public-page.tsx`
- `apps/web/src/features/homepage/home-public-page.module.css`
- `apps/web/src/features/homepage/home-hero-ui.tsx`
- `apps/web/tests/smoke/homepage-visual.spec.ts-snapshots/*`

Verification run:

- `bun run check`
- `bun run build`
- `bun run design:detect`
- `bun run --cwd apps/web smoke tests/smoke/homepage-visual.spec.ts --update-snapshots`
- `bun run --cwd apps/web smoke tests/smoke/homepage-visual.spec.ts`

Visual proof:

- `D:\Busniss\SWEED-Website\test-results\react-homepage-hero-final.png`

Commit:

- `5df3a8b feat: align react homepage with archived design`

## 2026-06-12 Homepage Typography Alignment

Context: The React homepage was rebuilt from the archived HTML reference, but the global font token still preferred `SF Arabic`, making the new React page feel different from the intended Tajawal-based reference.

Decision:

- Use Tajawal as the primary website typeface through `next/font/google`.
- Keep `SF Arabic` only as a fallback to avoid breaking existing rendered Arabic if Tajawal fails to load.
- Keep typography controlled through `apps/web/src/styles/tokens.css` so future HeroUI/components inherit the same type system.

Verification target:

- `bun run check`
- `bun run build`
- `bun run --cwd apps/web smoke tests/smoke/homepage-visual.spec.ts`
