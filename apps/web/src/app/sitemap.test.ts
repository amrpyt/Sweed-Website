import { describe, expect, test } from "bun:test";
import sitemap from "./sitemap";

describe("public sitemap", () => {
  test("publishes canonical software-development and excludes the legacy development alias", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://sweed.com/services/software-development");
    expect(urls).not.toContain("https://sweed.com/services/development");
  });

  test("publishes every rebuilt public route and the typed article details", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const path of ["/services", "/portfolio", "/offers", "/articles", "/contact", "/articles/project-needs-direction"]) {
      expect(urls).toContain(`https://sweed.com${path}`);
    }
  });
});
