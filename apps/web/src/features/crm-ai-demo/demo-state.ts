export type LeadSource = "instagram" | "facebook" | "tiktok" | "website" | "referral";

export type DemoStage = "message" | "reply" | "crm";

export type DemoScenario = {
  id: "instagram" | "facebook" | "tiktok";
  source: LeadSource;
  sourceLabel: string;
  sourceHandle: string;
  name: string;
  company: string;
  avatar: string;
  inboundMessage: string;
  aiReply: string;
  intent: string;
  score: number;
  value: number;
  service: string;
  nextAction: string;
};

export type DemoState = {
  activeScenarioId: DemoScenario["id"];
  stage: DemoStage;
  agentMode: "idle" | "thinking";
  scenarios: DemoScenario[];
};

export const demoScenarios: DemoScenario[] = [
  {
    id: "instagram",
    source: "instagram",
    sourceLabel: "Instagram",
    sourceHandle: "@grainhouse.eg",
    name: "سارة عادل",
    company: "Grain House",
    avatar: "س",
    inboundMessage: "مساء الخير، محتاجين حد يمسك إدارة السوشيال والمحتوى عندنا. ممكن أعرف النظام بيكون إزاي؟",
    aiReply: "أهلًا سارة، أكيد. إدارة السوشيال عندنا بتبدأ بفهم أهداف البراند والجمهور، وبعدها بنحدد المحتوى والخطة المناسبة. أقدر أسألك سؤالين سريعين وأرشح لك أنسب بداية؟",
    intent: "مهتم بالخدمة",
    score: 86,
    value: 52000,
    service: "إدارة السوشيال ميديا",
    nextAction: "مكالمة اكتشاف لمدة 15 دقيقة",
  },
  {
    id: "facebook",
    source: "facebook",
    sourceLabel: "Facebook",
    sourceHandle: "Lead Ad · NOVA Clinics",
    name: "عمر خالد",
    company: "NOVA Clinics",
    avatar: "ع",
    inboundMessage: "عندنا فرع جديد هيفتح قريب ومحتاجين حملة إطلاق كاملة. هل تقدروا تبدأوا خلال الشهر ده؟",
    aiReply: "أهلًا عمر، نقدر نرتب الإطلاق من التخطيط للحملة لحد التنفيذ. بما إن الافتتاح قريب، الأفضل نحدد الموعد والميزانية المستهدفة الأول عشان نثبت خطة واضحة من النهارده.",
    intent: "جاهز للشراء",
    score: 94,
    value: 84000,
    service: "حملة إطلاق متكاملة",
    nextAction: "تأكيد موعد الافتتاح والميزانية",
  },
  {
    id: "tiktok",
    source: "tiktok",
    sourceLabel: "TikTok",
    sourceHandle: "Lead Form · Volt Auto Care",
    name: "كريم فؤاد",
    company: "Volt Auto Care",
    avatar: "ك",
    inboundMessage: "شوفت فيديوهاتكم وعايز أعرف لو ينفع نعمل محتوى وفيديوهات للعروض بتاعت المركز عندنا.",
    aiReply: "أهلًا كريم، ينفع طبعًا. نقدر نبني فورمات فيديوهات مرتبطة بالعروض والخدمات وتخلي كل حملة قابلة للقياس. لو تبعت لي أكتر خدمتين عايز تدفعهم الشهر ده أجهز لك اتجاه مناسب.",
    intent: "استكشاف الخدمة",
    score: 72,
    value: 39000,
    service: "محتوى وفيديو قصير",
    nextAction: "تحديد الخدمات ذات الأولوية",
  },
];

export const initialDemoState: DemoState = {
  activeScenarioId: "instagram",
  stage: "message",
  agentMode: "idle",
  scenarios: demoScenarios,
};

export type DemoAction =
  | { type: "select-scenario"; scenarioId: DemoScenario["id"] }
  | { type: "thinking" }
  | { type: "advance" }
  | { type: "reset" };

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  if (action.type === "select-scenario") {
    if (!state.scenarios.some((scenario) => scenario.id === action.scenarioId)) return state;
    return {
      ...state,
      activeScenarioId: action.scenarioId,
      stage: "message",
      agentMode: "idle",
    };
  }

  if (action.type === "thinking") {
    return { ...state, agentMode: "thinking" };
  }

  if (action.type === "advance") {
    return {
      ...state,
      stage: state.stage === "message" ? "reply" : state.stage === "reply" ? "crm" : "crm",
      agentMode: "idle",
    };
  }

  if (action.type === "reset") {
    return {
      ...initialDemoState,
      activeScenarioId: state.activeScenarioId,
    };
  }

  return state;
}
