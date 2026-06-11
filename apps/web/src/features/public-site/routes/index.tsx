import "server-only";

import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getLegacyMetadata, LegacyPage, type LegacyPageKey } from "@/features/legacy-site";

type PublicLegacyRouteConfig = {
  routePath: string;
  page: LegacyPageKey;
};

type PublicLegacyRoute = PublicLegacyRouteConfig & {
  metadata: Metadata;
  Page: () => ReactElement;
};

function definePublicLegacyRoute(config: PublicLegacyRouteConfig): PublicLegacyRoute {
  return {
    ...config,
    metadata: getLegacyMetadata(config.page),
    Page() {
      return <LegacyPage page={config.page} />;
    },
  };
}

export const publicLegacyRoutes = {
  about: definePublicLegacyRoute({ routePath: "/about", page: "about" }),
  services: definePublicLegacyRoute({ routePath: "/services", page: "services" }),
  serviceDetail: definePublicLegacyRoute({ routePath: "/services/legacy", page: "service-detail" }),
  offers: definePublicLegacyRoute({ routePath: "/offers", page: "offers" }),
  products: definePublicLegacyRoute({ routePath: "/products", page: "products" }),
  portfolio: definePublicLegacyRoute({ routePath: "/portfolio", page: "portfolio" }),
  articles: definePublicLegacyRoute({ routePath: "/articles", page: "articles" }),
  articleDetail: definePublicLegacyRoute({ routePath: "/articles/legacy", page: "article-detail" }),
  faq: definePublicLegacyRoute({ routePath: "/faq", page: "faq" }),
  contact: definePublicLegacyRoute({ routePath: "/contact", page: "contact" }),
} as const;

export type PublicLegacyRouteKey = keyof typeof publicLegacyRoutes;
