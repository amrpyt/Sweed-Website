import { z } from "zod";

export const advisorModeSchema = z.enum(["advisor", "automation-demo"]);

export const advisorMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(1_500),
});

export const advisorRequestSchema = z.object({
  mode: advisorModeSchema.default("advisor"),
  message: z.string().trim().min(1).max(1_500),
  resourceId: z.string().trim().min(1).max(120),
  threadId: z.string().trim().min(1).max(120),
  history: z.array(advisorMessageSchema).max(5).default([]),
});

export type AdvisorMode = z.infer<typeof advisorModeSchema>;
export type AdvisorMessage = z.infer<typeof advisorMessageSchema>;
export type AdvisorRequest = z.infer<typeof advisorRequestSchema>;

export type AdvisorResponse = {
  message: string;
  recommendation: string;
  cta: {
    label: string;
    href: string;
  };
  references: string[];
  fallback: boolean;
};
