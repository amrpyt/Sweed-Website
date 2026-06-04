import { NextResponse } from "next/server";
import { advisorRequestSchema } from "@/features/ai-advisor/contracts";
import { askSweedAdvisor } from "@/features/ai-advisor/server/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = advisorRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid advisor request" }, { status: 400 });
  }

  const response = await askSweedAdvisor(parsed.data);
  return NextResponse.json(response);
}

