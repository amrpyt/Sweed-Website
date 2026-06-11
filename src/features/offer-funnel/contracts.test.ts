import { describe, expect, test } from "bun:test";
import { offerFunnelSettingsSchema } from "./contracts";

describe("offerFunnelSettingsSchema", () => {
  test("provides stable defaults for popup and WhatsApp controls", () => {
    const result = offerFunnelSettingsSchema.safeParse({});

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.enabled).toBe(true);
      expect(result.data.sectionOffer.dwellSeconds).toBe(60);
      expect(result.data.siteOffer.dwellSeconds).toBe(90);
      expect(result.data.sectionOffer.discountPercent).toBe(10);
      expect(result.data.whatsapp.phone).toBe("201068274662");
    }
  });

  test("rejects invalid dwell thresholds and malformed phone numbers", () => {
    const result = offerFunnelSettingsSchema.safeParse({
      sectionOffer: { dwellSeconds: 0 },
      whatsapp: { phone: "01-abc" },
    });

    expect(result.success).toBe(false);
  });
});
