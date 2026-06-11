import { describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import { getWorkspaceRoot } from "./workspace-root";

describe("getWorkspaceRoot", () => {
  test("resolves the web app root that owns the legacy site files", () => {
    expect(getWorkspaceRoot().replaceAll("\\", "/")).toEndWith("SWEED-Website/apps/web");
  });

  test("honors an explicit workspace root override", () => {
    const previous = process.env.SWEED_WORKSPACE_ROOT;
    const webAppRoot = resolve(process.cwd());
    process.env.SWEED_WORKSPACE_ROOT = webAppRoot;

    try {
      expect(getWorkspaceRoot()).toBe(webAppRoot);
    } finally {
      if (previous === undefined) {
        delete process.env.SWEED_WORKSPACE_ROOT;
      } else {
        process.env.SWEED_WORKSPACE_ROOT = previous;
      }
    }
  });
});
