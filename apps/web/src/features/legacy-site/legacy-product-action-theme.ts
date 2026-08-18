const productActionArrowSvg = `<svg aria-hidden="true" fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.75" viewBox="0 0 24 24" width="18"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg>`;

function getLegacyProductActionLabel(content: string) {
  const spanLabel = content.match(/<span\b[^>]*>([\s\S]*?)<\/span>/i)?.[1]?.trim();
  if (spanLabel) return spanLabel;

  return content
    .replace(/<i\b[^>]*>[\s\S]*?<\/i>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function decorateLegacyProductActionButtons(input: string) {
  return input.replace(
    /<button\b([^>]*\bclass=["'][^"']*\b(?:product-btn|help-btn)\b[^"']*["'][^>]*)>([\s\S]*?)<\/button>/gi,
    (match, attributes: string, content: string) => {
      if (content.includes('class="sweed-action-fill"')) return match;

      const label = getLegacyProductActionLabel(content);

      return `<button${attributes}><span aria-hidden="true" class="sweed-action-fill"></span><span aria-hidden="true" class="sweed-action-icon">${productActionArrowSvg}</span><span class="sweed-action-label">${label}</span></button>`;
    },
  );
}

export const legacyProductActionRuntime = `
(() => {
  if (window.__sweedProductActionRuntime) return;
  window.__sweedProductActionRuntime = true;

  const arrowSvg = '${productActionArrowSvg}';
  const selector = '.sweed-legacy-page-products .product-btn, .sweed-legacy-page-products .help-btn';

  const decorate = (button) => {
    if (!(button instanceof HTMLButtonElement) || button.querySelector('.sweed-action-fill')) return;

    const labelText = button.textContent?.trim() || 'اطلب الآن';
    const fill = document.createElement('span');
    fill.className = 'sweed-action-fill';
    fill.setAttribute('aria-hidden', 'true');

    const icon = document.createElement('span');
    icon.className = 'sweed-action-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = arrowSvg;

    const label = document.createElement('span');
    label.className = 'sweed-action-label';
    label.textContent = labelText;

    button.replaceChildren(fill, icon, label);
  };

  document.querySelectorAll(selector).forEach(decorate);

  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      const target = record.target instanceof Element ? record.target : record.target.parentElement;
      const button = target?.closest?.('.product-btn, .help-btn');
      if (button && !button.querySelector('.sweed-action-fill')) queueMicrotask(() => decorate(button));
    });
  });

  const root = document.querySelector('.sweed-legacy-page-products');
  if (root) observer.observe(root, { childList: true, subtree: true });
})();
`;

export function guardLegacyProductRuntimeScript(content: string) {
  return content.replace(
    /\bheader\.style\.transform\s*=\s*([^;]+);/g,
    "if (header) header.style.transform = $1;",
  );
}

export function getLegacyProductActionThemeCss() {
  return `
<style data-sweed-product-actions="true">
.sweed-legacy-page-products {
  --legacy-action-inset: var(--cds-spacing-02);
  --legacy-action-icon-size: var(--cds-spacing-07);
  --legacy-action-inner-radius: calc(var(--shape-control) - var(--legacy-action-inset));
}

.sweed-legacy-page-products .product-btn,
.sweed-legacy-page-products .help-btn {
  position: relative !important;
  display: grid !important;
  grid-template-columns: var(--legacy-action-icon-size) minmax(0, 1fr) !important;
  column-gap: var(--inline-sm) !important;
  min-height: var(--control-height-md) !important;
  align-items: center !important;
  overflow: hidden !important;
  border: 1px solid var(--legacy-action-border) !important;
  border-radius: var(--shape-control) !important;
  padding: var(--legacy-action-inset) calc(var(--legacy-action-inset) + var(--inline-md)) var(--legacy-action-inset) var(--legacy-action-inset) !important;
  background: var(--legacy-action-bg) !important;
  color: var(--legacy-action-color) !important;
  box-sizing: border-box !important;
  direction: ltr !important;
  font-family: var(--font-body) !important;
  font-weight: var(--font-weight-strong) !important;
  line-height: var(--control-text-leading) !important;
  transform: translateZ(0) !important;
  transition:
    transform var(--motion-fast),
    border-color var(--motion-fast),
    color var(--motion-fast),
    box-shadow var(--motion-base) !important;
}

.sweed-legacy-page-products .product-btn {
  --legacy-action-bg: #261b3e;
  --legacy-action-color: #ffffff;
  --legacy-action-fill: var(--color-action, #e2185b);
  --legacy-action-fill-color: #ffffff;
  --legacy-action-border: #261b3e;
}

.sweed-legacy-page-products .help-btn {
  --legacy-action-bg: #ffffff;
  --legacy-action-color: #261b3e;
  --legacy-action-fill: #261b3e;
  --legacy-action-fill-color: #ffffff;
  --legacy-action-border: rgba(255,255,255,.72);
}

.sweed-legacy-page-products .sweed-action-fill {
  position: absolute;
  z-index: 0;
  inset: var(--legacy-action-inset);
  border-radius: var(--legacy-action-inner-radius);
  background: var(--legacy-action-fill);
  clip-path: inset(0 calc(100% - var(--legacy-action-icon-size)) 0 0 round var(--legacy-action-inner-radius));
  transition: clip-path var(--motion-layout);
  pointer-events: none;
}

.sweed-legacy-page-products .product-btn:hover,
.sweed-legacy-page-products .product-btn:focus-visible,
.sweed-legacy-page-products .help-btn:hover,
.sweed-legacy-page-products .help-btn:focus-visible {
  color: var(--legacy-action-fill-color) !important;
  transform: translateY(-2px) !important;
}

.sweed-legacy-page-products .product-btn:hover .sweed-action-fill,
.sweed-legacy-page-products .product-btn:focus-visible .sweed-action-fill,
.sweed-legacy-page-products .help-btn:hover .sweed-action-fill,
.sweed-legacy-page-products .help-btn:focus-visible .sweed-action-fill {
  clip-path: inset(0 0 0 0 round var(--legacy-action-inner-radius));
}

.sweed-legacy-page-products .product-btn:active,
.sweed-legacy-page-products .help-btn:active {
  transform: translateY(0) scale(.99) !important;
}

.sweed-legacy-page-products .sweed-action-icon {
  position: relative;
  z-index: 2;
  display: inline-grid;
  grid-column: 1;
  place-items: center;
  width: var(--legacy-action-icon-size);
  height: var(--legacy-action-icon-size);
  color: var(--legacy-action-fill-color);
  font-size: .88rem !important;
  pointer-events: none;
}

.sweed-legacy-page-products .sweed-action-icon svg {
  display: inline-block;
}

.sweed-legacy-page-products .sweed-action-label {
  position: relative;
  z-index: 2;
  grid-column: 2;
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  justify-self: center;
  direction: rtl;
  color: currentColor;
  line-height: var(--control-text-leading);
  transform: translateY(calc(-1 * var(--control-text-optical-shift)));
  pointer-events: none;
}

.sweed-legacy-page-products .product-btn:focus-visible,
.sweed-legacy-page-products .help-btn:focus-visible {
  outline: 3px solid rgba(237,32,98,.28) !important;
  outline-offset: 3px !important;
}

@media (prefers-reduced-motion: reduce) {
  .sweed-legacy-page-products .product-btn,
  .sweed-legacy-page-products .help-btn,
  .sweed-legacy-page-products .sweed-action-fill {
    transition: none !important;
  }

  .sweed-legacy-page-products .product-btn:hover,
  .sweed-legacy-page-products .product-btn:active,
  .sweed-legacy-page-products .help-btn:hover,
  .sweed-legacy-page-products .help-btn:active {
    transform: none !important;
  }
}
</style>`;
}
