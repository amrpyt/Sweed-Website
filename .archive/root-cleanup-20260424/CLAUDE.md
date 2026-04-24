# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SWEED-Website (also referred to as "Marktera") is a bilingual Arabic/English marketing agency website built with **Vite + React + TypeScript**. The site is primarily Arabic with RTL layout and features premium animations, WebGL effects, and a coral/pink brand color (#F0515C).

## Build Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server on port 3000
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run lint       # TypeScript type check (tsc --noEmit)
npm run clean      # Remove dist/ folder
```

## Architecture

### Stack
- **Framework**: Vite 6 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (uses `@theme inline` directive, NOT tailwind.config.js)
- **Components**: shadcn/ui (base-nova style) + custom components
- **Animation**: Motion (framer-motion wrapper) for scroll animations, hover effects, page transitions
- **3D/WebGL**: Three.js via @react-three/fiber + @react-three/drei, OGL for WebGL effects
- **Backend**: Express server included (port 3001)

### Path Aliases
`@/*` maps to project root — components are at `src/components/`, not `components/`.

### RTL Support
The entire app uses `dir="rtl"` and `lang="ar"`. Content is right-aligned. The ArrowLeft icon is used with rotation for "back" navigation in RTL context. Arabic numerals (٠١٢٣) are used throughout.

### Custom Components
- `src/components/CardNav.jsx` — Navigation menu from react-bits (customized)
- `src/components/Iridescence.jsx` — WebGL iridescence background effect (custom WebGL component)
- `src/components/Beams.jsx` — Three.js beams effect (legacy, may exist in project)

### CSS Architecture (Tailwind v4)
CSS variables and theme are defined in `src/index.css` using `@theme inline`:
- Primary coral color: `oklch(0.64 0.22 355)` (~#F0515C)
- Background: `oklch(1 0 0)` (white)
- Dark mode variables defined under `.dark`
- SF Arabic custom font loaded via `@font-face` rules at top of CSS

### Color System
- Primary: `#F0515C` (coral/pink)
- Secondary backgrounds: `#fafafa`, `#261B3E` (dark purple), `#3D1F2A`
- All colors use oklch() for consistency

### Key Libraries
- `motion/react` — All animations (scroll reveals, hover springs, page transitions)
- `@base-ui/react` — Base UI components
- `gsap` — Additional animation utility
- `lucide-react` — Icons
- `express` — Backend server for production

## Environment Variables

- `GEMINI_API_KEY` — Required for AI features (configured in vite.config.ts)
- `DISABLE_HMR` — Disables Hot Module Replacement in AI Studio environments
