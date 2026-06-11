## 1. Research Confirmation

- [x] 1.1 Confirm the currently failing smoke cases still reproduce before production edits begin.
- [x] 1.2 Confirm Playwright locator guidance still supports replacing the generic advisor `aside` selector with a named surface selector.
- [x] 1.3 Confirm the hydration mismatch is rooted in legacy normalization output and not a new unrelated regression.

## 2. Implementation

- [x] 2.1 Fix the advisor smoke test so it targets the named advisor panel instead of a broad `aside` locator.
- [x] 2.2 Fix legacy breadcrumb normalization in `src/features/legacy-site/legacy-html.ts` so it does not leave invalid orphan markup.
- [x] 2.3 Restore the homepage `#expertise` anchor contract through the legacy anchor normalization path.
- [x] 2.4 Confirm shared footer smoke checks no longer fail from duplicate render/hydration side effects on mobile.

## 3. Verification

- [x] 3.1 Run targeted smoke checks for the advisor reply case and the footer/anchor cases that previously failed.
- [x] 3.2 Run `bun run typecheck`.
- [x] 3.3 Run `bun run lint`.
- [x] 3.4 Run `bun run build`.
- [x] 3.5 Run `bun run smoke`.
- [x] 3.6 Run `openspec validate --all --strict`.
- [x] 3.7 Run `/opsx:verify stabilize-public-site-test-foundation`.
- [ ] 3.8 Archive the change after verification.
