# Learnings

Updated: 2026-07-22T18:44:13+03:00

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

## Recurring Mistakes to Avoid

- Do not infer deployment health from a successful build or `systemctl is-active` alone; wait for HTTP readiness.
- Do not report lazy-loaded images as broken solely because `naturalWidth` is zero before their section enters the viewport; verify the asset URL and load after scrolling through the section.
- Do not use pinned scroll, absolute panel stacks, or hidden horizontal carousels for primary content without a clear user benefit and measured responsive evidence.
- Do not treat a visually unusual menu as automatically better; route discoverability is the priority.

## Successful Patterns

- Use existing official brand assets before creating substitutes.
- Validate public UI changes at 1280, 1024, 768, and 390 widths, including console errors and horizontal overflow.
- Test interactive mobile navigation by checking closed/open geometry, Escape behavior, focus return, and touch-target dimensions.
- Measure before/after DOM geometry instead of relying only on visual impression.
- Stage explicit paths for focused commits when unrelated work exists.

## Project Gotchas

- Next.js currently warns that it inferred `/home/amr/devspace-src` as the workspace root because another `package-lock.json` exists above the repository.
- The build also reports a pre-existing NFT tracing warning through `legacy-assets/[file]/route.ts` and `web-app-root.ts`; the build still succeeds.
- The existing PNG logo is a 4000x1860 wordmark, not a dedicated square Apple touch icon.
