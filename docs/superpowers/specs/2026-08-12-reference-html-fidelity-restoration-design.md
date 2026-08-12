# SWEED reference HTML fidelity restoration

Date: 2026-08-12
Status: approved for implementation
Task: SWEED-035

## Goal

Restore the HTML-backed internal pages to the uploaded executive references instead of redesigning their page bodies.

This spec supersedes the SWEED-024 modular rebuild only for `/services`, `/portfolio`, and `/offers`.

## Source precedence

Use these sources in this order:

1. The newly uploaded HTML file for the route. Its markup, CSS, SVG, motion, and interaction behavior are the fidelity source.
2. The matching executive DOCX. It defines content rules, proof restrictions, route intent, and shared-shell requirements.
3. The current Next.js application shell for the shared header, shared footer, AI advisor widget, routing, metadata integration, security, and deployment.
4. Existing React rebuild code only when it provides infrastructure that the reference page explicitly needs. It is not a visual source.

Do not use the previous React rebuild as a reason to change the reference composition.

## In-scope routes and reference fingerprints

| Route | Uploaded source | SHA-256 |
| --- | --- | --- |
| `/services` | `4- صفحة خدماتنا  سويد  المحتوى والتصميم التنفيذي.html` | `ee21eca6b83d2b3774b127ce3be5a1512d5b2b07a0b9ea315f2abe6ea6008662` |
| `/portfolio` | `5- صفحة أعمالنا  سويد  المحتوى والتصميم التنفيذي.html` | `bfcc2e73fda056cf0103472438a3d93c998bf0f51c04999d83cc009a64fba240` |
| `/offers` | `6- صفحة العروض والباقات  سويد  المحتوى والتصميم التنفيذي.html` | `6aeb87c77f01f475936352a966c00de6f412d12380e56e74e41803183d1ebfde` |

Store the uploaded bytes as deterministic gzip plus Base64 chunks in a server-side reference source module. The decoded bytes must keep these exact fingerprints before runtime normalization. This storage encoding is not a visual or content transformation.

## Fidelity boundary

The shared current SWEED header remains above the reference page body.

The shared current SWEED footer and AI advisor widget remain below the reference page body.

The uploaded HTML navbar and footer are integration chrome, not page-body fidelity targets. Remove them at render time so the page has one header and one footer.

The page-body fidelity target starts at the reference hero and ends at the reference final CTA.

Do not add a second legacy breadcrumb because each reference already carries its own hero breadcrumb or page context.

## What must stay the same

Preserve the uploaded reference page body as authored:

- Section order.
- Section height and spacing behavior from the reference CSS.
- Grid and responsive compositions.
- Reference colors and local typography inside the page body.
- SVG diagrams and visual geometry.
- CSS-generated visual assets.
- GSAP timing and ScrollTrigger behavior.
- Hover, pointer, tab, filter, quiz, drawer, comparison, slider, and overlay interactions.
- Mobile behavior defined in the reference media queries.
- `prefers-reduced-motion` behavior defined by the reference.
- Text and proof-state wording from the reference unless the executive DOCX explicitly blocks publication.

Do not replace these with a new React interpretation.

## Allowed integration changes

Only these changes may alter the uploaded source at render time:

- Remove the reference navbar and footer to avoid duplicate site chrome.
- Rewrite legacy internal links to current Next.js routes.
- Normalize only broken contact details that the project already corrects globally.
- Add one `main` landmark and stable focus target when the source lacks one.
- Add accessible names only when a visible reference control has no accessible name.
- Scope `body` and `footer` CSS selectors so reference styles cannot leak into the shared site shell.
- Keep the shared shell on the approved SWEED Helvetica Arabic typography. Reference body typography may remain Cairo/IBM Plex where the uploaded HTML specifies it.
- Load the exact reference scripts after the page becomes interactive.

No other visual restyling is allowed in this batch.

## Runtime architecture

Keep the existing `apps/web/site/pages` files unchanged as the default legacy sources and rollback path.

Store the newly uploaded references in a focused server-side source module as deterministic gzip plus Base64 chunks. Decode them to the exact original bytes only when `presentation="reference"` requests one of the three approved routes. Hash tests must run against those decoded bytes.

Render the three routes through the existing server-side legacy document parser, but add an explicit `reference` presentation mode.

The `reference` presentation mode must:

- Use `LegacyHeader`.
- Skip `LegacyBreadcrumb`.
- Render the normalized reference body inside a dedicated `.sweed-reference-page` wrapper.
- Skip `LegacyEnhancements` for these routes.
- Skip `AutomationDemo` for Services.
- Skip unrelated offer-funnel DOM augmentation.
- Use `LegacyFooter`.
- Keep `AiAdvisorWidget`.
- Execute only the scripts extracted from the uploaded reference.

The normal legacy presentation mode must remain unchanged for routes that still use it.

## CSS isolation

The uploaded reference CSS is part of the design and should not be rewritten into a new design system.

Apply only the minimum isolation needed for shared chrome:

- Rewrite reference `body` selectors to `.sweed-reference-page`.
- Rewrite generic `footer` selectors so they do not target the shared footer.
- Do not change reference component selectors, values, breakpoints, animations, gradients, SVG styles, or transition timings.

If browser QA finds another selector leaking outside the reference page, scope that selector without changing its declarations.

## Routing

Restore these route bodies to the reference renderer:

- `/services`
- `/portfolio`
- `/offers`

Keep current canonical route URLs.

Keep `/articles` on the current implementation in this batch. The current upload contains an Articles DOCX but no Articles HTML source. Do not claim HTML-level fidelity for Articles without the missing HTML reference.

Keep `/about`, `/contact`, the homepage, service detail routes, and article detail routes unchanged.

## Tests

Add source-fidelity tests that fail if any decoded approved reference drifts from its SHA-256 fingerprint. The old `site/pages` files are not the reference source for these three routes.

Add renderer tests for the reference mode:

- The extracted body does not include the reference navbar.
- The extracted body does not include the reference footer.
- The reference body retains route-specific hero and interaction markers.
- Reference CSS does not expose an unscoped `body` selector.
- Reference CSS does not expose an unscoped generic `footer` selector.

Update route tests so the three public routes assert reference presentation rather than executive React composers.

## Browser acceptance

Verify `/services`, `/portfolio`, and `/offers` at 1440×900, 1024×768, 390×844, and 320×568.

For every route:

- One shared header is visible.
- One shared footer is visible.
- The AI advisor widget remains available.
- No duplicate reference navbar appears.
- No extra breadcrumb appears above the reference hero.
- No horizontal page overflow exists.
- No broken images or failed reference assets exist.
- The browser console and page-error logs are empty.
- Reduced-motion mode keeps all content visible.

Exercise route-specific interactions:

- Services: sticky service map and service-section motion.
- Portfolio: filter navigation, project tabs where present, and scroll-linked section motion.
- Offers: needs quiz, package comparison overlay, service tabs, and drawers.

## Non-goals

- Do not redesign the reference pages.
- Do not port the reference body into new React cards or sections in this batch.
- Do not change the homepage typography or shared shell typography.
- Do not rebuild Articles without its HTML reference.
- Do not change verified-content rules.
- Do not push to GitHub unless the user explicitly asks.

## Rollback

The restoration must be isolated in atomic commits.

A route can be rolled back by restoring its React composer and its previous raw legacy file without affecting the other restored routes.
