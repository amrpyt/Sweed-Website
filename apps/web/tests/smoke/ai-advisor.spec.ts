import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const style = document.createElement("style");
    style.textContent = "nextjs-portal { pointer-events: none !important; }";
    document.documentElement.append(style);
  });
});

async function openAdvisor(page: import("@playwright/test").Page) {
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open AI advisor" }).click({ force: true });
  await expect(page.locator("aside[aria-label='SWEED support center'] details").first()).toHaveAttribute("open", "");
}

test("advisor API validates input", async ({ page }) => {
  const response = await page.request.post("/api/ai/advisor", {
    data: { mode: "advisor", message: "" },
  });

  expect(response.status()).toBe(400);
});

test("advisor popup can send a visitor question and render a reply", async ({ page }) => {
  const quickPrompt = "عايز أعرف أنسب باقة لشركة صغيرة";

  await page.route("**/api/ai/advisor", async (route) => {
    await route.fulfill({
      json: {
        message: "أنسب بداية هي باقة النمو مع صفحة تواصل واضحة.",
        recommendation: "باقة النمو",
        cta: { label: "تواصل مع SWEED", href: "/contact#contact-form" },
        references: ["/offers#offers"],
        fallback: false,
      },
    });
  });

  await page.goto("/");
  await openAdvisor(page);
  await page.getByRole("button", { name: quickPrompt }).click();

  await expect(page.getByRole("complementary", { name: "SWEED support center" })).toContainText("باقة النمو");
});

test("support drawer offers visitor choice on services page", async ({ page }) => {
  await page.route("**/api/ai/advisor", async (route) => {
    await route.fulfill({
      json: {
        message: "الشات يعمل من صفحة الخدمات.",
        recommendation: "أتمتة العملاء",
        cta: { label: "تواصل مع SWEED", href: "/contact#contact-form" },
        references: ["/services"],
        fallback: false,
      },
    });
  });

  await page.goto("/services");
  await openAdvisor(page);
  await expect(page.getByRole("button", { name: /شات AI مباشر/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /دعم مباشر أو تذكرة/ })).toBeVisible();
  await page.getByRole("button", { name: "محتاج خطة تسويق لمشروع جديد" }).click();

  await expect(page.getByRole("complementary", { name: "SWEED support center" })).toContainText("أتمتة العملاء");
});
