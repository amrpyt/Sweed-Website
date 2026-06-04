import { NextResponse } from "next/server";
import { getAdvisorRuntimeStatus, sweedAdvisorInstructions } from "@/features/ai-advisor/server/agent";
import { listAdvisorDebugEvents, getAdvisorDebugSummary } from "@/features/ai-advisor/server/debug-store";
import { buildSweedKnowledge } from "@/features/ai-advisor/server/knowledge";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    runtime: getAdvisorRuntimeStatus(),
    summary: getAdvisorDebugSummary(),
    instructions: sweedAdvisorInstructions.trim(),
    knowledge: buildSweedKnowledge(),
    events: listAdvisorDebugEvents(),
    note: "Local debug data is stored in server memory and resets when the server restarts.",
  });
}

