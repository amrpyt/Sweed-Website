import type { Metadata } from "next";
import { HomePublicPage } from "@/features/homepage";

export const metadata: Metadata = {
  title: "سويد | استشارات إدارية وتسويقية وتنفيذ متكامل",
  description:
    "نفهم وضع مشروعك، نحدد الأولويات بالبيانات، وننفذ معاك بخطة ومؤشرات واضحة.",
  alternates: {
    canonical: "https://sweed.com/",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://sweed.com/",
    siteName: "SWEED",
    title: "سويد | استشارات إدارية وتسويقية وتنفيذ متكامل",
    description:
      "نفهم وضع مشروعك، نحدد الأولويات بالبيانات، وننفذ معاك بخطة ومؤشرات واضحة.",
    images: [
      {
        url: "https://sweed.com/images/hero/custom-image.png",
        width: 1200,
        height: 675,
        alt: "SWEED للاستشارات الإدارية والتسويقية والتنفيذ المتكامل",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سويد | استشارات إدارية وتسويقية وتنفيذ متكامل",
    description: "نفهم وضع مشروعك، نحدد الأولويات بالبيانات، وننفذ معاك بخطة ومؤشرات واضحة.",
    images: ["https://sweed.com/images/hero/custom-image.png"],
  },
};

export default HomePublicPage;
