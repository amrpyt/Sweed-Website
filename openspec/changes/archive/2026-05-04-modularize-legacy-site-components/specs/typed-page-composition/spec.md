## ADDED Requirements

### Requirement: Typed route page composition
Each public route SHALL render from explicit React/TypeScript page compositions instead of injecting full legacy HTML bodies.

#### Scenario: Public route source is inspected
- **WHEN** a developer inspects a public route such as `/about`, `/services`, `/articles`, or `/contact`
- **THEN** the route MUST compose typed React components and MUST NOT depend on `dangerouslySetInnerHTML` for the full page body

### Requirement: Shared component boundaries
Repeated page structures SHALL be implemented as reusable components with typed props.

#### Scenario: Repeated section is migrated
- **WHEN** a repeated visual pattern such as a hero, card grid, CTA, breadcrumb, FAQ group, article card, offer card, product card, or contact info block appears on multiple pages
- **THEN** it MUST use a shared component rather than duplicated route-local JSX

### Requirement: Server-first rendering
Static marketing content SHALL default to Server Components, with Client Components used only for interactive behavior.

#### Scenario: Component interactivity is reviewed
- **WHEN** a component does not need state, effects, event handlers, or browser APIs
- **THEN** it MUST remain a Server Component

#### Scenario: Interactive widget is reviewed
- **WHEN** a component uses state, effects, event handlers, or browser APIs
- **THEN** the client boundary MUST be isolated to that component or the smallest practical wrapper

### Requirement: Legacy renderer removal path
The legacy renderer SHALL remain only as a migration reference until all public pages are componentized.

#### Scenario: All public routes are migrated
- **WHEN** every public route has a typed page composition with parity coverage
- **THEN** full-page legacy HTML rendering utilities MUST be removed from active route rendering
