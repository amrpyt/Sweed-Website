"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type HomeConversionSelection = {
  problem?: string;
  service?: string;
  offer?: string;
  source?: string;
};

type HomeConversionContextValue = {
  selection: HomeConversionSelection;
  updateSelection: (selection: HomeConversionSelection) => void;
  selectAndFocusContact: (selection: HomeConversionSelection) => void;
};

const HomeConversionContext = createContext<HomeConversionContextValue | null>(null);

export function HomeConversionProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<HomeConversionSelection>({});

  const updateSelection = useCallback((nextSelection: HomeConversionSelection) => {
    setSelection((currentSelection) => ({ ...currentSelection, ...nextSelection }));
  }, []);

  const selectAndFocusContact = useCallback((nextSelection: HomeConversionSelection) => {
    setSelection((currentSelection) => ({ ...currentSelection, ...nextSelection }));

    const contactSection = document.getElementById("contact");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    contactSection?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    const nextUrl = new URL(window.location.href);
    nextUrl.hash = "contact";
    window.history.pushState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  }, []);

  const value = useMemo(
    () => ({ selection, updateSelection, selectAndFocusContact }),
    [selection, selectAndFocusContact, updateSelection],
  );

  return <HomeConversionContext.Provider value={value}>{children}</HomeConversionContext.Provider>;
}

export function useHomeConversion() {
  const context = useContext(HomeConversionContext);
  if (!context) {
    throw new Error("useHomeConversion must be used inside HomeConversionProvider");
  }
  return context;
}

export function HomeConversionStateMarker() {
  const { selection } = useHomeConversion();

  return (
    <span
      data-testid="home-conversion-state"
      data-selected-problem={selection.problem ?? ""}
      data-selected-service={selection.service ?? ""}
      data-selected-offer={selection.offer ?? ""}
      data-cta-source={selection.source ?? ""}
      hidden
    />
  );
}
