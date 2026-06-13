# SWEED Design System

This file is the project-level design contract. It follows the Impeccable idea: define the visual system before generating UI so future edits do not drift into random styles.

## Product Read

Arabic-first marketing website for a marketing and advertising agency. The audience is Egyptian business owners and decision makers who need trust, clarity, and a direct path to WhatsApp/contact.

## Design Direction

- System foundation: HeroUI v3 for accessible React primitives and consistent product UI.
- Brand layer: SWEED tokens on top of HeroUI, not default HeroUI styling.
- Visual language: clean agency website, high contrast, generous spacing, brand pink accent, deep purple ink.
- Theme: light by default. No mixed dark/light section flips unless a future feature explicitly asks for it.

## Core Tokens

- Primary accent: `#ed2062`
- Primary ink: `#261b3e`
- Neutral text: `#6d6e70`
- Surface: `#f7f8fb`
- Panel: `#ffffff`
- Radius system: pill controls, soft 24px cards, larger 32px panels.
- Typography: Arabic-first sans. Cairo is the primary website font; self-hosted `SF Arabic` remains only as a fallback.

## Component Rules

- Use HeroUI for new interactive primitives where it fits: buttons, inputs, modals, popovers, tabs, dropdowns, cards, chips, accordions.
- Wrap HeroUI components in project-specific modules when the component is reused across sections.
- Do not mix another full design system with HeroUI.
- Keep public marketing sections custom when composition matters more than generic components.
- Avoid default HeroUI colors in production surfaces. Map everything to SWEED tokens.

## Anti-Slop Rules

- No generic purple/blue gradients.
- No three identical cards when a section needs hierarchy.
- No weak gray text on pink or purple surfaces.
- No random font families per page.
- No motion that moves by itself without user intent or clear storytelling value.

## Verification

Every UI change should pass:

- `bun run check`
- `bun run build`
- Browser screenshot review section-by-section for touched public pages.
- Button contrast and mobile layout checks for touched sections.
