import { describe, expect, test } from "bun:test";
import { publicSiteContentRepository } from "./public-site-content-repository";

describe("public-site content repository", () => {
  test("returns shared shell data with production contact details", () => {
    const shell = publicSiteContentRepository.getShellData();

    expect(shell.navigation.length).toBeGreaterThan(4);
    expect(shell.contactAction.href).toBe("/contact");
    expect(shell.siteSettings.primaryEmail).toBe("info@sweed.com");
    expect(shell.siteSettings.primaryPhone).toBe("01068274662");
  });

  test("returns sorted services listing source", () => {
    const source = publicSiteContentRepository.getServicesPageSource();

    expect(source.section.id).toBe("services");
    expect(source.services.map((service) => service.slug)).toEqual(["digital-marketing", "websites", "ai-automation"]);
    expect(source.cta.primaryAction.href).toBe("/contact");
  });
});
