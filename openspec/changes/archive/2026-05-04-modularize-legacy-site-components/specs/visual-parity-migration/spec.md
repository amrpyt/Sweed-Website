## ADDED Requirements

### Requirement: Visual parity with accepted legacy design
Migrated React/TypeScript pages SHALL preserve the accepted legacy SWEED design, including RTL layout, colors, typography, spacing, section order, and mobile behavior.

#### Scenario: Migrated route is compared
- **WHEN** a route is migrated from legacy HTML to typed components
- **THEN** the rendered page MUST preserve the same user-visible content and layout intent as the accepted legacy page

### Requirement: Page-by-page migration gates
Each migrated page SHALL have route coverage before the legacy HTML source is removed from that route.

#### Scenario: Page migration is completed
- **WHEN** a page route switches from legacy HTML rendering to typed components
- **THEN** smoke tests MUST verify route render, navigation links, shared header, breadcrumb behavior, and key page-specific content

### Requirement: Mobile drawer stability
The shared mobile navigation SHALL remain clickable, visually bounded, and fixed while open.

#### Scenario: Mobile menu is open during scroll
- **WHEN** a visitor opens the mobile menu and scrolls
- **THEN** the drawer MUST remain fixed and links MUST remain clickable above the overlay

### Requirement: Console-clean migrated pages
Migrated pages SHALL avoid known browser console errors caused by blocked frames, unused legacy preloads, or obsolete legacy scripts.

#### Scenario: Contact page loads
- **WHEN** `/contact` loads in a browser
- **THEN** it MUST NOT emit the known Google Maps CSP error or obsolete `mobile-polish.js` preload warning
