# Tasks

Updated: 2026-08-20T02:52:00+03:00

## Active

### SWEED-050 — Align About page with SWEED brand system

Status: in progress
Priority: high
Plan: `.ai/plans/2026-08-20-about-brand-system-alignment.md`

#### Acceptance Criteria

- [ ] `/about` keeps the approved reference content, section order, layout, motion, and interactions.
- [ ] Prototype navbar/footer are removed from the About content and the shared SWEED header/footer render instead.
- [ ] About typography uses SWEED Helvetica Arabic rather than IBM Plex Sans Arabic / Cairo reference typography.
- [ ] About colors use the current SWEED `#261b3e`, `#ed2062`, and `#6d6e70` identity bridge.
- [ ] About marketing CTAs use the canonical shared SWEED action-button mechanism and geometry.
- [ ] Desktop/tablet/mobile QA has no horizontal overflow, broken images, or browser errors.
- [ ] Focused tests, typecheck/lint/design guards, and production build complete with no new regression.
- [ ] The verified change is committed and pushed to `main`, and Vercel production is verified.

### SWEED-042 — Final v4 public-site hardening

Status: in progress
Priority: critical
Plan: `.ai/plans/2026-08-18-final-v4-site-hardening.md`

#### Acceptance Criteria

- [ ] Code-resolvable SW-03 through SW-15 P0 defects are closed or safely hidden when blocked by an external decision.
- [ ] SW-01, SW-35, and SW-36 shared tokens/button/motion rules are applied without regressing existing optical centering.
- [ ] SW-16 through SW-34 shared header/footer/form/advisor requirements are reconciled with the current modular React implementation.
- [ ] Public service/package names, metadata, contact details, and canonical domain match the v4 source of truth.
- [ ] Five shallow service detail pages no longer render the repeated placeholder process copy and follow the approved compact service structure.
- [ ] Homepage/about/services/portfolio/offers/articles/FAQ/legal/404 surfaces are compressed/hardened where the current modular source permits.
- [ ] Required accessibility, mobile, reduced-motion, SEO/schema, and analytics contracts are covered by tests/QA.
- [ ] Full check/build/deploy/public QA pass and changes are committed without pushing.

## Completed

### SWEED-049 — Remove oversized Services → Why gap

Status: completed
Priority: high
Plan: `.ai/plans/2026-08-18-homepage-services-why-gap-fix.md`
Implementation commit: `512229d fix: remove oversized homepage section gap`

#### Acceptance Criteria

- [x] Removed the five-dot divider row between Services and Why.
- [x] Reduced only the touching Services bottom / Why top spacing to `--stack-xl`.
- [x] Kept the outer section paddings unchanged.
- [x] Focused regression test, full check/build, deploy, and desktop/mobile browser QA passed.
- [x] Preserved unrelated dirty reference-service and QA files; no push.

#### Evidence

- Root cause measured before fix: 96px Services bottom padding + 32px divider + 96px Why top padding.
- TDD red state observed; focused green state passed 5/5.
- Full `bun run check`: 154 passed, 0 failed, 654 expectations.
- Production build `0RZfjg9H9QsjyipAf6a3S`; service active; local/public homepage HTTP 200.
- Public 1536px and 390px: divider count 0, touching paddings 32px + 32px, CTA-to-Why-heading gap 64px, zero broken loaded images, no browser/console errors, no horizontal overflow.

#### Blockers

- None.

### SWEED-048 — Homepage proof cards and section flow polish

Status: completed
Priority: high
Implementation commit: `a3d519f fix: polish homepage proof cards and flow`

#### Acceptance Criteria

- [x] Standalone `نحدد لك الاتجاه / ونلتزم معك بالوصول / معًا ستصل` section is removed and the promise is moved into the hero subtitle.
- [x] Restaurant proof card uses the cleaner `قطاع المطاعم` title and keeps service/status context visible.
- [x] `شاهد كل الأعمال` renders below the portfolio cards rather than above them.
- [x] Selected Work cards use a clearer proof-card hierarchy with distinct category/status chips and verified/pending result treatment.
- [x] Services and `ليه تختار سويد؟` are separated by a five-dot SWEED divider.
- [x] Focused tests, full check, detector, deployment health, and public desktop/mobile QA pass.
- [x] Existing unrelated reference-service dirty work is preserved and no push is performed.

#### Evidence

- Focused homepage suite: 10 passed, 0 failed, 38 expectations; red state was observed first for hero copy and CTA ordering.
- Full `bun run check`: 153 passed, 0 failed, 651 expectations; spacing/mobile-first/package/web TypeScript and ESLint passed.
- Impeccable detector: no findings.
- Deployed build: `6-l3XQ4eL9exGMJW596dw`; service active; local/public homepage HTTP 200.
- Managed browser DOM/mobile QA: new subtitle present, `#slogan` absent, portfolio CTA follows cards, `قطاع المطاعم` present, divider has five dots, no broken loaded images, no horizontal overflow.

#### Blockers

- None.

### SWEED-047 — Homepage RTL, copy width, and carousel controls

Status: completed
Priority: high
Plan: `.ai/plans/2026-08-18-homepage-rtl-copy-carousel-polish.md`
Implementation commits: `b8e245a fix: refine homepage RTL and section flow`, `beef95f fix: preserve approved reference button hierarchy`

#### Acceptance Criteria

- [x] Header logo sits on the physical left and consultation/menu action on the physical right while Arabic navigation/menu content remains RTL.
- [x] `ليه تختار سويد؟` restores the approved six points, including `شراكة مش خدمة` and `التزام بالمواعيد`.
- [x] Selected Work heading/supporting copy use a wider desktop measure instead of a narrow stacked column.
- [x] Selected Work removes the visible autoplay pause toggle and exposes accessible previous/next arrow buttons using the installed Embla API.
- [x] Portfolio autoplay still loops; hover/focus pause remains; reduced motion disables autoplay and preserves manual access.
- [x] Offers and FAQ heading/supporting copy use the same wider desktop treatment.
- [x] `شاهد كل الأسئلة` is removed from the homepage FAQ section.
- [x] Homepage contact removes the phone and WhatsApp method rows while keeping the heading, approved supporting copy, form, and conversion context.
- [x] Contact heading/supporting copy use the wider treatment instead of a narrow stacked measure.
- [x] Focused tests, full check/build, deployment health, and agent-browser visual QA pass at desktop/tablet/mobile widths.
- [x] No push was performed; concurrent post-deploy dirty work was preserved rather than staged into SWEED-047.

#### Evidence

- Git history shows `999fd13 refactor: align shared SWEED v4 identity` removed the two approved Why points that originally shipped in `271a6a7 feat: install final SWEED homepage content`; both are restored.
- TDD red state: 7 requested contract assertions failed before implementation. Focused final homepage suite: 14 passed, 0 failed.
- Impeccable detector returned no findings; spacing and mobile-first guards passed.
- Final `bun run check`: 153 passed, 0 failed, 652 expectations, with package/web TypeScript and ESLint green.
- Production build passed and deployed as `a9A_eF4ntTSB1-SfIPxkV`; `.next` is recursively `amr:amr`; service active; local/public homepage return HTTP 200.
- Agent-browser 1440×900 confirmed RTL nav, logo physical-left, CTA physical-right, six Why entries, one-line requested desktop headings, both carousel arrows, and all requested removed controls absent.
- Agent-browser 1024×768, 390×844, and 320×568 confirmed zero document horizontal overflow, correct physical header placement, six Why entries, and natural responsive wrapping.
- Carousel QA confirmed continuous autoplay, hover/focus pause, working next-arrow movement, 48px+ navigation controls, and reduced-motion manual horizontal scrolling with arrows hidden.
- Fresh public desktop/mobile sessions had no page errors, no console errors, and no broken loaded images in the affected sections.

#### Blockers

- None.

### SWEED-046 — Canonical site-wide action buttons

Status: completed
Priority: critical
Plan: `.ai/plans/2026-08-18-canonical-sitewide-button-system.md`
Implementation commit: `2693fb0 refactor: adopt canonical action buttons site-wide`

#### Acceptance Criteria

- [x] Deep-purple primary, white secondary/light, and pink inset fill interaction are the documented canonical public CTA hierarchy.
- [x] Shared semantic tokens own the canonical button surfaces, borders, fills, focus treatment, and shadows.
- [x] Public React CTA surfaces consume `Button` / `ButtonLink` / `BrandActionButton` instead of locally repainting the same button role.
- [x] Remaining CTA-looking public links/buttons that bypassed the shared action system were migrated where their role is truly CTA.
- [x] Tabs, filters, selectors, carousel controls, icon buttons, quick prompts, and other non-CTA product controls keep their purpose-specific UI.
- [x] Reference-page and legacy product CTA bridges retain the same purple/white/pink action language without changing approved reference HTML bytes.
- [x] Arabic optical centering, focus, disabled, active, hover, and reduced-motion behavior remain intact.
- [x] Site-wide regression tests, focused tests, full check/build, deployment health, and public desktop/tablet/mobile browser QA pass.
- [x] Unrelated SWEED-042 dirty files were preserved and no push was performed.

#### Evidence

- TDD red state confirmed known CTA outliers did not carry the canonical fill mechanism before migration; focused final suite passed 25/25.
- Impeccable detector returned no findings on changed canonical UI targets.
- Clean-worktree `bun run check`: 142 passed, 0 failed plus spacing/mobile-first/TypeScript/ESLint guards.
- Production build passed; deployed build `ZgXdb-_x2rEQswS2SpRGc`; service active and representative public routes return HTTP 200.
- Browser QA verified purple primary, white secondary, full pink/purple inset fill hover, 3px pink keyboard focus, 16px radius, ~3px Arabic optical shift, and zero overflow/broken images across representative desktop/tablet/mobile checks.
- Former outliers in Services, Portfolio, Articles, Offers recommendations, CRM, AI advisor, offer funnel, and Midu now use the canonical shared action mechanism.
- CRM full guided action flow and Offers recommendation flow passed after deployment.
- No push performed.

