import { describe, expect, test } from "bun:test";
import {
  getAboutPageModel,
  getArticlesPageModel,
  getContactPageModel,
  getFaqPageModel,
  getPublicSiteShellData,
  getServicesPageModel,
} from "./public-page-models";

describe("public-site page composers", () => {
  test("exposes shared shell data for public routes", () => {
    const shell = getPublicSiteShellData();

    expect(shell.navigation[0]?.href).toBe("/");
    expect(shell.contactAction.href).toBe("/contact");
  });

  test("builds the about page model with stable section ids", () => {
    const page = getAboutPageModel();

    expect(page.breadcrumb).toBe("من نحن");
    expect(page.seo.title).toBe("من نحن - SWEED");
    expect(page.sections.map((section) => section.id)).toEqual(["story", "team", "pillars"]);
    expect(page.sections[0]?.items.some((item) => item.title === "رؤيتنا")).toBe(true);
  });

  test("builds the services page model from sorted service entities", () => {
    const page = getServicesPageModel();

    expect(page.seo.title).toBe("خدمات SWEED المتكاملة");
    expect(page.hero.title).toBe("مش كل مشكلة محتاجة نفس الخدمة");
    expect(page.section.id).toBe("services");
    expect(page.services.map((service) => service.slug)).toEqual([
      "consulting",
      "branding",
      "digital-marketing",
      "development",
      "advertising",
      "media",
    ]);
    expect(page.services.find((service) => service.slug === "development")?.detailHref).toBe(
      "/services/software-development",
    );
  });

  test("builds the articles page model with a featured article", () => {
    const page = getArticlesPageModel();

    expect(page.seo.title).toBe("مقالات وأدلة SWEED");
    expect(page.section.id).toBe("latest");
    expect(page.articles[0]?.slug).toBe("how-to-choose-marketing-package");
    expect(page.featuredArticle?.slug).toBe("how-to-choose-marketing-package");
  });

  test("builds the faq page model with a stable faq anchor", () => {
    const page = getFaqPageModel();

    expect(page.seo.title).toBe("الأسئلة الشائعة - SWEED");
    expect(page.sections.map((section) => section.id)).toEqual(["faq"]);
    expect(page.sections[0]?.items).toHaveLength(4);
    expect(page.sections[0]?.items.some((item) => item.title === "ما الذي تقدمه SWEED؟")).toBe(true);
  });

  test("builds the contact page model with a real contact form anchor and service options", () => {
    const page = getContactPageModel();

    expect(page.seo.title).toBe("تواصل معنا | SWEED");
    expect(page.form.id).toBe("contact-form");
    expect(page.form.elementId).toBe("contact-inquiry-form");
    expect(page.form.serviceOptions.map((option) => option.value)).toEqual([
      "consulting",
      "branding",
      "digital-marketing",
      "development",
      "advertising",
      "media",
    ]);
    expect(page.sections.map((section) => section.id)).toEqual(["contact-info"]);
    expect(JSON.stringify(page)).not.toContain("ساعات العمل");
    expect(JSON.stringify(page)).not.toContain("24/7");
  });
});
