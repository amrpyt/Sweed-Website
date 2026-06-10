import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

const appRoot = join(process.cwd(), "src", "app");
const marketingRoot = join(appRoot, "(marketing)");

const publicRouteFiles = [
  "page.tsx",
  join("about", "page.tsx"),
  join("services", "page.tsx"),
  join("services", "[slug]", "page.tsx"),
  join("offers", "page.tsx"),
  join("products", "page.tsx"),
  join("portfolio", "page.tsx"),
  join("articles", "page.tsx"),
  join("articles", "[slug]", "page.tsx"),
  join("faq", "page.tsx"),
  join("contact", "page.tsx"),
];

describe("marketing route boundaries", () => {
  test("public routes live under the marketing route group", () => {
    for (const routeFile of publicRouteFiles) {
      expect(existsSync(join(marketingRoot, routeFile))).toBe(true);
      expect(existsSync(join(appRoot, routeFile))).toBe(false);
    }
  });

  test("admin, api, and asset routes stay outside the marketing route group", () => {
    expect(existsSync(join(appRoot, "admin", "ai-debug", "page.tsx"))).toBe(true);
    expect(existsSync(join(appRoot, "api", "ai", "advisor", "route.ts"))).toBe(true);
    expect(existsSync(join(appRoot, "legacy-assets", "[file]", "route.ts"))).toBe(true);

    expect(existsSync(join(marketingRoot, "admin"))).toBe(false);
    expect(existsSync(join(marketingRoot, "api"))).toBe(false);
    expect(existsSync(join(marketingRoot, "legacy-assets"))).toBe(false);
  });
});
