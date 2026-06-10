import { contactAction } from "@/content/navigation";
import type { FaqPageSource } from "@/features/public-site/page-composers/types";

export const faqPageSource: FaqPageSource = {
  seo: {
    title: "الأسئلة الشائعة - SWEED",
    description: "إجابات واضحة عن خدمات SWEED والباقات وتجربة الموقع والذكاء الاصطناعي التوضيحية.",
  },
  breadcrumb: "الأسئلة الشائعة",
  hero: {
    eyebrow: "الأسئلة الشائعة",
    title: "إجابات تساعدك تأخذ القرار أسرع",
    summary: "جمعنا أهم الأسئلة التي تتكرر قبل بدء المشروع حتى تعرف ما الذي نقدمه وكيف نرتب المسار المناسب لك.",
  },
  cta: {
    title: "هل عندك سؤال مختلف؟",
    summary: "تواصل معنا مباشرة وسنساعدك بسرعة في تحديد أنسب خطوة تالية.",
    primaryAction: contactAction,
  },
};
