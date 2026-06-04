## Why

Users need direct URLs for important public-site sections, such as `/#expertise`, without exposing every section in the main navigation.

## What Changes

- Add stable section anchors to legacy-rendered pages during HTML normalization.
- Preserve existing markup, styling, and page layout.
- Verify representative anchors exist and can be navigated directly.

## Impact

- Affected code: legacy HTML adapter and smoke tests.
- No redesign and no CMS integration.
