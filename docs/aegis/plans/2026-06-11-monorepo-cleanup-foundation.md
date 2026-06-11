# Monorepo Cleanup Foundation Plan

## Goal

Clean the SWEED website repository into a professional monorepo-style structure without breaking the live website.

## Architecture

Current state:

- The active Next.js app lives at the repository root.
- Legacy/static HTML still exists under `site/`.
- Archived demo work exists under `.archive/`.
- Generated and local-only folders exist in the working copy.
- Vercel currently builds from the repository root.

Target direction:

```text
SWEED-Website/
  apps/
    web/
  packages/
    brand/
    ui/
    content/
    config/
  .archive/
  docs/
  tests/
```

## Tech Stack

- Next.js for the active public/admin web app.
- Bun for dependency installation and scripts.
- Turborepo can be introduced after the app move is stable.
- Agent skills and Superpowers workflows replace OpenSpec as the required planning gate.

## Compatibility Boundary

- `/` must keep rendering the accepted homepage.
- Admin routes must keep working.
- Vercel production deploy must keep succeeding.
- No legacy HTML file should become the owner of new production behavior.

## Verification

Each structural slice should run the relevant subset of:

```powershell
bun run typecheck
bun run lint
bun run unit
bun run build
```

For route-affecting work, also verify:

```powershell
# local or deployed check
# / returns 200
# removed preview routes return 404
```

## Phase 0: Local Debris Cleanup

Purpose: remove ignored local clutter that makes the repo feel bigger than it is.

Actions:

- Remove ignored `v2/` and `v3/` local folders after confirming the wanted V3 demo exists in `.archive/showcase/sweed-agency-v3-demo`.
- Remove ignored temp logs and build outputs.
- Do not commit ignored cleanup-only deletion.

## Phase 1: Monorepo Shell

Purpose: introduce the folder structure without changing runtime behavior yet.

Actions:

- Add `apps/` and `packages/` placeholders with README files.
- Document package ownership rules.
- Keep the active Next app at root until the deployment boundary is ready.

Verification:

```powershell
bun run typecheck
bun run lint
bun run unit
bun run build
```

Commit:

```text
chore: add monorepo workspace shell
```

## Phase 2: Move Active Web App

Purpose: move the root Next.js app into `apps/web`.

Actions:

- Move app source/config files in one controlled slice.
- Update package scripts and Vercel config.
- Keep imports working.
- Do not extract packages yet.

Verification:

```powershell
bun run typecheck
bun run lint
bun run unit
bun run build
```

Commit:

```text
chore: move web app into apps/web
```

## Phase 3: Extract Stable Packages

Purpose: extract only owners that are already stable.

Actions:

- `packages/brand`: colors, fonts, brand constants.
- `packages/content`: typed marketing content.
- `packages/ui`: reusable UI only after duplication is proven.
- `packages/config`: shared TypeScript/ESLint/Playwright config only when needed.

Verification:

```powershell
bun run typecheck
bun run lint
bun run unit
bun run build
```

## Risks

- Moving the app before Vercel settings are explicit can break deployment.
- Extracting packages too early can create fake architecture and import churn.
- Keeping old demos as active branches makes the repo harder to reason about.

## Retirement Rules

- Preview branches should be deleted after useful code is archived.
- Ignored generated folders should not remain as active workspace clutter.
- Legacy HTML should remain reference-only until replaced section by section.
