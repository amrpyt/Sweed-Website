import { contactAction } from "@/content/navigation";
import type { ServicesPageSource } from "@/features/public-site/page-composers/types";
import { getServiceDetailHref } from "@/features/public-site/shared/service-route";

export type ExecutiveServiceSource = {
  id: "consulting" | "branding" | "digital-marketing" | "development" | "advertising" | "media";
  label: string;
  title: string;
  problem: string;
  role: string;
  scope: readonly string[];
  successIndicator: string;
  href: string;
  actionLabel: string;
  composition: "decision" | "identity" | "performance" | "system" | "presence" | "studio";
};

const executiveServices: readonly ExecutiveServiceSource[] = [
  {
    id: "consulting",
    label: "استشارات",
    title: "الاستشارات وتطوير الأعمال",
    problem: "عندك مجهود وقرارات كتير، لكن الاتجاه والأولويات مش ثابتين.",
    role: "نبدأ بالتشخيص والتحليل عشان نحدد السبب الحقيقي للمشكلة والبدائل قبل ما نزود التنفيذ.",
    scope: ["الاستشارات الإدارية", "دراسات الجدوى", "تحليل السوق والمنافسين", "خطط التطوير والنمو"],
    successIndicator: "المؤشر الأول للنجاح: تشخيص واضح وأولويات قابلة للتنفيذ والقياس.",
    href: getServiceDetailHref("consulting"),
    actionLabel: "اعرف مسار الاستشارات",
    composition: "decision",
  },
  {
    id: "branding",
    label: "هوية",
    title: "بناء العلامة التجارية",
    problem: "مشروعك قيمته أكبر من الصورة الحالية، أو البراند بيظهر بشكل مختلف من قناة للتانية.",
    role: "نبني رسالة ونظام بصري ثابت يترجم قيمة المشروع ويقدر يتطبق على نقاط التواصل الفعلية.",
    scope: ["استراتيجية العلامة التجارية", "تصميم الهوية البصرية", "دليل الهوية البصرية", "تطبيقات العلامة"],
    successIndicator: "المؤشر الأول للنجاح: تموضع ورسالة ونظام بصري ثابت يمكن للفريق استخدامه بدون اجتهاد كل مرة.",
    href: getServiceDetailHref("branding"),
    actionLabel: "اعرف مسار بناء البراند",
    composition: "identity",
  },
  {
    id: "digital-marketing",
    label: "تسويق رقمي",
    title: "التسويق الرقمي",
    problem: "القنوات شغالة، لكن صعب تعرف إيه اللي بيولد طلبات فعلية وإيه اللي بيستهلك الميزانية.",
    role: "نرتب الجمهور والرسالة والقنوات، ثم نشغل الحملات والمحتوى على هدف ومؤشرات واضحة.",
    scope: ["إدارة السوشيال ميديا", "الإعلانات المدفوعة", "تحسين محركات البحث SEO", "تحليل البيانات"],
    successIndicator: "المؤشر الأول للنجاح: هدف واضح وتقارير أداء تربط النشاط الرقمي بالطلبات والعائد.",
    href: getServiceDetailHref("digital-marketing"),
    actionLabel: "اعرف مسار التسويق الرقمي",
    composition: "performance",
  },
  {
    id: "development",
    label: "تطوير",
    title: "البرمجة والتطوير",
    problem: "الموقع أو النظام الحالي لا يخدم التشغيل، أو التجربة الرقمية منفصلة عن احتياج العميل والفريق.",
    role: "نبني مواقع وتطبيقات وأنظمة مرتبطة باحتياج حقيقي وتجربة مستخدم واضحة وقابلة للتوسع.",
    scope: ["مواقع الويب", "تطبيقات الويب", "أنظمة CRM وERP", "تطبيقات الجوال والتجارة الإلكترونية"],
    successIndicator: "المؤشر الأول للنجاح: تجربة متجاوبة وبنية واضحة وربط يخدم التشغيل بدل إضافة شاشة جديدة فقط.",
    href: getServiceDetailHref("development"),
    actionLabel: "اعرف نظام البرمجة والتطوير",
    composition: "system",
  },
  {
    id: "advertising",
    label: "إعلان",
    title: "الدعاية والإعلان",
    problem: "محتاج ظهور أقوى في السوق أو موسم محدد، لكن الرسالة والتنفيذ لازم يفضلوا موحدين.",
    role: "نحدد الهدف ونقاط الظهور المناسبة، ثم نصمم وننفذ المواد والحملات على الأرض بصورة مقصودة.",
    scope: ["الإعلانات الخارجية", "اللافتات والحروف المضيئة", "الطباعة والمطبوعات", "الحملات الدعائية"],
    successIndicator: "المؤشر الأول للنجاح: رسالة موحدة وتنفيذ واضح في نقاط الظهور التي تخدم الهدف الفعلي.",
    href: getServiceDetailHref("advertising"),
    actionLabel: "اعرف مسار الدعاية والإعلان",
    composition: "presence",
  },
  {
    id: "media",
    label: "ميديا",
    title: "إنتاج المحتوى والميديا",
    problem: "المحتوى موجود، لكن كل قطعة لازم يكون لها دور واضح في رحلة العميل والحملة.",
    role: "نبدأ من الهدف والفكرة، ثم ننفذ الصورة والفيديو والنص بصيغ تناسب القنوات واستخدامات الفريق.",
    scope: ["إنتاج الفيديو", "التصوير الفوتوغرافي", "الموشن جرافيك", "كتابة المحتوى"],
    successIndicator: "المؤشر الأول للنجاح: مكتبة محتوى قابلة للاستخدام تخدم الرسالة والحملة بدل إنتاج منفصل بلا سياق.",
    href: getServiceDetailHref("media"),
    actionLabel: "اعرف مسار إنتاج المحتوى",
    composition: "studio",
  },
];

