# Learnings

Updated: 2026-08-22T20:24:00+03:00

## Validated Project Lessons

### Shared navbar polish must preserve the approved compact header contract

Lesson: "Unifying" the navbar by enlarging its geometry and painting a page-local CTA can regress a previously approved shared shell even when navigation still functions.
Evidence: August 22 upstream navigation-unification commits increased the desktop header from 77px to 118px, enlarged logo/type/gaps, and replaced the canonical SWEED action with a custom pink pill. The owner immediately flagged the navbar and its button as broken. Restoring the compact `b8e245a` geometry and canonical `BrandActionButton` returned production to 77px/76px with a ~198×48 purple consultation CTA.
Applies to: `legacy-header.module.css`, `legacy-header.tsx`, shared navigation redesigns, and any agent changing site chrome.
Behavior change: Treat the compact navbar geometry and canonical consultation CTA as an approved system contract. Navigation behavior/routing may evolve independently, but visual changes to header height, logo scale, nav spacing/type, CTA label, CTA paint, or CTA component require explicit owner approval.
Revisit when: The owner explicitly approves a new navbar design.

### Reference HTML theming must not inject quoted CSS into quoted markup

Lesson: Regex-based theme replacement can corrupt uploaded HTML when it inserts double-quoted CSS values inside a double-quoted event-handler attribute.
Evidence: Branding fallback images contained `onerror="...font-family:Cairo..."`; replacing that token with `font-family:"SWEED Helvetica Arabic",...` terminated the attribute early and caused the browser parser to move card bodies outside their `.wcard` elements. A quote-safe unquoted CSS font stack restored all four card structures.
Applies to: `applySweedReferenceTheme`, service reference HTML, inline styles inside HTML attributes or JavaScript strings.
Behavior change: Use quote-safe replacements for inline `font-family:` values or parse the markup context before injecting quoted values. Add a regression input that contains an event-handler fallback whenever theme replacement rules change.
Revisit when: Reference theming moves from regex replacement to an HTML/CSS parser that understands attribute/string boundaries.

### Reference CTA wrappers must preserve intrinsic prototype sizing

Lesson: A button can keep an internal CSS grid without becoming a block-level grid item. Using `display:grid` on reference anchors changes the prototype's inline sizing contract and can make CTAs fill entire block containers.
Evidence: Branding and Digital Marketing had case/comparison actions measuring 740–1265px after the bridge; their raw approved HTML used `inline-block` and measured roughly 153–195px. Switching the shared wrapper to `inline-grid` preserved the canonical icon/label layout while production CTAs measured 171–193px with zero oversized buttons.
Applies to: `getSweedReferenceButtonThemeCss` and any future reference CTA bridge.
Behavior change: Keep the reference CTA wrapper `inline-grid` unless a specific prototype explicitly owns a full-width button rule. Verify both block-parent and flex-parent CTA contexts after button-system changes.
Revisit when: The reference action system is replaced by native React buttons instead of decorated uploaded HTML.

### Use reference presentation when approved HTML needs the current SWEED brand shell

Lesson: `presentation="exact"` is intentionally isolated fidelity mode; it keeps the prototype navbar/footer, fonts, palette, and button paint. When the owner wants the approved composition unchanged but branded like the rest of SWEED, `presentation="reference"` is the correct bridge.
Evidence: `/about` in exact mode rendered IBM Plex Sans Arabic, the prototype nav/footer, old prototype colors, and 50px pill CTAs. Switching only the presentation layer preserved all 14 sections and heading text while applying the shared SWEED header/footer, SWEED Helvetica Arabic, current palette, and canonical CTA system.
Applies to: Approved uploaded/reference HTML routes that must preserve structure and interactions while adopting current SWEED chrome and identity.
Behavior change: Do not rebuild the page composition just to align branding. Prefer the existing reference normalizer/theme bridge, strip duplicate chrome, and browser-diff structural content before/after.
Revisit when: The owner explicitly requests a composition redesign rather than brand-system alignment.

### Reference button conflicts must be scoped to the page that owns them

Lesson: A page-specific specificity conflict must not be solved with broad `!important` declarations on every reference CTA.
Evidence: About's `.cta .btn-ghost` needed a stronger white-secondary/purple-label override, but broad important paint rules then changed Branding/Digital service controls globally. SWEED-051 removed the broad rules and kept the About correction behind an About-only reference style.
Applies to: `reference-button-theme.ts`, `LegacyPage`, and approved HTML rendered through the SWEED reference bridge.
Behavior change: Resolve higher-specificity prototype conflicts at the narrowest page/section scope that owns the conflict. Keep shared reference CTA defaults overrideable where the approved composition intentionally needs context-specific behavior.
Revisit when: Reference pages stop shipping page-local CTA paint or the shared CTA architecture changes.