### SWEED-044 — Homepage About, Services, and Portfolio polish

Status: completed
Priority: high
Plan: `.ai/plans/2026-08-18-homepage-about-services-portfolio-polish.md`
Implementation commits: `b3665b3 feat: polish homepage sections`, `14d6daa fix: keep homepage portfolio loop continuous`, `dfb7a45 fix: keep services headline on one desktop line`

#### Acceptance Criteria

- [x] Homepage About has no standalone `من 2011` row; the date remains naturally inside the approved company paragraph.
- [x] The slogan statement is visually centered without the circular `N` compass mark.
- [x] Services long intro is not rendered; `شوف كل الخدمات` appears after the service cards.
- [x] Services render as two columns on desktop while mobile/tablet remain readable and overflow-free.
- [x] The Services heading stays on one line at desktop widths from 1024px upward without clipping.
- [x] Selected Work runs as a continuous horizontal auto-strip with pause/resume and hover/focus pause behavior.
- [x] Reduced motion disables portfolio autoplay and leaves content manually reachable.
- [x] Focused tests, full check/build, deployment health, and public desktop/mobile browser QA pass.
- [x] Only SWEED-044 implementation files were committed; no push was performed.

#### Evidence

- TDD red state observed for four new homepage render-contract assertions before implementation; focused final homepage suite passes 6/6.
- Clean final `bun run check`: 138 tests passed, 0 failed; spacing, mobile-first, TypeScript, and ESLint guards passed.
- Production build passed and deployed as build `0kYh3GeJJhMOM1HwzXkcz`; service active; local/public homepage return HTTP 200.
- Agent-browser 1440×900: zero overflow, Services heading 1 line, cards 2 columns × 3 rows, CTA after/below grid, About standalone 2011 absent, slogan N absent.
- Agent-browser 1024×768: zero overflow, Services heading 1 line, cards remain 2 columns.
- Agent-browser 390×844 and 320×568: zero overflow, one-column Services, no tested control below 44px or clipped outside viewport.
- Portfolio autoplay continued beyond the previous loop stop boundary; hover pauses and leave resumes; explicit pause button freezes movement and changes label; reduced motion uses `transform:none` and manual horizontal scrolling.
- Final loaded-image/browser checks found no broken images and no browser errors.

#### Blockers

- None.

### SWEED-045 — Restore approved button look

Status: completed
Priority: critical
Plan: `.ai/plans/2026-08-18-restore-approved-button-look.md`
Implementation commit: `b7b94c8 fix: restore approved button hierarchy`

#### Acceptance Criteria

- [x] Canonical primary CTA is restored to deep purple with the pink fill interaction.
- [x] Canonical secondary/light CTA is restored to a white surface with the approved border/shadow treatment.
- [x] Existing hero fill animation, Arabic optical centering, focus state, disabled state, and reduced-motion behavior remain intact.
- [x] Reference-page CTA theme remains on the approved purple/white hierarchy without editing source HTML.
- [x] Product purchase CTAs that already matched the older hierarchy remain unchanged.
- [x] Focused tests, clean full check/build, deployment health, and desktop/mobile browser QA pass.
- [x] Unrelated SWEED-042/SWEED-044 implementation files were excluded from the fix commit and clean deployment build.

#### Evidence

- Git blame identified `999fd13` (2026-08-18 18:49 +03:00) as the visual regression that changed the canonical primary from purple to pink and the secondary from white to transparent.
- TDD red state: focused button/reference run failed 2 tests before the visual rollback.
- Focused green state: 15 passed, 0 failed.
- Clean worktree verification at `b7b94c8`: spacing/mobile/type/lint passed; 134 tests passed; Next production build passed.
- Deployed build ID `TZjk3K73aZ9mWKGXfKoXV`; service active; public `/`, `/services`, `/portfolio`, `/offers` returned 200.
- Agent-browser desktop/mobile QA: primary `rgb(38, 27, 62)`, secondary `rgb(255, 255, 255)`, pink fill animation completes on hover, focus ring is 3px pink, zero document horizontal overflow and zero broken images at 1440×900, 390×844, and 320×568; no browser errors.
- No push performed.

### SWEED-043 — Guided CRM demo redesign

Status: completed
Priority: high
Plan: `.ai/plans/2026-08-18-crm-guided-html-demo-redesign.md`
Implementation commit: `d6d5777 feat: redesign CRM demo as guided product story`

#### Acceptance Criteria

- [x] The demo reads as a visitor-facing product showcase rather than an internal CRM dashboard.
- [x] The opening explains the value path immediately and exposes one obvious interaction.
- [x] The core flow is social message → AI understanding/reply → CRM record/update.
- [x] Visitors can switch between Instagram, Facebook, and TikTok scenarios without dashboard complexity.
- [x] Every stage has one dominant primary action and clear current-state feedback.
- [x] Social sources remain explicit with library-provided icons only; no hand-authored SVG markup was added.
- [x] The demo remains fully frontend-only with deterministic local state.
- [x] Desktop/tablet/mobile layouts are overflow-free, keyboard-usable, and reduced-motion safe.
- [x] Focused tests, full check, production build, deployment, and public browser QA pass.
- [x] The implementation is committed and not pushed.

#### Verification

- Guided state tests: 5 passed after an observed red TDD state.
- Impeccable detector: no findings on the CRM implementation.
- Latest committed-main check: 133 passed, 0 failed plus TypeScript/lint/design guards.
- Public route: HTTP 200 locally and publicly; build ID `BhQSp-jptS6YU2eZ3xFoI`.
- Public desktop/mobile: zero horizontal overflow, no broken images, no clipped/sub-44px controls.
- Public Instagram and Facebook full flows passed; TikTok AI reply passed under reduced motion.
- No browser errors or fresh `.next` permission/cache errors.

### SWEED-041 — CRM social inbox + AI replies

Status: completed
Priority: high
Plan: `.ai/plans/2026-08-18-crm-social-inbox-agent-pass.md`
Implementation commit: `d2d03a0 feat: add social inbox AI replies to CRM demo`

#### Acceptance Criteria

- [x] No new hand-authored SVG artwork is added; social/channel visuals come from established icon libraries already available to the app.
- [x] Every demo lead has an explicit acquisition source and it is visible in pipeline and lead context.
- [x] Instagram, Facebook, TikTok, website, and referral sources are represented cleanly and consistently.
- [x] The AI Agent has a unified social conversation surface tied to the active lead.
- [x] The Agent can classify the active lead and send a deterministic simulated reply to the latest inbound message.
- [x] AI replies update local conversation/activity state only; no backend/API dependency is introduced.
- [x] Existing analyze/draft/advance/reset flows continue to work.
- [x] Desktop/mobile layouts remain overflow-free and reduced-motion remains valid.
- [x] Focused tests, clean full check, build, deployment, and public browser QA pass.
- [x] Changes are committed and not pushed.

#### Verification

- TDD: source-metadata and AI-social-reply tests failed before implementation, then the focused CRM suite passed 6/6.
- No `<svg>` or `<path>` markup exists in the CRM demo TSX files; UI icons come from Lucide and social brands from Font Awesome.
- Impeccable detector returned no findings on the changed CRM files.
- Clean-worktree `bun run check`: 127 passed, 0 failed.
- Production build passed and generated `/crm-ai-demo` as a static route.
- Desktop/mobile browser QA passed at 1440×900, 390×844, and 320×568 with zero horizontal overflow; no clipped controls at 320px.
- Reduced-motion disabled all active animation while preserving the reply action.
- Clean build `WScFr0dDGdEVVO22nNNMZ` deployed; service active; local/public `/crm-ai-demo` return HTTP 200.
- Public interaction passed: Instagram lead selection, AI reply insertion, replied-state feedback, and CRM activity insertion.
- No public page errors; brand icons load with the Font Awesome Brands font.

### SWEED-040 — CRM + AI Agent interactive demo

Status: completed
Priority: high
Plan: `.ai/plans/2026-08-18-crm-ai-agent-interactive-demo.md`
Implementation commit: `499f40d feat: add CRM AI agent interactive demo`
Skills commit: `757d12d chore: install Remotion agent skills`

#### Acceptance Criteria

- [x] Official `remotion-dev/skills` are installed and `remotion-best-practices` has been reviewed.
- [x] A standalone modular Next route presents a convincing SWEED CRM + AI Agent product demo.
- [x] The demo is completely frontend-only with deterministic local data and no backend/API dependency.
- [x] Lead selection, pipeline state, activity, AI analysis, AI action, and reset flows are interactive.
- [x] SWEED typography, `#261b3e`, `#ed2062`, control geometry, focus language, and semantic spacing are preserved.
- [x] Motion is state-driven, restrained, and has a reduced-motion fallback.
- [x] Desktop, tablet, 390px mobile, and 320px mobile layouts have no horizontal overflow.
- [x] Keyboard focus and primary controls remain usable.
- [x] Focused tests, `bun run check`, production build, service deployment, and browser QA pass.
- [x] Changes are committed in logical commits and not pushed.

#### Verification

- Focused CRM reducer tests: 4 passed, 0 failed.
- Clean-worktree `bun run check`: 121 passed, 0 failed.
- Production build passed and generated `/crm-ai-demo` as a static route.
- Browser QA passed at 1440×900, 1024×768, 390×844, and 320×568 with zero horizontal overflow and zero broken images.
- Lead selection, AI analysis, activity insertion, stage advancement, mobile Agent tab, and reset flows passed.
- Reduced-motion emulation disabled thinking-dot animation while preserving completion.
- `sweed-demo.service` active; `/crm-ai-demo` HTTP 200 locally and publicly.
- Public desktop/mobile browser QA passed with no page errors.

### SWEED-039 — Homepage visual consistency pass

Status: completed
Priority: high
Plan: `.ai/plans/2026-08-18-homepage-visual-consistency-pass.md`
Implementation commit: `fix: unify homepage control geometry`

