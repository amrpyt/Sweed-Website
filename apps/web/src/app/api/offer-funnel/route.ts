import { NextResponse } from "next/server";
import { getOfferFunnelSettings } from "@/features/offer-funnel/server/settings-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getOfferFunnelSettings();
  return NextResponse.json({ settings });
}
