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

    expect(page.seo.title).toBe("خدماتنا المتكاملة - SWEED");
    expect(page.hero.title).toBe("خدماتنا المتكاملة");
    expect(page.section.id).toBe("services");
    expect(page.services.map((service) => service.slug)).toEqual(["digital-marketing", "websites", "ai-automation"]);
  });

  test("builds the articles page model with a featured article", () => {
    const page = getArticlesPageModel();

    expect(page.seo.title).toBe("مدونة SWEED");
    expect(page.section.id).toBe("articles");
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

    expect(page.seo.title).toBe("تواصل معنا - SWEED");
    expect(page.form.id).toBe("contact-form");
    expect(page.form.elementId).toBe("contact-inquiry-form");
    expect(page.form.serviceOptions.map((option) => option.value)).toEqual(["digital-marketing", "websites", "ai-automation"]);
    expect(page.sections.map((section) => section.id)).toEqual(["contact-info", "quick-faq"]);
  });
});
