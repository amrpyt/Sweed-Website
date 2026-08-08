import { describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import { getWebAppRoot } from "./web-app-root";

describe("getWebAppRoot", () => {
  test("resolves the web app root that owns the legacy site files", () => {
    expect(getWebAppRoot().replaceAll("\\", "/")).toEndWith("/apps/web");
  });

  test("honors an explicit workspace root override", () => {
    const previous = process.env.SWEED_WORKSPACE_ROOT;
    const webAppRoot = resolve(process.cwd());
    process.env.SWEED_WORKSPACE_ROOT = webAppRoot;

    try {
      expect(getWebAppRoot()).toBe(webAppRoot);
    } finally {
      if (previous === undefined) {
        delete process.env.SWEED_WORKSPACE_ROOT;
      } else {
        process.env.SWEED_WORKSPACE_ROOT = previous;
      }
    }
  });
});
