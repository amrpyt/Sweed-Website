import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { homepageContent } from "@/content/homepage";
import { HomeArchigreenProjectsSection } from "./home-archigreen-projects-section";
import { HomeBlitScrollSection } from "./home-blit-scroll-section";
import { HomeServicesScrollSection } from "./home-services-scroll-section";

describe("homepage layout contract", () => {
  test("keeps 2011 inside the About narrative instead of a standalone row", () => {
    const html = renderToStaticMarkup(<HomeBlitScrollSection />);

    expect(html).toContain("السوق المصري والعربي من 2011");
    expect(html).not.toContain(">من 2011</p>");
  });

  test("moves the direction promise into the hero subtitle", () => {
    expect(homepageContent.hero.subtitle).toBe("نحدد لك الاتجاه، ونلتزم معك بالوصول — معًا ستصل.");
  });

  test("renders Services copy compactly and leaves the all-services CTA until the end", () => {
    const html = renderToStaticMarkup(<HomeServicesScrollSection />);
    const lastServiceTitle = homepageContent.services.at(-1)?.title;

    expect(lastServiceTitle).toBeTruthy();
    expect(html).not.toContain(homepageContent.servicesIntro);
    expect(html.indexOf("شوف كل الخدمات")).toBeGreaterThan(html.indexOf(lastServiceTitle ?? ""));
  });

  test("keeps the auto-moving portfolio strip controllable with previous and next arrows", () => {
    const html = renderToStaticMarkup(<HomeArchigreenProjectsSection />);

    expect(html).toContain('aria-label="المشروع السابق"');
    expect(html).toContain('aria-label="المشروع التالي"');
    expect(html).not.toContain("إيقاف الحركة التلقائية");
    expect(homepageContent.portfolio.every((project) => html.includes(project.title))).toBe(true);
    expect(html.indexOf("شاهد كل الأعمال")).toBeGreaterThan(html.lastIndexOf('data-testid="home-portfolio-card"'));
  });
});
