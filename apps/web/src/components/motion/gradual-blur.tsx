"use client";

import type { CSSProperties } from "react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./gradual-blur.module.css";

type GradualBlurPosition = "top" | "bottom" | "left" | "right";
type GradualBlurCurve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
type GradualBlurTarget = "parent" | "page";
type GradualBlurAnimated = boolean | "scroll";
type GradualBlurPreset = "top" | "bottom" | "left" | "right" | "subtle" | "intense" | "smooth" | "sharp" | "header" | "footer" | "page-header" | "page-footer";

type GradualBlurProps = {
  animated?: GradualBlurAnimated;
  className?: string;
  curve?: GradualBlurCurve;
  divCount?: number;
  duration?: string;
  easing?: string;
  exponential?: boolean;
  height?: string;
  hoverIntensity?: number;
  mobileHeight?: string;
  onAnimationComplete?: () => void;
  opacity?: number;
  position?: GradualBlurPosition;
  preset?: GradualBlurPreset;
  responsive?: boolean;
  strength?: number;
  style?: CSSProperties;
  tabletHeight?: string;
  target?: GradualBlurTarget;
  width?: string;
  zIndex?: number;
};

type GradualBlurConfig = Required<
  Pick<
    GradualBlurProps,
    "animated" | "className" | "curve" | "divCount" | "duration" | "easing" | "exponential" | "height" | "opacity" | "position" | "responsive" | "strength" | "target" | "zIndex"
  >
> &
  Omit<GradualBlurProps, "animated" | "className" | "curve" | "divCount" | "duration" | "easing" | "exponential" | "height" | "opacity" | "position" | "responsive" | "strength" | "target" | "zIndex">;

const defaultConfig: GradualBlurConfig = {
  animated: false,
  className: "",
  curve: "linear",
  divCount: 5,
  duration: "0.3s",
  easing: "ease-out",
  exponential: false,
  height: "6rem",
  opacity: 1,
  position: "bottom",
  responsive: false,
  strength: 2,
  style: {},
  target: "parent",
  zIndex: 1000,
};

const presets: Record<GradualBlurPreset, Partial<GradualBlurConfig>> = {
  bottom: { height: "6rem", position: "bottom" },
  footer: { curve: "ease-out", height: "8rem", position: "bottom" },
  header: { curve: "ease-out", height: "8rem", position: "top" },
  intense: { divCount: 8, exponential: true, height: "10rem", strength: 4 },
  left: { height: "6rem", position: "left" },
  "page-footer": { height: "10rem", position: "bottom", strength: 3, target: "page" },
  "page-header": { height: "10rem", position: "top", strength: 3, target: "page" },
  right: { height: "6rem", position: "right" },
  sharp: { curve: "linear", divCount: 4, height: "5rem" },
  smooth: { curve: "bezier", divCount: 10, height: "8rem" },
  subtle: { divCount: 3, height: "4rem", opacity: 0.8, strength: 1 },
  top: { height: "6rem", position: "top" },
};

const curveFunctions: Record<GradualBlurCurve, (progress: number) => number> = {
  bezier: (progress) => progress * progress * (3 - 2 * progress),
  "ease-in": (progress) => progress * progress,
  "ease-in-out": (progress) => (progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2),
  "ease-out": (progress) => 1 - Math.pow(1 - progress, 2),
  linear: (progress) => progress,
};

function getGradientDirection(position: GradualBlurPosition) {
  return {
    bottom: "to bottom",
    left: "to left",
    right: "to right",
    top: "to top",
  }[position];
}

function useResponsiveDimension(config: GradualBlurConfig, key: "height" | "width") {
  const [value, setValue] = useState(config[key]);

  useEffect(() => {
    if (!config.responsive) return;

    const calculate = () => {
      const width = window.innerWidth;
      const overrideKey = width <= 480 ? `mobile${key[0].toUpperCase()}${key.slice(1)}` : width <= 768 ? `tablet${key[0].toUpperCase()}${key.slice(1)}` : undefined;
      const nextValue = overrideKey ? config[overrideKey as keyof GradualBlurConfig] : config[key];
      setValue(typeof nextValue === "string" ? nextValue : config[key]);
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [config, key]);

  return config.responsive ? value : config[key];
}

function useScrollVisibility(ref: React.RefObject<HTMLElement | null>, shouldObserve: boolean) {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
}

function GradualBlurComponent(props: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo<GradualBlurConfig>(() => {
    const presetConfig = props.preset ? presets[props.preset] : {};
    return { ...defaultConfig, ...presetConfig, ...props };
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config, "height");
  const responsiveWidth = useResponsiveDimension(config, "width");
  const isVisible = useScrollVisibility(containerRef, config.animated === "scroll");

  const blurDivs = useMemo(() => {
    const increment = 100 / config.divCount;
    const currentStrength = isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;
    const curveFunction = curveFunctions[config.curve] ?? curveFunctions.linear;
    const direction = getGradientDirection(config.position);

    return Array.from({ length: config.divCount }, (_, index) => {
      const step = index + 1;
      const progress = curveFunction(step / config.divCount);
      const blurValue = config.exponential ? Math.pow(2, progress * 4) * 0.0625 * currentStrength : 0.0625 * (progress * config.divCount + 1) * currentStrength;
      const p1 = Math.round((increment * step - increment) * 10) / 10;
      const p2 = Math.round(increment * step * 10) / 10;
      const p3 = Math.round((increment * step + increment) * 10) / 10;
      const p4 = Math.round((increment * step + increment * 2) * 10) / 10;
      let gradient = `transparent ${p1}%, black ${p2}%`;

      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      return (
        <div
          key={step}
          style={{
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            opacity: config.opacity,
          }}
        />
      );
    });
  }, [config, isHovered]);

  const containerStyle = useMemo<CSSProperties>(() => {
    const isVertical = config.position === "top" || config.position === "bottom";
    const isPageTarget = config.target === "page";
    const baseStyle: CSSProperties = {
      opacity: isVisible ? 1 : 0,
      pointerEvents: config.hoverIntensity ? "auto" : "none",
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style,
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || "100%";
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = "100%";
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, isVisible, responsiveHeight, responsiveWidth]);

  useEffect(() => {
    if (isVisible && config.animated === "scroll" && config.onAnimationComplete) {
      const timeout = window.setTimeout(config.onAnimationComplete, Number.parseFloat(config.duration) * 1000);
      return () => window.clearTimeout(timeout);
    }
  }, [config, isVisible]);

  return (
    <div
      aria-hidden="true"
      className={[styles.gradualBlur, config.target === "page" ? styles.page : styles.parent, config.className].filter(Boolean).join(" ")}
      onMouseEnter={config.hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={config.hoverIntensity ? () => setIsHovered(false) : undefined}
      ref={containerRef}
      style={containerStyle}
    >
      <div className={styles.inner}>{blurDivs}</div>
    </div>
  );
}

export const GradualBlur = memo(GradualBlurComponent);
