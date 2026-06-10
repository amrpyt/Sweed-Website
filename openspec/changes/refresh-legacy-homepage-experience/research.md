# Research

## Context

- The accepted visual baseline is the legacy HTML under `site/`.
- The homepage route renders through `LegacyPage`, which reads `site/index.html`.
- The contact route renders through `LegacyPage`, which reads `site/pages/contact.html`.
- This change should keep the legacy visual direction while making the requested homepage interactions sharper and less crowded.

## External Sources

- Unsplash License: `https://unsplash.com/license`
  - Used because the hero needs free business imagery.
  - License allows free use for commercial and non-commercial purposes, with no permission required.
- Unsplash photo pages checked:
  - `https://unsplash.com/photos/three-people-in-a-business-meeting-discussing-documents-1uf2JCPFAkU`
  - `https://unsplash.com/photos/group-of-people-having-a-meeting-VBLHICVh-lI`
- WAI-ARIA Carousel Pattern: `https://w3c.github.io/wai-website/ARIA/apg/patterns/carousel/`
  - Used to keep auto-rotating carousels controllable, pausable on hover/focus, and button-driven.
- MDN CSS Carousel Guide: `https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels`
  - Used to prefer horizontal overflow plus CSS scroll snap for carousel-like rows.
- MDN CSS Scroll Snap Guide: `https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap`
  - Used for `scroll-snap-type` and child snap alignment.
- web.dev `prefers-reduced-motion`: `https://web.dev/articles/prefers-reduced-motion`
  - Used to avoid forced automatic movement for users who request reduced motion.
- Embla Carousel Auto Scroll: `https://www.embla-carousel.com/docs/v8/plugins/auto-scroll`
  - Used as the maintained ready-made continuous marquee/carousel behavior.
- Embla Carousel Options: `https://www.embla-carousel.com/docs/v8/api/options`
  - Used for `loop`, `dragFree`, `direction`, and custom `container` setup.
- Tom Select Usage Docs: `https://tom-select.js.org/docs/`
  - Used for the searchable multi-select contact field.
- Tom Select Remove Button Plugin: `https://tom-select.js.org/plugins/remove-button/`
  - Used so selected services render as removable tags instead of a hard-to-understand native multi-list.
- Direct image CDN URLs tested with HTTP 200:
  - `https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80`
  - `https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=80`

## Decisions

- Treat the requested items as one homepage experience phase because the hero, top bar, CTA, portfolio, services, and contact prefill are connected.
- Use the official SVG logo from `references/brand-assets/logo-source/اللوججو svg/SWEED Color 1.svg` and expose it through `public/`.
- Keep the header and top bar fixed instead of hiding on scroll.
- Use a slow CSS background crossfade for two hero business images.
- Keep sections compact through horizontal carousels instead of adding long grids.
- Use URL query parameters from the quick CTA to prefill the contact page service selections.
- Use light-gray demo logo marks in the customer marquee until real client logo assets are provided.
- Make compact homepage rails visibly scrollable with soft edge masks, light scrollbars, helper text, arrow controls, and slow auto-scroll.
- Pause auto-scroll when the user hovers, touches, or focuses a carousel, and skip auto-scroll when `prefers-reduced-motion: reduce` is active.
- Replace local timer-based carousel behavior with Embla Carousel plus the official Auto Scroll plugin for continuous motion like the logo marquee.
- Duplicate carousel slides enough times to avoid visible rail endings, then reverse the auto-scroll direction per user feedback.
- Enhance the contact service multi-select with Tom Select tags, search, and remove buttons.
