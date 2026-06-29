import { expect, test } from "@playwright/test";

test("admin offer funnel page renders the control surface", async ({ page }) => {
  await page.goto("/admin/offer-funnel");
  await expect(page.locator("main", { hasText: "SWEED Admin" })).toBeVisible();
  await expect(page.locator("input").filter({ hasText: "" }).first()).toBeVisible();
});

test("public page shows the offer popup centered with a blurred backdrop", async ({ page, isMobile }) => {
  test.skip(true, "offer popups are disabled by the production kill switch");
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
            ctaLabel: "راسلنا واتساب",
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
  const shell = page.getByTestId("offer-funnel-popup-shell");
  const dialog = page.getByRole("dialog", { name: "Offer popup" });
  await expect(dialog).toBeVisible();
  await expect(page.getByText("عرض لحظي")).toBeVisible();
  await expect(shell).toHaveCSS("position", "fixed");
  await expect(shell).toHaveCSS("place-items", "center");
  await expect(shell).toHaveCSS("background-color", /rgba\(22, 16, 36, 0\.48\)/);

  const box = await dialog.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(Math.abs(box!.x + box!.width / 2 - viewport!.width / 2)).toBeLessThan(80);
  expect(Math.abs(box!.y + box!.height / 2 - viewport!.height / 2)).toBeLessThan(80);

  await expect(page.getByRole("link", { name: "راسلنا واتساب" })).toHaveAttribute("href", /wa\.me\/201068274662/);
});
