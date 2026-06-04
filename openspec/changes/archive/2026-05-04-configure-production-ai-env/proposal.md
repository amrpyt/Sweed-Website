# Change: Configure production AI environment

## Why
The AI advisor works on localhost but returns the fallback response on the Vercel production deployment because the required server-side AI environment variables are not configured for the Vercel project.

## What Changes
- Configure the Vercel production environment with the server-only AI provider settings.
- Redeploy production so the Next.js server functions can read the environment at runtime.
- Verify the deployed `/api/ai/advisor` endpoint returns a real advisor response, not fallback.

## Impact
- No application code changes are expected.
- Affects Vercel project environment settings and production deployment.
