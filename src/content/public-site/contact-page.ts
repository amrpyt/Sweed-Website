import type { ContactPageSource } from "@/features/public-site/page-composers/types";

export const contactPageSource: ContactPageSource = {
  seo: {
    title: "تواصل معنا - SWEED",
    description: "طرق التواصل مع SWEED، نموذج الاستشارة، والأسئلة السريعة قبل بدء المشروع.",
  },
  breadcrumb: "اتصل بنا",
  hero: {
    eyebrow: "تواصل معنا",
    title: "ابدأ الحديث بالطريقة التي تناسبك",
    summary: "سواء تحتاج استشارة سريعة أو تريد عرضًا أوضح للخدمات، سنجمع احتياجك في نموذج بسيط ونرتب الخطوة التالية.",
    stats: [
      { value: "أقل من ساعة", label: "متوسط الرد" },
      { value: "6 أيام", label: "أيام العمل" },
      { value: "مجانية", label: "الاستشارة الأولى" },
    ],
  },
  form: {
    id: "contact-form",
    title: "أرسل طلبك الآن",
    summary: "اكتب بياناتك والخدمات التي تهمك وسنعود إليك برسالة أو مكالمة مرتبة.",
    submitLabel: "أرسل الطلب",
    notesLabel: "نبذة سريعة عن احتياجك",
  },
  sections: [
    {
      id: "contact-info",
      header: {
        title: "بيانات التواصل",
        summary: "لو تفضل التواصل المباشر، هذه أسرع القنوات المتاحة الآن.",
      },
      items: [
        { title: "الهاتف", summary: "01068274662" },
        { title: "البريد الإلكتروني", summary: "info@sweed.com" },
        { title: "واتساب", summary: "https://wa.me/201068274662" },
        { title: "مواعيد العمل", summary: "السبت - الخميس: 9:00 ص - 6:00 م" },
      ],
    },
    {
      id: "quick-faq",
      tone: "alt",
      header: {
        title: "أسئلة سريعة قبل التواصل",
        summary: "أكثر ما يسأله العملاء قبل إرسال الطلب الأول.",
      },
      items: [
        { title: "متى يتم الرد؟", summary: "غالبًا خلال أقل من ساعة في أوقات العمل." },
        { title: "هل يمكن البدء بمشروع صغير؟", summary: "نعم، ونرشح المسار المناسب حسب المرحلة الحالية." },
        { title: "هل الاستشارة الأولى مجانية؟", summary: "نعم، الهدف منها فهم الاحتياج وتحديد البداية." },
      ],
    },
  ],
};
