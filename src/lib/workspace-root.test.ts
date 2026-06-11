import { describe, expect, test } from "bun:test";
import { getWorkspaceRoot } from "./workspace-root";

describe("getWorkspaceRoot", () => {
  test("resolves the repository root from the current app location", () => {
    expect(getWorkspaceRoot().replaceAll("\\", "/")).toEndWith("SWEED-Website");
  });

  test("honors an explicit workspace root override", () => {
    const previous = process.env.SWEED_WORKSPACE_ROOT;
    process.env.SWEED_WORKSPACE_ROOT = process.cwd();

    try {
      expect(getWorkspaceRoot()).toBe(process.cwd());
    } finally {
      if (previous === undefined) {
        delete process.env.SWEED_WORKSPACE_ROOT;
      } else {
        process.env.SWEED_WORKSPACE_ROOT = previous;
      }
    }
  });
});
