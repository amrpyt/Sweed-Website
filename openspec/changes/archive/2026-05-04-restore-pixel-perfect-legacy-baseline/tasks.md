## 1. Restore Baseline

- [x] 1.1 Reintroduce legacy HTML renderer utilities
- [x] 1.2 Switch active public routes back to `LegacyPage`
- [x] 1.3 Restore legacy asset route needed by legacy pages

## 2. Protect Future Migration

- [x] 2.1 Keep typed component work inactive for future gated migration
- [x] 2.2 Add visual diff migration note referencing Playwright screenshot comparisons
- [x] 2.3 Update tests to reflect legacy baseline route rendering

## 3. Verification

- [x] 3.1 Run `bun run typecheck`
- [x] 3.2 Run `bun run lint`
- [x] 3.3 Run `bun run build`
- [x] 3.4 Run `bun run smoke`
- [x] 3.5 Verify OpenSpec status
