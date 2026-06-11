import { describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import { getWorkspaceRoot } from "./workspace-root";

describe("getWorkspaceRoot", () => {
  test("resolves the repository root from the current app location", () => {
    expect(getWorkspaceRoot().replaceAll("\\", "/")).toEndWith("SWEED-Website");
  });

  test("honors an explicit workspace root override", () => {
    const previous = process.env.SWEED_WORKSPACE_ROOT;
    const repoRoot = resolve(process.cwd(), "../..");
    process.env.SWEED_WORKSPACE_ROOT = repoRoot;

    try {
      expect(getWorkspaceRoot()).toBe(repoRoot);
    } finally {
      if (previous === undefined) {
        delete process.env.SWEED_WORKSPACE_ROOT;
      } else {
        process.env.SWEED_WORKSPACE_ROOT = previous;
      }
    }
  });
});
