import type { Metadata } from "next";
import { PageScrollEffects } from "@/components/motion/page-scroll-effects";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sweed.com"),
  icons: {
    icon: [
      {
        url: "/sweed-logo-official.svg",
        type: "image/svg+xml",
      },
      {
        url: "/sweed-logo.png",
        type: "image/png",
      },
    ],
    shortcut: "/sweed-logo-official.svg",
    apple: "/sweed-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="ar" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <PageScrollEffects />
      </body>
    </html>
  );
}
