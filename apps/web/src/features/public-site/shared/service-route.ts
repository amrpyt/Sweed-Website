export type ServiceRouteRecord = {
  id: string;
  canonicalSlug: string;
  legacySlugs: string[];
};

const serviceRoutes = [
  { id: "consulting", canonicalSlug: "consulting", legacySlugs: [] },
  { id: "branding", canonicalSlug: "branding", legacySlugs: [] },
  { id: "digital-marketing", canonicalSlug: "digital-marketing", legacySlugs: [] },
  { id: "development", canonicalSlug: "software-development", legacySlugs: ["development"] },
  { id: "advertising", canonicalSlug: "advertising", legacySlugs: [] },
  { id: "media", canonicalSlug: "media", legacySlugs: [] },
] satisfies ServiceRouteRecord[];

export function getCanonicalServiceSlug(slug: string): string | null {
  const route = serviceRoutes.find((item) => item.canonicalSlug === slug || item.legacySlugs.includes(slug));
  return route?.canonicalSlug ?? null;
}

export function getServiceDetailHref(serviceId: string): string {
  const route = serviceRoutes.find((item) => item.id === serviceId);
  return route ? `/services/${route.canonicalSlug}` : "/services";
}

export function getServiceRouteRecords(): readonly ServiceRouteRecord[] {
  return serviceRoutes;
}
