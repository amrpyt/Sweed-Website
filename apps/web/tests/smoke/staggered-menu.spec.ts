import { expect, test, type Page } from "@playwright/test";

async function waitForPageReady(page: Page) {
  await page.waitForLoadState("networkidle");
}

async function openMenu(page: Page) {
  const trigger = page.getByTestId("sweed-menu-button");
  const panel = page.getByTestId("sweed-menu-panel");

  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toHaveAttribute("data-motion-state", "open");

  return { panel, trigger };
}

test("Arabic staggered menu opens, traps the page, and closes with Escape", async ({ page }) => {
  await page.goto("/");
  await waitForPageReady(page);

  const trigger = page.getByTestId("sweed-menu-button");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  const { panel } = await openMenu(page);

  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(
    panel.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link"),
  ).toHaveCount(9);
  await expect(panel.locator('[aria-current="page"]')).toHaveCount(1);

  await page.keyboard.press("Escape");

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toHaveAttribute("data-motion-state", "closed");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("staggered menu keeps homepage anchors and closes after navigation", async ({ page }) => {
  await page.goto("/");
  await waitForPageReady(page);

  const { panel, trigger } = await openMenu(page);
  await panel.getByRole("link", { name: "انتقل إلى من نحن" }).click();

  await expect(page).toHaveURL(/\/#about$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toHaveAttribute("data-motion-state", "closed");
  await expect(panel).toBeHidden();
});

test("staggered menu is side anchored on desktop and full width on mobile", async ({
  page,
  isMobile,
}) => {
  await page.goto("/articles");
  await waitForPageReady(page);

  const { panel } = await openMenu(page);
  await expect(panel).toBeVisible();

  const viewportWidth = page.viewportSize()?.width ?? 0;
  const panelBox = await panel.boundingBox();
  const panelWidth = Math.round(panelBox?.width ?? 0);

  if (isMobile) {
    expect(panelWidth).toBe(viewportWidth);
  } else {
    expect(panelWidth).toBeLessThan(viewportWidth);
    expect(Math.round((panelBox?.x ?? 0) + panelWidth)).toBe(viewportWidth);
  }

  const hasHorizontalOverflow = await panel.evaluate(
    (element) => element.scrollWidth > element.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
