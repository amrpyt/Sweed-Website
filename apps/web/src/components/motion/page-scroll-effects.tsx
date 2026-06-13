"use client";

import { GradualBlur } from "./gradual-blur";

export function PageScrollEffects() {
  return (
    <>
      <GradualBlur animated preset="page-header" height="5.5rem" opacity={0.55} strength={1.4} zIndex={80} />
      <GradualBlur animated preset="page-footer" height="7rem" opacity={0.72} strength={2.1} zIndex={80} />
    </>
  );
}
