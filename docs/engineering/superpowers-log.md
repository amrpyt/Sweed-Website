# Superpowers Workflow Log

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