### Do not stack decorative transition rows between fully padded homepage sections

Lesson: A standalone divider can create a large empty band when both neighboring sections already own full vertical edge padding.
Evidence: The five-dot divider between Services and Why accumulated 96px Services bottom padding + 32px divider + 96px Why top padding. Removing the row and compacting only the touching edges to 32px reduced the Services CTA-to-Why-heading gap to 64px on desktop and mobile.
Applies to: Homepage section transitions and future decorative separators.
Behavior change: Prefer the natural background boundary between adjacent sections. If a separator is necessary, account for neighboring edge padding explicitly and verify the actual content-to-content gap in the browser.
Revisit when: A future approved art direction intentionally calls for a large transition band.

### RTL content direction does not define the physical SWEED header endpoints

Lesson: The SWEED header should keep Arabic navigation and menu content RTL while explicitly pinning the brand to the physical left and the primary consultation/menu action to the physical right.
Evidence: On 2026-08-18 the user identified the header as visually reversed. Explicit flex ordering plus `direction: rtl` produced the approved result; managed browser QA confirmed logo-left/action-right at 1440px, 1024px, 390px, and 320px with zero document overflow.
Applies to: Shared public header, responsive menu trigger placement, and future header layout refactors.
Behavior change: Do not infer physical brand/action placement from document direction alone. Preserve the logo-left/action-right endpoints and verify both desktop CTA and mobile menu trigger positions in browser QA.
Revisit when: The project owner explicitly approves a different header composition.

### Preserve the approved button hierarchy when changing shared identity tokens

Lesson: A palette cleanup must not invert the established CTA hierarchy merely because the same brand colors remain present.
Evidence: On 2026-08-18, `999fd13` changed the canonical SWEED primary CTA from deep purple to pink and the secondary from white to transparent; the user immediately identified the resulting controls as a visual regression. `b7b94c8` restored the prior hierarchy, then `2693fb0` made it the explicit site-wide contract through `DEC-015`, semantic `--action-*` tokens, shared action components, and regression coverage.
Applies to: `BrandActionButton`, shared headers/heroes, homepage CTAs, modular public pages, and any theme bridge that maps reference CTAs onto the shared system.
Behavior change: Keep deep purple as the canonical primary surface, white as the canonical secondary/light surface, and pink as the interaction/fill accent unless an explicit approved redesign changes that contract. Public CTA code must use the shared action mechanism; page CSS may size/place it but must not repaint it. Token refactors must be checked against rendered primary and secondary controls before deployment.
Revisit when: The project owner explicitly approves a different CTA hierarchy.

### Copied Next builds must inherit the service user

Lesson: A valid clean `.next` build can still fail at runtime if it is copied from a root-owned worktree without restoring service ownership.
Evidence: On 2026-08-18, the public demo returned 502 during a deployment window and Next logged repeated `EACCES` failures creating `.next/cache/images`; the deployed `.next` tree was `root:root` while `sweed-demo.service` runs as `amr`.
Applies to: Every SWEED deployment that copies a prebuilt `.next` directory into `/home/amr/devspace-src/SWEED-Website/apps/web/.next`.
Behavior change: After copying the clean build and before starting the service, run `chown -R amr:amr apps/web/.next`, verify no non-`amr` entries remain, then start the service and browser-load a route that exercises image caching.
Revisit when: Deployment moves to immutable artifacts or the systemd service user changes.

### Wait for HTTP readiness after service restart

Lesson: `systemctl is-active sweed-demo.service` can return `active` before port `3010` accepts connections.
Evidence: After the 2026-07-22 favicon deployment, the immediate local curl returned `000`, while the service became ready within the next retry and then returned HTTP 200.
Applies to: All SWEED demo deployments through `sweed-demo.service`.
Behavior change: After restart, poll `http://127.0.0.1:3010/` until HTTP 200 before checking the public URL or reporting success.
Revisit when: The service gains an explicit systemd readiness notification or dedicated health endpoint.

### Root metadata supplies shared browser icons

