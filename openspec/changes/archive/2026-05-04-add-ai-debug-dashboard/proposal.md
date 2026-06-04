## Why

The live AI advisor needs a local operator view for debugging conversations, runtime config, prompt text, and the current curated website knowledge before moving to persistent Mastra memory and cloud observability.

## What Changes

- Add an in-memory advisor debug event store.
- Record advisor request/response metadata for local inspection.
- Add `/admin/ai-debug` UI and `/api/admin/ai-debug` JSON endpoint.
- Keep the dashboard disabled by default in production unless explicitly enabled.

## Impact

- Faster local debugging of customer conversations and fallbacks.
- No external data transfer for this local debug layer.
- Production use still requires authentication before exposing message logs.

