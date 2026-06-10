# Research Brief

## Scope

Close the remaining homepage brief gaps without replacing the accepted legacy structure. The research focuses on runtime-safe execution for homepage enhancements, disclosure-based support UI that works without client hydration, and minimal-risk popup timing behavior.

## Research Questions

- When should `next/script` be trusted versus plain HTML behavior for page enhancements?
- What native HTML pattern can provide a support drawer without depending on React state?
- What browser behavior matters when injecting scripts or relying on inserted HTML?

## Sources Reviewed

| Source | Type | URL | Used For | Confidence |
|---|---|---|---|---|
| Next.js Scripts guide | Official docs | https://nextjs.org/docs/pages/guides/scripts | Confirm `afterInteractive` runs after some hydration and is not the safest fallback for hydration-sensitive legacy behavior | High |
| Next.js Script API | Official docs | https://nextjs.org/docs/pages/api-reference/components/script | Confirm intended usage of the `Script` component and runtime loading expectations | High |
| MDN `<details>` element | Official docs | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details | Confirm native disclosure behavior for support drawer UI | High |
| MDN `<summary>` element | Official docs | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary | Confirm click/toggle behavior for disclosure launcher | High |
| MDN `HTMLScriptElement` | Official docs | https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement | Confirm script execution caveats when HTML is inserted dynamically | High |

## Official Documentation Findings

- Next.js documents `afterInteractive` as loading a script after some hydration on the page. That means it is not the strongest fallback when homepage behavior must work even if hydration is delayed or unreliable.
- The `Script` component is for optimized script loading, but its execution model is still tied to Next.js runtime behavior.
- MDN defines `<details>` as a native disclosure widget and `<summary>` as the native toggle surface. This makes it suitable for a support panel that should open and close without React state.
- MDN notes that scripts inserted by `innerHTML` or `outerHTML` do not execute. That supports using an actual rendered `<script>` element for runtime fallback instead of relying on HTML insertion side effects.

## GitHub / Ecosystem Evidence

- Repo evidence showed the legacy homepage content is streamed as HTML and several client-side enhancements were not consistently applying at runtime.
- Repo evidence also showed the support widget markup was visible but React-only interactions were unreliable on the legacy homepage route.

## Reuse-First Options

| Option | Source | Fit | Tradeoffs | Decision |
|---|---|---|---|---|
| Continue using `next/script` `afterInteractive` only | Next.js docs | Low for this homepage fallback case | Depends on hydration/runtime timing | Reject |
| Native `<details>/<summary>` support drawer | MDN | High | Less custom than a fully stateful React chat drawer | Use |
| Plain rendered `<script>` fallback for homepage adjustments | MDN script behavior | High | More imperative than React effects | Use |
| Rebuild homepage fully in React sections | Repo context | Low | Too large for this focused change | Reject |

## Capability Map And Change Decomposition

| Capability | Suggested Change Name | Depends On | Why Separate | Verification Target |
|---|---|---|---|---|
| Homepage runtime polish | close-homepage-brief-gaps | Existing legacy homepage baseline | Needed to close current brief deltas without redesign | Browser proof on `/` |
| Support drawer fallback | close-homepage-brief-gaps | Existing ai-advisor surface | Needed because support CTA must work even if hydration is weak | Browser proof on `/` |

## Recommended Execution Order

1. Stabilize the support surface with a native disclosure interaction.
2. Add a runtime-safe homepage fallback script for help cards, service links, partner marquee, and popup timing.
3. Re-run browser proof on the homepage after 30+ seconds.

## Best Practices

- Prefer native HTML behavior when the page mixes large legacy HTML with modern client enhancements.
- Keep homepage fixes surgical and scoped to the actual DOM that ships to the browser.
- Verify interactive homepage behavior in a real browser, not only by reading source files.

## Common Pitfalls And Mitigations

| Pitfall | Why It Matters | Mitigation | Source |
|---|---|---|---|
| Assuming `afterInteractive` is equivalent to parser-time execution | Legacy fixes may still wait on hydration/runtime timing | Use a rendered `<script>` fallback for must-run homepage adjustments | Next.js scripts guide |
| Relying on React state for a support drawer on a hydration-sensitive page | The launcher may render but not toggle | Use native `<details>/<summary>` | MDN details and summary |
| Expecting scripts embedded via HTML insertion to execute | Runtime fixes may never run | Render an actual `<script>` element instead | MDN HTMLScriptElement |

## Production Readiness Checklist

- [x] Security concerns identified
- [x] Accessibility concerns identified
- [x] Performance concerns identified
- [x] Error/loading/empty states identified
- [x] i18n/RTL concerns identified
- [x] Deployment/rollback concerns identified
- [x] Testing strategy identified

## Recommended Direction

- Keep the accepted legacy homepage structure.
- Use native disclosure UI for support controls.
- Use a small runtime fallback script for homepage-only DOM adjustments that must work regardless of React hydration state.

## Open Questions

- None for this narrow gap-closing change.
