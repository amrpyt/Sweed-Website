# Current State

Updated: 2026-08-18T17:07:00+03:00
Git branch: main
Git HEAD: `499f40d9ce5192cd7156b28c771b382f203cf5ae`
Application commit: `feat: add CRM AI agent interactive demo`
Active Task: SWEED-041 — CRM social inbox + AI replies
Active Plan: `.ai/plans/2026-08-18-crm-social-inbox-agent-pass.md`
Status: CRM demo refinement in progress: cleaner icon system, explicit social sources, and AI social replies

## Current Goal

Refine `/crm-ai-demo` so lead acquisition sources are immediately visible and the AI Agent can classify and reply to incoming social conversations while staying frontend-only.

## In Progress

- Replacing generic channel visuals with existing icon-library assets only; no hand-authored SVGs.
- Adding explicit social-source metadata and a unified AI-assisted inbox to the CRM demo.

## Completed Recently

- Installed all 12 official `remotion-dev/skills` into project agent skills and reviewed `remotion-best-practices`.
- Added `/crm-ai-demo` as an isolated modular React/Next product demo with no backend/API dependency.
- Added deterministic local CRM state for lead selection, pipeline stages, scores, values, activity, and reset.
- Added a local SWEED AI Agent demo that analyzes a lead, drafts WhatsApp follow-up copy, and advances simulated CRM stages.
- Added task-first responsive layouts: three-column product workspace on desktop and Pipeline / Lead / AI Agent tabs on mobile.
- Kept SWEED purple/pink identity, semantic control geometry, visible focus states, and explicit reduced-motion behavior.
- Normalized remaining homepage CTA-style actions and shared header CTAs to the 48px `--shape-control` geometry and strong SWEED type weight.
- Preserved semantic pills while removing unrelated full-pill/10px CTA radii from the About, Offers, Blog, and Contact actions.
- Kept mobile Problem Selector choices as separated rounded cards with a clear SWEED pink selected state instead of square table rows.
- Removed the homepage focus rule that visually overrode component-specific control radii.
- Scoped the mobile touch-target floor with zero-specificity selectors so component control geometry remains authoritative.
- Added semantic control typography tokens for `line-height: 1` and a measured 3px Arabic optical correction.
- Reference CTAs and compact choice controls now use asymmetric semantic block padding so visible Arabic glyphs sit at the visual center of their 48px/44px controls.
- Shared `BrandActionButton` keeps its icon geometrically centered while shifting only the Arabic label optically upward.
- Fixed compact/mobile brand-action geometry so the 28px icon and label stay fully inside the 48px control.
- Added a scoped reference button Theme Bridge derived from the homepage `BrandActionButton` language.
- Unified primary CTAs to purple base / white text / pink interaction accent with 48px minimum height and shared `--shape-control` radius.
- Unified secondary/ghost controls without flattening dark-context hierarchy.
- Unified filters, tabs, chips, quiz options, drawers, skip controls, and comparison close controls with 44px minimum targets and consistent selected/focus states.
- Preserved reference HTML bytes, layout, SVGs, GSAP choreography, and all existing interaction code.
- Added a runtime-only SWEED theme bridge to the reference presentation.
- Preserved exact uploaded source bytes and SHA-256 fidelity checks.
- Replaced runtime Cairo/IBM Plex reference typography with the same `SWEED Helvetica Arabic` stack used by the homepage.
- Normalized reference purple, pink, muted, line, and surface roles to the current homepage identity.
- Removed reference Google Fonts links so unused Cairo/IBM assets are not requested.
- Applied the same palette normalization to inline SVG and GSAP animation color literals.
- Ensured headings inherit section color so dark reference heroes keep white H1 text while light sections keep SWEED dark-purple text.
- Kept all reference layout, SVG geometry, GSAP choreography, ScrollTrigger behavior, filters, tabs, quiz, drawers, comparison overlay, and responsive structure unchanged.

## Verification

