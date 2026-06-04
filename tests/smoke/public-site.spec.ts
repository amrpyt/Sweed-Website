import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  { route: "/", marker: "نحول أحلامك إلى إنجازات حقيقية" },
  { route: "/about", marker: "من نحن" },
  { route: "/services", marker: "خدماتنا المتكاملة" },
  { route: "/offers", marker: "باقاتنا وعروضنا" },
  { route: "/products", marker: "منتجاتنا المتميزة" },
  { route: "/portfolio", marker: "معرض أعمالنا" },
  { route: "/articles", marker: "مدونة سويد" },
  { route: "/faq", marker: "الأسئلة الشائعة" },
  { route: "/contact", marker: "تواصل معنا" },
];

for (const { route, marker } of publicRoutes) {
  test(`renders legacy page ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("body")).toContainText(marker);
  });
}

test("legacy navigation link is rewritten to clean services route", async ({ page }) => {
  await page.goto("/");
  const servicesLink = page.locator('a[href="/services"]').first();
  await expect(servicesLink).toBeAttached();
  await expect(servicesLink).toHaveAttribute("href", "/services");
  await page.goto("/services");
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("body")).toContainText("خدماتنا المتكاملة");
});

test("common header and logo are shared across legacy pages", async ({ page }) => {
  for (const route of ["/", "/about", "/services", "/offers", "/contact"]) {
    await page.goto(route);
    await expect(page.locator(".sweed-common-top-bar")).toHaveCount(1);
    await expect(page.locator(".sweed-common-header")).toHaveCount(1);
    await expect(page.locator(".sweed-common-logo .logo-main")).toHaveText("SWEED");
    await expect(page.locator(".sweed-common-logo .logo-subtitle")).toHaveText("التسويق والإعلان");
  }
});

test("shared footer is consistent across public routes", async ({ page }) => {
  for (const { route } of publicRoutes) {
    await page.goto(route);
    const footer = page.locator(".sweed-common-footer");
    await expect(footer).toHaveCount(1);
    await expect(footer.locator("h3").first()).toHaveText("SWEED");
    await expect(footer).toContainText("01068274662");
    await expect(footer).toContainText("info@sweed.com");
  }
});

test("all inner legacy pages expose a breadcrumb trail", async ({ page }) => {
  const routes = [
    { route: "/about", current: "من نحن" },
    { route: "/services", current: "خدماتنا" },
    { route: "/services/legacy", current: "الاستشارات الإدارية" },
    { route: "/offers", current: "العروض" },
    { route: "/products", current: "المنتجات" },
    { route: "/portfolio", current: "أعمالنا" },
    { route: "/articles", current: "المدونة" },
    { route: "/articles/legacy", current: "10 استراتيجيات مبتكرة للتسويق الرقمي" },
    { route: "/faq", current: "الأسئلة الشائعة" },
    { route: "/contact", current: "اتصل بنا" },
  ];

  for (const { route, current } of routes) {
    await page.goto(route);
    const breadcrumb = page.locator(".breadcrumb").first();
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.getByRole("link", { name: "الرئيسية" })).toHaveAttribute("href", "/");
    await expect(breadcrumb).toContainText(current);
  }
});

test("legacy sections expose stable hash anchors", async ({ page }) => {
  const anchors = [
    { route: "/#expertise", selector: "#expertise" },
    { route: "/#problems", selector: "#problems" },
    { route: "/about#story", selector: "#story" },
    { route: "/services#services", selector: "#services" },
    { route: "/contact#contact-form", selector: "#contact-form" },
    { route: "/articles#stats", selector: "#stats" },
  ];

  for (const { route, selector } of anchors) {
    await page.goto(route);
    await expect(page.locator(selector)).toHaveCount(1);
  }
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

test("legacy public pages normalize old contact emails", async ({ page }) => {
  for (const route of ["/", "/about", "/services", "/offers", "/articles", "/faq", "/contact"]) {
    await page.goto(route);
    await expect(page.locator("body")).toContainText("info@sweed.com");
    await expect(page.locator("body")).not.toContainText("info@sweid.com");
    await expect(page.locator("body")).not.toContainText("support@sweid.com");
    await expect(page.locator("body")).not.toContainText("mohamedsweed2050@gmail.com");
  }
});

test("mobile sidebar stays fixed while page scrolls", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile sidebar behavior only runs on mobile project");

  await page.goto("/");
  await page.waitForTimeout(1000);
  const button = page.getByTestId("sweed-mobile-menu-button");
  await expect(button).toBeVisible();
  await button.click();
  const menu = page.locator(".sweed-common-header .nav-menu");
  await expect(menu).toHaveClass(/active/);
  await expect(menu).toHaveCSS("position", "fixed");
  const before = await menu.boundingBox();
  await page.mouse.wheel(0, 900);
  const after = await menu.boundingBox();
  expect(Math.round(after?.y ?? -1)).toBe(Math.round(before?.y ?? -2));
});

test("mobile sidebar links are clickable above the overlay", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile sidebar click behavior only runs on mobile project");

  await page.goto("/");
  await page.waitForTimeout(1000);
  const button = page.getByTestId("sweed-mobile-menu-button");
  await expect(button).toBeVisible();
  await button.click();
  const menu = page.locator(".sweed-common-header .nav-menu");
  await expect(menu).toHaveClass(/active/);
  await menu.getByRole("link", { name: "اتصل بنا" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator("body")).toContainText("تواصل معنا");
});

test("mobile sidebar keeps the polished drawer style without layout drift", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile sidebar style only runs on mobile project");

  await page.goto("/articles");
  await page.waitForTimeout(1000);
  const button = page.getByTestId("sweed-mobile-menu-button");
  await expect(button).toBeVisible();
  await button.click();
  const menu = page.locator(".sweed-common-header .nav-menu");
  await expect(menu).toHaveClass(/active/);
  await expect(menu).toHaveCSS("width", "340px");
  await expect(menu).toHaveCSS("border-top-left-radius", "26px");
  await expect(menu).toHaveCSS("border-bottom-left-radius", "26px");

  const menuBeforeContent = await menu.evaluate((element) => getComputedStyle(element, "::before").content);
  const menuAfterContent = await menu.evaluate((element) => getComputedStyle(element, "::after").content);
  const firstLinkBeforeContent = await menu
    .getByRole("link", { name: "الرئيسية" })
    .evaluate((element) => getComputedStyle(element, "::before").content);

  expect(menuBeforeContent).toContain("SWEED");
  expect(menuBeforeContent).toContain("نصنع حضورك");
  expect(menuAfterContent).toContain("جاهز تنمو أعمالك");
  expect(firstLinkBeforeContent).toBe('""');
});

test("legacy mobile polish asset is served for pixel-perfect baseline pages", async ({ page }) => {
  const response = await page.request.get("/legacy-assets/mobile-polish.css");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("text/css");
});

test("public app routes intentionally use legacy visual baseline until screenshot parity passes", async () => {
  const routeFiles = [
    "src/app/page.tsx",
    "src/app/about/page.tsx",
    "src/app/services/page.tsx",
    "src/app/services/[slug]/page.tsx",
    "src/app/offers/page.tsx",
    "src/app/products/page.tsx",
    "src/app/portfolio/page.tsx",
    "src/app/articles/page.tsx",
    "src/app/articles/[slug]/page.tsx",
    "src/app/faq/page.tsx",
    "src/app/contact/page.tsx",
  ];

  for (const file of routeFiles) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    expect(source).toContain("LegacyPage");
    expect(source).toContain("getLegacyMetadata");
  }
});
