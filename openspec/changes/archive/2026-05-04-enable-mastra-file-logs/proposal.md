## Why

Mastra Studio `/logs` currently fails with `This storage provider does not support listing logs` because the local Mastra runtime only configures LibSQL storage and no queryable logger transport.

## What Changes

- Add a file-backed Mastra logger transport for local Studio logs.
- Store local logs under `.mastra-data/sweed-studio.log`.
- Keep memory/editor storage on LibSQL.

## Impact

- The Studio Logs page can query local logs through the configured transport.
- Local log files become runtime artifacts and should stay ignored by git.
