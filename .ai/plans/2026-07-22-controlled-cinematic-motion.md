# SWEED Controlled Cinematic Motion

ID: PLAN-SWEED-008
Created: 2026-07-22
Updated: 2026-07-22T20:55:00+03:00
Status: completed
Related task: SWEED-008

## Goal

Turn the existing collection of motion effects into one coherent, restrained motion direction across the SWEED public website: smooth desktop scroll, one signature hero sequence, subtle scroll-linked depth, consistent page entrances, clear interaction feedback, and full reduced-motion support.

## Current Evidence

- Lenis smooth scrolling is active on desktop only and correctly disabled on mobile/reduced-motion.
- GSAP and ScrollTrigger are already installed and used across multiple homepage sections.
- The homepage currently reports many independent animations, but no route/page transition layer.
- Root document has no View Transition or page entrance system.
- Hero scroll choreography uses a raw scroll listener to mutate `clip-path` and does not expose a shared scroll velocity/progress signal.
- Motion timings/easings are inconsistent; the hero still uses a bounce-like `back.out` easing.
- Existing reveal systems mostly operate independently, so the overall experience feels assembled rather than art-directed.

## Motion Direction

Name: **SWEED Controlled Cinematic Motion**

- Personality: confident, precise, energetic, not playful.
- Desktop: light inertia, subtle scroll-linked depth, strong hero entrance, short page entrance.
- Mobile: native scrolling, reduced parallax, no scroll hijacking.
- Motion budget: one signature hero moment, one shared page entrance, subtle media depth, consistent button feedback.
- Reduced motion: no parallax, no masked route entrance, no hidden content.

## Scope

1. Add shared motion tokens and page-transition styling.
2. Add a route-level page entrance using `template.tsx`.
3. Upgrade smooth scroll into a central scroll signal source with CSS variables for progress, velocity, and direction.
4. Replace the homepage hero raw scroll listener with GSAP/ScrollTrigger scrubbed choreography.
5. Apply subtle scroll-linked depth to selected hero/media elements only.
6. Normalize button interaction timing/easing to the shared motion tokens.
7. Verify desktop, tablet, mobile, reduced motion, navigation, console, overflow, and service health.

## Non-Goals

- No WebGL/Three.js.
- No custom cursor across the site.
- No horizontal-scroll takeover.
- No pinned full-page storytelling sections.
- No animation on every section.
- No change to content, routes, or brand identity.

## Intended Files

- `apps/web/src/app/globals.css`
- `apps/web/src/app/template.tsx`
- `apps/web/src/components/motion/smooth-scroll.tsx`
- `apps/web/src/components/motion/page-scroll-effects.tsx`
- `apps/web/src/features/homepage/home-public-page.tsx`
- `apps/web/src/features/homepage/home-public-page.module.css`
- `apps/web/src/components/ui/brand-action-button.module.css`

## Acceptance Criteria

- [x] One coherent motion token system is available globally.
- [x] Public route navigation produces a short, non-blocking page entrance.
- [x] Desktop exposes live scroll progress/velocity/direction CSS variables.
- [x] Mobile retains native scrolling and no page-level overflow.
- [x] Hero depth and pyramid reveal are driven by ScrollTrigger, not an unthrottled raw scroll listener.
- [x] No bounce/elastic easing remains in the touched hero/button motion.
- [x] Reduced-motion mode shows final content instantly and disables parallax/page entrance.
- [x] `bun run check` and `bun run build` pass.
- [x] Demo service is active and public URL returns HTTP 200.
- [x] Desktop/mobile browser QA shows no console errors, broken images, or horizontal overflow.

## Risks

- Global page entrances can feel slow if duration exceeds 500ms; cap at 420ms.
- Scroll velocity variables can cause excessive style work if updated directly every event; throttle through requestAnimationFrame.
- Existing GSAP sections depend on Lenis/ScrollTrigger synchronization; preserve current ticker integration.
- Route templates remount on every navigation; the entrance must not block interaction.

## Verification

- Static checks and production build.
- Desktop 1440x900 and 1280x720.
- Tablet 1024px.
- Mobile 390x844.
- Reduced-motion emulation.
- Client-side navigation from homepage to services and back.
- Inspect CSS scroll variables at rest and during scrolling.
- Confirm hero transforms change with scroll and reset safely.
- Console/errors, broken images, horizontal overflow, local/public HTTP 200.

## Verification Results

- Application commit: `4fcec53 feat: add controlled cinematic motion system`.
- Desktop root reports `data-motion-system="controlled-cinematic"` and `data-smooth-scroll="lenis"`.
- Mobile and reduced-motion environments report no Lenis marker.
- Scroll progress/direction/velocity variables update through requestAnimationFrame throttling.
- At `scrollY=900`, hero media scaled to `1.028`, moved upward, matrices moved at different depths, and the pyramid mask progressed.
- Service items expose `animation-timeline: view()` while remaining static, semantic, and fully visible.
- Route frame entrance is present; its veil finishes hidden with `clip-path: inset(0 0 100%)`.
- Reduced-motion mode reports zero route animations and visible service content.
- 1440px, 1024px, and 390px checks show no horizontal overflow or broken images.
- Browser errors and console output are empty.
- Browser vitals: CLS `0`, LCP/FCP about `1.16s`, TTFB about `39ms` in the sampled run.
- Check/build/service/local/public verification passed.

## Rollback

Revert commit `4fcec53`, rebuild, restart `sweed-demo.service`, and verify local/public HTTP 200.
