"use client";

import { useEffect } from "react";
import EmblaCarousel, { type EmblaCarouselType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import TomSelect from "tom-select";
import type { LegacyPageKey } from "./legacy-routes";

declare global {
  interface Window {
    slideProblems?: (direction: number) => void;
    slidePortfolio?: (direction: number) => void;
    slideTestimonials?: (direction: number) => void;
    slideServices?: (direction: number) => void;
    slideProducts?: (direction: number) => void;
    slideBlog?: (direction: number) => void;
    startSuccessJourney?: (event: Event) => boolean;
  }
}

function scrollCarousel(selector: string, cardSelector: string, direction: number) {
  const track = document.querySelector<HTMLElement>(selector);
  const card = track?.querySelector<HTMLElement>(cardSelector);
  if (!track || !card) return;

  track.scrollBy({ left: direction * -(card.offsetWidth + 32), behavior: "smooth" });
}

function prefillContactForm() {
  const params = new URLSearchParams(window.location.search);
  const selectedServices = (params.get("services") ?? "").split(",").filter(Boolean);
  const serviceSelect = document.querySelector<(HTMLSelectElement & { tomselect?: TomSelect })>("#serviceSelect");

  if (serviceSelect && selectedServices.length) {
    if (serviceSelect.tomselect) {
      serviceSelect.tomselect.setValue(selectedServices, true);
    } else {
      Array.from(serviceSelect.options).forEach((option) => {
        option.selected = selectedServices.includes(option.value);
      });
    }
  }

  const nameInput = document.querySelector<HTMLInputElement>("#contactName");
  const phoneInput = document.querySelector<HTMLInputElement>("#contactPhone");
  const name = params.get("name");
  const phone = params.get("phone");

  if (nameInput && name) nameInput.value = name;
  if (phoneInput && phone) phoneInput.value = phone;
}

function initServiceMultiSelect() {
  const serviceSelect = document.querySelector<(HTMLSelectElement & { tomselect?: TomSelect })>("#serviceSelect");

  if (!serviceSelect || serviceSelect.tomselect) return null;

  return new TomSelect(serviceSelect, {
    closeAfterSelect: false,
    create: false,
    hideSelected: true,
    maxItems: null,
    placeholder: "اختار خدمة أو أكثر",
    plugins: {
      remove_button: {
        title: "حذف الخدمة",
      },
    },
    render: {
      no_results() {
        return '<div class="no-results">لا توجد نتائج</div>';
      },
    },
  });
}

function ensureEmblaTrack(root: HTMLElement, slideSelector: string, trackClass: string) {
  const existingTrack = Array.from(root.children).find((child) => child.classList.contains(trackClass));
  if (existingTrack instanceof HTMLElement) return existingTrack;

  const slides = Array.from(root.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && child.matches(slideSelector),
  );

  if (slides.length < 2) return null;

  const track = document.createElement("div");
  track.className = trackClass;
  slides[0].before(track);
  slides.forEach((slide) => track.appendChild(slide));

  return track;
}

function duplicateSlidesForMarquee(root: HTMLElement, track: HTMLElement) {
  if (track.dataset.emblaCloned === "true") return;

  const slides = Array.from(track.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && !child.dataset.emblaClone,
  );

  if (!slides.length) return;

  const baseWidth = slides.reduce((total, slide) => total + slide.offsetWidth, 0);
  const cloneSets = Math.max(3, Math.ceil((root.clientWidth * 3) / Math.max(baseWidth, 1)));

  for (let index = 0; index < cloneSets; index += 1) {
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      if (!(clone instanceof HTMLElement)) return;

      clone.dataset.emblaClone = "true";
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll<HTMLElement>("a, button, input, select, textarea, [tabindex]").forEach((item) => {
        item.setAttribute("tabindex", "-1");
      });
      track.appendChild(clone);
    });
  }

  track.dataset.emblaCloned = "true";
}

