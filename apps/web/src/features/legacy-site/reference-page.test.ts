import { describe, expect, test } from "bun:test";
import { getReferenceHtml, type ReferenceHtmlPage } from "./reference-html-sources";
import {
  guardReferenceScript,
  scopeReferenceHeadHtml,
  stripReferenceChrome,
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

  test("guards reference navbar access after duplicate navbar removal", () => {
    const script = "document.getElementById('nav').classList.toggle('hidden', y > lastY && y > 300);";
    const guarded = guardReferenceScript(script);

    expect(guarded).toContain("document.getElementById('nav')?.classList.toggle");
  });
});