export const servicesPageSource = {
  seo: {
    title: "خدمات SWEED المتكاملة",
    description: "ابدأ من مشكلة مشروعك واعرف كيف ترتبط خدمات SWEED في الاستشارات والبراند والتسويق والتطوير والإعلان والميديا.",
  },
  breadcrumb: "خدماتنا",
  hero: {
    eyebrow: "خدمات SWEED",
    title: "مش كل مشكلة محتاجة نفس الخدمة",
    summary: "ابدأ من المشكلة والمرحلة الحالية. كل خدمة لها دور واضح، والمهم هو ترتيبها في المسار الصحيح لمشروعك.",
    actions: [
      { label: "شوف مسارات الخدمات", href: "#consulting", variant: "primary" },
      { label: "ناقش احتياجك", href: "/contact?source=services", variant: "secondary" },
    ],
  },
  section: {
    id: "services",
    header: {
      title: "ستة تخصصات، لكن القرار يبدأ من الاحتياج",
      summary: "الخدمة ليست منتجًا منفصلًا. نحدد أين المشكلة ثم نرتب التدخلات التي تخدم القرار والتنفيذ والقياس.",
    },
  },
  services: executiveServices,
  integratedPath: {
    id: "integrated-path",
    title: "لما المشروع يحتاج أكثر من تخصص",
    summary: "المسارات التالية أمثلة تنظيمية لتوضيح كيف يمكن أن تتكامل الخدمات. الترتيب النهائي يعتمد على تشخيص المشروع.",
    paths: [
      { title: "إطلاق علامة جديدة", services: ["consulting", "branding", "digital-marketing"] },
      { title: "تحسين تجربة ونمو رقمي", services: ["consulting", "development", "digital-marketing"] },
      { title: "حملة ظهور في السوق", services: ["consulting", "advertising", "media"] },
    ],
  },
  finalCta: {
    id: "services-cta",
    title: "مش متأكد تبدأ منين؟",
    summary: "احكيلنا عن المرحلة والتحدي الحالي، ونحدد معك نقطة البداية قبل اختيار أي خدمة.",
    primaryAction: contactAction,
  },
  cta: {
    title: "مش متأكد أي خدمة أنسب لك؟",
    summary: "احجز تواصل سريع وسنحدد معك البداية الصحيحة بدل اختيار عشوائي.",
    primaryAction: contactAction,
  },
} satisfies ServicesPageSource & {
  services: readonly ExecutiveServiceSource[];
  integratedPath: {
    id: "integrated-path";
    title: string;
    summary: string;
    paths: readonly { title: string; services: readonly ExecutiveServiceSource["id"][] }[];
  };
  finalCta: {
    id: "services-cta";
    title: string;
    summary: string;
    primaryAction: typeof contactAction;
  };
};
