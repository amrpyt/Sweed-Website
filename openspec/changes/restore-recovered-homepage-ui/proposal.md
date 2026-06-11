## Why

Recovered local homepage edits were found in a Git dangling tree after they were never committed or stashed.
The active public site should regain those intended visual edits without rolling back newer admin, Convex, or routing work.

## What Changes

- Restore the recovered `site/index.html` homepage snapshot from the protected recovery branch.
- Keep backend, admin dashboard, route modules, and generated Convex files unchanged.
- Verify the site still builds and the restored homepage contains the expected brand/process/CTA changes.

## Impact

- Public homepage visual/content behavior changes.
- No admin dashboard or backend behavior should change.
