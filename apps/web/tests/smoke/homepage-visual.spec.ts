import { expect, test } from "@playwright/test";

const visualSections = [
  "home",
  "expertise",
  "problems",
  "services",
  "about",
  "portfolio",
  "offers",
  "blog",
  "faq",
  "contact",
] as const;

test("react homepage visual baselines by section", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      .sweed-common-top-bar,
      .sweed-common-header,
      .mobile-menu-overlay,
      [class*="logoLoop"],
      [class*="ai-advisor"],
      [data-testid="offer-funnel-popup-shell"] {
        display: none !important;
      }
    `,
  });
  await expect(page.locator("#home")).toBeVisible();
  await expect(page.locator("#services")).toContainText("خدماتنا المتكاملة");

  for (const sectionId of visualSections) {
    const section = page.locator(`#${sectionId}`);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot(`react-homepage-${sectionId}-${testInfo.project.name}.png`, {
      maxDiffPixelRatio: 0.02,
    });
  }
});
