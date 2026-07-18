"use client";

import type { ReactNode } from "react";
import { useId, useRef } from "react";
import styles from "./home-video-dialog.module.css";

type HomeVideoDialogProps = {
  title: string;
  videoSrc: string;
  poster?: string;
  triggerClassName?: string;
  triggerTestId?: string;
  children: ReactNode;
};

export function HomeVideoDialog({
  title,
  videoSrc,
  poster,
  triggerClassName,
  triggerTestId,
  children,
}: HomeVideoDialogProps) {
  const dialogId = useId();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    videoRef.current?.pause();
    dialogRef.current?.close();
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        className={`${styles.trigger} ${triggerClassName ?? ""}`}
        data-testid={triggerTestId}
        type="button"
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={openDialog}
      >
        {children}
        <span className={styles.playBadge} aria-hidden="true">
          <i className="fas fa-play" />
        </span>
        <span className={styles.playLabel}>شاهد الفيديو التعريفي</span>
      </button>

      <dialog
        id={dialogId}
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className={styles.dialogPanel}>
          <div className={styles.dialogHeader}>
            <h2 id={titleId}>{title}</h2>
            <button className={styles.closeButton} type="button" onClick={closeDialog} aria-label="إغلاق الفيديو">
              <i className="fas fa-xmark" aria-hidden="true" />
            </button>
          </div>
          <div className={styles.videoFrame}>
            <video ref={videoRef} src={videoSrc} poster={poster} controls playsInline preload="metadata" />
          </div>
        </div>
      </dialog>
    </>
  );
}