function initEmblaMarquee(
  rootSelector: string,
  slideSelector: string,
  trackClass: string,
  speed: number,
) {
  const root = document.querySelector<HTMLElement>(rootSelector);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!root || reduceMotion) return null;

  const track = ensureEmblaTrack(root, slideSelector, trackClass);
  if (!track) return null;
  duplicateSlidesForMarquee(root, track);

  return EmblaCarousel(
    root,
    {
      align: "start",
      containScroll: false,
      direction: "ltr",
      dragFree: true,
      loop: true,
      skipSnaps: true,
      container: track,
    },
    [
      AutoScroll({
        direction: "backward",
        playOnInit: true,
        speed,
        startDelay: 250,
        stopOnFocusIn: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );
}

export function LegacyEnhancements({ page }: { page: LegacyPageKey }) {
  useEffect(() => {
    document.getElementById("mainHeader")?.classList.remove("hidden");
    document.getElementById("header")?.classList.remove("hidden");

    const emblaCarousels = {
      problems: initEmblaMarquee(".problems-grid", ".problem-card", "problems-track", 0.55),
      portfolio: initEmblaMarquee("#portfolioTrack", ".portfolio-item", "portfolio-track", 0.5),
      testimonials: initEmblaMarquee(".testimonials-slider", ".testimonial-card", "testimonials-track", 0.45),
      services: initEmblaMarquee(".services-slider", ".service-card", "services-track", 0.45),
      products: initEmblaMarquee(".products-slider", ".product-card", "products-track", 0.5),
      blog: initEmblaMarquee(".blog-slider", ".blog-card", "blog-track", 0.45),
    } satisfies Record<string, EmblaCarouselType | null>;

    window.slideProblems = (direction: number) => {
      if (emblaCarousels.problems) {
        if (direction > 0) emblaCarousels.problems.scrollNext();
        else emblaCarousels.problems.scrollPrev();
        return;
      }
      scrollCarousel(".problems-grid", ".problem-card", direction);
    };

    window.slidePortfolio = (direction: number) => {
      if (emblaCarousels.portfolio) {
        if (direction > 0) emblaCarousels.portfolio.scrollNext();
        else emblaCarousels.portfolio.scrollPrev();
        return;
      }
      scrollCarousel("#portfolioTrack", ".portfolio-item", direction);
    };

    window.slideTestimonials = (direction: number) => {
      if (emblaCarousels.testimonials) {
        if (direction > 0) emblaCarousels.testimonials.scrollNext();
        else emblaCarousels.testimonials.scrollPrev();
        return;
      }
      scrollCarousel(".testimonials-slider", ".testimonial-card", direction);
    };

    window.slideServices = (direction: number) => {
      if (emblaCarousels.services) {
        if (direction > 0) emblaCarousels.services.scrollNext();
        else emblaCarousels.services.scrollPrev();
        return;
      }
      scrollCarousel(".services-slider", ".service-card", direction);
    };

    window.slideProducts = (direction: number) => {
      if (emblaCarousels.products) {
        if (direction > 0) emblaCarousels.products.scrollNext();
        else emblaCarousels.products.scrollPrev();
        return;
      }
      scrollCarousel(".products-slider", ".product-card", direction);
    };

    window.slideBlog = (direction: number) => {
      if (emblaCarousels.blog) {
        if (direction > 0) emblaCarousels.blog.scrollNext();
        else emblaCarousels.blog.scrollPrev();
        return;
      }
      scrollCarousel(".blog-slider", ".blog-card", direction);
    };

    window.startSuccessJourney = (event: Event) => {
      event.preventDefault();

      const params = new URLSearchParams();
      const name = document.querySelector<HTMLInputElement>("#quickName")?.value;
      const phone = document.querySelector<HTMLInputElement>("#quickPhone")?.value;
      const service = document.querySelector<HTMLSelectElement>("#quickService")?.value;

      if (service) params.set("services", service);
      if (name) params.set("name", name);
      if (phone) params.set("phone", phone);

      window.location.href = `/contact?${params.toString()}`;
      return false;
    };

    const serviceMultiSelect = page === "contact" ? initServiceMultiSelect() : null;

    if (page === "contact") {
      prefillContactForm();
    }

    return () => {
      serviceMultiSelect?.destroy();
      Object.values(emblaCarousels).forEach((embla) => embla?.destroy());
      delete window.slideProblems;
      delete window.slidePortfolio;
      delete window.slideTestimonials;
      delete window.slideServices;
      delete window.slideProducts;
      delete window.slideBlog;
      delete window.startSuccessJourney;
    };
  }, [page]);

  return null;
}
