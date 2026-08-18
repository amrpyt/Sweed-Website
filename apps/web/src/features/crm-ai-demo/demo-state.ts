export type LeadStage = "new" | "qualified" | "proposal" | "won";
export type LeadSource = "instagram" | "facebook" | "tiktok" | "website" | "referral";

export type DemoLead = {
  id: string;
  name: string;
  company: string;
  source: LeadSource;
  sourceLabel: string;
  sourceHandle: string;
  stage: LeadStage;
  score: number;
  value: number;
  phone: string;
  owner: string;
  lastTouch: string;
  nextAction: string;
  insight: string;
};

export type DemoConversationMessage = {
  id: string;
  direction: "inbound" | "outbound";
  sender: "lead" | "agent";
  source: LeadSource;
  text: string;
  time: string;
};

export type DemoActivity = {
  id: string;
  kind: "message" | "call" | "agent" | "stage";
  title: string;
  detail: string;
  time: string;
};

export type DemoState = {
  selectedLeadId: string;
  leads: DemoLead[];
  conversations: Record<string, DemoConversationMessage[]>;
  activities: DemoActivity[];
  agentMode: "idle" | "thinking" | "ready";
  agentMessage: string;
  completedActions: string[];
};

export const initialDemoState: DemoState = {
  selectedLeadId: "lead-1",
  agentMode: "idle",
  agentMessage: "أنا جاهز. اختار عميل أو شغّل تحليل ذكي للحالة الحالية.",
  completedActions: [],
  leads: [
    {
      id: "lead-1",
      name: "عمر خالد",
      company: "NOVA Clinics",
      source: "facebook",
      sourceLabel: "Facebook",
      sourceHandle: "Lead Ad · NOVA Clinics",
      stage: "qualified",
      score: 91,
      value: 84000,
      phone: "+20 10 2456 8821",
      owner: "مريم",
      lastTouch: "من 18 دقيقة",
      nextAction: "إرسال عرض مخصص اليوم",
      insight: "سأل مرتين عن مدة التنفيذ وذكر افتتاح فرع جديد خلال 6 أسابيع.",
    },
    {
      id: "lead-2",
      name: "سارة عادل",
      company: "Grain House",
      source: "instagram",
      sourceLabel: "Instagram",
      sourceHandle: "@grainhouse.eg",
      stage: "new",
      score: 76,
      value: 52000,
      phone: "+20 11 3304 9920",
      owner: "أحمد",
      lastTouch: "من 34 دقيقة",
      nextAction: "تأكيد الاحتياج والميزانية",
      insight: "مهتمة بإدارة السوشيال وإنتاج المحتوى، لكن نطاق العمل لم يُحسم بعد.",
    },
    {
      id: "lead-3",
      name: "يوسف سامح",
      company: "Kite Logistics",
      source: "referral",
      sourceLabel: "إحالة",
      sourceHandle: "عميل حالي",
      stage: "proposal",
      score: 88,
      value: 126000,
      phone: "+20 12 9200 1148",
      owner: "مريم",
      lastTouch: "أمس، 7:40م",
      nextAction: "متابعة العرض قبل 4م",
      insight: "العرض مناسب فنيًا. الاعتراض الوحيد المسجل هو تقسيم الدفعات.",
    },
    {
      id: "lead-4",
      name: "دينا وائل",
      company: "Forma Home",
      source: "website",
      sourceLabel: "Website",
      sourceHandle: "sweed.com/contact",
      stage: "won",
      score: 96,
      value: 68000,
      phone: "+20 10 7780 6421",
      owner: "أحمد",
      lastTouch: "اليوم، 11:10ص",
      nextAction: "تسليم العميل لفريق التنفيذ",
      insight: "تم تأكيد الباقة. مطلوب بدء onboarding وإرسال قائمة المتطلبات.",
    },
    {
      id: "lead-5",
      name: "كريم فؤاد",
      company: "Volt Auto Care",
      source: "tiktok",
      sourceLabel: "TikTok",
      sourceHandle: "Lead Form · Auto Care",
      stage: "new",
      score: 63,
      value: 39000,
      phone: "+20 15 5018 2307",
      owner: "مريم",
      lastTouch: "من ساعتين",
      nextAction: "إعادة محاولة الاتصال",
      insight: "ملأ النموذج ولم يرد على أول اتصال. مصدر الحملة عالي النية الشرائية.",
    },
  ],
  conversations: {
    "lead-1": [
      {
        id: "message-lead-1-1",
        direction: "inbound",
        sender: "lead",
        source: "facebook",
        text: "شوفت الإعلان. محتاجين نجهز إطلاق الفرع الجديد قبل أول الشهر، نقدر نبدأ إمتى؟",
        time: "12:42",
      },
    ],
    "lead-2": [
      {
        id: "message-lead-2-1",
        direction: "inbound",
        sender: "lead",
        source: "instagram",
        text: "محتاجين حد يمسك إدارة السوشيال وإنتاج المحتوى. الباقات عندكم بتبدأ من إيه؟",
        time: "12:31",
      },
    ],
    "lead-3": [
      {
        id: "message-lead-3-1",
        direction: "inbound",
        sender: "lead",
        source: "referral",
        text: "العرض مناسب، بس محتاجين نرتب تقسيم الدفعات قبل الاعتماد.",
        time: "أمس",
      },
    ],
    "lead-4": [
      {
        id: "message-lead-4-1",
        direction: "inbound",
        sender: "lead",
        source: "website",
        text: "تم اعتماد الباقة. ابعتولي خطوات البداية والمطلوب من الفريق عندنا.",
        time: "11:10",
      },
    ],
    "lead-5": [
      {
        id: "message-lead-5-1",
        direction: "inbound",
        sender: "lead",
        source: "tiktok",
        text: "شفت الفيديو وعايز أعرف لو تقدروا تزودوا الحجوزات للفرع عندنا.",
        time: "10:18",
      },
    ],
  },
  activities: [
    {
      id: "activity-1",
      kind: "message",
      title: "رسالة واتساب واردة",
      detail: "هل نقدر نبدأ قبل أول الشهر؟",
      time: "12:42",
    },
    {
      id: "activity-2",
      kind: "call",
      title: "مكالمة مبيعات",
      detail: "8 دقائق · تم تأكيد نطاق المشروع",
      time: "12:18",
    },
    {
      id: "activity-3",
      kind: "agent",
      title: "AI Agent حدّث درجة العميل",
      detail: "ارتفعت الأولوية من 82 إلى 91",
      time: "12:05",
    },
  ],
};

