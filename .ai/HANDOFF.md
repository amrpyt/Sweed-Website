# Handoff

Updated: 2026-08-12T03:35:52+03:00

## Read First

- `.ai/PROJECT.md`
- `.ai/STATE.md`
- `.ai/TASKS.md`
- `docs/superpowers/specs/2026-08-12-reference-html-fidelity-restoration-design.md`
- `docs/superpowers/plans/2026-08-12-reference-html-fidelity-restoration.md`
- `.ai/decisions/DEC-013-uploaded-html-is-fidelity-source.md`
- `.ai/sessions/2026-08-12-reference-html-fidelity-restoration.md`

## What Changed

- `/services`, `/portfolio`, and `/offers` now render the exact executable HTML references supplied on 2026-08-12 instead of the SWEED-024 React reinterpretations.
- Uploaded bytes are stored deterministically and guarded by exact SHA-256 tests.
- Reference bodies run inside the current shared header/footer/AI-advisor shell with their own CSS, SVGs, responsive rules, GSAP, ScrollTrigger, SplitText where applicable, and inline interactions.
- Duplicate reference nav/footer chrome is removed; reference CSS is scoped so it cannot change the shared SWEED shell.
- A client script sequencer preserves the original vanilla HTML script order and cleans route-created ScrollTriggers across Next client navigation.
- The old `apps/web/site/pages` files remain unchanged as the default legacy/rollback source.
- Admin no longer creates a redundant Cairo `next/font` build fetch; it inherits the root font.

## Source Hashes

- Services: `ee21eca6b83d2b3774b127ce3be5a1512d5b2b07a0b9ea315f2abe6ea6008662`
- Portfolio: `bfcc2e73fda056cf0103472438a3d93c998bf0f51c04999d83cc009a64fba240`
- Offers: `6aeb87c77f01f475936352a966c00de6f412d12380e56e74e41803183d1ebfde`

## Verification

- `bun run check`: 108/108 unit tests plus TypeScript, ESLint, spacing, and mobile-first checks passed.
- Production build: 29 routes, passed.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual skip.
- Service active; reference routes and Articles return 200.
- Fresh browser trigger counts: Services 76 + SplitText, Portfolio 71, Offers 42.
- Client navigation Offers → Portfolio → Services remains clean at 42 → 71 → 76 triggers.
- Services sticky map, Portfolio filter/tab families, Offers quiz/comparison/tabs/drawers all pass interaction checks.
- No horizontal overflow at 1024, 390, or 320 widths; no broken images; reduced motion leaves all `.reveal` content visible.
- Screenshots are under `/var/tmp/agent-browser/artifacts/sweed-reference/`.

## Important Boundary

- Do not redesign or modernize the three uploaded HTML-backed pages unless the user explicitly asks.
- `/articles` is not HTML-identical in this batch. Only its DOCX was supplied, not an executable Articles HTML reference.
- Keep the shared shell font as SWEED Helvetica Arabic; the isolated reference bodies intentionally use the fonts declared by their HTML references.
- Do not replace hash-tested reference source data by hand without recomputing and approving the new source fingerprint.

## Git

Application implementation commits:

- `577204b fix: preserve uploaded reference HTML sources`
- `76adbbe feat: isolate exact reference page rendering`
- `a531ce0 fix: render uploaded internal page references`
- `f0f5cfd fix: remove duplicate admin font fetch`
- `cfe12da fix: sequence reference page scripts`

No Git push was performed.

## Resume From Here

If the user supplies the missing Articles HTML, treat it as a new fidelity-source task: fingerprint first, compare its executable behavior, then add it to the same isolated reference renderer and rerun the full route/browser matrix.
