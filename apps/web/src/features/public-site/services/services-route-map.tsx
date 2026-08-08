"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExecutiveServiceSource } from "@/content/public-site/services-page";
import { StickyChipStrip } from "@/features/public-site/shared/sticky-chip-strip";

export function ServicesRouteMap({ services }: { services: readonly ExecutiveServiceSource[] }) {
  const [activeId, setActiveId] = useState<string>(services[0]?.id ?? "");
  const items = useMemo(
    () => services.map((service) => ({ id: service.id, label: service.label, href: `#${service.id}` })),
    [services],
  );

  useEffect(() => {
    const sections = services
      .map((service) => document.getElementById(service.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [services]);

  return <StickyChipStrip ariaLabel="خريطة خدمات SWEED" items={items} activeId={activeId} />;
}
