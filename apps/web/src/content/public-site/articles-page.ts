import { contactAction } from "@/content/navigation";
import type { ArticlesPageSource } from "@/features/public-site/page-composers/types";

export const articlesPageSource: ArticlesPageSource = {
  seo: {
    title: "مدونة SWEED",
    description: "مقالات عملية تساعدك ترتب المحتوى والعرض الرقمي واختيار المسار التسويقي الأنسب.",
  },
  breadcrumb: "المقالات",
  hero: {
    eyebrow: "المقالات",
    title: "مدونة SWEED",
    summary: "أفكار ومقالات عملية تساعدك تفهم ما الذي يحتاجه موقعك ورسالتك ونظام التسويق حوله.",
  },
  section: {
    id: "articles",
    header: {
      title: "مقالات عملية قابلة للتنفيذ",
      summary: "نركز على محتوى يشرح بوضوح ويقود إلى قرارات أفضل بدل نصائح عامة غير قابلة للقياس.",
    },
  },
  cta: {
    title: "هل تريد تحويل الفكرة إلى خطة فعلية؟",
    summary: "تواصل معنا وسنساعدك نحول ما قرأته إلى خطوات تناسب مشروعك.",
    primaryAction: contactAction,
  },
};
