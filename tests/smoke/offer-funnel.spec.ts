import { expect, test } from "@playwright/test";

test("admin offer funnel page renders the control surface", async ({ page }) => {
  await page.goto("/admin/offer-funnel");
  await expect(page.getByRole("heading", { name: "لوحة تحكم العروض والواتساب" })).toBeVisible();
  await expect(page.getByLabel("رقم واتساب")).toHaveValue("201068274662");
});

test("public page can show a timed popup from controlled settings", async ({ page, isMobile }) => {
  test.skip(isMobile, "one runtime popup proof is enough on desktop here");

  await page.route("**/api/offer-funnel", async (route) => {
    await route.fulfill({
      json: {
        settings: {
          enabled: true,
          sectionOffer: {
            enabled: true,
            dwellSeconds: 1,
            discountPercent: 10,
            offerHours: 48,
            cooldownHours: 0,
            title: "عرض لحظي",
            bodyTemplate: "مهتم بـ {{section}}؟ عندك خصم {{discount}}% لمدة {{hours}} ساعة.",
            ctaLabel: "واتساب الآن",
          },
          siteOffer: {
            enabled: false,
            dwellSeconds: 90,
            discountPercent: 10,
            offerHours: 48,
            cooldownHours: 24,
            title: "عرض عام",
            bodyTemplate: "عرض عام",
            ctaLabel: "ابدأ",
          },
          whatsapp: {
            enabled: true,
            phone: "201068274662",
            ctaLabel: "راسلنا واتساب",
            messageTemplate: "أنا مهتم بقسم {{section}}",
            pulseCta: true,
          },
          sectionLabelOverrides: {
            hero: "بداية الصفحة",
          },
        },
      },
    });
  });

  await page.goto("/");
  await expect(page.getByRole("dialog", { name: "Offer popup" })).toBeVisible();
  await expect(page.getByText("عرض لحظي")).toBeVisible();
  await expect(page.getByRole("link", { name: "راسلنا واتساب" })).toHaveAttribute(
    "href",
    /wa\.me\/201068274662/,
  );
});
