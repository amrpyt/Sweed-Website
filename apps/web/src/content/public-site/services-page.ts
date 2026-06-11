import { contactAction } from "@/content/navigation";
import type { ServicesPageSource } from "@/features/public-site/page-composers/types";

export const servicesPageSource: ServicesPageSource = {
  seo: {
    title: "خدماتنا المتكاملة - SWEED",
    description: "خدمات SWEED في التسويق والتطوير والمحتوى وتجارب الذكاء الاصطناعي ضمن مسار واضح قابل للتوسع.",
  },
  breadcrumb: "خدماتنا",
  hero: {
    eyebrow: "الخدمات",
    title: "خدماتنا المتكاملة",
    summary: "نرتب الرسالة، نبني الصفحة، ونجهز تجربة تسويق تساعد العميل يفهم بسرعة ويتخذ القرار المناسب.",
  },
  section: {
    id: "services",
    header: {
      title: "خدمات مبنية على وضوح الرسالة والتنفيذ",
      summary: "كل خدمة هنا جزء من نظام أكبر يربط المحتوى بالموقع وبالحملات وبالتجربة النهائية للعميل.",
    },
  },
  cta: {
    title: "مش متأكد أي خدمة أنسب لك؟",
    summary: "احجز تواصل سريع وسنحدد معك البداية الصحيحة بدل اختيار عشوائي.",
    primaryAction: contactAction,
  },
};