export type DemoAction =
  | { type: "select"; leadId: string }
  | { type: "thinking" }
  | { type: "analyze" }
  | { type: "draft" }
  | { type: "reply" }
  | { type: "advance" }
  | { type: "reset" };

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  if (action.type === "reset") return structuredClone(initialDemoState);
  if (action.type === "select") {
    const lead = state.leads.find((item) => item.id === action.leadId);
    if (!lead) return state;
    return {
      ...state,
      selectedLeadId: lead.id,
      agentMode: "idle",
      agentMessage: `فتحت ملف ${lead.name}. أقدر ألخص الحالة أو أجهز الخطوة الجاية.`,
    };
  }
  if (action.type === "thinking") return { ...state, agentMode: "thinking" };

  const lead = state.leads.find((item) => item.id === state.selectedLeadId);
  if (!lead) return state;

  if (action.type === "analyze") {
    return {
      ...state,
      agentMode: "ready",
      agentMessage: `أولوية عالية (${lead.score}/100). ${lead.insight} أنسب خطوة: ${lead.nextAction}.`,
      completedActions: [...new Set([...state.completedActions, "analyze"])],
      activities: [
        {
          id: `agent-analysis-${lead.id}`,
          kind: "agent",
          title: "AI Agent حلّل فرصة البيع",
          detail: `أوصى بـ: ${lead.nextAction}`,
          time: "الآن",
        },
        ...state.activities.filter((item) => item.id !== `agent-analysis-${lead.id}`),
      ],
    };
  }

  if (action.type === "draft") {
    return {
      ...state,
      agentMode: "ready",
      agentMessage: `مسودة جاهزة: «أهلًا ${lead.name}، بناءً على كلامنا جهزنا لك الخطوة الأنسب لـ ${lead.company}. أبعتهالك دلوقتي ونراجع أي نقطة سوا؟»`,
      completedActions: [...new Set([...state.completedActions, "draft"])],
    };
  }

  if (action.type === "reply") {
    const replyText = socialReplyFor(lead);
    const replyId = `reply-${lead.id}`;
    const currentThread = state.conversations[lead.id] ?? [];
    return {
      ...state,
      agentMode: "ready",
      agentMessage: `تم الرد على ${lead.name} عبر ${lead.sourceLabel}. الرسالة اتضافت للمحادثة وسجل النشاط.`,
      completedActions: [...new Set([...state.completedActions, "reply"])],
      conversations: {
        ...state.conversations,
        [lead.id]: [
          ...currentThread.filter((message) => message.id !== replyId),
          {
            id: replyId,
            direction: "outbound",
            sender: "agent",
            source: lead.source,
            text: replyText,
            time: "الآن",
          },
        ],
      },
      activities: [
        {
          id: `social-reply-${lead.id}`,
          kind: "agent",
          title: `AI Agent رد على ${lead.sourceLabel}`,
          detail: replyText,
          time: "الآن",
        },
        ...state.activities.filter((item) => item.id !== `social-reply-${lead.id}`),
      ],
    };
  }

  if (action.type === "advance") {
    const nextStage: Record<LeadStage, LeadStage> = {
      new: "qualified",
      qualified: "proposal",
      proposal: "won",
      won: "won",
    };
    const movedTo = nextStage[lead.stage];
    return {
      ...state,
      agentMode: "ready",
      agentMessage:
        lead.stage === "won"
          ? "العميل بالفعل في مرحلة تم التعاقد. الأفضل الآن تشغيل onboarding."
          : "تم تحديث المرحلة في الديمو وإضافة الحركة إلى السجل.",
      completedActions: [...new Set([...state.completedActions, "advance"])],
      leads: state.leads.map((item) =>
        item.id === lead.id ? { ...item, stage: movedTo } : item,
      ),
      activities: [
        {
          id: `stage-${lead.id}-${movedTo}`,
          kind: "stage",
          title: "تم تحديث مرحلة العميل",
          detail: `${stageLabel(lead.stage)} ← ${stageLabel(movedTo)}`,
          time: "الآن",
        },
        ...state.activities,
      ],
    };
  }

  return state;
}

