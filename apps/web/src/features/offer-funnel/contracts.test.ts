import { describe, expect, test } from "bun:test";
import { defaultOfferFunnelSettings, offerFunnelSettingsSchema, repairCorruptedOfferFunnelSettings } from "./contracts";

describe("offerFunnelSettingsSchema", () => {
  test("provides stable defaults for popup and WhatsApp controls", () => {
    const result = offerFunnelSettingsSchema.safeParse({});

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.enabled).toBe(true);
      expect(result.data.sectionOffer.dwellSeconds).toBe(30);
      expect(result.data.siteOffer.dwellSeconds).toBe(120);
      expect(result.data.sectionOffer.discountPercent).toBe(10);
      expect(result.data.whatsapp.phone).toBe("01068274662");
    }
  });

  test("accepts Egyptian mobile numbers in local and international formats", () => {
    const local = offerFunnelSettingsSchema.safeParse({ whatsapp: { phone: "01122233344" } });
    const international = offerFunnelSettingsSchema.safeParse({ whatsapp: { phone: "+201122233344" } });

    expect(local.success).toBe(true);
    expect(international.success).toBe(true);
  });

  test("rejects invalid dwell thresholds and malformed phone numbers", () => {
    const result = offerFunnelSettingsSchema.safeParse({
      sectionOffer: { dwellSeconds: 0 },
      whatsapp: { phone: "01-abc" },
    });

    expect(result.success).toBe(false);
  });

  test("repairs question-mark copy from corrupted persisted settings", () => {
    const repaired = repairCorruptedOfferFunnelSettings({
      ...defaultOfferFunnelSettings,
      sectionOffer: {
        ...defaultOfferFunnelSettings.sectionOffer,
        title: "??? ??? ????",
        bodyTemplate: "???? ?? {{section}}? ???? ??? {{discount}}%",
      },
      whatsapp: {
        ...defaultOfferFunnelSettings.whatsapp,
        ctaLabel: "????? ??? ??????",
        messageTemplate: "?????? ??? ???? ????? {{section}}",
      },
    });

    expect(repaired.sectionOffer.title).toBe(defaultOfferFunnelSettings.sectionOffer.title);
    expect(repaired.sectionOffer.bodyTemplate).toBe(defaultOfferFunnelSettings.sectionOffer.bodyTemplate);
    expect(repaired.whatsapp.ctaLabel).toBe(defaultOfferFunnelSettings.whatsapp.ctaLabel);
    expect(repaired.whatsapp.messageTemplate).toBe(defaultOfferFunnelSettings.whatsapp.messageTemplate);
  });
});
