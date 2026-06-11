import { renderOfferTemplate } from "./contracts";

export function normalizeEgyptWhatsAppPhone(phone: string) {
  const compact = phone.replace(/[^\d+]/g, "");
  const withoutPlus = compact.startsWith("+") ? compact.slice(1) : compact;

  if (/^01(0|1|2|5)\d{8}$/.test(withoutPlus)) {
    return `2${withoutPlus}`;
  }

  return withoutPlus;
}

export function buildWhatsAppHref({
  phone,
  template,
  sectionLabel,
  discountPercent,
  offerHours,
  pageLabel,
}: {
  phone: string;
  template: string;
  sectionLabel: string;
  discountPercent: number;
  offerHours: number;
  pageLabel: string;
}) {
  const message = renderOfferTemplate(template, {
    section: sectionLabel,
    page: pageLabel,
    discount: String(discountPercent),
    hours: String(offerHours),
  });
  const normalizedPhone = normalizeEgyptWhatsAppPhone(phone);

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
