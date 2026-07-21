# Project

Updated: 2026-07-22T02:45:41+03:00

## Purpose

SWEED is an Arabic-first marketing and advertising agency website for Egyptian founders, business owners, and marketing decision makers. The site explains SWEED services and offers, builds trust through portfolio and content, and converts visitors through WhatsApp and contact forms.

## Architecture

- Monorepo managed with Bun.
- Deployable application: Next.js App Router under `apps/web`.
- Public marketing UI is composed from modular React features under `apps/web/src/features`.
- Content is centralized under `apps/web/src/content`.
- Convex is the application backend; its generated AI guidelines govern Convex changes.
- The public demo is served by `sweed-demo.service` on `127.0.0.1:3010` behind Caddy HTTPS.

## Environments

- VPS checkout: `/home/amr/devspace-src/SWEED-Website`.
- Branch: `main`.
- Public demo/staging: `https://sweed-demo.coderaai.com`.
- systemd service: `sweed-demo.service`.
- Package manager: Bun `1.3.7` via `/home/amr/.bun/bin`.
- Deployment requires `bun run check`, `bun run build`, service restart, then local and public HTTP verification.

## Important Paths

- `apps/web/src/app` — App Router layouts, routes, metadata, and state pages.
- `apps/web/src/features/homepage` — modular homepage sections.
- `apps/web/src/content/homepage.ts` — homepage content model.
- `apps/web/public` — public logos, images, and brand assets.
- `DESIGN.md` — SWEED design system contract.
- `PRODUCT.md` — product audience, jobs, voice, and constraints.
- `AGENTS.md` — repository operations, testing, deployment, and Git rules.

## Constraints

- Arabic-first and RTL.
- Preserve SWEED pink `#ed2062` and deep purple `#261b3e`.
- Keep changes modular in React/Next; do not expand legacy static HTML except for urgent temporary fixes.
- Use Bun; do not migrate package managers.
- Do not change the public domain, port, service user, or Caddy route silently.
- Preserve unrelated dirty work.
- Do not push to GitHub without explicit user approval.
- Verify code, build, service, public URL, desktop, and mobile behavior before reporting completion.

## Durable Preferences

- Prefer real implementation and visual verification over proposals alone.
- Improve existing UI without replacing the current stack or rebuilding from scratch.
- Keep copy direct, confident, practical, and free of generic AI marketing language.
- Use existing official SWEED assets whenever available instead of inventing substitutes.
