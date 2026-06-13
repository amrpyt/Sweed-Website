# Fix Root Hydration Noise

## Summary

Suppress known browser-extension attribute mismatches on the root document nodes.

## Reason

Some browser extensions inject attributes into `<body>` before React hydrates. React reports this as a hydration mismatch even when application markup is valid.

## Scope

- Add `suppressHydrationWarning` to root `<html>` and `<body>`.
- Restart and verify the dev server on port 3000.

## Success Criteria

- Extension-added body attributes do not produce a Next hydration overlay.
- App still typechecks, lints, and builds.
