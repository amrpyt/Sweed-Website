# SWEED Section Rhythm System

## Goal

Increase breathing room across the public website without introducing page-specific margin patches.

## Research baseline

- IBM Carbon 2x Grid: 8px base geometry, fixed spacing scale, and spacing tokens for vertical rhythm. Carbon explicitly notes that individual UI regions may be dense while the full page should not feel crowded.
- Atlassian Design System: 8px base unit; 32–80px tokens are intended for the largest UI/layout spacing; spacing should be consistent and responsive.
- Material 3: layouts should adapt at breakpoints instead of preserving one static composition across all screen sizes.
- Shopify Polaris: layout primitives use explicit tokenized gaps/padding instead of implicit margins.

## SWEED semantic section tiers

Use exact 8px-grid steps rather than fluid arbitrary values.

| Viewport | Compact | Default | Feature |
| --- | ---: | ---: | ---: |
| Mobile (<768px) | 64px | 80px | 96px |
| Tablet (>=768px) | 80px | 96px | 128px |
| Desktop (>=1200px) | 96px | 128px | 160px |

Internal section relationships:

- Section eyebrow/title/description stack: 24px.
- Closely related descriptive gap: 16px.
- Section intro to main content: existing responsive 32–80px token remains.

## Implementation

1. Replace fluid section-space clamps in `tokens.css` with mobile-first exact Carbon/8px-grid values.
2. Promote the three section-space tokens at 48rem and 75rem using `min-width` media queries.
3. Increase semantic section header spacing from 16px to 24px and description spacing from 12px to 16px.
4. Keep components and pages consuming only semantic tokens; no new local margins.
5. Update `DESIGN.md` with the section-rhythm contract.
6. Add/extend browser regression coverage for section padding tiers and page overflow.

## Verification gates

- `bun run check`
- `bun run build`
- Desktop: 1440x900
- Tablet: 1024x768
- Mobile: 390x844 and 320x568
- No horizontal overflow
- No console/page errors
- Validate homepage and representative internal routes (`/services`, `/portfolio`, `/articles`, `/contact`)
- Commit each implementation checkpoint before deployment.
