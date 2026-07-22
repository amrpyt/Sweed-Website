# SWEED Homepage Final Content Integration

ID: PLAN-SWEED-009
Created: 2026-07-23
Updated: 2026-07-23T01:04:40+03:00
Status: completed
Related task: SWEED-009
Source: user-supplied final homepage content, July 2026

## Goal

Replace the homepage placeholder/temporary copy with the approved Arabic-first SWEED content, align the rendered section order with the delivery document, and normalize section motion to the approved controlled-motion rules without harming accessibility, responsiveness, performance, or existing conversion behavior.

## Source Rules

- Voice: confident, direct, friendly, firm Egyptian formal colloquial Arabic.
- Use partnership language: “إحنا معاك”.
- No absolute performance promises or invented claims.
- Prefer measurable language, explicit actions, and clear CTAs.
- Preserve the six hidden problem-to-service mappings in contact submissions.
- Contact details not explicitly verified by the source remain existing runtime values until official replacements are supplied.
- Only the first portfolio case is described as documented. Unverified cases must not display fabricated numerical outcomes.

## Intended Homepage Order

1. Hero.
2. Problems.
3. About / video.
4. Compass slogan divider.
5. Services.
6. Why SWEED + metrics.
7. Selected work.
8. Offers.
9. FAQ.
10. Articles.
11. Contact.
12. Footer.
13. AI support widget.

The prior standalone process section is removed from homepage composition because it is not part of the approved final order. Its component remains in the repository for future deliberate use.

## Scope

- Central homepage content model and types.
- Homepage composition and hero supplementary copy.
- Problems section layout/content/selection behavior.
- About/video content and fast differentiators.
- Compass slogan divider.
- Services heading/cards/links.
- Why section points and four metrics.
- Selected-work content with one documented case and clearly labeled pending case studies.
- Offers copy, CTAs, and custom-scope note.
- Eight FAQs and three approved article cards.
- Contact copy and expanded fields.
- Footer copy/navigation/location/legal links.
- AI widget greeting, quick prompts, and approved deterministic answers/fallback guidance.
- Motion timing/stagger normalization for touched sections.

## Non-Goals

- Inventing missing official email, phone, social links, or case-study metrics.
- Publishing unverified portfolio outcomes as facts.
- Replacing media assets that the source says will be delivered later.
- Rebuilding internal service/about/portfolio pages beyond links required by the homepage.
- Adding Framer Motion as a second animation runtime; use the established GSAP/CSS/Lenis architecture.
- Pushing commits without explicit user instruction.

## Implementation Stages

### Stage 1 — Content model and source-of-truth

1. Expand homepage types for trust line, about copy, vision/mission, portfolio verification state, contact request fields, footer, and AI quick responses.
2. Replace all approved homepage copy and mappings.
3. Preserve one documented portfolio outcome and convert unverified entries to explicit documentation placeholders.

### Stage 2 — Core narrative sections

1. Add hero eyebrow, approved description, and trust line.
2. Rebuild problems layout for full customer-voice statements and selection-to-contact behavior.
3. Expand About section and replace the horse slogan with the compass direction composition.
4. Remove standalone process section from homepage order.

### Stage 3 — Conversion and proof sections

1. Update services, why points, metrics, portfolio, and offers.
2. Update FAQ and article cards from the approved content source.
3. Expand contact form fields and success copy while preserving API compatibility.
4. Update footer and AI support content.

### Stage 4 — Motion and quality

1. Keep no more than four primary motion families: split/reveal, stagger, selective scroll-linked/pinned storytelling, progress/mask.
2. Normalize entrances to 0.6–0.9 seconds and stagger to 0.08–0.15 seconds where used.
3. No bounce, strong zoom, or mobile pinned/parallax takeover.
4. Ensure animations trigger once for touched content unless the existing shared behavior requires replay.
5. Preserve `prefers-reduced-motion` fallbacks.

### Stage 5 — Verification and delivery

1. Run check, unit tests, production build.
2. Deploy and poll local HTTP readiness.
3. Verify public HTTP 200.
4. Browser review at 1440, 1024, 768, and 390 widths.
5. Verify problems selection populates hidden contact context.
6. Verify offer selection, form fields, FAQ accordion, article/service links, footer, AI quick prompts, no overflow, no broken images, and no console errors.
7. Commit application changes and tracked memory separately.

## Acceptance Criteria

- [x] Homepage sections render in the approved order.
- [x] Approved hero, problems, about, slogan, services, why, offers, FAQ, articles, contact, footer, and AI copy is present.
- [x] Problem cards submit the approved hidden service mappings.
- [x] No unverified portfolio metric is presented as factual.
- [x] Contact form contains name, WhatsApp phone, activity type, activity location/title, request type, and project message.
- [x] Eight FAQs and three approved article summaries render.
- [x] Motion follows the four-family budget and reduced-motion works.
- [x] Desktop/tablet/mobile layouts have no horizontal overflow or clipped text.
- [x] Check/build/service/public/browser verification passes.

## Completion Evidence

- Application commit: `271a6a7 feat: install final SWEED homepage content`.
- Homepage order verified from `#home` through `#contact`; old standalone Process section is absent.
- Counts verified: 6 problems, 6 services, 4 metrics, 3 portfolio cards, 3 offers, 8 FAQs, 3 latest articles.
- Problem selection recorded the exact customer statement, hidden service `الاستشارات الإدارية`, and source `problems`, then moved the user to contact.
- Growth offer selection recorded `نمو` and moved the user to contact.
- Contact validation rejected all six empty required fields without sending a request.
- Approved AI quick prompt returned its deterministic approved answer without API loading.
- Dynamic article and service pages render the matching slug content and are statically generated.
- Public routes `/`, `/services`, `/services/consulting`, `/articles/project-needs-direction`, `/privacy`, and `/terms` return HTTP 200.
- Browser QA passed at 1440, 1024, 768, and 390 widths; no horizontal overflow, browser errors, or console errors.
- Reduced-motion QA showed all content visible, no Lenis, no route entrance, and no hidden problem cards.
- Web Vitals smoke: CLS `0`, FCP/LCP approximately `984ms` in the measured run.

## Risks

- Long Arabic customer-voice statements can overflow the existing circular problem-card design; rebuild instead of squeezing copy.
- Expanded About copy can become dense; use hierarchy and progressive grouping without hiding approved text.
- The existing contact API validates only legacy fields; send new fields inside the message payload unless the API contract is safely extended.
- Route paths in the source include inconsistent trailing slashes and `/blog`; use existing Next routes (`/articles`) while preserving labels.
- Current contact data may be placeholders; do not claim verification.

## Rollback

Revert the focused SWEED-009 commits, rebuild, restart `sweed-demo.service`, poll local readiness, and verify the public homepage.