#### Acceptance Criteria

- [x] Header primary CTA uses the shared 48px control height, `--shape-control`, shared strong weight, and SWEED focus/interaction language.
- [x] Homepage CTA-style actions no longer use unrelated full-pill or 10px radii when they represent the same Primary/Secondary action hierarchy.
- [x] Pills remain only for semantic badges/tags/statuses or intentionally compact utility controls.
- [x] Mobile Problem Selector options retain individual card shape instead of zero-radius table rows.
- [x] Existing Arabic optical-centering contract remains intact.
- [x] No Services/Portfolio/Offers reference HTML source bytes change; fidelity tests remain green.
- [x] 1440x900, 1024x768, 390x844, and 320x568 browser QA has no horizontal overflow, console/page errors, or broken interactions.
- [x] Problem Selector selection, header navigation/CTA, and homepage CTA links still work.
- [x] Reduced-motion behavior remains correct.
- [x] Focused tests, `bun run check`, `bun run build`, service readiness, and production Playwright smoke pass.
- [x] One logical implementation commit is created; no push is performed.

#### Verification

- Focused homepage/fidelity/reference suite: 18 passed, 0 failed.
- `bun run check`: 117 passed, 0 failed, plus TypeScript, ESLint, spacing, and mobile-first guards.
- Production build: 29 routes, passed.
- Browser QA passed at 1440×900, 1024×768, 390×844, and 320×568 with no horizontal overflow or page/console errors.
- Desktop CTAs compute to 48px height and the shared 16px control radius; strong actions use weight 700.
- Mobile Problem Selector cards retain 12px radius and explicit separated borders; selected state uses the SWEED pink accent and `aria-pressed=true`.
- Reduced-motion keeps all six Problem Selector choices visible and leaves reference reveal content visible.
- Reference motion lifecycle remains Services 76 / Portfolio 71 / Offers 42 ScrollTriggers across final browser checks.
- `sweed-demo.service` is active; `/`, `/services`, `/portfolio`, and `/offers` return 200 locally and publicly.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.

### SWEED-038 — Optical-center Arabic button labels

Status: completed
Priority: high
Implementation commit: `fix: optically center Arabic button labels`

#### Acceptance Criteria

- [x] Shared SWEED controls define one Arabic optical-centering contract instead of per-button nudges.
- [x] Reference CTAs, filters, tabs, quiz options, service tabs, drawers, and skip controls use the shared line-height and optical block padding.
- [x] Homepage/shared `BrandActionButton` labels use the same optical correction while icons remain independently centered.
- [x] Compact/mobile `BrandActionButton` icon geometry fits inside the 48px control instead of overflowing its grid row.
- [x] Services reference CTA visual text center is within 1px of the button center on 390px mobile.
- [x] Homepage primary CTA visual text center is within 1px of the button center on 390px mobile.
- [x] 320px and 390px browser checks show zero horizontal overflow on Homepage, Services, Portfolio, and Offers.
- [x] Reference HTML SHA-256 fidelity remains unchanged.
- [x] Focused tests, `bun run check`, production build, service restart/readiness, and production Playwright smoke pass.
- [x] Exactly one implementation commit is created and no push is performed.

#### Verification

- Focused optical/fidelity/reference suite: 14 passed, 0 failed.
- `bun run check`: 113 passed, 0 failed, plus TypeScript, ESLint, spacing, and mobile-first guards.
- Production build: 29 routes, passed.
- Impeccable detector: no findings on changed implementation/test files.
- Browser measurement: Services CTA visual offset `+0.5px`; homepage primary CTA visual offset `-0.5px` from geometric center.
- Browser computed controls: reference primary `48px`, choice controls `44px`, `line-height: 1`, optical block padding `5px 11px`.
- Homepage mobile brand action: 48px control, 28px icon fully contained, label fully contained, `translateY(-3px)` optical correction.
- Public HTTP: `/`, `/services`, `/portfolio`, `/offers` all returned 200; `sweed-demo.service` active.
- Production Playwright final rerun: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip. The immediately preceding run had three transient 404 console messages during rapid post-restart navigation; a targeted mobile 404 sweep found none and the clean rerun passed.

### SWEED-037 — Unify reference-page button system

Status: completed
Priority: high
Plan: `.ai/plans/2026-08-13-reference-button-system-unification.md`
Implementation commit: `fix: unify SWEED button system across public pages`

#### Acceptance Criteria

- [x] Reference Theme Bridge defines scoped primary CTA, secondary/ghost, and choice/filter/tab control families using the incumbent SWEED homepage button language.
- [x] Primary CTAs use purple base, white text, pink hover/focus accent, shared control radius, SWEED font, and at least 48px minimum height.
- [x] Secondary controls remain light/transparent with purple or context-safe white text and restrained border/accent states.
- [x] Choice/filter/tab controls remain compact, have at least 44px targets, clear inactive/active states, SWEED typography, and pink focus-visible treatment.
- [x] Reference source SHA-256 fidelity tests remain unchanged and pass.
- [x] Services sticky navigation and CTA links still work.
- [x] Portfolio filters, marketing tabs, film tabs, sector chips, and CTAs still work.
- [x] Offers quiz, comparison overlay, service tabs, drawers, package selection CTAs, sticky selection, and final form stepper still work.
- [x] Desktop 1440×900 and mobile 390×844 / 320×568 have no horizontal overflow, loaded broken assets, console errors, or page errors.
- [x] GSAP and ScrollTrigger remain available with animation lifecycle intact.
- [x] Focused tests, `bun run check`, `bun run build`, service restart/readiness, and production Playwright smoke pass.
- [x] Exactly one implementation commit is created and no push is performed.

#### Verification

- Focused fidelity/reference suite: 12 passed, 0 failed.
- `bun run check`: 111 passed, 0 failed, plus TypeScript, ESLint, spacing, and mobile-first guards.
- Production build: 29 routes, passed.
- Impeccable detector: no findings on the changed reference Theme Bridge files.
- Browser QA: homepage + Services + Portfolio + Offers checked at 1440×900, 390×844, and 320×568; screenshots stored in `/var/tmp/agent-browser/artifacts/sweed-buttons/`.
- Button metrics: primary CTAs 48px minimum on reference pages, choice controls 44px minimum, shared 16px control radius, SWEED font, weight 700, purple base, white text, pink focus/interaction accent.
- Services: sticky map navigated to `#branding`; CTA hrefs remained valid; ScrollTrigger count 76.
- Portfolio: filters, marketing tabs, film tabs, and sector chips changed active content correctly; ScrollTrigger count 71.
- Offers: three-step quiz reached recommendation, comparison overlay opened/closed, service tabs switched panels, drawer toggled, package selection updated sticky CTA, final form reached step 4; ScrollTrigger count 42.
- Reduced motion: no hidden `.reveal` content and button/control transitions reduced.
- Public HTTP: `/`, `/services`, `/portfolio`, `/offers` all returned 200 after service restart.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.

### SWEED-036 — Align reference pages with homepage identity

Status: completed
Priority: high
Implementation commit: `cc1b55f fix: align reference pages with SWEED identity`
Decision: `.ai/decisions/DEC-014-reference-fidelity-with-sweed-theme-bridge.md`

#### Scope

- Kept the uploaded Services, Portfolio, and Offers layout, SVG, GSAP, ScrollTrigger, and interactions unchanged.
- Added a runtime-only SWEED theme bridge over the reference presentation.
- Replaced reference Cairo/IBM Plex typography with the same `SWEED Helvetica Arabic` stack used by the homepage.
- Normalized the reference purple/pink/muted/surface palette to the homepage identity tokens: `#261b3e`, `#ed2062`, `#6d6e70`, and `#f7f8fb`/`#f8f9fa`.
- Removed reference Google Fonts requests because those fonts are no longer used.
- The uploaded source bytes and SHA-256 fingerprints remain unchanged.

#### Verification

- Focused reference tests: 11 passed, including exact source hashes and theme bridge assertions.
- `bun run check`: 110/110 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build passed with 29 routes.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.
- Browser baseline confirmed the homepage uses `SWEED Helvetica Arabic`, `#261b3e`, `#ed2062`, `#6d6e70`, and `#f7f8fb`.
- Services, Portfolio, and Offers computed the same font, purple, and pink values on desktop, 390px, and 320px.
- No Google Fonts resources loaded on the three reference pages.
- GSAP lifecycle remained Services 76, Portfolio 71, Offers 42 ScrollTriggers.
- No horizontal overflow or browser errors on tested reference routes.

### SWEED-035 — Restore uploaded HTML page fidelity

Status: completed
Priority: critical
Plan: `.ai/plans/2026-08-12-reference-html-fidelity-restoration.md`
Spec: `docs/superpowers/specs/2026-08-12-reference-html-fidelity-restoration-design.md`
Implementation commits: `577204b`, `76adbbe`, `a531ce0`, `f0f5cfd`, `cfe12da`

#### Acceptance Criteria

- [x] Decoded Services reference matches the approved uploaded SHA-256 fingerprint.
- [x] Decoded Portfolio reference matches the approved uploaded SHA-256 fingerprint.
- [x] Decoded Offers reference matches the approved uploaded SHA-256 fingerprint.
- [x] `/services`, `/portfolio`, and `/offers` render the uploaded reference page bodies instead of the SWEED-024 React reinterpretations.
- [x] Shared header, footer, and AI advisor remain, with no duplicate reference navbar, footer, or breadcrumb.
- [x] Reference SVG, CSS, GSAP, ScrollTrigger, quiz, filter, tab, drawer, and overlay behavior stays intact.
- [x] Reference styles do not change shared-shell typography or footer styling.
- [x] Check, focused tests, production build, service restart, and public HTTP verification pass.
- [x] Browser QA passes at desktop, tablet, 390px, and 320px with no overflow, broken assets, console errors, or blank reduced-motion content.
- [x] Articles is not claimed as HTML-identical until an Articles HTML reference is supplied.

#### Evidence

