import type { ReactNode } from "react";
import { RouteMotionFrame } from "@/components/motion/route-motion-frame";

export default function Template({ children }: { children: ReactNode }) {
  return <RouteMotionFrame>{children}</RouteMotionFrame>;
}
