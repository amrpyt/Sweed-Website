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
    </>
  );
}