Lesson: Page-level marketing metadata did not provide browser icon links, but adding typed `icons` metadata in the App Router root layout merged correctly across the homepage.
Evidence: Before the change, browser DOM had zero icon links; after deployment it exposed shortcut, SVG, PNG, and Apple touch icon links on desktop and mobile.
Applies to: Shared Next.js metadata in `apps/web/src/app/layout.tsx`.
Behavior change: Keep global brand assets in root metadata and verify the rendered DOM after page-level metadata merges.
Revisit when: Next.js metadata behavior changes or route groups introduce nested layouts with icon overrides.

### Core content should remain in natural document flow

Lesson: Pinned absolute stacks are a poor default for essential marketing content such as services.
Evidence: The old services implementation expanded to about 2489px, overlapped five panels, and created a 1892px mobile strip. The natural-flow replacement reduced desktop height to about 1361px and made client/scroll widths equal on desktop and mobile.
Applies to: Homepage services and future sections that contain primary decision-making content.
Behavior change: Use sticky context or optional entry motion, but keep essential content static, semantic, visible, and reachable without scroll choreography.
Revisit when: A measured campaign-specific narrative genuinely requires a cinematic one-off interaction.

### Conventional primary navigation beats hidden desktop navigation

Lesson: The main public routes should be visible directly on desktop; expressive menu treatments should not add interaction cost to basic navigation.
Evidence: The user rejected the side-opening StaggeredMenu. The replacement fits all homepage and internal-route links at desktop widths and uses a below-header dropdown on mobile with Escape/focus restoration.
Applies to: Public SWEED navigation.
Behavior change: Keep desktop links inline and reserve the menu trigger for responsive widths only.
Revisit when: Navigation information architecture changes substantially.

### Fixed header needs explicit space and direction hysteresis

Lesson: `position: sticky` was not reliable under the current page/smooth-scroll runtime; a fixed header with a matching spacer and accumulated scroll-direction distance is deterministic and avoids jitter.
Evidence: Before the fix, the header reported `top=-2500` at `scrollY=2500`. After the fix, downward scroll moved it to `top=-81`, upward scroll restored `top=0`, and the mobile menu kept it visible while open.
Applies to: Public SWEED header.
Behavior change: Keep header height and spacer height synchronized at each breakpoint; use transform-only hide/show and accumulated-distance thresholds.
Revisit when: Lenis is removed or the header height changes.

### Reading progress should not rerender React on every scroll

Lesson: A reading indicator is better driven by a CSS Scroll Progress Timeline with a direct transform fallback than by React state updates plus a transition.
Evidence: The new indicator stayed above the header at z-index 1201, tracked intermediate progress, and reached 100% at document end without component rerenders.
Applies to: Global reading progress UI.
Behavior change: Use CSS `animation-timeline: scroll(root block)` where available; retain throttled imperative ARIA/fallback updates.
Revisit when: Browser support allows removing the fallback.

### Replayable motion must reset both visual state and work loops

Lesson: Making animations replay requires resetting offscreen state and cancelling active animation frames/tweens, not merely removing `once: true`.
Evidence: Reveal states cycled true/false/true, process steps reset and replayed through intermediate transforms, and metric counters reset to zero then completed again without concurrent RAF loops.
Applies to: Shared Reveal, GSAP ScrollTrigger sections, and numeric counters.
Behavior change: Use `restart none restart reset` for non-scrub ScrollTriggers; cancel existing RAF before counter restart/reset; verify reduced-motion specificity keeps content visible.
Revisit when: Motion architecture moves to CSS View Timelines.

### Premium motion needs one shared direction, not more effects

Lesson: A Framer/Webflow-like feel comes from shared scroll physics, timing, route flow, and selective depth—not from adding independent fades to every section.
Evidence: SWEED already had Lenis and GSAP, but the experience was fragmented. After centralizing tokens, route entrance, scroll signals, hero scrub choreography, and list-specific View Timelines, browser QA preserved CLS `0`, LCP about `1.16s`, native mobile scrolling, and reduced-motion visibility.
Applies to: All SWEED public-site motion work.
Behavior change: New animation must use the shared quart/quint/expo tokens, stay within the motion budget, preserve natural content flow, and be tested on desktop, mobile, and reduced-motion modes.
Revisit when: The animation runtime changes or Core Web Vitals regress.

### Portfolio proof must be encoded as data state

