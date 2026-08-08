import { siteSettings } from "@/content/local-data";
import type { ContactPageSource } from "@/features/public-site/page-composers/types";

export const contactPageSource: ContactPageSource = {
  seo: {
    title: "تواصل معنا | SWEED",
    description: "تواصل مع SWEED عبر الهاتف أو واتساب أو البريد الإلكتروني، أو أرسل تفاصيل مشروعك من نموذج التواصل.",
  },
  breadcrumb: "تواصل معنا",
  hero: {
    eyebrow: "اتصل بنا",
    title: "تواصل معنا",
    summary: "نحن هنا لنستمع إليك ونساعدك في تحقيق أهدافك. تواصل معنا بالطريقة التي تناسبك، أو اكتب تفاصيل مشروعك في النموذج.",
  },
  form: {
    id: "contact-form",
    title: "أرسل لنا رسالة",
    summary: "اكتب بياناتك والخدمة المطلوبة ورسالتك، وسيقوم فريقنا بمراجعة الطلب وترتيب الخطوة التالية.",
    submitLabel: "إرسال الرسالة",
    notesLabel: "رسالتك",
  },
  sections: [
    {
      id: "contact-info",
      header: {
        title: "معلومات التواصل",
        summary: "لو تفضل التواصل المباشر، استخدم بيانات SWEED الحالية الموثقة.",
      },
      items: [
        { title: "المبيعات", summary: siteSettings.primaryPhone },
        { title: "واتساب", summary: siteSettings.whatsappUrl },
        { title: "البريد الإلكتروني", summary: siteSettings.primaryEmail },
      ],
    },
  ],
};
