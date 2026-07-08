# Document Project Operations in AGENTS.md

## Summary

Add a stable operations reference to the repository-level `AGENTS.md` so future agents can reliably find the current demo URL, VPS checkout, runtime service, reverse-proxy route, package manager, validation commands, and deployment procedure.

## Scope

- Record only durable project and deployment facts.
- Do not record private keys, tokens, passwords, or secret values.
- Mark the public URL as a demo environment rather than production.
- Document the required validation and restart flow after website changes.
- Preserve the existing architectural and Convex instructions.

## Success Criteria

- A newly started agent can locate the project, run checks, build it, restart the demo, and verify the public URL using `AGENTS.md` alone.
- The document warns agents not to expose credentials or silently change infrastructure.
- The documented commands match the current VPS configuration.
