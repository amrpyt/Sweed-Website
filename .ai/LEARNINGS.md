# Learnings

Updated: 2026-07-22T19:41:50+03:00

## Validated Project Lessons

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

- Next.js currently warns that it inferred `/home/amr/devspace-src` as the workspace root because another `package-lock.json` exists above the repository.
- The build also reports a pre-existing NFT tracing warning through `legacy-assets/[file]/route.ts` and `web-app-root.ts`; the build still succeeds.
- The existing PNG logo is a 4000x1860 wordmark, not a dedicated square Apple touch icon.
