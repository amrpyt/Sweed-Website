import Script from "next/script";
import { AiAdvisorWidget, AutomationDemo } from "@/features/ai-advisor";
import { OfferFunnelController } from "@/features/offer-funnel";
import { LegacyBreadcrumb } from "./legacy-breadcrumb";
import { LegacyEnhancements } from "./legacy-enhancements";
import { LegacyFooter } from "./legacy-footer";
import { getLegacyPage, type LegacyPresentation } from "./legacy-html";
import { LegacyHeader } from "./legacy-header";
import { legacyProductActionRuntime } from "./legacy-product-action-theme";
import type { LegacyPageKey } from "./legacy-routes";
import { ReferenceScripts } from "./reference-scripts";

const homepageBriefRuntime = `
(() => {
  if (window.__sweedHomepageBriefRuntime) return;
  window.__sweedHomepageBriefRuntime = true;

  const ensureMarqueeStyle = () => {
    if (document.getElementById("sweed-home-brief-style")) return;
    const style = document.createElement("style");
    style.id = "sweed-home-brief-style";
    style.textContent = \`
      @keyframes sweedPartnersMarquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .partners-grid[data-brief-marquee="true"] {
        display: block !important;
        overflow: hidden !important;
        direction: ltr !important;
      }
      .partners-grid[data-brief-marquee="true"] .partners-brief-track {
        display: flex !important;
        align-items: stretch !important;
        gap: 1rem !important;
        width: max-content !important;
        animation: sweedPartnersMarquee 26s linear infinite !important;
      }
      .partners-grid[data-brief-marquee="true"] .partner-card {
        min-width: 180px !important;
        flex: 0 0 180px !important;
      }
    \`;
    document.head.appendChild(style);
  };

  const createQuickServiceOption = (value, label) => {
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
  };

  const bindQuickJourney = (helpSection) => {
    const button = helpSection.querySelector(".help-form button");
    if (!button || button.dataset.quickJourneyBound === "true") return;

    button.dataset.quickJourneyBound = "true";
    button.type = "button";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const params = new URLSearchParams();
      const name = document.querySelector("#quickName")?.value?.trim();
      const phone = document.querySelector("#quickPhone")?.value?.trim();
      const services = Array.from(document.querySelectorAll('input[name="quickServices"]:checked'))
        .map((input) => input.value)
        .filter(Boolean);

      if (services.length) params.set("services", services.join(","));
      if (name) params.set("name", name);
      if (phone) params.set("phone", phone);

      window.location.href = params.toString() ? \`/contact?\${params.toString()}#contact-form\` : "/contact#contact-form";
    });
  };

  const repeatPopup = () => {
    const popup = document.getElementById("welcomePopup");
    if (!popup || popup.dataset.briefRepeatReady === "true") return;

    popup.dataset.briefRepeatReady = "true";
    window.setTimeout(() => popup.classList.add("active"), 30000);
    window.setInterval(() => {
      if (!popup.classList.contains("active")) {
        popup.classList.add("active");
      }
    }, 120000);
  };

  const setup = () => {
    const helpSection = document.querySelector(".help-section");
    const servicesSection = document.querySelector(".services-section");
    const partnersGrid = document.querySelector(".partners-grid");
    if (!helpSection || !servicesSection || !partnersGrid) return false;

    helpSection.id = "contact";

    const helpInputs = helpSection.querySelectorAll(".help-form input");
    if (helpInputs[0] && !helpInputs[0].id) helpInputs[0].id = "quickName";
    if (helpInputs[1] && !helpInputs[1].id) helpInputs[1].id = "quickPhone";

    const quickService = helpSection.querySelector(".help-form select");
    if (quickService && !helpSection.querySelector('[data-home-services="true"]')) {
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
        createQuickServiceOption("content", "الإنتاج الإبداعي")
      );

      wrapper.append(helper, rail);
      quickService.replaceWith(wrapper);
    }

    bindQuickJourney(helpSection);

    const servicesTitle = servicesSection.querySelector(".section-title");
    if (servicesTitle) servicesTitle.textContent = "خدماتنا المتكاملة";

    const servicesSubtitle = servicesSection.querySelector(".section-subtitle");
    if (servicesSubtitle) {
      servicesSubtitle.textContent = "حلول شاملة لجميع احتياجاتك التسويقية والإدارية وتطوير الاعمال";
    }

    servicesSection.querySelectorAll(".service-link").forEach((link) => {
      link.href = "/services";
    });

    if (partnersGrid.dataset.briefMarquee !== "true") {
      ensureMarqueeStyle();
      partnersGrid.dataset.briefMarquee = "true";
      const cards = Array.from(partnersGrid.querySelectorAll(".partner-card"));
      if (cards.length) {
        const track = document.createElement("div");
        track.className = "partners-brief-track";
        cards.forEach((card) => track.appendChild(card));
        for (let repeat = 0; repeat < 2; repeat += 1) {
          cards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
          });
        }
        partnersGrid.replaceChildren(track);
      }
    }

    repeatPopup();
    return true;
  };

  const start = () => {
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (setup() || tries > 40) {
        window.clearInterval(timer);
      }
    }, 400);
    setup();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
`;

