# SWEED Carbon spacing system

Date: 2026-07-30
Status: completed
OpenSpec: `openspec/changes/adopt-carbon-spacing-system/`

## Goal

Replace locally invented public-site spacing with one measurable open spatial system while preserving SWEED's brand and interactive behavior.

## Decisions

- Use IBM Carbon's 2x Grid as the raw spatial scale.
- Keep SWEED semantic aliases for layout intent.
- Parent layouts own inter-component gaps; components own internal padding.
- Do not install Carbon components or themes.
- Remove unused homepage CSS instead of maintaining legacy rules.
- Fail the standard check command when arbitrary public margin, padding, or gap values are introduced.

## Scope

- Shared UI, sections, forms, header, footer, menus.
- Homepage, About, services, offers, portfolio, articles, FAQ, contact, and legal/detail pages.
- AI advisor, automation demo, offer popup, and typed-site surfaces.
- Excludes the isolated `midu-clone` experiment and private offer-funnel admin settings.

## Verification

- `bun run design:spacing`: passed across 56 CSS files.
- `bun run check`: passed.
- `bun run build`: passed, 29 routes generated.
- Public demo: active, HTTP 200 after restart warm-up.
- Route matrix: 12 representative routes at 1024×768, 390×844, and 320×568.
- No horizontal overflow, one main, one H1, no unnamed visible controls.
- Final 320px checks on homepage, About, services, and contact: zero visible targets below 44px.
- Reduced motion About page: all five methodology steps visible.
- Browser console and page errors: empty.