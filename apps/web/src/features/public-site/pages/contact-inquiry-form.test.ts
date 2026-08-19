import { describe, expect, test } from "bun:test";
import { buildContactLeadPayload, validateContactInquiry } from "./contact-inquiry-form.logic";

describe("contact inquiry form", () => {
  test("rejects a name shorter than two characters", () => {
    const errors = validateContactInquiry({ name: "أ", company: "", phone: "01068274662", service: "consulting", notes: "محتاج مساعدة في ترتيب خطة المشروع" });
    expect(errors.name).toBe("اكتب اسمك بحرفين على الأقل");
  });

  test("rejects an invalid phone", () => {
    const errors = validateContactInquiry({ name: "أحمد", company: "", phone: "123", service: "consulting", notes: "محتاج مساعدة في ترتيب خطة المشروع" });
    expect(errors.phone).toBe("اكتب رقم هاتف صحيح");
  });

  test("requires a selected service", () => {
    const errors = validateContactInquiry({ name: "أحمد", company: "", phone: "01068274662", service: "", notes: "محتاج مساعدة في ترتيب خطة المشروع" });
    expect(errors.service).toBe("اختر الخدمة الأقرب لاحتياجك");
  });

  test("requires notes of at least ten characters", () => {
    const errors = validateContactInquiry({ name: "أحمد", company: "", phone: "01068274662", service: "consulting", notes: "قصيرة" });
    expect(errors.notes).toBe("اكتب نبذة من 10 أحرف على الأقل");
  });

  test("builds the existing lead API payload with conversion context", () => {
    const values = { name: "أحمد", company: "شركة الاختبار", phone: "01068274662", service: "consulting", notes: "محتاج مساعدة في ترتيب خطة المشروع" };
    expect(validateContactInquiry(values)).toEqual({});
    expect(buildContactLeadPayload(values, {
      source: "offers-quiz",
      selectedService: "consulting",
      selectedOffer: "partnership",
    }, "")).toEqual({
      name: "أحمد",
      company: "شركة الاختبار",
      phone: "01068274662",
      interest: "consulting",
      message: "محتاج مساعدة في ترتيب خطة المشروع",
      source: "offers-quiz",
      selectedService: "consulting",
      selectedOffer: "partnership",
      website: "",
    });
  });
});
