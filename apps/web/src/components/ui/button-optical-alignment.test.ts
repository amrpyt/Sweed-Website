import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function readSource(path: string) {
  return readFileSync(join(import.meta.dir, path), "utf8");
}

describe("SWEED button optical alignment", () => {
  test("defines one Arabic optical-centering contract for controls", () => {
    const tokens = readSource("../../styles/tokens.css");

    expect(tokens).toContain("--control-text-leading: 1;");
    expect(tokens).toContain("--control-text-optical-shift:");
    expect(tokens).toContain("--control-padding-block-start:");
    expect(tokens).toContain("--control-padding-block-end:");
  });

  test("keeps brand-action labels optically centered without overflowing compact buttons", () => {
    const css = readSource("brand-action-button.module.css");

    expect(css).toContain("translate(var(--brand-action-label-shift), calc(-1 * var(--control-text-optical-shift)))");
    expect(css).toContain("--brand-action-icon-size: calc(var(--cds-spacing-07) - var(--cds-spacing-02));");
  });
});
