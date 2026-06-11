import { sweedBrand } from "@sweed/brand";

export const siteConfig = {
  name: sweedBrand.name,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweed.com",
  description:
    "SWEED builds digital systems, marketing websites, and AI-ready automation demos for growing businesses.",
  locale: sweedBrand.locale,
};
