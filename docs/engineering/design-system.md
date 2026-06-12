# Design System Foundation

## Decision

SWEED will use HeroUI v3 as the React design-system foundation and keep SWEED brand tokens as the visual layer.

This gives us accessible primitives and consistent behavior without forcing the marketing homepage to look like a generic component demo.

## Sources Checked

- HeroUI quick start says v3 requires React 19+ and Tailwind CSS v4, and installs with `bun add @heroui/styles @heroui/react`.
- HeroUI repository describes v3 as React 19/Next.js compatible, Tailwind v4 based, React Aria backed, and not requiring a provider wrapper.
- Impeccable positions itself as a design vocabulary/workflow, not a component library. We use it through `PRODUCT.md`, `DESIGN.md`, and anti-pattern checks.

## Implementation Rules

- New shared interactive UI should start with HeroUI where practical.
- Reusable SWEED-specific wrappers should live under `apps/web/src/components/ui` or a focused feature folder.
- Public marketing sections can stay custom when the layout needs stronger brand expression.
- Tokens live in `apps/web/src/styles/tokens.css`.
- Root CSS imports Tailwind theme/utilities first, then HeroUI styles, then SWEED tokens.
- Tailwind Preflight is intentionally omitted during migration because it changes existing CSS Modules baselines.

## Migration Strategy

1. Add HeroUI and design-system tokens.
2. Convert repeated primitives first: buttons, fields, badges, modals, popovers.
3. Convert homepage sections only when editing that section for real product work.
4. Keep screenshots and visual tests section-by-section.

## Guardrails

- One design system: HeroUI.
- One accent: SWEED pink.
- One ink: SWEED purple.
- One website typeface: Tajawal first, with `SF Arabic` only as fallback.
- No default HeroUI theme leakage on customer-facing sections.
- No route or SEO changes as part of design-system migration.