- Exact decoded SHA-256: Services `ee21eca6…8662`, Portfolio `bfcc2e73…a240`, Offers `6aeb87c7…bfde`.
- `bun run check`: 108/108 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build passed with 29 routes.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-checkpoint skip.
- Fresh browser sessions: Services 76 ScrollTriggers + SplitText, Portfolio 71 ScrollTriggers, Offers 42 ScrollTriggers.
- Client navigation Offers → Portfolio → Services resets to 42 → 71 → 76 triggers with no console/page errors.
- Offers quiz completed through all three steps; comparison overlay, service tabs, and package drawers worked.
- Portfolio filter, marketing tabs, film tabs, and sector panels worked.
- Services sticky map navigated and activated the Branding section correctly.
- 1024×768, 390×844, and 320×568 matrices had zero horizontal overflow on all three routes.
- Reduced motion left 0 hidden `.reveal` elements on all three routes.
- Final desktop/mobile screenshots stored under `/var/tmp/agent-browser/artifacts/sweed-reference/`.
- Public routes return HTTP 200 and `sweed-demo.service` is active.

#### Remaining Boundary

- `/articles` remains the current knowledge-center implementation because this upload batch includes an Articles DOCX but no Articles HTML reference.


### SWEED-034 — Loosen homepage internal rhythm

Status: completed
Priority: high
Implementation commits: `8ec9867 fix: loosen homepage internal rhythm`, `0ac7fc4 fix: preserve mobile internal breathing room`, `4638714 test: stabilize homepage rhythm verification`

#### Scope

- Measured live inside-section relationships with agent-browser after outer section spacing was already expanded.
- Increased the semantic header-to-primary-content gap from `clamp(32px, 5vw, 80px)` to `clamp(48px, 6vw, 96px)`.
- Expanded Services row spacing, Portfolio header-to-project spacing, Offers/Blog card spacing, Why points-to-metrics spacing, and About header-to-story spacing.
- Kept FAQ rows at a comfortable rendered height while increasing their vertical padding and stabilized the Playwright measurement against hydration timing.
- Added focused internal-rhythm regression coverage without changing public typography.

#### Evidence

- `bun run check`: 95/95 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build passed with 29 routes.
- Focused public HTTPS outer + internal rhythm Playwright: 4/4 across desktop/mobile.
- Agent-browser desktop: About/Services/Why/Portfolio/Offers/FAQ/Blog major header-to-content relationships = 86.4px; Services rows = 32px; Offers/Blog card gaps = 32px; FAQ row = 96px.
- Agent-browser mobile: major header-to-content relationships = 48px; Services rows = 24px; Offers/Blog card gaps = 32px; FAQ row = 88px.
- Full-page screenshots captured at 1440 and 390 with zero horizontal overflow.
- Typography remained `SWEED Helvetica Arabic`; no font-family/font-size/font-weight/line-height changes were introduced.
- Production readiness: 11 passed, 1 intentional mobile visual checkpoint skip.
- No Git push was performed.

### SWEED-033 — Expand public section breathing room

Status: completed
Priority: high
Implementation commit: `7c534b4 fix: give homepage sections more breathing room`

#### Scope

- Increased global compact/default/feature section edge contributions to 48/64/80px mobile, 64/80/96px tablet, and 80/96/128px desktop.
- Removed mobile-only `compact` downgrades from Problems, About, Why, and Contact so semantic section importance survives responsive layouts.
- Promoted homepage FAQ and Blog to the `default` tier while preserving Slogan as the intentional compact transition band.
- Expanded the Playwright section-rhythm contract to cover all homepage tiers and representative adjacent content gaps.
- Updated `DESIGN.md` so normal/feature sections cannot be downgraded merely because the viewport is narrow.

#### Evidence

- `bun run check`: 95/95 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build passed with 29 routes.
- Focused public HTTPS Playwright rhythm test: 2/2 desktop/mobile passed using the configured server Chrome executable.
- Agent-browser desktop gaps: Problems→About 224px, About→Slogan 176px, Slogan→Services 176px, Services→Why 192px, Why→Portfolio 224px, Portfolio→Offers 224px, Blog→Contact 224px.
- Agent-browser mobile gaps: 144px, 112px, 112px, 128px, 144px, 144px, and 144px for the same representative sequence.
- Public Services, Portfolio, Articles, and Contact had zero horizontal overflow at desktop and mobile widths.
- Typography diff guard found zero font-family/font-weight/font-size/line-height changes.
- `sweed-demo.service` is active and the public homepage returns HTTP 200.
- No Git push was performed.

### SWEED-032 — Restore pre-typography visual system

Status: completed
Priority: high
Implementation commit: `f8cf2b2 revert: restore pre-typography visual system`

#### Scope

- Reverted the public typography changes introduced by `ce407ad refactor: apply better-typography to public UI` and all later font-family/weight experiments.
- Restored `SWEED Helvetica Arabic` as the body/display family and restored the original pre-typography sizes, weights, line-heights, CTA typography, field typography, FAQ/article typography, and mobile overrides.
- Preserved later section-rhythm, slogan-layout, carousel, footer, and mobile-layout work.
- Removed the typography Playwright contract that enforced the rejected typography pass.

#### Evidence

- Ten typography-only source files match `ce407ad^` exactly after the rollback.
- `bun run check`: 95/95 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build passed with 29 routes.
- Agent-browser on public HTTPS verified H1/H2/H3 use `SWEED Helvetica Arabic` on desktop and mobile with zero horizontal overflow.
- Production readiness: 11 passed, 1 intentional mobile visual checkpoint skip.
- `sweed-demo.service` restarted on the rollback build and public homepage returns HTTP 200.
- No Git push was performed.

### SWEED-031 — Section breathing-room visual refinement

Status: completed
Priority: high
Implementation commit: `6ac5e86 fix: increase section breathing room`

#### Scope

- Used agent-browser screenshots of the deployed homepage at desktop and mobile before changing spacing.
- Verified that the corrected 112px desktop About/Slogan/Services gaps still looked too compressed for the page's large Arabic display typography.
- Increased semantic edge tiers to 40/48/64px mobile, 48/64/80px tablet, and 64/80/96px desktop using the existing Carbon spacing scale.
- Updated the design contract and Playwright rhythm assertions.
- Captured new local and public HTTPS screenshots after the change.

#### Evidence

- `bun run check`: 95/95 tests plus TypeScript, ESLint, spacing, and mobile-first guards passed.
- Production build passed with 29 routes.
- Focused better-layout + section-rhythm Playwright: 4/4 passed.
- Public HTTPS at 1440: About→Slogan = 144px and Slogan→Services = 144px.
- Public HTTPS at 390/320: About→Slogan = 80px and Slogan→Services = 88px.
- No horizontal overflow, console errors, or page errors in the final agent-browser pass.
- `sweed-demo.service` is active and public homepage returns HTTP 200.
- No Git push was performed.

### SWEED-030 — Section rhythm double-spacing correction

Status: completed
Priority: high
Plan: `docs/superpowers/plans/2026-08-09-section-rhythm-correction.md`
Implementation commit: `e7a5399 fix: prevent doubled section spacing`

#### Scope

- Corrected the previous rhythm implementation after live review showed full target gap values were applied to both top and bottom section padding.
- Kept the same content-to-content rhythm targets while halving each section edge contribution.
- Mobile section edge tiers are now 32/40/48px, tablet 40/48/64px, desktop 48/64/80px.
- Updated `DESIGN.md` to explicitly define section rhythm as target content-to-content spacing rather than duplicated per-edge padding.
- Updated Playwright coverage to assert both edge values and the actual Slogan-to-Services content gap.

#### Evidence

- Spacing guard, mobile-first guard, TypeScript, ESLint, and 95/95 unit tests passed.
- Production build passed with 29 routes.
- Focused better-layout + section-rhythm Playwright: 4/4 passed.
- Public HTTPS Slogan-to-Services gap is 112px at 1440 and 72px at 390/320.
- Public HTTPS has zero horizontal overflow at 1440, 390, and 320; browser console/page errors are empty.
- Production readiness: 11 passed, 1 intentional mobile visual checkpoint skip.
- `sweed-demo.service` is active and public homepage returns HTTP 200.
- No Git push was performed.

### SWEED-029 — Responsive section rhythm system

Status: completed
Priority: high
Plan: `docs/superpowers/plans/2026-08-09-section-rhythm-system.md`
Implementation commit: `28e9a7f refactor: expand responsive section rhythm`

#### Scope

- Researched Carbon, Atlassian, Material 3, and Polaris layout/spacing guidance from official sources.
- Replaced fluid section-spacing clamps with exact mobile-first 8px-grid semantic tiers.
- Set compact/default/feature spacing to 64/80/96px mobile, 80/96/128px tablet, and 96/128/160px desktop.
- Increased section header grouping to 24px and closely related description spacing to 16px.
- Applied the change through global semantic tokens rather than route-specific margin patches.
- Documented the rhythm contract in `DESIGN.md` and added a Playwright regression for the three section tiers.

#### Evidence

- 95/95 unit tests passed with TypeScript, ESLint, spacing guard, and mobile-first guard.
- Production build passed with 29 routes.
- Focused section-rhythm + better-layout Playwright: 4/4 desktop/mobile.
- 1440/1024/390/320 resolve to the intended section tiers with zero homepage horizontal overflow.
- `/`, `/services`, `/portfolio`, `/articles`, and `/contact` have zero horizontal overflow in desktop/mobile browser QA.
- Production readiness: 11 passed, 1 intentional mobile visual checkpoint skip.
- Public browser console and page-error logs are empty.
- `sweed-demo.service` is active; public homepage returns HTTP 200.
- No Git push was performed.

### SWEED-028 — Homepage spacing and slogan regression fix

Status: completed
Priority: high
Implementation commits: `b0ccd7e`, `f388c27`, `fad3c17`, `e6c5565`

#### Scope

