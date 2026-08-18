"use client";

import {
  BotMessageSquare,
  Check,
  CircleCheck,
  Database,
  MessageSquareText,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useReducer } from "react";
import { Button } from "@/components/ui/button";
import {
  demoReducer,
  initialDemoState,
  type DemoScenario,
  type DemoStage,
} from "./demo-state";
import { SourceIcon } from "./source-icon";
import styles from "./crm-ai-demo.module.css";

const money = new Intl.NumberFormat("ar-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

export function CrmAiDemoPage() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const activeScenario = useMemo(
    () => state.scenarios.find((scenario) => scenario.id === state.activeScenarioId) ?? state.scenarios[0],
    [state.activeScenarioId, state.scenarios],
  );

  const handlePrimaryAction = () => {
    if (state.stage === "crm") {
      dispatch({ type: "reset" });
      return;
    }

    dispatch({ type: "thinking" });
    window.setTimeout(() => dispatch({ type: "advance" }), 640);
  };

  return (
    <main className={styles.page}>
      <header className={styles.siteBar}>
        <Link className={styles.brand} href="/" aria-label="العودة إلى SWEED">
          <strong>SWEED</strong>
          <span>CRM + AI Agent</span>
        </Link>
        <div className={styles.demoMeta}>
          <span className={styles.liveDot} />
          <span>ديمو تفاعلي — بدون باك إند</span>
        </div>
      </header>

      <section className={styles.intro} aria-labelledby="demo-title">
        <div className={styles.introCopy}>
          <span className={styles.productTag}><Sparkles size={16} /> SWEED AI Sales</span>
          <h1 id="demo-title">شوف الليد من أول رسالة لحد ما يبقى فرصة بيع.</h1>
          <p>
            اختار قناة، اقرأ رسالة العميل، وخلي الـAI يرد ويسجل كل حاجة في الـCRM قدامك. مفيش شرح طويل ولا إعدادات.
          </p>
        </div>
        <div className={styles.introHint}>
          <span>جرّب بنفسك</span>
          <strong>3 خطوات فقط</strong>
        </div>
      </section>

      <section className={styles.demoFrame} aria-label="تجربة SWEED CRM و AI Agent">
        <header className={styles.frameHeader}>
          <div>
            <span className={styles.frameEyebrow}>اختر مصدر الرسالة</span>
            <nav className={styles.scenarioNav} aria-label="سيناريوهات مصادر العملاء">
              {state.scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  className={scenario.id === activeScenario.id ? styles.scenarioActive : ""}
                  aria-pressed={scenario.id === activeScenario.id}
                  disabled={state.agentMode === "thinking"}
                  onClick={() => dispatch({ type: "select-scenario", scenarioId: scenario.id })}
                >
                  <SourceIcon source={scenario.source} size={17} />
                  <span>{scenario.sourceLabel}</span>
                </button>
              ))}
            </nav>
          </div>

          <button
            className={styles.resetButton}
            type="button"
            onClick={() => dispatch({ type: "reset" })}
            aria-label="إعادة تشغيل السيناريو"
          >
            <RotateCcw size={17} />
            <span>إعادة</span>
          </button>
        </header>

        <ol className={styles.progress} aria-label="مراحل الديمو">
          <ProgressStep index={1} label="رسالة وصلت" state={progressState(state.stage, "message")} />
          <ProgressStep index={2} label="الـAI رد" state={progressState(state.stage, "reply")} />
          <ProgressStep index={3} label="الـCRM اتحدّث" state={progressState(state.stage, "crm")} />
        </ol>

        <div className={styles.stage}>
          <article className={styles.chatPane} aria-label={`محادثة ${activeScenario.name} على ${activeScenario.sourceLabel}`}>
            <header className={styles.chatHeader}>
              <div className={styles.avatar}>{activeScenario.avatar}</div>
              <div className={styles.chatIdentity}>
                <strong>{activeScenario.name}</strong>
                <span>{activeScenario.company}</span>
              </div>
              <div className={styles.sourceBadge}>
                <SourceIcon source={activeScenario.source} size={15} />
                <span>{activeScenario.sourceLabel}</span>
              </div>
            </header>

            <div className={styles.thread} aria-live="polite">
              <div className={styles.inboundMessage}>
                <span className={styles.messageAuthor}>{activeScenario.name}</span>
                <p>{activeScenario.inboundMessage}</p>
                <time>الآن</time>
              </div>

              {state.stage !== "message" && (
                <div className={styles.agentMessage}>
                  <span className={styles.agentAvatar}><BotMessageSquare size={17} /></span>
                  <div>
                    <span className={styles.messageAuthor}>SWEED AI Agent</span>
                    <p>{activeScenario.aiReply}</p>
                    <time>تم الرد فورًا</time>
                  </div>
                </div>
              )}

              {state.agentMode === "thinking" && (
                <div className={styles.thinkingRow} role="status" aria-label="الـAI يحلل الرسالة">
                  <span className={styles.agentAvatar}><Sparkles size={16} /></span>
                  <div className={styles.thinkingDots}><i /><i /><i /></div>
                  <span>الـAI بيقرأ الرسالة والسياق...</span>
                </div>
              )}
            </div>

            <footer className={styles.chatAction}>
              <div>
                <span>{actionHelper(state.stage)}</span>
                <strong>{actionTitle(state.stage)}</strong>
              </div>
              <Button
                type="button"
                className={styles.chatPrimaryAction}
                size="compact"
                icon={state.stage === "crm" ? <RotateCcw size={18} /> : state.stage === "reply" ? <Database size={18} /> : <Sparkles size={18} />}
                disabled={state.agentMode === "thinking"}
                onClick={handlePrimaryAction}
              >
                {actionButtonLabel(state.stage, state.agentMode)}
              </Button>
            </footer>
          </article>

          <aside className={styles.systemPane} aria-live="polite">
            <div className={styles.systemTopline}>
              <div>
                <span className={styles.systemLabel}>SWEED AI</span>
                <strong>{state.stage === "crm" ? "الفرصة جاهزة داخل الـCRM" : "إيه اللي بيحصل ورا الكواليس؟"}</strong>
              </div>
              <span className={styles.systemLive}><i /> LIVE</span>
            </div>

            {state.stage === "crm" ? (
              <CrmResult scenario={activeScenario} />
            ) : (
              <AutomationView scenario={activeScenario} stage={state.stage} thinking={state.agentMode === "thinking"} />
            )}
          </aside>
        </div>
      </section>

      <section className={styles.valueStrip} aria-label="ما الذي يوضحه الديمو">
        <div><MessageSquareText size={19} /><span>كل الرسائل في مكان واحد</span></div>
        <div><BotMessageSquare size={19} /><span>الـAI يفهم ويرد بالسياق</span></div>
        <div><Database size={19} /><span>الـCRM يتحدث تلقائيًا</span></div>
      </section>
    </main>
  );
}

