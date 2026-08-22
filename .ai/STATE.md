# Current State

Updated: 2026-08-22T20:16:00+03:00
Git branch: `main` synchronized through isolated worktree
Git HEAD: `1f0d05a`
Application commit: `fix: repair reference service rendering` (latest code commit before current navbar repair)
Active Task: SWEED-052
Active Plan: `.ai/plans/2026-08-22-navbar-primary-cta-regression.md`
Status: SWEED-052 in progress

## Delivery Update

- Pushed `main` to GitHub through `4d5703f`; the application worktree and `origin/main` are synchronized.
- Vercel project `sweed-website` automatically deployed `4d5703f` successfully.
- Production URL: `https://sweed-website.vercel.app`.
- Production `/services/branding` and `/services/digital-marketing` were browser-verified at desktop and 390px mobile widths after deployment.
- GitHub→Vercel automatic deployment is active for the current project.
- Vercel currently has no project environment variables configured; static/public routes build and serve successfully.

## Current Goal

Restore the approved shared navbar balance and primary consultation CTA without reverting later navigation behavior.

## In Progress

- SWEED-052 navbar regression repair is being verified in an isolated worktree.

## Completed Recently

- Completed SWEED-051 in `4d5703f`: repaired the shared reference renderer used by `/services/branding` and `/services/digital-marketing` without editing their approved uploaded HTML sources.
- Root cause 1: `applySweedReferenceTheme` inserted a double-quoted SWEED font stack into quoted inline `onerror` markup, corrupting HTML parsing and re-parenting Branding card bodies outside `.wcard`; inline `font-family:` replacement now uses a quote-safe unquoted CSS stack.
- Root cause 2: the canonical reference action bridge used block-level `display:grid`, stretching buttons in normal block parents to 740–1265px; it now uses `inline-grid`, preserving the icon/label grid while restoring intrinsic CTA sizing.
- The broad About-era `!important` reference paint overrides were removed and the conflicting About CTA rule is now scoped only to the About reference route.
- TDD observed the font-safety and intrinsic-button regressions fail before repair; the final focused suite passes 26/26. Fresh TypeScript, ESLint, and production build pass. The repo-wide `bun run check` remains blocked at the existing unrelated `design:spacing` debt.
- Local browser QA: Branding keeps four `.wcard` cards, case/compare CTAs measure 171–176px; Digital case/compare CTAs measure 171–193px; both have zero oversized buttons, horizontal overflow, broken loaded images, or browser errors at desktop and 390px mobile widths.
- Production QA after Vercel success matches local: Branding 4 cards and 171–176px affected CTAs; Digital 171–193px affected CTAs; both have zero oversized buttons, overflow, and broken loaded images at desktop and 390px mobile widths.

- Completed SWEED-050 in `55b54c6`: `/about` now uses the approved reference HTML inside the shared SWEED header/footer, SWEED Helvetica Arabic, current purple/pink/neutral palette bridge, and canonical 48px/16px SWEED CTA system.
- Preserved the approved About structure exactly: browser comparison against the pre-change production page found an empty diff for section identifiers and h1/h2/h3 text; the page still renders 14 sections and 25 headings.
- Kept non-brand behavior unchanged by disabling the AI advisor on the About route, matching the prior exact-reference behavior.
- Fixed reference-button specificity so prototype `.cta .btn-ghost` paint cannot override the shared white-secondary/purple-label contract; the settled hover uses the purple expanding fill and white label.
- Focused reference/button tests passed 24/24; TypeScript, ESLint, mobile-first guard, and production build passed. The full unit baseline is 152 pass / 9 pre-existing failures, the same nine unrelated failures present before this task. The spacing guard remains blocked by pre-existing unrelated CSS debt.
- Production QA on `https://sweed-website.vercel.app/about`: shared header/footer present, prototype nav absent, SWEED font only, zero horizontal overflow, zero broken images/browser errors, 44×44 mobile menu control, and working mobile menu at 390×844.

- Completed SWEED-049 in `512229d`: removed the five-dot Services → Why divider and compacted only the touching section edges from 96px each to 32px each.
- Browser measurement reduced the Services CTA → Why heading transition to 64px on both 1536px desktop and 390px mobile, with divider count 0.
- SWEED-049 TDD observed the new regression contract fail before implementation, then focused tests passed 5/5; full `bun run check` passed 154/154 and production build `0RZfjg9H9QsjyipAf6a3S` deployed successfully.
- Public desktop/mobile QA found zero broken loaded images, zero browser/console errors, and no horizontal overflow.

