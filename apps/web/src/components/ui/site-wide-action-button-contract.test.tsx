import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import MiduClonePage from "@/app/(marketing)/midu-clone/page";
import { articles } from "@/content/local-data";
import { getKnowledgeArticles } from "@/content/public-site/articles-page";
import { AiAdvisorWidget } from "@/features/ai-advisor/ai-advisor-widget";
import { CrmAiDemoPage } from "@/features/crm-ai-demo/crm-ai-demo-page";
import { ArticleBrowser } from "@/features/public-site/articles/article-browser";
import { PortfolioExecutivePage } from "@/features/public-site/portfolio/portfolio-executive-page";
import { ServicesPublicPage } from "@/features/public-site/pages/services-public-page";
import { Button, ButtonLink } from "./button";

function actionElementsContaining(html: string, text: string) {
  const elements = html.match(/<(?:a|button)\b[^>]*>[\s\S]*?<\/(?:a|button)>/g) ?? [];
  return elements.filter((element) => element.replace(/<[^>]+>/g, "").includes(text));
}

function expectCanonicalAction(html: string, text: string, minimumMatches = 1) {
  const matches = actionElementsContaining(html, text);

  expect(matches.length).toBeGreaterThanOrEqual(minimumMatches);
  for (const match of matches) {
    expect(match).toContain("data-sweed-action-fill");
  }
}

describe("site-wide SWEED CTA contract", () => {
  test("shared Button and ButtonLink render the canonical fill mechanism", () => {
    const html = renderToStaticMarkup(
      <>
        <Button>نفّذ الإجراء</Button>
        <ButtonLink href="/contact" variant="secondary">تواصل معنا</ButtonLink>
      </>,
    );

    expectCanonicalAction(html, "نفّذ الإجراء");
    expectCanonicalAction(html, "تواصل معنا");
  });

  test("public marketing CTAs use the canonical action mechanism", () => {
    const services = renderToStaticMarkup(<ServicesPublicPage />);
    const portfolio = renderToStaticMarkup(<PortfolioExecutivePage />);
    const articleBrowser = renderToStaticMarkup(<ArticleBrowser articles={getKnowledgeArticles(articles)} />);

    expectCanonicalAction(services, "ناقش خدمة", 6);
    expectCanonicalAction(portfolio, "افتح المشروع");
    expectCanonicalAction(articleBrowser, "اقرأ المقال");
  });

  test("interactive product CTAs use the same canonical action mechanism", () => {
    const crm = renderToStaticMarkup(<CrmAiDemoPage />);
    const advisor = renderToStaticMarkup(<AiAdvisorWidget />);

    expectCanonicalAction(crm, "شغّل الـAI Agent");
    expectCanonicalAction(advisor, "إرسال التذكرة");
  });

  test("the Midu body and shared shell use the canonical CTA design", () => {
    const html = renderToStaticMarkup(<MiduClonePage />);

    expectCanonicalAction(html, "احجز استشارتك المجانية");
    expectCanonicalAction(html, "Get in touch");
    expectCanonicalAction(html, "Explore plans");
    expectCanonicalAction(html, "Select plan", 3);
  });
});
