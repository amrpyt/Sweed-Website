export type NavLink = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type CardItem = {
  title: string;
  description: string;
};

export type ProblemCard = CardItem & {
  solution: string;
};

export type StepItem = {
  title: string;
  description: string;
};

export type PortfolioItem = {
  title: string;
  category: string;
  tags: string[];
};

export type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
};

export type PackageItem = {
  name: string;
  duration: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  features: string[];
};

export type ServiceItem = CardItem & {
  icon: string;
};

export type ProductItem = {
  title: string;
  price: string;
  oldPrice?: string;
  description: string;
};

export type BlogPost = {
  category: string;
  title: string;
  meta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FooterColumn = {
  title: string;
  links: string[];
};

export const navLinks: NavLink[] = [
  { label: "الرئيسية", href: "#hero" },
  { label: "من نحن", href: "#about" },
  { label: "خدماتنا", href: "#services" },
  { label: "عروضنا", href: "#packages" },
  { label: "منتجاتنا", href: "#products" },
  { label: "أعمالنا", href: "#portfolio" },
  { label: "المدونة", href: "#blog" },
  { label: "اتصل بنا", href: "#contact" },
];

export const heroContent = {
  title: "نحن لا نُسوّق منتجك، بل نُصنع لك قصة نجاح",
  subtitle: "وكالة تسويق وإعلان متكاملة تصنع لك تجربة رقمية متكاملة من الألف إلى الياء",
  description:
    "نساعدك على بناء علامة تجارية قوية، الوصول إلى جمهورك المستهدف، وتحقيق نتائج ملموسة. فريقنا من المحترفين في خدمتك على مدار الساعة.",
  primaryCta: "ابدأ مشروعك",
  secondaryCta: "شاهد أعمالنا",
  tertiaryCta: "اعرف أكثر",
};

export const problemCards: ProblemCard[] = [
  {
    title: "بطء النمو وضعف المبيعات",
    description: "منافسة شرسة وجمهور يبحث عن الجديد كل يوم.",
    solution: "استراتيجيات تسويقية مبتكرة تصلك بالجمهور المناسب.",
  },
  {
    title: "إدارة حساباتك بوقت وجهد كبير",
    description: "استهلاك الوقت والجهد في إدارة حساباتك بدون نتائج واضحة.",
    solution: "إدارة احترافية بجانبك لتوفير وقتك وجهدك.",
  },
  {
    title: "تضييع فلوسك على إعلانات بدون نتائج",
    description: "ميزانية إعلانات كبيرة بدون عائد حقيقي.",
    solution: "حملات إعلانية ذكية باستهداف دقيق ونتائج قابلة للقياس.",
  },
];

export const stats: StatItem[] = [
  { value: "+500", label: "عميل سعيد" },
  { value: "+1500", label: "مشروع منجز" },
  { value: "+8", label: "سنوات خبرة" },
  { value: "+15M", label: "وصول شهري" },
];

export const helpServices = [
  "إدارة حسابات سوشيال ميديا",
  "إعلانات ممولة",
  "تصميم هويات بصرية",
  "تصوير ومونتاج",
  "بناء علامة تجارية",
  "أخرى",
];

export const whyChooseUs: CardItem[] = [
  { title: "خبرة +8 سنوات", description: "فريق محترف يمثل صوت علامتك التجارية." },
  { title: "نتائج قابلة للقياس", description: "تقارير دورية بنتائج واضحة ومؤشرات أداء حقيقية." },
  { title: "دعم فني 24/7", description: "فريقنا معاك في أي وقت." },
  { title: "أسعار تنافسية", description: "جودة عالية وأسعار مناسبة لكل الميزانيات." },
  { title: "فريق شامل", description: "مصممين، مبرمجين، مسوقين، وكتّاب محتوى في مكان واحد." },
  { title: "ابتكار مستمر", description: "أفكار جديدة واستراتيجيات مبتكرة تناسب السوق." },
];

export const expertiseSteps: StepItem[] = [
  { title: "دراسة شاملة", description: "دراسة المنافسين والسوق وتحديد الجمهور المستهدف." },
  { title: "تصميم هويتك", description: "تصميم شعار وهوية بصرية كاملة وتطبيقها على المنصات." },
  { title: "بناء الحضور الرقمي", description: "تصميم وتطوير الموقع وإعداد الحسابات وتحسين الظهور." },
  { title: "إدارة المحتوى", description: "كتابة محتوى إبداعي وتصميم وجدولة نشر منتظم." },
  { title: "الحملات الإعلانية", description: "استهداف دقيق وإنشاء إعلانات جذابة وتحسين مستمر." },
  { title: "التحليل والتقارير", description: "متابعة النتائج وتقارير دورية مفصلة وتحسين الأداء." },
];

export const partners = ["SWEED", "Brand X", "Growth Co", "Media Lab", "Next CRM", "Studio 24"];

export const portfolioCategories = ["الكل", "سوشيال ميديا", "إعلانات ممولة", "تصوير ومونتاج", "هويات بصرية"];

export const portfolioItems: PortfolioItem[] = [
  { title: "حملة إطلاق منتج", category: "إعلانات ممولة", tags: ["استهداف", "تحويلات"] },
  { title: "هوية مطعم محلي", category: "هويات بصرية", tags: ["شعار", "ألوان"] },
  { title: "محتوى شهر كامل", category: "سوشيال ميديا", tags: ["تصميم", "جدولة"] },
  { title: "تصوير منتجات", category: "تصوير ومونتاج", tags: ["فيديو", "صور"] },
  { title: "نمو حساب تجاري", category: "سوشيال ميديا", tags: ["تحليل", "إدارة"] },
  { title: "حملة عروض موسمية", category: "إعلانات ممولة", tags: ["مبيعات", "قياس"] },
];

export const processSteps: StepItem[] = [
  { title: "التواصل والدراسة", description: "نفهم احتياجاتك ونراجع السوق والمنافسين." },
  { title: "الاستراتيجية", description: "نصمم استراتيجية تسويقية متكاملة." },
  { title: "التنفيذ", description: "ننقل الخطة إلى محتوى وحملات وتجارب رقمية." },
  { title: "المتابعة", description: "نتابع النتائج ونحلل البيانات بوضوح." },
  { title: "التطوير", description: "نطور الأداء بناءً على النتائج." },
];

export const testimonials: TestimonialItem[] = [
  { quote: "سويد غيّرت طريقة ظهور علامتنا وأرقامنا اتحسنت من أول شهر.", author: "أحمد محمود", role: "مدير شركة ناشئة" },
  { quote: "الفريق فاهم السوق وبيتعامل كأنه جزء من شركتنا.", author: "سارة علي", role: "صاحبة براند تجميل" },
  { quote: "التقارير واضحة، والتنفيذ سريع، والأفكار دايمًا مختلفة.", author: "محمد حسن", role: "مدير تسويق" },
  { quote: "اشتغلنا على الهوية والحملات، والنتيجة كانت أقوى من المتوقع.", author: "ندى كريم", role: "مؤسسة متجر إلكتروني" },
];

export const packages: PackageItem[] = [
  {
    name: "باقة بيزنس",
    duration: "شهر واحد",
    price: "1500 ر.س",
    features: ["إدارة 3 حسابات سوشيال ميديا", "15 بوست تصميم احترافي", "4 فيديوهات مونتاج", "نشر 3 مرات أسبوعياً", "متابعة الردود والتعليقات", "تقرير شهري بالنتائج"],
  },
  {
    name: "باقة برو",
    duration: "شهر واحد",
    price: "2500 ر.س",
    oldPrice: "3500 ر.س",
    badge: "الأكثر طلباً",
    features: ["إدارة 5 حسابات سوشيال ميديا", "30 بوست تصميم احترافي", "8 فيديوهات مونتاج", "نشر 5 مرات أسبوعياً", "إدارة الإعلانات الممولة", "تقريرين شهرياً بالنتائج"],
  },
  {
    name: "باقة العليا",
    duration: "شهر واحد",
    price: "4500 ر.س",
    features: ["إدارة 8 حسابات سوشيال ميديا", "60 بوست تصميم احترافي", "20 فيديو مونتاج", "نشر يومي", "إدارة الإعلانات الممولة", "تصوير منتجات 20 صورة", "تقارير أسبوعية مفصلة"],
  },
];

export const services: ServiceItem[] = [
  { icon: "users", title: "إدارة السوشيال ميديا", description: "ندير حساباتك على كل المنصات ونخليها عامل جذب لجمهورك." },
  { icon: "megaphone", title: "الإعلانات الممولة", description: "حملات إعلانية ذكية توصلك بالجمهور المناسب وبنتائج حقيقية." },
  { icon: "palette", title: "الهوية البصرية", description: "نصمم هوية بصرية متكاملة تعكس شخصيتك وتخليك مميز." },
  { icon: "camera", title: "التصوير والمونتاج", description: "محتوى مرئي احترافي يخلي علامتك تبرز وسط المنافسين." },
  { icon: "globe", title: "بناء المواقع", description: "مواقع احترافية سريعة ومتجاوبة مع كل الأجهزة." },
  { icon: "pen", title: "التسويق بالمحتوى", description: "محتوى إبداعي يكسر الروتين ويخلي جمهورك يتفاعل." },
];

export const products: ProductItem[] = [
  { title: "باقة بدء النشاط", price: "500 ر.س", oldPrice: "800 ر.س", description: "كل اللي تحتاجه عشان تبدأ حضور رقمي قوي." },
  { title: "استشارة تسويقية", price: "300 ر.س", description: "ساعة واحدة لفهم احتياجك ووضع خطوات عملية." },
  { title: "تصميم لوغو", price: "700 ر.س", description: "شعار احترافي يعبر عن شخصية علامتك." },
  { title: "حملة إعلانية", price: "1000 ر.س", description: "إعداد حملة موجهة بنتائج قابلة للقياس." },
];

export const aboutFeatures = ["بنعمل بشغف", "بنوصل لنتائج", "بنفكر خارج الصندوق", "بنكون جنبك"];

export const blogPosts: BlogPost[] = [
  { category: "تسويق رقمي", title: "ازاي تخلي حملاتك الإعلانية أكتر فعالية؟", meta: "كاتب المقالة | تاريخ | 150 مشاهدة" },
  { category: "نصائح", title: "10 نصائح لبناء هوية بصرية قوية", meta: "كاتب المقالة | تاريخ | 200 مشاهدة" },
  { category: "إعلانات", title: "أسرار الإعلانات الممولة الناجحة", meta: "كاتب المقالة | تاريخ | 180 مشاهدة" },
  { category: "سوشيال ميديا", title: "ازاي تختار المنصة المناسبة لعملك؟", meta: "كاتب المقالة | تاريخ | 220 مشاهدة" },
];

export const faqs: FaqItem[] = [
  { question: "إيه هي مدة التعاون معاكم؟", answer: "بنشتغل مع عملائنا بمشاريع شهرية وسنوية حسب الاحتياج، وده بيدي مرونة كاملة في التعامل." },
  { question: "إيه الفرق بين سويد وأي وكالة تانية؟", answer: "إحنا مش بس بنسوّق، إحنا بنفهم السوق والمنافسين ونبني قصة واضحة لعلامتك." },
  { question: "عندي ميزانية صغيرة، ممكن تساعدني؟", answer: "أكيد، بنقدم باقات متنوعة تناسب الميزانيات المختلفة من غير ما نضحي بجودة الشغل." },
  { question: "ازاي أقدر أتابع نتائج الشغل؟", answer: "بنقدملك تقارير دورية بتفاصيل المؤشرات ونتائج الحملات والخطوات القادمة." },
  { question: "هل التعاون مستمر ولا مشاريع محدودة؟", answer: "الاتنين متاحين حسب احتياجك، لكن هدفنا دايمًا علاقة طويلة مبنية على الثقة والنتائج." },
];

export const footerColumns: FooterColumn[] = [
  { title: "روابط سريعة", links: ["الرئيسية", "من نحن", "خدماتنا", "أعمالنا", "المدونة", "اتصل بنا"] },
  { title: "خدماتنا", links: ["إدارة السوشيال ميديا", "الإعلانات الممولة", "الهوية البصرية", "التصوير والمونتاج", "بناء المواقع", "التسويق بالمحتوى"] },
  { title: "تابعنا", links: ["فيس بوك", "انستجرام", "لينكد إن", "تيك توك"] },
];

export const contactInfo = {
  phone: "+201068274662",
  email: "mohamedsweed2050@gmail.com",
  address: "العنوان التفصيلي",
  hours: "الأحد - الخميس: 9 صباحاً - 5 مساءً",
};