- Restored the direction slogan styling that regressed during the typography pass.
- Preserved the one-line desktop/mobile slogan composition without `!important` by making the component selector outrank the global heading wrapping rule.
- Removed the homepage-only compressed spacing variables so homepage sections inherit the shared Carbon spacing tiers.
- Kept the fix local to homepage composition; no global public-page spacing tokens were changed.

#### Evidence

- `bun run check`: 95/95 tests plus TypeScript, ESLint, spacing guard, and mobile-first guard passed.
- Production build passed with 29 routes.
- Public HTTPS slogan is `nowrap` at 1440, 390, and 320 with no internal or page horizontal overflow.
- Public desktop section padding now resolves to 80px compact, 96px default, and 144px feature tiers.
- Mobile keeps the existing 48px compact, 64px default, and 80px feature progression.
- Production readiness: 11 passed, 1 intentional mobile visual checkpoint skip.
- `sweed-demo.service` is active and public homepage returns HTTP 200.
- No Git push was performed.

### SWEED-027 — Better-typography public UI pass

Status: completed
Priority: high
Plan: `docs/superpowers/plans/2026-08-09-better-typography-public-ui.md`
OpenSpec: `openspec/changes/apply-better-typography/`
Implementation commit: `ce407ad refactor: apply better-typography to public UI`

#### Scope

- Applied the installed `better-typography` skill to the SWEED public typography system and homepage.
- Consolidated readable homepage typography onto semantic display, page-title, section-title, card-title, UI-title, statement, lead, body, small, and label roles.
- Normalized title/card/body/small leading and reduced the body reading measure to 65ch.
- Removed readable one-off homepage sizes while keeping intentional icon and metric display sizes separate.
- Enforced a 14px readable mobile floor and 16px visible editable-control floor.
- Added resize-safe wrapping for CTA labels, article/offer content, and the one-line slogan.
- Corrected the static Helvetica Arabic font-face weight metadata and added root rendering/selection/underline details.
- Added a Playwright contract for semantic-size count, hierarchy, wrapping, readable floor, editable-control floor, and overflow.

#### Evidence

- Computed homepage readable sizes reduced from 15 desktop / 17 mobile variants to 7 desktop and 7-or-fewer mobile variants.
- Readable homepage text below 14px reduced from 2 elements to 0.
- H1 remains above section hierarchy: 77.76px vs max H2 64px desktop; 40px vs 34px at 390px and 320px.
- All visible homepage and Contact editable controls render at 16px on mobile.
- 320px slogan remains a single line with zero internal/page overflow.
- At 200% user text size on 390px, readable content has zero horizontal clipping and the page has zero horizontal overflow.
- `bun run check`: 95/95 tests plus TypeScript, ESLint, spacing, and mobile-first guards passed; legacy max-width count is 34/40.
- Production build passed with 29 routes.
- Better-typography + existing homepage focused Playwright: 6/6 passed desktop/mobile.
- Production readiness: 11 passed, 1 intentional mobile visual checkpoint skip.
- Public HTTPS browser console and page-error logs are empty.
- `sweed-demo.service` is active; public homepage and Contact return HTTP 200.
- No Git push was performed.

### SWEED-026 — Better-layout homepage structure pass

Status: completed
Priority: high
Plan: `docs/superpowers/plans/2026-08-09-better-layout-homepage.md`
OpenSpec: `openspec/changes/apply-better-layout-homepage/`
Implementation commit: `7ff3569 refactor: apply better-layout to homepage`

#### Scope

- Applied the official `/better-layout` principles to homepage grouping, alignment, reading order, breakpoints, RTL safety, and progressive disclosure.
- Standardized major homepage content shells around one 77.5rem alignment system while keeping narrow reading measures inside it.
- Re-centered Services, Why SWEED, Portfolio, Offers, and Articles intros on one axis.
- Removed decorative section/header separator rules where spacing already communicates grouping.
- Simplified Why SWEED point grouping from a rule-heavy grid to whitespace-led blocks.
- Made Services mobile-first: all six titles, summaries, and CTAs remain visible; repeated imagery and indices return only when the content fits.
- Made Offers and Articles horizontal snap tracks on narrow screens with a visible next-item peek; desktop restores three columns.
- Removed fixed card/summary height assumptions from Offers and Articles.

#### Evidence

- At 390px, Services height reduced from about 3333px to 2000px, Offers from about 2038px to 1018px, and Articles from about 2031px to 842px.
- Offers and Articles expose a measured ~24px next-item peek on 390px and 320px.
- All five audited section H2 centers have 0px delta from the page content center on public HTTPS.
- Mobile-first guard improved legacy max-width queries from 38 to 35.
- `bun run check`: passed with 95 unit tests, TypeScript, ESLint, spacing, and mobile-first guards.
- Production build: passed with 29 generated routes.
- Focused changed-surface Playwright: 4/4 passed across desktop and mobile.
- 1440, 1024, 390, and 320 public checks: zero horizontal overflow, broken images, console errors, or page errors.
- Effective 200% zoom-width stress: no overflow and DOM reading order preserved.
- Reduced motion: all reveal content visible and scrollers fall back to automatic behavior.
- Production readiness: 11 passed, 1 intentional mobile visual checkpoint skip.
- `sweed-demo.service` is active and public homepage returns HTTP 200.
- Known test debt: the broad legacy homepage Playwright subset still contains stale copy/selectors from pre-rebuild versions; the focused current-layout contracts pass.
- No Git push was performed.

### SWEED-025 — Homepage rhythm, work carousel, slogan band, and footer polish

Status: completed
Priority: high
Plan: `docs/superpowers/plans/2026-08-09-homepage-rhythm-carousel-footer.md`
OpenSpec: `openspec/changes/polish-homepage-rhythm-carousel-footer/`
Final implementation commit: `be91ab1 feat: add oversized SWEED footer wordmark`

#### Scope

- Removed the stray diagonal hero beam over the building artwork.
- Tightened homepage-only macro spacing without changing global design tokens.
- Converted the homepage selected-work grid into a manual horizontal scroll-snap carousel with accessible previous/next controls and no autoplay.
- Rebuilt the SWEED slogan into one horizontal band from 320px upward.
- Tightened the homepage article-header composition.
- Rebuilt the shared public footer as a CSS Module and added an oversized English SWEED wordmark at the visual end.

#### Acceptance Criteria

- [x] Hero artwork has no crossing decorative beam.
- [x] Homepage section rhythm uses the existing Carbon scale with smaller macro jumps.
- [x] Selected work is one horizontal manual carousel with keyboard-accessible controls and reduced-motion fallback.
- [x] Slogan remains one horizontal line at 320px without page overflow.
- [x] Footer remains shared, functional, modular, and ends with the oversized SWEED wordmark.
- [x] Full code, browser, production, and deployment gates pass.

#### Evidence

- Homepage portfolio desktop height reduced from 1948px to 965px.
- Slogan desktop height reduced from 534px to 279px and stays one line at 320px.
- Homepage blog section reduced from 1006px to 918px on desktop; header composition is 192px high.
- `bun run check`: passed with 95 tests, TypeScript, ESLint, Carbon spacing, and mobile-first guards.
- Production build: passed with 29 generated routes.
- Focused Playwright visual-contract test: 2/2 passed on desktop and mobile.
- Production readiness: 11 passed, 1 intentional mobile visual checkpoint skip.
- Public 1440px and 320px checks: zero page overflow, broken images, hero beams, undersized footer links, console errors, or page errors.
- `sweed-demo.service` is active; public homepage, About, and Services return HTTP 200.
- No Git push was performed.

### SWEED-024 — Rebuild public pages from executive briefs

Status: completed
Priority: critical
Design: `docs/superpowers/specs/2026-08-04-public-page-executive-rebuild-design.md`
OpenSpec: `openspec/changes/rebuild-public-pages-from-executive-briefs/`
Implementation plan: `docs/superpowers/plans/2026-08-08-public-page-executive-rebuild.md`
Final commit: `c77bcf1 chore: finalize public page release gate`

#### Scope

- Rebuilt Services, Software Development, Portfolio, Offers, Articles, Article Detail, and Contact.
- Translated approved briefs into modular React and typed content without copying standalone HTML into runtime.
- Preserved the SWEED visual system, Carbon spacing, mobile-first rules, accessibility, and current backend behavior.
- Implemented and committed each route phase independently.

#### Acceptance Criteria

- [x] Source precedence and route ownership are explicit.
- [x] Architecture, mobile-first rules, state handling, SEO, and verification gates are documented.
- [x] Stakeholder approves the written design specification.
- [x] A detailed implementation plan is written and linked.
- [x] Each route phase passes focused code and browser verification.
- [x] The final public-site matrix passes and the demo is deployed.

#### Evidence

- `bun run check`: passed with 91 unit tests plus TypeScript, ESLint, spacing, and mobile-first guards.
- `bun run build`: passed with 29 generated routes.
- Rebuilt-route Playwright regression: 20/20 passed on desktop and mobile.
- Production readiness: 11 passed with 1 intentional mobile visual skip.
- Public visual matrix at 1440x900 and 320x568: zero overflow, broken images, small controls, small text, console errors, or page errors on seven rebuilt routes.
- `/services/development` returns HTTP 308 to `/services/software-development`.
- Demo service is active and every rebuilt public route returns HTTP 200.
- No Git push was performed.


### SWEED-023 — Impeccable public-site polish

Status: completed
Priority: high
Critique: `.impeccable/critique/2026-08-03T15-35-00Z__sweed-demo-coderaai-com.md`

#### Acceptance Criteria

- [x] Homepage section-title hierarchy uses one semantic scale.
- [x] Repeated pill-style section labels are reduced where they created generic scaffolding.
- [x] Homepage typography uses only approved weights.
- [x] Public readable text is at least 14px on mobile.
- [x] Public interactive controls are at least 44px on mobile.
- [x] Legacy Portfolio, Articles, Offers, breadcrumbs, service detail, and About metadata inherit the readability baseline.
- [x] Check, build, deployment, console, and responsive QA pass.

