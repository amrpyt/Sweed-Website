# SWEED public-page executive rebuild

Date: 2026-08-04
Status: approved for implementation
Task: SWEED-024

## Goal

Rebuild the main public routes from the approved executive briefs. Keep the current Next.js application, SWEED visual system, and Carbon spacing contract.

The work must not copy standalone HTML into the runtime. It must translate the approved content, structure, and interaction rules into modular React components.

## Source precedence

Use this order when two uploaded files conflict:

1. The executive HTML and DOCX files for Services, Portfolio, Offers, and Articles.
2. The detailed Software Development and Article Detail HTML files.
3. The Contact HTML file for content and form behavior only.
4. Older alternative article layouts for useful content only.
5. The current typed project data for verified names, claims, contact details, and working routes.

Do not publish invented results, client names, testimonials, prices, or metrics. Keep an item unpublished or labeled as pending when the source lacks verification.

## Route map

| Route | Primary source | Result |
| --- | --- | --- |
| `/services` | `صفحة_خدماتنا_نموذج_للمبرمج (1).html` and the Services executive DOCX | A decision journey with six distinct service sections. |
| `/services/software-development` | `صفحة_خدمة_البرمجة_والتطوير_نموذج_للمبرمج (1).html` | A detailed software-development page with diagnostic and system interactions. |
| `/services/development` | Current route | A permanent redirect to `/services/software-development`. |
| `/portfolio` | `صفحة_أعمالنا_نموذج_للمبرمج (1).html` and the Portfolio executive DOCX | A proof-led narrative, not a generic gallery. |
| `/offers` | `6- صفحة العروض والباقات ... (1).html` and the Offers executive DOCX | A decision-led package selector with comparison tools. |
| `/articles` | `7- صفحة المقالات ... (1).html` and the Articles executive DOCX | A knowledge center with search, filters, and varied content patterns. |
| `/articles/[slug]` | `3- الصفحة الثانية صفحة المقالة نفسها.html` | A readable article layout with metadata, body sections, related links, and conversion actions. |
| `/contact` | `1- صفحة تواصل معنا.html` | A focused contact journey that reuses the current form backend and SWEED shell. |

## Architecture

### Route composition

Each route gets one page composer under `apps/web/src/features/public-site/pages` or a focused route feature folder.

Each composer uses small sections. A section owns one purpose and one public interface. Interactive parts use isolated Client Components.

The route page stays a Server Component by default. It imports typed content and static sections. It loads Client Components only for filters, quizzes, comparison panels, forms, and controlled motion.

### Content ownership

Put page copy and page configuration under `apps/web/src/content/public-site`.

Keep service, article, offer, and portfolio records typed. Extend the existing content types only when the page needs a real field.

Do not hardcode large content arrays inside JSX files.

### Shared primitives

Reuse or extend these shared concepts:

- Public page shell.
- Page hero.
- Section header.
- Sticky horizontal navigation.
- Action group.
- Content card.
- Proof state label.
- Filter chip.
- Comparison panel.
- Empty state.
- Form field and validation message.

A shared primitive must solve the same problem on at least two routes. Page-specific visual compositions stay inside their page feature.

### Styling

Use CSS Modules and current semantic tokens.

Use the Carbon 2x spacing scale through SWEED aliases. Do not add arbitrary `margin`, `padding`, or `gap` values.

Use the approved SWEED type roles and weights. Keep readable text at 14px or larger on mobile.

Use logical properties for RTL. Base styles target 320px to 390px. Add larger layouts with `min-width` media or container queries.

## Mobile-first contract

The base DOM order must match the reading order.

The mobile layout uses one column unless horizontal scrolling improves the task. Horizontal strips must show that more content exists and must not hide essential information.

All controls must provide at least a 44px target. Text must not overlap at 200 percent zoom. No primary content can depend on hover.

Desktop enhancements may add grids, sticky context, or visual layers. They must not reorder the semantic reading sequence.

The existing `design:mobile-first` and `design:spacing` checks remain required.

## Page designs

### Services

The page starts from the visitor problem, not a service catalog.

The route contains:

1. A dark hero with one promise, two actions, and a functional direction visual.
2. A sticky service map with six items.
3. Six service sections with different visual compositions.
4. An integrated-path section that shows sensible service sequences.
5. A final diagnostic CTA.

Each service section includes the problem, the role of the service, a short scope list, a success indicator, and one detail-page action.

Motion draws or reveals the service logic once. It never hides content when JavaScript fails.

### Software Development

This page explains a connected operating system, not a collection of technical deliverables.

The route contains:

