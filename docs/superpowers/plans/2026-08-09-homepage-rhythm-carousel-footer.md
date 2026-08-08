# Homepage Rhythm, Portfolio Carousel, Slogan Band, and Footer Plan

## Brief inference

Preserve the current SWEED brand and information architecture, but remove visual friction and make the homepage feel more deliberate, compact, and premium. This is a targeted redesign, not a visual reset.

## Design dials

- Design variance: 6/10. Keep SWEED's existing geometry, but use a horizontal portfolio track and a full-width slogan band to break stacked-card repetition.
- Motion intensity: 4/10. Manual carousel movement and restrained reveal motion only. No autoplay and no new scroll hijacking.
- Visual density: 4/10. Reduce oversized empty zones while keeping marketing-page breathing room.

## Research-backed rules

- Keep macro spacing on a consistent token scale and use different spacing for section-to-section hierarchy rather than equal large padding everywhere.
- Use a manual carousel with native buttons, keyboard access, scroll snap, reduced-motion fallback, and cards that remain readable at 320px.
- Use oversized typography as the footer's final brand expression, while keeping legal/contact information readable above it.

## Task 1: Hero defect and homepage rhythm

Files:
- `apps/web/src/features/homepage/home-public-page.tsx`
- `apps/web/src/features/homepage/home-public-page.module.css`
- `apps/web/src/features/homepage/home-faq-blog-section.module.css`

Steps:
1. Remove the two decorative `buildingBeamEdge` elements and their animation CSS.
2. Override `--section-space-compact/default/feature` only inside `.homepage`, using existing Carbon tokens.
3. Recompose the blog header into a tighter content block with the CTA aligned as a peer action rather than a large centered spacer.
4. Run design guards and homepage browser measurement.

## Task 2: Portfolio carousel

Files:
- Rewrite `apps/web/src/features/homepage/home-archigreen-projects-section.tsx`
- Rewrite `apps/web/src/features/homepage/home-archigreen-projects-section.module.css`
- Create `apps/web/src/features/homepage/home-portfolio-carousel.test.tsx`

Steps:
1. Keep the approved portfolio heading and proof-state copy.
2. Use one horizontal track with `scroll-snap-type: inline mandatory`.
3. Use native previous/next buttons, no autoplay, and IntersectionObserver for active-slide synchronization.
4. Move category/proof labels out of the image overlay and into the content body.
5. Make each slide readable within a 320px viewport.
6. Add structure tests and browser interaction checks.

## Task 3: Slogan band

Files:
- Rewrite `apps/web/src/features/homepage/home-gap-section.tsx`
- Rewrite `apps/web/src/features/homepage/home-gap-section.module.css`

Steps:
1. Preserve the copy and north-marker idea.
2. Render the two phrases and compass mark on one horizontal line on normal mobile and desktop widths.
3. Use fluid type and a compact center mark rather than a large circular illustration that forces extra section height.
4. Preserve reduced-motion visibility.

## Task 4: Footer

Files:
- Rewrite `apps/web/src/features/legacy-site/legacy-footer.tsx`
- Create `apps/web/src/features/legacy-site/legacy-footer.module.css`
- Create `apps/web/src/features/legacy-site/legacy-footer.test.tsx`

Steps:
1. Preserve `.sweed-common-footer` for production smoke compatibility.
2. Replace inline CSS with a CSS Module.
3. Simplify the information layout into brand/contact + navigation/service groups + legal row.
4. Add a final oversized `SWEED` wordmark, with the `S` using the SWEED accent.
5. Keep all links and contact details functional and keyboard accessible.

## Task 5: Verification and deployment

1. `bun run design:spacing`
2. `bun run design:mobile-first`
3. `bun run check`
4. `bun run build`
5. Browser QA at 1440x900, 1024x768, 390x844, and 320x568.
6. Verify carousel buttons, swipe/scroll snap, reduced motion, footer, zero horizontal overflow, one H1/main, controls >=44px, readable text >=14px, and no console/page errors.
7. Restart `sweed-demo.service`, poll `127.0.0.1:3010`, and verify public HTTPS.
8. Commit focused phases. Do not push.
