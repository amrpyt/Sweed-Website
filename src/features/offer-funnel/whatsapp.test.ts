import { describe, expect, test } from "bun:test";
import { buildWhatsAppHref, normalizeEgyptWhatsAppPhone } from "./whatsapp";

describe("buildWhatsAppHref", () => {
  test("normalizes Egyptian local mobile numbers for wa.me", () => {
    expect(normalizeEgyptWhatsAppPhone("01068274662")).toBe("201068274662");
    expect(normalizeEgyptWhatsAppPhone("+201068274662")).toBe("201068274662");
  });

  test("builds a WhatsApp deep link with section-aware placeholders", () => {
    const href = buildWhatsAppHref({
      phone: "01068274662",
      template: "مرحبا، أنا مهتم بقسم {{section}} وفي عرض {{discount}}% لمدة {{hours}} ساعة.",
      sectionLabel: "خدماتنا",
      discountPercent: 10,
      offerHours: 48,
      pageLabel: "services",
    });

    expect(href).toContain("https://wa.me/201068274662?text=");
    expect(decodeURIComponent(href)).toContain("خدماتنا");
    expect(decodeURIComponent(href)).toContain("10%");
    expect(decodeURIComponent(href)).toContain("48");
  });
});
