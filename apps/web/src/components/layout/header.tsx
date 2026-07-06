import { publicSiteShellSettings } from "@sweed/content/public-shell";
import { primaryNavigation } from "@/content/navigation";
import { StaggeredMenu } from "./staggered-menu";

export function Header() {
  return (
    <StaggeredMenu
      position="right"
      items={primaryNavigation}
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
