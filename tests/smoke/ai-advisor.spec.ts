import { expect, test } from "@playwright/test";

test("advisor API validates input", async ({ page }) => {
  const response = await page.request.post("/api/ai/advisor", {
    data: { mode: "advisor", message: "" },
  });

  expect(response.status()).toBe(400);
});

test("advisor popup can send a visitor question and render a reply", async ({ page }) => {
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
  await page.getByRole("button", { name: "Open AI advisor" }).click();
  await page.getByLabel("اكتب رسالتك للمساعد").fill("عايز باقة مناسبة لشركة صغيرة");
  await page.getByRole("button", { name: "إرسال" }).click();

  await expect(page.locator("aside")).toContainText("باقة النمو");
});

test("services page automation demo runs through the advisor API", async ({ page }) => {
  await page.route("**/api/ai/advisor", async (route) => {
    await route.fulfill({
      json: {
        message: "الذكاء الاصطناعي يفرز العميل ثم يقترح الخدمة ويفتح مسار التواصل.",
        recommendation: "أتمتة العملاء",
        cta: { label: "تواصل مع SWEED", href: "/contact#contact-form" },
        references: ["/services#ai-automation-demo"],
        fallback: false,
      },
    });
  });

  await page.goto("/services#ai-automation-demo");
  await page.waitForLoadState("networkidle");
  const demo = page.locator("#ai-automation-demo");
  await demo.getByRole("button", { name: "تشغيل الديمو" }).click();

  await expect(demo).toContainText("يفرز العميل");
});
