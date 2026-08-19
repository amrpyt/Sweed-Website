import { appendFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type ContactLeadInput = {
  name: string;
  company?: string;
  phone: string;
  interest: string;
  message: string;
  activityType?: string;
  activityLocation?: string;
  requestType?: string;
  selectedProblem?: string;
  selectedService?: string;
  selectedOffer?: string;
  source?: string;
};

type ContactLeadRecord = ContactLeadInput & {
  id: string;
  createdAt: string;
  forwarded: boolean;
  userAgent?: string;
  forwardedFor?: string;
};

const defaultLeadPath = path.join(homedir(), ".local", "share", "sweed", "contact-leads.jsonl");

function getLeadPath() {
  return process.env.SWEED_CONTACT_LEADS_PATH?.trim() || defaultLeadPath;
}

async function forwardLead(record: Omit<ContactLeadRecord, "forwarded">) {
  const webhookUrl = process.env.SWEED_CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function saveContactLead(
  input: ContactLeadInput,
  metadata: Pick<ContactLeadRecord, "userAgent" | "forwardedFor"> = {},
) {
  const baseRecord = {
    ...input,
    ...metadata,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const forwarded = await forwardLead(baseRecord);
  const record: ContactLeadRecord = { ...baseRecord, forwarded };
  const leadPath = getLeadPath();

  await mkdir(path.dirname(leadPath), { recursive: true, mode: 0o700 });
  await appendFile(leadPath, `${JSON.stringify(record)}\n`, { encoding: "utf8", mode: 0o600 });

  return { id: record.id, forwarded: record.forwarded };
}
