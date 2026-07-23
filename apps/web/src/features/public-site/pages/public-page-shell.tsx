import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyBreadcrumb } from "@/features/legacy-site/legacy-breadcrumb";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import type { LegacyPageKey } from "@/features/legacy-site/legacy-routes";
import { SectionHashSync } from "../client/section-hash-sync";

export function PublicPageShell({
  page,
  sectionIds,
  showBreadcrumb = true,
  children,
}: {
  page: LegacyPageKey;
  sectionIds?: string[];
  showBreadcrumb?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <LegacyHeader page={page} />
      {showBreadcrumb ? <LegacyBreadcrumb page={page} /> : null}
      {sectionIds?.length ? <SectionHashSync sectionIds={sectionIds} /> : null}
      {children}
      <LegacyFooter />
      <AiAdvisorWidget />
    </>
  );
}
