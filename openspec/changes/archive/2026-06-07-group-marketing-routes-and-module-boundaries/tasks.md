## 1. Research Confirmation

- [x] 1.1 Confirm the official Next.js route-group, server-only, and testing guidance captured in `research.md` is still current before code edits.
- [x] 1.2 Confirm the existing `server-only` dependency in `package.json` can be reused instead of adding a new package.
- [x] 1.3 Confirm the archived smoke-stabilization child left `bun run smoke` green so this structure move has a trustworthy regression gate.

## 2. TDD Red

- [x] 2.1 Add a failing Bun structure test that proves public page routes belong under `src/app/(marketing)` and no longer live at the root `src/app` public paths.
- [x] 2.2 Run the new targeted Bun test and capture the RED result before production edits.

## 3. Implementation

- [x] 3.1 Add feature-owned public route modules under `src/features/public-site/routes` with a shared route factory that reuses `LegacyPage` and `getLegacyMetadata`.
- [x] 3.2 Move public page route entry files into `src/app/(marketing)` and keep them as thin re-exports.
- [x] 3.3 Add `server-only` guards to `src/features/legacy-site/legacy-html.ts` and any new shared server-only route helper created in this change.
- [x] 3.4 Keep admin/debug/API route ownership outside the marketing route group.

## 4. Verification

- [x] 4.1 Re-run the targeted Bun structure test and confirm GREEN.
- [x] 4.2 Run `bun run unit`.
- [x] 4.3 Run `bun run typecheck`.
- [x] 4.4 Run `bun run lint`.
- [x] 4.5 Run `bun run build`.
- [x] 4.6 Run `bun run smoke`.
- [x] 4.7 Run `openspec validate --all --strict`.
- [x] 4.8 Run `/opsx:verify group-marketing-routes-and-module-boundaries`.
- [ ] 4.9 Archive the change after verification.
