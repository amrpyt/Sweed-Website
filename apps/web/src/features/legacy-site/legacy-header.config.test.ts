import { describe, expect, test } from "bun:test";
import { defaultNavItems, footerQuickLinks, homeNavItems } from "./legacy-header.config";

const pageRoutes = ["/", "/about", "/services", "/portfolio", "/offers", "/articles", "/contact"];

describe("public navigation route policy", () => {
  test("uses standalone routes on internal pages", () => {
    expect(defaultNavItems.map((item) => item.href)).toEqual(pageRoutes);
  });

  test("opens the full About page from the homepage navigation", () => {
    const aboutItem = homeNavItems.find((item) => item.label === "من نحن");

    expect(aboutItem?.href).toBe("/about");
    expect(homeNavItems.some((item) => item.href === "/#about")).toBe(false);
  });

  test("keeps intentional homepage section links for the remaining homepage items", () => {
    expect(homeNavItems.map((item) => item.href)).toEqual([
      "/#home",
      "/about",
      "/#services",
      "/#portfolio",
      "/#offers",
      "/#blog",
      "/contact",
    ]);
  });

  test("uses standalone page routes in the shared footer", () => {
    expect(footerQuickLinks.map((item) => item.href)).toEqual(pageRoutes.slice(0, -1));
    expect(footerQuickLinks.some((item) => item.href.includes("#"))).toBe(false);
  });
});
