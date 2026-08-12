import type { Metadata } from "next";
import { AdminOfferFunnelSettingsForm } from "@/features/offer-funnel";
import { getOfferFunnelSettings } from "@/features/offer-funnel/server/settings-store";

export const metadata: Metadata = {
  title: "SWEED Offer Funnel Control",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function OfferFunnelAdminPage() {
  const settings = await getOfferFunnelSettings();
  return <AdminOfferFunnelSettingsForm initialSettings={settings} />;
}