- Completed SWEED-048 in `a3d519f`: removed the standalone homepage slogan section, moved the direction promise into the hero subtitle, simplified the restaurant proof title, moved `شاهد كل الأعمال` below the proof cards, upgraded Selected Work cards to clearer white proof surfaces with category/status chips, and added a five-dot SWEED divider between Services and Why.
- SWEED-048 focused TDD passed 10/10; full `bun run check` passed 153/153 tests and all spacing/mobile-first/TypeScript/ESLint gates. Impeccable detector returned no findings.
- Deployed build `6-l3XQ4eL9exGMJW596dw`; `sweed-demo.service` is active and the public homepage returns HTTP 200. Managed browser QA confirmed the new hero copy, no `#slogan`, portfolio CTA after cards, restaurant title, five-dot divider, zero broken loaded images, and no horizontal overflow at desktop/mobile widths.

- Completed SWEED-047 in `b8e245a`: the shared header keeps Arabic navigation RTL while placing the SWEED logo on the physical left and the consultation/menu action on the physical right at desktop and mobile widths.
- Restored all six approved `ليه تختار سويد؟` points, including `شراكة مش خدمة` and `التزام بالمواعيد`; Git history confirmed those two points were removed by `999fd13` after originally shipping in `271a6a7`.
- Widened the Selected Work, Offers, FAQ, and homepage Contact heading/supporting-copy measures so desktop text uses the available width instead of stacking into narrow columns.
- Replaced the visible Selected Work autoplay toggle with accessible previous/next arrow controls through the existing Embla API; autoplay, hover/focus pause, looping, and reduced-motion manual scrolling remain intact.
- Removed the homepage FAQ `شاهد كل الأسئلة` action and the homepage Contact phone/WhatsApp method rows while preserving the contact form and approved supporting copy.
- Added focused TDD contracts for the requested homepage behavior: the new assertions failed before implementation, then the final focused suite passed 14/14.
- Fixed a concurrent reference-button palette regression in `beef95f` so the already-approved deep-purple primary / white secondary / pink expanding-fill hierarchy remains green against the existing shared reference tests.
- Final SWEED-047 `bun run check` passed 153/153 tests plus spacing, mobile-first, package/web TypeScript, and ESLint; production build `a9A_eF4ntTSB1-SfIPxkV` passed, was verified with `amr:amr` ownership, and was deployed successfully. Concurrent SWEED-042 rebuilds subsequently advanced the runtime build while preserving the SWEED-047 public contract.
- Public managed-agent-browser QA passed at 1440×900, 1024×768, 390×844, and 320×568: zero document horizontal overflow, correct physical header placement, six Why items, expected desktop/mobile wrapping, no removed FAQ/contact/autoplay controls, working carousel arrows/autoplay/hover/focus behavior, and reduced-motion manual reachability.
- Fresh production browser sessions reported no page errors, no console errors, and no broken loaded images in the affected sections; local and public homepage checks return HTTP 200.

- Completed SWEED-046 in `2693fb0`: the restored deep-purple primary / white secondary / pink expanding-fill action design is now the documented and tested canonical CTA system across the public website.
- Added semantic `--action-*` tokens plus `DEC-015`; page/feature CSS may size or position CTA controls but must not repaint their surfaces, borders, fill, shadows, focus treatment, or state behavior.
- Migrated remaining CTA outliers in Services, Portfolio, Articles, Offers recommendations, CRM demo, AI advisor ticket form, offer funnel, shared public sections, and `/midu-clone` to `Button`, `ButtonLink`, or the shared `BrandActionButton` mechanism.
- Removed duplicate page-local CTA paint rules while deliberately keeping tabs, filters, selectors, carousel controls, menu controls, icon buttons, and other non-CTA interactions purpose-specific.
- Clean-worktree `bun run check` at `2693fb0` passed 142/142 tests plus spacing, mobile-first, package/web TypeScript, and ESLint; the production build completed successfully.
- Deployed clean build `ZgXdb-_x2rEQswS2SpRGc`; `sweed-demo.service` is active and `/`, `/services`, `/portfolio`, `/offers`, `/articles`, `/crm-ai-demo`, and `/midu-clone` return HTTP 200 publicly.
- Public browser QA confirmed canonical former outliers (`ناقش خدمة`, `افتح المشروع`, `اقرأ المقال`, Offers recommendation actions, CRM stage actions, and Midu CTAs), purple/white hierarchy, full expanding fill, 3px focus outline, ~3px Arabic optical shift, zero horizontal overflow, and zero broken loaded images at representative desktop/tablet/mobile widths.
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

