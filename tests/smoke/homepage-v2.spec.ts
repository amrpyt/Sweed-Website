import { expect, test } from "@playwright/test";

test("homepage v2 preview renders without replacing live homepage", async ({ page }) => {
  await page.goto("/homepage-v2");
  await expect(page.locator("body")).toContainText("Homepage V2 Preview");
  await expect(page.locator("body")).toContainText("لا نبيع إعلان");
  await expect(page.locator("#process")).toContainText("كيف نعمل معك خطوة بخطوة");

  for (const selector of ["#home", "#signals", "#offers", "#process", "#proof", "#contact"]) {
    await expect(page.locator(selector)).toHaveCount(1);
  }

  await page.goto("/");
  await expect(page.locator("body")).toContainText("نحوّل أحلامك إلى إنجازات حقيقية");
});
