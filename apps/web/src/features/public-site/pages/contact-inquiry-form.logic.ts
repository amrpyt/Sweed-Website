export type ContactInquiryValues = {
  name: string;
  phone: string;
  service: string;
  notes: string;
};

export type ContactInquiryErrors = Partial<Record<keyof ContactInquiryValues | "form", string>>;

export type ContactInquiryContext = {
  source: string;
  selectedService?: string;
  selectedOffer?: string;
};

export function validateContactInquiry(values: ContactInquiryValues): ContactInquiryErrors {
  const errors: ContactInquiryErrors = {};

  if (values.name.trim().length < 2) errors.name = "اكتب اسمك بحرفين على الأقل";
  if (!/^[0-9+()\-\s]{8,40}$/.test(values.phone.trim())) errors.phone = "اكتب رقم هاتف صحيح";
  if (!values.service.trim()) errors.service = "اختر الخدمة الأقرب لاحتياجك";
  if (values.notes.trim().length < 10) errors.notes = "اكتب نبذة من 10 أحرف على الأقل";

  return errors;
}

export function buildContactLeadPayload(
  values: ContactInquiryValues,
  context: ContactInquiryContext,
  website: string,
) {
  return {
    name: values.name.trim(),
    phone: values.phone.trim(),
    interest: values.service,
    message: values.notes.trim(),
    source: context.source || "contact-page",
    selectedService: context.selectedService || values.service,
    selectedOffer: context.selectedOffer ?? "",
    website,
  };
}
