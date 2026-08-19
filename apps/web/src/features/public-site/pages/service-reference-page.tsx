import { getServiceReferenceDocument, type ServiceReferenceSlug } from "../../legacy-site/service-reference-html";
import { ServiceReferenceRuntime } from "../../legacy-site/service-reference-runtime";

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

  return (
    <main className="sweed-reference-page" id="main-content" dir="rtl" data-service-reference={slug}>
      <style dangerouslySetInnerHTML={{ __html: document.styles }} />
      <div dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
      <ServiceReferenceRuntime scripts={document.scripts} />
    </main>
  );
}
