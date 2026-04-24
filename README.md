# SWEED Website

Static SWEED marketing website organized with a production-style project layout.

## Directory Map

```text
site/          Deployable website source
site/pages/    Internal static pages
public/        Public assets copied into the build
references/    Original design files, brand assets, and source material
.archive/      Retired experiments and previous page versions
.planning/     GSD project planning artifacts
.codex/        Codex/GSD workflow tooling
v2/            Preserved Git worktree
v3/            Preserved Git worktree with local changes
dist/          Generated production output
```

## Commands

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run lint
```

## Site Source

The homepage lives at `site/index.html`.
Internal pages live at `site/pages/*.html`.

Original HTML/design references are kept in `references/` so the deployable website stays clean.
