import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { createAdvisorLanguageModel, sweedAdvisorInstructions } from "@/features/ai-advisor/server/agent";

export function createSweedStudioAdvisorAgent() {
  return new Agent({
    id: "sweed-advisor",
    name: "SWEED Advisor",
    description: "Visitor-facing Arabic advisor for SWEED services, offers, and AI automation demos.",
    model: createAdvisorLanguageModel(),
    memory: new Memory({
      options: {
        lastMessages: 5,
        generateTitle: true,
      },
    }),
    instructions: sweedAdvisorInstructions,
  });
}

export const sweedStudioAdvisorAgent = createSweedStudioAdvisorAgent();