#### Evidence

- Homepage computed weights reduced from 14 variants to `400 / 500 / 600 / 700 / 800`.
- Homepage section H2 values are consistently 48.96px/800 on desktop and 34px/800 on mobile.
- Twelve public routes passed at 1440×900, 390×844, and 320×568.
- At 390px and 320px: zero horizontal overflow, zero visible readable text below 14px, zero visible controls below 44px, one H1, and one main landmark per tested route.
- `bun run check`: passed; 6 unit tests passed.
- `bun run build`: passed; 29 routes generated.
- Demo service is active and public homepage returns HTTP 200.
- Browser console and page errors are empty.

### SWEED-022 — Carbon spacing system consolidation

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-30-carbon-spacing-system.md`
OpenSpec: `openspec/changes/adopt-carbon-spacing-system/`

#### Acceptance Criteria

- [x] Public spacing uses IBM Carbon's 2x Grid as the raw scale.
- [x] Semantic stack, inline, section, card, panel, control, and tooltip roles exist.
- [x] Shared UI, homepage, About, public pages, AI advisor, navigation, and offer popup consume the system.
- [x] Unused homepage CSS and conflicting legacy media rules are removed.
- [x] Parent layouts own gaps and components own internal padding.
- [x] Automated spacing enforcement is part of `bun run check`.
- [x] Responsive, reduced-motion, overflow, target-size, build, and browser checks pass.

#### Evidence

- `bun run design:spacing`: passed across 56 public CSS files.
- Arbitrary public margin/padding/gap violations reduced from 291 to 0.
- Homepage CSS reduced from roughly 2,800 lines/125 declared classes to roughly 480 lines covering the 29 classes actually used.
- `bun run check`: passed; 6 unit tests passed.
- `bun run build`: passed; 29 routes generated.
- Twelve representative routes passed at 1024×768, 390×844, and 320×568 with no horizontal overflow, unnamed visible controls, or structural heading/landmark failures.
- Final 320px checks: zero visible interaction targets below 44px.
- Reduced-motion About page exposes all five methodology steps.
- Demo service is active and public homepage returns HTTP 200.
- Browser console and page errors are empty.

#### Boundaries

- SWEED keeps its own identity and components; Carbon runtime components/themes were not installed.
- The isolated `midu-clone` experiment and private offer-funnel admin settings are intentionally outside public enforcement.

### SWEED-021 — SWEED Visual System v2

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-26-sweed-visual-system-v2.md`

#### Acceptance Criteria

- [x] Semantic typography roles exist for display, page title, section title, card title, lead, body, small text, and labels.
- [x] Semantic spacing roles exist for compact/default/feature sections and content grouping.
- [x] Shared control heights, page gutters, content measures, and shape roles exist.
- [x] Shared Section and Button primitives consume the system.
- [x] Homepage hero, problems, services, why, portfolio, offers, FAQ/blog, and contact consume the system.
- [x] `DESIGN.md` documents enforcement rules and responsive behavior.
- [x] Check, build, deployment, HTTP, console, and four-viewport QA pass.

#### Evidence

- `bun run check`: passed.
- `bun run build`: passed; 29 routes generated.
- `sweed-demo.service`: active; public homepage returns HTTP 200.
- No document-level horizontal overflow at 1440×900, 1024×768, 390×844, or 320×568.
- Homepage exposes exactly one visible H1.
- Browser console and page errors are empty.
- Major public headings now use shared semantic roles; desktop computed font-size variants reduced from 29 to 27 without blind global replacement.

#### Remaining Debt

- Small legacy/detail typography values remain in specialized UI and should be migrated when those components are next touched.

#### Next Action

Keep all new public UI inside the semantic visual roles and reject new arbitrary heading, section-spacing, card-radius, or control-size values.


### SWEED-020 — Full-site senior audit and hardening

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-26-full-site-senior-audit.md`
Decision: `.ai/decisions/DEC-012-shared-public-hardening-boundaries.md`
Report: `.ai/discoveries/2026-07-26-full-site-hardening-audit.md`
Commit: `b2cdb07 fix: harden public site for production`

#### Acceptance Criteria

- [x] All public routes and internal links/hashes pass.
- [x] TypeScript, lint, unit tests, production build, and production smoke pass.
- [x] No P0 issue remains.
- [x] No confirmed P1 issue remains without a documented blocker.
- [x] Core Web Vitals, network, asset, cache, accessibility, and security posture are measured.
- [x] Responsive matrix passes without overflow, clipping, broken images, or blank motion states.
- [x] Keyboard, focus, dialogs, forms, mobile navigation, sliders, and pinned methodology interactions pass.
- [x] Reduced motion exposes complete content without non-essential motion.
- [x] Confirmed release risks are fixed and re-verified.
- [x] Final evidence records fixed items, remaining debt, and reviewer talking points.

#### Evidence

- `bun run check`: 0 TypeScript errors, 0 ESLint warnings, configured unit tests passed.
- Focused accessibility/navigation/content tests: 12 passed, 0 failed.
- Production build completed with zero framework warnings.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual-test skip.
- Tested public routes have one main landmark and one H1, with no heading jumps, duplicate IDs, unlabeled visible controls, horizontal overflow, or visible controls below 44px.
- White-on-action contrast measured 4.65:1 for representative CTAs and badges.
- Homepage final synthetic metrics: TTFB 8.4ms, FCP/LCP 524ms, CLS 0.
- The stakeholder-approved `SWEED Helvetica Arabic` font is restored as the computed primary font on desktop and mobile; Cairo and SF Arabic remain fallbacks.
- Admin/debug pages return 404 while credentials are absent; the private compatibility proxy returns 404 without its server token.
- CSP, HSTS, frame denial, nosniff, and strict-origin referrer headers verified on production.
- Service is active and public routes return 200.

#### Remaining Debt

- Installed Next.js is locked to 16.2.4 and the dependency audit still reports advisories. Upgrade the lockfile/runtime to the latest compatible patch in a controlled dependency batch, then rerun the complete verification matrix.
- Broader Mastra/transitive advisories remain outside this non-AI public-site hardening pass.

#### Next Action

Schedule the controlled dependency-upgrade batch; public-site hardening is complete.

### SWEED-019 — Animate About methodology as a scroll story

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-25-about-methodology-scroll-story.md`
Decision: `.ai/decisions/DEC-011-responsive-methodology-scroll-story.md`
OpenSpec: `openspec/changes/animate-about-methodology-scroll-story/`
Commit: `091ecd9 feat: add methodology scroll story`

#### Acceptance Criteria

- [x] Desktop pins the methodology stage beneath the fixed header until stage five completes.
- [x] Path, current stage, completed stages, and progress copy remain synchronized forward and backward.
- [x] Phone and short-height layouts use natural-flow scroll-linked activation without scroll trapping.
- [x] Reduced motion exposes all five stages immediately with no pin.
- [x] Resize and route cleanup leave no duplicate triggers or pin spacers.
- [x] The `#numbers` section follows naturally after pin release.
- [x] No overflow, clipped Arabic, broken images, browser errors, or console errors.
- [x] Check, tests, build, deployment, HTTP, and responsive browser QA pass.

#### Dependencies

- Reused existing GSAP, ScrollTrigger, and global Lenis synchronization.
- Preserved the semantic ordered list and responsive horizontal/vertical paths.

#### Evidence

- Desktop `1440×900`: pin distance `3780px`; pin stayed at `top: 77px` while active.
- Stage samples progressed 01 at 12%, 02 at 24%, 03 at 42%, 04 at 62%, and 05 from 78% through pin release.
- Reverse scrolling returned stage state from 05 through 03, 02, and 01 correctly.
- Stage five remained active with path progress complete before the pin released into `#numbers`.
- Tablet `1024×768`: all five cards and CTA remained inside the pinned viewport.
- Phone `390×844`: no pin spacer; steps activated individually in natural vertical flow from 01→05.
- Short landscape `844×390`: static compact fallback, no pin, full path, no hidden steps.
- Reduced motion: no pin, full paths, all nodes visible with no transforms.
- Responsive resize desktop→mobile→desktop produced methodology pin-spacer counts `1→0→1` with no duplication.
- Check passed with 0 errors, focused tests passed, production build passed, service active, and public `/about` returned 200.
- Browser console/errors were empty, horizontal overflow was false, and CLS measured `0`.

#### Blockers

- None.

#### Next Action

Collect stakeholder feel/pace feedback from a real mouse wheel and phone; implementation work is complete.

### SWEED-018 — Audit and repair public-site links

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-24-site-link-audit.md`
Commit: `2efb74a fix: route public navigation to live pages`

#### Acceptance Criteria

- [x] Homepage and footer “من نحن” links open `/about`.
- [x] All rendered internal route links return HTTP 200.
- [x] Every rendered internal hash points to an existing destination element.
- [x] Desktop and mobile navigation interactions remain correct.
- [x] Dynamic service/article slug links resolve correctly.
- [x] External contact links remain structurally valid.
- [x] Check, tests, build, deployment, HTTP, console, and browser QA pass.

#### Evidence

- Homepage Navbar “من نحن” now uses `/about`; intentional homepage section links remain unchanged.
- Shared footer quick links now use `/`, `/about`, `/services`, `/portfolio`, `/offers`, and `/articles`.
- Focused route-policy tests passed 4/4 and reject `/#about`.
- Browser crawl covered 23 public pages, including all service and article detail slugs; failed pages: 0.
- Every rendered internal route returned 200 and every rendered hash target existed.
- Desktop and mobile clicks opened `/about`; the mobile top sheet closed and the About route became active.
- WhatsApp, telephone, and email links are structurally valid; no `.example` href is rendered.
- TypeScript, lint with 0 errors, unit tests, build, service readiness, public HTTP, console, and browser-error checks passed.

#### Blockers

- None.

#### Next Action

Collect stakeholder review; future standalone pages should be added through the shared route configuration rather than duplicated anchor lists.

