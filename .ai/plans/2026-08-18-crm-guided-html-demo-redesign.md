# SWEED CRM Guided HTML Demo Redesign

Date: 2026-08-18
Task: SWEED-043
Status: completed

## Goal

Replace the dense internal-dashboard presentation at `/crm-ai-demo` with a visitor-facing guided product story that explains the CRM + AI Agent value in one short interactive flow.

## Experience

- Keep the route modular in Next/React while using clear semantic HTML structure.
- Present one story: social message arrives → AI understands and replies → lead is written into the CRM.
- Expose one dominant primary action per stage.
- Let visitors switch between Instagram, Facebook, and TikTok scenarios without dashboard complexity.
- Keep UI/social icons library-provided only; no hand-authored SVG markup.
- Keep all demo state frontend-only and deterministic.

## Verification

- TDD observed red before the new three-stage state model was implemented.
- Focused guided-demo tests passed 5/5.
- Impeccable detector returned no findings for the CRM implementation.
- Latest committed main verification passed 133/133 plus TypeScript, ESLint, spacing, and mobile-first guards.
- Production build passed with `/crm-ai-demo` generated as a static route.
- Local/browser QA covered 1440×900, 1024×768, 390×844, and 320×568 with zero horizontal overflow.
- Public Instagram/Facebook/TikTok interaction, keyboard focus, reduced motion, and 44px+ mobile controls passed.
- Deployed `.next` ownership is `amr:amr`; local/public route checks return HTTP 200.
