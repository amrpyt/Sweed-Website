import type { Article, FAQGroup, Offer, PortfolioItem, Product, Service, SiteSettings } from "./types";

export const siteSettings: SiteSettings = {
  brandName: "SWEED",
  tagline: "شريكك في التسويق والأنظمة وتجارب الذكاء الاصطناعي",
  primaryPhone: "+20 100 000 0000",
  primaryEmail: "hello@sweed.example",
  whatsappUrl: "https://wa.me/201000000000",
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    title: "التسويق الرقمي",
    summary: "خطة محتوى وإعلانات وقياس تساعد العميل يشوف عائد واضح.",
    description: "نبني حملات تسويق رقمية تربط الرسالة الصحيحة بالقناة الصحيحة وبأرقام قابلة للمتابعة.",
    category: "تسويق",
    audience: "الشركات التي تريد طلبات أكثر من القنوات الرقمية",
    outcomes: ["رسائل أوضح", "حملات منظمة", "تقرير أداء شهري", "تحسين مستمر للميزانية"],
    process: ["تحليل الوضع الحالي", "تحديد العرض والجمهور", "تشغيل الحملات", "قياس وتحسين"],
    seo: {
      title: "التسويق الرقمي",
      description: "خدمات تسويق رقمي من SWEED للحملات والمحتوى والتحسين المستمر.",
    },
    order: 1,
  },
  {
    slug: "websites",
    title: "تصميم وتطوير المواقع",
    summary: "مواقع سريعة وواضحة تساعد الزائر يفهم ويقرر.",
    description: "نصمم ونبني مواقع تسويقية وتجارية بهيكل قوي وتجربة استخدام منظمة.",
    category: "تطوير",
    audience: "الشركات التي تحتاج موقع احترافي قابل للتوسع",
    outcomes: ["هيكل صفحات واضح", "SEO أساسي", "تصميم متجاوب", "نموذج تواصل جاهز"],
    process: ["تخطيط الرسالة", "تصميم الواجهة", "تطوير Next.js", "اختبار ونشر"],
    seo: {
      title: "تصميم وتطوير المواقع",
      description: "تصميم وتطوير مواقع احترافية بهيكل Next.js قابل للتوسع.",
    },
    order: 2,
  },
  {
    slug: "ai-automation",
    title: "الذكاء الاصطناعي والأتمتة",
    summary: "نماذج مساعدة ذكية وسيناريوهات أتمتة تقلل التكرار وتسرع القرار.",
    description: "نجهز تجارب AI و Automation قابلة للتحول لاحقا إلى وكلاء حقيقيين باستخدام Mastra.",
    category: "AI",
    audience: "فرق المبيعات والخدمة والإدارة التي تريد ردود أسرع وعمليات أوضح",
    outcomes: ["مساعد قرار", "توصية باقة", "تدفق أسئلة ذكي", "Demo أتمتة قابل للعرض"],
    process: ["تحديد السيناريو", "كتابة flow القرار", "بناء mock مقنع", "تحضير تكامل Mastra"],
    seo: {
      title: "الذكاء الاصطناعي والأتمتة",
      description: "تجارب AI وأتمتة مبدئية جاهزة للتوسع مع Mastra لاحقا.",
    },
    order: 3,
  },
];

export const offers: Offer[] = [
  {
    slug: "starter-presence",
    title: "باقة الانطلاق",
    summary: "مناسبة لشركة محتاجة وجود واضح بسرعة.",
    priceLabel: "يبدأ من سعر تأسيسي",
    bestFor: "مشروع جديد أو إعادة تقديم بسيطة",
    features: ["موقع تعريفي", "صفحات أساسية", "تحسين موبايل", "نموذج تواصل"],
    seo: {
      title: "باقة الانطلاق",
      description: "باقة SWEED للشركات التي تريد بداية رقمية منظمة.",
    },
    order: 1,
  },
  {
    slug: "growth-engine",
    title: "باقة النمو",
    summary: "موقع وتسويق ومحتوى لتوليد طلبات بجودة أعلى.",
    priceLabel: "حسب نطاق العمل",
    bestFor: "شركة عندها خدمة واضحة وتريد نمو منتظم",
    features: ["موقع تسويقي", "محتوى صفحات", "إعداد حملات", "تقارير شهرية"],
    highlighted: true,
    seo: {
      title: "باقة النمو",
      description: "باقة SWEED للنمو التسويقي والموقع والمحتوى.",
    },
    order: 2,
  },
  {
    slug: "ai-ready-enterprise",
    title: "باقة AI Ready",
    summary: "تجربة موقع مع مساعد ذكي وDemo أتمتة للفرق الجاهزة للتميّز.",
    priceLabel: "تصميم مخصص",
    bestFor: "شركات تريد تجربة مبهرة وقابلة للتوسع",
    features: ["موقع Next.js", "AI advisor mock", "Automation demo", "تحضير Mastra/Sanity"],
    seo: {
      title: "باقة AI Ready",
      description: "باقة موقع وتجربة AI جاهزة للتوسع مستقبلا.",
    },
    order: 3,
  },
];

