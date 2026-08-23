# Claude Public Vercel Autodeploy Plan

**Goal:** Let the dedicated Claude branch publish itself to a public Vercel URL without Vercel login, without touching `main`, and without exposing broad Vercel credentials to the collaborator.

## Contract

- Source branch: `claude/sweed-engineering-setup-hy7zhz`
- Public site: `https://sweed-claude-public.vercel.app`
- Production `main` remains independent at `https://sweed-website.vercel.app`.
- The VPS polls the Claude branch every 60 seconds and deploys only when its SHA changes.
- Vercel project: `sweed-claude-public` under the separate `83freesiaibex-8885s-projects` account.
- The public Claude project has SSO deployment protection disabled.

## Implementation

- [x] Create the independent Vercel project and public alias.
- [x] Verify anonymous HTTP 200 with no Vercel login/checkpoint.
- [x] Install `/usr/local/sbin/sweed-claude-public-deploy` to fetch/archive only the Claude branch and deploy it to the independent Vercel project.
- [x] Add SHA state tracking so unchanged branches are a no-op.
- [x] Install and enable `sweed-claude-public-deploy.timer` with a 60-second polling interval.
- [x] Prove end-to-end autodeploy with empty verification commit `7957d63` on the Claude branch.
- [x] Verify the timer detected the new SHA without a manual deploy, Vercel completed the build, the alias updated, and anonymous HTTP returned 200.
- [x] Verify `main` remained unchanged at `90ce8ca` during the autodeploy test.
