import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const aboutRoutePath = resolve(import.meta.dir, "../../../app/(marketing)/about/page.tsx");

describe("About brand route contract", () => {
  test("keeps the approved About reference inside the shared SWEED theme and chrome", () => {
    const source = readFileSync(aboutRoutePath, "utf8");

    expect(source).toContain('<LegacyPage page="about" presentation="reference" showAdvisor={false} />');
    expect(source).not.toContain('presentation="exact"');
  });
});
