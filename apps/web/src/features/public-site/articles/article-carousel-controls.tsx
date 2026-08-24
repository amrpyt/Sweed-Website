"use client";

import styles from "./articles-executive-page.module.css";

type ArticleCarouselControlsProps = {
  itemCount: number;
  trackId: string;
};

export function ArticleCarouselControls({ itemCount, trackId }: ArticleCarouselControlsProps) {
  const move = (direction: -1 | 1) => {
    const track = document.getElementById(trackId);
    const animation = track?.getAnimations()[0];

    if (animation) {
      const timing = animation.effect?.getTiming();
      const duration = typeof timing?.duration === "number" ? timing.duration : 30000;
      const currentTime = typeof animation.currentTime === "number" ? animation.currentTime : 0;
      const step = duration / Math.max(itemCount, 1);

      animation.currentTime = (currentTime + direction * step + duration) % duration;
      return;
    }

    const viewport = track?.parentElement;

    if (!viewport) return;

    viewport.scrollBy({
      behavior: "smooth",
      left: direction * (viewport.clientWidth * 0.82),
    });
  };

  return (
    <div aria-label="التنقل بين المقالات" className={styles.carouselControls} role="group">
      <button
        aria-label="المقالات السابقة"
        className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
        onClick={() => move(-1)}
        type="button"
      >
        <span aria-hidden="true">→</span>
      </button>
      <button
        aria-label="المقالات التالية"
        className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
        onClick={() => move(1)}
        type="button"
      >
        <span aria-hidden="true">←</span>
      </button>
    </div>
  );
}
