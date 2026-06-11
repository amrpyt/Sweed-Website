import { NextResponse } from "next/server";
import { getOfferFunnelSettings, saveOfferFunnelSettings } from "@/features/offer-funnel/server/settings-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getOfferFunnelSettings();
  return NextResponse.json({ settings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const settings = await saveOfferFunnelSettings(body);
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "تعذر حفظ الإعدادات" },
      { status: 400 },
    );
  }
}
