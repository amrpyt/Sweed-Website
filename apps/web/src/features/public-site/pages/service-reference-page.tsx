import { getServiceReferenceDocument, type ServiceReferenceSlug } from "../../legacy-site/service-reference-html";
import { ServiceReferenceRuntime } from "../../legacy-site/service-reference-runtime";
import { getSweedReferenceButtonThemeCss } from "../../legacy-site/reference-button-theme";
import { PublicPageShell } from "./public-page-shell";

type Props = {
  slug: ServiceReferenceSlug;
};

const SHARED_OVERRIDES = `
.sweed-reference-page {
  --sweed-reference-purple: #261b3e;
  --sweed-reference-pink: #ed2062;
  direction: rtl;
  font-family: "SWEED Helvetica Arabic", "SF Arabic", Arial, sans-serif;
}

.sweed-reference-page *,
.sweed-reference-page *::before,
.sweed-reference-page *::after {
  font-family: inherit !important;
}

/* The app-wide typography layer assigns heading/body colors directly.
 * The uploaded service prototypes intentionally inherit those colors from
 * each section (for example white copy inside dark heroes). Keep the global
 * typography from leaking into the isolated reference canvas. */
.sweed-reference-page h1,
.sweed-reference-page h2,
.sweed-reference-page h3,
.sweed-reference-page h4,
.sweed-reference-page h5,
.sweed-reference-page h6,
.sweed-reference-page p,
.sweed-reference-page small,
.sweed-reference-page figcaption {
  color: inherit;
}

/* Never leave content invisible while the client runtime is still loading.
 * Once all prototype scripts are installed, the runtime marks the canvas as
 * ready and the original reveal CSS/GSAP behavior takes over. */
.sweed-reference-page:not([data-reference-runtime-ready="true"]) .reveal {
  opacity: 1;
  transform: none;
}

.sweed-reference-page a:focus-visible,
.sweed-reference-page button:focus-visible,
.sweed-reference-page input:focus-visible,
.sweed-reference-page select:focus-visible,
.sweed-reference-page textarea:focus-visible {
  outline: 3px solid var(--sweed-reference-pink) !important;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .sweed-reference-page *,
  .sweed-reference-page *::before,
  .sweed-reference-page *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

export function ServiceReferencePage({ slug }: Props) {
  const document = getServiceReferenceDocument(slug);
  const buttonTheme = getSweedReferenceButtonThemeCss(".sweed-reference-page");

  return (
    <PublicPageShell page="service-detail" showBreadcrumb={false}>
      <main className="sweed-reference-page" id="main-content" dir="rtl" data-service-reference={slug}>
        <style dangerouslySetInnerHTML={{ __html: `${document.styles}\n${buttonTheme}\n${SHARED_OVERRIDES}` }} />
        <div dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
        <ServiceReferenceRuntime scripts={document.scripts} />
      </main>
    </PublicPageShell>
  );
}
