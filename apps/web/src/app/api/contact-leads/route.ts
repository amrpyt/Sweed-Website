import { NextRequest, NextResponse } from "next/server";
import { saveContactLead, type ContactLeadInput } from "@/features/contact-leads/server/contact-lead-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxBodyBytes = 16_384;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 8;
const recentRequests = new Map<string, number[]>();

const limits = {
  name: 120,
  phone: 40,
  interest: 160,
  message: 2000,
  activityType: 160,
  activityLocation: 240,
  requestType: 80,
  selectedProblem: 160,
  selectedService: 160,
  selectedOffer: 160,
  source: 120,
} as const;

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const recent = (recentRequests.get(clientKey) ?? []).filter((timestamp) => now - timestamp < rateLimitWindowMs);
  recent.push(now);
  recentRequests.set(clientKey, recent);
  return recent.length > maxRequestsPerWindow;
}

function parseLead(body: unknown): { lead?: ContactLeadInput; errors?: Record<string, string> } {
  if (!body || typeof body !== "object") {
    return { errors: { form: "بيانات الطلب غير صالحة" } };
  }

  const raw = body as Record<string, unknown>;
  const lead: ContactLeadInput = {
    name: cleanString(raw.name, limits.name),
    phone: cleanString(raw.phone, limits.phone),
    interest: cleanString(raw.interest, limits.interest),
    message: cleanString(raw.message, limits.message),
    activityType: cleanString(raw.activityType, limits.activityType),
    activityLocation: cleanString(raw.activityLocation, limits.activityLocation),
    requestType: cleanString(raw.requestType, limits.requestType),
    selectedProblem: cleanString(raw.selectedProblem, limits.selectedProblem),
    selectedService: cleanString(raw.selectedService, limits.selectedService),
    selectedOffer: cleanString(raw.selectedOffer, limits.selectedOffer),
    source: cleanString(raw.source, limits.source) || "homepage-contact",
  };
  const errors: Record<string, string> = {};

  if (lead.name.length < 2) errors.name = "الاسم مطلوب ويجب أن يكون حرفين على الأقل";
  if (!/^[0-9+()\-\s]{8,40}$/.test(lead.phone)) errors.phone = "رقم الهاتف غير صحيح";
  if (!lead.interest) errors.interest = "اختر الخدمة أو الباقة الأقرب لاحتياجك";
  if (lead.message.length < 10) errors.message = "اكتب رسالة من 10 أحرف على الأقل";

  return Object.keys(errors).length ? { errors } : { lead };
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    return NextResponse.json({ ok: false, errors: { form: "حجم الطلب أكبر من المسموح" } }, { status: 413 });
  }

  const clientKey = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { ok: false, errors: { form: "تم إرسال محاولات كثيرة. انتظر قليلًا ثم جرّب مرة أخرى." } },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "تعذر قراءة بيانات الطلب" } }, { status: 400 });
  }

  if (body && typeof body === "object" && cleanString((body as Record<string, unknown>).website, 200)) {
    return NextResponse.json({ ok: true, leadId: "accepted", forwarded: false }, { status: 201 });
  }

  const parsed = parseLead(body);
  if (!parsed.lead) {
    return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 422 });
  }

  try {
    const saved = await saveContactLead(parsed.lead, {
      userAgent: request.headers.get("user-agent")?.slice(0, 300) || undefined,
      forwardedFor: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 80) || undefined,
    });

    return NextResponse.json({ ok: true, leadId: saved.id, forwarded: saved.forwarded }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "تعذر حفظ الطلب الآن. جرّب مرة أخرى أو استخدم واتساب." } },
      { status: 500 },
    );
  }
}
