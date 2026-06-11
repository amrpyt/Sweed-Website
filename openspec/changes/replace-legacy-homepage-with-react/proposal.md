## Why

The homepage still depended on one large legacy HTML file. That made edits hard to review, easy to lose, and risky to deploy.

## What Changes

- Replace the `/` route with a modular React homepage.
- Move homepage text and section lists into typed content data.
- Keep shared header, footer, offer funnel, and AI advisor integrations working.
- Remove the legacy `site/index.html` dependency after the React route is active.
- Add smoke and visual screenshot coverage for the React homepage.

## Impact

- Homepage route changes from legacy HTML rendering to React modules.
- Other legacy public pages remain unchanged.
- `site/index.html` is removed because no route should read it after this change.
