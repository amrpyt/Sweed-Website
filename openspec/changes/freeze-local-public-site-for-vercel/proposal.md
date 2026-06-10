# Proposal

## Problem

The production Vercel deployment can drift from the local public website when local route files, content modules, and static legacy HTML changes are not tracked together.

## Change

- Freeze the current local public website snapshot into a dedicated deploy branch.
- Verify the snapshot through build and browser checks before deployment.
- Deploy the verified local snapshot to Vercel production.

## Non-goals

- No new public site redesign.
- No admin dashboard feature work.
