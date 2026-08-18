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
  verification?: "verified" | "pending";
};

export type HomeProcessStep = HomeCard & {
  duration: string;
};

export const homepageContent = {
  hero: {
    eyebrow: "سويد للاستشارات الإدارية والتسويقية",
    title: "نصنع العلامات التي تقود المستقبل",
    subtitle: "نحدد لك الاتجاه، ونلتزم معك بالوصول — معًا ستصل.",
    trustLine: "خبرة من 2011 · اتجاه واضح · متابعة مستمرة",
    actions: [
      { label: "احجز استشارتك المجانية", href: "/contact?source=home-hero", icon: "fa-calendar-check", variant: "primary" },
      { label: "شاهد أعمالنا", href: "/#portfolio", icon: "fa-arrow-up-right", variant: "secondary" },
    ] satisfies HomeAction[],
    media: [
      {
        kind: "video",
        src: "/videos/blit-scroll-effect-demo.mp4",
        poster: "/images/hero/custom-image.png",
        alt: "اتفرج في دقيقتين: مين سويد، وبنشتغل إزاي",
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
  },
  problemsIntro:
    "أغلب المشروعات مشكلتها مش قلة المجهود... المشكلة في الاتجاه. اختار أقرب جملة بتوصف وضعك دلوقتي، وإحنا نحدد معاك أول خطوة صح.",
  problems: [
    {
      title: "باخد قرارات كتير، ومش متأكد إني ماشي في الاتجاه الصح.",
      summary: "",
      icon: "fa-compass",
      solution: "اتجاه وقرار إداري أوضح",
      serviceKey: "الاستشارات الإدارية",
    },
    {
      title: "بصرف على الإعلانات، ومفيش عائد يوازي اللي بدفعه.",
      summary: "",
      icon: "fa-chart-line",
      solution: "قياس وتحسين للعائد",
      serviceKey: "التسويق الرقمي",
    },
    {
      title: "البراند بتاعي مش بيعبر عني، وشكله مختلف من مكان للتاني.",
      summary: "",
      icon: "fa-palette",
      solution: "هوية ثابتة ومعبرة",
      serviceKey: "بناء البراند والهوية البصرية",
    },
    {
      title: "جربت أكتر من شركة قبل كده، وكل مرة نفس النتيجة.",
      summary: "",
      icon: "fa-route",
      solution: "تشخيص قبل التنفيذ",
      serviceKey: "الاستشارات التسويقية",
    },
    {
      title: "شغلي كويس فعلًا... بس محدش يعرفني في السوق.",
      summary: "",
      icon: "fa-bullhorn",
      solution: "ظهور ورسالة أوضح",
      serviceKey: "الدعاية والإعلان",
    },
    {
      title: "عايز أبيع وأشتغل أونلاين، بس مش عارف أبدأ منين.",
      summary: "",
      icon: "fa-laptop-code",
      solution: "بداية رقمية مناسبة",
      serviceKey: "المواقع والأنظمة والحلول الرقمية",
    },
  ] satisfies HomeCard[],
  about: {
    title: "مين سويد؟",
    videoLabel: "اتفرج في دقيقتين: مين سويد، وبنشتغل إزاي.",
    paragraphs: [
      "سويد شركة استشارات إدارية وتسويقية شغالة في السوق المصري والعربي من 2011. بنبدأ بفهم وضع المشروع وتشخيص السبب الحقيقي للمشكلة، وبعدها بنحدد الأولويات والبدائل بالبيانات ونحوّل القرار لخطة تنفيذ ومؤشرات متابعة واضحة.",
      "الاستشارات والتسويق والبراند والمواقع والإعلان والميديا عندنا بيتحركوا في اتجاه واحد، ونفضل معاك في القياس والمتابعة لحد ما القرار يتحول لنتيجة قابلة للتقييم.",
    ],
    points: [
      {
        title: "بنحلل قبل ما ننصح",
        summary: "القرار عندنا بيبدأ من البيانات مش الانطباع.",
        icon: "fa-chart-simple",
      },
      {
        title: "بنوضح البدائل قبل ما نوصي",
        summary: "وإنت صاحب القرار الأخير.",
        icon: "fa-code-branch",
      },
      {
        title: "متابعة ماتعرفش الاختفاء",
        summary: "بنفضل معاك بعد التسليم مش قبله وبس.",
        icon: "fa-headset",
      },
    ] satisfies HomeCard[],
    vision: "رؤيتنا: نكون البوصلة اللي كل صاحب مشروع في مصر والوطن العربي يثق فيها عشان يوصل لوجهته.",
    mission: "رسالتنا: نحدد لأصحاب المشاريع الاتجاه الصح، ونمشي معاهم في التنفيذ لحد ما يوصلوا لأهدافهم.",
    action: { label: "اعرف أكتر عن سويد", href: "/about" },
  },
  slogan: {
    start: "نحدد لك الاتجاه",
    end: "ونلتزم معك بالوصول",
    caption: "معًا ستصل",
    image: "/images/homepage/compass-problems.png",
  },
  stats: [] as HomeMetric[],
  why: [
    {
      title: "بنحلل قبل ما ننصح",
      summary: "قراراتنا مبنية على بيانات وفهم لسوقك — مش انطباعات ولا حلول منسوخة.",
      icon: "fa-chart-line",
    },
    {
      title: "اتجاه واحد... فريق واحد",
      summary: "استشارات وتصميم وتسويق وبرمجة بيشتغلوا مع بعض — مفيش مجهود متفرق.",
      icon: "fa-people-group",
    },
    {
      title: "كل خطوة ليها مؤشر",
      summary: "كل هدف ليه رقم بنقيس بيه، وتقارير دورية بتوصلك من غير تجميل.",
      icon: "fa-gauge-high",
    },
    {
      title: "شراكة مش خدمة",
      summary: "إحنا مش مورد بيقفل طلب — إحنا شريك بيقول الحقيقة حتى لو مش اللي نفسك تسمعه.",
      icon: "fa-handshake",
    },
    {
      title: "التزام بالمواعيد",
      summary: "الكلمة عندنا وعد عيلة — نطاق واضح، وتسليم في معاده، وشفافية في التكلفة.",
      icon: "fa-calendar-check",
    },
    {
      title: "متابعة ماتعرفش الاختفاء",
      summary: "بعد التنفيذ بنفضل معاك: بنقيس، بنراجع، وبنعدّل المسار أول بأول.",
      icon: "fa-headset",
    },
  ] satisfies HomeCard[],
  portfolioHead: {
    year: "©26",
    label: "أعمال مختارة",
    title: "شغلنا بيتكلم بالأرقام",
    description:
      "كل مشروع هنا بدأ بسؤال واحد: رايحين فين؟ ودي عينة من النتايج لما الاتجاه بيبقى واضح.",
  },
  portfolio: [
    {
      title: "مصنع النخبة للصناعات الغذائية",
      summary:
        "المصنع كان بيكبر والإدارة بتغرق — قرارات متضاربة ومفيش حد عارف مسؤوليته بالظبط. أعدنا هيكلة الأدوار وبنينا نظام متابعة بمؤشرات واضحة لكل قسم.",
      icon: "fa-industry",
      href: "/portfolio",
      category: "الاستشارات الإدارية",
      meta: "حالة موثقة",
      image: "/images/hero/two-men-consultation.jpg",
      result: "انخفاض التكاليف التشغيلية 22% خلال 6 شهور",
      verification: "verified",
    },
    {
      title: "قطاع المطاعم",
      summary:
        "نموذج الصيغة النهائية لدراسة حالة في التسعير وتجربة العميل. اسم العميل والنتيجة الرقمية يضافان بعد اكتمال التوثيق والموافقة.",
      icon: "fa-utensils",
      href: "/portfolio",
      category: "الاستشارات التسويقية",
      meta: "قيد التوثيق",
      image: "/images/hero/entrepreneur-laptop-office.jpg",
      result: "النتيجة الرقمية قيد التوثيق",
      verification: "pending",
    },
    {
      title: "دراسة حالة — متجر إلكتروني",
      summary:
        "نموذج الصيغة النهائية لمشروع محتوى وتسويق رقمي. اسم العميل والأرقام لا تنشر قبل اعتماد دراسة الحالة.",
      icon: "fa-cart-shopping",
      href: "/portfolio",
      category: "التسويق الرقمي",
      meta: "قيد التوثيق",
      image: "/images/hero/businessman-laptop-standing.jpg",
      result: "النتيجة الرقمية قيد التوثيق",
      verification: "pending",
    },
  ] satisfies HomeCard[],
  offersIntro:
    "مشروعك النهارده في مرحلة معينة، والباقة الصح هي اللي بتخدم المرحلة دي بالظبط، مش الأكبر ولا الأغلى.",
  offers: [
    {
      title: "انطلاقة",
      summary: "بداية صح من أول يوم — اتجاه واضح وهوية ثابتة قبل ما تصرف جنيه على التسويق.",
      icon: "fa-seedling",
      href: "/offers",
      meta: "لصاحب الفكرة أو المشروع الجديد",
      items: [
        "جلسة تشخيص وتحديد اتجاه للمشروع",
        "هوية بصرية أساسية: لوجو وألوان وتطبيقات أساسية",
        "تأسيس الحسابات الرقمية وتجهيزها للانطلاق",
        "خطة تسويق لأول 3 شهور بأولويات واضحة لمنصتين",
      ],
      ctaLabel: "اطلب تفاصيل الباقة",
    },
    {
      title: "نمو",
      summary: "تشغيل تسويقي شهري كامل بمؤشرات واضحة — تعرف كل شهر إنت فين وواصل لإيه.",
      icon: "fa-arrow-trend-up",
      href: "/offers",
      meta: "للمشروع القائم اللي عايز نتايج أحسن",
      items: [
        "مراجعة الاتجاه والخطة وتثبيت الأولويات",
        "إدارة التسويق الرقمي والحملات شهريًا",
        "محتوى وتصميمات دورية بهوية ثابتة",
        "تقرير أداء شهري بأرقام من غير تجميل",
      ],
      featured: true,
      ctaLabel: "اطلب تفاصيل الباقة",
    },
    {
      title: "تحول رقمي",
      summary: "مسار متكامل: استشارة وبنية رقمية وتشغيل وقياس — المشروع كله بيتحرك في اتجاه واحد.",
      icon: "fa-laptop-code",
      href: "/offers",
      meta: "للكيان اللي عايز يتوسع ويشتغل بنظام",
      items: [
        "استشارة إدارية وتسويقية شاملة",
        "موقع أو متجر أو نظام إدارة حسب احتياجك",
        "حملات مدفوعة بأهداف ومؤشرات قياس",
        "متابعة ربع سنوية وتحسين مستمر للمسار",
      ],
      ctaLabel: "اطلب تفاصيل الباقة",
    },
  ] satisfies HomeCard[],
  offersTail:
    "مش لاقي باقتك؟ عادي — بنفصّل نطاق شغل على مقاس مشروعك. احجز استشارة ونحدد مع بعض.",
  servicesIntro:
    "من القرار الاستراتيجي لحد التنفيذ على الأرض — 6 خدمات متكاملة تحت سقف واحد، كل خدمة ليها هدف واضح ومؤشرات بنقيس بيها الشغل.",
  services: [
    {
      title: "الاستشارات الإدارية والتسويقية",
      summary: "بنثبت اتجاه مشروعك ونبني قرار واضح بخطة قابلة للتنفيذ. بنعالج السبب الحقيقي مش العرض الظاهر.",
      icon: "fa-compass-drafting",
      href: "/services/consulting",
      image: "/images/hero/two-men-consultation.jpg",
    },
    {
      title: "بناء البراند والهوية البصرية",
      summary: "بنصنع هوية بتعبر عن حقيقتك وبتخدم مبيعاتك — ترجمة لمسار، مش ألوان ولوجو وبس.",
      icon: "fa-palette",
      href: "/services/branding",
      image: "/images/hero/custom-image.png",
    },
    {
      title: "التسويق الرقمي وإدارة الحملات",
      summary: "بننفذ على أساس هدف ومؤشرات، مش محتوى كتير من غير نتيجة. بنقيس العائد ونحسّن خطوة بخطوة.",
      icon: "fa-bullhorn",
      href: "/services/digital-marketing",
      image: "/images/hero/entrepreneur-laptop-office.jpg",
    },
    {
      title: "المواقع والأنظمة والحلول الرقمية",
      summary: "مواقع ومتاجر وأنظمة بتخدم التشغيل وبتزود الكفاءة، مرتبطة باحتياج حقيقي وتجربة مستخدم واضحة.",
      icon: "fa-code",
      href: "/services/software-development",
      image: "/images/hero/businessman-laptop-standing.jpg",
    },
    {
      title: "الدعاية والإعلان",
      summary: "حملات ومطبوعات ولافتات بهدف محدد ورسالة واضحة، عشان السوق يشوفك بالشكل اللي يليق بشغلك.",
      icon: "fa-rectangle-ad",
      href: "/services/advertising",
      image: "/images/hero/sweed-building.png",
    },
    {
      title: "إنتاج المحتوى والميديا",
      summary: "صور وفيديوهات ومحتوى بيحكي قصة براندك صح — إنتاج مدروس بيخدم الحملة، مش لقطات حلوة وخلاص.",
      icon: "fa-video",
      href: "/services/media",
      image: "/images/portfolio/blit-scroll-effect-demo-poster.png",
    },
  ] satisfies HomeCard[],
  process: [
    {
      title: "الاستماع والفهم",
      summary: "نسمع هدفك، نفهم وضعك الحالي، ونحدد أين المشكلة وأقرب فرصة للنمو.",
      icon: "fa-headset",
      duration: "1 - 2 يوم",
    },
    {
      title: "التحليل والتخطيط",
      summary: "نحلل السوق والمنافسين ثم نبني خطة عملية تناسب ميزانيتك ومرحلتك.",
      icon: "fa-chart-pie",
      duration: "3 - 5 أيام",
    },
    {
      title: "التصميم والإبداع",
      summary: "نجهز الهوية والمحتوى والتصميمات الأساسية بشكل مرتب يخدم الرسالة.",
      icon: "fa-pen-ruler",
      duration: "5 - 7 أيام",
    },
    {
      title: "الإنتاج والتطبيق",
      summary: "نطلق التنفيذ، نتابع النتائج، ونعدل بسرعة حتى يظل المشروع في الاتجاه الصح.",
      icon: "fa-rocket",
      duration: "حسب نطاق المشروع",
    },
  ] satisfies HomeProcessStep[],
  articles: [
    {
      title: "مشروعك مش محتاج مجهود أكتر... محتاج اتجاه أوضح",
      summary:
        "ليه شغل كتير بينتهي بنتيجة أقل من المتوقع؟ بنشرح إزاي تعرف إن مشكلتك في الاتجاه مش في المجهود — وتبدأ تصلحها منين.",
      icon: "fa-compass",
      href: "/articles/project-needs-direction",
      category: "الإدارة والنمو",
      meta: "6 دقائق",
      image: "/images/hero/two-men-consultation.jpg",
    },
    {
      title: "بتصرف على الإعلانات ومفيش عائد؟ دي أشهر 3 أسباب",
      summary:
        "قبل ما تزود الميزانية أو تغير الوكالة، اتأكد من الهدف والجمهور والقياس. بنفصصهم واحدة واحدة بأمثلة من السوق.",
      icon: "fa-chart-line",
      href: "/articles/ads-without-return",
      category: "التسويق الرقمي",
      meta: "5 دقائق",
      image: "/images/hero/entrepreneur-laptop-office.jpg",
    },
    {
      title: "قبل ما تطلق البراند: 5 قرارات لازم تثبتها الأول",
      summary:
        "اللوجو آخر خطوة مش أولها. دي القرارات اللي لو اتثبتت صح، كل اللي بعدها بيبقى أسهل وأرخص.",
      icon: "fa-palette",
      href: "/articles/five-brand-decisions",
      category: "الهوية البصرية",
      meta: "7 دقائق",
      image: "/images/hero/custom-image.png",
    },
  ] satisfies HomeCard[],
  faq: [
    {
      title: "نبدأ التعاون إزاي؟",
      summary:
        "بسيطة: استشارة مجانية نفهم فيها وضعك، وبعدها دراسة للمشروع، ثم عرض واضح بالنطاق والمدة والتكلفة، واتفاق مكتوب، ثم نبدأ التنفيذ. مفيش خطوة غامضة في النص.",
      icon: "fa-circle-question",
    },
    {
      title: "بتحددوا الأسعار على أساس إيه؟",
      summary:
        "على أساس نطاق الشغل الفعلي: حجم المشروع، الخدمات المطلوبة، والمدة. بنقدملك عرض مفصل تعرف منه كل جنيه رايح فين — شفافية كاملة من الأول.",
      icon: "fa-receipt",
    },
    {
      title: "المشروع بياخد وقت قد إيه؟",
      summary:
        "حسب نوعه: الشغل البسيط بيتراوح من 4 لـ 6 أسابيع، والأنظمة والمشاريع المتكاملة ممكن توصل لـ 12–24 أسبوع. بنتفق على جدول زمني مكتوب قبل ما نبدأ.",
      icon: "fa-clock",
    },
    {
      title: "هتابع الشغل معاكم إزاي؟",
      summary:
        "تقارير دورية، واجتماعات متابعة، ومؤشرات أداء متفق عليها من الأول. بنوريك الأرقام زي ما هي — اللي اتحسن واللي محتاج تعديل.",
      icon: "fa-chart-column",
    },
    {
      title: "ولو النتايج ماكانتش زي ما متوقعين؟",
      summary:
        "مبنختفيش ومبنجملش الأرقام. بنراجع المسار مع بعض، نحدد السبب، ونعدّل الخطة — التزامنا بالمنهج والمتابعة لحد ما النتيجة تتحسن.",
      icon: "fa-route",
    },
  ] satisfies HomeCard[],
  contact: {
    title: "جاهز تبدأ أول خطوة معانا؟",
    paragraphs: [
      "مش هنوعدك بطريق سهل... لكن بنوعدك إنك مش هتمشيه لوحدك.",
      "احجز استشارتك المجانية — هنسمعك الأول، نفهم وضعك، وبعدين ندرس مشروعك ونقولك رأينا بصراحة: تبدأ منين، وأول خطوة إيه.",
    ],
    successMessage:
      "وصلنا طلبك — هنتواصل معاك خلال يوم عمل. ولو الموضوع مستعجل، كلمنا واتساب مباشرة.",
    whatsappHref:
      "https://wa.me/201068274662?text=%D8%A3%D9%87%D9%84%D8%A7%20SWEED%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A",
    phone: "+20 106 827 4662",
    email: "info@sweed.com",
    location: "مدينة السادات، مصر",
  },
  footer: {
    description:
      "سويد للاستشارات الإدارية والتسويقية — بنحدد اتجاه مشروعك وبنمشي معاك لحد ما توصل. خبرة في السوق المصري والعربي من 2011.",
    rights: "© 2026 سويد للاستشارات الإدارية والتسويقية — كل الحقوق محفوظة.",
  },
  aiSupport: {
    greeting:
      "أهلًا بيك في سويد ✓ أنا مساعد سويد الذكي — اسألني عن خدماتنا أو باقاتنا، أو سيبلي رقمك وفريقنا يتواصل معاك.",
    prompts: [
      {
        question: "عايز أعرف أنسب باقة لمشروعي",
        answer:
          "تمام — جاوبني على سؤالين: مشروعك جديد ولا شغال من فترة؟ وأكبر تحدي عندك إيه دلوقتي؟ لو جديد فغالبًا «انطلاقة» أنسب بداية، لو شغال وعايز نتايج أحسن فـ«نمو»، ولو عايز تتوسع بنظام كامل فـ«تحول رقمي». وتقدر تحجز استشارة مجانية نحددها مع بعض بدقة.",
      },
      {
        question: "بتقدموا إيه بالظبط؟",
        answer:
          "6 خدمات متكاملة: الاستشارات الإدارية والتسويقية، بناء البراند والهوية البصرية، التسويق الرقمي وإدارة الحملات، المواقع والأنظمة والحلول الرقمية، الدعاية والإعلان، وإنتاج المحتوى والميديا — كلها بتشتغل في اتجاه واحد لصالح مشروعك. عايز تفاصيل خدمة معينة؟",
      },
      {
        question: "الأسعار بتبدأ من كام؟",
        answer:
          "التكلفة بتتحدد على أساس نطاق الشغل الفعلي — عشان كده مبنقولش رقم واحد للكل. ابعتلنا نبذة عن مشروعك واحتياجك، وهيوصلك عرض مفصل واضح فيه كل بند. أسهل خطوة: احجز الاستشارة المجانية.",
      },
      {
        question: "عايز أكلم حد من الفريق",
        answer:
          "من عينينا — سيبلي اسمك ورقم الواتساب وهنتواصل معاك خلال يوم عمل. أو اضغط زرار الواتساب وكلمنا مباشرة.",
      },
    ],
  },
} as const;
