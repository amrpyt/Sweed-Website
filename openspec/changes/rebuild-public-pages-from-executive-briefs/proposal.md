# Rebuild public pages from executive briefs

## Why

The current public routes do not yet implement the approved page journeys, content hierarchy, and interaction rules in the uploaded executive briefs.

Standalone HTML references contain useful direction, but they do not fit the modular Next.js architecture, SWEED design system, accessibility rules, or current content repository.

## What changes

- Translate the approved Services, Software Development, Portfolio, Offers, Articles, Article Detail, and Contact briefs into modular React pages.
- Keep Server Components as the default and isolate interactive tools as small Client Components.
- Keep content typed and separate from JSX.
- Keep the current SWEED visual system, Carbon spacing scale, mobile-first guard, and accessibility baseline.
- Add the canonical `/services/software-development` route and permanently redirect `/services/development`.
- Replace legacy wrappers on affected routes only after the new route passes its verification gate.
- Test and commit each route as an independent phase.

## Boundaries

- Do not copy standalone HTML into the runtime.
- Do not install another design system.
- Do not migrate the CMS or backend.
- Do not publish unverified claims, prices, results, or client identities.
- Do not redesign unrelated homepage sections.
- Do not push without explicit approval.

## Outcome

The main public routes follow the approved executive journeys, share one technical foundation, work from mobile to desktop, and remain maintainable in the current Next.js application.
