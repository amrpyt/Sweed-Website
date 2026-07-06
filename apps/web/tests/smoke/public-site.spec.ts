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

test("react homepage renders key content and stable anchors", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toContainText("نصنع العلامات التي تقود المستقبل");
  await expect(page.locator("#services")).toContainText("خدماتنا المتكاملة");

  for (const selector of ["#home", "#problems", "#services", "#about", "#portfolio", "#offers", "#blog", "#faq", "#contact"]) {
    await expect(page.locator(selector)).toHaveCount(1);
  }
});

test("home staggered navigation points to homepage section anchors in the requested order", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("sweed-menu-button").click();
  const navLinks = page.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link");
  await expect(navLinks).toHaveCount(9);
  await expect(navLinks.nth(0)).toHaveAttribute("href", "/#home");
  await expect(navLinks.nth(2)).toHaveAttribute("href", "/#offers");
  await expect(navLinks.nth(3)).toHaveAttribute("href", "/#services");
  await expect(navLinks.nth(8)).toHaveAttribute("href", "/#contact");
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
