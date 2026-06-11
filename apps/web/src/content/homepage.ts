export type HomeAction = {
  label: string;
  href: string;
  icon: string;
  variant?: "primary" | "light";
};

export type HomeMetric = {
  value: string;
  label: string;
};

export type HomeCard = {
  title: string;
  summary: string;
  icon: string;
  href?: string;
  meta?: string;
};

export type HomeProcessStep = HomeCard & {
  duration: string;
};

export const homepageContent = {
  hero: {
    eyebrow: "SWEED Marketing & Advertising",
    title: "نحوّل أحلامك إلى إنجازات حقيقية",
    summary: "نرتب لك التسويق، الهوية، المحتوى، والإعلانات في مسار واضح يقود مشروعك من الفكرة إلى النمو.",
    actions: [
      { label: "ابدأ مشروعك الآن", href: "/contact?services=consulting#contact-form", icon: "fa-rocket", variant: "primary" },
      { label: "احجز استشارة مجانية", href: "/contact?services=consulting#contact-form", icon: "fa-gift", variant: "light" },
    ] satisfies HomeAction[],
    metrics: [
      { value: "+150", label: "مشروع تم دعمه" },
      { value: "8+", label: "سنوات خبرة" },
      { value: "48h", label: "بداية سريعة" },
    ] satisfies HomeMetric[],
  },
  partners: ["مطاعم", "عيادات", "متاجر", "شركات ناشئة", "خدمات B2B", "تعليم"],
  problems: [
    { title: "تسويق بدون خطة", summary: "نحوّل العشوائية إلى خطة واضحة بأهداف ومؤشرات قياس.", icon: "fa-route" },
    { title: "هوية غير ثابتة", summary: "نرتب شكل البراند ورسائله حتى يظهر بثقة في كل قناة.", icon: "fa-fingerprint" },
    { title: "نتائج غير مفهومة", summary: "نربط التنفيذ بالأرقام حتى تعرف ما الذي ينجح وما الذي يحتاج تعديل.", icon: "fa-chart-line" },
  ] satisfies HomeCard[],
  offers: [
    { title: "انطلاقة البراند", summary: "هوية ورسائل ومحتوى أساسي لبداية مرتبة.", icon: "fa-seedling", href: "/offers", meta: "مناسب للبدايات" },
    { title: "نمو المبيعات", summary: "حملات وتسويق ومتابعة نتائج لزيادة الطلبات.", icon: "fa-bullhorn", href: "/offers", meta: "للشركات الجاهزة للنمو" },
    { title: "تجربة رقمية", summary: "موقع أو صفحة هبوط أو تجربة تساعد العميل يقرر أسرع.", icon: "fa-laptop-code", href: "/offers", meta: "للتحويلات والقياس" },
  ] satisfies HomeCard[],
  services: [
    { title: "الاستشارات التسويقية", summary: "تحليل، تموضع، وخطة عملية تناسب ميزانيتك ومرحلتك.", icon: "fa-compass-drafting", href: "/services" },
    { title: "البراند والهوية", summary: "اسم، رسالة، شكل بصري، ونظام استخدام واضح للفريق.", icon: "fa-palette", href: "/services" },
    { title: "الإعلانات والمحتوى", summary: "إدارة حملات، أفكار محتوى، وقياس أداء مستمر.", icon: "fa-photo-film", href: "/services" },
    { title: "المواقع والتجارب", summary: "واجهات ومواقع سريعة تساعد العميل يثق ويتواصل.", icon: "fa-code", href: "/services" },
  ] satisfies HomeCard[],
  process: [
    { title: "الاستماع والفهم", summary: "نسمع هدفك، نفهم وضعك الحالي، ونحدد أين المشكلة وأقرب فرصة للنمو.", icon: "fa-headset", duration: "1 - 2 يوم" },
    { title: "التحليل والتخطيط", summary: "نحلل السوق والمنافسين ثم نبني خطة عملية تناسب ميزانيتك ومرحلتك.", icon: "fa-chart-pie", duration: "3 - 5 أيام" },
    { title: "التصميم والإبداع", summary: "نجهز الهوية، المحتوى، والتصميمات الأساسية بشكل مرتب يخدم الرسالة.", icon: "fa-pen-ruler", duration: "5 - 7 أيام" },
    { title: "الإنتاج والتطبيق", summary: "نطلق التنفيذ، نتابع النتائج، ونعدل بسرعة حتى يظل المشروع في الاتجاه الصح.", icon: "fa-rocket", duration: "حسب نطاق المشروع" },
  ] satisfies HomeProcessStep[],
  products: [
    { title: "صفحات هبوط", summary: "Landing pages جاهزة للحملات والتحويل.", icon: "fa-window-maximize", href: "/products" },
    { title: "قوالب محتوى", summary: "أفكار وتصميمات تساعدك تنشر أسرع.", icon: "fa-layer-group", href: "/products" },
    { title: "أنظمة متابعة", summary: "لوحات بسيطة لمتابعة العملاء والطلبات.", icon: "fa-table-columns", href: "/products" },
  ] satisfies HomeCard[],
  portfolio: [
    { title: "إطلاق مشروع جديد", summary: "من هوية ورسائل إلى صفحة هبوط وحملات أولية.", icon: "fa-store", href: "/portfolio" },
    { title: "تحسين حضور شركة", summary: "تنظيف الرسالة، إعادة ترتيب المحتوى، وتحسين نقاط التواصل.", icon: "fa-building", href: "/portfolio" },
    { title: "نمو مبيعات حملة", summary: "اختبار عروض ورسائل حتى نصل لصيغة تبيع أفضل.", icon: "fa-arrow-trend-up", href: "/portfolio" },
  ] satisfies HomeCard[],
  articles: [
    { title: "كيف تختار العرض التسويقي الصحيح؟", summary: "خطوات عملية لتقليل الحيرة قبل إطلاق الحملات.", icon: "fa-newspaper", href: "/articles" },
    { title: "لماذا الهوية وحدها لا تكفي؟", summary: "الهوية تحتاج رسالة وتجربة ومتابعة حتى تتحول لنتيجة.", icon: "fa-book-open", href: "/articles" },
  ] satisfies HomeCard[],
  faq: [
    { title: "هل نبدأ بإعلانات ولا هوية؟", summary: "نحدد ذلك بعد فهم هدفك والمرحلة الحالية. أحيانا الخطة أهم من الإنفاق.", icon: "fa-circle-question" },
    { title: "هل الاستشارة مجانية؟", summary: "نعم، أول استشارة هدفها فهم الاحتياج وترشيح البداية الأنسب.", icon: "fa-comments" },
    { title: "هل يمكن تنفيذ جزء واحد فقط؟", summary: "نعم. نحدد نطاق صغير واضح لو هذا الأنسب الآن.", icon: "fa-list-check" },
  ] satisfies HomeCard[],
  contact: {
    title: "محتاج إيه وهنساعدك؟",
    summary: "اكتب لنا على واتساب برسالة واضحة، وسنرتب معك أول خطوة.",
    whatsappHref:
      "https://wa.me/201068274662?text=%D8%A3%D9%87%D9%84%D8%A7%20SWEED%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A",
  },
} as const;
