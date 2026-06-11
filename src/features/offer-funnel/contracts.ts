import { z } from "zod";

const offerPopupFieldsSchema = z.object({
  enabled: z.boolean().default(true),
  dwellSeconds: z.coerce.number().int().min(1).max(3600).default(60),
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
  dwellSeconds: 60,
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
    phone: z.string().trim().regex(/^\d{8,15}$/).default("201068274662"),
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
    phone: "201068274662",
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
        dwellSeconds: z.coerce.number().int().min(1).max(3600).default(90),
      })
      .default({
        ...defaultSectionOffer,
        dwellSeconds: 90,
      }),
    whatsapp: whatsappSchema,
    sectionLabelOverrides: z.record(z.string(), z.string().trim().min(1).max(120)).default({}),
  })
  .default({
    enabled: true,
    sectionOffer: defaultSectionOffer,
    siteOffer: {
      ...defaultSectionOffer,
      dwellSeconds: 90,
    },
    whatsapp: {
      enabled: true,
      phone: "201068274662",
      ctaLabel: "تواصل على واتساب",
      messageTemplate: "مرحبا، أنا مهتم بخدمة {{section}} وأريد معرفة تفاصيل العرض.",
      pulseCta: true,
    },
    sectionLabelOverrides: {},
  });

export type OfferFunnelSettings = z.infer<typeof offerFunnelSettingsSchema>;

export const defaultOfferFunnelSettings = offerFunnelSettingsSchema.parse({});

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