export function stageLabel(stage: LeadStage) {
  return {
    new: "جديد",
    qualified: "مؤهل",
    proposal: "عرض سعر",
    won: "تم التعاقد",
  }[stage];
}

function socialReplyFor(lead: DemoLead) {
  const replies: Record<LeadSource, string> = {
    instagram: `أهلًا ${lead.name} 👋 طبعًا. إدارة السوشيال وإنتاج المحتوى بيتحددوا حسب حجم النشر والتصوير المطلوب. أقدر أسألك سؤالين سريعين وأرشح لك أنسب نطاق؟`,
    facebook: `أهلًا ${lead.name}. نقدر نرتب الخطة على موعد افتتاح الفرع ونحدد أولويات الإطلاق من دلوقتي. أبعت لك تصور البداية والخطوات المطلوبة؟`,
    tiktok: `أهلًا ${lead.name} 👋 نقدر نربط المحتوى والحملات بهدف الحجوزات بدل المشاهدات فقط. ابعت لي موقع الفرع والخدمة الأعلى أولوية ونبني عليها التصور.`,
    website: `أهلًا ${lead.name}. تم تسجيل طلبك، والخطوة الجاية تجهيز onboarding والمتطلبات عشان نبدأ بدون تعطيل. هبعت لك القائمة مرتبة الآن.`,
    referral: `أهلًا ${lead.name}. تمام، نقدر نراجع تقسيم الدفعات ونثبت الجدول قبل اعتماد العرض. هجهز لك الاختيارات بشكل واضح ونراجعها سوا.`,
  };
  return replies[lead.source];
}

