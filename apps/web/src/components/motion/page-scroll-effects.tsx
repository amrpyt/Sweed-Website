"use client";

import { GradualBlur } from "./gradual-blur";
import { SmoothScroll } from "./smooth-scroll";

export function PageScrollEffects() {
  return (
    <>
      <SmoothScroll />
      <GradualBlur animated preset="page-header" height="5.5rem" opacity={0.55} strength={1.4} zIndex={80} />
    </>
  );
}
