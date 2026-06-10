## ADDED Requirements

### Requirement: Repository and composer migration tests

Public-site repository and page-composer behavior SHALL have RED-first Bun test coverage before any route activation change depends on those boundaries.

#### Scenario: Repository or composer behavior changes

- **GIVEN** a developer changes a public-site repository, shell model, or page-composer rule
- **WHEN** implementation begins
- **THEN** a failing Bun test for that behavior MUST exist before the production code is finalized

## MODIFIED Requirements

### Requirement: Verification scripts
The system SHALL provide Bun-runnable scripts for typecheck, lint, production build, browser smoke testing, and repository or domain tests that protect public-site migration work.

#### Scenario: Developer runs quality gates
- **WHEN** a developer runs the documented verification commands
- **THEN** typecheck, lint, build, smoke tests, and unit/domain test coverage MUST be available through `bun run` package scripts
