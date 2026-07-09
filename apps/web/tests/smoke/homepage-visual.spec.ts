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
      [data-testid="sweed-staggered-menu"],
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

test("brand gap section uses Arabic copy and SWEED dark surface", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const section = page.locator("#brand-gap");
  await section.scrollIntoViewIfNeeded();

  await expect(section).toHaveAttribute("aria-label", "نحوّل فجوة الحضور الرقمي إلى ثقة وطلب");
  await expect(section).toContainText("SWEED / الحضور الرقمي");
  await expect(section).toContainText("نحوّل");
  await expect(section).toContainText("الفجوة");
  await expect(section).toContainText("حضورك الرقمي لازم يشرح قيمتك");
  await expect(section.locator('[class*="char"]')).toHaveCount(0);
  await expect(section).toHaveCSS("background-color", "rgb(38, 27, 62)");
});

test("services stack contains future cards on desktop and keeps mobile horizontal scrolling", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const story = page.getByTestId("home-services-story");
  const list = page.getByTestId("home-services-list");
  const panels = page.getByTestId("home-service-panel");

  await expect(story).toBeVisible();
  await expect(panels).toHaveCount(6);

  if (isMobile) {
    await expect(story).toHaveCSS("overflow", "visible");
    await expect(list).toHaveCSS("overflow-x", "auto");
    expect(await list.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
    return;
  }

  await expect(story).toHaveCSS("overflow", "hidden");
  await expect(list).toHaveCSS("overflow", "hidden");
  await expect(panels.nth(5)).toHaveAttribute("data-service-index", "6");
});