Lesson: Visual disclaimers alone are not enough when a content source mixes documented and illustrative case studies; verification status must exist in the content model and tests.
Evidence: The approved final homepage source explicitly documented one result and marked the remaining examples as format samples. SWEED-009 added `verified`/`pending` states, rendered visible status labels, and tested that pending cards carry no numerical result.
Applies to: Portfolio cards, testimonials, metrics, and any marketing proof.
Behavior change: Require source, approval, timeframe, and measurable outcome before publishing a numerical claim; keep pending proof explicitly labeled and non-numeric.
Revisit when: A new case study is formally documented and approved.

### Public card links need real slug-aware destinations

Lesson: A correct-looking dynamic URL is still broken if the route renders one legacy fixed page for every slug.
Evidence: `/articles/project-needs-direction` initially opened the correct URL but displayed an unrelated legacy article title. Replacing the legacy wrapper with slug-aware SSG pages fixed both articles and services.
Applies to: `articles/[slug]`, `services/[slug]`, and future dynamic public content.
Behavior change: Resolve the requested slug against the content repository, return `notFound()` when absent, generate metadata per item, and include a browser assertion for the destination H1.
Revisit when: Dynamic content moves from local data to Convex or another CMS.

### Brand metaphors work best when they drive interaction

Lesson: A central brand symbol should earn its visual weight through feedback and decision support, not remain a decorative stock illustration.
Evidence: Replacing the traditional compass image with a six-node SWEED direction dial reduced duplicate choice signals, rotated toward the selected problem, exposed the recommended service/solution, and preserved the contact mapping without new dependencies.
Applies to: Homepage diagnostic sections and future uses of SWEED’s direction/compass metaphor.
Behavior change: Prefer branded functional diagrams tied to real state over generic illustrative assets; keep the accessible result outside decorative SVG and respect reduced motion.
Revisit when: SWEED supplies a final approved brand symbol or the problems list changes from six items.

### Mobile adaptation must change composition, not only scale

Lesson: A desktop diagnostic can remain technically responsive yet still feel poor on a phone when the information order and visual weight are unchanged.
Evidence: The first mobile direction-dial version had no overflow, but placed six separate cards before a 416px result block and produced a 1287px section. Reordering the result first, consolidating choices into one list, and using a compact horizontal dial reduced the section to about 910px at 390px without hiding content.
Applies to: Homepage diagnostics, interactive marketing sections, and other desktop-to-phone adaptations.
Behavior change: Audit mobile hierarchy, thumb flow, and vertical cost independently from width/overflow; recompose when the primary action appears too late.
Revisit when: Real-device testing or content changes alter row heights or interaction order.

### Same-page navigation needs explicit scrolling with full-screen mobile sheets

Lesson: Closing a full-screen menu and updating the hash does not guarantee that Next.js will scroll to the target, especially when menu state and fixed headers are involved.
Evidence: The mobile menu initially changed `#services` but left `scrollY=0`. A dedicated home-anchor handler now closes the sheet, updates history, calculates the fixed-header offset, and scrolls the target to about `top=65px`.
Applies to: Home-page anchor links in the public header and mobile CTA.
Behavior change: Handle same-page hashes explicitly, preserve modified-click behavior, and verify the destination geometry rather than checking the hash alone.
Revisit when: Navigation moves to a router-native scroll manager or the fixed-header contract changes.

### Mobile sheets need bounded geometry and verified outbound links

Lesson: A mobile navigation surface feels native when it is visibly bounded, closes through multiple paths, and only exposes destinations that are real.
Evidence: Replacing the full-height white menu with a 600px top sheet at 390×844 removed the empty-page feeling, while backdrop close, Escape/focus restoration, focus cycling, and fixed-header anchor positioning all passed. Only repository-verified WhatsApp, phone, and email actions were published.
Applies to: Public mobile navigation, overlays, quick-contact panels, and future social-profile rows.
Behavior change: Prefer bounded sheets with explicit backdrop geometry; never guess social URLs, and render profiles from verified content data only.
Revisit when: Official social links arrive or real iOS Safari testing changes the safe-area/height contract.

### Core brand media must not depend on reveal state

Lesson: A primary identity image or video should remain visible in the default document state; reveal motion may enhance it but must not determine whether the section feels complete.
Evidence: The previous “مين سويد؟” layout wrapped its main video in a clip reveal and could appear as a narrow text-only column in stakeholder screenshots. The rebuilt section keeps the media visible by default and uses the full 1320px composition.
Applies to: Homepage identity, portfolio hero media, and other core marketing visuals.
Behavior change: Keep primary media in normal flow with a visible baseline; reserve reveal wrappers for secondary copy and decorative enhancement.
Revisit when: The shared Reveal component guarantees server-visible output and visual QA confirms no blank intermediate state.

