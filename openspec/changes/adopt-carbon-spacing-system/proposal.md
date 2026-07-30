# Adopt Carbon spacing system

## Why

SWEED accumulated locally invented margin, padding, and gap values across public pages and interactive surfaces. The inconsistency weakened visual rhythm, made responsive behavior harder to reason about, and allowed old CSS to override newer visual-system decisions.

## What changes

- Adopt IBM Carbon's open 2x Grid as the raw spatial scale: 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, and 160px.
- Expose SWEED semantic aliases for stacks, inline gaps, sections, cards, panels, controls, tooltips, and page gutters.
- Migrate public routes, shared UI, navigation, homepage, About, AI advisor, and offer funnel to semantic spacing roles.
- Remove unused homepage CSS and conflicting legacy media rules.
- Add an automated spacing-system check to the standard verification command.

## Boundaries

- SWEED retains its brand, typography, components, and visual identity; Carbon components and themes are not installed.
- Motion geometry, illustrations, and documented optical/accessibility corrections may use explicit exceptions.
- The isolated `midu-clone` experiment and private offer-funnel admin settings are outside the public spacing contract.

## Outcome

Public SWEED UI uses one measurable spatial vocabulary, parent layouts own inter-component gaps, components own internal padding, and future regressions fail CI.