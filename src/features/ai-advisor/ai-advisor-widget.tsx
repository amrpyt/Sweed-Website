"use client";

import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { AdvisorMessage, AdvisorResponse } from "./contracts";
import styles from "./ai-advisor.module.css";

const quickPrompts = [
  "عايز أعرف أنسب باقة لشركة صغيرة",
  "إزاي SWEED يساعدني أجيب عملاء أكتر؟",
  "اشرحلي ديمو الذكاء الاصطناعي والأتمتة",
];

const panelId = "sweed-ai-advisor-panel";
const titleId = "sweed-ai-advisor-title";

const initialMessage: AdvisorMessage = {
  role: "assistant",
  content: "أهلا، أنا مساعد SWEED. قل لي هدفك وسأرشح لك أنسب خدمة أو باقة.",
};

function normalizeLinkHref(href?: string) {
  if (!href) return "#";
  if (href.startsWith("/") || href.startsWith("#")) return href;
  return "#";
}

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function getVisitorId() {
  if (typeof window === "undefined") return createId("visitor");

  const storageKey = "sweed-ai-visitor-id";
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;

  const nextId = createId("visitor");
  window.localStorage.setItem(storageKey, nextId);
  return nextId;
}

function AdvisorMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      allowedElements={["p", "strong", "em", "ul", "ol", "li", "a", "br"]}
      components={{
        a({ children, href }) {
          return (
            <a className={styles.markdownLink} href={normalizeLinkHref(href)}>
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export function AiAdvisorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AdvisorMessage[]>([initialMessage]);
  const [resourceId] = useState(getVisitorId);
  const [threadId] = useState(() => createId("thread"));
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const hasVisitorMessage = messages.some((message) => message.role === "user");

  async function sendMessage(message: string) {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: AdvisorMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setDraft("");
    setError("");
    setLastPrompt(trimmed);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode: "advisor",
          message: trimmed,
          resourceId,
          threadId,
          history: nextMessages.slice(-5),
        }),
      });

      if (!response.ok) {
        throw new Error("Advisor request failed");
      }

      const data = (await response.json()) as AdvisorResponse;
      setMessages((current) => [...current, { role: "assistant", content: data.message }]);
    } catch {
      setError("المساعد تعذر عليه الرد الآن. جرب مرة أخرى أو افتح صفحة التواصل.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className={styles.root} aria-label="SWEED AI advisor">
      {isOpen ? (
        <section className={styles.panel} id={panelId} role="dialog" aria-modal="false" aria-labelledby={titleId}>
          <header className={styles.header}>
            <div className={styles.headerText}>
              <p className={styles.eyebrow}>SWEED AI</p>
              <h2 id={titleId}>مساعد اختيار الباقة</h2>
              <p className={styles.status}>
                <span className={styles.statusDot} aria-hidden />
                متاح الآن
              </p>
            </div>
            <button className={styles.iconButton} type="button" aria-label="Close advisor" onClick={() => setIsOpen(false)}>
              <X aria-hidden size={20} />
            </button>
          </header>

          <div className={styles.messages} aria-live="polite">
            {messages.map((message, index) => (
              <div className={message.role === "assistant" ? styles.assistantBubble : styles.userBubble} key={`${message.role}-${index}`}>
                {message.role === "assistant" ? (
                  <span className={styles.botIcon}>
                    <Bot aria-hidden size={16} />
                  </span>
                ) : null}
                <div className={styles.markdown}>
                  <AdvisorMarkdown content={message.content} />
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className={styles.assistantBubble}>
                <span className={styles.typingDots} aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                <p>بفكر في أنسب ترشيح...</p>
              </div>
            ) : null}
          </div>

          {!hasVisitorMessage ? (
            <div className={styles.quickArea}>
              <div className={styles.quickPrompts}>
                {quickPrompts.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => sendMessage(prompt)} disabled={isLoading}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {error ? (
            <div className={styles.error}>
              <p>{error}</p>
              <button type="button" onClick={() => sendMessage(lastPrompt)} disabled={!lastPrompt || isLoading}>
                إعادة المحاولة
              </button>
              <a href="/contact#contact-form">تواصل معنا</a>
            </div>
          ) : null}

          <form
            className={styles.composer}
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
          >
            <input
              aria-label="اكتب رسالتك للمساعد"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="اكتب هدفك أو سؤالك..."
              maxLength={1_500}
            />
            <button type="submit" aria-label="إرسال" disabled={isLoading || !draft.trim()}>
              <Send aria-hidden size={18} />
            </button>
          </form>
        </section>
      ) : null}

      {!isOpen ? (
        <button
          className={styles.launcher}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI advisor"
          aria-controls={panelId}
          aria-expanded={isOpen}
        >
          <span className={styles.launcherIcon}>
            <MessageCircle aria-hidden size={22} />
            <span className={styles.launcherPulse} aria-hidden />
          </span>
          <span className={styles.launcherText}>اسأل SWEED AI</span>
        </button>
      ) : null}
    </aside>
  );
}