1. A hero with the six system layers.
2. A short fault diagnostic.
3. A comparison between a screen-only solution and an operating system.
4. A module explorer.
5. A delivery process.
6. Use cases and integration outcomes.
7. A final project CTA.

The fault diagnostic gives a recommendation, not a guaranteed diagnosis. All answers remain available without hover.

### Portfolio

This page proves thinking and execution. It does not start with a generic card grid.

The route contains:

1. A proof-led hero.
2. A verified trust strip.
3. A sticky filter strip.
4. Narrative sections for consulting, brand, marketing, media, advertising, and digital products.
5. Sector context.
6. A final proof and project CTA.

Filters help experienced visitors jump to a section. They do not replace or hide the full narrative by default.

Each project shows a challenge, SWEED role, deliverable, proof state, and case-study link. Numerical results require verified source data.

### Offers

This page helps the visitor choose a starting point. It does not act as a static price table.

The route contains:

1. A hero that reduces pricing anxiety.
2. A three-question needs selector.
3. Three integrated packages.
4. A comparison panel.
5. A sticky service selector.
6. Service-specific package groups.
7. Time-bound offers when verified.
8. Verified numbers only.
9. FAQ.
10. A tailored contact CTA.

The needs selector stores answers in local component state. It produces a recommendation and pre-fills the contact context.

The comparison uses a bottom sheet on mobile and a centered panel on larger screens. It traps focus, closes with Escape, restores focus, and supports reduced motion.

### Articles index

The page acts as a knowledge center.

The route contains:

1. A hero with search and one featured article.
2. A sticky filter strip.
3. A responsive article grid.
4. Problem-led content paths.
5. Applied guides and case-study content.
6. A most-read list when real data exists.
7. A newsletter or contact relationship action.
8. A final consultation CTA.

Search waits briefly before updating results. Filters update without a page jump. Empty results show a helpful message and nearby topics.

The URL may store stable filter values. Session state may restore scroll and filters. Search-only transient text does not need an indexable URL.

### Article detail

The route prioritizes reading.

The content column uses a readable measure and clear vertical rhythm. The layout includes article metadata, optional author data, share actions, body sections, related services, related articles, and a final CTA.

Do not justify Arabic body text. Use natural alignment and balanced headings.

A sidebar may appear on large screens. Mobile keeps a single reading column.

### Contact

The page reuses the existing application header, footer, contact store, API route, and validation model.

Use the uploaded file for contact methods, working-hours structure, form fields, success feedback, and page intent. Do not copy its separate top bar, duplicate navigation, external icon dependency, or generic gradients.

The mobile order is:

1. Page promise.
2. Primary contact actions.
3. Contact form.
4. Contact details and working hours.

The form must show field errors, submit progress, server errors, and a useful success state.

## Accessibility and state rules

- One visible `h1` and one `main` landmark per route.
- Semantic headings must not skip levels.
- Every interactive control needs an accessible name.
- Every dialog or sheet must manage focus.
- Focus indicators must stay visible on all surfaces.
- Reduced motion must show complete content immediately.
- Images need descriptive Arabic alternative text when meaningful.
- Empty, loading, error, and disabled states must be explicit.
- Essential content must work without animation.

## SEO and routing

Each route gets typed metadata, canonical URLs, and relevant Open Graph data.

Article routes get Article structured data when the typed content supports every required field.

Service routes get Service structured data when the content supports it.

Update sitemap entries and internal links after route migration.

The old `/services/development` path redirects permanently to `/services/software-development`.

## Verification gates

Complete these gates after each route phase:

1. Run focused unit tests for content and interaction logic.
2. Run TypeScript, lint, spacing, and mobile-first checks.
3. Run the production build.
4. Test the route at 1440x900, 1024x768, 390x844, and 320x568.
5. Test keyboard flow and reduced motion.
6. Check overflow, broken images, console errors, page errors, and target sizes.
7. Commit the completed route before starting the next route.

After all routes pass, restart the demo service. Poll the local route until it returns 200. Then verify the public HTTPS routes.

## Delivery order

1. Shared page architecture and typed content contracts.
2. Services index.
3. Software Development detail and redirect.
4. Portfolio.
5. Offers.
6. Articles index.
7. Article detail.
8. Contact.
9. Full regression, deployment, and evidence.

## Non-goals

- Do not migrate the CMS or backend in this batch.
- Do not install a second design system.
- Do not copy uploaded HTML into `apps/web/site`.
- Do not add unverified prices, claims, or assets.
- Do not redesign the homepage unless a shared primitive requires a compatible update.
- Do not push to GitHub without explicit approval.
