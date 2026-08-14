export function getSweedReferenceButtonThemeCss(referenceScope: string) {
  return `
${referenceScope} {
  --sweed-button-primary-bg: #261b3e;
  --sweed-button-accent: #ed2062;
  --sweed-button-secondary-bg: #ffffff;
  --sweed-button-secondary-border: rgba(38, 27, 62, 0.18);
  --sweed-button-choice-border: #d9dee8;
}

${referenceScope} .btn {
  display: inline-flex;
  min-height: var(--control-height-md);
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--shape-control);
  padding-block-start: var(--control-padding-block-start);
  padding-block-end: var(--control-padding-block-end);
  padding-inline: var(--inline-lg);
  font-family: var(--font-body);
  font-size: var(--type-body-size);
  font-weight: var(--font-weight-strong);
  line-height: var(--control-text-leading);
  transition:
    transform var(--motion-fast),
    border-color var(--motion-fast),
    background-color var(--motion-fast),
    color var(--motion-fast),
    box-shadow var(--motion-base);
}
${referenceScope} .btn:hover {
  transform: translateY(-2px);
}
${referenceScope} .btn:active {
  transform: translateY(0) scale(0.99);
}
${referenceScope} .btn.btn-sm {
  min-height: var(--control-height-md);
  padding-inline: var(--inline-md);
  font-size: var(--type-small-size);
}
${referenceScope} .btn-primary {
  border-color: var(--sweed-button-primary-bg);
  background: var(--sweed-button-primary-bg);
  color: #ffffff;
  box-shadow: 0 12px 30px rgba(38, 27, 62, 0.18);
}
${referenceScope} .btn-primary:hover,
${referenceScope} .btn-primary:focus-visible {
  border-color: var(--sweed-button-accent);
  background: var(--sweed-button-accent);
  color: #ffffff;
  box-shadow: 0 16px 36px rgba(237, 32, 98, 0.2);
}
${referenceScope} .btn-ghost {
  border-color: var(--sweed-button-secondary-border);
  background: var(--sweed-button-secondary-bg);
  color: #261b3e;
  box-shadow: none;
}
${referenceScope} .btn-ghost:hover,
${referenceScope} .btn-ghost:focus-visible {
  border-color: var(--sweed-button-accent);
  background: rgba(237, 32, 98, 0.08);
  color: var(--sweed-button-accent);
}
${referenceScope} .btn-ghost.light {
  border-color: rgba(255, 255, 255, 0.42);
  background: transparent;
  color: #ffffff;
}
${referenceScope} .btn-ghost.light:hover,
${referenceScope} .btn-ghost.light:focus-visible {
  border-color: var(--sweed-button-accent);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

${referenceScope} .f-btn,
${referenceScope} .mkt-tab,
${referenceScope} .sec-chip,
${referenceScope} .q-opt,
${referenceScope} .st-btn {
  min-height: var(--control-height-sm);
  border: 1px solid var(--sweed-button-choice-border);
  border-radius: var(--shape-control);
  padding-block-start: var(--control-padding-block-start);
  padding-block-end: var(--control-padding-block-end);
  padding-inline: var(--control-padding-inline);
  background: #ffffff;
  color: #6d6e70;
  font-family: var(--font-body);
  font-size: var(--type-small-size);
  font-weight: var(--font-weight-strong);
  line-height: var(--control-text-leading);
  transition:
    border-color var(--motion-fast),
    background-color var(--motion-fast),
    color var(--motion-fast),
    transform var(--motion-fast);
}
${referenceScope} .f-btn:hover,
${referenceScope} .mkt-tab:hover,
${referenceScope} .sec-chip:hover,
${referenceScope} .q-opt:hover,
${referenceScope} .st-btn:hover {
  border-color: var(--sweed-button-accent);
  background: rgba(237, 32, 98, 0.08);
  color: var(--sweed-button-accent);
}
${referenceScope} .f-btn.active,
${referenceScope} .mkt-tab.active,
${referenceScope} .sec-chip.active,
${referenceScope} .q-opt.sel,
${referenceScope} .st-btn.active {
  border-color: #261b3e;
  background: #261b3e;
  color: #ffffff;
}

${referenceScope} .film-tab {
  min-height: var(--control-height-sm);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--shape-control);
  padding-block-start: var(--control-padding-block-start);
  padding-block-end: var(--control-padding-block-end);
  padding-inline: var(--control-padding-inline);
  background: transparent;
  color: rgba(255, 255, 255, 0.78);
  font-family: var(--font-body);
  font-size: var(--type-small-size);
  font-weight: var(--font-weight-strong);
  line-height: var(--control-text-leading);
  transition:
    border-color var(--motion-fast),
    background-color var(--motion-fast),
    color var(--motion-fast);
}
${referenceScope} .film-tab:hover {
  border-color: var(--sweed-button-accent);
  color: #ffffff;
}
${referenceScope} .film-tab.active {
  border-color: var(--sweed-button-accent);
  background: #ffffff;
  color: #261b3e;
}

${referenceScope} .drawer-btn {
  display: inline-flex;
  min-height: var(--control-height-sm);
  align-items: center;
  border-radius: var(--shape-control);
  padding-block-start: var(--control-padding-block-start);
  padding-block-end: var(--control-padding-block-end);
  padding-inline: var(--inline-xs);
  color: #261b3e;
  font-family: var(--font-body);
  font-weight: var(--font-weight-strong);
  line-height: var(--control-text-leading);
  transition:
    background-color var(--motion-fast),
    color var(--motion-fast);
}
${referenceScope} .drawer-btn:hover {
  background: rgba(237, 32, 98, 0.08);
  color: var(--sweed-button-accent);
}
${referenceScope} .q-skip {
  display: flex;
  width: fit-content;
  min-height: var(--control-height-sm);
  align-items: center;
  justify-content: center;
  margin-inline: auto;
  border-radius: var(--shape-control);
  padding-block-start: var(--control-padding-block-start);
  padding-block-end: var(--control-padding-block-end);
  padding-inline: var(--inline-xs);
  font-family: var(--font-body);
  line-height: var(--control-text-leading);
  transition:
    background-color var(--motion-fast),
    color var(--motion-fast);
}
${referenceScope} .q-skip:hover {
  background: rgba(237, 32, 98, 0.08);
  color: var(--sweed-button-accent);
}
${referenceScope} .ov-close {
  width: var(--control-height-sm);
  min-width: var(--control-height-sm);
  height: var(--control-height-sm);
  min-height: var(--control-height-sm);
  border: 1px solid var(--sweed-button-choice-border);
  border-radius: var(--shape-control);
  background: #ffffff;
  color: #261b3e;
  transition:
    border-color var(--motion-fast),
    background-color var(--motion-fast),
    color var(--motion-fast);
}
${referenceScope} .ov-close:hover {
  border-color: var(--sweed-button-accent);
  background: rgba(237, 32, 98, 0.08);
  color: var(--sweed-button-accent);
}

${referenceScope} .btn:focus-visible,
${referenceScope} .f-btn:focus-visible,
${referenceScope} .mkt-tab:focus-visible,
${referenceScope} .film-tab:focus-visible,
${referenceScope} .sec-chip:focus-visible,
${referenceScope} .q-opt:focus-visible,
${referenceScope} .st-btn:focus-visible,
${referenceScope} .drawer-btn:focus-visible,
${referenceScope} .q-skip:focus-visible,
${referenceScope} .ov-close:focus-visible,
${referenceScope} .faq-q:focus-visible {
  outline: 3px solid rgba(237, 32, 98, 0.3);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  ${referenceScope} .btn,
  ${referenceScope} .f-btn,
  ${referenceScope} .mkt-tab,
  ${referenceScope} .film-tab,
  ${referenceScope} .sec-chip,
  ${referenceScope} .q-opt,
  ${referenceScope} .st-btn,
  ${referenceScope} .drawer-btn,
  ${referenceScope} .q-skip,
  ${referenceScope} .ov-close {
    transition: none;
  }
  ${referenceScope} .btn:hover,
  ${referenceScope} .btn:active {
    transform: none;
  }
}
`;
}
