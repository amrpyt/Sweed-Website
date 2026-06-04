## Why

SWEED needs a real Mastra Studio workspace for the AI advisor so the team can inspect agents, traces, logs, message history, and prompt/editor configuration instead of relying only on the custom local debug page.

## What Changes

- Add a dedicated `src/mastra` project registered with the SWEED advisor agent.
- Configure the advisor with the Rork OpenAI-compatible chat completions model through the AI SDK compatible provider.
- Add Mastra Studio and server scripts.
- Add Mastra Editor so prompts can be managed from Studio with versioned drafts.
- Add Mastra Memory with LibSQL storage so Studio can retain thread/message history.
- Keep local storage out of git and allow `MASTRA_STORAGE_URL` override for production.

## Impact

- Operators can open `http://localhost:4111` during development and inspect the advisor in Mastra Studio.
- Prompt work can move into a versioned Studio workflow.
- Conversation history is persisted locally for Studio testing.
- Cloud deployment still requires Mastra account login and environment setup before running deploy commands.
