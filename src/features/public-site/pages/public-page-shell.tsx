import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyBreadcrumb, LegacyFooter, LegacyHeader, type LegacyPageKey } from "@/features/legacy-site";
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
