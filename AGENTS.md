## Project Direction

- The current site must move toward modular React/Next implementation.
- No feature work should start without selecting and applying the relevant Superpowers workflow and agent skills first.
- Every completed atomic edit should be committed before starting the next independent task.
- Do not add new product features directly inside legacy/static HTML files such as `site/index.html` unless it is an urgent temporary production fix.
- Prefer building or updating focused React modules/components under `src/features`, `src/components`, or route-level Next files.
- If a legacy HTML patch is unavoidable, document it as temporary, keep it small, and create/follow a Superpowers-backed agent-skills task to migrate that behavior into modular React.
- For homepage work, the target structure is section-based React modules: hero, problems, quick help, partners, portfolio, services, offers, products, articles, FAQ, and contact.
- Avoid expanding runtime DOM patch scripts. Treat existing runtime scripts as migration debt to remove once the related section is converted to React.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
