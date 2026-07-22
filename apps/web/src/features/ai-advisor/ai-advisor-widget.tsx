"use client";

import { FormEvent, useId, useState } from "react";
import { Bot, MessageCircle, SendHorizonal } from "lucide-react";
import { homepageContent } from "@/content/homepage";
import styles from "./ai-advisor.module.css";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const titleId = "sweed-ai-advisor-title";
const knowledgeBaseHref = "/#faq";
const contactHref = "/#contact";
const quickPrompts = homepageContent.aiSupport.prompts;

const initialMessage: ChatMessage = {
  role: "assistant",
  content: homepageContent.aiSupport.greeting,
};

export function AiAdvisorWidget() {
  const resourceId = useId();
  const threadId = useId();
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticketState, setTicketState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ticketMessage, setTicketMessage] = useState("");

  const sendMessage = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setError("");
    setDraft("");

    const approvedPrompt = quickPrompts.find((prompt) => prompt.question === trimmed);
    if (approvedPrompt) {
      setMessages((current) => [
        ...current,
        { role: "user", content: trimmed },
        { role: "assistant", content: approvedPrompt.answer },
      ]);
      return;
    }

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

  const handleTicketSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setTicketState("submitting");
    setTicketMessage("");

    try {
      const response = await fetch("/api/contact-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          interest: "support-ticket",
          message: formData.get("notes"),
          source: "ai-support-ticket",
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; errors?: Record<string, string> };

      if (!response.ok || !payload.ok) {
        throw new Error(Object.values(payload.errors ?? {}).join(" ") || "تعذر إرسال التذكرة");
      }

      form.reset();
      setTicketState("success");
      setTicketMessage("تم تسجيل التذكرة بنجاح. سيتواصل معك الفريق في أقرب وقت.");
    } catch (ticketError) {
      setTicketState("error");
      setTicketMessage(ticketError instanceof Error ? ticketError.message : "تعذر إرسال التذكرة الآن.");
    }
  };

  return (
    <aside className={styles.root} aria-label="SWEED support center">
      <div className={styles.stack}>
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

            <div className={styles.choiceIntro}>اسأل عن الخدمات أو الباقات، أو سيب بياناتك عشان الفريق يتواصل معاك.</div>

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
                    <button key={prompt.question} type="button" onClick={() => void sendMessage(prompt.question)} disabled={isLoading}>
                      {prompt.question}
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
                  autoComplete="off"
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
                <a className={styles.utilityButton} href={contactHref}>
                  نموذج التواصل
                </a>
                <a className={styles.utilityButton} href={homepageContent.contact.whatsappHref} target="_blank" rel="noreferrer">
                  واتساب
                </a>
              </div>

              <form className={styles.ticketForm} data-testid="sweed-support-ticket-form" onSubmit={handleTicketSubmit}>
                <div className={styles.ticketGrid}>
                  <input
                    aria-label="اسم صاحب التذكرة"
                    autoComplete="name"
                    minLength={2}
                    name="name"
                    placeholder="الاسم"
                    required
                  />
                  <input
                    aria-label="رقم واتساب صاحب التذكرة"
                    autoComplete="tel"
                    inputMode="tel"
                    minLength={8}
                    name="phone"
                    placeholder="رقم الواتساب"
                    required
                  />
                </div>
                <textarea
                  aria-label="ملخص المشكلة"
                  minLength={10}
                  name="notes"
                  placeholder="اكتب ملخص المشكلة أو الطلب"
                  required
                  rows={3}
                />
                <button type="submit" disabled={ticketState === "submitting"}>
                  {ticketState === "submitting" ? "جاري الإرسال..." : "إرسال التذكرة"}
                </button>
                <p aria-live="polite" data-ticket-state={ticketState}>{ticketMessage}</p>
              </form>
            </details>
          </section>
        </details>
      </div>
    </aside>
  );
}
