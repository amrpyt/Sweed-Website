"use client";

import { Loader2, Play, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { AdvisorResponse } from "./contracts";
import styles from "./automation-demo.module.css";

const scenarios = [
  {
    id: "lead",
    label: "عميل جديد",
    prompt: "عميل كتب: عندي شركة صغيرة وعايز موقع وحملات تجيب عملاء. اعرض ديمو أتمتة مناسب.",
  },
  {
    id: "support",
    label: "سؤال متكرر",
    prompt: "عميل بيسأل كل شوية عن الباقات والخدمات. اعرض ديمو يوضح إزاي AI يرد ويوجهه.",
  },
  {
    id: "automation",
    label: "أتمتة داخلية",
    prompt: "صاحب بيزنس عايز يوفر وقت في فرز العملاء والردود. اعرض ديمو أتمتة عملي.",
  },
];

export function AutomationDemo() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [resourceId] = useState(() => `automation_${crypto.randomUUID()}`);
  const [threadId] = useState(() => `automation_thread_${crypto.randomUUID()}`);
  const [result, setResult] = useState<AdvisorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const activeScenario = scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];

  async function runDemo() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode: "automation-demo",
          message: activeScenario.prompt,
          resourceId,
          threadId,
          history: [],
        }),
      });

      if (!response.ok) {
        throw new Error("Demo request failed");
      }

      setResult((await response.json()) as AdvisorResponse);
    } catch {
      setError("الديمو مش قادر يرد الآن. جرب مرة تانية أو افتح صفحة التواصل.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="ai-automation-demo" className={styles.demo} aria-label="Interactive AI automation demo">
      <div className={styles.copy}>
        <p>SWEED AI Demo</p>
        <h2>جرّب سيناريو أتمتة سريع</h2>
        <span>اختار موقف، والمساعد يشرح إزاي الذكاء الاصطناعي يقدر يساعد العميل خطوة بخطوة.</span>
      </div>

      <div className={styles.workspace}>
        <div className={styles.controls}>
          {scenarios.map((scenario) => (
            <button
              className={activeId === scenario.id ? styles.activeScenario : styles.scenario}
              key={scenario.id}
              type="button"
              onClick={() => {
                setActiveId(scenario.id);
                setResult(null);
                setError("");
              }}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        <div className={styles.promptBox}>
          <span>السيناريو</span>
          <p>{activeScenario.prompt}</p>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={runDemo} disabled={isLoading}>
            {isLoading ? <Loader2 aria-hidden className={styles.spin} size={18} /> : <Play aria-hidden size={18} />}
            تشغيل الديمو
          </button>
          <button type="button" onClick={() => setResult(null)} disabled={isLoading || !result}>
            <RotateCcw aria-hidden size={18} />
            مسح
          </button>
        </div>

        {error ? <p className={styles.error}>{error}</p> : null}
        {result ? (
          <div className={styles.result}>
            <span>رد المساعد</span>
            <p>{result.message}</p>
            <a href={result.cta.href}>{result.cta.label}</a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
