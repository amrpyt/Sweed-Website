# SWEED Website

SWEED marketing website monorepo.

The active production app is a Next.js app in `apps/web`. Legacy HTML is kept inside the web app as migration/reference material until each section is replaced by modular React.

## Directory Map

```text
apps/web/           Active Next.js public website and admin surface
apps/web/site/      Legacy HTML source used by remaining legacy routes
apps/web/public/    Public assets served by the web app
packages/           Future shared packages with clear ownership
docs/               Engineering plans and repo documentation
references/         Original design files, brand assets, and source material
.archive/           Retired experiments and previous page versions
```

## Commands

```bash
bun install
bun run dev
bun run check
bun run build
bun run typecheck:packages
```

## Site Source

The modular Next.js source lives in `apps/web/src`.
Remaining legacy page source lives in `apps/web/site/pages/*.html`.

Original HTML/design references are kept in `references/` so the deployable website stays clean.
