import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import styles from "./border-beam.module.css";

type BorderBeamSize = "sm" | "md" | "line" | "pulse-inner" | "pulse-outside";
type BorderBeamColorVariant = "colorful" | "mono" | "ocean" | "sunset";
type BorderBeamTheme = "dark" | "light" | "auto";

type BorderBeamProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: BorderBeamSize;
  colorVariant?: BorderBeamColorVariant;
  theme?: BorderBeamTheme;
  strength?: number;
  duration?: number;
  active?: boolean;
  borderRadius?: number;
  brightness?: number;
  saturation?: number;
  hueRange?: number;
  staticColors?: boolean;
};

function clampStrength(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function BorderBeam({
  children,
  className = "",
  size = "md",
  colorVariant = "colorful",
  theme = "dark",
  strength = 1,
  duration,
  active = true,
  borderRadius,
  brightness,
  saturation,
  hueRange,
  staticColors = false,
  style,
  ...props
}: BorderBeamProps) {
  const inlineStyle = {
    ...style,
    "--beam-strength": clampStrength(strength).toString(),
    "--beam-duration": `${duration ?? (size === "pulse-outside" || size === "pulse-inner" ? 2.3 : 1.96)}s`,
    ...(borderRadius !== undefined ? { "--beam-radius": `${borderRadius}px` } : null),
    ...(brightness !== undefined ? { "--beam-brightness": brightness.toString() } : null),
    ...(saturation !== undefined ? { "--beam-saturation": saturation.toString() } : null),
    ...(hueRange !== undefined ? { "--beam-hue-range": `${hueRange}deg` } : null),
  } as CSSProperties;

  return (
    <div
      className={`${styles.borderBeam} ${styles[size]} ${styles[colorVariant]} ${styles[theme]} ${
        active ? styles.active : styles.inactive
      } ${staticColors ? styles.staticColors : ""} ${className}`}
      style={inlineStyle}
      {...props}
    >
      <div className={styles.beamBloom} aria-hidden="true" />
      {children}
    </div>
  );
}
