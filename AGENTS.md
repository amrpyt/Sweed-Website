Use OpenSpec.

## Project Direction

- The current site must move toward modular React/Next implementation.
- No feature work should start without selecting and applying the relevant Superpowers workflow and agent skills first.
- Every completed atomic edit should be committed before starting the next independent task.
- Do not add new product features directly inside legacy/static HTML files under `apps/web/site/` unless it is an urgent temporary production fix.
- Always implement website changes in the modular React/Next code first. Do not edit the legacy/static HTML path as the normal solution.
- Prefer building or updating focused React modules/components under `apps/web/src/features`, `apps/web/src/components`, or route-level Next files.
- If a legacy HTML patch is unavoidable, document it as temporary, keep it small, and create/follow a Superpowers-backed agent-skills task to migrate that behavior into modular React.
- For homepage work, the target structure is section-based React modules: hero, problems, quick help, partners, portfolio, services, offers, products, articles, FAQ, and contact.
- Avoid expanding runtime DOM patch scripts. Treat existing runtime scripts as migration debt to remove once the related section is converted to React.

## Project Operations Reference

Last verified: **2026-07-08**. Update this section whenever the demo domain, VPS path, runtime service, reverse-proxy route, package manager, or deployment procedure changes.

### Repository and Runtime

- VPS checkout: `/home/amr/devspace-src/SWEED-Website`
- Default branch: `main`; verify the active branch before committing, pulling, or pushing.
- Git remote: `github-sweed:amrpyt/Sweed-Website.git`
- GitHub access uses an existing VPS deploy-key configuration. Never print, copy, replace, or commit private keys, tokens, credentials, or `.env` values.
- Package manager: Bun. The repository declares `bun@1.3.7` and uses `bun.lock`; do not replace it with npm, pnpm, or Yarn unless the project owner explicitly requests a migration.
- On the VPS, use Bun through `/home/amr/.bun/bin` when it is not already available in `PATH`.
- The deployable Next.js application is `apps/web`.

### Public Demo Environment

- Canonical demo URL: `https://sweed-demo.coderaai.com`
- This URL is a **demo/staging environment**, not the production website.
- systemd service: `sweed-demo.service`
- Service unit: `/etc/systemd/system/sweed-demo.service`
- Service user/group: `amr:amr`
- Service working directory: `/home/amr/devspace-src/SWEED-Website`
- Internal listener: `127.0.0.1:3010`
- Caddy configuration: `/etc/caddy/Caddyfile`
- Caddy maps `sweed-demo.coderaai.com` to `127.0.0.1:3010` and handles HTTPS plus compression.
- Do not expose port `3010` publicly or change the domain, port, service user, or Caddy route silently. Document and verify any infrastructure change.
- After changing Caddy configuration, run `caddy validate --config /etc/caddy/Caddyfile` before `systemctl reload caddy`, then verify the public HTTPS URL.

### Standard Validation and Demo Deployment

Run commands from the repository root unless a command explicitly changes directory.

```bash
# Install only when dependencies are missing or the lockfile changed.
PATH=/home/amr/.bun/bin:$PATH bun install --frozen-lockfile

# Required before deployment.
PATH=/home/amr/.bun/bin:$PATH bun run check
PATH=/home/amr/.bun/bin:$PATH bun run build

# Normal deployment: restart the configured demo service after a successful build.
systemctl restart sweed-demo.service

# If the systemd unit itself changed, use these commands instead of the normal restart.
systemctl daemon-reload
systemctl restart sweed-demo.service

# Verify both the local runtime and public HTTPS route.
systemctl is-active sweed-demo.service
curl -I http://127.0.0.1:3010/
curl -I https://sweed-demo.coderaai.com/
```

Expected healthy state:

- `systemctl is-active sweed-demo.service` returns `active`.
- The local and public HTTP checks return a successful status, normally `200`.
- Never report deployment success from a build result alone; verify the service and public URL.

### Browser and Regression Testing

- Playwright configuration: `apps/web/playwright.config.ts`
- Local demo test base URL: `http://localhost:3010`
- The VPS has system Chromium available at `/usr/bin/chromium-browser`; the Playwright config supports the system executable.
- Run focused tests for the changed feature, then the relevant public-site smoke suite when shared navigation or homepage behavior changes.

Example:

```bash
cd apps/web
PLAYWRIGHT_BASE_URL=http://localhost:3010 \
  PATH=/home/amr/.bun/bin:$PATH \
  bun x playwright test tests/smoke/staggered-menu.spec.ts -c playwright.config.ts
```

For visual or interaction bugs, do not rely only on computed styles or test attributes. Capture and inspect screenshots at representative desktop and mobile viewport sizes.

### Git and Delivery Rules

- Commit completed atomic changes before starting an independent task, as stated above.
- Do not push to GitHub unless the user explicitly asks for a push.
- Before declaring a task complete, run `git status --short --branch` and report whether the branch is ahead of `origin/main`.
- Do not store generated screenshots, temporary review assets, service credentials, or VPS-only secrets in the repository.
- When sharing the demo with the user, use the canonical URL above and mention that a hard refresh may be required after CSS or JavaScript deployments.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`apps/web/convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
