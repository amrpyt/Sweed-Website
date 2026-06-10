# Proposal

## Problem

The offer funnel admin settings currently persist to a local JSON file. That is not durable for a Vercel production deployment.

## Change

- Add Convex to the existing Next.js project.
- Create a Convex table for offer funnel settings.
- Read and write offer funnel settings through Convex from the existing admin API.
- Configure Vercel environment variables for Convex and admin auth before production deploy.

## Non-goals

- No full analytics dashboard in this change.
- No complex user auth system.
- No custom server.
