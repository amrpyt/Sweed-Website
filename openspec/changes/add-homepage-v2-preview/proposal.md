## Why

The current React homepage is live and stable. A second homepage version is needed for design review without replacing production `/`.

## What Changes

- Add `/homepage-v2` as a separate preview route.
- Build a custom modular React homepage variant using the existing SWEED content and brand colors.
- Keep `/` unchanged.
- Add smoke coverage so the preview route renders and exposes stable anchors.

## Impact

- No production homepage replacement.
- New preview URL: `/homepage-v2`.
- No backend or admin behavior changes.
