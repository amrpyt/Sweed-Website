import "server-only";

import type { AdvisorRequest, AdvisorResponse } from "../contracts";
import { createSweedAdvisorAgent, hasAdvisorModelConfig } from "./agent";
import { recordAdvisorDebugEvent } from "./debug-store";

const FALLBACK_MESSAGE =
  "المساعد غير متاح الآن، تواصل معنا وسنرشح لك الباقة المناسبة حسب هدفك.";

const FALLBACK_RESPONSE: AdvisorResponse = {
  message: FALLBACK_MESSAGE,
  recommendation: "تواصل مع فريق SWEED",
  cta: {
    label: "افتح صفحة التواصل",
    href: "/contact#contact-form",
  },
  references: ["/contact#contact-form"],
  fallback: true,
};

const SENSITIVE_DATA_PATTERN = /(?:كلمة\s*السر|باسورد|password|passcode|رقم\s*قومي|بطاقة\s*ائتمان|credit\s*card|cvv)/i;

const SENSITIVE_DATA_RESPONSE: AdvisorResponse = {
  message:
    "من الأفضل ما تبعتش بيانات حساسة هنا. قل لي هدف مشروعك أو نوع الخدمة المطلوبة فقط، وفريق SWEED يساعدك بأمان.",
  recommendation: "تواصل آمن مع فريق SWEED",
  cta: {
    label: "افتح صفحة التواصل",
    href: "/contact#contact-form",
  },
  references: ["/contact#contact-form"],
  fallback: false,
};

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Advisor request timed out")), timeoutMs);
    promise.then(
      (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timeout);
        reject(error);
      },
    );
  });
}

export function buildAdvisorPrompt(request: AdvisorRequest): string {
  const modeInstruction =
    request.mode === "automation-demo"
      ? "The visitor is trying an AI automation demo. Explain what the automation would do, the likely business value, and the next step."
      : "The visitor needs help choosing a service or package.";
  const recentConversation = request.history
    .slice(-5)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  return `
MODE:
${modeInstruction}

RECENT CONVERSATION:
${recentConversation || "No previous messages in this browser conversation."}

VISITOR MESSAGE:
${request.message}

Return a short Arabic answer with:
1. direct helpful reply
2. one recommended service/package
3. one clear CTA link from the knowledge context
`;
}

function getRuntimeAdvisorAgent() {
  return createSweedAdvisorAgent();
}

export function buildAdvisorGenerateOptions(request: AdvisorRequest) {
  return {
    memory: {
      resource: request.resourceId,
      thread: request.threadId,
      options: {
        lastMessages: 5,
      },
    },
  };
}

export function sanitizeAdvisorText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(https?:\/\/(?:www\.)?sweed(?:[a-z0-9-]+)?\.[a-z]{2,}[^)]+\)/gi, "$1")
    .replace(/(?<!@)\bhttps?:\/\/(?:www\.)?sweed(?:[a-z0-9-]+)?\.[a-z]{2,}(?=\/)/gi, "")
    .replace(/(?<!@)\b(?:www\.)?sweed(?:[a-z0-9-]+)?\.[a-z]{2,}(?=\/)/gi, "")
    .replace(/(?<!@)\bhttps?:\/\/(?:www\.)?sweed(?:[a-z0-9-]+)?\.[a-z]{2,}\b/gi, "")
    .replace(/(?<!@)\b(?:www\.)?sweed(?:[a-z0-9-]+)?\.[a-z]{2,}\b/gi, "")
    .replace(/\/(?:scale|starter|growth|packages|package|business-starter|small-business)(?=[\s).,!?]|$)/gi, "/offers#offers")
    .replace(/\/(?:social-media|digital-marketing|marketing|branding|brand|website|websites|[a-z0-9-]*website[a-z0-9-]*)(?=[\s).,!?]|$)/gi, "/services#services")
    .replace(/\/(?:automation|ai-automation|demo|[a-z0-9-]*ai[a-z0-9-]*|[a-z0-9-]*automation[a-z0-9-]*)(?=[\s).,!?]|$)/gi, "/services#ai-automation-demo")
    .replace(/<\/((?:[a-z0-9-]+\/)?[a-z0-9-]+#[a-z0-9-]+)>/gi, "/$1")
    .replace(/<((?:\/|#)[^>\s]+)>/g, "$1")
    .replace(/\]\((\/[^)\s]+)\)/g, "]($1)");
}

function asksAboutPricing(message: string) {
  return /(?:price|pricing|cost|budget|سعر|أسعار|اسعار|تكلفة|تكلفه|بكام|فلوس|ثابت)/i.test(message);
}

function includesPricingConfirmation(text: string) {
  return /(?:SWEED team must confirm|team must confirm|تأكيد من فريق SWEED|فريق SWEED.*(?:يأكد|يؤكد)|السعر.*(?:يتأكد|يتحدد))/i.test(text);
}

export function enforceAdvisorAnswerPolicy(text: string, visitorMessage: string) {
  const sanitized = sanitizeAdvisorText(text).trim();

  if (asksAboutPricing(visitorMessage) && !includesPricingConfirmation(sanitized)) {
    return `${sanitized}\n\nأي سعر نهائي يحتاج تأكيد من فريق SWEED حسب نطاق العمل.`;
  }

  return sanitized;
}

function responseFromText(text: string, fallback: boolean): AdvisorResponse {
  return {
    message: sanitizeAdvisorText(text).trim() || FALLBACK_MESSAGE,
    recommendation: fallback ? "تواصل مع فريق SWEED" : "باقة SWEED المناسبة",
    cta: {
      label: "تواصل مع SWEED",
      href: "/contact#contact-form",
    },
    references: ["/services#services", "/offers#offers", "/contact#contact-form"],
    fallback,
  };
}

export async function askSweedAdvisor(request: AdvisorRequest): Promise<AdvisorResponse> {
  const startedAt = performance.now();

  if (SENSITIVE_DATA_PATTERN.test(request.message) || request.history.some((message) => SENSITIVE_DATA_PATTERN.test(message.content))) {
    recordAdvisorDebugEvent({
      request,
      response: SENSITIVE_DATA_RESPONSE,
      durationMs: Math.round(performance.now() - startedAt),
      status: "blocked",
    });
    return SENSITIVE_DATA_RESPONSE;
  }

  if (!hasAdvisorModelConfig()) {
    recordAdvisorDebugEvent({
      request,
      response: FALLBACK_RESPONSE,
      durationMs: Math.round(performance.now() - startedAt),
      status: "fallback",
    });
    return FALLBACK_RESPONSE;
  }

  try {
    const agent = getRuntimeAdvisorAgent();
    const result = await withTimeout(agent.generate(buildAdvisorPrompt(request), buildAdvisorGenerateOptions(request)), 15_000);
    const response = responseFromText(enforceAdvisorAnswerPolicy(result.text, request.message), false);
    recordAdvisorDebugEvent({
      request,
      response,
      durationMs: Math.round(performance.now() - startedAt),
      status: "ok",
    });
    return response;
  } catch {
    recordAdvisorDebugEvent({
      request,
      response: FALLBACK_RESPONSE,
      durationMs: Math.round(performance.now() - startedAt),
      status: "error",
    });
    return FALLBACK_RESPONSE;
  }
}
