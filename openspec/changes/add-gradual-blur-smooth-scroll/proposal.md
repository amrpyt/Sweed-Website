# Add Gradual Blur And Smooth Scrolling

## Summary

Add a reusable React `GradualBlur` motion component based on the attached React Bits source, then apply it globally to the SWEED website as subtle top and bottom page-edge blur. Improve page navigation with native smooth anchor scrolling and reduced-motion fallback.

## Motivation

The site already has section reveal motion. This change adds a more polished scroll feel and visual depth without introducing heavy scroll hijacking or unnecessary dependencies.

## Scope

- Add a modular `GradualBlur` component under `apps/web/src/components/motion`.
- Add page-level scroll effects mounted from the Next root layout.
- Add native smooth scrolling and scroll padding in global CSS.
- Preserve accessibility with `prefers-reduced-motion`.
- Avoid adding `mathjs` unless implementation actually imports it.

## Non-Goals

- Do not add GSAP/Framer/Lenis for this change.
- Do not rewrite existing homepage sections.
- Do not patch legacy static HTML.

## Success Criteria

- Page-edge blur renders on the website without blocking clicks.
- Anchor scrolling is smooth for users who allow motion.
- Reduced-motion users get instant scrolling and no animated blur reveal.
- Typecheck, lint, and production build pass.
