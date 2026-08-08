import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const publicRoutes = ["/", "/about", "/services", "/offers", "/products", "/portfolio", "/articles", "/faq", "/contact"];

function getAppRoot() {
  const nestedAppRoot = join(process.cwd(), "apps", "web");
  return existsSync(join(nestedAppRoot, "src")) ? nestedAppRoot : process.cwd();
}

test("public routes render shared shell", async ({ page }) => {
  for (const route of publicRoutes) {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByTestId("sweed-staggered-menu")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "العودة إلى الرئيسية" })).toBeVisible();
    await expect(page.getByTestId("sweed-menu-button")).toBeVisible();
    await expect(page.locator(".sweed-common-footer")).toHaveCount(1);
    await expect(page.locator("body")).toContainText("info@sweed.com");
  }
});

test("services route renders the executive decision journey", async ({ page }) => {
  await page.goto("/services");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("مش كل مشكلة محتاجة نفس الخدمة");
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("main section[id]")).toHaveCount(8);
  await expect(page.locator("#development").getByRole("link", { name: /البرمجة والتطوير/ })).toHaveAttribute(
    "href",
    "/services/software-development",
  );
  await expect(page.getByRole("navigation", { name: "خريطة خدمات SWEED" })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});

test("react homepage renders key content and stable anchors", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toContainText("نصنع العلامات التي تقود المستقبل");
  await expect(page.locator("#services")).toContainText("خدماتنا المتكاملة");

  const expectedSectionOrder = [
    "home",
    "problems",
    "about",
    "slogan",
    "services",
    "sweed-why",
    "portfolio",
    "offers",
    "faq",
    "blog",
    "contact",
  ];

  for (const id of expectedSectionOrder) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  const homepageSections = page.locator("main section[id]");
  await expect(homepageSections).toHaveCount(expectedSectionOrder.length);
  await expect(homepageSections.evaluateAll((sections) => sections.map((section) => section.id))).resolves.toEqual(expectedSectionOrder);
});

test("home staggered navigation points to homepage section anchors in the requested order", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("sweed-menu-button").click();
  const navLinks = page.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link");
  const expectedHrefs = [
    "/#home",
    "/#about",
    "/#services",
    "/#portfolio",
    "/#offers",
    "/#blog",
    "/#contact",
  ];
  await expect(navLinks).toHaveCount(expectedHrefs.length);

  for (const [index, href] of expectedHrefs.entries()) {
    await expect(navLinks.nth(index)).toHaveAttribute("href", href);
  }

  await expect(page.getByTestId("sweed-header-contact-action")).toHaveAttribute("href", "/#contact");
});

test("homepage publishes Arabic canonical and social metadata", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://sweed.com/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /سويد شريكك في الاستراتيجية/);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "ar_EG");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://sweed.com/");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test("homepage controls do not receive decorative pseudo-content in their accessible names", async ({ page }) => {
  await page.goto("/#contact");
  const submitButton = page.getByTestId("home-contact-form").getByRole("button", { name: "أرسل طلب الاستشارة" });
  await expect(submitButton).toBeVisible();
  const pseudoContent = await submitButton.evaluate((button) => getComputedStyle(button, "::before").content);
  expect(["none", "normal", '""']).toContain(pseudoContent);
});

test("contact lead endpoint silently rejects honeypot submissions", async ({ page }) => {
  const response = await page.request.post("/api/contact-leads", {
    data: {
      name: "Spam Bot",
      phone: "01000000000",
      interest: "consulting",
      message: "This payload should not be stored because honeypot is filled.",
      website: "https://spam.invalid",
      source: "honeypot-test",
    },
  });
  expect(response.status()).toBe(201);
  await expect(response.json()).resolves.toMatchObject({ ok: true, leadId: "accepted" });
});

