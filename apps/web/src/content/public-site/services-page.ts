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
    title: "الاستشارات الإدارية والتسويقية",
    problem: "قبل ما تتحرك… محتاج تتأكد إنت رايح فين",
    role: "لما القرار يبقى مبني على إحساس، الفريق بيشتغل كتير والنتيجة بتفضل أقل من المتوقع. هنا بنفهم الصورة كاملة، نكشف نقطة التسرب، ونثبت أولويات قابلة للتنفيذ.",
    scope: ["بحث وتحليل سوق ومنافسين", "تحديد أهداف وأولويات", "خطط إدارية وتسويقية", "هيكلة وتشغيل", "مؤشرات أداء ومتابعة"],
    successIndicator: "مؤشر النجاح: قرار أوضح، أولويات معتمدة، وخطة تنفيذ قابلة للمتابعة — من غير وعد بنتيجة مالية مسبقة.",
    href: getServiceDetailHref("consulting"),
    actionLabel: "اعرف تفاصيل الاستشارات",
    composition: "decision",
  },
  {
    id: "branding",
    label: "هوية",
    title: "التصميم والهوية البصرية",
    problem: "براندك معروف… ولا مجرد اسم وشوية تصميمات؟",
    role: "الهوية مش لوجو منفصل عن شغلك — هي ترجمة واضحة لتميّزك، ورسالة ثابتة بتخلي العميل يفهمك ويعرف ليه يختارك.",
    scope: ["استراتيجية البراند", "الجمهور والتموضع", "الرسائل والنبرة", "الهوية البصرية", "دليل الاستخدام", "قوالب المنصات"],
    successIndicator: "مؤشر النجاح: رسالة وهوية متسقتان قابلتان للتطبيق على كل نقطة بيشوفها العميل.",
    href: getServiceDetailHref("branding"),
    actionLabel: "ابنِ هوية مشروعك",
    composition: "identity",
  },
  {
    id: "digital-marketing",
    label: "تسويق رقمي",
    title: "التسويق الرقمي",
    problem: "الإعلان مش المشكلة… لو المسار نفسه مش واضح",
    role: "مبنقيسش الشغل بعدد البوستات أو الإعلانات. بنربط كل قناة بهدف، وبنراجع الرسالة والصفحة والعرض قبل ما نطلب ميزانية أكبر.",
    scope: ["تأسيس وتأمين المنصات", "إدارة السوشيال", "الحملات الممولة", "المحتوى التسويقي", "SEO عند الحاجة", "تقارير وتحسين دوري"],
    successIndicator: "مؤشر النجاح: هدف واضح لكل قناة وتقارير بتشرح قرار التحسين — مش أرقام مبيعات مضمونة.",
    href: getServiceDetailHref("digital-marketing"),
    actionLabel: "شوف نظام التسويق الرقمي",
    composition: "performance",
  },
  {
    id: "development",
    label: "تطوير",
    title: "البرمجة والتطوير",
    problem: "لو شغلك كبر… هل نظامك كبر معاه؟",
    role: "الموقع أو النظام مش بند تقني منفصل — لازم يسهّل على العميل الشراء، وعلى الفريق المتابعة، وعلى الإدارة رؤية اللي بيحصل.",
    scope: ["مواقع تعريفية", "متاجر إلكترونية", "صفحات هبوط", "CRM وأنظمة تشغيل", "ربط وأتمتة", "تحسين تجربة المستخدم"],
    successIndicator: "مؤشر النجاح: تجربة أسهل للعميل وسير عمل أوضح للفريق حسب نطاق المشروع.",
    href: getServiceDetailHref("development"),
    actionLabel: "استكشف حلول التطوير",
    composition: "system",
  },
  {
    id: "advertising",
    label: "إعلان",
    title: "الدعاية والإعلان",
    problem: "وجودك في السوق لازم يتشاف… ويتميز",
    role: "اللوحة أو المطبوعات مش هدف في نفسها. كل نقطة ظهور لازم تحمل نفس الرسالة، وتخدم مكان ومرحلة وقرار واضح.",
    scope: ["حملات خارجية", "كتالوجات ومطبوعات", "تطبيقات هوية ميدانية"],
    successIndicator: "مؤشر النجاح: رسالة موحدة وحضور ميداني مقصود في الأماكن المناسبة.",
    href: getServiceDetailHref("advertising"),
    actionLabel: "خطط لظهور براندك",
    composition: "presence",
  },
  {
    id: "media",
    label: "ميديا",
    title: "إنتاج المحتوى والميديا",
    problem: "المحتوى الحلو مش كفاية… لازم يحرّك قرار",
    role: "كل لقطة لازم تعرف دورها: تعرّف، تبني ثقة، تشرح، أو تدفع لخطوة. عشان كده التصوير عندنا بيبدأ من فكرة وسكربت ومسار عميل — مش من الكاميرا.",
    scope: ["استراتيجية وخطة محتوى", "كتابة وسكربت", "تصوير منتجات وفعاليات", "فيديو إعلاني وتعريفي", "موشن جرافيك"],
    successIndicator: "مؤشر النجاح: محتوى مرئي ليه هدف ومكان معلوم في رحلة العميل — مش إنتاج لمجرد النشر.",
    href: getServiceDetailHref("media"),
    actionLabel: "ابدأ خطة المحتوى المرئي",
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
    summary: "قبل ما نبدأ تنفيذ، بنفهم مشروعك واقف فين وإيه اللي ناقصه فعلًا — وبعدها بنحدد الخدمة أو المسار اللي يحرّكه في الاتجاه الصح.",
    actions: [
      { label: "حدد نقطة البداية", href: "/contact?source=services", variant: "primary" },
      { label: "استكشف الخدمات", href: "#consulting", variant: "secondary" },
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
    title: "الخدمة الصح في الوقت الصح… مش كل الخدمات مرة واحدة",
    summary: "ممكن تبدأ بخدمة واحدة، وممكن مشروعك يحتاج مسار متكامل. الفرق إننا بنرتب الخطوات حسب وضعك الحقيقي — مش حسب قائمة ثابتة.",
    paths: [
      { title: "إطلاق علامة جديدة", services: ["consulting", "branding", "digital-marketing"] },
      { title: "تحسين تجربة ونمو رقمي", services: ["consulting", "development", "digital-marketing"] },
      { title: "حملة ظهور في السوق", services: ["consulting", "advertising", "media"] },
    ],
  },
  finalCta: {
    id: "services-cta",
    title: "مش محتاج تختار لوحدك",
    summary: "احكيلنا وضع مشروعك في سطرين، وإحنا نبدأ معاك من سؤال واحد: إيه أول خطوة تستحق تتعمل دلوقتي؟",
    primaryAction: { label: "احجز استشارتك المجانية", href: "/contact?source=services", variant: "primary" },
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
