import type { Metadata } from "next";
import { HomePublicPage } from "@/features/homepage";

export const metadata: Metadata = {
  title: "سويد | وكالة تسويق وإعلان تبني علامات تقود المستقبل",
  description:
    "سويد شريكك في الاستراتيجية، الهوية البصرية، التسويق الرقمي، الإعلانات، المحتوى، وتطوير التجارب الرقمية التي تحول الانتباه إلى نمو قابل للقياس.",
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
      "استراتيجية وهوية وتسويق وإعلان وتطوير رقمي في مسار واحد واضح يساعد علامتك تنمو.",
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
    description: "نخطط ونبني وننفذ تجارب تسويقية ورقمية تدفع علامتك للنمو.",
    images: ["https://sweed.com/images/hero/custom-image.png"],
  },
};

export default HomePublicPage;
