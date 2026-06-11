import { afterEach, beforeAll, describe, expect, mock, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let getOfferFunnelSettings: typeof import("./settings-store").getOfferFunnelSettings;
let saveOfferFunnelSettings: typeof import("./settings-store").saveOfferFunnelSettings;

beforeAll(async () => {
  mock.module("server-only", () => ({}));
  ({ getOfferFunnelSettings, saveOfferFunnelSettings } = await import("./settings-store"));
});

describe("offer funnel settings store", () => {
  const tempRoots: string[] = [];

  afterEach(() => {
    while (tempRoots.length) {
      rmSync(tempRoots.pop()!, { recursive: true, force: true });
    }
    delete process.env.OFFER_FUNNEL_SETTINGS_PATH;
  });

  test("returns defaults when no persisted file exists", async () => {
    const tempRoot = mkdtempSync(join(tmpdir(), "sweed-offer-funnel-"));
    tempRoots.push(tempRoot);
    process.env.OFFER_FUNNEL_SETTINGS_PATH = join(tempRoot, "settings.json");

    const settings = await getOfferFunnelSettings();

    expect(settings.sectionOffer.dwellSeconds).toBe(60);
    expect(settings.siteOffer.enabled).toBe(true);
  });

  test("persists valid settings and reads them back", async () => {
    const tempRoot = mkdtempSync(join(tmpdir(), "sweed-offer-funnel-"));
    tempRoots.push(tempRoot);
    process.env.OFFER_FUNNEL_SETTINGS_PATH = join(tempRoot, "settings.json");

    await saveOfferFunnelSettings({
      enabled: true,
      sectionOffer: {
        enabled: true,
        dwellSeconds: 75,
        discountPercent: 15,
        offerHours: 48,
        cooldownHours: 24,
        title: "عرض سريع",
        bodyTemplate: "مهتم بـ {{section}}؟ عندك خصم {{discount}}% لمدة {{hours}} ساعة.",
        ctaLabel: "افتح واتساب الآن",
      },
      siteOffer: {
        enabled: false,
        dwellSeconds: 120,
        discountPercent: 12,
        offerHours: 48,
        cooldownHours: 24,
        title: "عرض عام",
        bodyTemplate: "مهتم بالموقع؟ عندك خصم {{discount}}%.",
        ctaLabel: "ابدأ الآن",
      },
      whatsapp: {
        enabled: true,
        phone: "201112223334",
        ctaLabel: "واتساب",
        messageTemplate: "أريد الاستفسار عن {{section}}",
        pulseCta: true,
      },
      sectionLabelOverrides: {
        services: "الخدمات",
      },
    });

    const settings = await getOfferFunnelSettings();

    expect(settings.sectionOffer.dwellSeconds).toBe(75);
    expect(settings.whatsapp.phone).toBe("201112223334");
    expect(settings.sectionLabelOverrides.services).toBe("الخدمات");
  });
});
