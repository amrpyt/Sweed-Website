export type LeadStage = "new" | "qualified" | "proposal" | "won";

export type DemoLead = {
  id: string;
  name: string;
  company: string;
  channel: string;
  stage: LeadStage;
  score: number;
  value: number;
  phone: string;
  owner: string;
  lastTouch: string;
  nextAction: string;
  insight: string;
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
      channel: "حملة Meta",
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
      channel: "Instagram DM",
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
      channel: "إحالة",
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
      channel: "الموقع",
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
      channel: "Google Ads",
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

