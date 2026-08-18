import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { homepageContent } from "@/content/homepage";
import { HomeArchigreenProjectsSection } from "./home-archigreen-projects-section";

describe("homepage portfolio carousel", () => {
  test("renders an accessible auto-moving carousel with explicit previous and next controls", () => {
    const html = renderToStaticMarkup(<HomeArchigreenProjectsSection />);

    expect(html).toContain('aria-roledescription="carousel"');
    expect(html).toContain('aria-label="المشروع السابق"');
    expect(html).toContain('aria-label="المشروع التالي"');
    expect(html).not.toContain('data-testid="home-portfolio-motion-toggle"');
    expect(html).not.toContain("إيقاف الحركة التلقائية");
    expect(html).toContain('aria-live="off"');
    expect((html.match(/data-carousel-slide="true"/g) ?? [])).toHaveLength(homepageContent.portfolio.length);
  });

  test("keeps verified and pending proof states visible in the track", () => {
    const html = renderToStaticMarkup(<HomeArchigreenProjectsSection />);

    expect(html).toContain("نتيجة موثقة");
    expect(html).toContain("قيد التوثيق");
    expect(homepageContent.portfolio.some((project) => project.verification === "verified")).toBe(true);
    expect(homepageContent.portfolio.some((project) => project.verification === "pending")).toBe(true);
  });
});
