import { describe, expect, test } from "bun:test";
import { getReferenceHtml, type ReferenceHtmlPage } from "./reference-html-sources";
import {
  applySweedReferenceTheme,
  decorateReferenceActionButtons,
  guardReferenceScript,
  scopeReferenceHeadHtml,
  stripReferenceChrome,
  wrapReferenceInlineScript,
} from "./reference-html-normalizer";

const heroMarkers = {
  about: 'id="about-hero"',
  services: 'id="services-hero"',
  portfolio: 'class="w-hero"',
  offers: 'class="o-hero"',
} as const satisfies Record<ReferenceHtmlPage, string>;

function extract(pattern: RegExp, html: string) {
  return pattern.exec(html)?.[1] ?? "";
}

describe("reference page integration normalization", () => {
  for (const page of Object.keys(heroMarkers) as ReferenceHtmlPage[]) {
    test(`${page} keeps its body while stripping duplicate site chrome`, () => {
      const source = getReferenceHtml(page);
      const body = extract(/<body[^>]*>([\s\S]*?)<\/body>/i, source);
      const stripped = stripReferenceChrome(body);

      expect(stripped).toContain(heroMarkers[page]);
      expect(stripped).not.toMatch(/<nav\b[^>]*class=["'][^"']*\bnav\b/i);
      expect(stripped).not.toMatch(/<footer\b/i);
    });
  }

  test("scopes broad reference selectors to the reference body", () => {
    const source = getReferenceHtml("services");
    const head = extract(/<head[^>]*>([\s\S]*?)<\/head>/i, source);
    const scoped = scopeReferenceHeadHtml(head);

    expect(scoped).toContain(".sweed-reference-page");
    expect(scoped).toContain(".sweed-reference-page .container");
    expect(scoped).toContain(".sweed-reference-page .btn");
    expect(scoped).not.toMatch(/(?:^|})\s*body\s*\{/m);
    expect(scoped).not.toMatch(/(?:^|})\s*footer\s*\{/m);
  });

  test("bridges reference typography and brand colors to the homepage identity", () => {
    const source = getReferenceHtml("services");
    const head = extract(/<head[^>]*>([\s\S]*?)<\/head>/i, source);
    const scoped = scopeReferenceHeadHtml(head);
    const normalized = scoped.toLowerCase();

    expect(scoped).toContain('data-sweed-reference-theme="true"');
    expect(scoped).toContain('"SWEED Helvetica Arabic"');
    expect(normalized).toContain("#ed2062");
    expect(normalized).toContain("#261b3e");
    expect(normalized).not.toContain("#d6246e");
    expect(normalized).not.toContain("#241238");
    expect(scoped).not.toContain("fonts.googleapis.com");
    expect(scoped).not.toContain("IBM Plex Sans Arabic");
    expect(scoped).toContain('.sweed-reference-page h6 {\n  color: inherit;');
  });

  test("bridges reference controls to the shared SWEED button system", () => {
    const source = getReferenceHtml("offers");
    const head = extract(/<head[^>]*>([\s\S]*?)<\/head>/i, source);
    const scoped = scopeReferenceHeadHtml(head);

    expect(scoped).toContain("--sweed-button-primary-bg: #261b3e;");
    expect(scoped).toContain("--sweed-button-accent: #ed2062;");
    expect(scoped).toContain("--sweed-action-icon-size: var(--cds-spacing-07);");
    expect(scoped).toContain("border-radius: var(--shape-control);");
    expect(scoped).toContain("min-height: var(--control-height-md);");
    expect(scoped).toContain("line-height: var(--control-text-leading);");
    expect(scoped).toContain("background: var(--sweed-action-bg) !important;");
    expect(scoped).toContain("border-color: var(--sweed-action-border) !important;");
    expect(scoped).toContain("color: var(--sweed-action-color) !important;");
    expect(scoped).toContain("clip-path: inset(0 calc(100% - var(--sweed-action-icon-size)) 0 0 round var(--sweed-action-inner-radius));");
    expect(scoped).toContain("clip-path: inset(0 0 0 0 round var(--sweed-action-inner-radius));");
    expect(scoped).toContain("color: #261b3e !important;");
    expect(scoped).toContain("color: #ffffff !important;");
    expect(scoped).toContain("padding-block-start: var(--control-padding-block-start);");
    expect(scoped).toContain("padding-block-end: var(--control-padding-block-end);");
    expect(scoped).toContain(`${referenceButtonSelector(".btn-primary")} {`);
    expect(scoped).toContain(`${referenceButtonSelector(".btn-ghost")} {`);
    expect(scoped).toContain(referenceButtonSelector(".f-btn"));
    expect(scoped).toContain(referenceButtonSelector(".mkt-tab"));
    expect(scoped).toContain(`${referenceButtonSelector(".film-tab")} {`);
    expect(scoped).toContain(referenceButtonSelector(".sec-chip"));
    expect(scoped).toContain(referenceButtonSelector(".q-opt"));
    expect(scoped).toContain(referenceButtonSelector(".st-btn"));
    expect(scoped).toContain(`${referenceButtonSelector(".drawer-btn")} {`);
    expect(scoped).toContain(`${referenceButtonSelector(".q-skip")} {`);
    expect(scoped).toContain(`${referenceButtonSelector(".ov-close")} {`);
    expect(scoped).toContain(":focus-visible");
    expect(scoped).toContain("@media (prefers-reduced-motion: reduce)");

    const decorated = decorateReferenceActionButtons('<button class="btn btn-primary">احجز استشارتك</button>');
    expect(decorated).toContain('class="sweed-action-fill"');
    expect(decorated).toContain('class="sweed-action-icon"');
    expect(decorated).toContain('class="sweed-action-label">احجز استشارتك</span>');

    const choices = decorateReferenceActionButtons(
      '<button class="f-btn">فلتر</button><button class="st-btn">خدمة</button><button class="drawer-btn">التفاصيل</button>',
    );
    expect(choices).not.toContain('class="sweed-action-fill"');
  });

  test("themes inline SVG and animation colors without changing source bytes", () => {
    const themed = applySweedReferenceTheme(
      '<polygon fill="#D6246E"/><div style="color:#FF7BAC">x</div><script>const c = "#D6246E";</script>',
    );

    expect(themed).toContain('#ed2062');
    expect(themed).not.toContain('#D6246E');
    expect(themed).not.toContain('#FF7BAC');
  });

  test("guards reference navbar access after duplicate navbar removal", () => {
    const script = "document.getElementById('nav').classList.toggle('hidden', y > lastY && y > 300);";
    const guarded = guardReferenceScript(script);

    expect(guarded).toContain("document.getElementById('nav')?.classList.toggle");
  });

  test("isolates inline reference declarations across Next route transitions", () => {
    const wrapped = wrapReferenceInlineScript("const reduced = false; let lastY = 0;");

    expect(wrapped).toStartWith("(() => {");
    expect(wrapped).toContain("const reduced = false; let lastY = 0;");
    expect(wrapped).toEndWith("\n})();");
  });
});

function referenceButtonSelector(selector: string) {
  return `.sweed-reference-page ${selector}`;
}
