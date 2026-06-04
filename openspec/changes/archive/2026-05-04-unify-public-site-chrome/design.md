## Context

The user clarified that exact page-by-page componentization is not the immediate goal. The real product problem is inconsistency: every legacy page has a different implementation of shared chrome.

## Goals / Non-Goals

**Goals:**
- Normalize shared chrome across all routes.
- Preserve existing legacy body content and page-specific designs.
- Avoid redesigning page sections.
- Add regression tests for consistency.

**Non-Goals:**
- No full React rewrite.
- No pixel-perfect screenshot gate in this change.
- No Sanity/Mastra integration.

## Decisions

- Keep `LegacyPage` for page bodies.
- Expand the legacy stripping boundary to remove route-local footers and floating buttons.
- Render a shared `LegacyFooter` after each legacy body.
- Keep the existing shared `LegacyHeader` as the source of truth for top bar, header, logo, and mobile drawer.

## Risks / Trade-offs

- [Risk] Regex stripping can miss one page variant -> Mitigation: add route-wide tests for shared chrome counts.
- [Risk] Some page-specific footer links disappear -> Mitigation: shared footer keeps the main navigation and contact information consistent.

