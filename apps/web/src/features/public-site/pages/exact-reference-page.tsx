"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function ExactReferencePage({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(960);

  const resizeFrame = useCallback(() => {
    const documentRef = frameRef.current?.contentDocument;
    if (!documentRef) return;
    setHeight(Math.max(documentRef.body.scrollHeight, documentRef.documentElement.scrollHeight, 960));
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(resizeFrame);
    const connect = () => {
      const documentRef = frame.contentDocument;
      if (documentRef?.body) observer.observe(documentRef.body);
      resizeFrame();
    };

    frame.addEventListener("load", connect);
    window.addEventListener("resize", resizeFrame);
    return () => {
      frame.removeEventListener("load", connect);
      window.removeEventListener("resize", resizeFrame);
      observer.disconnect();
    };
  }, [resizeFrame]);

  return <iframe ref={frameRef} title={title} src={src} onLoad={resizeFrame} style={{ display: "block", width: "100%", height, border: 0, background: "#FAF9FC" }} />;
}
