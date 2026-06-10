## Why

The accepted legacy homepage still had a small set of brief mismatches in live runtime: multi-select help cards were missing, service links still pointed to the legacy detail route, partner logos were not auto-moving in one row, and support/popup behavior was not reliably usable on the homepage.

## What Changes

- Add a runtime-safe homepage fallback for the remaining homepage brief behaviors.
- Convert the support surface to a native disclosure pattern that works without client hydration.
- Keep the accepted legacy layout and routing model intact.

## Capabilities

### New Capabilities

- `legacy-homepage-runtime-fallback`: Homepage-only DOM/runtime fixes for brief-critical behavior that must work even when client hydration is unreliable.

### Modified Capabilities

- `ai-advisor-experience`: The support entry surface now needs a no-hydration fallback interaction.
- `marketing-site-experience`: Homepage polish requirements are tightened for help cards, service navigation, partner motion, and popup timing.

## Research Basis

- Next.js official docs confirm `afterInteractive` scripts load after some hydration, so it is not the best fallback for must-run legacy homepage patches.
- MDN confirms `<details>/<summary>` gives native open/close behavior for support UI without React state.
- MDN confirms script execution expectations differ when HTML is inserted dynamically, which justified using a rendered script fallback.

## Out of Scope

- Rebuilding the homepage as fully native React sections.
- Replacing the accepted legacy visual structure.
- Building a full conversational AI chat flow in this change.

## Assumptions

- The current homepage DOM shape remains close to the inspected live runtime.
- The existing popup markup in the legacy page is acceptable once timing is corrected.

## Impact

- Affected areas: legacy homepage runtime, support widget markup, popup timing behavior, and homepage link behavior.
- No new dependencies.
- Main risks: imperative homepage script drift if legacy HTML changes significantly later.