### One interaction should have one dominant affordance

Lesson: Wrapping custom media controls inside a shared interactive component can silently duplicate the same action and make the interface look broken.
Evidence: The about video combined a custom pink play circle with `HomeVideoDialog`’s own play badge and label. Removing the custom control left one clear trigger while preserving the dialog and MP4 source.
Applies to: Video cards, modals, buttons with nested controls, and reusable interactive wrappers.
Behavior change: Before adding custom action chrome inside a reusable trigger, inspect what the wrapper already renders and verify visible affordance counts in the browser.
Revisit when: `HomeVideoDialog` API changes to support custom trigger chrome explicitly.

### Inter-section rhythm needs a shared page-level token

Lesson: Independent section padding does not guarantee comfortable transitions; a shared page-level separation creates predictable breathing room without editing every module.
Evidence: SWEED-014 added one fluid direct-section gap measuring 85px at 1700px, 51px at 1024px, and 28px on phones, while preserving each section’s internal composition.
Applies to: Homepage section sequencing and future long-form marketing pages.
Behavior change: Use a shared fluid separation token for section boundaries, then tune internal padding separately for hierarchy.
Revisit when: A future section intentionally bleeds into its neighbor or page length becomes excessive.

### Font icon utilities can override responsive visibility

Lesson: Hiding a Font Awesome icon through a generic CSS-module class is not reliable when the library’s global display rule loads later in the cascade.
Evidence: Mobile-only route arrows appeared before every desktop navbar label even though `.navArrow` was grouped under `display: none`; replacing the icon element with a CSS-owned text glyph restored deterministic desktop/mobile visibility.
Applies to: Responsive navigation affordances and any decorative icon that changes by breakpoint.
Behavior change: Use a project-owned wrapper/glyph for breakpoint-controlled decoration, or apply a selector with explicit cascade ownership instead of relying on a library icon’s display property.
Revisit when: Font Awesome is removed or the header icon system is centralized.

### Route health and route intent are separate checks

Lesson: A link can return HTTP 200 and still be wrong when it opens a summary section instead of the standalone page the user expects.
Evidence: Homepage and footer “من نحن” links successfully opened `/#about`, so an HTTP/hash audit reported no failure, but users expected the new full `/about` page. SWEED-018 added an explicit route-policy test and browser click verification.
Applies to: Shared header/footer navigation, campaign CTAs, and any site that mixes standalone pages with homepage anchors.
Behavior change: Validate both technical reachability and intended destination semantics; keep route policy in one shared configuration instead of duplicated href lists.
Revisit when: The public information architecture changes or standalone pages are intentionally collapsed back into homepage sections.

### Scroll stories need capability-based choreography

Lesson: A pinned process sequence should pin only a viewport-fit inner stage; tall phone layouts need natural-flow scroll-linked activation instead of a universal pin.
Evidence: SWEED-019 pinned the five-stage methodology at `1440×900` and `1024×768`, while `390×844` activated the same semantic list step by step with zero pin spacers. Short landscape and reduced-motion modes remained static and fully visible.
Applies to: Ordered marketing processes, timelines, and other scroll-driven storytelling sections.
Behavior change: Use `gsap.matchMedia` to select pinned, natural-flow, compact, and reduced-motion strategies; synchronize semantic stage state to the scrubbed timeline playhead, and verify responsive pin-spacer cleanup.
Revisit when: The methodology stage count, header height, or section composition changes.

### Legacy accessibility repairs belong at the composition boundary

Lesson: When multiple public pages are composed from copied legacy HTML, semantic repairs should be centralized in one pure, tested transform instead of patched independently in every source file.
Evidence: SWEED-020 repaired main landmarks, heading order, labels, pagination/slider names, and stable skip destinations across Articles, Products, Portfolio, and Offers through `normalizeLegacyAccessibility`; browser QA then reported no unlabeled visible controls or heading jumps.
Applies to: Legacy HTML composition, migrations, imported CMS fragments, and any server-rendered markup normalization layer.
Behavior change: Fix recurring markup contracts at the shared boundary, add signature-level tests, and keep route components responsible for landmarks and navigation focus.
Revisit when: The remaining legacy routes are migrated to semantic React components.

### Brand identity color and action color may need separate tokens