- SWEED-047 TDD red state: 7 new/requested assertions failed before the production changes; final focused homepage suite passed 14/14.
- SWEED-047 Impeccable detector returned no findings on the changed UI files; spacing and mobile-first design guards passed.
- Final clean verification for HEAD `beef95f`: `bun run check` passed 153 tests, 0 failed, 652 expectations; package/web TypeScript and ESLint passed.
- Production build passed after stopping `sweed-demo.service`; SWEED-047 build ID `a9A_eF4ntTSB1-SfIPxkV`; `.next` ownership check found no non-`amr:amr` entries; service became ready on the second local HTTP poll and public `/` returned 200. Later concurrent builds changed the runtime build ID, so do not treat `a9A_eF4ntTSB1-SfIPxkV` as the permanent current runtime ID.
- After the concurrent rebuilds, the public homepage contract was rechecked again: 1440px still showed logo physical-left / CTA physical-right, six Why entries, one-line requested desktop headings, two carousel arrows, continuous autoplay and hover pause; 390px still showed logo left / 44×44 menu right, zero overflow, removed controls absent, and reduced-motion manual scrolling.
- Public 1440×900: nav direction RTL, logo at x 33–151 on the physical left, consultation CTA at x 1195–1393 on the physical right, Why count 6, Portfolio/Offers/FAQ/Contact titles each one line, pause control absent, both carousel arrows present, FAQ all-questions action absent, and homepage Contact direct phone/WhatsApp rows absent.
- Public 1024×768: zero overflow, logo x 8–96 left, menu action x 957–1001 right at 44×44, Why count 6, and all four requested section titles remain one line.
- Public 390×844 and 320×568: zero document overflow, logo remains physical-left, 44×44 menu control remains physical-right, Why count 6, and the widened sections wrap naturally without forced desktop-style single lines.
- Public carousel interaction: autoplay transform advanced continuously, hover held the transform, keyboard focus held the transform, the next-arrow changed carousel position, and arrows measure about 48–50px.
- Public reduced-motion 390px: `prefers-reduced-motion` true, track transform `none`, arrows hidden, viewport `overflow-x:auto`, and manual scroll moved from 0 to -326.
- Public mobile menu 390px: dialog direction RTL, zero overflow, 47px menu rows, Escape closes it, and focus returns to the menu trigger.
- Fresh final production browser sessions at 1440px and 390px had empty page-error and console-error output; affected-section loaded-image checks found no broken images.

- SWEED-046 TDD: the site-wide action contract was observed failing on the known CTA outliers before migration, then the focused button/public/reference suite passed 25/25.
- SWEED-046 Impeccable detector returned no findings on the changed canonical UI targets.
- SWEED-046 clean `bun run check` at `2693fb0`: 142 passed, 0 failed; spacing, mobile-first, package/web TypeScript, and ESLint passed.
- SWEED-046 production build passed with 30 static/SSG pages generated; deployed build ID `ZgXdb-_x2rEQswS2SpRGc` has `amr:amr` ownership.
- SWEED-046 public HTTP: service active; `/`, `/services`, `/portfolio`, `/offers`, `/articles`, `/crm-ai-demo`, and `/midu-clone` return 200.
- SWEED-046 desktop hover/focus QA: primary remains `rgb(38, 27, 62)` while pink fill becomes `inset(0px round 8px)` and lifts 2px; secondary remains white while purple fill becomes full; keyboard focus is a 3px SWEED-pink outline with 3px offset.
- SWEED-046 responsive QA: 1024×768, 390×844, and 320×568 had zero document horizontal overflow and zero broken loaded images on tested routes; visible canonical actions stayed inside the viewport with 16px radius and ~3px Arabic optical correction.
- SWEED-046 interaction QA: CRM completed `شغّل الـAI Agent` → `حدّث الـCRM` → `ابدأ من الأول` with the canonical action retained at each stage; Offers three-question recommendation rendered all three result actions through the canonical mechanism.
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

- Resume SWEED-042 from its existing plan, preserving concurrent dirty homepage/reference-service work that appeared after the verified SWEED-047 deployment.
- `/articles` remains outside HTML-level fidelity because no executable Articles HTML reference was supplied in the relevant batch.
- Push to GitHub only when explicitly requested.

## Blockers

None.

## Next Exact Action

Resume SWEED-042 from `.ai/plans/2026-08-18-final-v4-site-hardening.md`, first reconciling the current concurrent dirty files without overwriting them.
