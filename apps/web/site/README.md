# SWEED Legacy Site Source

This folder contains legacy HTML files that are still read by the Next.js app for routes that have not been migrated to modular React yet.

It is not a standalone deployable app. Production builds are owned by `apps/web`.

## Structure

- `pages/` - Legacy internal page HTML.
- `assets/` - Legacy CSS/JS assets served through app routes when needed.

## Routing

Next.js route modules in `apps/web/src/features/legacy-site` read these files and normalize old links/assets at runtime.

## Migration Rule

Do not add new product behavior here unless it is an urgent temporary production fix. New behavior should move into focused React modules under `apps/web/src`.
