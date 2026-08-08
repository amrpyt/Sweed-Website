import { contactAction } from "@/content/navigation";
import type { Article, LinkTarget } from "@/content/types";
import type { ArticlesPageSource } from "@/features/public-site/page-composers/types";

export type KnowledgeCategoryId =
  | "management-growth"
  | "marketing-performance"
  | "brand-identity"
  | "content-advertising"
  | "web-digital";

export type KnowledgeContentType = "article" | "guide" | "case-study";

export type KnowledgeArticle = Article & {
  knowledgeCategory: KnowledgeCategoryId;
  contentType: KnowledgeContentType;
};

const taxonomy: Record<string, { knowledgeCategory: KnowledgeCategoryId; contentType: KnowledgeContentType }> = {
  "project-needs-direction": { knowledgeCategory: "management-growth", contentType: "article" },
  "ads-without-return": { knowledgeCategory: "marketing-performance", contentType: "guide" },
  "five-brand-decisions": { knowledgeCategory: "brand-identity", contentType: "guide" },
  "how-to-choose-marketing-package": { knowledgeCategory: "marketing-performance", contentType: "guide" },
  "why-ai-demo-helps-sales": { knowledgeCategory: "web-digital", contentType: "article" },
  "marketing-metrics-that-matter": { knowledgeCategory: "marketing-performance", contentType: "guide" },
};

export function getKnowledgeArticles(articles: readonly Article[]): KnowledgeArticle[] {
  return articles.flatMap((article) => {
    const meta = taxonomy[article.slug];
    return meta ? [{ ...article, ...meta }] : [];
  });
}

export const articlesPageSource = {
  seo: {
    title: "مقالات وأدلة SWEED",
    description: "مقالات وأدلة عملية في الإدارة والتسويق والبراند والمحتوى والرقمنة تساعد صاحب المشروع يفهم قبل ما يصرف ويقرر قبل ما ينفذ.",
  },
  breadcrumb: "المقالات",
  hero: {
    eyebrow: "مركز المعرفة",
    title: "قرار واحد صح… ممكن يوفر عليك شهور من الشغل في الاتجاه الغلط",
    summary: "مقالات وأدلة عملية في الإدارة والتسويق والبراند والمحتوى والرقمنة — مكتوبة لصاحب المشروع اللي عايز يفهم قبل ما يصرف، ويقرر قبل ما ينفذ.",
  },
  section: {
    id: "latest",
    header: {
      title: "كل جديد… في شبكة سهلة المسح بالعين",
      summary: "ابحث بالكلمة أو اختار الموضوع الأقرب لتحديك، والنتائج تتحدث في مكانها من غير ما تقطع رحلة القراءة.",
    },
  },
  categories: [
    { id: "all", label: "الكل" },
    { id: "management-growth", label: "إدارة ونمو" },
    { id: "marketing-performance", label: "تسويق وأداء" },
    { id: "brand-identity", label: "براند وهوية" },
    { id: "content-advertising", label: "محتوى وإعلان" },
    { id: "web-digital", label: "مواقع ورقمنة" },
  ] as const,
  contentTypes: [
    { id: "all", label: "كل الأنواع" },
    { id: "article", label: "مقال" },
    { id: "guide", label: "دليل عملي" },
    { id: "case-study", label: "دراسة حالة" },
  ] as const,
  featuredSlug: "project-needs-direction",
  problemPaths: {
    id: "by-problem",
    title: "مش لازم تعرف اسم الخدمة… ابدأ من اللي مواقفك",
    groups: [
      { title: "اتجاه وقرار", slugs: ["project-needs-direction"] },
      { title: "تسويق وأداء", slugs: ["ads-without-return", "marketing-metrics-that-matter", "how-to-choose-marketing-package"] },
      { title: "براند وهوية", slugs: ["five-brand-decisions"] },
      { title: "مواقع ورقمنة", slugs: ["why-ai-demo-helps-sales"] },
    ],
  },
  fieldLessons: {
    id: "field-lessons",
    title: "مش كلام عام… دي طريقة قرار اتطبقت",
    summary: "بنحوّل المواقف الحقيقية والأرقام والقرارات لدروس عملية تقدر تطبقها في مشروعك. بنعرض هنا المحتوى المنشور فعليًا فقط.",
    slugs: ["project-needs-direction", "marketing-metrics-that-matter", "ads-without-return"],
    publishingRule: "لا يُنشر رقم نتيجة أو اسم عميل أو مادة داخلية إلا بعد موافقة مكتوبة — ويمكن نشر الدرس باسم القطاع عند وجود سرية.",
  },
  relationship: {
    id: "article-relationship",
    title: "مش محتاج تقرأ كل حاجة… محتاج تقرأ الحاجة الصح في وقتها",
    summary: "لو عندك موضوع محدد أو قرار واقف، ابعته لنا ونوجّهك للمحتوى أو الخدمة الأقرب بدل إضافة اشتراك بريد غير مربوط بباك إند حقيقي.",
    action: { label: "ابعت موضوعك", href: "/contact?source=articles", variant: "primary" as const },
  },
  finalCta: {
    id: "articles-cta",
    title: "فهمت المشكلة… وعايز تحدد الخطوة؟",
    summary: "المقالات بتساعدك تشوف الصورة أوضح — لكن كل مشروع له أرقامه وظروفه. لو عايز نحدد معاك نقطة البداية، احجز جلسة تشخيص.",
    actions: [
      { label: "احجز جلسة تشخيص", href: "/contact?source=articles", variant: "primary" as const },
      { label: "استكشف خدمات سويد", href: "/services", variant: "secondary" as const },
    ] satisfies readonly LinkTarget[],
  },
  cta: {
    title: "هل تريد تحويل الفكرة إلى خطة فعلية؟",
    summary: "تواصل معنا وسنساعدك نحول ما قرأته إلى خطوات تناسب مشروعك.",
    primaryAction: contactAction,
  },
} satisfies ArticlesPageSource & {
  categories: readonly { id: "all" | KnowledgeCategoryId; label: string }[];
  contentTypes: readonly { id: "all" | KnowledgeContentType; label: string }[];
  featuredSlug: string;
  problemPaths: { id: string; title: string; groups: readonly { title: string; slugs: readonly string[] }[] };
  fieldLessons: { id: string; title: string; summary: string; slugs: readonly string[]; publishingRule: string };
  relationship: { id: string; title: string; summary: string; action: LinkTarget };
  finalCta: { id: string; title: string; summary: string; actions: readonly LinkTarget[] };
};
