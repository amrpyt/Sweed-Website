"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./lazy-image.module.css";

type LazyImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
};

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  aspectRatio = "16/9",
  objectFit = "cover",
  placeholder,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const responsiveSizes = width ? `${width}px` : "(max-width: 768px) 100vw, 50vw";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      ref={imgRef}
      className={`${styles.imageWrapper} ${className}`}
      style={{
        aspectRatio,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      {!isLoaded && !hasError && (
        <div className={styles.placeholder}>
          {placeholder ? (
            <Image
              fill
              src={placeholder}
              alt=""
              aria-hidden="true"
              className={styles.placeholderImage}
              sizes={responsiveSizes}
              unoptimized={/^https?:\/\//.test(placeholder)}
            />
          ) : (
            <div className={styles.skeleton} />
          )}
        </div>
      )}

      {hasError && (
        <div className={styles.error}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span>فشل تحميل الصورة</span>
        </div>
      )}

      {isInView && !hasError && (
        <Image
          fill
          src={src}
          alt={alt}
          className={`${styles.image} ${isLoaded ? styles.imageLoaded : ""}`}
          style={{ objectFit }}
          sizes={responsiveSizes}
          onLoad={handleLoad}
          onError={handleError}
          unoptimized={/^https?:\/\//.test(src)}
        />
      )}
    </div>
  );
}
