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
  serviceKey?: string;
  category?: string;
  price?: string;
  oldPrice?: string;
  image?: string;
  result?: string;
  items?: string[];
  featured?: boolean;
  ctaLabel?: string;
};

export type HomeProcessStep = HomeCard & {
  duration: string;
};

export const homepageContent = {
  hero: {
    eyebrow: "SWEED | MARKETING & ADVERTISING",
    title: "نصنع العلامات التي تقود المستقبل.",
    subtitle: "نحن وكالة تسويق وتصميم علامات تجارية متكاملة. نساعد الشركات الطموحة على بناء حضور قوي، وتجربة متكاملة، ونمو مستدام.",
    summary: "",
    actions: [
      { label: "احجز استشارتك المجانية", href: "/#contact", icon: "fa-calendar-check", variant: "primary" },
      { label: "شاهد أعمالنا", href: "/#portfolio", icon: "fa-arrow-up-right", variant: "secondary" },
    ] satisfies HomeAction[],
    media: [
      {
        kind: "video",
        src: "/videos/blit-scroll-effect-demo.mp4",
        poster: "/images/hero/custom-image.png",
        alt: "واجهة بصرية تعرّف بخدمات SWEED",
      },
      {
        kind: "image",
        src: "/images/hero/entrepreneur-laptop-office.jpg",
        alt: "فريق يعمل على مشروع تسويقي",
      },
      {
        kind: "image",
        src: "/images/hero/two-men-consultation.jpg",
        alt: "جلسة استشارة بين فريق SWEED وعميل",
      },
      {
        kind: "image",
        src: "/images/hero/businessman-laptop-standing.jpg",
        alt: "متابعة تنفيذ مشروع رقمي",
      },
    ],
    metrics: [
      { value: "+150", label: "مشروع مكتمل" },
      { value: "15", label: "سنة خبرة" },
      { value: "92%", label: "معدل احتفاظ العملاء" },
      { value: "7", label: "أسواق نخدمها" },
    ] satisfies HomeMetric[],
  },
  clients: ["NOVA", "ALPHA", "EDGE", "SAHL", "SHIFT", "URBAN"],
  problems: [
    { title: "ميزانية؟", summary: "تحتاج حلول تسويق مناسبة لميزانيتك.", icon: "fa-chart-line", solution: "حلول مرنة حسب ميزانيتك", serviceKey: "consulting" },
    { title: "الجمهور؟", summary: "تحتاج تحديد العميل المناسب بوضوح.", icon: "fa-bullseye", solution: "تحليل واضح للجمهور", serviceKey: "digital-marketing" },
    { title: "المنافسة؟", summary: "تحتاج تظهر اختلافك وسط السوق.", icon: "fa-users-slash", solution: "تموضع يبرز اختلافك", serviceKey: "branding" },
    { title: "نتائج بطيئة؟", summary: "تحتاج خطة تنفيذ أسرع وأوضح.", icon: "fa-clock", solution: "خطة تنفيذ قابلة للقياس", serviceKey: "consulting" },
    { title: "عائد ضعيف؟", summary: "تحتاج تحسين الإعلانات والقياس.", icon: "fa-hand-holding-usd", solution: "تحسين مستمر للأداء", serviceKey: "advertising" },
    { title: "استراتيجية؟", summary: "تحتاج مسار واضح قبل التنفيذ.", icon: "fa-exclamation-triangle", solution: "استراتيجية خطوة بخطوة", serviceKey: "consulting" },
  ] satisfies HomeCard[],
  stats: [
    { value: "+15", label: "سنة خبرة" },
    { value: "+638", label: "مشروع منفذ" },
    { value: "+478", label: "عميل وثق فينا" },
  ] satisfies HomeMetric[],
  why: [
    { title: "خبرة عملية", summary: "نشتغل من واقع السوق، مش قوالب جاهزة.", icon: "fa-award" },
    { title: "فريق واحد", summary: "استراتيجية، محتوى، تصميم، وتطوير في مسار واحد.", icon: "fa-users" },
    { title: "قياس واضح", summary: "كل خطوة مربوطة بهدف ورقم.", icon: "fa-chart-line" },
    { title: "براند ثابت", summary: "رسالة وشكل موحد في كل نقطة تواصل.", icon: "fa-shield-alt" },
    { title: "تنفيذ أسرع", summary: "نبدأ بخطة قصيرة ونحسن بسرعة.", icon: "fa-bolt" },
    { title: "متابعة مستمرة", summary: "بعد الإطلاق نراجع ونظبط الاتجاه.", icon: "fa-headset" },
  ] satisfies HomeCard[],
  portfolioHead: {
    year: "©26",
    label: "المشاريع",
    description: "نعمل على مشاريع تربط بين الاستراتيجية والإبداع من خلال هويات بصرية قوية وتجارب تسويقية متكاملة. كل مشروع هو فرصة لإعادة تشكيل الطريقة التي تتفاعل بها العلامات التجارية مع جمهورها — من تموضع السوق إلى تفاصيل الحملة الرقمية. نؤمن أن التسويق ليس مجرد إعلان، بل حركة تعبّر عن أداء ونمو وقيمة حقيقية.",
    title: "أعمال مُختارة",
  },
  portfolio: [
    { title: "إطلاق علامة نوفا", summary: "تموضع وهوية ورسائل وصفحة إطلاق صنعت حضورًا متماسكًا من أول يوم.", icon: "fa-store", href: "/portfolio", category: "براندنج", meta: "هوية / محتوى / إطلاق", image: "/images/hero/custom-image.png", result: "+42% تذكّر للعلامة" },
    { title: "محرك مبيعات Pulse", summary: "عروض وصفحات هبوط واختبارات إعلانية أسبوعية رفعت كفاءة مسار الطلب.", icon: "fa-cart-shopping", href: "/portfolio", category: "أداء", meta: "إعلانات / تحويلات", image: "/images/hero/entrepreneur-laptop-office.jpg", result: "+67% طلبات مؤهلة" },
    { title: "حضور Astra الرقمي", summary: "إعادة ترتيب الخدمات والإثباتات ودعوات التواصل داخل تجربة موقع أوضح.", icon: "fa-building", href: "/portfolio", category: "مواقع", meta: "استراتيجية / تجربة / تطوير", image: "/images/hero/two-men-consultation.jpg", result: "+31% معدل تحويل" },
    { title: "Signal Content Studio", summary: "نظام محتوى واتجاه بصري قابل للتكرار حافظ على ثبات العلامة عبر القنوات.", icon: "fa-photo-film", href: "/portfolio", category: "محتوى", meta: "تصميم / إنتاج / نشر", image: "/images/homepage/strategy-horse.png", result: "3× معدل التفاعل" },
  ] satisfies HomeCard[],
  offers: [
    {
      title: "باقة الانطلاقة",
      summary: "أساس واضح ومهني يساعد مشروعك يبدأ بصورة صحيحة.",
      icon: "fa-seedling",
      href: "/offers",
      meta: "مناسبة للبدايات",
      items: ["جلسة تحديد الاتجاه", "هوية ورسائل أساسية", "خطة محتوى لأول شهر", "ملفات جاهزة للانطلاق"],
      ctaLabel: "اطلب باقة الانطلاقة",
    },
    {
      title: "باقة النمو",
      summary: "تنفيذ وقياس مستمر لزيادة الطلبات وتحسين العائد.",
      icon: "fa-bullhorn",
      href: "/offers",
      meta: "للشركات الجاهزة للنمو",
      items: ["خطة نمو لمدة 90 يوم", "حملات إعلانية وإدارة محتوى", "اختبارات عروض وكرياتيف", "تقرير وتحسين أسبوعي"],
      featured: true,
      ctaLabel: "احجز مكالمة نمو",
    },
    {
      title: "باقة التحول الرقمي",
      summary: "تجربة رقمية متكاملة تربط البراند بالمبيعات والقياس.",
      icon: "fa-laptop-code",
      href: "/offers",
      meta: "للتحويلات والقياس",
      items: ["موقع أو منصة مخصصة", "تصميم تجربة ومسار تحويل", "ربط أدوات القياس والتواصل", "إطلاق ودعم ما بعد التسليم"],
      ctaLabel: "ناقش التحول الرقمي",
    },
  ] satisfies HomeCard[],
  services: [
    { title: "الاستشارات التسويقية", summary: "تحليل، تموضع، وخطة عملية تناسب ميزانيتك ومرحلتك.", icon: "fa-compass-drafting", href: "/services#consulting", image: "/images/hero/two-men-consultation.jpg" },
    { title: "التصميم والهوية البصرية", summary: "هوية ورسائل وتصميمات أساسية تخدم البراند بوضوح.", icon: "fa-palette", href: "/services#branding", image: "/images/hero/custom-image.png" },
    { title: "خدمات التسويق الرقمي", summary: "حملات تسويقية شاملة على المنصات المناسبة لجمهورك.", icon: "fa-bullhorn", href: "/services#digital-marketing", image: "/images/hero/entrepreneur-laptop-office.jpg" },
    { title: "البرمجة والتطوير", summary: "مواقع ومنصات وتجارب رقمية تساعد العميل يثق ويتواصل.", icon: "fa-code", href: "/services#development", image: "/images/hero/businessman-laptop-standing.jpg" },
    { title: "دعاية وإعلان متكاملة", summary: "حملات دعائية تضمن انتشار واضح في المناطق المستهدفة.", icon: "fa-ad", href: "/services#advertising", image: "/images/hero/sweed-building.png" },
    { title: "إنتاج المحتوى والميديا", summary: "تصوير وفيديوهات وموشن جرافيك وعناصر إنتاج إبداعية.", icon: "fa-video", href: "/services#media", image: "/images/portfolio/blit-scroll-effect-demo-poster.png" },
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
