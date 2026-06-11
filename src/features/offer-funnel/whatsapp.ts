import { renderOfferTemplate } from "./contracts";

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

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
