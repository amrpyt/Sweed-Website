"use client";

import { FormEvent, useId, useState } from "react";
import { Bot, MessageCircle, PhoneCall, SendHorizonal } from "lucide-react";
import styles from "./ai-advisor.module.css";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const titleId = "sweed-ai-advisor-title";
const knowledgeBaseHref = "/faq#faq";
const contactHref = "/contact#contact-form";
const whatsappHref = `https://wa.me/201068274662?text=${encodeURIComponent("مرحبا، أريد التحدث مع فريق SWEED على واتساب.")}`;
const quickPrompts = [
  "عايز أعرف أنسب باقة لشركة صغيرة",
  "محتاج خطة تسويق لمشروع جديد",
  "إزاي أطور المبيعات عندي؟",
];

const initialMessage: ChatMessage = {
  role: "assistant",
  content: "اختار الطريقة المناسبة لك: شات AI سريع، أو تذكرة دعم وواتساب مباشر.",
};

export function AiAdvisorWidget() {
  const resourceId = useId();
  const threadId = useId();
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setError("");
    setDraft("");
    setMessages((current) => [...current, { role: "user", content: trimmed }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "advisor",
          message: trimmed,
          resourceId,
          threadId,
        }),
      });

      if (!response.ok) {
        throw new Error("Advisor API failed");
      }

      const payload = (await response.json()) as { message?: string; recommendation?: string };
      const reply = [payload.message, payload.recommendation ? `التوصية: ${payload.recommendation}` : ""]
        .filter(Boolean)
        .join("\n");

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: reply || "تم استلام طلبك. يمكنك ترك رقمك وسيتواصل معك الفريق.",
        },
      ]);
    } catch {
      setError("الشات غير متاح الآن. استخدم التذكرة أو واتساب وسيتم التواصل معك.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  return (
    <aside className={styles.root} aria-label="SWEED support center">
      <div className={styles.stack}>
        <a className={styles.whatsappFab} href={whatsappHref} target="_blank" rel="noreferrer" aria-label="ابدأ محادثة واتساب">
          <span className={styles.whatsappHint}>ابدأ محادثة واتساب</span>
          <span className={styles.whatsappIcon}>
            <PhoneCall aria-hidden size={20} />
          </span>
        </a>

        <details className={styles.supportDetails}>
          <summary className={styles.launcher} role="button" aria-label="Open AI advisor">
            <span className={styles.launcherIcon}>
              <MessageCircle aria-hidden size={22} />
              <span className={styles.launcherPulse} aria-hidden />
            </span>
            <span className={styles.launcherText}>الدعم الفوري</span>
          </summary>

          <section className={styles.panel} role="dialog" aria-modal="false" aria-labelledby={titleId}>
            <header className={styles.header}>
              <div className={styles.headerText}>
                <p className={styles.eyebrow}>SWEED AI</p>
                <h2 id={titleId}>اختار طريقة المساعدة المناسبة لك</h2>
                <p className={styles.status}>
                  <span className={styles.statusDot} aria-hidden />
                  متاح الآن
                </p>
              </div>
            </header>

            <div className={styles.choiceIntro}>الزائر يختار: شات AI مباشر أو تذكرة دعم وواتساب.</div>

            <details className={styles.choicePanel} open>
              <summary className={styles.choiceSummary} role="button">
                شات AI مباشر
              </summary>
              <div className={styles.messages} aria-live="polite">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={message.role === "assistant" ? styles.assistantBubble : styles.userBubble}>
                    {message.role === "assistant" ? (
                      <>
                        <span className={styles.botIcon}>
                          <Bot aria-hidden size={16} />
                        </span>
                        <p className={styles.markdown}>{message.content}</p>
                      </>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                ))}
                {isLoading ? (
                  <div className={styles.assistantBubble}>
                    <span className={styles.typingDots} aria-label="جاري الرد">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                ) : null}
              </div>

              <div className={styles.quickArea}>
                <div className={styles.quickPrompts} aria-label="اقتراحات سريعة">
                  {quickPrompts.map((prompt) => (
                    <button key={prompt} type="button" onClick={() => void sendMessage(prompt)} disabled={isLoading}>
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {error ? (
                <div className={styles.error}>
                  <p>{error}</p>
                  <a href={contactHref}>افتح نموذج التواصل</a>
                </div>
              ) : null}

              <form className={styles.composer} action={contactHref} method="get" onSubmit={handleSubmit}>
                <input
                  aria-label="اكتب رسالتك للمساعد"
                  name="message"
                  placeholder="اكتب رسالتك للمساعد"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !draft.trim()} aria-label="إرسال الرسالة">
                  <SendHorizonal aria-hidden size={18} />
                </button>
              </form>
            </details>

            <details className={styles.choicePanel}>
              <summary className={styles.choiceSummary} role="button">
                دعم مباشر أو تذكرة
              </summary>
              <div className={styles.supportTools}>
                <a className={styles.utilityButton} href={knowledgeBaseHref}>
                  قاعدة المعرفة
                </a>
                <a className={styles.utilityButton} href={whatsappHref} target="_blank" rel="noreferrer">
                  واتساب مباشر
                </a>
                <a className={styles.utilityButton} href={contactHref}>
                  نموذج التواصل
                </a>
              </div>

              <form className={styles.ticketForm} action="/contact" method="get">
                <div className={styles.ticketGrid}>
                  <input aria-label="اسم صاحب التذكرة" name="name" placeholder="الاسم" />
                  <input aria-label="رقم واتساب صاحب التذكرة" name="phone" placeholder="رقم الواتساب" />
                </div>
                <textarea aria-label="ملخص المشكلة" name="notes" placeholder="اكتب ملخص المشكلة أو الطلب" rows={3} />
                <button type="submit">إرسال التذكرة</button>
              </form>
            </details>
          </section>
        </details>
      </div>
    </aside>
  );
}
