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
