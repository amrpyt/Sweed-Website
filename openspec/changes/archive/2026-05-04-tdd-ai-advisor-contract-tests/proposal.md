## Why

The AI advisor now has real server behavior. We need fast unit tests that prove request validation and server AI configuration behavior before browser smoke tests run.

## What Changes

- Add Bun unit-test coverage for advisor request contracts.
- Add a regression test for server AI environment lookup at call time.
- Add a `bun run unit` script.

## Impact

- Faster feedback before Playwright smoke tests.
- Safer deployment configuration changes.

