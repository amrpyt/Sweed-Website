## Why

The experimental V2/V3 homepage branches made the project harder to reason about.
The V3 direction is useful as a personal showcase/demo, but it should not stay as an active branch or production route.

## What Changes

- Archive the V3 showcase source under `.archive/showcase/sweed-agency-v3-demo`.
- Remove the rejected `/homepage-v2` preview route from the active app.
- Delete local V2/V3 worktrees and branches after the archive is preserved.

## Impact

- The active app stays focused on the original homepage.
- The liked V3 concept remains recoverable without keeping extra branches alive.
- No customer-facing route is added by this cleanup.