### SWEED-017 — Build complete About page

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-23-full-about-page.md`
Source: `3- ملف بيانات وتصميم من نحن.docx`
Commit: `50207ff feat: build complete SWEED about page`

#### Acceptance Criteria

- [x] `/about` renders all approved sections in order with approved copy.
- [x] Hero, story/video, founder, promise, values, methodology, numbers, team, alliances, partners, testimonials, and CTA are complete.
- [x] Homepage and About numbers remain synchronized.
- [x] Placeholder people, logos, alliances, and testimonials are visibly non-verified.
- [x] Team/testimonial sliders and methodology path work on desktop and mobile.
- [x] Footer, AI widget, navigation, reduced motion, and accessibility remain intact.
- [x] Check, focused tests, build, service, HTTP, console, errors, and responsive browser QA pass.

#### Dependencies

- Existing GSAP, Embla, shared video dialog, animated counter, public shell, header, footer, and AI advisor were reused.
- Official founder/team portraits, partner/alliance logos, and approved testimonials are still external pre-launch inputs.

#### Relevant Files

- `apps/web/src/content/about-page.ts`
- `apps/web/src/features/public-site/pages/about-public-page.tsx`
- `apps/web/src/features/public-site/pages/about-public-page.module.css`
- `apps/web/src/features/public-site/pages/about-page-motion.tsx`
- `apps/web/src/features/public-site/pages/about-page-carousel.tsx`
- `apps/web/src/features/public-site/pages/about-page-content.test.ts`
- `apps/web/src/features/public-site/pages/public-page-shell.tsx`
- `apps/web/src/app/(marketing)/about/page.tsx`
- `apps/web/src/content/homepage.ts`

#### Evidence

- DOM order verified across all 12 page sections; the generic legacy About composition is no longer rendered.
- Hero owns one breadcrumb and uses line-level Arabic-safe GSAP motion without character splitting.
- Shared story video opens the approved MP4 in the native dialog.
- Values render `3×2` desktop and `2×3` mobile; numbers render four desktop and `2×2` mobile.
- Five-stage methodology draws horizontally on desktop and vertically on mobile.
- Team carousel shows four desktop and card-and-partial phone; testimonials show two desktop and one phone with paused autoplay.
- Placeholder verification labels appear on four team slots, four alliances, all partner-logo slots, and all testimonial models.
- Focused content guard tests pass 4/4; check/build/deploy and representative routes pass.
- 1440, 1024, 390, and 320 checks show no horizontal overflow or broken images.
- Reduced motion keeps all content visible and disables marquee motion.
- Console and browser errors are empty; Web Vitals smoke measured CLS `0`.

#### Blockers

- No engineering blocker. Official media and approved proof remain required before final production launch.

#### Next Action

Collect official portraits, logos, alliance names, and written testimonial approvals, then replace only the visibly marked placeholder records.


### SWEED-016 — Make homepage breathing gaps white

Status: completed
Priority: high
Commit: `167fb93 fix: make homepage section gaps white`

#### Acceptance Criteria

- [x] Inter-section breathing gaps use pure white.
- [x] Existing gap sizes remain unchanged.
- [x] Desktop and mobile retain no horizontal overflow.
- [x] Check, build, deployment, HTTP, console, and browser QA pass.

#### Evidence

- Homepage root background changed from `#f3f4f7` to `#ffffff`.
- Gap background measured as `rgb(255, 255, 255)` across all direct homepage section boundaries.
- Desktop retained 72px gaps at 1440px; mobile retained 28px gaps at 390px.
- No browser errors, console errors, or horizontal overflow were found.

#### Blockers

- None.

#### Next Action

Collect stakeholder visual review; no implementation work remains in SWEED-016.

### SWEED-015 — Clean desktop navbar

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-23-desktop-navbar-cleanup.md`
Commit: `23119c8 fix: clean desktop navigation arrows`

#### Acceptance Criteria

- [x] Desktop route links show no arrows.
- [x] Mobile top-sheet links retain one directional arrow.
- [x] Logo, route list, and CTA align and fit from 1280px through 1700px.
- [x] Active route remains visually clear.
- [x] Mobile top sheet behavior and layout remain intact.
- [x] Check, build, deployment, HTTP, console, errors, and responsive QA pass.

#### Evidence

- Replaced the Font Awesome route-arrow element with a CSS-controlled text glyph.
- Visible desktop arrow count is zero at 1081, 1280, 1440, 1590, and 1700px.
- No desktop link overlap or horizontal overflow was found.
- Mobile 390px top sheet retains seven visible arrows and requires no internal scroll.
- Escape focus restoration, reduced motion, and same-page `#services` navigation remain correct.
- Check/build, service readiness, public HTTP, console, and browser error checks passed.

#### Blockers

- None.

#### Next Action

Collect stakeholder review; no implementation work remains in SWEED-015.

### SWEED-014 — Clean hero video and homepage rhythm

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-23-homepage-rhythm-and-video-cleanup.md`
Commit: `8e5122d fix: clean homepage video and section rhythm`

#### Acceptance Criteria

- [x] Hero contains no video trigger or play control.
- [x] Hero building artwork and decorative scroll motion remain visible.
- [x] About media exposes exactly one play affordance.
- [x] “مين سويد؟” title scale is balanced across desktop and mobile.
- [x] Homepage sections have a consistent fluid breathing gap.
- [x] Desktop/mobile have no overflow, clipping, broken images, or browser errors.
- [x] Reduced motion, check, build, service, public HTTP, and primary video QA pass.

#### Evidence

- Hero video trigger and play-icon counts are both zero; building artwork remains loaded.
- Hero GSAP motion still changes the building from scale `1` to `1.028` and moves it upward during scroll.
- About section has exactly one video trigger and one visible play icon; dialog opens the approved MP4.
- About title renders without Arabic letter squeezing or overflow from 1700px through 320px.
- Direct section gaps measure `85px` at 1700px, `51px` at 1024px, and `28px` on phone widths.
- About play affordance does not overlap media copy at 390px.
- Full lazy-image checks at 1024px and 320px found no broken images.
- Reduced motion, check, build, local readiness, public HTTP, console, and browser error checks passed.

#### Blockers

- None.

#### Next Action

Collect stakeholder feedback from the live spacing rhythm; no implementation work remains in SWEED-014.

### SWEED-013 — Redesign homepage about section

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-23-about-section-redesign.md`
Commit: `2016dce refactor: rebuild homepage about section`

#### Acceptance Criteria

- [x] Desktop uses the full 1320px composition without a narrow central text block.
- [x] Video remains visible and interactive without reveal-state dependency.
- [x] Approved story, principles, vision, mission, and CTA remain complete.
- [x] Identity, story, proof, and direction have clear visual hierarchy.
- [x] 1440, 1024, 768, 390, and 320 widths have no clipping or overflow.
- [x] Reduced motion, check, build, service, public HTTP, console, and browser QA pass.
- [x] All local commits are pushed normally and local/remote divergence is 0/0.

#### Evidence

- Desktop content uses the full 1320px container with a 666px media column and 567px copy column at 1440px.
- Video image loads and the native `تعرف على SWEED` dialog opens with the correct MP4 source.
- All four story paragraphs, four principles, vision, mission, and CTA remain rendered.
- 1024px retains two columns; 768px and below stack intentionally.
- 390px and 320px show no clipping or horizontal overflow.
- Reduced motion keeps all content visible.
- Check/build/service/public HTTP and browser console/error checks passed.
- Normal push advanced `origin/main` from `409c591` to `0f17c31`; local and remote matched with divergence `0/0`.

#### Blockers

- None.

#### Next Action

Collect stakeholder review from the deployed demo; no implementation work remains in SWEED-013.

### SWEED-012 — Build iOS-style top-sheet navigation

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-23-ios-top-sheet-navigation.md`
Decision: `.ai/decisions/DEC-009-bounded-top-sheet-and-verified-social-links.md`
Commit: `091685e feat: add iOS-style mobile top sheet`

#### Acceptance Criteria

- [x] Trigger uses a centered professional bars icon and centered X icon.
- [x] Mobile menu opens as a bounded top sheet with backdrop and grab handle.
- [x] Seven routes, active state, CTA, Escape/focus, outside close, and anchor offset remain correct.
- [x] Verified WhatsApp, phone, and email actions appear; no fake social URL is added.
- [x] 320, 390, landscape, tablet, and desktop show no overflow or clipping.
- [x] Reduced motion, check, build, deployment, public HTTP, console, and browser checks pass.

#### Evidence

- Font Awesome Free `fa-bars` and `fa-xmark` are centered inside the 44px trigger.
- 390×844 sheet is about `359×600px`; 320×700 sheet is about `294×576px` and needs no internal scrolling.
- 844×390 uses internal sheet scrolling and a two-column navigation layout without horizontal overflow.
- Backdrop covers the full area below the 65px header and closes the menu when tapped.
- Escape closes and restores focus; Tab and Shift+Tab stay within the trigger/sheet interaction loop.
- `#services` navigation closes the sheet and positions the target about `68px` below the viewport top.
- `السوشيال والتواصل` exposes verified WhatsApp, phone, and email actions.
- Desktop inline navigation is unchanged; reduced motion, console, browser errors, check, build, service, and public HTTP passed.

#### Blockers

- Official Instagram/Facebook/TikTok profile URLs are still external inputs and were not guessed.

#### Next Action

Collect real-device feedback and add official social profiles through `siteSettings.socialLinks` when supplied.

