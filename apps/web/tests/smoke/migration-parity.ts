import { expect, type Page } from "@playwright/test";

export type MigratedRouteExpectation = {
  route: string;
  requiredText: string[];
  links?: Array<{
    name: string;
    href: string | RegExp;
  }>;
};

export async function expectMigratedRoute(page: Page, expectation: MigratedRouteExpectation) {
  await page.goto(expectation.route);
  await expect(page.locator("body")).toBeVisible();

  for (const text of expectation.requiredText) {
    await expect(page.locator("body")).toContainText(text);
  }

  for (const link of expectation.links ?? []) {
    await expect(page.getByRole("link", { name: link.name }).first()).toHaveAttribute("href", link.href);
  }
}

export async function expectNoKnownConsoleIssues(page: Page, route: string) {
  const messages: string[] = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      messages.push(message.text());
    }
  });

  await page.goto(route, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  expect(messages.filter((message) => /Content Security Policy|mobile-polish|preload/i.test(message))).toEqual([]);
}
