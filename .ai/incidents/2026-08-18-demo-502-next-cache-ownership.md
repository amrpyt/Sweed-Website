# Demo 502 — Next build ownership

Date: 2026-08-18
Status: resolved
Environment: `https://sweed-demo.coderaai.com`

## Impact

The public demo returned HTTP 502 because Caddy could not reach the Next.js service on `127.0.0.1:3010` while `sweed-demo.service` was stopped during a concurrent deployment/build window.

## Root Cause

The clean production `.next` tree had been copied into the service checkout as `root:root`. The systemd service runs as `amr`, so Next could not create `apps/web/.next/cache/images` and repeatedly logged `EACCES: permission denied` during image-cache writes.

## Timeline

- The copied `.next` tree was owned by `root:root`.
- Next image optimization attempted to create `.next/cache/images` and logged `EACCES` failures.
- A concurrent build session stopped `sweed-demo.service`, exposing the outage as HTTP 502 through Caddy.
- The concurrent build finished and restarted the service.
- The deployed `.next` ownership was then repaired recursively to `amr:amr`.

## Repair

Ran `chown -R amr:amr apps/web/.next` after confirming no active Next build was writing the directory.

## Verification

- `sweed-demo.service`: active.
- Listener: `127.0.0.1:3010`.
- Local `/`: HTTP 200.
- Local `/crm-ai-demo`: HTTP 200.
- Public `/`: HTTP 200.
- Public `/crm-ai-demo`: HTTP 200.
- Public browser load: complete, zero broken images, zero horizontal overflow, no browser errors.
- Service journal after recovery: no fresh `EACCES`, image-cache write failures, or unhandled rejections.

## Prevention

Any deployment that copies a clean build artifact from a root-owned worktree into the service checkout must explicitly restore the complete `.next` tree to `amr:amr` before starting `sweed-demo.service`. Verify ownership as part of deployment readiness, not only the `BUILD_ID`.
