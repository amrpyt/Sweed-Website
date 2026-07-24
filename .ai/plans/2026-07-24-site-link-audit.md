# Plan — Audit and repair public-site links

Updated: 2026-07-24T16:30:54+03:00
Status: completed
Task: SWEED-018

## Goal

Make every public navigation link, footer link, homepage CTA, internal page CTA, and anchor destination resolve to the intended live page or section. The immediate defect is the homepage header linking “من نحن” to `/#about` instead of the new `/about` page.

## Current Evidence

- `defaultNavItems` correctly maps “من نحن” to `/about`.
- `homeNavItems` still maps “من نحن” to `/#about`, so the homepage header stays on the homepage.
- The footer also maps “من نحن” to `/#about`.
- The homepage About CTA already maps to `/about`.
- The site contains standalone routes plus homepage-anchor links, so an HTTP-only check is insufficient; anchor targets must also exist in the destination DOM.
- Branch is clean at `398f0eb` and ahead of `origin/main` by 8 commits.

## Intended Behavior

- “من نحن” in every public navigation surface opens `/about`.
- Standalone destination pages use route links (`/services`, `/portfolio`, `/offers`, `/articles`, `/contact`) unless a CTA intentionally targets a homepage conversion section.
- Homepage-only navigation items may continue targeting homepage sections where that is the approved behavior.
- Every internal route returns a successful HTTP status.
- Every internal hash points to an element that exists on the target page.
- No navigation link silently stays on the wrong page.

## Implementation Stages

1. Inventory link definitions in header, footer, content models, and dynamic detail pages.
2. Crawl representative public routes and collect all rendered internal hrefs.
3. Validate route HTTP status and hash-target existence.
4. Correct wrong route/anchor mappings, starting with “من نحن”.
5. Add focused navigation tests for the route policy and anchor existence contract.
6. Run check, tests, build, deploy, and browser interaction QA on desktop and mobile.
7. Commit application changes, then update project memory.

## Acceptance Criteria

- [x] Homepage header “من نحن” opens `/about`.
- [x] Footer “من نحن” opens `/about`.
- [x] Desktop and mobile navigation preserve active state, closing, focus, and top-sheet behavior.
- [x] All rendered internal route links on representative public pages return HTTP 200.
- [x] All rendered internal hash links point to an existing element on the target page.
- [x] Dynamic service and article links still resolve to the correct slug pages.
- [x] External `mailto:`, `tel:`, and WhatsApp links remain structurally valid.
- [x] No horizontal overflow, browser errors, or console errors are introduced.
- [x] Check, tests, build, service readiness, and public HTTP verification pass.

## Completion Evidence

- Application commit: `2efb74a fix: route public navigation to live pages`.
- `homeNavItems` now maps “من نحن” to `/about`; the remaining homepage items keep their intentional section anchors.
- The shared footer now derives six quick links from standalone page routes instead of duplicated homepage anchors.
- Focused navigation tests passed 4/4 and prevent `/#about` from returning.
- Browser crawl covered 23 public pages, including all six service slugs and all six article slugs; failed pages: 0.
- Every rendered internal route returned 200 and every rendered hash target existed in the destination DOM.
- Desktop and mobile clicks on “من نحن” opened `/about`; the mobile top sheet closed and the About item became active.
- External WhatsApp, telephone, and email links passed structural validation; no `.example` placeholder href was rendered.
- TypeScript, lint (0 errors, 6 existing warnings), unit tests, focused tests, production build, service readiness, and public route checks passed.

## Risks

- Some CTAs intentionally return users from internal pages to a homepage section; do not replace those merely because standalone routes exist.
- Same-page hash navigation in the mobile top sheet has custom close-and-scroll behavior that must remain intact.
- Static HTML inspection may miss client-rendered links; browser crawling is required.

## Rollback

Revert the link-audit application commit. No data migration or infrastructure change is involved.
