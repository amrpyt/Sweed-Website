"use client";

import { GradualBlur } from "./gradual-blur";

export function PageScrollEffects() {
  return (
    <>
      <GradualBlur animated preset="page-header" height="5.5rem" opacity={0.55} strength={1.4} zIndex={80} />
    </>
  );
}
