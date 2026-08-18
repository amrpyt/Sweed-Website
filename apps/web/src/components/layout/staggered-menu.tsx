"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { NavigationItem } from "@/content/navigation";
import styles from "./staggered-menu.module.css";
import polishStyles from "./staggered-menu-polish.module.css";

type MenuPosition = "left" | "right";

type StaggeredMenuSocialItem = {
  label: string;
  href: string;
  external?: boolean;
};

type StaggeredMenuProps = {
  position?: MenuPosition;
  colors?: string[];
  items?: NavigationItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  logoUrl?: string;
  accentColor?: string;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

const menuLabel = "القائمة";
const closeLabel = "إغلاق";
const topRevealThreshold = 24;
const hideStartThreshold = 96;
const hideDistanceThreshold = 18;
const showDistanceThreshold = 10;
const scrollThrottleMs = 40;

function formatArabicIndex(index: number) {
  return new Intl.NumberFormat("ar-EG", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(index);
}

export function StaggeredMenu({
  position = "right",
  colors = ["#ed2062", "#261b3e"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  logoUrl = "/sweed-logo-official.svg",
  accentColor = "#ed2062",
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const pathname = usePathname();
  const panelId = `staggered-menu-${useId().replaceAll(":", "")}`;
  const [open, setOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [pageScrolled, setPageScrolled] = useState(false);
  const openRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const accumulatedScrollRef = useRef(0);
  const scrollDirectionRef = useRef<-1 | 0 | 1>(0);
  const scrollTimerRef = useRef<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLDivElement[]>([]);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const getOffscreenPosition = useCallback(
    () => (position === "left" ? -105 : 105),
    [position],
  );

  const killActiveTimeline = useCallback(() => {
    activeTimelineRef.current?.kill();
    activeTimelineRef.current = null;
  }, []);

  useLayoutEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      const textInner = textInnerRef.current;
      const icon = iconRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;

      if (!panel || !backdrop || !textInner || !icon || !plusH || !plusV) {
        return;
      }

      const layers = preLayersRef.current
        ? Array.from(
            preLayersRef.current.querySelectorAll<HTMLDivElement>(
              `.${styles.preLayer}`,
            ),
          )
        : [];
      preLayerElsRef.current = layers;

      gsap.set([panel, ...layers], {
        xPercent: getOffscreenPosition(),
        opacity: 1,
      });
      panel.dataset.motionState = "closed";
      gsap.set(panel, { visibility: "hidden", pointerEvents: "none" });
      gsap.set(backdrop, {
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      });
      gsap.set(textInner, { yPercent: 0 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(plusH, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(plusV, { rotate: 90, transformOrigin: "50% 50%" });
    }, rootRef);

    return () => {
      killActiveTimeline();
      context.revert();
    };
  }, [getOffscreenPosition, killActiveTimeline]);

  const resetPanelEntrance = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const itemLabels = Array.from(
      panel.querySelectorAll<HTMLElement>(`.${styles.itemLabel}`),
    );
    const itemNumbers = Array.from(
      panel.querySelectorAll<HTMLElement>(`.${styles.itemNumber}`),
    );
    const socialTitle = panel.querySelector<HTMLElement>(
      `.${styles.socialTitle}`,
    );
    const socialLinks = Array.from(
      panel.querySelectorAll<HTMLElement>(`.${styles.socialLink}`),
    );

    gsap.set(itemLabels, { yPercent: 135, rotate: 7 });
    gsap.set(itemNumbers, { opacity: 0, y: 12 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0, y: 10 });
    gsap.set(socialLinks, { opacity: 0, y: 18 });
  }, []);

  const playOpen = useCallback(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const layers = preLayerElsRef.current;
    if (!panel || !backdrop) return;

    killActiveTimeline();
    resetPanelEntrance();

    const reducedMotion = reducedMotionRef.current;
    const panelDuration = reducedMotion ? 0.01 : 0.62;
    const layerDuration = reducedMotion ? 0.01 : 0.48;
    const staggerDelay = reducedMotion ? 0 : 0.07;
    const offscreen = getOffscreenPosition();

    panel.dataset.motionState = "opening";
    gsap.set(panel, { visibility: "visible", pointerEvents: "auto" });
    gsap.set(backdrop, {
      visibility: "visible",
      pointerEvents: closeOnClickAway ? "auto" : "none",
    });

    const itemLabels = Array.from(
      panel.querySelectorAll<HTMLElement>(`.${styles.itemLabel}`),
    );
    const itemNumbers = Array.from(
      panel.querySelectorAll<HTMLElement>(`.${styles.itemNumber}`),
    );
    const socialTitle = panel.querySelector<HTMLElement>(
      `.${styles.socialTitle}`,
    );
    const socialLinks = Array.from(
      panel.querySelectorAll<HTMLElement>(`.${styles.socialLink}`),
    );

    const timeline = gsap.timeline();
    timeline.to(
      backdrop,
      {
        opacity: 1,
        duration: reducedMotion ? 0.01 : 0.24,
        ease: "power2.out",
      },
      0,
    );

    layers.forEach((layer, index) => {
      timeline.fromTo(
        layer,
        { xPercent: offscreen },
        { xPercent: 0, duration: layerDuration, ease: "power4.out" },
        index * staggerDelay,
      );
    });

    const panelStart = layers.length
      ? (layers.length - 1) * staggerDelay + (reducedMotion ? 0 : 0.08)
      : 0;

    timeline.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelStart,
    );

    const itemsStart = panelStart + panelDuration * 0.18;
    timeline.to(
      itemLabels,
      {
        yPercent: 0,
        rotate: 0,
        duration: reducedMotion ? 0.01 : 0.82,
        ease: "power4.out",
        stagger: reducedMotion ? 0 : 0.075,
      },
      itemsStart,
    );
    timeline.to(
      itemNumbers,
      {
        opacity: 1,
        y: 0,
        duration: reducedMotion ? 0.01 : 0.44,
        ease: "power2.out",
        stagger: reducedMotion ? 0 : 0.055,
      },
      itemsStart + (reducedMotion ? 0 : 0.08),
    );

    const socialsStart = panelStart + panelDuration * 0.54;
    if (socialTitle) {
      timeline.to(
        socialTitle,
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0.01 : 0.4,
          ease: "power2.out",
        },
        socialsStart,
      );
    }
    timeline.to(
      socialLinks,
      {
        opacity: 1,
        y: 0,
        duration: reducedMotion ? 0.01 : 0.46,
        ease: "power3.out",
        stagger: reducedMotion ? 0 : 0.07,
      },
      socialsStart,
    );

    timeline.eventCallback("onComplete", () => {
      panel.dataset.motionState = "open";
    });
    activeTimelineRef.current = timeline;
  }, [closeOnClickAway, getOffscreenPosition, killActiveTimeline, resetPanelEntrance]);

  const playClose = useCallback(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const layers = preLayerElsRef.current;
    if (!panel || !backdrop) return;

    killActiveTimeline();

    panel.dataset.motionState = "closing";
    const reducedMotion = reducedMotionRef.current;
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(panel, { visibility: "hidden", pointerEvents: "none" });
        gsap.set(backdrop, {
          visibility: "hidden",
          pointerEvents: "none",
        });
        resetPanelEntrance();
        panel.dataset.motionState = "closed";
      },
    });

    timeline.to(
      [panel, ...layers],
      {
        xPercent: getOffscreenPosition(),
        duration: reducedMotion ? 0.01 : 0.34,
        ease: "power3.in",
        overwrite: "auto",
      },
      0,
    );
    timeline.to(
      backdrop,
      {
        opacity: 0,
        duration: reducedMotion ? 0.01 : 0.24,
        ease: "power2.in",
      },
      0,
    );

    activeTimelineRef.current = timeline;
  }, [getOffscreenPosition, killActiveTimeline, resetPanelEntrance]);

  const animateToggle = useCallback((opening: boolean) => {
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const textInner = textInnerRef.current;
    if (!plusH || !plusV || !textInner) return;

    const duration = reducedMotionRef.current ? 0.01 : 0.42;
    gsap.to(plusH, {
      rotate: opening ? 45 : 0,
      duration,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(plusV, {
      rotate: opening ? -45 : 90,
      duration,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(textInner, {
      yPercent: opening ? -50 : 0,
      duration,
      ease: "power4.out",
      overwrite: "auto",
    });
  }, []);

  const setMenuState = useCallback(
    (nextOpen: boolean, restoreFocus = false) => {
      if (openRef.current === nextOpen) return;

      openRef.current = nextOpen;
      setOpen(nextOpen);
      animateToggle(nextOpen);

      if (nextOpen) {
        setHeaderHidden(false);
        playOpen();
        onMenuOpen?.();
      } else {
        playClose();
        onMenuClose?.();
        if (restoreFocus) {
          window.requestAnimationFrame(() => toggleBtnRef.current?.focus());
        }
      }
    },
    [animateToggle, onMenuClose, onMenuOpen, playClose, playOpen],
  );

  const toggleMenu = useCallback(() => {
    setMenuState(!openRef.current);
  }, [setMenuState]);

  const closeMenu = useCallback(
    (restoreFocus = false) => {
      setMenuState(false, restoreFocus);
    },
    [setMenuState],
  );

  useEffect(() => {
    const initialScrollY = Math.max(window.scrollY, 0);
    lastScrollYRef.current = initialScrollY;
    accumulatedScrollRef.current = 0;
    scrollDirectionRef.current = 0;
    const initializationTimer = window.setTimeout(() => {
      setPageScrolled(initialScrollY > topRevealThreshold);
    }, 0);

    const applyScrollState = () => {
      scrollTimerRef.current = null;

      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollYRef.current;
      setPageScrolled(currentScrollY > topRevealThreshold);

      if (openRef.current || currentScrollY <= topRevealThreshold) {
        setHeaderHidden(false);
        accumulatedScrollRef.current = 0;
        scrollDirectionRef.current = 0;
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(delta) < 1) {
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const direction: -1 | 1 = delta > 0 ? 1 : -1;
      if (scrollDirectionRef.current !== direction) {
        scrollDirectionRef.current = direction;
        accumulatedScrollRef.current = Math.abs(delta);
      } else {
        accumulatedScrollRef.current += Math.abs(delta);
      }

      if (
        direction === 1 &&
        currentScrollY > hideStartThreshold &&
        accumulatedScrollRef.current >= hideDistanceThreshold
      ) {
        setHeaderHidden(true);
        accumulatedScrollRef.current = 0;
      } else if (
        direction === -1 &&
        accumulatedScrollRef.current >= showDistanceThreshold
      ) {
        setHeaderHidden(false);
        accumulatedScrollRef.current = 0;
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleScroll = () => {
      if (scrollTimerRef.current !== null) return;
      scrollTimerRef.current = window.setTimeout(applyScrollState, scrollThrottleMs);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(initializationTimer);
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("sweed-menu-open");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("sweed-menu-open");
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      const trigger = toggleBtnRef.current;
      if (!panel || !trigger) return;

      const panelFocusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const focusable = [trigger, ...panelFocusable];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("sweed-menu-open");
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, open]);

  const normalizedColors = (colors.length ? colors : ["#ed2062", "#261b3e"]).slice(
    0,
    3,
  );

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${polishStyles.root}`}
      data-testid="sweed-staggered-menu"
      data-open={open ? "true" : "false"}
      data-position={position}
      data-header-hidden={headerHidden && !open ? "true" : "false"}
      data-scrolled={pageScrolled ? "true" : "false"}
      style={{ "--staggered-accent": accentColor } as React.CSSProperties}
      onFocusCapture={() => setHeaderHidden(false)}
    >
      <header
        className={`${styles.header} ${polishStyles.header}`}
        aria-label="رأس الموقع"
      >
        <div className={`${styles.headerInner} ${polishStyles.headerInner}`}>
          <Link
            className={styles.logo}
            href="/"
            aria-label="العودة إلى الرئيسية"
            onClick={() => closeMenu(false)}
          >
            <Image
              src={logoUrl}
              alt=""
              aria-hidden
              className={`${styles.logoImage} ${polishStyles.logoImage}`}
              width={120}
              height={32}
              priority
            />
          </Link>

          <div className={styles.headerControls}>
            <Link
              className={styles.headerAction}
              data-testid="sweed-header-contact-action"
              href="/contact"
              onClick={() => closeMenu(false)}
            >
              احجز استشارتك المجانية
            </Link>

            <button
              ref={toggleBtnRef}
              className={`${styles.toggle} ${polishStyles.toggle}`}
              data-testid="sweed-menu-button"
              type="button"
              aria-label={open ? "إغلاق القائمة الرئيسية" : "فتح القائمة الرئيسية"}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={toggleMenu}
            >
              <span className={styles.toggleTextWrap} aria-hidden="true">
                <span ref={textInnerRef} className={styles.toggleTextInner}>
                  <span className={styles.toggleLine}>{menuLabel}</span>
                  <span className={styles.toggleLine}>{closeLabel}</span>
                </span>
              </span>

              <span ref={iconRef} className={styles.icon} aria-hidden="true">
                <span ref={plusHRef} className={styles.iconLine} />
                <span ref={plusVRef} className={styles.iconLine} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <button
        ref={backdropRef}
        className={styles.backdrop}
        type="button"
        tabIndex={-1}
        aria-label="إغلاق القائمة"
        onClick={() => closeMenu(false)}
      />

      <div ref={preLayersRef} className={styles.preLayers} aria-hidden="true">
        {normalizedColors.map((color, index) => (
          <div
            className={styles.preLayer}
            key={`${color}-${index}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <aside
        id={panelId}
        ref={panelRef}
        className={styles.panel}
        data-testid="sweed-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
        aria-hidden={!open}
      >
        <div className={styles.panelInner}>
          <nav aria-label="التنقل الرئيسي">
            <ul className={styles.list}>
              {items.map((item, index) => {
                const hasHashTarget = item.href.includes("#");
                const isCurrent = hasHashTarget
                  ? pathname === "/" && item.href.endsWith("#home")
                  : item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li className={`${styles.itemWrap} ${polishStyles.itemWrap}`} key={item.href}>
                    <Link
                      className={styles.item}
                      data-current={isCurrent ? "true" : undefined}
                      href={item.href}
                      aria-label={`انتقل إلى ${item.label}`}
                      aria-current={isCurrent ? "page" : undefined}
                      tabIndex={open ? undefined : -1}
                      onClick={() => closeMenu(false)}
                    >
                      <span className={`${styles.itemLabel} ${polishStyles.itemLabel}`}>
                        {item.label}
                      </span>
                      {displayItemNumbering ? (
                        <span className={styles.itemNumber} aria-hidden="true">
                          {formatArabicIndex(index + 1)}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {displaySocials && socialItems.length > 0 ? (
            <div className={styles.socials} aria-label="روابط التواصل المباشر">
              <p className={styles.socialTitle}>تواصل مباشر</p>
              <ul className={styles.socialList}>
                {socialItems.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    {item.external ? (
                      <a
                        className={styles.socialLink}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={open ? undefined : -1}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        className={styles.socialLink}
                        href={item.href}
                        tabIndex={open ? undefined : -1}
                        onClick={() => closeMenu(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
