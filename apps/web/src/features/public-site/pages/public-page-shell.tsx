import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyBreadcrumb } from "@/features/legacy-site/legacy-breadcrumb";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import type { LegacyPageKey } from "@/features/legacy-site/legacy-routes";
import { SectionHashSync } from "../client/section-hash-sync";

export function PublicPageShell({
  page,
  sectionIds,
  children,
}: {
  page: LegacyPageKey;
  sectionIds?: string[];
  children: React.ReactNode;
}) {
  return (
    <>
      <LegacyHeader page={page} />
      <LegacyBreadcrumb page={page} />
      {sectionIds?.length ? <SectionHashSync sectionIds={sectionIds} /> : null}
      {children}
      <LegacyFooter />
      <AiAdvisorWidget />
    </>
  );
}
