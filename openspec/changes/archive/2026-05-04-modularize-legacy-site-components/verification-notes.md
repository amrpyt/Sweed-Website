## Verification Notes

### Automated Gates

- `bun run typecheck`: passed after cleaning stale `.next/types`.
- `bun run lint`: passed.
- `bun run build`: passed with all public routes statically generated.
- `bun run smoke`: passed with 31 passing tests and 3 desktop-only mobile tests skipped by design.

### OpenSpec Status

- `openspec status --change "modularize-legacy-site-components" --json`: artifacts complete.
- `openspec instructions apply --change "modularize-legacy-site-components" --json`: task tracking reached completion after final notes.

### Implementation Evidence

- Active public routes now import `TypedSitePage` and `getTypedPageMetadata`.
- No active `src/app/**/page.tsx` route contains `LegacyPage`, `getLegacyPage`, `getLegacyMetadata`, or `dangerouslySetInnerHTML`.
- Full-page legacy HTML parser/runtime files were removed from `src/features/legacy-site`.
- Obsolete `/legacy-assets/[file]` route was removed and smoke tests now assert the route is retired.
- `site/` remains as reference fixture source only.

### Residual Visual Parity Risks

- The migration is now structurally TypeScript/React modular, but not yet pixel-perfect against every legacy subsection. The current implementation preserves the accepted SWEED language, route markers, navigation, header, drawer behavior, breadcrumbs, and core page content, but several deep legacy subsections are represented by typed summaries rather than one-to-one detailed JSX.
- No screenshot diff gate exists yet. Adding visual regression snapshots is recommended before treating this as final design parity.
- Existing smoke coverage is route/content/behavior focused. It does not prove exact spacing, every card count from the large legacy HTML, or every legacy interaction tab.

### Final Assessment

The change satisfies the architectural goal: active public pages no longer render full legacy HTML bodies and now use modular typed React/TypeScript composition with CMS-ready content boundaries. Remaining risk is visual/detail parity depth, not infrastructure.
