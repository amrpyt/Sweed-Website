import "server-only";

export type SweedKnowledge = {
  brand: string;
  summary: string;
  services: Array<{ title: string; details: string; url: string }>;
  packages: Array<{ title: string; details: string; url: string }>;
  faq: Array<{ question: string; answer: string; url: string }>;
  contact: {
    phone: string;
    email: string;
    url: string;
  };
};

export function buildSweedKnowledge(): SweedKnowledge {
  return {
    brand: "SWEED",
    summary:
      "SWEED helps companies build stronger digital presence through marketing, websites, visual identity, content, advertising campaigns, AI automation, and business support.",
    services: [
      {
        title: "التسويق الرقمي",
        details: "إدارة حملات وإعلانات ومحتوى لزيادة الظهور وجذب العملاء.",
        url: "/services#services",
      },
      {
        title: "تصميم وبرمجة المواقع",
        details: "مواقع تعريفية وتجارية وتجارب رقمية مناسبة لهوية النشاط.",
        url: "/services#services",
      },
      {
        title: "الهوية البصرية والتصميم",
        details: "شعارات، مواد إعلانية، وتصميمات سوشيال ميديا متناسقة.",
        url: "/services#services",
      },
      {
        title: "الذكاء الاصطناعي والأتمتة",
        details: "مساعدات ذكية وسيناريوهات أتمتة لتسريع الردود وفرز العملاء وتوجيههم.",
        url: "/services#ai-automation-demo",
      },
    ],
    packages: [
      {
        title: "باقة البداية",
        details: "مناسبة لمن يريد حضور رقمي واضح وبداية منظمة.",
        url: "/offers#offers",
      },
      {
        title: "باقة النمو",
        details: "مناسبة لمن يريد حملات ومحتوى ومتابعة لتحويل الزيارات إلى فرص.",
        url: "/offers#offers",
      },
      {
        title: "باقة التوسع",
        details: "مناسبة للشركات التي تحتاج موقع، تسويق، أتمتة، ومتابعة أعمق.",
        url: "/offers#offers",
      },
    ],
    faq: [
      {
        question: "كيف أختار الخدمة المناسبة؟",
        answer: "نبدأ بفهم هدفك: حضور، عملاء محتملين، مبيعات، أو أتمتة. بعدها نرشح مسار واضح.",
        url: "/faq#faq",
      },
      {
        question: "هل الأسعار ثابتة؟",
        answer: "التكلفة تعتمد على نطاق العمل، لذلك أي رقم نهائي يحتاج تأكيد من فريق SWEED.",
        url: "/contact#contact-form",
      },
    ],
    contact: {
      phone: "01068274662",
      email: "info@sweed.com",
      url: "/contact#contact-form",
    },
  };
}

export function formatSweedKnowledge(knowledge: SweedKnowledge = buildSweedKnowledge()): string {
  const services = knowledge.services.map((item) => `- ${item.title}: ${item.details} (${item.url})`).join("\n");
  const packages = knowledge.packages.map((item) => `- ${item.title}: ${item.details} (${item.url})`).join("\n");
  const faq = knowledge.faq.map((item) => `- ${item.question}: ${item.answer} (${item.url})`).join("\n");

  return [
    `Brand: ${knowledge.brand}`,
    `Summary: ${knowledge.summary}`,
    "Services:",
    services,
    "Packages:",
    packages,
    "FAQ:",
    faq,
    `Contact: phone ${knowledge.contact.phone}, email ${knowledge.contact.email}, url ${knowledge.contact.url}`,
  ].join("\n");
}

