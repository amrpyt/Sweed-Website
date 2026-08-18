# Handoff

Updated: 2026-08-18T19:06:00+03:00

## Read First

- `.ai/PROJECT.md`
- `.ai/STATE.md`
- `.ai/TASKS.md`
- `.ai/decisions/DEC-013-uploaded-html-is-fidelity-source.md`
- `.ai/decisions/DEC-014-reference-fidelity-with-sweed-theme-bridge.md`
- `docs/superpowers/specs/2026-08-12-reference-html-fidelity-restoration-design.md`

## Current Public Contract

- `/crm-ai-demo` is a standalone frontend-only preview of the future SWEED CRM + AI Agent product. It intentionally uses deterministic browser-local data and actions and is not connected to Convex or another backend.
- The CRM demo is now a guided visitor-facing story rather than an internal dashboard: pick Instagram/Facebook/TikTok, read the inbound message, run the AI reply, then write the result into the CRM.
- Keep the current three-step interaction simple. The route should expose one dominant action at a time and explain the product without requiring CRM expertise.
- CRM source/brand icons must come from established icon libraries. The current implementation uses Lucide for UI icons and Font Awesome for Instagram/Facebook/TikTok/WhatsApp; do not replace them with hand-authored SVGs.
- `/services`, `/portfolio`, and `/offers` use the exact approved executable HTML references as their structure/motion/interaction source.
- Their runtime typography and brand palette intentionally match the homepage: `SWEED Helvetica Arabic`, `#261b3e`, `#ed2062`, `#6d6e70`, and current light surfaces.
- Their runtime buttons now follow the homepage SWEED control language through a scoped Theme Bridge: purple primary, light/contextual secondary, compact choice controls, shared radius, touch targets, pink focus/interaction accents.
- Arabic button labels use shared optical-centering tokens: tight control leading plus a measured 3px visual correction. Do not replace this with generic geometric centering only; the SWEED Helvetica Arabic glyph box sits visually low without compensation.
- Do not reintroduce reference Cairo/IBM Plex or the old `#241238` / `#D6246E` identity unless explicitly requested.
- Do not redesign or modernize the page compositions without explicit approval.
- Shared header, footer, AI advisor, routing, and Next runtime stay current.
- Homepage primary CTA-style actions now use the same 48px control height, 16px `--shape-control` radius, strong 700 weight, and SWEED focus language. Text actions remain text actions; semantic badges/tags and icon utilities may remain pill/circular.
- Mobile Problem Selector options remain individual 12px-radius cards with separated borders and a pink selected state; do not collapse them back into zero-radius table rows.

## Latest CRM Change

`d6d5777 feat: redesign CRM demo as guided product story`

The standalone CRM demo now:
- lives at `/crm-ai-demo` and is `noindex` while it remains a product preview;
- uses semantic visitor-facing structure, SWEED purple/pink, and the existing control/motion tokens;
- keeps all state in the browser with no backend dependency;
- offers three explicit source scenarios: Instagram, Facebook, and TikTok;
- presents the same short flow for each scenario: inbound message → source-aware AI reply → CRM opportunity result;
- uses Lucide UI icons plus Font Awesome social-brand icons and contains no hand-authored SVG/path markup in the CRM feature;
- exposes one dominant action per stage (`شغّل الـAI Agent`, `حدّث الـCRM`, then replay) rather than a dense set of dashboard controls;
- shows the CRM payoff as score, opportunity value, service, and next action after the conversation is processed;
- respects reduced motion, visible keyboard focus, and 44px+ interaction targets.

The current control system now:
- normalizes the shared desktop/mobile header CTA to the 48px control contract and keeps the Arabic label optically centered independently from its icon;
- scopes the homepage mobile 44px touch floor with zero specificity so it cannot override component-specific 48px CTA sizing;
- preserves component radius during `focus-visible` instead of forcing a smaller focus-only radius;
- uses `--shape-control` for About, Offers, Blog, and Contact CTA-style actions while preserving semantic pills and text actions;
- keeps mobile Problem Selector choices as separated rounded cards rather than one square-row list;
- defines one semantic optical-centering contract in `tokens.css`;
- keeps shared brand-action icons geometrically centered while moving only the Arabic label by the optical correction;
- keeps compact/mobile brand-action icon geometry inside the 48px control;
- applies the same line-height and optical block padding to reference CTAs and compact choice controls;
- keeps exact uploaded source bytes untouched;
- maps runtime reference colors to current SWEED brand roles;
- maps display/body typography to `SWEED Helvetica Arabic`;
- removes reference Google Fonts requests;
- themes inline SVG and script color literals;
- lets headings inherit section color so hero titles remain white;
- injects a dedicated scoped button theme without changing reference markup or source bytes.

## Verification

