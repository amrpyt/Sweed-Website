import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";

const headerSource = readFileSync(join(import.meta.dir, "legacy-header.tsx"), "utf8");

describe("header catalog CTA", () => {
  test("uses the catalog destination consistently in both CTA click handlers", () => {
    expect(headerSource.match(/handleNavigationClick\(event, catalogHref\)/g)).toHaveLength(2);
    expect(headerSource).not.toContain("consultationHref");
  });
});
