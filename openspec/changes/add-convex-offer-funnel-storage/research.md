# Research

## Sources

- Convex Next.js App Router docs: Convex supports Next.js App Router apps and exposes server-callable functions.
- Convex agent setup guidance: initialize a `convex/` backend, install generated AI guidelines, then write schema/functions.
- Vercel CLI docs: a linked project can deploy from the CLI with `vercel deploy --prod`.
- Vercel environment variable docs: secrets and runtime config should live in project environment variables.

## Decisions

- Use Convex for offer funnel settings persistence because Vercel serverless functions should not rely on local filesystem writes for durable production data.
- Keep the frontend admin UI using the current REST API shape to avoid broad UI churn.
- Replace the file settings store with a Convex-backed store for production-safe writes.
- Keep Basic Auth in Vercel middleware with `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
