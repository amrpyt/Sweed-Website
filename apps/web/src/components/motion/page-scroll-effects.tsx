"use client";

import { GradualBlur } from "./gradual-blur";
import { GsapProvider } from "./gsap-provider";
import { SmoothScroll } from "./smooth-scroll";

export function PageScrollEffects() {
  return (
    <>
      <SmoothScroll />
      <GsapProvider />
      <GradualBlur animated preset="page-header" height="5.5rem" opacity={0.55} strength={1.4} zIndex={80} />
      <GradualBlur animated preset="page-footer" height="7rem" opacity={0.72} strength={2.1} zIndex={80} />
    </>
  );
}