test("FAQ keeps one answer open and publishes FAQPage structured data", async ({ page }) => {
  await page.goto("/");

  const faqSection = page.locator("#faq");
  const faqItems = faqSection.locator("[data-open]");
  const faqButtons = faqSection.locator('button[aria-controls^="home-faq-panel-"]');
  const faqCount = await faqItems.count();
  await expect(faqButtons).toHaveCount(faqCount);
  await expect(faqButtons.first()).toHaveAttribute("aria-expanded", "true");

  await faqButtons.nth(1).click();
  await expect(faqButtons.first()).toHaveAttribute("aria-expanded", "false");
  await expect(faqButtons.nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect(faqSection.getByRole("region")).toHaveCount(1);

  const schemaText = await faqSection.locator('script[type="application/ld+json"]').textContent();
  const schema = JSON.parse(schemaText ?? "{}");
  expect(schema["@type"]).toBe("FAQPage");
  expect(schema.mainEntity).toHaveLength(faqCount);
});

test("homepage reads the latest three articles from the shared content source", async ({ page }) => {
  await page.goto("/");

  const latestArticles = page.getByTestId("home-latest-article");
  await expect(latestArticles).toHaveCount(3);
  await expect(latestArticles.first()).toContainText("5 أرقام لازم تتابعها قبل ما تزود ميزانية التسويق");
  await expect(latestArticles.first().getByRole("link", { name: /5 أرقام/ }).first()).toHaveAttribute(
    "href",
    "/articles/marketing-metrics-that-matter",
  );
  await expect(page.locator("#blog").getByRole("link", { name: "كل المقالات" })).toHaveAttribute("href", "/articles");
});

test("contact form preserves conversion context and shows a real submission result", async ({ page }) => {
  let submittedLead: Record<string, unknown> | undefined;
  await page.route("**/api/contact-leads", async (route) => {
    submittedLead = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, leadId: "playwright-lead", forwarded: false }),
    });
  });

  await page.goto("/");
  const growthOffer = page.getByTestId("home-offer-card").filter({ hasText: "باقة النمو" });
  await growthOffer.getByRole("button", { name: "احجز مكالمة نمو" }).click();

  const form = page.getByTestId("home-contact-form");
  await expect(form.locator('input[name="selectedOffer"]')).toHaveValue("باقة النمو");
  await expect(form.locator('input[name="source"]')).toHaveValue("offers");
  await expect(form.locator('select[name="interest"]')).toHaveValue("باقة النمو");

  await form.locator('input[name="name"]').fill("اختبار آلي");
  await form.locator('input[name="phone"]').fill("01000000000");
  await form.locator('textarea[name="message"]').fill("طلب اختبار آلي للتأكد من وصول بيانات الباقة كاملة.");
  await form.getByRole("button", { name: "أرسل طلب الاستشارة" }).click();

  await expect(form).toContainText("تم استلام طلبك بنجاح");
  expect(submittedLead).toMatchObject({
    name: "اختبار آلي",
    phone: "01000000000",
    interest: "باقة النمو",
    selectedOffer: "باقة النمو",
    source: "offers",
  });
});

test("contact form blocks invalid submissions with field-level errors", async ({ page }) => {
  await page.goto("/#contact");
  const form = page.getByTestId("home-contact-form");
  await form.getByRole("button", { name: "أرسل طلب الاستشارة" }).click();
  await expect(form.getByText("اكتب اسمك بحرفين على الأقل")).toBeVisible();
  await expect(form.getByText("اكتب رقم هاتف صحيح")).toBeVisible();
  await expect(form.getByText("اختر الخدمة أو الباقة الأقرب لك")).toBeVisible();
  await expect(form.getByText("اكتب نبذة من 10 أحرف على الأقل")).toBeVisible();
});

test("footer uses homepage anchors and has no empty social links", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator(".sweed-common-footer");
  await expect(footer.locator('a[href="#"]')).toHaveCount(0);
  await expect(footer.getByRole("link", { name: "أعمالنا" })).toHaveAttribute("href", "/#portfolio");
  await expect(footer.getByRole("link", { name: "+20 106 827 4662" })).toHaveAttribute("href", "tel:+201068274662");
  await expect(footer.getByRole("link", { name: "info@sweed.com" })).toHaveAttribute("href", "mailto:info@sweed.com");
  await expect(footer.getByRole("link", { name: "تواصل مع SWEED عبر واتساب" })).toHaveAttribute("href", /wa\.me/);
});

