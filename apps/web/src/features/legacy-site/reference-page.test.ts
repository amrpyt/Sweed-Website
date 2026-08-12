import { describe, expect, test } from "bun:test";
import { getReferenceHtml, type ReferenceHtmlPage } from "./reference-html-sources";
import {
  applySweedReferenceTheme,
  guardReferenceScript,
  scopeReferenceHeadHtml,
  stripReferenceChrome,
  wrapReferenceInlineScript,
} from "./reference-html-normalizer";

const heroMarkers = {
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
