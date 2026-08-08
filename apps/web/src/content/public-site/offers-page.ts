import type { LinkTarget } from "@/content/types";

export type OfferPackageSource = {
  id: string;
  title: string;
  summary?: string;
  features: readonly string[];
  priceLabel: "تسعير حسب نطاق المشروع";
  actionLabel: string;
  href: string;
  highlighted?: boolean;
};

export type OfferComparisonSource = {
  id: string;
  title: string;
  columns: readonly string[];
  rows: readonly { label: string; values: readonly string[] }[];
};

export type OfferServiceGroupSource = {
  id: "consulting" | "branding" | "digital-marketing" | "media" | "advertising" | "software-development";
  label: string;
  title: string;
  packages: readonly OfferPackageSource[];
  comparisonId: string;
};

const packageHref = (packageId: string, serviceId = "integrated") =>
  `/contact?source=offers&package=${encodeURIComponent(packageId)}&service=${encodeURIComponent(serviceId)}`;

export const offersPageSource = {
  seo: {
    title: "عروض وباقات SWEED",
    description: "اختار بداية تناسب مرحلة مشروعك، قارن بين باقات SWEED، أو استخدم محدد الاحتياج للوصول إلى ترشيح مبدئي قبل التواصل.",
  },
  hero: {
    eyebrow: "العروض والباقات",
    title: "مش كل مشروع محتاج نفس الطريق… بس كل مشروع محتاج بداية صح",
    summary: "اختار هدفك أو الخدمة اللي محتاجها، وشوف الفرق بين كل مستوى بوضوح. ولو مشروعك محتاج أكتر من تخصص — جمعنالك الاتجاه والتنفيذ والمتابعة في باقات واحدة.",
    actions: [
      { label: "اكتشف أنسب باقة", href: "#need-quiz", variant: "primary" as const },
      { label: "قارن الباقات الشاملة", href: "#main-packages", variant: "secondary" as const },
    ] satisfies readonly LinkTarget[],
  },
  quiz: {
    id: "need-quiz",
    title: "قولنا عايز توصل لإيه… وإحنا نضيّق الاختيارات",
    summary: "مش لازم تعرف أسماء الخدمات — ابدأ باللي حاسس بيه، والترشيح يظهر في 3 أسئلة بس.",
    questions: [
      {
        id: "challenge",
        title: "إيه أقرب تحدٍ عندك؟",
        options: [
          { value: "direction", label: "قرارات واتجاه" },
          { value: "brand", label: "براند مش واضح" },
          { value: "marketing", label: "تسويق بلا نتيجة" },
          { value: "media", label: "محتوى ضعيف" },
          { value: "advertising", label: "ظهور على الأرض" },
          { value: "digital", label: "موقع أو حل رقمي" },
        ],
      },
      {
        id: "stage",
        title: "مشروعك في أي مرحلة؟",
        options: [
          { value: "idea", label: "فكرة أو تأسيس" },
          { value: "growth", label: "قائم ومحتاج نمو" },
          { value: "redirect", label: "محتاج إعادة توجيه" },
        ],
      },
      {
        id: "timing",
        title: "عايز تبدأ إمتى؟",
        options: [
          { value: "now", label: "الآن" },
          { value: "month", label: "خلال شهر" },
          { value: "later", label: "بجهز وأقارن" },
        ],
      },
    ] as const,
  },
  integrated: {
    id: "main-packages",
    title: "لما مشروعك محتاج منظومة… مش مورّد لكل خدمة",
    summary: "دي الباقات اللي بتجسد وعد سويد: اتجاه واحد بيجمع الاستشارة والبناء والتنفيذ والقياس.",
  },
  integratedPackages: [
    {
      id: "direction",
      title: "تحديد الاتجاه",
      summary: "لما المشكلة محتاجة تتفهم وتتترتب قبل ما تبدأ تنفيذ.",
      features: ["تشخيص وتحليل وضع وسوق", "تحديد أولويات معتمدة", "خارطة طريق 90 يوم", "جلسة تسليم وشرح", "ملخص قرارات قابل للتنفيذ"],
      priceLabel: "تسعير حسب نطاق المشروع",
      actionLabel: "ابدأ التشخيص",
      href: packageHref("direction"),
    },
    {
      id: "path",
      title: "بناء المسار",
      summary: "لما المشروع محتاج يثبت اتجاهه ويجهز البراند والمنصات وخطة الإطلاق.",
      features: ["كل مخرجات تحديد الاتجاه", "استراتيجية براند ورسائل", "هوية أساسية وتأسيس المنصات", "خطة إطلاق تسويقية", "اجتماعات مرحلة البناء"],
      priceLabel: "تسعير حسب نطاق المشروع",
      actionLabel: "ابنِ المسار",
      href: packageHref("path"),
      highlighted: true,
    },
    {
      id: "partnership",
      title: "شراكة الوصول",
      summary: "لما المشروع قائم ويحتاج تشغيل وتسويق وقياس وتحسين بشكل مستمر.",
      features: ["استراتيجية وإدارة تسويق", "محتوى وتصميم شهري", "إدارة حملات وتحسين", "تقارير واجتماعات قرار", "تطوير مستمر للمسار"],
      priceLabel: "تسعير حسب نطاق المشروع",
      actionLabel: "ابدأ الشراكة",
      href: packageHref("partnership"),
    },
  ] satisfies readonly OfferPackageSource[],
  serviceGroups: [
    {
      id: "consulting",
      label: "استشارات",
      title: "محتاج رأي… ولا قرار وخطة ومتابعة؟",
      comparisonId: "consulting",
      packages: [
        { id: "consult-session", title: "جلسة الاتجاه", features: ["جلسة تشخيص معمقة", "مراجعة البيانات المتاحة", "ملخص قرارات وأولويات"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "احجز الجلسة", href: packageHref("consult-session", "consulting") },
        { id: "growth-map", title: "خارطة النمو", features: ["تحليل وضع وسوق ومنافسين", "أهداف وKPIs وخطة 90 يوم", "سيناريوهات قرار"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابنِ الخطة", href: packageHref("growth-map", "consulting"), highlighted: true },
        { id: "decision-partner", title: "شريك القرار", features: ["اجتماعات دورية ومراجعة أداء", "قرارات تصحيح مستمرة", "دعم الإدارة في القرار"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابدأ الشراكة", href: packageHref("decision-partner", "consulting") },
      ],
    },
    {
      id: "branding",
      label: "براند وهوية",
      title: "اسم وشعار… ولا معنى الناس تعرفه وتفتكره؟",
      comparisonId: "branding",
      packages: [
        { id: "brand-foundation", title: "أساس البراند", features: ["الجمهور والتموضع والوعد", "شخصية البراند", "الرسائل الرئيسية"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ثبّت الأساس", href: packageHref("brand-foundation", "branding") },
        { id: "brand-identity", title: "هوية متكاملة", features: ["كل مخرجات الأساس", "شعار وألوان وخطوط وتطبيقات", "دليل هوية بصري"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابنِ الهوية", href: packageHref("brand-identity", "branding"), highlighted: true },
        { id: "brand-system", title: "نظام البراند", features: ["دليل نبرة وصوت", "قوالب منصات ورسائل حملات", "تطبيقات موسعة وإشراف إطلاق"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابنِ النظام", href: packageHref("brand-system", "branding") },
      ],
    },
    {
      id: "digital-marketing",
      label: "تسويق وحملات",
      title: "بتنشر كتير… ولا بتتحرك ناحية هدف؟",
      comparisonId: "digital-marketing",
      packages: [
        { id: "organized-presence", title: "حضور منظم", features: ["دراسة وضع وخطة محتوى", "إدارة منصات محددة", "كتابة وتصميم وتقرير شهري"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "نظّم حضورك", href: packageHref("organized-presence", "digital-marketing") },
        { id: "continuous-growth", title: "نمو مستمر", features: ["كل مخرجات حضور منظم + ريلز", "إدارة حملات وتحسين أسبوعي", "متابعة منافسين واجتماع شهري"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابدأ النمو", href: packageHref("continuous-growth", "digital-marketing"), highlighted: true },
        { id: "performance", title: "أداء ونتائج", features: ["استراتيجية أداء وفانل", "تتبع وتحليلات وتحسين مستمر", "لوحة KPIs واجتماعات قرار"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "اربط التسويق بالنتيجة", href: packageHref("performance", "digital-marketing") },
      ],
    },
    {
      id: "media",
      label: "محتوى مرئي",
      title: "فيديو يتشاف… ولا محتوى يحرّك قرار؟",
      comparisonId: "media",
      packages: [
        { id: "first-shot", title: "لقطة البداية", features: ["فكرة وسكريبت", "يوم تصوير + مونتاج حزمة محددة", "نسخ للمنصات"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابدأ التصوير", href: packageHref("first-shot", "media") },
        { id: "moving-presence", title: "حضور متحرك", features: ["استراتيجية شهرية وعدة ريلز", "تصوير دوري ومونتاج", "أغلفة ونصوص"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابنِ الحضور", href: packageHref("moving-presence", "media"), highlighted: true },
        { id: "full-production", title: "إنتاج متكامل", features: ["معالجة إبداعية وإخراج", "تصوير متعدد ومونتاج متقدم", "موشن وصوت ونسخ متعددة"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "نفّذ الحملة", href: packageHref("full-production", "media") },
      ],
    },
    {
      id: "advertising",
      label: "دعاية وإعلان",
      title: "يتشاف فين… ويتنفذ إزاي… ويفضل في الذاكرة ليه؟",
      comparisonId: "advertising",
      packages: [
        { id: "visibility-point", title: "نقطة ظهور", features: ["معاينة الاحتياج + تصميم وتجهيز", "خامة وتنفيذ عنصر محدد", "مراجعة جودة"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "اطلب مقايسة", href: packageHref("visibility-point", "advertising") },
        { id: "spread-campaign", title: "حملة انتشار", features: ["فكرة حملة ورسالة موحدة", "مجموعة مطبوعات أو لوحات", "إنتاج وتركيب"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "خطط الحملة", href: packageHref("spread-campaign", "advertising"), highlighted: true },
        { id: "integrated-presence", title: "حضور متكامل", features: ["مسح نقاط الاتصال", "نظام تطبيقات ولوحات وواجهات", "مطبوعات وهدايا وإدارة جودة"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "وحّد الحضور", href: packageHref("integrated-presence", "advertising") },
      ],
    },
    {
      id: "software-development",
      label: "مواقع وحلول رقمية",
      title: "موقع موجود… ولا مسار يحوّل الزيارة لخطوة؟",
      comparisonId: "software-development",
      packages: [
        { id: "landing-page", title: "صفحة انطلاق", features: ["UX مختصر وتصميم متجاوب", "نموذج تواصل", "تحليلات أساسية"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابدأ الصفحة", href: packageHref("landing-page", "software-development") },
        { id: "company-site", title: "موقع الشركة", features: ["هيكل محتوى وUX/UI كامل", "صفحات أساسية ولوحة تحكم", "SEO تقني وربط وتحليلات"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "ابنِ الموقع", href: packageHref("company-site", "software-development"), highlighted: true },
        { id: "growth-system", title: "منظومة نمو", features: ["بحث مستخدم وتجربة مخصصة", "تطوير وظائف وتكاملات", "تحليلات متقدمة ودعم"], priceLabel: "تسعير حسب نطاق المشروع", actionLabel: "صمّم المنظومة", href: packageHref("growth-system", "software-development") },
      ],
    },
  ] satisfies readonly OfferServiceGroupSource[],
  comparisons: [
    {
      id: "integrated",
      title: "مقارنة الباقات الشاملة",
      columns: ["تحديد الاتجاه", "بناء المسار", "شراكة الوصول"],
      rows: [
        { label: "التشخيص وتحليل الوضع", values: ["شامل", "شامل", "شامل ومستمر"] },
        { label: "تحليل السوق والمنافسين", values: ["أساسي", "متقدم", "متقدم مع تحديثات"] },
        { label: "الخطة التنفيذية", values: ["90 يوم", "خطة إطلاق", "ربع سنوية متجددة"] },
        { label: "استراتيجية البراند", values: ["—", "مشمولة", "مشمولة ومطورة"] },
        { label: "إدارة التسويق", values: ["—", "مرحلة إطلاق اختيارية", "مشمولة"] },
        { label: "إنتاج المحتوى", values: ["—", "حزمة إطلاق", "إنتاج شهري"] },
        { label: "إدارة الحملات", values: ["توصيات فقط", "إعداد الإطلاق", "إدارة وتحسين"] },
        { label: "مدة الارتباط", values: ["مشروع محدد", "مرحلة تأسيس", "3 أشهر فأكثر"] },
      ],
    },
    {
      id: "consulting",
      title: "مقارنة باقات الاستشارات",
      columns: ["جلسة الاتجاه", "خارطة النمو", "شريك القرار"],
      rows: [
        { label: "مدة العمل", values: ["جلسة أو أسبوع", "3–6 أسابيع", "شهري أو ربع سنوي"] },
        { label: "التحليل", values: ["محدد", "شامل", "شامل ومتجدد"] },
        { label: "الخطة التنفيذية", values: ["أولويات", "90 يوم", "متجددة"] },
        { label: "المتابعة", values: ["جلسة تسليم", "مراجعة واحدة", "دورية"] },
      ],
    },
    {
      id: "branding",
      title: "مقارنة باقات البراند",
      columns: ["أساس البراند", "هوية متكاملة", "نظام البراند"],
      rows: [
        { label: "استراتيجية البراند", values: ["مشمولة", "مشمولة", "مشمولة ومتعمقة"] },
        { label: "شخصية ونبرة الصوت", values: ["أساسية", "شاملة", "دليل استخدام"] },
        { label: "الهوية البصرية", values: ["—", "متكاملة", "متكاملة وموسعة"] },
        { label: "التطبيقات", values: ["—", "أساسية", "حسب نقاط الاتصال"] },
      ],
    },
    {
      id: "digital-marketing",
      title: "مقارنة باقات التسويق",
      columns: ["حضور منظم", "نمو مستمر", "أداء ونتائج"],
      rows: [
        { label: "الخطة", values: ["شهرية", "ربع سنوية", "نمو متجدد"] },
        { label: "المحتوى المرئي", values: ["محدود", "دوري", "متعدد الأنواع"] },
        { label: "إدارة الإعلانات", values: ["اختيارية", "مشمولة", "مشمولة ومتقدمة"] },
        { label: "التقارير", values: ["شهري", "شهري + قرارات", "Dashboard + اجتماعات"] },
      ],
    },
    {
      id: "media",
      title: "مقارنة باقات المحتوى المرئي",
      columns: ["لقطة البداية", "حضور متحرك", "إنتاج متكامل"],
      rows: [
        { label: "الفكرة والسكريبت", values: ["مركز", "شهري", "معالجة إبداعية"] },
        { label: "التصوير", values: ["يوم محدد", "دوري", "حسب خطة الإنتاج"] },
        { label: "المونتاج", values: ["أساسي احترافي", "متعدد", "متقدم"] },
        { label: "حقوق الاستخدام", values: ["توضح بالعقد", "توضح بالعقد", "توضح بالعقد"] },
      ],
    },
    {
      id: "advertising",
      title: "مقارنة باقات الدعاية",
      columns: ["نقطة ظهور", "حملة انتشار", "حضور متكامل"],
      rows: [
        { label: "الفكرة الإعلانية", values: ["حسب العنصر", "موحدة للحملة", "نظام كامل"] },
        { label: "التصميم", values: ["عنصر محدد", "مجموعة تطبيقات", "تطبيقات متعددة"] },
        { label: "التصنيع", values: ["مشمول بالمقايسة", "مشمول بالمقايسة", "مشمول حسب النطاق"] },
        { label: "التسعير", values: ["بعد المقاس والخامة", "بعد الحصر", "بعد المعاينة"] },
      ],
    },
    {
      id: "software-development",
      title: "مقارنة باقات المواقع",
      columns: ["صفحة انطلاق", "موقع الشركة", "منظومة نمو"],
      rows: [
        { label: "الصفحات", values: ["صفحة واحدة", "عدة صفحات", "حسب النظام"] },
        { label: "UX/UI", values: ["مسار واحد", "تجربة كاملة", "بحث وتجربة مخصصة"] },
        { label: "لوحة التحكم", values: ["اختيارية", "مشمولة", "مخصصة"] },
        { label: "التكاملات", values: ["أساسية", "نماذج وتحليلات", "CRM وواجهات ربط"] },
      ],
    },
  ] satisfies readonly OfferComparisonSource[],
  faq: [
    { question: "إزاي أعرف أنهي باقة مناسبة؟", answer: "ابدأ بمحدد الاحتياج فوق أو اطلب جلسة تشخيص — وإحنا نرشح المستوى المناسب حسب وضعك وهدفك، مش حسب أعلى سعر." },
    { question: "هل أقدر أعدل محتويات الباقة؟", answer: "نعم في حدود الحفاظ على هدف الباقة. وأي تغيير مؤثر في النطاق أو المدة بيتسعّر بوضوح قبل البدء." },
    { question: "هل ميزانية الإعلانات ضمن الباقة؟", answer: "لا — أتعاب الإدارة منفصلة عن ميزانية الإعلان، ما لم يُذكر غير كده صراحة." },
    { question: "هل التصوير والطباعة والاستضافة مشمولين؟", answer: "البنود المشمولة وغير المشمولة بتظهر جوه كل باقة — لأن التكاليف دي بتختلف حسب النطاق والخامات والموقع." },
    { question: "هل أقدر أبدأ بخدمة واحدة؟", answer: "أكيد — لكل خدمة 3 مستويات مستقلة، وتقدر تتوسع بعدين للباقات الشاملة." },
    { question: "إيه مدة التعاقد؟", answer: "بتختلف حسب الخدمة: المشروعات التأسيسية ليها مدة تنفيذ، والخدمات المستمرة ليها حد أدنى بيتذكر بوضوح في العقد." },
    { question: "هل في ضمان للنتائج؟", answer: "بنضمن وضوح المنهج وجودة التنفيذ والمتابعة — لكن النتائج التجارية بتتأثر بالسوق والعرض والميزانية وسرعة اعتماد القرارات." },
    { question: "هل الباقة مناسبة لأي قطاع؟", answer: "الهيكل واحد، لكن التطبيق بيتخصص حسب القطاع والجمهور وطبيعة القرار الشرائي." },
  ],
  finalCta: {
    id: "offers-cta",
    title: "مش لاقي مشروعك جوه باقة جاهزة؟",
    summary: "وده طبيعي — لأن كل مشروع له بوصلته الخاصة. ابعتلنا وضعك وهدفك، وإحنا نحدد لك إيه اللي تحتاجه فعلًا… وإيه اللي مش محتاج تصرف عليه.",
    actions: [
      { label: "خلينا نحدد الاتجاه", href: "/contact?source=offers", variant: "primary" as const },
      { label: "تواصل مع مستشار", href: "/contact?source=offers&mode=advisor", variant: "secondary" as const },
    ] satisfies readonly LinkTarget[],
  },
};
