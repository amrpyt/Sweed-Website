import "server-only";

import { Agent } from "@mastra/core/agent";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

function cleanEnvValue(value: string | undefined) {
  const cleaned = value?.replace(/^\uFEFF/, "").trim();
  return cleaned || undefined;
}

export function getAdvisorModelConfig() {
  return {
    baseUrl: cleanEnvValue(process.env.OPENAI_BASE_URL),
    apiKey: cleanEnvValue(process.env.OPENAI_API_KEY),
    modelId: cleanEnvValue(process.env.AI_MODEL) ?? "gpt-4o-mini",
  };
}

export const sweedAdvisorInstructions = `
You are SWEED's website advisor.

Rules:
- Speak Arabic by default.
- Answer only about SWEED services, packages, website pages, AI automation demos, and contact paths.
- Use only the provided SWEED knowledge context.
- Recommend one clear next step.
- If pricing is missing, say the SWEED team must confirm it.
- Do not claim that a booking, message, payment, or external action was completed.
- Do not ask for passwords, payment data, national IDs, medical data, or legal secrets.
- If the user asks unrelated questions, redirect politely to SWEED services.
- Keep answers short, useful, and sales-friendly.
`;

export function getAdvisorRuntimeStatus() {
  const { baseUrl, apiKey, modelId } = getAdvisorModelConfig();

  return {
    baseUrl: baseUrl ? new URL(baseUrl).origin : null,
    hasApiKey: Boolean(apiKey),
    modelId,
  };
}

export function hasAdvisorModelConfig() {
  const { baseUrl, apiKey, modelId } = getAdvisorModelConfig();
  return Boolean(baseUrl && apiKey && modelId);
}

export function createAdvisorLanguageModel() {
  const { baseUrl, apiKey, modelId } = getAdvisorModelConfig();

  if (!baseUrl || !apiKey) {
    throw new Error("AI advisor model configuration is missing.");
  }

  const rork = createOpenAICompatible({
    name: "rork",
    baseURL: baseUrl,
    apiKey,
  });

  return rork.chatModel(modelId);
}

export function createSweedAdvisorAgent() {
  return new Agent({
    id: "sweed-advisor",
    name: "SWEED Advisor",
    description: "Arabic website advisor for SWEED services, packages, and AI automation demos.",
    model: createAdvisorLanguageModel(),
    instructions: sweedAdvisorInstructions,
  });
}
