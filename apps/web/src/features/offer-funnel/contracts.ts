import { z } from "zod";

export const egyptWhatsAppPhoneSchema = z
  .string()
  .trim()
  .regex(/^(\+?20|0)(10|11|12|15)\d{8}$/, "Enter an Egyptian mobile number like 01068274662 or +201068274662");

const offerPopupFieldsSchema = z.object({
  enabled: z.boolean().default(true),
  dwellSeconds: z.coerce.number().int().min(1).max(3600).default(30),
  discountPercent: z.coerce.number().int().min(1).max(100).default(10),
  offerHours: z.coerce.number().int().min(1).max(720).default(48),
  cooldownHours: z.coerce.number().int().min(0).max(720).default(24),
  title: z.string().trim().min(1).max(120).default("عرض خاص لمدة محدودة"),
  bodyTemplate: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .default("مهتم بـ {{section}}؟ عندك خصم {{discount}}% لمدة {{hours}} ساعة فقط."),
  ctaLabel: z.string().trim().min(1).max(80).default("افتح واتساب الآن"),
});

const defaultSectionOffer = {
  enabled: true,
  dwellSeconds: 30,
  discountPercent: 10,
  offerHours: 48,
  cooldownHours: 24,
  title: "عرض خاص لمدة محدودة",
  bodyTemplate: "مهتم بـ {{section}}؟ عندك خصم {{discount}}% لمدة {{hours}} ساعة فقط.",
  ctaLabel: "افتح واتساب الآن",
} as const;

const offerPopupSchema = offerPopupFieldsSchema.default(defaultSectionOffer);

const whatsappSchema = z
  .object({
    enabled: z.boolean().default(true),
    phone: egyptWhatsAppPhoneSchema.default("01068274662"),
    ctaLabel: z.string().trim().min(1).max(80).default("تواصل على واتساب"),
    messageTemplate: z
      .string()
      .trim()
      .min(1)
      .max(500)
      .default("مرحبا، أنا مهتم بخدمة {{section}} وأريد معرفة تفاصيل العرض."),
    pulseCta: z.boolean().default(true),
  })
  .default({
    enabled: true,
    phone: "01068274662",
    ctaLabel: "تواصل على واتساب",
    messageTemplate: "مرحبا، أنا مهتم بخدمة {{section}} وأريد معرفة تفاصيل العرض.",
    pulseCta: true,
  });

export const offerFunnelSettingsSchema = z
  .object({
    enabled: z.boolean().default(true),
    sectionOffer: offerPopupSchema,
    siteOffer: offerPopupFieldsSchema
      .extend({
        dwellSeconds: z.coerce.number().int().min(1).max(3600).default(120),
      })
      .default({
        ...defaultSectionOffer,
        dwellSeconds: 120,
      }),
    whatsapp: whatsappSchema,
    sectionLabelOverrides: z.record(z.string(), z.string().trim().min(1).max(120)).default({}),
  })
  .default({
    enabled: true,
    sectionOffer: defaultSectionOffer,
    siteOffer: {
      ...defaultSectionOffer,
      dwellSeconds: 120,
    },
    whatsapp: {
      enabled: true,
      phone: "01068274662",
      ctaLabel: "تواصل على واتساب",
      messageTemplate: "مرحبا، أنا مهتم بخدمة {{section}} وأريد معرفة تفاصيل العرض.",
      pulseCta: true,
    },
    sectionLabelOverrides: {},
  });

export type OfferFunnelSettings = z.infer<typeof offerFunnelSettingsSchema>;

export const defaultOfferFunnelSettings = offerFunnelSettingsSchema.parse({});

function isQuestionMarkCopy(value: string) {
  if (value.includes("???")) return true;

  const compact = value.replace(/[\s{}%.,:؛،؟_-]/g, "");
  return compact.length > 0 && /^[?]+$/.test(compact);
}

function cleanCopy(value: string, fallback: string) {
  return isQuestionMarkCopy(value) ? fallback : value;
}

export function repairCorruptedOfferFunnelSettings(settings: OfferFunnelSettings): OfferFunnelSettings {
  return {
    ...settings,
    sectionOffer: {
      ...settings.sectionOffer,
      title: cleanCopy(settings.sectionOffer.title, defaultOfferFunnelSettings.sectionOffer.title),
      bodyTemplate: cleanCopy(settings.sectionOffer.bodyTemplate, defaultOfferFunnelSettings.sectionOffer.bodyTemplate),
      ctaLabel: cleanCopy(settings.sectionOffer.ctaLabel, defaultOfferFunnelSettings.sectionOffer.ctaLabel),
    },
    siteOffer: {
      ...settings.siteOffer,
      title: cleanCopy(settings.siteOffer.title, defaultOfferFunnelSettings.siteOffer.title),
      bodyTemplate: cleanCopy(settings.siteOffer.bodyTemplate, defaultOfferFunnelSettings.siteOffer.bodyTemplate),
      ctaLabel: cleanCopy(settings.siteOffer.ctaLabel, defaultOfferFunnelSettings.siteOffer.ctaLabel),
    },
    whatsapp: {
      ...settings.whatsapp,
      ctaLabel: cleanCopy(settings.whatsapp.ctaLabel, defaultOfferFunnelSettings.whatsapp.ctaLabel),
      messageTemplate: cleanCopy(settings.whatsapp.messageTemplate, defaultOfferFunnelSettings.whatsapp.messageTemplate),
    },
  };
}

export type OfferTemplateContext = {
  section: string;
  page: string;
  discount: string;
  hours: string;
};

export function renderOfferTemplate(template: string, context: OfferTemplateContext) {
  return template
    .replaceAll("{{section}}", context.section)
    .replaceAll("{{page}}", context.page)
    .replaceAll("{{discount}}", context.discount)
    .replaceAll("{{hours}}", context.hours);
}
