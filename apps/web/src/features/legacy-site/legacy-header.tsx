import { publicSiteShellSettings } from "@sweed/content/public-shell";
import { StaggeredMenu } from "@/components/layout/staggered-menu";
import type { LegacyPageKey } from "./legacy-routes";
import { defaultNavItems, homeNavItems } from "./legacy-header.config";

export function LegacyHeader({ page }: { page: LegacyPageKey }) {
  const navItems = page === "home" ? homeNavItems : defaultNavItems;

  return (
    <StaggeredMenu
      position="right"
      items={navItems}
      socialItems={[
        {
          label: "واتساب",
          href: publicSiteShellSettings.whatsappUrl,
          external: true,
        },
      ]}
      displaySocials
      displayItemNumbering
      colors={["#ed2062", "#261b3e"]}
      logoUrl="/sweed-logo.png"
      accentColor="#ed2062"
    />
  );
}