export const products: Product[] = [
  {
    slug: "brand-kit",
    title: "Brand Kit",
    summary: "حزمة عناصر بصرية ونصوص أساسية لبداية منظمة.",
    category: "هوية",
    status: "custom",
    seo: {
      title: "Brand Kit",
      description: "حزمة هوية ونصوص أساسية من SWEED.",
    },
    order: 1,
  },
  {
    slug: "landing-page",
    title: "Landing Page",
    summary: "صفحة هبوط مركزة لحملة أو خدمة واحدة.",
    category: "مواقع",
    status: "available",
    seo: {
      title: "Landing Page",
      description: "صفحة هبوط تسويقية سريعة وواضحة.",
    },
    order: 2,
  },
  {
    slug: "automation-demo-kit",
    title: "Automation Demo Kit",
    summary: "عرض تفاعلي يشرح للعميل كيف ستتحرك الأتمتة داخل شركته.",
    category: "AI",
    status: "planned",
    seo: {
      title: "Automation Demo Kit",
      description: "Demo أتمتة تفاعلي قابل للتخصيص.",
    },
    order: 3,
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "service-company-growth",
    title: "إعادة بناء حضور شركة خدمات",
    clientType: "شركة خدمات",
    summary: "تحويل رسالة مشتتة إلى موقع واضح وصفحات خدمة قابلة للإعلان.",
    services: ["موقع", "محتوى", "تسويق"],
    result: "تحسن جودة الطلبات وتقليل الأسئلة المتكررة قبل التواصل.",
    seo: {
      title: "إعادة بناء حضور شركة خدمات",
      description: "مثال على تطوير موقع ورسالة شركة خدمات.",
    },
    order: 1,
  },
  {
    slug: "retail-offers-system",
    title: "تنظيم عروض متجر محلي",
    clientType: "تجزئة",
    summary: "تجميع المنتجات والعروض في تجربة أسهل للعميل.",
    services: ["عروض", "منتجات", "تصميم"],
    result: "مسار اختيار أسرع ورسائل أوضح على الموبايل.",
    seo: {
      title: "تنظيم عروض متجر محلي",
      description: "مثال على تنظيم عروض ومنتجات رقميا.",
    },
    order: 2,
  },
];

export const articles: Article[] = [
  {
    slug: "how-to-choose-marketing-package",
    title: "كيف تختار الباقة التسويقية المناسبة؟",
    summary: "طريقة بسيطة لاختيار باقة حسب المرحلة، الميزانية، والهدف.",
    category: "تسويق",
    publishedAt: "2026-05-04",
    readingTime: "4 دقائق",
    body: [
      {
        id: "stage",
        title: "ابدأ من المرحلة",
        summary: "الشركة الجديدة تحتاج وضوح ورسالة. الشركة النامية تحتاج قياس وتحسين.",
      },
      {
        id: "budget",
        title: "اربط الميزانية بهدف",
        summary: "الميزانية بدون هدف تتحول إلى تجربة عشوائية. حدد طلبات، مبيعات، أو وعي.",
      },
    ],
    seo: {
      title: "كيف تختار الباقة التسويقية المناسبة؟",
      description: "دليل بسيط لاختيار باقة تسويقية حسب مرحلة شركتك.",
    },
    order: 1,
  },
  {
    slug: "why-ai-demo-helps-sales",
    title: "لماذا يساعد AI Demo في قرار العميل؟",
    summary: "العميل يفهم أسرع عندما يرى سيناريو حي بدلا من وصف طويل.",
    category: "AI",
    publishedAt: "2026-05-04",
    readingTime: "3 دقائق",
    body: [
      {
        id: "clarity",
        title: "الديمو يقلل الخيال",
        summary: "بدل ما تتكلم عن الأتمتة، اجعل العميل يراها خطوة بخطوة.",
      },
    ],
    seo: {
      title: "لماذا يساعد AI Demo في قرار العميل؟",
      description: "كيف يجعل AI Demo قرار العميل أسرع وأسهل.",
    },
    order: 2,
  },
];

export const faqGroups: FAQGroup[] = [
  {
    slug: "general",
    title: "أسئلة عامة",
    items: [
      {
        question: "ما الذي تقدمه SWEED؟",
        answer: "نقدم مواقع وتسويق وتجارب AI وأتمتة تساعد الشركة تعرض خدماتها وتستقبل طلبات أفضل.",
      },
      {
        question: "هل الموقع سيكون جاهز لـ Sanity؟",
        answer: "نعم، v1 يستخدم محتوى محلي typed، لكن الصفحات تقرأ من repository حتى نستبدله بـ Sanity لاحقا.",
      },
    ],
    order: 1,
  },
  {
    slug: "packages",
    title: "الخدمات والباقات",
    items: [
      {
        question: "هل AI advisor حقيقي في v1؟",
        answer: "في v1 سيكون mock تفاعلي مقنع. التكامل الحقيقي مع Mastra مؤجل لمرحلة لاحقة.",
      },
      {
        question: "كيف أختار الباقة؟",
        answer: "الموقع سيعرض مقارنة واضحة، والمساعد سيقترح اختيارا حسب إجابات الزائر.",
      },
    ],
    order: 2,
  },
];

