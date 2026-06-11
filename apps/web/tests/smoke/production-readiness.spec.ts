import { expect, test, type Page } from "@playwright/test";

const publicRoutes = ["/", "/about", "/services", "/offers", "/products", "/portfolio", "/articles", "/faq", "/contact"];

function watchPageHealth(page: Page) {
  const consoleIssues: string[] = [];
  const requestFailures: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleIssues.push(message.text());
    }
  });

  page.on("requestfailed", (request) => {
    const failureText = request.failure()?.errorText ?? "";
    const resourceType = request.resourceType();

    // Browser navigation and RSC prefetches can be aborted when Playwright moves between pages.
    if (failureText.includes("ERR_ABORTED") && ["document", "fetch", "font", "image", "script", "stylesheet"].includes(resourceType)) {
      return;
    }

    requestFailures.push(`${request.method()} ${request.url()} ${failureText}`);
  });

  return { consoleIssues, requestFailures };
}

test("production public routes respond and render the shared shell", async ({ page }) => {
  const health = watchPageHealth(page);

  for (const route of publicRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response?.status(), route).toBe(200);
    await expect(page.locator("body"), route).toBeVisible();
    await expect(page.locator(".sweed-common-header"), route).toHaveCount(1);
    await expect(page.locator(".sweed-common-footer"), route).toHaveCount(1);
    await expect(page.locator("body"), route).toContainText("info@sweed.com");
  }

  expect(health.consoleIssues).toEqual([]);
  expect(health.requestFailures).toEqual([]);
});

test("production admin surface is protected", async ({ page }) => {
  const response = await page.request.get("/admin/offer-funnel", { failOnStatusCode: false });

  expect(response.status()).toBe(401);
  expect(response.headers()["www-authenticate"]).toContain("Basic");
});

test("production SEO endpoints and security headers are present", async ({ page }) => {
  const home = await page.request.get("/");
  const headers = home.headers();

  expect(home.ok()).toBeTruthy();
  expect(headers["content-security-policy"]).toContain("default-src");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["strict-transport-security"]).toContain("max-age=");

  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(sitemap.headers()["content-type"]).toMatch(/xml/);
  expect(await sitemap.text()).toContain("https://sweed.com/");

  const robots = await page.request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap: https://sweed.com/sitemap.xml");
});

test("production advisor API accepts the public contract", async ({ page }) => {
  const response = await page.request.post("/api/ai/advisor", {
    data: {
      mode: "advisor",
      message: "ما هي خدمات سويد؟",
      resourceId: "prod-readiness-smoke",
      threadId: "prod-readiness-smoke",
      history: [],
    },
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toMatchObject({
    cta: { href: expect.any(String), label: expect.any(String) },
    fallback: expect.any(Boolean),
    message: expect.any(String),
    recommendation: expect.any(String),
    references: expect.any(Array),
  });
});

test("production visual checkpoints can render key homepage sections", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile"), "desktop-only section screenshots keep prod smoke fast");

  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("body")).toContainText("نحوّل أحلامك");
  await page.screenshot({ path: testInfo.outputPath("home-hero.png"), fullPage: false });

  for (const [name, selector] of [
    ["services", "#services"],
    ["contact", "#contact"],
  ] as const) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: testInfo.outputPath(`home-${name}.png`), fullPage: false });
  }
});
