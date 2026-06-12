export type HomeAction = {
  label: string;
  href: string;
  icon: string;
  variant?: "primary" | "secondary" | "light";
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
  solution?: string;
  category?: string;
  price?: string;
  oldPrice?: string;
};

export type HomeProcessStep = HomeCard & {
  duration: string;
};

export const homepageContent = {
  hero: {
    eyebrow: "SWEED Marketing & Advertising",
    title: "نحوّل أحلامك إلى إنجازات حقيقية",
    subtitle: "15 سنة في صناعة النجاح وبناء العلامات التجارية الرائدة",
    summary: "شريكك الموثوق في رحلة النمو والتميز",
    actions: [
      { label: "العرض الخاص", href: "/offers", icon: "fa-rocket", variant: "primary" },
      { label: "تواصل معنا الآن", href: "/contact", icon: "fa-phone", variant: "secondary" },
      { label: "احجز استشارة مجانية", href: "/contact?services=consulting#contact-form", icon: "fa-gift", variant: "light" },
    ] satisfies HomeAction[],
    metrics: [
      { value: "+15", label: "سنة خبرة" },
      { value: "+478", label: "عميل راض" },
      { value: "+638", label: "مشروع منفذ" },
      { value: "98%", label: "معدل رضا العملاء" },
    ] satisfies HomeMetric[],
  },
  clients: ["NOVA", "ALPHA", "EDGE", "SAHL", "SHIFT", "URBAN"],
  problems: [
    { title: "ميزانية محدودة؟", summary: "تبحث عن حلول تسويقية فعالة بتكلفة مناسبة لميزانيتك وتحقق أهدافك.", icon: "fa-chart-line", solution: "حلول مرنة حسب ميزانيتك" },
    { title: "لا تعرف جمهورك؟", summary: "صعوبة في تحديد الفئة المستهدفة وفهم احتياجات عملائك بدقة.", icon: "fa-bullseye", solution: "تحليل واضح للجمهور" },
    { title: "منافسة شرسة؟", summary: "تجد صعوبة في التميز وسط المنافسين الكثر في مجالك.", icon: "fa-users-slash", solution: "تموضع يبرز اختلافك" },
    { title: "نتائج بطيئة؟", summary: "تستثمر في التسويق لكن لا ترى نتائج سريعة وملموسة.", icon: "fa-clock", solution: "خطة تنفيذ قابلة للقياس" },
    { title: "عائد استثمار ضعيف؟", summary: "تنفق الكثير على الإعلانات لكن العائد لا يغطي التكاليف.", icon: "fa-hand-holding-usd", solution: "تحسين مستمر للأداء" },
    { title: "لا توجد استراتيجية واضحة؟", summary: "تفتقر إلى خطة تسويقية واضحة ومنظمة تحقق أهدافك.", icon: "fa-exclamation-triangle", solution: "استراتيجية خطوة بخطوة" },
  ] satisfies HomeCard[],
  stats: [
    { value: "+15", label: "سنة خبرة" },
    { value: "+478", label: "عميل راض" },
    { value: "+638", label: "مشروع منفذ" },
    { value: "98%", label: "معدل رضا العملاء" },
  ] satisfies HomeMetric[],
  why: [
    { title: "خبرة عملية", summary: "فريق فاهم السوق ويعرف يحول الفكرة لخطة تنفيذ.", icon: "fa-award" },
    { title: "فريق متكامل", summary: "استراتيجية، تصميم، محتوى، إعلانات، ومتابعة في مسار واحد.", icon: "fa-users" },
    { title: "نتائج قابلة للقياس", summary: "نربط كل خطوة بمؤشرات واضحة بدل الكلام العام.", icon: "fa-chart-line" },
    { title: "حماية للبراند", summary: "نحافظ على شكل ورسالة ثابتة في كل نقطة تواصل.", icon: "fa-shield-alt" },
    { title: "سرعة في التنفيذ", summary: "نبدأ بخطة واضحة ثم ننفذ ونعدل بسرعة.", icon: "fa-bolt" },
    { title: "دعم مستمر", summary: "متابعة بعد الإطلاق حتى يفضل المشروع في الاتجاه الصح.", icon: "fa-headset" },
  ] satisfies HomeCard[],
  portfolio: [
    { title: "حملة إطلاق براند", summary: "هوية ورسائل وصفحة هبوط وحملة أولية لبدء السوق بقوة.", icon: "fa-store", href: "/portfolio", category: "Brand Launch", meta: "هوية / محتوى / إعلان" },
    { title: "نمو مبيعات متجر", summary: "اختبار عروض ورسائل وتحسين مسار الشراء لزيادة الطلبات.", icon: "fa-cart-shopping", href: "/portfolio", category: "E-commerce", meta: "إعلانات / تحويلات" },
    { title: "حضور شركة B2B", summary: "تنظيف الرسالة وترتيب الخدمات والمحتوى لرفع الثقة.", icon: "fa-building", href: "/portfolio", category: "B2B", meta: "تموضع / موقع" },
    { title: "محتوى سوشيال ميديا", summary: "خطة محتوى وتصميمات شهرية تحافظ على حضور ثابت.", icon: "fa-photo-film", href: "/portfolio", category: "Content", meta: "تصميم / نشر" },
  ] satisfies HomeCard[],
  offers: [
    { title: "باقة الانطلاقة", summary: "هوية أولية ورسائل أساسية وخطة محتوى لأول شهر.", icon: "fa-seedling", href: "/offers", meta: "مناسبة للبدايات" },
    { title: "باقة النمو", summary: "حملات إعلانية ومحتوى ومتابعة نتائج لزيادة الطلبات.", icon: "fa-bullhorn", href: "/offers", meta: "للشركات الجاهزة للنمو" },
    { title: "باقة التحول الرقمي", summary: "موقع أو صفحة هبوط وتجربة تحويل تساعد العميل يقرر أسرع.", icon: "fa-laptop-code", href: "/offers", meta: "للتحويلات والقياس" },
  ] satisfies HomeCard[],
  services: [
    { title: "الاستشارات التسويقية", summary: "تحليل، تموضع، وخطة عملية تناسب ميزانيتك ومرحلتك.", icon: "fa-compass-drafting", href: "/services" },
    { title: "التصميم والهوية البصرية", summary: "هوية ورسائل وتصميمات أساسية تخدم البراند بوضوح.", icon: "fa-palette", href: "/services" },
    { title: "خدمات التسويق الرقمي", summary: "حملات تسويقية شاملة على المنصات المناسبة لجمهورك.", icon: "fa-bullhorn", href: "/services" },
    { title: "البرمجة والتطوير", summary: "مواقع ومنصات وتجارب رقمية تساعد العميل يثق ويتواصل.", icon: "fa-code", href: "/services" },
    { title: "دعاية وإعلان متكاملة", summary: "حملات دعائية تضمن انتشار واضح في المناطق المستهدفة.", icon: "fa-ad", href: "/services" },
    { title: "إنتاج المحتوى والميديا", summary: "تصوير وفيديوهات وموشن جرافيك وعناصر إنتاج إبداعية.", icon: "fa-video", href: "/services" },
  ] satisfies HomeCard[],
  process: [
    { title: "الاستماع والفهم", summary: "نسمع هدفك، نفهم وضعك الحالي، ونحدد أين المشكلة وأقرب فرصة للنمو.", icon: "fa-headset", duration: "1 - 2 يوم" },
    { title: "التحليل والتخطيط", summary: "نحلل السوق والمنافسين ثم نبني خطة عملية تناسب ميزانيتك ومرحلتك.", icon: "fa-chart-pie", duration: "3 - 5 أيام" },
    { title: "التصميم والإبداع", summary: "نجهز الهوية والمحتوى والتصميمات الأساسية بشكل مرتب يخدم الرسالة.", icon: "fa-pen-ruler", duration: "5 - 7 أيام" },
    { title: "الإنتاج والتطبيق", summary: "نطلق التنفيذ، نتابع النتائج، ونعدل بسرعة حتى يظل المشروع في الاتجاه الصح.", icon: "fa-rocket", duration: "حسب نطاق المشروع" },
  ] satisfies HomeProcessStep[],
  products: [
    { title: "باقة التصميم الشهرية", summary: "20 تصميم احترافي للسوشيال ميديا.", icon: "fa-palette", href: "/products", oldPrice: "بدلاً من 3,100 ج", price: "2,500 ج" },
    { title: "قوالب هوية جاهزة", summary: "ملف كامل للهوية البصرية.", icon: "fa-file-alt", href: "/products", oldPrice: "بدلاً من 1,800 ج", price: "1,500 ج" },
    { title: "باقة الفيديو التسويقي", summary: "3 فيديوهات مع موشن جرافيك.", icon: "fa-video", href: "/products", oldPrice: "بدلاً من 5,200 ج", price: "4,000 ج" },
    { title: "موقع إلكتروني جاهز", summary: "موقع احترافي جاهز فوراً.", icon: "fa-globe", href: "/products", oldPrice: "بدلاً من 10,000 ج", price: "8,000 ج" },
  ] satisfies HomeCard[],
  about: [
    { title: "رؤية واضحة", summary: "نبدأ بفهم المشروع والهدف الحقيقي قبل أي تنفيذ.", icon: "fa-bullseye" },
    { title: "نتائج ملموسة", summary: "كل خطوة مرتبطة بهدف قابل للقياس والمتابعة.", icon: "fa-trophy" },
    { title: "تنفيذ منظم", summary: "نشتغل بخطة واضحة ومراحل محددة بدل العشوائية.", icon: "fa-check-circle" },
    { title: "شراكة طويلة", summary: "نساعدك تبني حضور مستمر مش حملة مؤقتة فقط.", icon: "fa-handshake" },
  ] satisfies HomeCard[],
  articles: [
    { title: "7 استراتيجيات مدروسة لزيادة مبيعاتك في 2025", summary: "اكتشف خطوات عملية لتحسين رسائلك وحملاتك في وقت قياسي.", icon: "fa-chart-line", href: "/articles", category: "التسويق الرقمي", meta: "15 نوفمبر 2025" },
    { title: "كيف تبني علاقة تجارية قوية تدفع العملاء للتفاعل؟", summary: "خطوات عملية لبناء علاقة واضحة مع جمهورك عبر المحتوى والحملات.", icon: "fa-mobile-alt", href: "/articles", category: "السوشيال ميديا", meta: "10 نوفمبر 2025" },
    { title: "أسرار التسويق الرقمي الناجح للمبتدئين", summary: "دليل مختصر لفهم احتياجات العميل وتحويلها لخطة تسويق قابلة للتطبيق.", icon: "fa-palette", href: "/articles", category: "البراند", meta: "5 نوفمبر 2025" },
  ] satisfies HomeCard[],
  faq: [
    { title: "ما هي أول خطوة للعمل معكم؟", summary: "نبدأ بمكالمة فهم قصيرة لتحديد الهدف، المشكلة، والفرصة الأقرب للنمو.", icon: "fa-circle-question" },
    { title: "هل الاستشارة مجانية؟", summary: "نعم، أول استشارة هدفها فهم الاحتياج وترشيح البداية الأنسب.", icon: "fa-comments" },
    { title: "هل يمكن تنفيذ جزء واحد فقط؟", summary: "نعم. نحدد نطاق صغير وواضح لو هذا هو الأنسب الآن.", icon: "fa-list-check" },
    { title: "هل تقدمون ضماناً على الخدمات؟", summary: "نقدم مراجعات وتعديلات ضمن نطاق العمل حتى نصل للنتيجة المتفق عليها.", icon: "fa-shield-alt" },
    { title: "كم يستغرق تنفيذ المشروع؟", summary: "المدة تختلف حسب نطاق المشروع، ونوضح الجدول قبل بدء التنفيذ.", icon: "fa-clock" },
    { title: "هل تقدمون خدمات ما بعد التنفيذ؟", summary: "نعم، نقدم دعماً ومتابعة لتحسين النتائج بعد الإطلاق.", icon: "fa-headset" },
  ] satisfies HomeCard[],
  contact: {
    title: "جاهز تبدأ أول خطوة معانا؟",
    summary: "احجز استشارتك المجانية الآن واحصل على خطة عمل مخصصة لمشروعك.",
    whatsappHref:
      "https://wa.me/201068274662?text=%D8%A3%D9%87%D9%84%D8%A7%20SWEED%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A",
  },
} as const;