Lesson: A brand color that works for decorative identity use may not meet contrast for normal-size white text; create an action-role token instead of globally mutating the identity palette.
Evidence: SWEED pink `#ed2062` measured about 4.21:1 with white, while the action token `#e2185b` measured 4.65:1 on representative CTAs and badges without changing decorative brand elements.
Applies to: CTA buttons, small badges, form submits, and text-bearing interactive states.
Behavior change: Verify contrast on the actual foreground/background pair and map accessible colors by semantic role, not by a single universal brand token.
Revisit when: Official brand colors or typography sizes change.

### Production smoke tests should assert contracts, not implementation accidents

Lesson: End-to-end smoke tests become brittle when they assert stale component-specific selectors or treat normal navigation aborts as outages.
Evidence: SWEED-020 changed the production suite to assert the real shared header/footer and ignore only `ERR_ABORTED` cancellations caused by rapid route navigation; the deployed desktop/mobile suite then passed 11 tests with zero failures.
Applies to: Production Playwright smoke tests and shared-shell health checks.
Behavior change: Assert user-visible/public contracts and genuine network failures; keep implementation selectors only when they are an intentional stable test API.
Revisit when: The shared shell or browser navigation strategy changes.

### An executable HTML delivery can be the spec, not inspiration

Lesson: When the stakeholder supplies a complete executable HTML page and asks for it as-is, preserve its markup, CSS, SVGs, motion, and interactions instead of translating the brief into a new visual composition.
Evidence: SWEED-035 restored the uploaded Services, Portfolio, and Offers references after the earlier React reinterpretations were rejected. SHA-256 tests lock the exact uploaded bytes, while browser QA confirms 76/71/42 reference ScrollTriggers and the original route interactions.
Applies to: Executive HTML handoffs, design prototypes intended for direct reproduction, and migrations into shared application shells.
Behavior change: Ask whether executable references are fidelity targets before redesigning; when they are, isolate the integration seam and keep source fidelity testable.
Revisit when: The user explicitly approves a redesign or a pixel/motion-faithful React port.

### CDN choreography needs deterministic sequencing inside client-routed shells

Lesson: Page-level `next/script` strategies do not automatically reproduce vanilla HTML's sequential script semantics across client-routed pages.
Evidence: Portfolio intermittently had `window.gsap` undefined when page-level CDN scripts used `beforeInteractive`, while Offers happened to work. A small sequencer now loads GSAP → plugins → inline choreography in order and wraps inline declarations in an IIFE; client navigation Offers → Portfolio → Services resets trigger counts cleanly without redeclaration errors.
Applies to: Imported standalone HTML that relies on global CDN libraries and inline classic scripts inside Next.js or another SPA shell.
Behavior change: Preserve dependency order explicitly, isolate inline lexical scope, and clean up route-created scroll triggers on unmount.
Revisit when: These reference pages are migrated to bundled module imports or native React motion code with verified fidelity.

## Recurring Mistakes to Avoid

- Do not infer deployment health from a successful build or `systemctl is-active` alone; wait for HTTP readiness.
- Do not report lazy-loaded images as broken solely because `naturalWidth` is zero before their section enters the viewport; verify the asset URL and load after scrolling through the section.
- Do not use pinned scroll, absolute panel stacks, or hidden horizontal carousels for primary content without a clear user benefit and measured responsive evidence.
- Do not treat a visually unusual menu as automatically better; route discoverability is the priority.
- Do not place a fixed decorative blur over navigation or progress UI; it obscures hierarchy and increases paint cost.
- Do not use React state plus a visual transition for per-scroll progress tracking.
- Do not change a reveal to replay without testing exit reset, re-entry, reduced motion, and concurrent animation cancellation.

## Successful Patterns

- Use existing official brand assets before creating substitutes.
- Validate public UI changes at 1280, 1024, 768, and 390 widths, including console errors and horizontal overflow.
- Test interactive mobile navigation by checking closed/open geometry, Escape behavior, focus return, and touch-target dimensions.
- Measure before/after DOM geometry instead of relying only on visual impression.
- Test scroll systems as state transitions: top → down-hidden → up-visible → menu-open → reduced-motion.
- Stage explicit paths for focused commits when unrelated work exists.

## Project Gotchas

- The installed Next.js runtime and `bun.lock` remain pinned to `16.2.4` even though the manifest range permits a newer compatible patch; dependency closure requires a controlled lockfile/install batch followed by the complete regression matrix.
- The existing PNG logo is a 4000x1860 wordmark, not a dedicated square Apple touch icon.
