## Why

The public AI advisor should remember the immediate chat context without pushing large manual history payloads from the browser. The requested behavior is simple: the agent should receive the last 5 messages from the current conversation.

## What Changes

- Configure Mastra Memory to retrieve exactly the last 5 messages by default.
- Add a stable visitor `resourceId` and conversation `threadId` to the public advisor flow.
- Stop relying on the widget's manually sliced history as the primary memory mechanism.
- Keep the local debug dashboard able to show the effective thread/resource identifiers.

## Impact

- The advisor remembers the current conversation like a normal chat.
- Token usage stays controlled because only the last 5 messages are included.
- Longer-term semantic recall remains out of scope for this change.
