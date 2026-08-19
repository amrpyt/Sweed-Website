import { getServiceReferenceDocument, type ServiceReferenceSlug } from "../../legacy-site/service-reference-html";
import { ServiceReferenceRuntime } from "../../legacy-site/service-reference-runtime";
import { LegacyBreadcrumb } from "../../legacy-site/legacy-breadcrumb";
import { LegacyFooter } from "../../legacy-site/legacy-footer";
import { LegacyHeader } from "../../legacy-site/legacy-header";
import { createServiceJsonLd, getServiceReferenceModel } from "./service-reference-model";

type Props = {
  slug: ServiceReferenceSlug;
};

/**
 * Each service reference is a lossless rendering of the supplied HTML inside
 * a Next.js route. Styles are scoped by the document loader; body content,
 * section order, and copy remain untouched.
 */
export function ServiceReferencePage({ slug }: Props) {
  const document = getServiceReferenceDocument(slug);
  const service = getServiceReferenceModel(slug);
  const schema = createServiceJsonLd(slug);

  return (
    <>
      <LegacyHeader page="service-detail" />
      <LegacyBreadcrumb
        page="service-detail"
        items={[{ label: "خدماتنا", href: "/services" }, { label: service.title }]}
      />
      <main className="sweed-reference-page" id="main-content" dir="rtl" data-service-reference={slug}>
        <script
          type="application/ld+json"
          data-service-schema={slug}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <style dangerouslySetInnerHTML={{ __html: document.styles }} />
        <div dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
        <ServiceReferenceRuntime scripts={document.scripts} />
      </main>
      <LegacyFooter />
    </>
  );
}
