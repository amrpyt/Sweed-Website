## ADDED Requirements

### Requirement: TDD migration gates

Public-site route migration SHALL follow strict TDD for changed behavior, starting with a failing test and ending with passing verification that matches the risk of the change.

#### Scenario: Repository or mapper behavior changes

- **GIVEN** a developer changes a public-site repository, mapper, or page-composer rule
- **WHEN** implementation begins
- **THEN** a failing Bun test for that behavior MUST exist before production code is added

#### Scenario: Async route activation replaces legacy rendering

- **GIVEN** a public route is being activated with async server-first composition
- **WHEN** the route is ready to replace a legacy body path
- **THEN** Playwright MUST verify user-visible behavior for that route before the legacy fallback is removed

### Requirement: Route activation verification checklist

Any public route that switches from legacy runtime rendering to typed composition SHALL pass the repository quality gates and user-visible smoke gates in the same change set.

#### Scenario: Route replacement is proposed

- **GIVEN** a migrated route is ready for activation
- **WHEN** the change is reviewed
- **THEN** it MUST include passing evidence for the relevant Bun tests and browser smoke checks for that route

## MODIFIED Requirements

### Requirement: Verification scripts

The system SHALL provide Bun-runnable scripts for typecheck, lint, production build, browser smoke testing, and repository or domain tests that protect public-site migration work.

#### Scenario: Developer runs quality gates

- **WHEN** a developer runs the documented verification commands
- **THEN** typecheck, lint, build, smoke tests, and unit/domain test coverage MUST be available through `bun run` package scripts
