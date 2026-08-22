import type { Metadata } from "next";
import { CrmAiDemoPage } from "@/features/crm-ai-demo";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";

export const metadata: Metadata = {
  title: "SWEED CRM + AI Agent | Interactive Demo",
  description: "ديمو تفاعلي لواجهة SWEED CRM مع AI Agent لإدارة العملاء والمتابعة والمبيعات.",
  robots: { index: false, follow: false },
};

export default function CrmAiDemoRoute() {
  return (
    <>
      <LegacyHeader page="home" />
      <CrmAiDemoPage />
      <LegacyFooter />
    </>
  );
}

