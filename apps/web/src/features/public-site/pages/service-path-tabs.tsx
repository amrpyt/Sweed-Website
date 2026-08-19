"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import type { ServiceTrack } from "@/content/public-site/service-detail-pages";
import styles from "./content-detail-public-page.module.css";

export function ServicePathTabs({ tracks }: { tracks: readonly ServiceTrack[] }) {
  const [activeId, setActiveId] = useState(tracks[0]?.id ?? "");
  const activeTrack = tracks.find((track) => track.id === activeId) ?? tracks[0];

  useEffect(() => {
    const syncFromHash = () => {
      const hashTrack = window.location.hash.replace(/^#track-/, "");
      if (tracks.some((track) => track.id === hashTrack)) setActiveId(hashTrack);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [tracks]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? 1 : -1;
    const nextIndex = (index + direction + tracks.length) % tracks.length;
    const nextTrack = tracks[nextIndex];
    if (!nextTrack) return;
    setActiveId(nextTrack.id);
    document.getElementById(`track-tab-${nextTrack.id}`)?.focus();
  }

  if (!activeTrack) return null;

  return (
    <div className={styles.pathTabs}>
      <div className={styles.tabList} role="tablist" aria-label="مسارات الخدمة">
        {tracks.map((track, index) => (
          <button
            aria-controls={`track-panel-${track.id}`}
            aria-selected={track.id === activeTrack.id}
            className={track.id === activeTrack.id ? styles.activeTab : undefined}
            id={`track-tab-${track.id}`}
            key={track.id}
            onClick={() => setActiveId(track.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="tab"
            tabIndex={track.id === activeTrack.id ? 0 : -1}
            type="button"
          >
            {track.title}
          </button>
        ))}
      </div>

      <article
        aria-labelledby={`track-tab-${activeTrack.id}`}
        className={styles.tabPanel}
        id={`track-panel-${activeTrack.id}`}
        role="tabpanel"
      >
        <div>
          <span>مناسب لمين</span>
          <p>{activeTrack.fit}</p>
        </div>
        <div>
          <span>هتستلم إيه</span>
          <ul>
            {activeTrack.deliverables.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </article>
    </div>
  );
}
