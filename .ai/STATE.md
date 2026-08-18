# Current State

Updated: 2026-08-18T20:11:00+03:00
Git branch: main
Git HEAD: `dfb7a45`
Application commit: `fix: keep services headline on one desktop line`
Active Task: SWEED-042
Active Plan: `.ai/plans/2026-08-18-final-v4-site-hardening.md`
Status: SWEED-042 in progress — SWEED-044 homepage polish is complete and deployed

## Current Goal

Resume the remaining SWEED-042 public-site hardening work without disturbing the completed homepage polish or the approved shared button hierarchy.

## In Progress

- SWEED-042 remains in progress; preserve its remaining dirty reference-service files and normalizer work.

## Completed Recently

- Completed SWEED-044 homepage polish in `b3665b3`, with follow-up fixes `14d6daa` and `dfb7a45` after browser QA exposed a non-looping portfolio edge case and an overly narrow 1024px Services title measure.
- Homepage About no longer renders a standalone `من 2011`; the approved paragraph retains the date naturally, and the slogan no longer uses the circular `N` marker.
- Homepage Services now removes the long intro, renders six cards as a 2×3 desktop grid, keeps the heading on one line from 1024px upward, and places `شوف كل الخدمات` after the grid.
- Selected Work now runs as a continuous Embla auto-scroll strip with explicit pause/resume, hover/focus pause, and a manual-scroll reduced-motion fallback.
- Clean final SWEED-044 verification passed 138/138 tests plus spacing, mobile-first, TypeScript, ESLint, and production build; deployed build `0kYh3GeJJhMOM1HwzXkcz` is active and public `/` returns HTTP 200.
- Managed agent-browser QA passed at 1440×900, 1024×768, 390×844, and 320×568: zero document overflow, one-line Services heading at desktop widths, 2×3 desktop/1-column mobile Services layout, CTA after/below the list, no standalone 2011 or slogan N, no broken loaded images or browser errors, and no sub-44px/clipped tested controls.
- Agent-browser motion QA confirmed continuous portfolio transforms beyond the previous stop boundary, hover pause/resume, explicit button pause/resume, and reduced-motion `transform:none` with manual horizontal scrolling.
- Restored the approved shared button hierarchy in `b7b94c8`: deep-purple primary CTAs, white secondary/light CTAs, and the existing pink hero-fill interaction remain canonical.
- Confirmed root cause was `999fd13` at 2026-08-18 18:49 +03:00, which inverted the canonical primary/secondary surfaces; the regression is now protected by a focused test.
- SWEED-045 TDD observed the new regression test fail first, then the focused button/reference suite passed 15/15; a clean worktree check passed 134 tests and the production build completed successfully.
- Deployed clean build `TZjk3K73aZ9mWKGXfKoXV` from `b7b94c8`; service is active and `/`, `/services`, `/portfolio`, and `/offers` all return HTTP 200 publicly.
- Public button QA confirmed purple `rgb(38, 27, 62)` primaries, white secondaries, 16px control radius, working pink fill hover, 3px visible focus ring, zero page overflow/broken images at 1440px, 390px, and 320px, and no browser errors.
- Rebuilt `/crm-ai-demo` as a guided visitor-facing product story instead of an internal CRM dashboard; the visible flow is now social message → AI reply → CRM update.
- Reduced the demo to three selectable acquisition scenarios (Instagram, Facebook, TikTok) and one dominant action at each stage: `شغّل الـAI Agent` → `حدّث الـCRM` → `ابدأ من الأول`.
- Kept the guided demo frontend-only and deterministic, with semantic page structure, explicit source identity, library-provided icons, keyboard focus, and reduced-motion support.
- Deployed the guided demo from latest committed main `98e88a4`, which includes CRM redesign commit `d6d5777`, without including the concurrent uncommitted v4 route work.
- Recovered a public HTTP 502 outage caused by the deployed `apps/web/.next` tree being owned by `root:root` while `sweed-demo.service` runs as `amr`; Next image-cache writes failed with `EACCES`.
- Restored the deployed build ownership recursively to `amr:amr` after the concurrent build finished, then verified the service, local/public root, and local/public CRM route all returned HTTP 200.
- Browser recovery QA loaded `/crm-ai-demo` to `document.readyState === "complete"` with zero broken images, zero horizontal overflow, no browser errors, and no fresh image-cache permission errors in service logs.
- Replaced generic CRM channel affordances with Lucide UI icons and Font Awesome brand icons; no hand-authored SVG/path markup was added.
- Added explicit lead acquisition metadata for Instagram, Facebook, TikTok, website, and referral sources and surfaced it in the pipeline and active lead context.
- Added a Unified Social Inbox inside the SWEED AI Agent panel with source-aware inbound messages and AI intent classification.
- Added deterministic AI social replies that append an outbound Agent message to the active thread and record the reply in CRM activity.
- Preserved the existing analyze, WhatsApp draft, pipeline advance, reset, keyboard-focus, and reduced-motion flows.
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

