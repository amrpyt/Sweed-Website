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
  const notesInput = document.querySelector<HTMLTextAreaElement>("#contactNotes");
  const name = params.get("name");
  const phone = params.get("phone");
  const notes = params.get("notes");

  if (nameInput && name) nameInput.value = name;
  if (phoneInput && phone) phoneInput.value = phone;
  if (notesInput && notes) notesInput.value = notes;
}

function initServiceMultiSelect() {
  const serviceSelect = document.querySelector<(HTMLSelectElement & { tomselect?: TomSelect })>("#serviceSelect");

  if (!serviceSelect || serviceSelect.tomselect) return null;

  return new TomSelect(serviceSelect, {
    closeAfterSelect: false,
    create: false,
    hideSelected: true,
    maxItems: null,
    placeholder: "اختر خدمة أو أكثر",
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
  track.style.display = "flex";
  track.style.gap = "1.25rem";
  track.style.alignItems = "stretch";
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

  root.style.overflow = "hidden";
  root.style.direction = "ltr";

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

function createQuickServiceOption(value: string, label: string) {
  const option = document.createElement("label");
  option.style.minWidth = "220px";
  option.style.display = "flex";
  option.style.alignItems = "center";
  option.style.gap = "0.75rem";
  option.style.padding = "1rem 1.1rem";
  option.style.borderRadius = "18px";
  option.style.background = "rgba(255,255,255,0.14)";
  option.style.border = "1px solid rgba(255,255,255,0.18)";
  option.style.color = "#ffffff";
  option.style.cursor = "pointer";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = "quickServices";
  input.value = value;

  const text = document.createElement("span");
  text.textContent = label;

  option.append(input, text);
  return option;
}

function bindHomepageQuickJourney() {
  const helpForm = document.querySelector<HTMLElement>(".help-form");
  const actionButton = helpForm?.querySelector<HTMLButtonElement>("button");
  if (!helpForm || !actionButton || actionButton.dataset.quickJourneyBound === "true") {
    return;
  }

  actionButton.dataset.quickJourneyBound = "true";
  actionButton.type = "button";
  actionButton.addEventListener("click", (event) => {
    window.startSuccessJourney?.(event);
  });
}

function tuneHomepageBrief() {
  document.querySelector<HTMLElement>(".clients-marquee-label")?.replaceChildren(document.createTextNode("شركاء النجاح"));

  const helpSection = document.querySelector<HTMLElement>(".help-section");
  if (helpSection) {
    helpSection.id = "contact";
  }

  const helpInputs = helpSection?.querySelectorAll<HTMLInputElement>(".help-form input");
  if (helpInputs?.[0] && !helpInputs[0].id) {
    helpInputs[0].id = "quickName";
  }
  if (helpInputs?.[1] && !helpInputs[1].id) {
    helpInputs[1].id = "quickPhone";
  }

  const quickService = helpSection?.querySelector<HTMLSelectElement>(".help-form select");
  if (quickService && !document.querySelector('[data-home-services="true"]')) {
    const wrapper = document.createElement("div");
    wrapper.dataset.homeServices = "true";
    wrapper.style.display = "grid";
    wrapper.style.gap = "0.85rem";

    const helper = document.createElement("p");
    helper.textContent = "اختر خدمة أو أكثر حسب احتياجك الحالي";
    helper.style.margin = "0";
    helper.style.color = "rgba(255,255,255,0.82)";
    helper.style.fontSize = "0.95rem";
    helper.style.fontWeight = "700";

    const rail = document.createElement("div");
    rail.style.display = "flex";
    rail.style.gap = "0.85rem";
    rail.style.overflowX = "auto";
    rail.style.paddingBottom = "0.3rem";
    rail.style.scrollbarWidth = "thin";

    rail.append(
      createQuickServiceOption("consulting", "استشارات إدارية وتسويقية"),
      createQuickServiceOption("branding", "تأسيس البراندات"),
      createQuickServiceOption("digital", "التسويق الرقمي"),
      createQuickServiceOption("development", "البرمجة والتطوير"),
      createQuickServiceOption("advertising", "الدعايا والإعلان"),
      createQuickServiceOption("content", "الإنتاج الإبداعي"),
    );

    wrapper.append(helper, rail);
    quickService.replaceWith(wrapper);
  }

  bindHomepageQuickJourney();

  const packagesSection = document.querySelector<HTMLElement>(".packages-section");
  if (packagesSection) {
    packagesSection.id = "offers";
    const title = packagesSection.querySelector<HTMLElement>(".section-title");
    if (title) {
      title.textContent = "باقات وعروض";
    }

    if (!packagesSection.querySelector('[data-packages-more="true"]')) {
      const actions = document.createElement("div");
      actions.className = "products-more";
      actions.dataset.packagesMore = "true";

      const link = document.createElement("a");
      link.href = "/offers";
      link.className = "btn btn-primary";
      link.innerHTML = '<i class="fas fa-eye"></i> مشاهدة المزيد';
      actions.append(link);
      packagesSection.querySelector(".container")?.append(actions);
    }
  }

  const servicesSection = document.querySelector<HTMLElement>(".services-section");
  if (servicesSection) {
    const title = servicesSection.querySelector<HTMLElement>(".section-title");
    if (title) {
      title.textContent = "خدماتنا المتكاملة";
    }

    const subtitle = servicesSection.querySelector<HTMLElement>(".section-subtitle");
    if (subtitle) {
      subtitle.textContent = "حلول شاملة لجميع احتياجاتك التسويقية والإدارية وتطوير الاعمال";
    }

    servicesSection.querySelectorAll<HTMLAnchorElement>(".service-link").forEach((link) => {
      link.href = "/services";
    });
  }

  const partnersGrid = document.querySelector<HTMLElement>(".partners-grid");
  if (partnersGrid) {
    partnersGrid.querySelectorAll<HTMLElement>(".partner-card").forEach((card) => {
      card.style.minWidth = "180px";
      card.style.flex = "0 0 180px";
    });
  }
}

export function LegacyEnhancements({ page }: { page: LegacyPageKey }) {
  useEffect(() => {
    document.getElementById("mainHeader")?.classList.remove("hidden");
    document.getElementById("header")?.classList.remove("hidden");

    if (page === "home") {
      tuneHomepageBrief();
    }

    const problemsCarousel: EmblaCarouselType | null = null;
    const emblaCarousels = {
      problems: problemsCarousel,
      portfolio: initEmblaMarquee("#portfolioTrack", ".portfolio-item", "portfolio-track", 0.5),
      testimonials: initEmblaMarquee(".testimonials-slider", ".testimonial-card", "testimonials-track", 0.45),
      services: initEmblaMarquee(".services-slider", ".service-card", "services-track", 0.45),
      products: initEmblaMarquee(".products-slider", ".product-card", "products-track", 0.5),
      blog: initEmblaMarquee(".blog-slider", ".blog-card", "blog-track", 0.45),
      partners: initEmblaMarquee(".partners-grid", ".partner-card", "partners-track", 0.45),
    } satisfies Record<string, EmblaCarouselType | null>;

    window.slideProblems = (direction: number) => {
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
      const services = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="quickServices"]:checked'))
        .map((input) => input.value)
        .filter(Boolean);

      if (services.length) params.set("services", services.join(","));
      if (name) params.set("name", name);
      if (phone) params.set("phone", phone);

      const nextUrl = params.toString() ? `/contact?${params.toString()}#contact-form` : "/contact#contact-form";
      window.location.href = nextUrl;
      return false;
    };

    bindHomepageQuickJourney();

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