export function LegacyPage({
  page,
  presentation = "legacy",
}: {
  page: LegacyPageKey;
  presentation?: LegacyPresentation;
}) {
  const isReference = presentation === "reference";
  const isExact = presentation === "exact";
  const document = getLegacyPage(page, { presentation });
  const bodyHasMainLandmark = /<main\b/i.test(document.bodyHtml);
  const legacyBodyClassName = `sweed-legacy-page sweed-legacy-page-${page}`;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: document.headHtml }} />
      {isExact ? null : (
        <a className="sweed-skip-link" href="#main-content">
          تخطي إلى المحتوى
        </a>
      )}
      {isExact ? null : <LegacyHeader page={page} />}
      {isReference || isExact ? null : <LegacyBreadcrumb page={page} />}
      {isExact ? (
        <main
          className="sweed-exact-reference-page"
          id="main-content"
          tabIndex={-1}
          dangerouslySetInnerHTML={{ __html: document.bodyHtml }}
        />
      ) : isReference ? (
        <main
          className="sweed-reference-page"
          id="main-content"
          tabIndex={-1}
          dangerouslySetInnerHTML={{ __html: document.bodyHtml }}
        />
      ) : bodyHasMainLandmark ? (
        <div className={legacyBodyClassName} dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
      ) : (
        <main className={legacyBodyClassName} id="main-content" tabIndex={-1} dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
      )}
      {isReference || isExact ? null : <LegacyEnhancements page={page} />}
      {!isReference && !isExact && page === "services" ? <AutomationDemo /> : null}
      {isExact ? null : <LegacyFooter />}
      {isReference || isExact ? null : <OfferFunnelController page={page} />}
      {isExact ? null : <AiAdvisorWidget />}
      {page === "home" ? <script dangerouslySetInnerHTML={{ __html: homepageBriefRuntime }} /> : null}
      {!isReference && page === "products" ? (
        <script id="sweed-product-action-runtime" dangerouslySetInnerHTML={{ __html: legacyProductActionRuntime }} />
      ) : null}
      {isReference || isExact ? (
        <ReferenceScripts scripts={document.scripts} />
      ) : (
        document.scripts.map((script) =>
          page === "products" && !script.src ? (
            <script
              dangerouslySetInnerHTML={{ __html: script.content ?? "" }}
              id={script.id}
              key={script.id}
              type={script.type}
            />
          ) : script.src ? (
            <Script id={script.id} key={script.id} src={script.src} strategy="afterInteractive" type={script.type} />
          ) : (
            <Script id={script.id} key={script.id} strategy="afterInteractive" type={script.type}>
              {script.content}
            </Script>
          ),
        )
      )}
    </>
  );
}