test("support ticket uses the same contact endpoint and exposes WhatsApp", async ({ page }) => {
  let ticketPayload: Record<string, unknown> | undefined;
  await page.route("**/api/contact-leads", async (route) => {
    ticketPayload = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Open AI advisor" }).click();
  await page.getByText("دعم مباشر أو تذكرة", { exact: true }).click();

  const ticketForm = page.getByTestId("sweed-support-ticket-form");
  await ticketForm.getByLabel("اسم صاحب التذكرة").fill("اختبار الدعم");
  await ticketForm.getByLabel("رقم واتساب صاحب التذكرة").fill("01000000000");
  await ticketForm.getByLabel("ملخص المشكلة").fill("هذه تذكرة اختبار آلي لمسار الدعم الموحد.");
  await ticketForm.getByRole("button", { name: "إرسال التذكرة" }).click();

  await expect(ticketForm).toContainText("تم تسجيل التذكرة بنجاح");
  expect(ticketPayload).toMatchObject({ interest: "support-ticket", source: "ai-support-ticket" });
  await expect(page.locator('aside[aria-label="SWEED support center"] a[href*="wa.me"]')).toHaveAttribute("href", /wa\.me/);
});

test("portfolio cards expose numeric results and filter by service", async ({ page }) => {
  await page.goto("/");

  const portfolioSection = page.locator("#portfolio");
  const projectCards = page.getByTestId("home-portfolio-card");
  await expect(projectCards).toHaveCount(4);
  await expect(projectCards.first()).toContainText("+42% تذكّر للعلامة");
  await expect(projectCards.nth(1)).toContainText("+67% طلبات مؤهلة");
  await expect(portfolioSection.getByRole("link", { name: "شاهد كل الأعمال" })).toHaveAttribute("href", "/portfolio");

  await portfolioSection.getByRole("button", { name: "مواقع" }).click();
  await expect(projectCards).toHaveCount(1);
  await expect(projectCards.first()).toContainText("حضور Astra الرقمي");

  await portfolioSection.getByRole("button", { name: "الكل" }).click();
  await expect(projectCards).toHaveCount(4);
});

test("offer cards list inclusions and carry the selected package to contact", async ({ page }) => {
  await page.goto("/");

  const offers = page.getByTestId("home-offer-card");
  await expect(offers).toHaveCount(3);
  await expect(offers.nth(1)).toHaveAttribute("data-featured", "true");
  await expect(offers.nth(1)).toContainText("الأكثر طلبًا");
  await expect(offers.nth(1).getByRole("listitem")).toHaveCount(4);

  await offers.nth(1).getByRole("button", { name: "احجز مكالمة نمو" }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(offers.nth(1)).toHaveAttribute("data-selected", "true");
  await expect(page.getByTestId("home-conversion-state")).toHaveAttribute("data-selected-offer", "باقة النمو");
  await expect(page.getByTestId("home-conversion-state")).toHaveAttribute("data-cta-source", "offers");
  await expect(page.locator("#contact")).toBeInViewport();
});

test("services use unique media and service-specific destinations", async ({ page }) => {
  await page.goto("/");

  const servicePanels = page.getByTestId("home-service-panel");
  const expectedHrefs = [
    "/services#consulting",
    "/services#branding",
    "/services#digital-marketing",
    "/services#development",
    "/services#advertising",
    "/services#media",
  ];

  await expect(servicePanels).toHaveCount(expectedHrefs.length);
  for (const [index, href] of expectedHrefs.entries()) {
    await expect(servicePanels.nth(index)).toHaveAttribute("href", href);
  }

  const imageSources = await servicePanels.locator("img").evaluateAll((images) => images.map((image) => image.getAttribute("src")));
  expect(new Set(imageSources).size).toBe(expectedHrefs.length);
  await expect(page.locator("#services").getByRole("button", { name: "كل الخدمات" })).toBeVisible();
});

test("why SWEED metrics count up once the trust section becomes visible", async ({ page }) => {
  await page.goto("/");

  const metrics = page.getByTestId("home-trust-metric");
  await expect(metrics).toHaveCount(3);
  await metrics.first().scrollIntoViewIfNeeded();
  await expect(metrics.first().locator("strong")).toHaveText("+١٥", { timeout: 4000 });
  await expect(metrics.nth(1).locator("strong")).toHaveText("+٦٣٨", { timeout: 4000 });
  await expect(metrics.nth(2).locator("strong")).toHaveText("+٤٧٨", { timeout: 4000 });
});

test("about and slogan sections use the approved structure and lazy video behavior", async ({ page }) => {
  await page.goto("/");

  const aboutSection = page.locator("#about");
  await expect(aboutSection).toContainText("فريق يفهم مشروعك قبل ما يقترح عليك أي حل");
  await expect(aboutSection.getByRole("link", { name: "تعرف على سويد" })).toHaveAttribute("href", "/about");
  await expect(aboutSection.locator("img")).toHaveAttribute("loading", "lazy");

  const aboutVideoTrigger = page.getByTestId("home-about-video-trigger");
  await aboutVideoTrigger.click();
  const dialog = page.getByRole("dialog", { name: "تعرف على SWEED" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("video")).toHaveAttribute("src", /blit-scroll-effect-demo\.mp4/);
  await expect(dialog.locator("video")).toHaveJSProperty("paused", true);
  await dialog.getByRole("button", { name: "إغلاق الفيديو" }).click();
  await expect(aboutVideoTrigger).toBeFocused();

  const sloganSection = page.locator("#slogan");
  await expect(sloganSection).toContainText("نصنع أثرًا");
  await expect(sloganSection).toContainText("يدفع للنمو");
});

test("problem cards record their service mapping and focus the contact section", async ({ page }) => {
  await page.goto("/");

  const problemCard = page.getByTestId("home-problem-card").filter({ hasText: "عائد ضعيف؟" });
  await problemCard.click();

  await expect(page).toHaveURL(/\/#contact$/);
  await expect(problemCard).toHaveAttribute("aria-pressed", "true");
  await expect(problemCard).toHaveAttribute("data-active", "true");
  await expect(page.getByTestId("home-conversion-state")).toHaveAttribute("data-selected-problem", "عائد ضعيف؟");
  await expect(page.getByTestId("home-conversion-state")).toHaveAttribute("data-selected-service", "advertising");
  await expect(page.getByTestId("home-conversion-state")).toHaveAttribute("data-cta-source", "problems");
  await expect(page.locator("#contact")).toBeInViewport();
});

test("homepage hero exposes approved CTAs and an accessible video dialog", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "احجز استشارتك المجانية" }).click();
  await expect(page).toHaveURL(/\/#contact$/);

  await page.goto("/");
  await page.getByRole("button", { name: "شاهد أعمالنا" }).click();
  await expect(page).toHaveURL(/\/#portfolio$/);

  await page.goto("/");
  await page.getByTestId("home-hero-video-trigger").click();
  const dialog = page.getByRole("dialog", { name: "فيديو SWEED التعريفي" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("video")).toHaveJSProperty("paused", true);
  await dialog.getByRole("button", { name: "إغلاق الفيديو" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByTestId("home-hero-video-trigger")).toBeFocused();
});

test("inner public pages expose breadcrumb trails", async ({ page }) => {
  for (const route of ["/about", "/services", "/offers", "/products", "/portfolio", "/articles", "/faq", "/contact"]) {
    await page.goto(route);
    const breadcrumb = page.locator(".breadcrumb").first();
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.getByRole("link").first()).toHaveAttribute("href", "/");
  }
});

test("modular about page updates URL hash while sections become active", async ({ page }) => {
  await page.goto("/about");
  await page.locator("#story").scrollIntoViewIfNeeded();
  await expect(page).toHaveURL(/\/about#story$/);
  await page.locator("#team").scrollIntoViewIfNeeded();
  await expect(page).toHaveURL(/\/about#team$/);
});

test("modular services page updates URL hash while its main section becomes active", async ({ page }) => {
  await page.goto("/services");
  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect(page).toHaveURL(/\/services#services$/);
});

test("modular contact page updates URL hash while sections become active", async ({ page }) => {
  await page.goto("/contact");
  await page.locator("#contact-form").scrollIntoViewIfNeeded();
  await expect(page).toHaveURL(/\/contact#contact-form$/);
  await page.locator("#quick-faq").scrollIntoViewIfNeeded();
  await expect(page).toHaveURL(/\/contact#quick-faq$/);
});

test("production SEO endpoints use canonical site URL", async ({ page }) => {
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(sitemap.headers()["content-type"]).toMatch(/xml/);
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("https://sweed.com/");
  expect(sitemapBody).not.toContain("sweed.example");

  const robots = await page.request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsBody = await robots.text();
  expect(robotsBody).toContain("Sitemap: https://sweed.com/sitemap.xml");
  expect(robotsBody).not.toContain("sweed.example");
});

test("public pages normalize old contact emails", async ({ page }) => {
  for (const route of publicRoutes) {
    await page.goto(route);
    await expect(page.locator("body")).toContainText("info@sweed.com");
    await expect(page.locator("body")).not.toContainText("info@sweid.com");
    await expect(page.locator("body")).not.toContainText("support@sweid.com");
    await expect(page.locator("body")).not.toContainText("mohamedsweed2050@gmail.com");
  }
});

test("mobile staggered panel stays fixed while page scroll is locked", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu behavior only runs on mobile project");

  await page.goto("/");
  const button = page.getByTestId("sweed-menu-button");
  await expect(button).toBeVisible();
  await button.click();
  const menu = page.getByTestId("sweed-menu-panel");
  await expect(menu).toBeVisible();
  await expect(menu).toHaveCSS("position", "fixed");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  const before = await menu.boundingBox();
  await page.mouse.wheel(0, 900);
  const after = await menu.boundingBox();
  expect(Math.round(after?.y ?? -1)).toBe(Math.round(before?.y ?? -2));
});

test("mobile staggered links are clickable above the backdrop", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu click behavior only runs on mobile project");

  await page.goto("/");
  const button = page.getByTestId("sweed-menu-button");
  await expect(button).toBeVisible();
  await button.click();
  const menu = page.getByTestId("sweed-menu-panel");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "انتقل إلى اتصل بنا" }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact")).toHaveCount(1);
  await expect(page.locator("body")).toContainText("جاهز تبدأ أول خطوة معانا؟");
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("mobile staggered panel fills the viewport without horizontal drift", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu style only runs on mobile project");

  await page.goto("/articles");
  const button = page.getByTestId("sweed-menu-button");
  await expect(button).toBeVisible();
  await button.click();
  const menu = page.getByTestId("sweed-menu-panel");
  await expect(menu).toBeVisible();
  const viewportWidth = page.viewportSize()?.width ?? 0;
  const menuBox = await menu.boundingBox();
  expect(Math.round(menuBox?.width ?? 0)).toBe(viewportWidth);
  const hasHorizontalOverflow = await menu.evaluate(
    (element) => element.scrollWidth > element.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("legacy mobile polish asset is served for non-migrated legacy pages", async ({ page }) => {
  const response = await page.request.get("/legacy-assets/mobile-polish.css");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("text/css");
});

test("public app route boundaries show homepage migrated and remaining legacy pages isolated", async () => {
  const appRoot = getAppRoot();
  const homeRouteSource = readFileSync(join(appRoot, "src/app/(marketing)/page.tsx"), "utf8");
  expect(homeRouteSource).not.toContain("publicLegacyRoutes");
  expect(homeRouteSource).toContain("HomePublicPage");

  const legacyRouteFiles = [
    "src/app/(marketing)/services/[slug]/page.tsx",
    "src/app/(marketing)/offers/page.tsx",
    "src/app/(marketing)/products/page.tsx",
    "src/app/(marketing)/portfolio/page.tsx",
    "src/app/(marketing)/articles/page.tsx",
    "src/app/(marketing)/articles/[slug]/page.tsx",
  ];

  for (const file of legacyRouteFiles) {
    const source = readFileSync(join(appRoot, file), "utf8");
    expect(source).toContain("publicLegacyRoutes");
  }

  const sharedRouteModule = readFileSync(join(appRoot, "src/features/public-site/routes/index.tsx"), "utf8");
  expect(sharedRouteModule).not.toContain("page: \"home\"");
  expect(sharedRouteModule).toContain("LegacyPage");
  expect(sharedRouteModule).toContain("getLegacyMetadata");

  for (const [file, component] of [
    ["src/app/(marketing)/about/page.tsx", "AboutPublicPage"],
    ["src/app/(marketing)/services/page.tsx", "ServicesPublicPage"],
    ["src/app/(marketing)/faq/page.tsx", "FaqPublicPage"],
    ["src/app/(marketing)/contact/page.tsx", "ContactPublicPage"],
  ] as const) {
    const source = readFileSync(join(appRoot, file), "utf8");
    expect(source).not.toContain("publicLegacyRoutes");
    expect(source).toContain(component);
  }
});
