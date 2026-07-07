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