- SWEED-044 TDD: the four new homepage render-contract assertions were observed failing before implementation; focused final homepage suite passes 6/6.
- SWEED-044 clean final `bun run check`: 138 passed, 0 failed, with spacing/mobile-first/TypeScript/ESLint guards passing; production build passed.
- SWEED-044 deployed build: `0kYh3GeJJhMOM1HwzXkcz`; `sweed-demo.service` active; local and public homepage HTTP 200.
- SWEED-044 public browser QA: 1440×900 Services title 1 line, 2 columns/3 rows, CTA after and below grid; 1024×768 title 1 line and 2 columns; 390×844 and 320×568 zero overflow with 1-column Services and no clipped/sub-44px tested controls.
- SWEED-044 portfolio browser QA: autoplay transform advanced continuously, hover held the transform then resumed on leave, pause button held the transform and changed label, and reduced motion disabled transform/autoplay while retaining manual horizontal scrolling.
- SWEED-043 TDD: the guided three-stage state tests were observed failing before implementation, then passed 5/5.
- Guided-demo Impeccable scan returned no findings; no hand-authored `<svg>`/`<path>` markup exists in the CRM TSX files.
- Latest committed-main `bun run check`: 133 passed, 0 failed, with TypeScript, ESLint, spacing, and mobile-first guards passing.
- Latest committed-main production build passed and generated `/crm-ai-demo` as a static route; deployed build ID `BhQSp-jptS6YU2eZ3xFoI` is owned by `amr:amr`.
- Public guided-demo QA passed at 1440×900, 390×844, and 320×568 with zero horizontal overflow, zero broken images, and no sub-44px/clipped interactive controls.
- Public interaction passed from inbound message through AI reply to CRM registration; Facebook produced `94/100`, Instagram `86/100`, and TikTok generated its source-aware reply.
- Public reduced-motion QA reported zero active animations while the interaction remained functional; browser errors and fresh service permission errors were empty.
- 2026-08-18 502 recovery: `sweed-demo.service` active on `127.0.0.1:3010`; `/` and `/crm-ai-demo` return 200 locally and publicly after `.next` ownership repair.
- Post-recovery browser QA: CRM demo title loaded, ready state complete, broken images 0, horizontal overflow 0, browser errors 0, and no fresh `EACCES`/image-cache errors in the service journal.
- SWEED-041 TDD cycle: the two new source/reply reducer tests failed before implementation, then the focused suite passed 6/6.
- Impeccable detector reported no findings on the changed CRM implementation/test files.
- Local browser QA: Font Awesome brand glyphs loaded as `Font Awesome 6 Brands`; Instagram/Facebook/TikTok/Website source labels rendered with zero horizontal overflow.
- Local 1440×900, 390×844, and 320×568 checks had zero horizontal overflow; 320px had no clipped interactive controls and keyboard focus showed a 2px visible outline.
- Reduced-motion emulation reported no active animations while the AI reply action remained usable.
- Clean-worktree `bun run check`: 127 passed, 0 failed, including TypeScript, ESLint, spacing, and mobile-first guards.
- Clean-worktree production build passed and generated `/crm-ai-demo` as a static route.
- Deployed clean build ID `WScFr0dDGdEVVO22nNNMZ`; `sweed-demo.service` is active and `/crm-ai-demo` returns HTTP 200 locally and publicly.
- Public desktop QA confirmed Instagram/Facebook/TikTok/Website sources and Font Awesome brand icons; public 390px/320px QA had zero horizontal overflow and no broken images.
- Public interaction QA passed: selected the Instagram lead, AI reply appeared inside the social thread, button changed to the replied state, and `AI Agent رد على Instagram` was added to activity.
- Public reduced-motion QA had zero active animations and no page errors.
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

- Resume SWEED-042 from its existing plan and remaining dirty reference-service work.
- `/articles` remains outside HTML-level fidelity because no executable Articles HTML reference was supplied in the relevant batch.
- Push to GitHub only when explicitly requested.

## Blockers

None.

## Next Exact Action

Resume SWEED-042 from `.ai/plans/2026-08-18-final-v4-site-hardening.md`, preserving the remaining dirty reference-service files.
