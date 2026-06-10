## Why

SWEED already runs on Next.js App Router and Bun, but the public site still depends on legacy HTML body injection through `LegacyPage`, which blocks modularity, safe backend growth, and maintainable public-site iteration. The user asked for an enterprise-style modular architecture with strict TDD, and the research shows the safest path is an incremental Next.js modernization, not a SvelteKit rewrite.

## What Changes

- Establish a source-backed modular modernization plan that keeps Next.js App Router and Bun.
- Formalize route-group, feature-module, content-repository, and server-only ownership boundaries for the public site.
- Add TDD migration rules so each future route conversion starts with failing tests and ends with Bun and Playwright proof.
- Define a child-change rollout plan that migrates low-risk pages first, homepage last, and keeps legacy fallback until parity is proven.
- Make research-first OpenSpec the repo default for future non-trivial changes.

## Capabilities

### New Capabilities

- None in the parent planning change. This change updates and coordinates existing platform/site capabilities instead of inventing a parallel architecture track.

### Modified Capabilities

- `nextjs-enterprise-platform`: tighten module ownership, route grouping, and server-only boundaries for the current App Router codebase.
- `cms-ready-content`: require typed page-composition repositories instead of scattered content imports or HTML-driven page bodies.
- `quality-production-readiness`: require TDD-backed migration gates and user-visible verification for public route activation.
- `pixel-perfect-legacy-baseline`: require incremental route rollout and legacy fallback until typed replacements prove parity.

## Research Basis

- Official Next.js docs support App Router, Server Components by default, route groups, private folders, production metadata/error patterns, and E2E-first verification for async Server Components.
- Official Bun docs support Bun as a package manager, script runner, and Jest-like test runner with mocks and CI compatibility.
- Official Playwright guidance supports user-visible assertions and isolated browser proof, which fits route migration safety.
- Official SvelteKit docs confirm SvelteKit is sound technically, but it would require a full routing/runtime/testing rewrite that does not match the repo's current state.
- GitHub evidence from `vercel/commerce` shows that mature Next.js apps keep thin routes and clear module boundaries instead of giant page files or raw HTML blobs.
- Local repo evidence already contains usable typed content contracts and section primitives, so reuse is better than a from-scratch rewrite.

## Out of Scope

- Rewriting the website to SvelteKit.
- Redesigning the accepted public visual baseline.
- Shipping live CMS runtime, live backend workflows, or live CRM integrations in this parent planning change.
- Replacing the AI advisor architecture beyond preserving clean feature boundaries.
- Deleting `site/` reference fixtures before parity is proven.

## Assumptions

- Public URLs such as `/`, `/about`, `/services`, `/offers`, `/articles`, `/faq`, and `/contact` stay stable.
- Bun remains the required package workflow for this repository.
- Future public-site code should preserve Arabic-first content quality and stay ready for later bilingual routing.
- The first implementation child change should improve the test foundation before major page migration starts.

## Impact

- Affected planning artifacts: `openspec/config.yaml`, parent research/proposal/specs/design/tasks, and future child OpenSpec changes.
- Affected runtime areas in later implementation: `src/app`, `src/features/legacy-site`, future public-site feature modules, content repositories, and smoke/unit tests.
- Security and maintainability improve by reducing raw HTML injection and by isolating server-only code from client components.
- Performance improves by keeping public pages server-first and shrinking unnecessary client boundaries.
- Accessibility, SEO, RTL quality, and deployment confidence become first-class verification targets instead of afterthoughts.
