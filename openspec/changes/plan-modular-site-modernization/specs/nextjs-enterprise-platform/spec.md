## ADDED Requirements

### Requirement: Public route groups and thin route files

The system SHALL organize public marketing routes under a dedicated route group that preserves clean URLs, and each public route file SHALL remain a thin composition shell instead of owning large page markup or raw legacy HTML parsing logic.

#### Scenario: Marketing route stays clean and modular

- **GIVEN** a public marketing route such as home, about, services, or contact
- **WHEN** a developer inspects the `page.tsx` file
- **THEN** the file MUST compose feature-owned modules or page-composer functions and MUST NOT inline a large page body or parse raw legacy HTML directly

#### Scenario: Route grouping does not change the visitor URL

- **GIVEN** marketing routes are organized under a route group such as `app/(marketing)`
- **WHEN** a visitor opens `/about`
- **THEN** the URL MUST remain `/about` and MUST NOT expose the internal group name

### Requirement: Server-only backend boundaries

The system SHALL keep backend-only logic in server-only module boundaries and SHALL prevent that logic from being imported into Client Components.

#### Scenario: Server-side helper is introduced

- **GIVEN** a lead-capture workflow, AI orchestration helper, SEO generator, or content-access helper is added
- **WHEN** the implementation is created
- **THEN** it MUST live in a server-only boundary such as a server module, route handler, or server action entrypoint and MUST NOT be bundled into client code

## MODIFIED Requirements

### Requirement: Server-first route composition

The system SHALL use Server Components by default for public page routes, SHALL isolate browser-only behavior into Client Components, and SHALL treat async public page activation as a path that requires user-visible verification.

#### Scenario: Static content page renders

- **WHEN** a visitor opens a content-heavy page such as services or articles
- **THEN** the main page content MUST render from server-first components

#### Scenario: Interactive island renders

- **WHEN** a visitor opens the AI advisor, mobile menu, or another interactive public-site surface
- **THEN** only that interactive surface MUST require client-side component behavior

#### Scenario: Async route replacement is activated

- **GIVEN** a public route uses async server-first composition
- **WHEN** that route replaces a legacy runtime body
- **THEN** the replacement MUST be verified through user-visible route checks before it becomes the active path

### Requirement: Modular project boundaries

The system SHALL separate route composition, feature modules, shared UI primitives, content contracts, content repositories, and utility libraries into clear ownership boundaries, and route files SHALL NOT become the long-term owners of public-site business or content logic.

#### Scenario: Adding a new marketing section

- **WHEN** a developer adds a new website section
- **THEN** the implementation MUST live in the relevant feature module, page-composer boundary, or shared primitive folder, not as unrelated page-level duplication

#### Scenario: Moving public-site logic out of route files

- **WHEN** a developer adds route-specific transformation, repository selection, or section-assembly logic
- **THEN** that logic MUST live outside the route file in a dedicated module that can be tested independently
