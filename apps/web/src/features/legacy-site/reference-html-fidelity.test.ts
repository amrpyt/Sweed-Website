import { createHash } from "node:crypto";
import { describe, expect, test } from "bun:test";
import { getReferenceHtmlBuffer, type ReferenceHtmlPage } from "./reference-html-sources";

const expectedFingerprints = {
  about: "1113703a2ba328f5df3131363bdbde989b27b31e7c0aba4bd89be264ea8b5c5b",
  services: "ee21eca6b83d2b3774b127ce3be5a1512d5b2b07a0b9ea315f2abe6ea6008662",
  portfolio: "bfcc2e73fda056cf0103472438a3d93c998bf0f51c04999d83cc009a64fba240",
  offers: "6aeb87c77f01f475936352a966c00de6f412d12380e56e74e41803183d1ebfde",
} as const satisfies Record<ReferenceHtmlPage, string>;

function fingerprint(page: ReferenceHtmlPage) {
  return createHash("sha256").update(getReferenceHtmlBuffer(page)).digest("hex");
}

describe("uploaded reference HTML fidelity", () => {
  for (const [page, expected] of Object.entries(expectedFingerprints)) {
    test(`${page} matches the approved upload`, () => {
      expect(fingerprint(page as ReferenceHtmlPage)).toBe(expected);
    });
  }
});
