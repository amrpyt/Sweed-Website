## Context

This child change exists to make the current public-site verification lane trustworthy. Right now `bun run smoke` is already red before any new route migration begins, so future TDD work would start from a dirty baseline.

The observed failures point to two classes of problems:

- Weak smoke selectors, especially the advisor test using a generic `aside`.
- Real legacy normalization issues, especially incomplete breadcrumb removal that leaves invalid markup and likely contributes to hydration mismatch noise and duplicate chrome behavior.

## Goals / Non-Goals

**Goals:**

- Make the current smoke suite green.
- Fix only the minimum runtime normalization issues needed for stable proof.
- Keep the diff focused on test foundation, not route redesign.

**Non-Goals:**

- No typed-route migration.
- No layout redesign.
- No testing-stack expansion.

## Source-Grounded Decisions

| Decision | Rationale | Alternatives Considered | Sources |
|---|---|---|---|
| Use existing failing smoke tests as RED proof | They already reproduce the baseline failures exactly | Writing a second duplicate suite | Local runtime evidence |
| Fix advisor test to target the named advisor panel | Playwright recommends stable user-facing locators | Keep generic `aside` selector | Playwright best practices |
| Fix legacy normalization instead of only loosening tests | Hydration mismatch and duplicate footer symptoms point to a real runtime issue | Ignore hydration noise and only patch tests | Local runtime evidence, parent research |
| Keep this change surgical | Foundation must be stabilized before broader migration | Mix typed-route migration into the same change | Parent roadmap design |

## Reuse / Library Strategy

- Reuse current Playwright suite as the verification harness.
- Reuse current legacy runtime and normalize only the broken extraction points.
- Reuse existing section-anchor system and extend its class-to-id map where needed.

## Architecture / Data Flow

- `tests/smoke/*.spec.ts` stays the browser truth layer.
- `src/features/legacy-site/legacy-html.ts` stays the normalization boundary for legacy page bodies.
- This change should only touch the parts of normalization that affect:
  - breadcrumb stripping,
  - stable anchor insertion,
  - shared chrome duplication or hydration noise,
  - advisor smoke targeting.

## Production Readiness

- Hydration noise must be reduced because it blocks trustworthy interactive smoke checks.
- Shared chrome must remain single-instance on mobile after hydration.
- Anchor contracts in public navigation must remain true.

## Risks / Trade-offs

- Risk: regex normalization fix could remove too much markup -> Mitigation: keep changes narrow and rerun targeted route smoke checks immediately.
- Risk: a green test could still hide a runtime issue -> Mitigation: fix runtime normalization where possible instead of only weakening assertions.

## Verification Strategy

- Reproduce failing smoke tests individually first.
- Apply the smallest code/test changes that make the failing cases pass.
- Re-run:
  - targeted advisor smoke test,
  - targeted footer/anchor smoke tests,
  - full `bun run smoke`,
  - `bun run typecheck`,
  - `bun run lint`,
  - `bun run build`,
  - `openspec validate stabilize-public-site-test-foundation --type change --strict`.