- SWEED-043 guided-demo tests: 5 passed after an observed red TDD state.
- Latest committed-main check at `98e88a4`: 133 passed, 0 failed, plus TypeScript, ESLint, spacing, and mobile-first guards.
- Latest committed-main production build passed and generated `/crm-ai-demo`; deployed build ID is `BhQSp-jptS6YU2eZ3xFoI` with `amr:amr` ownership.
- Public guided flow passed from social message to AI reply to CRM result; Instagram/Facebook/TikTok scenarios were exercised.
- Public QA at 1440×900, 390×844, and 320×568 had zero horizontal overflow, no broken images, and no clipped/sub-44px controls.
- Reduced-motion public QA had zero active animations while interactions remained functional; browser errors and fresh cache-permission errors were empty.
- A 2026-08-18 public 502 incident was recovered. Root cause: copied `.next` build owned by `root:root` caused Next image-cache `EACCES` under the `amr` service user. The full `.next` tree is now `amr:amr` and public `/` + `/crm-ai-demo` return 200.
- Post-recovery browser QA on `/crm-ai-demo`: ready state complete, broken images 0, overflow 0, browser errors 0, and no fresh cache-permission errors in service logs.
- SWEED-041 focused CRM tests: 6 passed, 0 failed after an observed red TDD state for the two new behaviors.
- Impeccable detector: no findings on changed CRM implementation/test files.
- Local source/icon QA confirmed Font Awesome Brands rendering for Instagram/Facebook/TikTok and no hand-authored SVG/path markup.
- Clean-worktree `bun run check`: 127 passed, 0 failed.
- Clean-worktree production build passed and generated `/crm-ai-demo` as a static route.
- Build `WScFr0dDGdEVVO22nNNMZ` deployed; `sweed-demo.service` active; `/crm-ai-demo` HTTP 200 locally/publicly.
- Public desktop/mobile QA: zero horizontal overflow, zero broken images, no page errors; 390px and 320px layouts stayed within viewport bounds.
- Public AI reply flow passed for the Instagram lead: outbound reply rendered, replied-state feedback appeared, and the CRM timeline logged `AI Agent رد على Instagram`.
- Reduced-motion public QA reported no active animations.
- SWEED-040 focused tests: 4 passed, 0 failed.
- Clean-worktree `bun run check`: 121 passed, 0 failed.
- Clean-worktree production build passed and included `/crm-ai-demo` as a static route.
- Browser QA: 1440×900, 1024×768, 390×844, and 320×568 with zero horizontal overflow or broken images; primary CRM/Agent interactions passed.
- Reduced-motion emulation disabled thinking-dot animation while retaining interaction completion.
- Production service is active and `/crm-ai-demo` returns HTTP 200 locally and publicly; public desktop/mobile interaction QA passed.
- Focused homepage/fidelity/reference tests: 18 passed, 0 failed.
- `bun run check`: 117/117 tests plus type/lint/design guards passed.
- Production build: 29 routes, passed. Final deploy was built while `sweed-demo.service` was stopped, verified `apps/web/.next/BUILD_ID`, then started cleanly.
- Homepage CTA metrics: 48px height, 16px radius, weight 700 for Header/About/Offers/Blog/Contact primary actions at the tested widths.
- Mobile Problem Selector: individual 12px-radius cards at 390px and 320px, pink active border/background, `aria-pressed=true` after selection.
- Browser QA: 1440×900, 1024×768, 390×844, and 320×568; no horizontal overflow, broken loaded images, console errors, or page errors in final checks.
- Reference GSAP/ScrollTrigger lifecycle remains 76 / 71 / 42 for Services / Portfolio / Offers, with zero overflow at 1440px, 390px, and 320px.
- Reduced motion leaves homepage problem choices and reference reveal content visible.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual skip.
- Service active; `/`, `/services`, `/portfolio`, and `/offers` return HTTP 200 locally and publicly.

Previous optical-centering verification remains valid:
- Focused optical/fidelity/reference tests: 14 passed.
- `bun run check`: 113/113 tests plus type/lint/design guards passed.
- Production build: 29 routes, passed.
- Production Playwright: 11 passed, 0 failed, 1 intentional mobile visual skip.
- Measured visible-text alignment on mobile: Services reference CTA `+0.5px`; homepage primary CTA `-0.5px` from geometric center.
- Homepage 320px brand action: 48px height, 28px icon fully contained, label fully contained; Services/Portfolio/Offers controls use the same optical contract and have zero 320px/390px horizontal overflow.
- Desktop 1440×900 and mobile 390×844 / 320×568: no horizontal overflow or browser errors on tested public routes.
- Primary reference CTAs: 48px minimum, 16px shared radius, SWEED font weight 700, purple base, white text, pink interaction/focus accent.
- Choice controls: 44px minimum with consistent inactive/active hierarchy; film tabs retain their dark-context white/purple state for contrast.
- Services sticky navigation and CTA links passed; Portfolio filters/tabs/chips passed; Offers quiz/comparison/tabs/drawers/package selection/form stepper passed.
- GSAP remains Services 76 / Portfolio 71 / Offers 42 ScrollTriggers.
- Google Fonts requests on the three reference pages: 0.
- Service active; public routes HTTP 200.

## Deployment Note

- With Next 16, do not run `next build` against the same `.next` directory while `sweed-demo.service` is actively serving it. Stop the service first, build, verify `.next/BUILD_ID`, then start the service. A concurrent build/restart race was observed and recovered during SWEED-039.
- When copying a clean `.next` artifact from a root-owned worktree into the service checkout, run `chown -R amr:amr apps/web/.next` before starting `sweed-demo.service` and verify no root-owned entries remain. Missing this step caused the 2026-08-18 image-cache `EACCES`/502 incident.

## Remaining Boundary

- The CRM + AI Agent route is intentionally standalone for now; add its Services-page entry only as a follow-up.
- Articles is not an executable-HTML fidelity route in the current reference batch.
- Do not push without explicit user approval.
