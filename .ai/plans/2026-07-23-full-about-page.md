# Plan — Build the complete SWEED About page

Updated: 2026-07-23T17:17:22+03:00
Status: completed
Task: SWEED-017
Source: `3- ملف بيانات وتصميم من نحن.docx`

## Goal

Replace the generic `/about` page with the approved full SWEED story page: hero, story/video, founder message, family promise, vision/mission/values, compass methodology, numbers, leadership, alliances, partners, testimonials, and final CTA.

## Design Read

Arabic-first agency brand page for Egyptian and Arab business owners. The visual language is confident, family-rooted, directional, and spacious. The compass is the recurring brand metaphor; motion supports reading rather than becoming decoration.

## Current Evidence

- `/about` currently renders one generic hero, three card grids, and one CTA from `LegacyDerived*` components.
- GSAP, Embla Carousel, shared video dialog, shared counters, header, footer, and AI widget already exist.
- Framer Motion and Swiper are not installed; adding them would duplicate existing GSAP/Embla capabilities.
- Official founder/team portraits, partner logos, alliance logos, and approved testimonials are not present in public assets.
- The branch is clean at `7b5c494` and ahead of `origin/main` by 6 commits.

## Decisions

- Use existing GSAP for all entrance and path animations and Embla for the two sliders.
- Do not split Arabic text into characters; animate complete lines or elements only.
- Use the homepage video source and poster as the single media source.
- Keep unverified team members, alliances, partner logos, and testimonials visibly marked as pending content; never present placeholders as verified proof.
- Add an optional shell flag to suppress the legacy breadcrumb because the approved hero contains its own breadcrumb.
- Keep footer and AI advisor unchanged.
- Update the homepage first metric from `+16` to `+15` so the duplicated about-page numbers follow the approved July 2026 source consistently.

## File Map

- `apps/web/src/content/about-page.ts` — approved structured content and placeholder states.
- `apps/web/src/features/public-site/pages/about-public-page.tsx` — semantic page composition and interactions.
- `apps/web/src/features/public-site/pages/about-public-page.module.css` — full responsive art direction.
- `apps/web/src/features/public-site/pages/about-page-motion.tsx` — GSAP section choreography and methodology path.
- `apps/web/src/features/public-site/pages/about-page-carousel.tsx` — Embla team/testimonial controls.
- `apps/web/src/features/public-site/pages/public-page-shell.tsx` — optional breadcrumb suppression.
- `apps/web/src/app/(marketing)/about/page.tsx` — metadata from the new content source.
- `apps/web/src/content/homepage.ts` — synchronize the shared first metric.
- Focused content test under `apps/web/src/features/public-site/pages/`.

## Implementation Stages

1. Create the approved data model with explicit `verified` and `placeholder` states.
2. Build the full semantic page and reuse the existing video dialog/counter/header/footer.
3. Add GSAP choreography: hero lines, story reveal, founder mask, promise split, value stagger, methodology draw, and one-time counters.
4. Add Embla team and testimonial sliders with manual team navigation and paused-on-hover testimonial autoplay.
5. Add responsive CSS for desktop, tablet, phone, reduced motion, and RTL.
6. Update metadata, breadcrumb behavior, shared metric, and content guard tests.
7. Run check/build/deploy and browser QA section by section at desktop/mobile/reduced motion.
8. Commit application code, then update project memory in a separate commit.

## Acceptance Criteria

- [x] `/about` renders all approved sections in the specified order.
- [x] Hero contains the approved breadcrumb, title, and description and fits the initial viewport.
- [x] Story uses the homepage video source and contains the complete timeline/content.
- [x] Founder section clearly identifies the missing official portrait without inventing one.
- [x] Vision/mission and six values render with correct mobile grids.
- [x] Methodology shows five stages, delivery outputs, and a drawn responsive path.
- [x] Numbers match the homepage exactly and animate once.
- [x] Team, alliances, partner logos, and testimonials expose placeholder status visibly and cannot be mistaken for verified proof.
- [x] Team and testimonial sliders are keyboard-operable and work on phone/desktop.
- [x] Footer and AI widget remain unchanged.
- [x] No Arabic character-split animation, bounce, strong zoom, horizontal overflow, clipped text, broken images, console errors, or hidden reduced-motion content.
- [x] Check, focused tests, build, service readiness, representative route HTTP, and browser interaction QA pass.

## Completion Evidence

- Application commit: `50207ff feat: build complete SWEED about page`.
- Exact section order verified in DOM: hero, story, founder, promise, values, methodology, numbers, team, alliances, partners, testimonials, CTA.
- Story video opens the shared `/videos/blit-scroll-effect-demo.mp4` in the existing native dialog.
- Desktop values render `3×2`; mobile values render `2×3`; numbers render one row desktop and `2×2` mobile.
- Methodology uses five stages with horizontal desktop and vertical mobile SVG paths; ScrollTrigger progressively draws the active path and reveals nodes.
- Content guard tests pass 4/4 and enforce metric synchronization and placeholder verification states.
- Team slider shows four cards on desktop and card-and-partial on phone; testimonial slider shows two desktop and one phone, with controlled autoplay and pause behavior.
- Mobile top sheet retains the active `من نحن` route, closes with Escape, and restores focus.
- Desktop, tablet, 390px, and 320px checks found no page overflow or broken images.
- Reduced motion leaves all content visible, disables the partner marquee, and keeps methodology nodes fully visible.
- Browser console/errors are empty; `/about`, `/`, `/contact`, and `/portfolio` return HTTP 200.
- Web Vitals smoke: CLS `0`, FCP/LCP approximately `416ms`, TTFB approximately `12ms` in the measured run.

## Risks

- Long approved copy can produce an excessively dense page; use line-length caps, varied section layouts, and generous white gaps.
- Placeholder-heavy sections can look like real claims; use explicit badges and neutral visual treatment.
- ScrollTrigger cleanup must be scoped to the page to avoid duplicate triggers after route changes.
- Autoplay must pause on hover/focus and stop in reduced-motion mode.

## Rollback

Revert the About-page application commit; the existing generic page model remains intact and can be restored without touching the homepage or infrastructure.
