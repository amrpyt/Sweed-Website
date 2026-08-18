import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeConversionProvider } from "./home-conversion-context";
import { HomeContactSection } from "./home-contact-section";
import { HomeFaqBlogSection } from "./home-faq-blog-section";

function readLocal(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

describe("requested homepage polish", () => {
  test("keeps Arabic navigation RTL while placing the action on the right and logo on the left", () => {
    const css = readLocal("../legacy-site/legacy-header.module.css");

    expect(css).toMatch(/\.nav\s*{[\s\S]*?direction:\s*rtl;/);
    expect(css).toMatch(/\.desktopCta,\s*\.menuButton\s*{[\s\S]*?order:\s*1;/);
    expect(css).toMatch(/\.menuPanel\s*{[\s\S]*?order:\s*2;/);
    expect(css).toMatch(/\.logo\s*{[\s\S]*?order:\s*3;/);
  });

  test("uses wide copy measures for the four compressed homepage headings", () => {
    const portfolioCss = readLocal("./home-archigreen-projects-section.module.css");
    const offersCss = readLocal("./home-offers-section.module.css");
    const faqCss = readLocal("./home-faq-blog-section.module.css");
    const contactCss = readLocal("./home-contact-section.module.css");

    expect(portfolioCss).toMatch(/\.headingCopy\s*{[\s\S]*?max-width:\s*none;/);
    expect(offersCss).toMatch(/\.headingLayout\s*{[\s\S]*?max-width:\s*none;/);
    expect(faqCss).toMatch(/\.faqHeading\s*{[\s\S]*?max-width:\s*none;/);
    expect(contactCss).toMatch(/\.copyColumn\s*{[\s\S]*?max-width:\s*none;/);
  });

  test("removes the homepage FAQ all-questions action", () => {
    const html = renderToStaticMarkup(<HomeFaqBlogSection />);

    expect(html).not.toContain("شاهد كل الأسئلة");
  });

  test("removes direct phone and WhatsApp rows from the homepage contact intro", () => {
    const html = renderToStaticMarkup(
      <HomeConversionProvider>
        <HomeContactSection />
      </HomeConversionProvider>,
    );

    expect(html).not.toContain('href="tel:');
    expect(html).not.toContain('href="https://wa.me/');
    expect(html).toContain('data-testid="home-contact-form"');
  });

  test("keeps the Services to Why transition compact without a standalone divider row", () => {
    const pageSource = readLocal("./home-public-page.tsx");
    const servicesCss = readLocal("./home-services-section.module.css");
    const whyCss = readLocal("./home-why-metrics-section.module.css");

    expect(pageSource).not.toContain("sectionDivider");
    expect(servicesCss).toMatch(
      /\.section\s*{[\s\S]*?padding-block:\s*var\(--section-space-default\)\s+var\(--stack-xl\);/,
    );
    expect(whyCss).toMatch(
      /\.section\s*{[\s\S]*?padding-block:\s*var\(--stack-xl\)\s+var\(--section-space-default\);/,
    );
  });
});
