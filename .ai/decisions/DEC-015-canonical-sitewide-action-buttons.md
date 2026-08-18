# DEC-015 — Canonical site-wide SWEED action buttons

Status: accepted
Date: 2026-08-18

## Context

The shared SWEED action button had the approved deep-purple primary, white secondary, and pink inset fill interaction, but several public surfaces still carried local button implementations or CSS that could repaint the shared control. A later identity refactor also demonstrated that changing the shared palette without an explicit action-button contract could invert the hierarchy site-wide.

The user explicitly approved the restored button design and requested that it become the website-wide button design.

## Decision

Use the shared SWEED action-button mechanism as the single CTA visual contract across public marketing routes and public product/demo CTAs.

- Primary: `#261b3e` surface, white content, pink inset fill interaction.
- Secondary: white surface, purple content/border, purple inset fill interaction.
- Light: white surface, purple content, pink inset fill interaction.
- Geometry, Arabic optical centering, focus, active, disabled, and reduced-motion behavior remain owned by the shared action component.
- Shared semantic `--action-*` tokens own action colors, borders, fills, focus, and shadows.
- Feature/page CSS may position or size a CTA but may not recreate or repaint the action system.
- Filters, tabs, selectors, carousel controls, icon controls, and other non-CTA interactions keep their purpose-specific visual language.
- The reference-page and legacy-product runtime bridges keep the same hierarchy without modifying approved reference HTML bytes.

## Alternatives considered

1. Keep local CTA implementations where they already looked close. Rejected because they lacked the canonical fill mechanism and could drift again.
2. Apply the action-button design to every clickable control. Rejected because filters, tabs, selectors, and product controls have different semantic roles and would flatten interaction hierarchy.
3. Keep `/midu-clone` as a visual exception. Rejected for CTA actions because the user requested the design across the whole website; its ordinary navigation/text links remain route-specific.

## Consequences

- New public CTA actions should use the shared action component rather than hand-authored button CSS.
- Any deliberate future change to the CTA identity is a design-system decision, not a page-level tweak.
- Regression tests and browser QA can identify CTAs that bypass the canonical fill mechanism.
