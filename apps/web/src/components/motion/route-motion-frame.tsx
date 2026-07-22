"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./route-motion-frame.module.css";

const disabledPathPrefixes = ["/admin", "/api"];

export function RouteMotionFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const isDisabled = disabledPathPrefixes.some((prefix) => pathname.startsWith(prefix));

  return (
    <div
      className={isDisabled ? styles.staticFrame : styles.frame}
      data-route-motion={isDisabled ? "disabled" : "controlled-cinematic"}
    >
      {children}
    </div>
  );
}
