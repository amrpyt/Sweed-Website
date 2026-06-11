## Why

The current public-site smoke suite is red, which means the next modular migration changes would build on an unreliable baseline. We need a small foundation change that makes smoke verification trustworthy before moving any public route away from the legacy runtime.

## What Changes

- Fix or harden the failing public-site smoke cases.
- Correct legacy HTML normalization where it causes hydration mismatch noise or duplicate shared chrome.
- Restore the homepage anchor contract used by the current public navigation.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `quality-production-readiness`: public smoke verification must be stable and green before future route activation work.
- `public-site-section-anchors`: homepage anchor contract must remain true for `#expertise`.
- `ai-advisor-experience`: advisor smoke proof must target the real advisor surface, not an ambiguous structural selector.
- `public-site-chrome-consistency`: shared chrome checks must not be invalidated by duplicate-render or hydration-noise side effects.

## Research Basis

- Parent research already established Bun plus Playwright as the right verification stack.
- Playwright official guidance supports stable, user-facing locators.
- Runtime evidence shows the failing suite is caused by both weak selectors and real legacy normalization issues.

## Out of Scope

- No typed-route migration in this change.
- No visual redesign.
- No new framework or new testing tool.

## Assumptions

- Fixing the breadcrumb normalization bug will remove at least part of the hydration-noise and duplicate-footer behavior.
- Existing smoke tests are the correct RED proof for this child change.

## Impact

- Affected areas: `src/features/legacy-site/legacy-html.ts`, smoke tests under `tests/smoke`, and any minimal shared legacy runtime helpers needed to stabilize proof.
- Success here lowers risk for every later public-site migration child change.
