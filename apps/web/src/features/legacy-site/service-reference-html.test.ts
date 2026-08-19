import { describe, expect, test } from "bun:test";

import { getServiceReferenceDocument, type ServiceReferenceSlug } from "./service-reference-html";

const CONTRACT: Record<
  ServiceReferenceSlug,
  { h1: string; sourceLength: number; sectionIds: readonly string[] }
> = {
  consulting: {
    h1: "محتاج خطة… ولا محتاج تعرف القرار الصح الأول؟",
    sourceLength: 62924,
    sectionIds: ["hero", "quiz", "problems", "departments", "tracks", "method", "deliverables", "works", "why", "fit", "faq", "cta"],
  },
  branding: {
    h1: "لو شيلنا اللوجو من تصميماتك… الناس هتعرف إنها بتاعتك؟",
    sourceLength: 71403,
    sectionIds: ["hero", "maturity", "logovs", "bdepts", "btracks", "journey", "beforeafter", "works", "deliverables", "why", "faq", "cta"],
  },
  "digital-marketing": {
    h1: "عندك تسويق رقمي… ولا مجرد منشورات وإعلانات شغالة؟",
    sourceLength: 94963,
    sectionIds: ["hero", "leak", "system", "depts", "tracks", "journey", "engine", "works", "lab", "deliverables", "why", "faq", "cta"],
  },
  "software-development": {
    h1: "محتاج موقع شكله حلو… ولا نظام يشيل شغلك ويكبر معاك؟",
    sourceLength: 95631,
    sectionIds: ["hero", "fault", "beyond", "modules", "paths", "architect", "assembly", "works", "anatomy", "pipeline", "quality", "deliverables", "faq", "cta"],
  },
  media: {
    h1: "مش كل فيديو ينفع لكل هدف… إنت محتاج أي نوع فعلًا؟",
    sourceLength: 107198,
    sectionIds: ["hero", "ctest", "studio", "library", "paths", "lab", "phases", "editbay", "multi", "works", "faq", "cta"],
  },
  advertising: {
    h1: "براندك موجود على الشاشة… خلّيه حاضر في كل مكان",
    sourceLength: 115265,
    sectionIds: ["hero", "spot", "catalog", "paths", "works", "method", "faq", "cta"],
  },
};

function textContent(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

describe("uploaded service HTML contract", () => {
  for (const [slug, contract] of Object.entries(CONTRACT) as [ServiceReferenceSlug, (typeof CONTRACT)[ServiceReferenceSlug]][]) {
    test(`${slug} preserves the uploaded structure while adopting SWEED chrome`, () => {
      const document = getServiceReferenceDocument(slug);
      const h1 = document.bodyHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";

      expect(document.sourceLength).toBe(contract.sourceLength);
      expect(textContent(h1)).toBe(contract.h1);
      for (const id of contract.sectionIds) {
        expect(document.bodyHtml).toContain(`id="${id}"`);
      }

      expect(document.bodyHtml).not.toMatch(/<nav\b/i);
      expect(document.bodyHtml).not.toMatch(/<footer\b/i);
      expect(document.styles).toContain(".sweed-reference-page");
      expect(document.styles).toContain("SWEED Helvetica Arabic");
      expect(document.styles).toContain("--sweed-button-primary-bg: #261b3e;");
      expect(document.styles).not.toMatch(/font-family\s*:[^;}]*\bCairo\b/i);
      expect(document.styles).not.toMatch(/font-family\s*:[^;}]*IBM Plex Sans Arabic/i);
      expect(document.scripts.length).toBeGreaterThan(0);
    });
  }

  test("software and media inline scripts are ready to execute after hydration", () => {
    for (const slug of ["software-development", "media"] as const) {
      const inline = getServiceReferenceDocument(slug).scripts
        .map((script) => script.content ?? "")
        .join("\n");

      expect(inline).not.toMatch(/^\s*document\.addEventListener\(['"]DOMContentLoaded/m);
    }
  });
});
