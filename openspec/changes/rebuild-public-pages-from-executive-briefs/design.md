# Design

The full design is documented in:

`docs/superpowers/specs/2026-08-04-public-page-executive-rebuild-design.md`

## Technical shape

- Route pages remain Server Components by default.
- Typed content lives under `apps/web/src/content/public-site`.
- Page composers live under `apps/web/src/features/public-site`.
- Interactive filters, selectors, comparison panels, and forms use focused Client Components.
- CSS Modules consume SWEED semantic tokens and Carbon spacing aliases.
- Base styles target mobile. Larger layouts use `min-width` media or container queries.
- Each route replaces its legacy wrapper only after focused verification passes.

## Compatibility

- Keep existing service slugs except for the canonical software-development route.
- Redirect `/services/development` to `/services/software-development`.
- Keep existing content repository data as the authority for verified claims and contact details.
- Keep current API routes and contact storage behavior.

## Release strategy

Implement and commit one route phase at a time. Run route-level checks after every phase. Run the full public-site matrix before deployment.
