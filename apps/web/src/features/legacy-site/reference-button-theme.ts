export function getSweedReferenceButtonThemeCss(referenceScope: string) {
  return `
${referenceScope} {
  --sweed-button-primary-bg: #261b3e;
  --sweed-button-accent: #ed2062;
  --sweed-button-secondary-bg: #ffffff;
  --sweed-button-secondary-border: rgba(38, 27, 62, 0.18);
  --sweed-button-choice-border: #d9dee8;
  --sweed-action-inset: var(--cds-spacing-02);
  --sweed-action-icon-size: var(--cds-spacing-07);
  --sweed-action-gap: var(--inline-sm);
  --sweed-action-inner-radius: calc(var(--shape-control) - var(--sweed-action-inset));
}

${referenceScope} .btn {
  --sweed-action-bg: var(--sweed-button-primary-bg);
  --sweed-action-color: #ffffff;
  --sweed-action-fill: var(--color-action, #e2185b);
  --sweed-action-fill-color: #ffffff;
  --sweed-action-border: var(--sweed-button-primary-bg);
  position: relative;
  display: grid;
  grid-template-columns: var(--sweed-action-icon-size) minmax(0, 1fr);
  column-gap: var(--sweed-action-gap);
  min-height: var(--control-height-md);
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--sweed-action-border);
  border-color: var(--sweed-action-border) !important;
  border-radius: var(--shape-control);
  padding: var(--sweed-action-inset) calc(var(--sweed-action-inset) + var(--inline-md)) var(--sweed-action-inset) var(--sweed-action-inset);
  background: var(--sweed-action-bg) !important;
  color: var(--sweed-action-color) !important;
  box-sizing: border-box;
  cursor: pointer;
  direction: ltr;
  font-family: var(--font-body);
  font-size: var(--type-body-size);
  font-weight: var(--font-weight-strong);
  line-height: var(--control-text-leading);
  text-decoration: none;
  white-space: nowrap;
  transform: translateZ(0);
  transition:
    transform var(--motion-fast),
    border-color var(--motion-fast),
    color var(--motion-fast),
    box-shadow var(--motion-base);
}
${referenceScope} .btn:hover,
${referenceScope} .btn:focus-visible {
  color: var(--sweed-action-fill-color) !important;
  transform: translateY(-2px);
}
${referenceScope} .btn:active {
  transform: translateY(0) scale(0.99);
}
${referenceScope} .btn.btn-sm {
  min-height: var(--control-height-md);
  font-size: var(--type-small-size);
}
${referenceScope} .btn .sweed-action-fill {
  position: absolute;
  z-index: 0;
  inset: var(--sweed-action-inset);
  border-radius: var(--sweed-action-inner-radius);
  background: var(--sweed-action-fill);
  clip-path: inset(0 calc(100% - var(--sweed-action-icon-size)) 0 0 round var(--sweed-action-inner-radius));
  opacity: 1;
  transition:
    clip-path var(--motion-layout),
    opacity var(--motion-instant);
  pointer-events: none;
}
${referenceScope} .btn:hover .sweed-action-fill,
${referenceScope} .btn:focus-visible .sweed-action-fill {
  clip-path: inset(0 0 0 0 round var(--sweed-action-inner-radius));
}
${referenceScope} .btn .sweed-action-icon {
  position: relative;
  z-index: 3;
  display: inline-grid;
  grid-column: 1;
  place-items: center;
  width: var(--sweed-action-icon-size);
  height: var(--sweed-action-icon-size);
  border-radius: var(--sweed-action-inner-radius);
  color: var(--sweed-action-fill-color);
  pointer-events: none;
}
${referenceScope} .btn .sweed-action-icon svg {
  display: inline-block;
}
${referenceScope} .btn .sweed-action-label {
  position: relative;
  z-index: 2;
  grid-column: 2;
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  justify-self: center;
  color: currentColor;
  direction: rtl;
  line-height: var(--control-text-leading);
  text-align: center;
  white-space: nowrap;
  transform: translateY(calc(-1 * var(--control-text-optical-shift)));
  pointer-events: none;
}
${referenceScope} .btn-primary {
  --sweed-action-bg: var(--sweed-button-primary-bg);
  --sweed-action-color: #ffffff;
  --sweed-action-fill: var(--color-action, #e2185b);
  --sweed-action-border: var(--sweed-button-primary-bg);
  box-shadow: 0 12px 30px rgba(38, 27, 62, 0.18);
}
${referenceScope} .btn-primary:hover,
${referenceScope} .btn-primary:focus-visible {
  border-color: var(--sweed-button-accent) !important;
  box-shadow: 0 16px 36px rgba(237, 32, 98, 0.2);
}
${referenceScope} .btn-ghost {
  --sweed-action-bg: var(--sweed-button-secondary-bg);
  --sweed-action-color: #261b3e;
  --sweed-action-fill: #261b3e;
  --sweed-action-border: var(--sweed-button-secondary-border);
  box-shadow: 0 10px 26px rgba(38, 27, 62, 0.1);
}
${referenceScope} .btn-ghost:hover,
${referenceScope} .btn-ghost:focus-visible {
  border-color: #261b3e !important;
  box-shadow: 0 16px 36px rgba(38, 27, 62, 0.16);
}
${referenceScope} .btn-ghost.light {
  --sweed-action-bg: #ffffff;
  --sweed-action-color: #261b3e;
  --sweed-action-fill: #261b3e;
  --sweed-action-border: rgba(255, 255, 255, 0.72);
  color: #261b3e !important;
}
${referenceScope} .btn-ghost.light:hover,
${referenceScope} .btn-ghost.light:focus-visible {
  border-color: #ffffff !important;
  color: #ffffff !important;
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
  ${referenceScope} .btn .sweed-action-fill {
    transition: none;
  }
  ${referenceScope} .btn:hover,
  ${referenceScope} .btn:active {
    transform: none;
  }
}
`;
}
