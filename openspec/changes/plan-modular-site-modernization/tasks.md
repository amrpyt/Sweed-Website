## 1. Research Confirmation

- [x] 1.1 Re-check the official Next.js, Bun, Playwright, and SvelteKit sources in `research.md` before starting the first implementation child change.
- [x] 1.2 Confirm route-group, private-folder, and async Server Component testing guidance is still current when the first public route migration begins.
- [x] 1.3 Confirm every research-identified pitfall has explicit coverage in at least one child change task.

## 2. Governance And Repo Defaults

- [x] 2.1 Keep `openspec/config.yaml` on `schema: research` and validate that future non-trivial changes are created with the research workflow.
- [x] 2.2 Use this parent change only as roadmap authority; do not implement the whole modernization inside one mega-change.
- [x] 2.3 Create the first child change `stabilize-public-site-test-foundation` before moving any public route away from `LegacyPage`.

## 3. Child Change: `stabilize-public-site-test-foundation` (`TDD route: strict`)

- [x] 3.1 Create the child change with research-first OpenSpec artifacts before code edits.
- [x] 3.2 Triage and fix or quarantine the currently failing smoke cases around AI advisor route proof, mobile footer duplication, missing `#expertise` anchor proof, and legacy-route hydration mismatch noise.
- [ ] 3.3 Add Bun tests for future public-site repositories, mappers, and page-composer helpers under the public-site ownership area.
- [x] 3.4 Extend `tests/smoke/migration-parity.ts` and related smoke coverage so a migrated route can be proven before activation.
- [ ] 3.5 Demonstrate RED first on at least one new public-site repository or composer behavior before implementing the minimal GREEN path.
- [x] 3.6 Keep existing `bun run unit` and `bun run smoke` green after the new test foundation lands.

## 4. Child Change: `group-marketing-routes-and-module-boundaries` (`TDD route: strict`)

- [x] 4.1 Create a dedicated public route group such as `src/app/(marketing)` without changing visitor URLs.
- [x] 4.2 Keep route files thin and move public-site composition ownership into feature modules rather than page files.
- [x] 4.3 Define or refine server-only boundaries for backend helpers, route handlers, and future server actions so they cannot leak into Client Components.
- [x] 4.4 Prove RED first for any route-boundary or activation rule that changes behavior, then implement the smallest passing structure change.
- [x] 4.5 Verify representative public and admin/debug routes still build and smoke correctly after route grouping.

## 5. Child Change: `normalize-public-content-repositories` (`TDD route: strict`)

- [ ] 5.1 Create typed repository or page-composer boundaries for public-site entities using `src/content/types.ts` as the base contract vocabulary.
- [ ] 5.2 Normalize route-level page models for at least about, services, articles, and shared navigation/CTA data.
- [ ] 5.3 Keep Arabic-first source content in typed modules and avoid new opaque HTML-content dependencies.
- [ ] 5.4 Add failing Bun tests for repository output, slug/meta readiness, and page-model assembly before implementation.
- [ ] 5.5 Verify the repository layer can support future locale-aware or CMS-backed adapters without changing route contracts.

## 6. Child Change: `migrate-simple-public-pages-to-typed-composition` (`TDD route: strict`)

- [ ] 6.1 Migrate `/about`, `/faq`, and `/contact` first because they have lower layout and interaction risk than the homepage.
- [ ] 6.2 Add route-level Playwright expectations for the first migrated simple page before activating it.
- [ ] 6.3 Replace legacy runtime body rendering only for a route that has already passed its route-specific parity checks.
- [ ] 6.4 Keep `LegacyPage` fallback available for any simple route that does not yet pass parity.
- [ ] 6.5 Verify desktop and mobile smoke behavior for each newly activated simple route.

## 7. Child Change: `migrate-listing-and-detail-public-pages` (`TDD route: strict`)

- [ ] 7.1 Migrate `/services`, `/offers`, `/products`, `/portfolio`, `/articles`, `/services/[slug]`, and `/articles/[slug]` in dependency-safe slices.
- [ ] 7.2 Reuse shared repositories, mappers, and section components instead of creating page-specific duplication.
- [ ] 7.3 Add Bun tests for new mapping rules and Playwright checks for each newly activated listing/detail route.
- [ ] 7.4 Preserve clean metadata, canonical routing data, and CTA behavior while routes move off the legacy runtime.
- [ ] 7.5 Keep non-proven routes on the legacy baseline until each route slice has passing verification evidence.

## 8. Child Change: `migrate-homepage-and-retire-legacy-runtime` (`TDD route: strict`)

- [ ] 8.1 Migrate `/` last after shared route, content, and section patterns are already stable.
- [ ] 8.2 Add route-specific RED proof for homepage composition or parity before activating the typed homepage.
- [ ] 8.3 Remove active public-route dependence on legacy page-body HTML injection only after all public routes are proven.
- [ ] 8.4 Keep `site/` as reference fixtures until the final runtime retirement decision is validated.
- [ ] 8.5 Confirm no active public route still requires `LegacyPage` before closing the child change.

## 9. Child Change: `harden-public-site-prod-ops` (`TDD route: strict where behavior changes`)

- [ ] 9.1 Review and tighten security headers, CSP posture, and server-only environment boundaries for the migrated public site.
- [ ] 9.2 Add or confirm App Router error, not-found, and loading surfaces for the final public-site structure.
- [ ] 9.3 Review font, image, and client-bundle impact after migration and add bundle-analysis tasks if large regressions appear.
- [ ] 9.4 Confirm RTL quality, mobile navigation behavior, SEO metadata, sitemap, and robots behavior remain correct after the modular migration.
- [ ] 9.5 Add deployment and rollback notes for the final production-ready public-site runtime.

## 10. Verification And Closeout

- [ ] 10.1 Run targeted failing-first tests for the active child change and capture RED proof before production edits.
- [ ] 10.2 Run `bun run typecheck`.
- [ ] 10.3 Run `bun run lint`.
- [ ] 10.4 Run `bun run unit`.
- [ ] 10.5 Run `bun run build`.
- [ ] 10.6 Run `bun run smoke`.
- [ ] 10.7 Run `openspec validate --all --strict`.
- [ ] 10.8 Run `/opsx:verify` for the active child change or the equivalent verify workflow used in this repo.
- [ ] 10.9 Archive each completed child change only after proof is attached to that change.
- [ ] 10.10 Archive `plan-modular-site-modernization` only after all child changes are complete and the public site no longer depends on the legacy page-body runtime.
