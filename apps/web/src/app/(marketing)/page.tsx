import type { Metadata } from "next";
import { HomePublicPage } from "@/features/homepage";

export const metadata: Metadata = {
  title: "سويد | وكالة تسويق وإعلان تبني علامات تقود المستقبل",
  description:
    "سويد للاستشارات الإدارية والتسويقية: بنحدد اتجاه مشروعك بالتحليل والأرقام، ونمشي معاك في التنفيذ لحد ما النتايج تتحسن وتبقى قابلة للقياس.",
  alternates: {
    canonical: "https://sweed.com/",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://sweed.com/",
    siteName: "SWEED",
    title: "سويد | وكالة تسويق وإعلان تبني علامات تقود المستقبل",
    description:
      "استشارات وهوية وتسويق وتطوير وإنتاج في اتجاه واحد واضح يساعد مشروعك يتحرك وينمو بنتائج قابلة للقياس.",
    images: [
      {
        url: "https://sweed.com/images/hero/custom-image.png",
        width: 1200,
        height: 675,
        alt: "SWEED للتسويق والإعلان والتجارب الرقمية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سويد | وكالة تسويق وإعلان تبني علامات تقود المستقبل",
    description: "بنحدد الاتجاه، نبني الخطة، ونمشي معاك في التنفيذ والقياس خطوة بخطوة.",
    images: ["https://sweed.com/images/hero/custom-image.png"],
  },
};

export default HomePublicPage;
