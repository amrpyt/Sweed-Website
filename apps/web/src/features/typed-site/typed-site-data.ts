import type { CTAContent, HeroContent, IconTextItem, SeoMeta, StatItem } from "@/content/types";
import type { LegacyPageKey } from "@/features/legacy-site";

export type TypedPageKey = LegacyPageKey;

export type TypedPageContent = {
  key: TypedPageKey;
  seo: SeoMeta;
  breadcrumb?: string;
  hero: HeroContent;
  sections: Array<{
    id: string;
    tone?: "default" | "alt";
    header: {
      eyebrow?: string;
      title: string;
      summary?: string;
    };
    items: IconTextItem[];
  }>;
  stats?: StatItem[];
  cta: CTAContent;
};

const contactAction = { label: "تواصل معنا", href: "/contact" };

export const typedPages: Record<TypedPageKey, TypedPageContent> = {
  home: {
    key: "home",
    seo: {
      title: "سويد | شريكك الاستراتيجي للنجاح",
      description: "نحول أحلامك إلى إنجازات حقيقية عبر التسويق والإعلان والحلول الرقمية.",
    },
    hero: {
      eyebrow: "15 سنة في صناعة النجاح",
      title: "نحول أحلامك إلى إنجازات حقيقية",
      subtitle: "شريكك الموثوق في رحلة النمو والتميز",
      summary: "سويد تجمع التسويق والإعلان والتقنية في تجربة واحدة تساعد عملك يظهر، يقنع، ويكبر.",
      actions: [
        { label: "ابدأ مشروعك", href: "/contact" },
        { label: "شاهد خدماتنا", href: "/services", variant: "secondary" },
      ],
      stats: [
        { value: "+640", label: "شريك نجاح" },
        { value: "15", label: "سنة خبرة" },
        { value: "+27", label: "باقة وحل" },
      ],
    },
    sections: [
      {
        id: "problems",
        header: {
          title: "هل تواجه هذه المشاكل؟",
          summary: "نحن نفهم التحديات التي تواجهها الشركات اليوم، ولدينا الحلول المناسبة لها.",
        },
        items: [
          { title: "رسالة غير واضحة", summary: "نعيد ترتيب عرضك حتى يفهمه العميل بسرعة." },
          { title: "موقع لا يقنع", summary: "نبني صفحات تقود الزائر للقرار الصحيح." },
          { title: "تسويق بلا قياس", summary: "نربط الحملات بأرقام ونتائج قابلة للتحسين." },
        ],
      },
      {
        id: "expertise",
        tone: "alt",
        header: {
          title: "خبراتنا المتخصصة",
          summary: "تخصصات وأساليب متنوعة من الخبرة في خدمة مشاريعك.",
        },
        items: [
          { title: "الاستشارات", summary: "تحليل وتوجيه قبل التنفيذ." },
          { title: "البراند", summary: "هوية ورسالة تجعل الشركة أسهل في التذكر." },
          { title: "التسويق الرقمي", summary: "حملات ومحتوى وقياس مستمر." },
          { title: "البرمجة", summary: "مواقع وتجارب رقمية قابلة للتوسع." },
          { title: "الذكاء الاصطناعي", summary: "مساعدات وديموهات أتمتة جاهزة للعرض." },
        ],
      },
      {
        id: "services",
        header: {
          title: "خدماتنا الشاملة",
          summary: "حلول شاملة لجميع احتياجاتك التسويقية والإدارية.",
        },
        items: [
          { title: "خدماتنا المتكاملة", summary: "من الفكرة إلى الموقع والحملة والتحسين." },
          { title: "باقات مصممة خصيصاً لنجاحك", summary: "اختر الباقة المناسبة لمشروعك مع أفضل العروض." },
          { title: "منتجاتنا الجاهزة", summary: "حلول سريعة ومنتجات جاهزة للاستخدام الفوري." },
        ],
      },
      {
        id: "blog",
        tone: "alt",
        header: {
          title: "المقالات الحديثة",
          summary: "آخر المقالات والنصائح التسويقية المفيدة.",
        },
        items: [
          { title: "كيف تختار الباقة المناسبة؟", summary: "طريقة بسيطة حسب المرحلة والميزانية والهدف." },
          { title: "لماذا يساعد AI Demo في قرار العميل؟", summary: "العميل يفهم أسرع عندما يرى السيناريو حي." },
        ],
      },
    ],
    cta: {
      title: "جاهز تنمو أعمالك؟",
      summary: "خلينا نحول حضورك الرقمي إلى نظام واضح يجذب العملاء.",
      primaryAction: contactAction,
    },
  },
  about: {
    key: "about",
    seo: { title: "من نحن - سويد", description: "نبذة عن شركة سويد وقيمها وفريقها ورحلتها." },
    breadcrumb: "من نحن",
    hero: {
      title: "من نحن",
      summary: "شريكك الاستراتيجي لتحقيق النجاح والتفوق في السوق.",
      stats: [
        { value: "15", label: "سنة خبرة" },
        { value: "+640", label: "عميل وشريك" },
      ],
    },
    sections: [
      {
        id: "intro",
        header: { title: "نبذة عن الشركة", summary: "قصة نجاح بدأت بحلم وأصبحت واقعاً ملهماً." },
        items: [
          { title: "رؤيتنا", summary: "نرسم المستقبل ونصنع النجاح." },
          { title: "رسالتنا", summary: "نساعد الشركات تبني حضور واضح وتجربة تقنع العميل." },
          { title: "قيمنا الأساسية", summary: "الوضوح، الالتزام، الإبداع، والقياس." },
        ],
      },
      {
        id: "team",
        tone: "alt",
        header: { title: "فريق العمل", summary: "عقول مبدعة وقلوب متحمسة." },
        items: [
          { title: "القيادة", summary: "توجيه استراتيجي وخبرة عملية." },
          { title: "الأقسام", summary: "تسويق، تصميم، محتوى، وتطوير." },
          { title: "المستشارون", summary: "خبرات متخصصة حسب طبيعة المشروع." },
        ],
      },
    ],
    cta: {
      title: "خلينا نكتب قصة نجاحك",
      summary: "ابدأ بخطوة بسيطة وتواصل معنا.",
      primaryAction: contactAction,
    },
  },
  services: {
    key: "services",
    seo: { title: "خدماتنا المتكاملة", description: "خدمات سويد في الاستشارات والبراند والتسويق والبرمجة." },
    breadcrumb: "خدماتنا",
    hero: {
      title: "خدماتنا المتكاملة",
      summary: "حلول شاملة لجميع احتياجاتك التسويقية والإدارية.",
    },
    sections: [
      {
        id: "services-grid",
        header: { title: "كل ما تحتاجه في مكان واحد" },
        items: [
          { title: "الاستشارات وتطوير الأعمال", summary: "نحلل وضعك ونبني خطة قابلة للتنفيذ." },
          { title: "البراند والهوية", summary: "نصنع شخصية واضحة ومميزة لعلامتك." },
          { title: "التسويق الرقمي", summary: "حملات ومحتوى وقياس مستمر." },
          { title: "البرمجة والمواقع", summary: "مواقع وتجارب رقمية حديثة." },
          { title: "الدعاية والإعلان", summary: "مواد ورسائل تصل للعميل المناسب." },
          { title: "صناعة المحتوى", summary: "محتوى يشرح ويقنع ويبيع." },
        ],
      },
    ],
    cta: { title: "مش عارف تبدأ منين؟", summary: "احجز استشارة ونرشح لك المسار المناسب.", primaryAction: contactAction },
  },
  "service-detail": {
    key: "service-detail",
    seo: { title: "الاستشارات الإدارية", description: "تفاصيل خدمة الاستشارات وتطوير الأعمال من سويد." },
    breadcrumb: "الاستشارات الإدارية",
    hero: {
      title: "الاستشارات الإدارية",
      summary: "نحوّل التحديات إلى خطة واضحة تساعدك تتخذ القرار الصح.",
    },
    sections: [
      {
        id: "intro",
        header: { title: "كيف نساعدك؟" },
        items: [
          { title: "تحليل الوضع الحالي", summary: "نفهم المشكلة قبل الحل." },
          { title: "خطة تنفيذ", summary: "خطوات واضحة وأولويات مرتبة." },
          { title: "متابعة وتحسين", summary: "نقيس ونعدل حسب النتائج." },
        ],
      },
    ],
    cta: { title: "ابدأ باستشارة", summary: "خلينا نحدد أول خطوة مناسبة.", primaryAction: contactAction },
  },
  offers: {
    key: "offers",
    seo: { title: "باقاتنا وعروضنا", description: "باقات وعروض سويد التسويقية والإدارية." },
    breadcrumb: "العروض",
    hero: {
      title: "باقاتنا وعروضنا الحصرية",
      summary: "حلول متكاملة لنجاح أعمالك - اختر الباقة المناسبة ووفر حتى 40%.",
      features: [
        { title: "27 باقة متنوعة" },
        { title: "عروض حصرية" },
        { title: "دعم مستمر" },
      ],
    },
    sections: [
      {
        id: "packages",
        header: { title: "الباقات الشاملة", summary: "باقات متكاملة تغطي احتياجاتك التسويقية والإدارية." },
        items: [
          { title: "النمو الذكي", summary: "باقة بداية منظمة للشركات النامية." },
          { title: "التفوق المؤسسي", summary: "باقة متقدمة لمن يريد حضور أقوى." },
          { title: "القيادة الشاملة", summary: "حل شامل للشركات الجاهزة للتوسع." },
        ],
      },
      {
        id: "offers",
        tone: "alt",
        header: { title: "العروض الترويجية الحصرية", summary: "عروض محدودة المدة وفرص أفضل للبدء." },
        items: [
          { title: "عرض الهوية والموقع", summary: "ابدأ بصورة متكاملة." },
          { title: "عرض الحملات", summary: "جهز حملتك الأولى." },
          { title: "عرض AI Ready", summary: "موقع مع تجربة ذكاء اصطناعي مقنعة." },
        ],
      },
    ],
    cta: { title: "اختار الباقة المناسبة", summary: "لو محتار، نرشح لك الأنسب.", primaryAction: contactAction },
  },
  products: {
    key: "products",
    seo: { title: "منتجاتنا المتميزة", description: "منتجات وحلول سويد الجاهزة والمخصصة." },
    breadcrumb: "المنتجات",
    hero: { title: "منتجاتنا المتميزة", summary: "حلول سريعة ومنتجات جاهزة للاستخدام الفوري." },
    sections: [
      {
        id: "products",
        header: { title: "المنتجات الأكثر طلباً" },
        items: [
          { title: "Business Cards", summary: "كروت أعمال احترافية." },
          { title: "Brochures", summary: "بروشورات تعريفية وتسويقية." },
          { title: "Roll-Up", summary: "مواد عرض للفعاليات والمعارض." },
          { title: "Landing Page", summary: "صفحة هبوط لحملة أو خدمة." },
          { title: "Brand Identity Kit", summary: "حزمة هوية جاهزة." },
          { title: "Automation Demo Kit", summary: "عرض أتمتة تفاعلي." },
        ],
      },
    ],
    cta: { title: "محتاج منتج مخصص؟", summary: "نجهزه حسب مجالك وهدفك.", primaryAction: contactAction },
  },
  portfolio: {
    key: "portfolio",
    seo: { title: "معرض أعمالنا", description: "نماذج من أعمال سويد وقصص النجاح." },
    breadcrumb: "أعمالنا",
    hero: { title: "معرض أعمالنا المتميزة", summary: "نفخر بالمشاريع الناجحة التي حققناها لعملائنا." },
    sections: [
      {
        id: "portfolio",
        header: { title: "أعمالنا تتحدث عن نفسها" },
        items: [
          { title: "Website Projects", summary: "مواقع تعريفية وتسويقية." },
          { title: "Design Projects", summary: "هويات ومواد بصرية." },
          { title: "Campaign Projects", summary: "حملات تسويقية مدروسة." },
        ],
      },
      {
        id: "stories",
        tone: "alt",
        header: { title: "قصص نجاح ملهمة" },
        items: [
          { title: "شركة خدمات", summary: "رسالة أوضح وموقع أسهل." },
          { title: "متجر محلي", summary: "تنظيم منتجات وعروض أفضل." },
        ],
      },
    ],
    cta: { title: "عايز نتيجة شبه دي؟", summary: "احكي لنا عن مشروعك.", primaryAction: contactAction },
  },
  articles: {
    key: "articles",
    seo: { title: "مدونة سويد", description: "مقالات ونصائح عن التسويق والمواقع والذكاء الاصطناعي." },
    breadcrumb: "المدونة",
    hero: { title: "مدونة سويد", summary: "آخر المقالات والنصائح التسويقية المفيدة." },
    sections: [
      {
        id: "articles",
        header: { title: "المقالات الحديثة" },
        items: [
          { title: "10 استراتيجيات مبتكرة للتسويق الرقمي", summary: "أفكار عملية لتحسين حضورك." },
          { title: "كيف تختار الباقة التسويقية المناسبة؟", summary: "قرار أبسط حسب المرحلة والهدف." },
          { title: "لماذا يساعد AI Demo في قرار العميل؟", summary: "الديمو يقنع أسرع من الكلام." },
        ],
      },
    ],
    cta: { title: "تابع أفكار تساعد مشروعك", summary: "ابدأ باستشارة عملية.", primaryAction: contactAction },
  },
  "article-detail": {
    key: "article-detail",
    seo: { title: "10 استراتيجيات مبتكرة للتسويق الرقمي", description: "مقال تفصيلي من مدونة سويد." },
    breadcrumb: "10 استراتيجيات مبتكرة للتسويق الرقمي",
    hero: {
      title: "10 استراتيجيات مبتكرة للتسويق الرقمي",
      summary: "تابع القراءة لتعزيز معرفتك واتخاذ قرارات تسويقية أوضح.",
    },
    sections: [
      {
        id: "article",
        header: { title: "ابدأ من الهدف" },
        items: [
          { title: "حدد الجمهور", summary: "كل رسالة تبدأ من فهم العميل." },
          { title: "قس النتائج", summary: "الاستراتيجية القوية تتحسن بالأرقام." },
          { title: "اختبر باستمرار", summary: "لا تعتمد على تخمين واحد." },
        ],
      },
    ],
    cta: { title: "محتاج خطة تناسبك؟", summary: "خلينا نحول المقال لخطة تنفيذ.", primaryAction: contactAction },
  },
  faq: {
    key: "faq",
    seo: { title: "الأسئلة الشائعة", description: "إجابات على أهم الأسئلة عن سويد وخدماتها وباقاتها." },
    breadcrumb: "الأسئلة الشائعة",
    hero: { title: "الأسئلة الشائعة", summary: "إجابات على أهم الأسئلة التي قد تخطر ببالك." },
    sections: [
      {
        id: "faq",
        header: { title: "أسئلة عامة" },
        items: [
          { title: "ما هي الخدمات الرئيسية التي تقدمونها؟", summary: "نقدم التسويق، البراند، المواقع، المنتجات، وتجارب AI." },
          { title: "هل الموقع جاهز لـ Sanity؟", summary: "نعم، المحتوى أصبح خلف عقود typed تمهيداً للربط لاحقاً." },
          { title: "هل AI advisor حقيقي في v1؟", summary: "في v1 هو mock تفاعلي مقنع، والتكامل الحقيقي لاحقاً مع Mastra." },
        ],
      },
    ],
    cta: { title: "لسه عندك سؤال؟", summary: "تواصل معنا وسنرد عليك بسرعة.", primaryAction: contactAction },
  },
  contact: {
    key: "contact",
    seo: { title: "تواصل معنا", description: "طرق التواصل مع سويد وطلب استشارة." },
    breadcrumb: "اتصل بنا",
    hero: {
      title: "تواصل معنا",
      summary: "نحن هنا لنستمع إليك ونساعدك في تحقيق أهدافك. تواصل معنا بأي طريقة تناسبك.",
      stats: [
        { value: "أقل من ساعة", label: "متوسط وقت الاستجابة" },
        { value: "24/7", label: "استقبال الطلبات" },
        { value: "مجاني", label: "استشارة أولى" },
      ],
    },
    sections: [
      {
        id: "contact-info",
        header: { title: "بيانات التواصل" },
        items: [
          { title: "الهاتف", summary: "01068274662" },
          { title: "واتساب", summary: "راسلنا مباشرة لطلب استشارة." },
          { title: "البريد الإلكتروني", summary: "info@sweed.com" },
          { title: "العنوان", summary: "القاهرة، مصر" },
          { title: "مواعيد العمل", summary: "السبت - الخميس: 9:00 ص - 6:00 م" },
        ],
      },
      {
        id: "quick-faq",
        tone: "alt",
        header: { title: "أسئلة سريعة" },
        items: [
          { title: "متى يتم الرد؟", summary: "غالباً خلال أقل من ساعة في مواعيد العمل." },
          { title: "هل الاستشارة مجانية؟", summary: "نعم، أول استشارة مجانية لتحديد الاتجاه." },
          { title: "هل يمكن بدء مشروع صغير؟", summary: "نعم، نرشح باقة مناسبة حسب المرحلة." },
        ],
      },
    ],
    cta: { title: "جاهز تبدأ؟", summary: "اكتب لنا وسنساعدك تختار المسار المناسب.", primaryAction: contactAction },
  },
};
