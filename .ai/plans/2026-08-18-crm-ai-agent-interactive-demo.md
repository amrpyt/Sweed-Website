# SWEED CRM + AI Agent Interactive Demo

Date: 2026-08-18
Task: SWEED-040

## Goal

Create a standalone, frontend-only product demo page that previews a future SWEED CRM + AI Agent product. The page should feel like a credible working product, use SWEED's existing identity, and later be embeddable or linked from the Services page.

## Scope

- Add a dedicated marketing route for the interactive demo.
- Keep all data and state local to the browser; no Convex, API, database, or server mutation.
- Build a task-oriented CRM command center with pipeline, contact details, activity, KPIs, and AI Agent assistance.
- Make the AI Agent visibly useful through deterministic demo actions such as summarizing a lead, prioritizing follow-up, drafting a WhatsApp message, and updating simulated CRM state.
- Use the current SWEED control geometry, typography, deep purple `#261b3e`, pink `#ed2062`, and semantic tokens.
- Apply Remotion-inspired motion discipline: state-driven motion, short transitions, stable layout, explicit reduced-motion fallbacks, and deterministic timelines for showcase sequences.
- Keep the route modular under `apps/web/src/features` rather than legacy HTML.

## Visual Direction

- Product UI, not a landing-page card collage.
- Desktop composition: compact app rail + pipeline/workspace + contextual AI Agent panel.
- Mobile composition: task-first single column with tabbed workspace and collapsible AI panel.
- Restrained surfaces, SWEED pink reserved for active/agent/action states, purple for navigation and authority.
- Motion communicates state changes: agent thinking, pipeline movement, new activity, and metric changes.

## Interaction Demo

1. Select a lead from the pipeline.
2. Inspect score, source, value, next action, and timeline.
3. Ask the AI Agent to analyze the lead.
4. Run deterministic agent actions that visibly update the local CRM model.
5. Reset the demo to its initial state.

## Verification

- Focused tests for deterministic CRM demo state transitions.
- `bun run check`.
- Production build with the demo service stopped to avoid the Next `.next` race.
- Deploy and verify local + public HTTP 200.
- Browser QA at 1440x900, 1024x768, 390x844, and 320x568.
- Verify primary interaction path, keyboard focus, reduced motion, console errors, broken assets, and horizontal overflow.
- Commit the skill installation separately from the product feature, then commit the completed feature. Do not push.
