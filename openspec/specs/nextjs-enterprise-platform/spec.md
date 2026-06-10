# nextjs-enterprise-platform Specification

## Purpose
TBD - created by archiving change rebuild-enterprise-nextjs-site. Update Purpose after archive.
## Requirements
### Requirement: Next.js App Router runtime
The system SHALL run as a Next.js 16 App Router application using TypeScript, Bun-managed dependencies, and route files under `app/`.

#### Scenario: Application starts in development
- **WHEN** a developer runs the documented development command
- **THEN** the website MUST start through Next.js, not Vite

#### Scenario: Dependencies install with Bun
- **WHEN** a developer installs dependencies
- **THEN** the project MUST use Bun lockfile/package workflows instead of npm lockfile workflows

#### Scenario: Application builds for production
- **WHEN** the production build command runs
- **THEN** the build MUST complete using Next.js without requiring the old Vite entrypoint

### Requirement: Server-first route composition
The system SHALL use Server Components by default for public page routes and SHALL isolate browser-only behavior into Client Components.

#### Scenario: Static content page renders
- **WHEN** a visitor opens a content-heavy page such as services or articles
- **THEN** the main page content MUST render from server-first components

#### Scenario: Interactive island renders
- **WHEN** a visitor opens the AI advisor or mobile menu
- **THEN** only that interactive surface MUST require client-side component behavior

### Requirement: Modular project boundaries
The system SHALL separate route composition, feature modules, shared UI primitives, content contracts, and utility libraries into clear folders, and public route entry files under `src/app` SHALL stay thin by delegating composition ownership to feature-owned modules.

#### Scenario: Adding a new marketing section
- **WHEN** a developer adds a new website section
- **THEN** the implementation MUST live in the relevant feature module or shared primitive folder, not as unrelated page-level duplication

#### Scenario: Editing a public route entrypoint
- **WHEN** a developer edits a public page route file under `src/app`
- **THEN** that file MUST remain an entrypoint that reuses feature-owned route composition instead of owning the full page implementation inline

### Requirement: Production routing foundation
The system SHALL define stable routes for home, about, services, service detail, offers, products, portfolio, articles, article detail, FAQ, and contact.

#### Scenario: Visitor navigates public route
- **WHEN** a visitor opens any planned public route
- **THEN** the route MUST return a complete page with layout, metadata, and navigation

### Requirement: Marketing route group organization

The system SHALL organize public marketing routes under a dedicated App Router route group without changing public URL paths.

#### Scenario: Visitor opens a public page after the route move

- **WHEN** a visitor opens `/`, `/about`, `/services`, `/offers`, `/products`, `/portfolio`, `/articles`, `/faq`, or `/contact`
- **THEN** the URL path MUST remain unchanged even though the route files live under a marketing route group

### Requirement: Server-only route helper boundaries

The system SHALL protect filesystem-backed public route helpers from accidental Client Component imports.

#### Scenario: A developer imports a filesystem-backed helper into a Client Component

- **WHEN** a server-only public route helper is imported into a Client Component
- **THEN** the build MUST fail with a server-only boundary error instead of silently bundling the wrong module

