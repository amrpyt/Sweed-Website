# SWEED Final v4 Site Hardening

Source: user-supplied “ملف التعديلات النهائي لموقع سويد — الإصدار 4.0” dated 2026-08-18.

## Execution order

1. Close all code-resolvable P0 defects: broken/internal/hash links, service placeholders, honeypots, counters, article breadcrumbs, hidden animation states, and advisor links/accessibility.
2. Apply the shared design system contract: canonical tokens, button labels/variants, spacing, motion, typography, and mobile touch/focus rules.
3. Unify shared shell components: header, footer, form behavior, and AI advisor.
4. Normalize public content: service names, offer names, company positioning, contact details, and metadata/canonical URLs.
5. Refactor the five shallow service pages to the approved nine-section service structure, then compress the development service while preserving its signature scene.
6. Compress homepage/about/services/portfolio/offers/articles/FAQ/legal surfaces to the approved content budgets and interaction models.
7. Add SEO/schema/sitemap and analytics contracts where supported by the current app.
8. Run focused tests after each atomic change; commit each independent completed unit.
9. Run full check/build, deploy safely with the service stopped during `.next` build, restore `amr:amr` ownership, restart, then QA public desktop/mobile/reduced-motion/keyboard paths.

## External decisions

- D-1 email reachability cannot be proven from source code; keep the configured official address but do not claim delivery verification without an actual received message.
- D-2 remains a business naming decision. Until changed by SWEED, use the supplied v4 default CTA text “احجز استشارتك المجانية”.
- D-3 unverified metrics remain hidden rather than invented.
- D-4 unapproved testimonials/client proof remain hidden rather than invented.
- D-5 no case-study pages are to be fabricated; unresolved project-detail CTAs must be removed/disabled so no visitor reaches 404.

## Acceptance

- No visitor-facing dead `#` action or known 404 CTA remains on public routes.
- No placeholder/honeypot helper copy is exposed to visitors or assistive tech.
- All public service names, package names, primary CTA labels, and contact data match v4.
- Shared controls preserve SWEED Helvetica Arabic optical centering, 44px+ touch targets, visible focus, and reduced-motion safety.
- Service pages expose real per-step deliverables and no repeated generic step copy.
- Full type/lint/tests/build pass and public staging returns 200 with zero horizontal overflow on required widths.
