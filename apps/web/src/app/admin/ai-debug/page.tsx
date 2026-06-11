import type { Metadata } from "next";
import { getAdvisorRuntimeStatus, sweedAdvisorInstructions } from "@/features/ai-advisor/server/agent";
import { listAdvisorDebugEvents, getAdvisorDebugSummary } from "@/features/ai-advisor/server/debug-store";
import { buildSweedKnowledge } from "@/features/ai-advisor/server/knowledge";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "SWEED AI Debug",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

function formatTime(value: string) {
  return new Intl.DateTimeFormat("ar-EG", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AiDebugPage() {
  const runtime = getAdvisorRuntimeStatus();
  const summary = getAdvisorDebugSummary();
  const events = listAdvisorDebugEvents();
  const knowledge = buildSweedKnowledge();
  const isProduction = process.env.NODE_ENV === "production";
  const isExplicitlyEnabled = process.env.AI_DEBUG_DASHBOARD_ENABLED === "true";

  if (isProduction && !isExplicitlyEnabled) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyState}>
          <p>AI Debug</p>
          <h1>الداشبورد مقفول في الإنتاج</h1>
          <span>سجل رسائل العملاء بيانات حساسة. افتحه فقط بعد إضافة تسجيل دخول أو تعيين AI_DEBUG_DASHBOARD_ENABLED=true.</span>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p>Mastra / SWEED AI</p>
          <h1>لوحة متابعة المساعد الذكي</h1>
          <span>سجل محلي سريع للأسئلة والردود والفولباك والبرومبت والمعرفة المستخدمة. البيانات تتصفر مع إعادة تشغيل السيرفر.</span>
        </div>
        <a href="/api/admin/ai-debug">JSON</a>
      </header>

      <section className={styles.statsGrid} aria-label="AI debug stats">
        <article>
          <span>المحادثات</span>
          <strong>{summary.total}</strong>
        </article>
        <article>
          <span>Fallback</span>
          <strong>{summary.fallbackCount}</strong>
        </article>
        <article>
          <span>Blocked</span>
          <strong>{summary.blockedCount}</strong>
        </article>
        <article>
          <span>متوسط الرد</span>
          <strong>{summary.averageDurationMs}ms</strong>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <h2>حالة التشغيل</h2>
          <dl className={styles.definitionList}>
            <div>
              <dt>Model</dt>
              <dd>{runtime.modelId}</dd>
            </div>
            <div>
              <dt>Proxy</dt>
              <dd>{runtime.baseUrl ?? "غير مضبوط"}</dd>
            </div>
            <div>
              <dt>API Key</dt>
              <dd>{runtime.hasApiKey ? "موجود" : "ناقص"}</dd>
            </div>
          </dl>
        </article>

        <article className={styles.panel}>
          <h2>الذاكرة الحالية</h2>
          <p>لسه مفيش ذاكرة دائمة. الموجود الآن هو سجل محلي مؤقت للمحادثات. الذاكرة الدائمة تحتاج Mastra Memory + Storage.</p>
        </article>
      </section>

      <section className={styles.panel}>
        <h2>System Prompt</h2>
        <pre>{sweedAdvisorInstructions.trim()}</pre>
      </section>

      <section className={styles.panel}>
        <h2>مصادر المعرفة</h2>
        <div className={styles.knowledgeGrid}>
          {knowledge.services.map((service) => (
            <article key={service.title}>
              <strong>{service.title}</strong>
              <p>{service.details}</p>
              <span>{service.url}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <h2>سجل رسائل العملاء</h2>
        {events.length ? (
          <div className={styles.events}>
            {events.map((event) => (
              <article className={styles.eventCard} key={event.id}>
                <header>
                  <strong>{event.status}</strong>
                  <span>{formatTime(event.createdAt)} · {event.durationMs}ms · {event.mode}</span>
                </header>
                <div className={styles.messagePair}>
                  <div>
                    <span>العميل</span>
                    <p>{event.userMessage}</p>
                  </div>
                  <div>
                    <span>المساعد</span>
                    <p>{event.assistantMessage}</p>
                  </div>
                </div>
                <footer>
                  <span>{event.recommendation}</span>
                  {event.references.map((reference) => (
                    <a href={reference} key={reference}>{reference}</a>
                  ))}
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>لسه مفيش رسائل. افتح الشات وابعت سؤال، وبعدها اعمل Refresh هنا.</p>
        )}
      </section>
    </main>
  );
}

