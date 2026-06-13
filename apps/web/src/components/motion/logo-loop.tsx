"use client";

import type { CSSProperties, ReactNode } from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./logo-loop.module.css";

type LogoItem = {
  ariaLabel?: string;
  href?: string;
  node: ReactNode;
  title: string;
};

type LogoLoopProps = {
  ariaLabel?: string;
  className?: string;
  direction?: "left" | "right";
  fadeOut?: boolean;
  fadeOutColor?: string;
  gap?: number;
  hoverSpeed?: number;
  logoHeight?: number;
  logos: LogoItem[];
  scaleOnHover?: boolean;
  speed?: number;
  style?: CSSProperties;
  width?: number | string;
};

const animationConfig = { copyHeadroom: 2, minCopies: 2, smoothTau: 0.25 };

function toCssLength(value: number | string | undefined) {
  return typeof value === "number" ? `${value}px` : value;
}

function LogoLoopComponent({
  ariaLabel = "Partner logos",
  className,
  direction = "left",
  fadeOut = false,
  fadeOutColor,
  gap = 32,
  hoverSpeed = 0,
  logoHeight = 28,
  logos,
  scaleOnHover = false,
  speed = 120,
  style,
  width = "100%",
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLUListElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const [copyCount, setCopyCount] = useState(animationConfig.minCopies);
  const [isHovered, setIsHovered] = useState(false);
  const [seqWidth, setSeqWidth] = useState(0);

  const targetVelocity = useMemo(() => {
    const directionMultiplier = direction === "left" ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return Math.abs(speed) * directionMultiplier * speedMultiplier;
  }, [direction, speed]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect().width ?? 0;

    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      setCopyCount(Math.max(animationConfig.minCopies, Math.ceil(containerWidth / sequenceWidth) + animationConfig.copyHeadroom));
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }

    const observers = [containerRef, seqRef].map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(updateDimensions);
      observer.observe(ref.current);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [logos, gap, logoHeight, updateDimensions]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const target = isHovered ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / animationConfig.smoothTau);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        const nextOffset = ((offsetRef.current + velocityRef.current * deltaTime) % seqWidth + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;
        track.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [hoverSpeed, isHovered, seqWidth, targetVelocity]);

  const cssVariables = {
    "--logoloop-fade-color": fadeOutColor,
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logo-height": `${logoHeight}px`,
  } as CSSProperties;

  const rootClassName = [styles.logoLoop, fadeOut ? styles.fade : "", scaleOnHover ? styles.scaleHover : "", className ?? ""].filter(Boolean).join(" ");

  const renderLogoItem = useCallback((item: LogoItem, key: string) => {
    const content = <span className={styles.node}>{item.node}</span>;

    return (
      <li className={styles.item} key={key} role="listitem">
        {item.href ? (
          <a aria-label={item.ariaLabel ?? item.title} href={item.href} rel="noreferrer noopener" target="_blank">
            {content}
          </a>
        ) : (
          content
        )}
      </li>
    );
  }, []);

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul aria-hidden={copyIndex > 0} className={styles.list} key={`copy-${copyIndex}`} ref={copyIndex === 0 ? seqRef : undefined} role="list">
          {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem],
  );

  return (
    <div
      aria-label={ariaLabel}
      className={rootClassName}
      ref={containerRef}
      role="region"
      style={{ width: toCssLength(width) ?? "100%", ...cssVariables, ...style }}
    >
      <div className={styles.track} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} ref={trackRef}>
        {logoLists}
      </div>
    </div>
  );
}

export const LogoLoop = memo(LogoLoopComponent);