function ProgressStep({ index, label, state }: { index: number; label: string; state: "idle" | "active" | "done" }) {
  return (
    <li className={`${styles.progressStep} ${styles[`progress_${state}`]}`} aria-current={state === "active" ? "step" : undefined}>
      <span>{state === "done" ? <Check size={14} /> : index}</span>
      <strong>{label}</strong>
    </li>
  );
}

function AutomationView({ scenario, stage, thinking }: { scenario: DemoScenario; stage: DemoStage; thinking: boolean }) {
  const replyReady = stage === "reply";
  return (
    <div className={styles.automationView}>
      <div className={styles.intentBlock}>
        <span>نية العميل</span>
        <strong>{replyReady ? scenario.intent : thinking ? "جاري التحليل..." : "لسه مش متصنّف"}</strong>
      </div>

      <div className={styles.automationList}>
        <AutomationRow done={replyReady} active={thinking || stage === "message"} label="فهم الرسالة والسياق" />
        <AutomationRow done={replyReady} active={replyReady} label={`حدد النية: ${replyReady ? scenario.intent : "—"}`} />
        <AutomationRow done={replyReady} active={replyReady} label="كتب رد مناسب للعميل" />
        <AutomationRow done={false} active={replyReady} label="جاهز يسجل الفرصة في الـCRM" />
      </div>

      <p className={styles.systemNote}>
        {replyReady
          ? "الرد اتكتب واترسل. الخطوة الجاية تسجل العميل والفرصة من غير ما الموظف يعيد إدخال البيانات."
          : "اضغط على زر الـAI في المحادثة وشوف التحليل والرد يظهروا هنا لحظيًا."}
      </p>
    </div>
  );
}

function AutomationRow({ done, active, label }: { done: boolean; active: boolean; label: string }) {
  return (
    <div className={`${styles.automationRow} ${active ? styles.automationActive : ""}`}>
      <span className={done ? styles.automationDone : styles.automationIcon}>
        {done ? <Check size={14} /> : <span />}
      </span>
      <strong>{label}</strong>
    </div>
  );
}

function CrmResult({ scenario }: { scenario: DemoScenario }) {
  return (
    <div className={styles.crmResult}>
      <div className={styles.crmSuccess}>
        <CircleCheck size={28} />
        <div>
          <strong>{scenario.name} اتسجل كفرصة بيع</strong>
          <span>{scenario.company} · {scenario.sourceLabel}</span>
        </div>
      </div>

      <dl className={styles.crmFacts}>
        <div><dt>Lead score</dt><dd>{scenario.score}/100</dd></div>
        <div><dt>قيمة الفرصة</dt><dd>{money.format(scenario.value)}</dd></div>
        <div><dt>الخدمة</dt><dd>{scenario.service}</dd></div>
        <div><dt>الخطوة الجاية</dt><dd>{scenario.nextAction}</dd></div>
      </dl>

      <div className={styles.crmFooter}>
        <Check size={16} />
        <span>المصدر، المحادثة، النية والرد اتحفظوا مع العميل تلقائيًا.</span>
      </div>
    </div>
  );
}

function progressState(current: DemoStage, step: DemoStage): "idle" | "active" | "done" {
  const order: DemoStage[] = ["message", "reply", "crm"];
  const currentIndex = order.indexOf(current);
  const stepIndex = order.indexOf(step);
  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "active";
  return "idle";
}

function actionHelper(stage: DemoStage) {
  if (stage === "message") return "الرسالة وصلت. دور الـAI يبدأ هنا.";
  if (stage === "reply") return "الرد اتبعت. دلوقتي حوّل الكلام لفرصة بيع.";
  return "خلصت الدورة كاملة في ثواني.";
}

function actionTitle(stage: DemoStage) {
  if (stage === "message") return "خلّي الـAI يفهم ويرد";
  if (stage === "reply") return "سجّل العميل في الـCRM";
  return "عايز تشوفها تاني؟";
}

function actionButtonLabel(stage: DemoStage, agentMode: "idle" | "thinking") {
  if (agentMode === "thinking") return "الـAI بيشتغل...";
  if (stage === "message") return "شغّل الـAI Agent";
  if (stage === "reply") return "حدّث الـCRM";
  return "ابدأ من الأول";
}
