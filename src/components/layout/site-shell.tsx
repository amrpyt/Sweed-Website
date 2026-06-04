import type { ReactNode } from "react";
import { AiAdvisorWidget } from "@/features/ai-advisor";
import { Footer } from "./footer";
import { Header } from "./header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <AiAdvisorWidget />
    </>
  );
}