- SWEED-040 focused reducer tests: 4 passed, 0 failed.
- Clean-worktree `bun run check`: 121 passed, 0 failed, including TypeScript, ESLint, spacing, and mobile-first guards.
- Clean-worktree production build: passed; `/crm-ai-demo` generated as a static route.
- Local browser QA: 1440×900, 1024×768, 390×844, and 320×568 all had zero horizontal overflow and zero broken images.
- Primary interaction QA passed: lead selection, AI analysis, activity insertion, pipeline stage update, WhatsApp draft path, and reset behavior.
- Reduced-motion browser emulation reported `prefers-reduced-motion: reduce`; thinking-dot animation computed to `none` while the action still completed.
- Production deploy used the clean build from commit `499f40d`; `sweed-demo.service` is active and `/crm-ai-demo` returns HTTP 200 locally and publicly.
- Public browser QA passed at 1440×900 and 390×844 with zero horizontal overflow, zero broken images, no page errors, and working lead-selection/AI-analysis interaction.
- SWEED-039 focused homepage/fidelity/reference suite: 18 passed, 0 failed.
- `bun run check`: 117/117 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build: passed with 29 routes.
- Browser QA: 1440×900, 1024×768, 390×844, and 320×568 passed with no horizontal overflow or page/console errors.
- Header/About/services/blog CTA measurements: 48px height, 16px shared control radius, 700 strong weight where applicable.
- Mobile Problem Selector cards: 12px card radius with 1px border; selected state uses SWEED pink border/background and `aria-pressed=true`.
- Reduced-motion media leaves all six Problem Selector options visible; reference reveal content also remains visible.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.
- `sweed-demo.service`: active; `/`, `/services`, `/portfolio`, and `/offers` return HTTP 200 locally and publicly.
- Final reference motion lifecycle remains Services 76 / Portfolio 71 / Offers 42 ScrollTriggers at desktop and mobile widths.
- Deployment note: stop `sweed-demo.service` before rebuilding `.next`, then start it after `BUILD_ID` exists. Building while the running Next 16 process is serving the same `.next` can race with systemd restarts and leave an incomplete production build.
- Browser pixel measurement: Services CTA `+0.5px` and homepage primary CTA `-0.5px` from geometric center, improved from the previously observed ~`+4.5px` and ~`+7px` visual offsets.
- Homepage 320px: 48px action button, 28px icon fully contained, label fully contained, zero horizontal overflow.
- Services 320px: 48px CTA with `16px` line-height and `5px/11px` optical block padding; zero overflow.
- Portfolio/Offers 390px: 44px choice controls with `14px` line-height and `5px/11px` optical block padding; zero overflow at 390px and 320px.
- Exact source hashes still pass for Services, Portfolio, and Offers.
- Focused optical/fidelity/reference tests: 14 passed.
- `bun run check`: 113/113 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build: passed with 29 routes.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.
- Homepage and reference-page controls compute the same SWEED typography, 16px control radius, purple base, and pink interaction language.
- Reference primary CTAs compute at 48px minimum; choice controls compute at 44px minimum.
- Browser QA passed at 1440×900, 390×844, and 320×568 with zero horizontal overflow.
- Services sticky navigation, Portfolio filter/tab/chip interactions, and Offers quiz/comparison/tab/drawer/package/form interactions passed.
- Reference Google Fonts requests: 0.
- Motion lifecycle remains Services 76, Portfolio 71, Offers 42 ScrollTriggers.
- No page or console errors in final reference-page checks.
- Reduced motion leaves no hidden `.reveal` content.
- `sweed-demo.service`: active; `/`, `/services`, `/portfolio`, and `/offers` return HTTP 200.

## Remaining

- `/articles` remains outside HTML-level fidelity because no executable Articles HTML reference was supplied in the relevant batch.
- Push to GitHub only when explicitly requested.

## Blockers

None.

## Next Exact Action

When product positioning is approved, surface `/crm-ai-demo` from the Services page without adding backend dependencies to the demo itself.
