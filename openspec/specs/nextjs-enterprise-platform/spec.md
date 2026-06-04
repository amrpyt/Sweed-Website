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
The system SHALL separate route composition, feature modules, shared UI primitives, content contracts, and utility libraries into clear folders.

#### Scenario: Adding a new marketing section
- **WHEN** a developer adds a new website section
- **THEN** the implementation MUST live in the relevant feature module or shared primitive folder, not as unrelated page-level duplication

### Requirement: Production routing foundation
The system SHALL define stable routes for home, about, services, service detail, offers, products, portfolio, articles, article detail, FAQ, and contact.

#### Scenario: Visitor navigates public route
- **WHEN** a visitor opens any planned public route
- **THEN** the route MUST return a complete page with layout, metadata, and navigation

