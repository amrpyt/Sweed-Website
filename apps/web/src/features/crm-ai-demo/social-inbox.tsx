import { BadgeCheck, BotMessageSquare, Inbox, Send, Sparkles } from "lucide-react";
import type { DemoConversationMessage, DemoLead } from "./demo-state";
import { SourceIcon } from "./source-icon";
import styles from "./crm-ai-demo.module.css";

type SocialInboxProps = {
  lead: DemoLead;
  messages: DemoConversationMessage[];
  thinking: boolean;
  replied: boolean;
  onReply: () => void;
};

export function SocialInbox({ lead, messages, thinking, replied, onReply }: SocialInboxProps) {
  return (
    <section className={styles.socialInbox} aria-label={`محادثة ${lead.name} على ${lead.sourceLabel}`}>
      <div className={styles.socialInboxHeader}>
        <div>
          <span className={styles.socialInboxIcon}><Inbox size={17} /></span>
          <div>
            <strong>Unified Social Inbox</strong>
            <span>الـAgent شايف الرسالة ومصدرها وسياق العميل</span>
          </div>
        </div>
        <span className={styles.aiTriage}><Sparkles size={13} /> AI مصنّف</span>
      </div>

      <div className={styles.channelBar}>
        <span className={`${styles.sourceIcon} ${styles[`source_${lead.source}`]}`}>
          <SourceIcon source={lead.source} />
        </span>
        <div>
          <strong>{lead.sourceLabel}</strong>
          <small>{lead.sourceHandle}</small>
        </div>
        <span className={styles.intentBadge}><BadgeCheck size={14} /> {intentLabel(lead.score)}</span>
      </div>

      <div className={styles.socialThread}>
        {messages.map((message) => (
          <div
            className={`${styles.socialMessage} ${message.direction === "outbound" ? styles.socialMessageOutbound : ""}`}
            key={message.id}
          >
            <span className={styles.socialSenderIcon}>
              {message.sender === "agent" ? <BotMessageSquare size={16} /> : <SourceIcon source={message.source} size={15} />}
            </span>
            <div>
              <span>{message.sender === "agent" ? "SWEED AI Agent" : lead.name}</span>
              <p>{message.text}</p>
              <time>{message.time}</time>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.socialReplyButton} type="button" disabled={thinking} onClick={onReply}>
        {thinking ? <Sparkles size={17} /> : replied ? <BadgeCheck size={17} /> : <BotMessageSquare size={17} />}
        <span>{thinking ? "الـAgent بيجهز الرد..." : replied ? "تم الرد — جرّبه مرة تانية" : "خلّي الـAgent يرد"}</span>
        <Send size={15} />
      </button>
    </section>
  );
}

function intentLabel(score: number) {
  if (score >= 90) return "أولوية عالية";
  if (score >= 75) return "فرصة قوية";
  return "محتاج تأهيل";
}
