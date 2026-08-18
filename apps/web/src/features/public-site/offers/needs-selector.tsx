"use client";

import { ButtonLink } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { offersPageSource } from "@/content/public-site/offers-page";
import { PackageComparisonButton } from "./package-comparison";
import { getOfferRecommendation, type NeedsAnswers } from "./needs-selector-logic";
import styles from "./needs-selector.module.css";

type PartialAnswers = Partial<NeedsAnswers>;

export function NeedsSelector() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PartialAnswers>({});
  const questions = offersPageSource.quiz.questions;
  const complete = step >= questions.length;
  const recommendation = useMemo(() => {
    if (!answers.challenge || !answers.stage || !answers.timing) return null;
    return getOfferRecommendation(answers as NeedsAnswers);
  }, [answers]);
  const comparison = offersPageSource.comparisons.find((item) => item.id === "integrated")!;

  function answerQuestion(value: string) {
    const question = questions[step];
    if (!question) return;

    setAnswers((current) => ({ ...current, [question.id]: value }));
    setStep((current) => Math.min(current + 1, questions.length));
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  return (
    <div className={styles.selector}>
      <div className={styles.progress} aria-label={`التقدم: ${Math.min(step + 1, 3)} من 3`}>
        {questions.map((question, index) => (
          <span data-active={index <= step || complete || undefined} key={question.id} />
        ))}
      </div>

      {!complete ? (
        <div className={styles.question}>
          <p>سؤال {step + 1} من 3</p>
          <h3>{questions[step].title}</h3>
          <div className={styles.options}>
            {questions[step].options.map((option) => (
              <button type="button" key={option.value} onClick={() => answerQuestion(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
          <a className={styles.skip} href="#main-packages">
            تخطى الأسئلة وشوف الباقات مباشرة
          </a>
        </div>
      ) : recommendation ? (
        <div className={styles.result} role="status" aria-live="polite">
          <p>ترشيحك المبدئي</p>
          <h3>{recommendation.serviceLabel}</h3>
          <strong>المستوى الأقرب: {recommendation.packageLabel}</strong>
          <span>{recommendation.note}</span>
          <div className={styles.actions}>
            <ButtonLink href={`#package-${recommendation.packageId}`} size="compact">شوف تفاصيل الترشيح</ButtonLink>
            <PackageComparisonButton comparison={comparison} label="قارن الباقات" />
            <ButtonLink
              href={`/contact?source=offers-quiz&service=${encodeURIComponent(recommendation.serviceId)}&package=${encodeURIComponent(recommendation.packageId)}&timing=${encodeURIComponent(answers.timing ?? "")}`}
              size="compact"
              variant="secondary"
            >
              اطلب تشخيص يثبت الاختيار
            </ButtonLink>
          </div>
          <button className={styles.restart} type="button" onClick={restart}>
            غيّر إجاباتك
          </button>
        </div>
      ) : null}
    </div>
  );
}
