# Learnings

Updated: 2026-07-22T02:52:36+03:00

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

## Recurring Mistakes to Avoid

- Do not infer deployment health from a successful build or `systemctl is-active` alone; wait for HTTP readiness.
- Do not stage or commit the two unrelated untracked Process Curtain files until their unfinished design is deliberately reviewed.
- Do not report lazy-loaded images as broken solely because `naturalWidth` is zero before their section enters the viewport; verify the asset URL and load after scrolling through the section.

## Successful Patterns

- Use existing official brand assets before creating substitutes.
- Validate public UI changes at both desktop and 390x844 mobile widths, including console errors and horizontal overflow.
- Stage explicit paths for focused commits when unrelated untracked work exists.

## Project Gotchas

- Next.js currently warns that it inferred `/home/amr/devspace-src` as the workspace root because another `package-lock.json` exists above the repository.
- The build also reports a pre-existing NFT tracing warning through `legacy-assets/[file]/route.ts` and `web-app-root.ts`; the build still succeeds.
- The existing PNG logo is a 4000x1860 wordmark, not a dedicated square Apple touch icon.
