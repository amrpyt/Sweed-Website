import type { Article } from "@/content/types";
import { absoluteUrl } from "@/lib/seo";

export type RelatedService = {
  title: string;
  summary: string;
  href: string;
};

const categoryServiceMap: Array<{ match: RegExp; service: RelatedService }> = [
  {
    match: /إدارة|نمو/,
    service: {
      title: "الاستشارات الإدارية والتسويقية",
      summary: "لو المقال كشف مشكلة اتجاه أو أولويات، مسار الاستشارات يساعدك تحولها لخطة وقرار قابلين للتنفيذ.",
      href: "/services/consulting",
    },
  },
  {
    match: /هوية|براند/,
    service: {
      title: "التصميم والهوية البصرية",
      summary: "لو القرار متعلق بالتموضع أو الرسالة أو الهوية، ابدأ من نظام البراند قبل التطبيقات المنفصلة.",
      href: "/services/branding",
    },
  },
  {
    match: /AI|ذكاء|تقنية|موقع|رقمنة/,
    service: {
      title: "البرمجة والتطوير",
      summary: "لو المقال قادك لمشكلة في المنتج أو الرحلة الرقمية، راجع نظام البرمجة والتطوير كمنظومة تشغيل لا كشاشة فقط.",
      href: "/services/software-development",
    },
  },
  {
    match: /تسويق|إعلانات|قياس|أداء/,
    service: {
      title: "التسويق الرقمي",
      summary: "لو التحدي في الحملات أو القياس أو جودة الطلبات، ابدأ بمراجعة الهدف والجمهور والمسار قبل زيادة الإنفاق.",
      href: "/services/digital-marketing",
    },
  },
];

const fallbackService: RelatedService = {
  title: "خدمات SWEED",
  summary: "لو محتاج تربط الفكرة في المقال بوضع مشروعك، ابدأ من خريطة الخدمات واختار التخصص الأقرب.",
  href: "/services",
};

export function getArticleDetailModel(article: Article, allArticles: readonly Article[]) {
  const relatedService = categoryServiceMap.find((entry) => entry.match.test(article.category))?.service ?? fallbackService;
  const relatedArticles = [...allArticles]
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const sameCategoryA = a.category === article.category ? 1 : 0;
      const sameCategoryB = b.category === article.category ? 1 : 0;
      if (sameCategoryA !== sameCategoryB) return sameCategoryB - sameCategoryA;
      const dateOrder = b.publishedAt.localeCompare(a.publishedAt);
      return dateOrder || a.slug.localeCompare(b.slug);
    })
    .slice(0, 3);

  return {
    article,
    relatedService,
    relatedArticles,
    shareLinks: {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${absoluteUrl(`/articles/${article.slug}`)}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl(`/articles/${article.slug}`))}`,
    },
  };
}

export function createArticleJsonLd(article: Article): Record<string, unknown> | null {
  if (!article.title || !article.seo.description || !article.publishedAt || !article.seo.image) return null;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo.description,
    datePublished: article.publishedAt,
    url: absoluteUrl(`/articles/${article.slug}`),
    image: absoluteUrl(article.seo.image),
    publisher: {
      "@type": "Organization",
      name: "SWEED",
      url: absoluteUrl("/"),
    },
  };

  if (article.author?.name) {
    schema.author = {
      "@type": "Person",
      name: article.author.name,
    };
  }

  return schema;
}
