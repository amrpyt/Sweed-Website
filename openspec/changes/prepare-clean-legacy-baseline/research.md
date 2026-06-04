# Research

## Current Baseline

- Public routes are served through `LegacyPage`.
- `LegacyPage` reads the preserved HTML files from `site/`.
- The current visual design and page structure must stay as the baseline for the next changes.
- The cleanup goal is repository hygiene only: ignore local tooling, remove transient build output, and commit the current app state as one clear checkpoint.

## Decision

- Keep the legacy structure and current visual design intact.
- Keep Next.js, Mastra, OpenSpec, tests, and source files available for future work.
- Do not refactor page structure during this cleanup.
