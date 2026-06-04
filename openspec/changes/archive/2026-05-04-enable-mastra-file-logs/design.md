## Context

Mastra Studio has two log paths. The legacy `/api/logs` endpoint reads from logger transports. The current Studio Logs page reads from `/api/observability/logs`, which uses the storage `observability` domain.

The local runtime was using `LibSQLStore` for all domains. Its observability domain in this version does not support `listLogs`, so Studio returned a 500 error.

## Goals / Non-Goals

**Goals:**

- Keep durable LibSQL storage for memory, editor versions, and runtime data.
- Add a queryable logger transport for classic log endpoints.
- Override only the local observability domain with a provider that supports `listLogs`.
- Keep local runtime artifacts ignored by git.

**Non-Goals:**

- Build production-grade observability.
- Add cloud logging credentials.
- Persist observability logs across local process restarts.

## Decisions

1. Use `PinoLogger` with `FileTransport` for the logger transport.
   - Rationale: it is the Mastra-supported local file transport and exposes `listLogs`.
   - Alternative considered: keep default logger. Rejected because it cannot query local logs.

2. Use `MastraCompositeStore` with LibSQL as default and in-memory observability override.
   - Rationale: this fixes Studio `/logs` without weakening durable memory/editor storage.
   - Alternative considered: replace all storage with `InMemoryStore`. Rejected because it would lose editor versions and memory on restart.

## Risks / Trade-offs

- [Risk] Observability logs are not durable locally. -> Mitigation: acceptable for v1 local Studio diagnostics; production can use a real observability backend later.
- [Risk] File logs and observability logs are separate views. -> Mitigation: both endpoints no longer fail, and Studio's visible Logs page has a supported observability domain.
