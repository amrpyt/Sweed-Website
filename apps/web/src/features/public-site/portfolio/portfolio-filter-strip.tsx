import type { PortfolioGroupSource } from "@/content/public-site/portfolio-page";
import { StickyChipStrip } from "@/features/public-site/shared/sticky-chip-strip";

export function PortfolioFilterStrip({ groups }: { groups: readonly PortfolioGroupSource[] }) {
  return (
    <StickyChipStrip
      ariaLabel="فلترة الأعمال حسب الخدمة"
      items={groups.map((group) => ({ id: group.id, label: group.label, href: `#${group.id}` }))}
    />
  );
}
