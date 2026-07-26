# DEC-012 — Shared public hardening boundaries

Date: 2026-07-26
Status: accepted
Task: SWEED-020

## Context

The public site combines modern React pages with legacy HTML composed into the shared Next.js shell. Reviewer-visible defects were recurring across legacy routes: missing main landmarks, unlabeled controls, stale heading hierarchy, undersized icon controls, and hard-coded action colors with marginal contrast. Fixing each copied HTML file independently would create drift and make regressions likely.

## Decision

1. Apply semantic and accessible-name repairs through a pure shared `normalizeLegacyAccessibility` transform before legacy HTML is rendered.
2. Wrap legacy bodies without a main landmark in one shared `<main id="main-content">` and add a shared skip link.
3. Keep the brand pink `#ed2062` for identity/decorative use, but use a dedicated action token `#e2185b` whenever white normal-size text sits on pink.
4. Enforce 44px interaction targets through shared shell styles for legacy controls that cannot be safely rewritten component by component.
5. Treat production smoke tests as a public contract: real shared header/footer, intended route status, security headers, and browser/network health—not implementation-specific stale selectors.

## Alternatives considered

- Edit every legacy HTML source directly: rejected because copied pages would diverge and future imports could reintroduce the defects.
- Globally darken the primary brand pink: rejected because identity/decorative use does not need the same contrast constraint as text-bearing actions.
- Ignore legacy pages until migration: rejected because they are public production routes and reviewer-visible today.
- Rely only on static lint/build checks: rejected because landmarks, touch targets, contrast, runtime network behavior, and route status require deployed-browser evidence.

## Consequences

- Accessibility fixes are centralized, testable, and repeatable across composed legacy pages.
- CTA contrast improves without visually changing the whole brand palette.
- Legacy routes remain maintainable during the migration period.
- The transform must be updated when source HTML signatures change; focused tests protect current signatures.

## Verification

- Four focused legacy normalization tests pass.
- Production browser matrix reports one main landmark, one H1, no heading jumps, no unlabeled visible controls, and no visible controls below 44px on tested routes.
- Representative white-on-action CTAs measure 4.65:1.
- Production Playwright reports 11 passed, 0 failed.

## Revisit trigger

Retire the transform when all public legacy pages have been migrated to semantic React components, or revise the action token if the official brand palette changes.
