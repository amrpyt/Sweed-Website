import Script from "next/script";
import { AiAdvisorWidget, AutomationDemo } from "@/features/ai-advisor";
import { LegacyBreadcrumb } from "./legacy-breadcrumb";
import { LegacyFooter } from "./legacy-footer";
import { getLegacyPage } from "./legacy-html";
import { LegacyHeader } from "./legacy-header";
import type { LegacyPageKey } from "./legacy-routes";

export function LegacyPage({ page }: { page: LegacyPageKey }) {
  const document = getLegacyPage(page);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: document.headHtml }} />
      <LegacyHeader page={page} />
      <LegacyBreadcrumb page={page} />
      <div dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
      {page === "services" ? <AutomationDemo /> : null}
      <LegacyFooter />
      <AiAdvisorWidget />
      {document.scripts.map((script) =>
        script.src ? (
          <Script id={script.id} key={script.id} src={script.src} strategy="afterInteractive" type={script.type} />
        ) : (
          <Script id={script.id} key={script.id} strategy="afterInteractive" type={script.type}>
            {script.content}
          </Script>
        ),
      )}
    </>
  );
}
