import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "../../../..");

function read(relativePath: string) {
  return readFileSync(resolve(root, relativePath), "utf8");
}

describe("final v4 P0 public-site contract", () => {
  test("service detail uses real deliverables and the contact route", () => {
    const source = read("src/features/public-site/pages/service-detail-public-page.tsx");

    expect(source).not.toContain("بنحدد مخرجات الخطوة ومؤشرها قبل الانتقال للخطوة اللي بعدها");
    expect(source).not.toContain('href="/#contact"');
    expect(source).toContain("ناقش خدمة");
  });

  test("AI advisor links to real pages and has Arabic launcher labelling", () => {
    const source = read("src/features/ai-advisor/ai-advisor-widget.tsx");

    expect(source).toContain('const knowledgeBaseHref = "/faq"');
    expect(source).toContain('const contactHref = "/contact"');
    expect(source).toContain('aria-label="افتح مساعد سويد الذكي"');
    expect(source).not.toContain("Open AI advisor");
  });

  test("honeypots expose no visitor-facing helper text", () => {
    const contactForm = read("src/features/public-site/pages/contact-inquiry-form.tsx");
    const homeForm = read("src/features/homepage/home-contact-section.tsx");

    expect(contactForm).not.toContain("اترك هذا الحقل فارغًا");
    expect(homeForm).not.toContain("اترك هذا الحقل فارغًا");
  });

  test("article breadcrumb uses the opened article title", () => {
    const source = read("src/features/public-site/pages/article-detail-public-page.tsx");
    expect(source).toContain('<span aria-current="page">{article.title}</span>');
  });

  test("homepage metric HTML starts from the final supplied value", () => {
    const source = read("src/features/homepage/home-why-metrics-section.tsx");
    expect(source).not.toContain('useState("0")');
    expect(source).toContain("{metric.value}");
  });
});
