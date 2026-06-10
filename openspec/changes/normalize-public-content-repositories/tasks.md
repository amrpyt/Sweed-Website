## 1. Research Confirmation

- [x] 1.1 Confirm official docs and primary sources in `research.md` are current.
- [x] 1.2 Confirm selected library/component/service options are compatible with this project.
- [x] 1.3 Confirm common pitfalls and production-readiness concerns have task coverage.

## 2. Implementation

- [x] 2.1 Add typed public-site source modules for shared shell content and route-level seed content for about, services, and articles.
- [x] 2.2 Add feature-owned public-site repository helpers under `src/features/public-site/repositories` that reuse existing local entity repositories instead of duplicating them.
- [x] 2.3 Add page-composer helpers under `src/features/public-site/page-composers` for shared shell data plus about, services, and articles page models.
- [x] 2.4 Add RED-first Bun tests for repository output, metadata readiness, and page-model assembly.
- [x] 2.5 Keep active public routes on `LegacyPage` and avoid route activation changes in this child.

## 3. Verification

- [x] 3.1 Run targeted Bun tests for the new repository/composer behavior.
- [x] 3.2 Run `bun run typecheck`.
- [x] 3.3 Run `bun run lint`.
- [x] 3.4 Run `bun run build`.
- [x] 3.5 Run `openspec validate --all --strict`.
- [x] 3.6 Review this change against its artifacts before starting the route-migration child.
