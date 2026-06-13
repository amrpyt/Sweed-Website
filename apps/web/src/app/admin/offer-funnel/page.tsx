import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { AdminOfferFunnelSettingsForm } from "@/features/offer-funnel";
import { getOfferFunnelSettings } from "@/features/offer-funnel/server/settings-store";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
});

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
  return (
    <div className={cairo.className}>
      <AdminOfferFunnelSettingsForm initialSettings={settings} />
    </div>
  );
}