### SWEED-011 — Adapt problems and navigation for mobile

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-23-mobile-problems-and-navigation.md`
Decision: `.ai/decisions/DEC-008-mobile-result-first-diagnostic-and-full-sheet-navigation.md`
Commit: `77692c6 fix: adapt navigation and problems for mobile`

#### Acceptance Criteria

- [x] Compact direction/result module appears before problem choices on phones.
- [x] Six problem choices form one coherent touch list with complete approved copy.
- [x] Selection preserves dial, service, solution, CTA, and contact mappings.
- [x] Mobile problems section is materially shorter than the 1287px baseline.
- [x] Mobile header and full-height menu sheet are visually coherent and touch-friendly.
- [x] Menu preserves seven routes, active state, CTA, Escape/focus behavior, and contained scrolling.
- [x] 320, 360, 390, landscape, tablet, and desktop checks show no clipping or overflow.
- [x] Reduced motion, check, build, deployment, HTTP, console, and interaction QA pass.

#### Evidence

- 390px problems section reduced from about `1287px` to about `910px`.
- Mobile dial/result reduced from about `416px` to about `146px` and now precedes the choices.
- Six complete problem statements render as 70px touch rows inside one 422px diagnostic surface.
- 844x390 landscape uses a two-column choice list and reduced the section to about `716px`.
- 320x700 and 844x390 menus show all routes and the primary CTA without menu overflow.
- Same-page navigation closes the sheet and positions `#services` at approximately `65px` below the viewport top.
- Escape restores focus to the menu trigger.
- Problem 01 and 06 retained their exact dial angles, service mappings, and conversion context.
- Reduced motion, desktop regression, lazy images, browser console/errors, check, build, service, and public HTTP checks passed.

#### Blockers

- None.

#### Next Action

Collect stakeholder feedback from real iOS and Android devices; make only platform-specific refinements if evidence requires them.

### SWEED-010 — Replace compass with interactive direction dial

Status: completed
Priority: high
Plan: `.ai/plans/2026-07-23-problems-direction-dial.md`
Decision: `.ai/decisions/DEC-007-direction-dial-as-diagnostic-ui.md`
Commit: `0fcd911 feat: add interactive SWEED direction dial`

#### Acceptance Criteria

- [x] Traditional compass image is replaced by a custom SWEED direction dial.
- [x] Six problem choices map to six visible needle directions.
- [x] Selected service and solution update visibly and via `aria-live`.
- [x] Existing problem-to-service contact mappings remain correct.
- [x] CTA is unavailable before selection and preserves the selected conversion context afterward.
- [x] Redundant radio/check affordances are removed from problem cards.
- [x] Desktop/tablet/mobile and reduced-motion states have no overlap, clipping, or overflow.
- [x] Check, build, service, public route, and browser QA pass.

#### Evidence

- Old compass image count inside the problems section is zero.
- Six branded SVG nodes and a central `S` mark render without external artwork.
- Problem 01 rotated to `54deg`; problem 06 rotated to `-126deg`.
- Result panel updated to `الاستشارات الإدارية`, `التسويق الرقمي`, `البرمجة والتطوير`, and the matching approved solution copy.
- CTA stayed disabled before selection, then focused contact with the exact problem/service/source mapping.
- Desktop, 1024px tablet, and 390px mobile checks showed no overflow or clipped cards.
- Keyboard focus outline is visible; reduced motion keeps the final selected state with effectively zero transition duration.
- Check/build/service/public URL and browser console/error checks passed.

#### Blockers

- None.

#### Next Action

Collect stakeholder feedback on the live direction-dial treatment before extending the motif to other sections.

### SWEED-009 — Install final homepage content

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-23-homepage-final-content.md`
Decision: `.ai/decisions/DEC-006-publish-only-verified-case-study-results.md`
Commit: `271a6a7 feat: install final SWEED homepage content`

#### Acceptance Criteria

- [x] Homepage sections render in the approved final order.
- [x] Approved copy is present across hero, problems, about, slogan, services, why, portfolio, offers, FAQ, articles, contact, footer, and AI support.
- [x] Problem cards preserve the approved hidden service mappings and prefill contact context.
- [x] No unverified portfolio metric is presented as fact.
- [x] Expanded contact fields and approved success copy work.
- [x] Motion uses the approved four-family budget and reduced-motion remains complete.
- [x] Desktop/tablet/mobile show no overflow, clipped Arabic text, broken images, or browser errors.
- [x] `bun run check`, `bun run build`, service health, and public HTTP verification pass.

#### Evidence

- Approved final order renders from hero through footer; standalone Process section is absent.
- Counts verified: 6 problems, 6 services, 4 metrics, 3 portfolio cards, 3 offers, 8 FAQs, and 3 latest articles.
- Problem and offer selections populate the conversion state and hidden contact fields, then focus the contact section.
- Contact form exposes the six approved required fields and rejects empty submission without a network request.
- One verified portfolio result is published; two additional cards are explicitly marked `قيد التوثيق` with no numerical claim.
- AI quick prompts return approved deterministic answers without API loading.
- Dynamic service/article pages resolve matching slugs and are statically generated.
- Navigation uses the approved seven-item order; mobile dropdown fits without overflow.
- 1440, 1024, 768, and 390 browser checks passed with zero console/browser errors and no horizontal overflow.
- Reduced-motion mode keeps all content visible and disables Lenis/route motion.
- Browser smoke measured CLS `0` and FCP/LCP about `984ms`.

#### Blockers

- Official replacement contact/social details, final compass artwork, and additional verified case studies are still external content inputs.

#### Next Action

Replace the current contact placeholders and pending portfolio cards only when verified official inputs are delivered.

### SWEED-008 — Build controlled cinematic motion system

Status: completed
Priority: high
Plan: `.ai/plans/2026-07-22-controlled-cinematic-motion.md`
Decision: `.ai/decisions/DEC-005-controlled-cinematic-motion-system.md`
Commit: `4fcec53 feat: add controlled cinematic motion system`

#### Acceptance Criteria

- [x] Shared motion tokens control page, scroll, and interaction timing.
- [x] Public route navigation has a short non-blocking entrance.
- [x] Desktop exposes scroll progress, velocity, and direction signals.
- [x] Hero scroll choreography uses ScrollTrigger instead of a raw scroll listener.
- [x] Mobile keeps native scrolling and has no overflow.
- [x] Reduced-motion mode disables parallax/page entrance and keeps content visible.
- [x] No touched motion uses bounce or elastic easing.
- [x] `bun run check` and `bun run build` pass.
- [x] Demo service/public URL and desktop/mobile browser QA pass.

#### Evidence

- Shared quart/quint/expo motion tokens are available globally.
- Public routes remount inside a 320–420ms route entrance; completed veil becomes hidden.
- Desktop Lenis remains active and rAF-throttled scroll progress/velocity/direction signals update.
- Mobile and reduced-motion environments use native scrolling.
- Hero media, matrices, grid lines, and pyramid mask use one ScrollTrigger scrub timeline.
- Services use CSS View Timelines with a visible fallback.
- CTA fill uses clip-path instead of animated width/height.
- 1440px, 1024px, and 390px checks show no overflow, broken images, console errors, or browser errors.
- Reduced-motion mode reports zero route animations and fully visible content.
- Browser sample: CLS `0`, LCP/FCP about `1.16s`, TTFB about `39ms`.
- Check/build/service/public route verification passed.

#### Blockers

- None.

#### Next Action

Select the next product or content task.

### SWEED-007 — Tighten problems-section CTA spacing

Status: completed
Priority: high
Plan: `.ai/plans/2026-07-22-problems-cta-spacing.md`
Commit: `539cf22 fix: tighten problems CTA spacing`

#### Acceptance Criteria

- [x] Desktop last-card-to-CTA gap is reduced from about 100px to 30–50px.
- [x] Desktop CTA-to-section-bottom gap is reduced from 112px to roughly 48–72px.
- [x] CTA does not overlap the lowest problem card.
- [x] Tablet/mobile CTA remains in natural document flow.
- [x] No horizontal overflow, broken images, or browser errors.
- [x] `bun run check` and `bun run build` pass.
- [x] Demo service and public URL return HTTP 200.

#### Evidence

- 1400px: card-to-CTA gap `41.2px`; bottom gap `56px`.
- 1181px: card-to-CTA gap `33.7px`; no breakpoint overlap.
- 390px: natural grid flow, no overlap or overflow.
- Broken images: 0; browser errors/console: none.
- Check/build/service/public route verification passed.

#### Blockers

- None.

#### Next Action

Select the next product task.

### SWEED-006 — Rebuild header, progress, and replayable scroll motion

Status: completed
Priority: critical
Plan: `.ai/plans/2026-07-22-scroll-system-overhaul.md`
Commit: `685660d fix: rebuild scroll interaction system`

#### Acceptance Criteria

- [x] Fixed header hides on downward scrolling and returns on upward scrolling.
- [x] Header remains visible while navigation is open or focused.
- [x] Progress indicator is visible above the header and tracks the full document.
- [x] No fixed blur overlay remains at the top of the website.
- [x] Viewport-triggered animations replay after exit and re-entry.
- [x] Reduced-motion mode keeps content visible without animation.
- [x] Desktop/mobile browser checks show no overflow or console errors.
- [x] `bun run check` and `bun run build` pass.
- [x] Demo service and public URL return HTTP 200.

#### Evidence

- Header is fixed at z-index 1100 and reserves responsive layout space.
- Downward scroll hid the desktop header to `top=-81`; upward scroll restored `top=0`.
- Mobile reproduced the same behavior and kept the header visible while its menu was open.
- Progress sits at z-index 1201, reached intermediate values, and reached `100%` at document end.
- Global GradualBlur overlay count is zero.
- Reveal, process, text, and metric animations reset/replay on viewport re-entry.
- Reduced-motion mode displays all content and final metric values.
- Check/build/service/public/browser verification passed.

#### Blockers

- None.

#### Next Action

Select the next product or content task.

### SWEED-005 — Restore navbar and rebuild homepage services

Status: completed
Commits: `3402671`, `022c87d`, `e32d576`, `80f4a75`

### SWEED-002 — Rebuild and integrate homepage process section

Status: completed
Commit: `885103f`

### SWEED-001 — Restore browser brand identity

Status: completed
Commits: `6265594`, `32122d0`

## Backlog

### SWEED-003 — Replace final placeholder content and media

Status: not-started

### SWEED-004 — Provide approved square app icon

Status: not-started
