# Design

## Design Read

Reading this as an Arabic-first agency navigation for Egyptian business decision makers, with a confident kinetic brand language built around SWEED pink, deep purple, and Cairo typography.

## Interaction Model

- A fixed transparent header keeps the SWEED logo and an Arabic `القائمة` trigger visible.
- Opening the trigger reveals two staggered brand-color underlays followed by the main light panel.
- Navigation labels enter as one coordinated sequence instead of unrelated micro-animations.
- The panel occupies a focused side sheet on wide screens and the full viewport on smaller screens.
- Internal navigation closes the panel immediately and preserves client-side routing.

## Accessibility

- The trigger exposes `aria-expanded`, `aria-controls`, and Arabic labels.
- Escape closes the panel and returns focus to the trigger.
- Clicking outside closes the menu on wide layouts.
- Body scrolling is locked only while the menu is open.
- `prefers-reduced-motion` removes staggered transforms and keeps content immediately readable.
- The current route receives `aria-current="page"`.

## Visual System

- Header and panel typography use the existing `--font-body` token.
- Accent: `#ed2062` / `var(--color-accent)`.
- Ink and secondary underlay: `#261b3e`.
- Main panel: white with deep-purple text.
- Controls use the existing project focus-ring conventions and avoid introducing a second component system.
