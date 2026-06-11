import { afterEach, beforeAll, describe, expect, mock, test } from "bun:test";

let getOfferFunnelSettings: typeof import("./settings-store").getOfferFunnelSettings;
let saveOfferFunnelSettings: typeof import("./settings-store").saveOfferFunnelSettings;
let resetMemoryOfferFunnelSettingsForTest: typeof import("./settings-store").resetMemoryOfferFunnelSettingsForTest;

beforeAll(async () => {
  mock.module("server-only", () => ({}));
  ({ getOfferFunnelSettings, resetMemoryOfferFunnelSettingsForTest, saveOfferFunnelSettings } = await import("./settings-store"));
});

describe("offer funnel settings store", () => {
  afterEach(() => {
    resetMemoryOfferFunnelSettingsForTest();
  });

  test("returns defaults when no durable backend is configured", async () => {
    const settings = await getOfferFunnelSettings();

    expect(settings.sectionOffer.dwellSeconds).toBe(30);
    expect(settings.siteOffer.enabled).toBe(true);
  });

  test("keeps valid settings in memory when no durable backend is configured", async () => {
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
