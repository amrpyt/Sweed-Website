"use client";

import {
  Activity,
  ArrowLeft,
  Bot,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Command,
  MessageCircle,
  Phone,
  RefreshCcw,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  UsersRound,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useReducer, useState } from "react";
import { demoReducer, initialDemoState, stageLabel, type LeadStage } from "./demo-state";
import styles from "./crm-ai-demo.module.css";

const stages: LeadStage[] = ["new", "qualified", "proposal", "won"];

const money = new Intl.NumberFormat("ar-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

export function CrmAiDemoPage() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const [mobileView, setMobileView] = useState<"pipeline" | "lead" | "agent">("pipeline");
  const selectedLead = state.leads.find((lead) => lead.id === state.selectedLeadId) ?? state.leads[0];

  const metrics = useMemo(() => {
    const openValue = state.leads
      .filter((lead) => lead.stage !== "won")
      .reduce((sum, lead) => sum + lead.value, 0);
    const averageScore = Math.round(
      state.leads.reduce((sum, lead) => sum + lead.score, 0) / state.leads.length,
    );
    return {
      pipeline: openValue,
      qualified: state.leads.filter((lead) => lead.score >= 75).length,
      averageScore,
    };
  }, [state.leads]);

  const runAgentAction = (type: "analyze" | "draft" | "advance") => {
    dispatch({ type: "thinking" });
    window.setTimeout(() => dispatch({ type }), 620);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMobileView("agent");
        document.getElementById("agent-panel")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brandCluster}>
            <Link className={styles.brandMark} href="/" aria-label="العودة إلى SWEED">
              <span className={styles.brandWord}>SWEED</span>
              <span className={styles.productWord}>CRM</span>
            </Link>
            <span className={styles.demoBadge}>Interactive demo</span>
          </div>

          <div className={styles.topbarActions}>
            <button className={styles.commandButton} type="button" onClick={() => setMobileView("agent")}>
              <Command size={16} aria-hidden="true" />
              <span>اسأل الـAgent</span>
              <kbd>⌘ K</kbd>
            </button>
            <button className={styles.iconButton} type="button" onClick={() => dispatch({ type: "reset" })} aria-label="إعادة ضبط الديمو">
              <RefreshCcw size={18} />
            </button>
            <div className={styles.avatar} aria-label="المستخدم الحالي: مريم">م</div>
          </div>
        </header>

        <nav className={styles.mobileTabs} aria-label="أقسام الديمو">
          <MobileTab active={mobileView === "pipeline"} onClick={() => setMobileView("pipeline")}>الفرص</MobileTab>
          <MobileTab active={mobileView === "lead"} onClick={() => setMobileView("lead")}>العميل</MobileTab>
          <MobileTab active={mobileView === "agent"} onClick={() => setMobileView("agent")}>AI Agent</MobileTab>
        </nav>

        <div className={styles.workspace}>
          <aside className={`${styles.rail} ${mobileView !== "pipeline" ? styles.mobileHidden : ""}`}>
            <div className={styles.railHead}>
              <div>
                <span className={styles.metaLabel}>Sales workspace</span>
                <h1>خط المبيعات</h1>
              </div>
              <button className={styles.iconButtonSoft} type="button" aria-label="بحث">
                <Search size={18} />
              </button>
            </div>

            <div className={styles.metricsRow}>
              <Metric icon={<CircleDollarSign size={17} />} label="Pipeline" value={compactMoney(metrics.pipeline)} />
              <Metric icon={<Target size={17} />} label="جاهزين" value={`${metrics.qualified}`} />
              <Metric icon={<TrendingUp size={17} />} label="Score" value={`${metrics.averageScore}`} />
            </div>

            <div className={styles.stageNav}>
              {stages.map((stage) => (
                <div className={styles.stageGroup} key={stage}>
                  <div className={styles.stageHeader}>
                    <span className={`${styles.stageDot} ${styles[`stage_${stage}`]}`} />
                    <strong>{stageLabel(stage)}</strong>
                    <span>{state.leads.filter((lead) => lead.stage === stage).length}</span>
                  </div>
                  <div className={styles.leadList}>
                    {state.leads
                      .filter((lead) => lead.stage === stage)
                      .map((lead) => (
                        <button
                          className={`${styles.leadRow} ${lead.id === state.selectedLeadId ? styles.leadRowActive : ""}`}
                          key={lead.id}
                          type="button"
                          onClick={() => {
                            dispatch({ type: "select", leadId: lead.id });
                            setMobileView("lead");
                          }}
                        >
                          <span className={styles.leadAvatar}>{lead.name.charAt(0)}</span>
                          <span className={styles.leadIdentity}>
                            <strong>{lead.name}</strong>
                            <small>{lead.company}</small>
                          </span>
                          <span className={styles.leadScore}>{lead.score}</span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className={`${styles.detail} ${mobileView !== "lead" ? styles.mobileHidden : ""}`}>
            <div className={styles.detailHeader}>
              <div className={styles.detailIdentity}>
                <div className={styles.bigAvatar}>{selectedLead.name.charAt(0)}</div>
                <div>
                  <span className={styles.metaLabel}>{selectedLead.company}</span>
                  <h2>{selectedLead.name}</h2>
                  <div className={styles.contactLine}>
                    <span><Phone size={14} />{selectedLead.phone}</span>
                    <span><UserRound size={14} />{selectedLead.owner}</span>
                  </div>
                </div>
              </div>
              <div className={styles.detailActions}>
                <button className={styles.secondaryButton} type="button">
                  <Phone size={17} /> اتصال
                </button>
                <button className={styles.primaryButton} type="button" onClick={() => runAgentAction("draft")}>
                  <MessageCircle size={17} /> واتساب
                </button>
              </div>
            </div>

            <div className={styles.scoreStrip}>
              <div className={styles.scoreGauge} style={{ "--score": `${selectedLead.score}%` } as React.CSSProperties}>
                <strong>{selectedLead.score}</strong>
                <span>Lead score</span>
              </div>
              <div className={styles.scoreCopy}>
                <span className={styles.metaLabel}>قراءة سريعة</span>
                <p>{selectedLead.insight}</p>
              </div>
              <button className={styles.inlineAgentButton} type="button" onClick={() => runAgentAction("analyze")}>
                <Sparkles size={17} /> حلّل بالذكاء الاصطناعي
              </button>
            </div>

            <div className={styles.infoGrid}>
              <Info label="قيمة الفرصة" value={money.format(selectedLead.value)} icon={<CircleDollarSign size={17} />} />
              <Info label="المصدر" value={selectedLead.channel} icon={<UsersRound size={17} />} />
              <Info label="آخر تواصل" value={selectedLead.lastTouch} icon={<Clock3 size={17} />} />
              <Info label="الخطوة الجاية" value={selectedLead.nextAction} icon={<ArrowLeft size={17} />} />
            </div>

            <section className={styles.activitySection}>
              <div className={styles.sectionHead}>
                <div>
                  <span className={styles.metaLabel}>Live timeline</span>
                  <h3>النشاط الأخير</h3>
                </div>
                <button className={styles.textButton} type="button">عرض الكل <ChevronDown size={15} /></button>
              </div>
              <div className={styles.timeline}>
                {state.activities.slice(0, 5).map((item) => (
                  <div className={styles.timelineItem} key={item.id}>
                    <span className={`${styles.timelineIcon} ${styles[`kind_${item.kind}`]}`}>
                      {activityIcon(item.kind)}
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <time>{item.time}</time>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside
            id="agent-panel"
            tabIndex={-1}
            className={`${styles.agentPanel} ${mobileView !== "agent" ? styles.mobileHidden : ""}`}
          >
            <div className={styles.agentHeader}>
              <div className={styles.agentIdentity}>
                <span className={styles.agentOrb}><Bot size={19} /></span>
                <div>
                  <strong>SWEED AI Agent</strong>
                  <span><i /> متصل بالـCRM</span>
                </div>
              </div>
              <span className={styles.agentStatus}>Live demo</span>
            </div>

            <div className={styles.agentContext}>
              <span>السياق الحالي</span>
              <strong>{selectedLead.name}</strong>
              <small>{selectedLead.company} · {stageLabel(selectedLead.stage)}</small>
            </div>

            <div className={styles.agentConversation} aria-live="polite">
              <div className={styles.agentMessage}>
                <span className={styles.agentMiniOrb}><Sparkles size={14} /></span>
                <div>
                  {state.agentMode === "thinking" ? (
                    <div className={styles.thinking} aria-label="الـAgent يحلل">
                      <span /><span /><span />
                    </div>
                  ) : (
                    <p>{state.agentMessage}</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.agentActions}>
              <span className={styles.metaLabel}>Quick actions</span>
              <AgentAction
                done={state.completedActions.includes("analyze")}
                icon={<WandSparkles size={18} />}
                title="حلّل فرصة البيع"
                description="أولوية + اعتراضات + الخطوة الجاية"
                onClick={() => runAgentAction("analyze")}
              />
              <AgentAction
                done={state.completedActions.includes("draft")}
                icon={<MessageCircle size={18} />}
                title="جهّز متابعة واتساب"
                description="رسالة مبنية على آخر تفاعل"
                onClick={() => runAgentAction("draft")}
              />
              <AgentAction
                done={state.completedActions.includes("advance")}
                icon={<Activity size={18} />}
                title="حدّث المرحلة"
                description="نفّذ خطوة CRM تجريبية"
                onClick={() => runAgentAction("advance")}
              />
            </div>

            <div className={styles.agentComposer}>
              <div>
                <Sparkles size={16} />
                <span>اسأل عن العميل الحالي...</span>
              </div>
              <button type="button" aria-label="إرسال" onClick={() => runAgentAction("analyze")}>
                <Send size={16} />
              </button>
            </div>

            <p className={styles.demoNote}>ديمو واجهة فقط — كل البيانات والحركات محلية داخل المتصفح.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className={styles.metric}>{icon}<span>{label}</span><strong>{value}</strong></div>;
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className={styles.infoItem}><span className={styles.infoIcon}>{icon}</span><div><small>{label}</small><strong>{value}</strong></div></div>;
}

function AgentAction({ icon, title, description, done, onClick }: { icon: React.ReactNode; title: string; description: string; done: boolean; onClick: () => void }) {
  return (
    <button className={styles.agentAction} type="button" onClick={onClick}>
      <span className={styles.agentActionIcon}>{done ? <Check size={18} /> : icon}</span>
      <span><strong>{title}</strong><small>{description}</small></span>
      <ArrowLeft size={16} />
    </button>
  );
}

function MobileTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button className={active ? styles.mobileTabActive : ""} type="button" onClick={onClick}>{children}</button>;
}

function activityIcon(kind: "message" | "call" | "agent" | "stage") {
  if (kind === "message") return <MessageCircle size={15} />;
  if (kind === "call") return <Phone size={15} />;
  if (kind === "stage") return <TrendingUp size={15} />;
  return <Sparkles size={15} />;
}

function compactMoney(value: number) {
  return `${Math.round(value / 1000)}K`;
}

