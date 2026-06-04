## Why

The operator wants to control the advisor's full business prompt from the dashboard, without editing code or redeploying.

## What Changes

- Treat the published Mastra Studio/Editor agent instructions as the source of truth for the advisor business prompt.
- Keep a code seed only for first-run/local fallback.
- Use Mastra Editor draft/publish/version history for prompt changes.
- Keep non-prompt runtime safety checks, such as sensitive-data blocking, outside the editable prompt.

## Impact

- Prompt changes can happen from Mastra Studio.
- Published prompt versions can be reviewed, rolled back, and tested.
- Code remains responsible for platform safety and provider wiring.
