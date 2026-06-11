# Research Brief

## Scope

Stabilize the current public-site verification baseline so future modular migration work starts from a trustworthy green test lane instead of a noisy or partially broken smoke suite.

## Research Questions

- Which current smoke failures are real product/runtime issues versus weak test selectors?
- What is the smallest safe fix that removes hydration noise and duplicate-chrome side effects without redesigning the public site?
- How should Bun and Playwright divide responsibility in this foundation change?

## Sources Reviewed

| Source | Type | URL | Used For | Confidence |
|---|---|---|---|---|
| Parent change research (accessed 2026-06-07) | Other | `openspec/changes/plan-modular-site-modernization/research.md` | Reuse framework/testing decisions already validated | High |
| Playwright best practices (accessed 2026-06-07) | Official docs | https://playwright.dev/docs/best-practices | Stable locator and user-visible assertion guidance | High |
| Next.js Testing guide (accessed 2026-06-07) | Official docs | https://nextjs.org/docs/app/guides/testing | Route-level verification role for async public pages | High |

## Official Documentation Findings

- Playwright recommends resilient user-facing locators instead of broad structural selectors like `aside` when multiple matching elements exist.
- Next.js testing guidance still supports using browser-level proof for user-visible route behavior, especially where async server/public rendering is involved.

## GitHub / Ecosystem Evidence

- Local runtime evidence from `bun run smoke` on 2026-06-07 shows 5 current failures:
  - AI advisor test uses an ambiguous `aside` locator on desktop.
  - Mobile advisor flow is blocked by the Next.js dev overlay, which is triggered by hydration mismatch noise.
  - Mobile footer count becomes `2` on at least one route.
  - `#expertise` anchor is missing on the homepage.
  - Browser console shows hydration mismatch noise tied to legacy HTML normalization around breadcrumb/footer areas.
- Local source inspection shows likely root causes:
  - `removeLegacyChrome()` removes the breadcrumb wrapper incompletely and leaves an orphan `</div>` at the start of pages like `about`.
  - Homepage source links to `#expertise`, but the normalized homepage body does not currently expose that ID.

## Reuse-First Options

| Option | Source | Fit | Tradeoffs | Decision |
|---|---|---|---|---|
| Fix legacy HTML normalization and keep current smoke suite | Local repo, Next.js testing guidance | Highest fit and smallest diff | Requires careful regex normalization changes | Use |
| Rewrite broad smoke coverage before fixing runtime noise | Local repo | Lower fit | Risks hiding real regressions | Reject |
| Add new test runner for this change | Parent research | Low fit | More tooling churn before baseline is green | Reject |

## Capability Map And Change Decomposition

| Capability | Suggested Change Name | Depends On | Why Separate | Verification Target |
|---|---|---|---|---|
| Baseline smoke stabilization | `stabilize-public-site-test-foundation` | None | Must be green before migration child changes stack on top | Targeted Playwright tests, then full `bun run smoke` |

## Recommended Execution Order

1. Reproduce failing smoke cases individually.
2. Fix weak selector issues in smoke tests.
3. Fix legacy normalization issues causing hydration noise and duplicate footer behavior.
4. Restore the missing homepage anchor contract.
5. Re-run targeted tests, then full smoke.

## Best Practices

- Prefer fixing true runtime normalization issues over only weakening tests.
- Use user-facing Playwright locators for advisor assertions.
- Keep the diff surgical and limited to smoke stability and legacy normalization.

## Common Pitfalls And Mitigations

| Pitfall | Why It Matters | Mitigation | Source |
|---|---|---|---|
| Masking real runtime bugs with looser tests | Leaves future route migration on a false-green baseline | Fix hydration/noise root cause before finalizing selectors | Local runtime evidence |
| Using broad structural selectors | Creates flaky tests when layout gains more than one matching element | Target named advisor panel instead of generic `aside` | Playwright best practices |

## Production Readiness Checklist

- [x] Security concerns identified
- [x] Accessibility concerns identified
- [x] Performance concerns identified
- [x] Error/loading/empty states identified
- [x] i18n/RTL concerns identified
- [x] Deployment/rollback concerns identified
- [x] Testing strategy identified

## Recommended Direction

- Treat this as a strict TDD smoke-foundation fix.
- Fix legacy normalization first where it causes real hydration noise.
- Tighten the advisor smoke locator to the named advisor panel.
- Restore the homepage `#expertise` contract so the existing public anchor promise is true again.

## Open Questions

- None blocking. The failing tests already define the first implementation slice.
