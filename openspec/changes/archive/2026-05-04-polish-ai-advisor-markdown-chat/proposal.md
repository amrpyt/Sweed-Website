## Why

Live AI responses contain Markdown and occasional model-formatted links. Rendering them as plain text makes the advisor look unfinished.

## What Changes

- Render assistant and user messages through a constrained Markdown renderer.
- Improve chat bubble spacing, icons, shadows, and link styling.
- Sanitize internal links that the model returns in angle-bracket form.

## Impact

- Better visitor-facing AI chat polish.
- No change to the legacy website layout.

