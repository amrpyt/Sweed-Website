import type { Metadata } from "next";
import { HomeV2Page } from "@/features/homepage-v2";

export const metadata: Metadata = {
  title: "SWEED Homepage V2 | Preview",
  description: "A second SWEED homepage concept for design review.",
  robots: {
    index: false,
    follow: false,
  },
};

export default HomeV2Page;
