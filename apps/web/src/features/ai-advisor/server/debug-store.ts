import "server-only";

import type { AdvisorMode, AdvisorRequest, AdvisorResponse } from "../contracts";

export type AdvisorDebugEvent = {
  id: string;
  createdAt: string;
  mode: AdvisorMode;
  userMessage: string;
  assistantMessage: string;
  recommendation: string;
  references: string[];
  fallback: boolean;
  durationMs: number;
  status: "ok" | "fallback" | "blocked" | "error";
};

const MAX_EVENTS = 80;

const globalStore = globalThis as typeof globalThis & {
  __sweedAdvisorDebugEvents?: AdvisorDebugEvent[];
};

function getStore() {
  globalStore.__sweedAdvisorDebugEvents ??= [];
  return globalStore.__sweedAdvisorDebugEvents;
}

export function recordAdvisorDebugEvent({
  request,
  response,
  durationMs,
  status,
}: {
  request: AdvisorRequest;
  response: AdvisorResponse;
  durationMs: number;
  status: AdvisorDebugEvent["status"];
}) {
  const events = getStore();
  events.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    mode: request.mode,
    userMessage: request.message,
    assistantMessage: response.message,
    recommendation: response.recommendation,
    references: response.references,
    fallback: response.fallback,
    durationMs,
    status,
  });

  if (events.length > MAX_EVENTS) {
    events.length = MAX_EVENTS;
  }
}

export function listAdvisorDebugEvents() {
  return [...getStore()];
}

export function getAdvisorDebugSummary() {
  const events = getStore();
  const fallbackCount = events.filter((event) => event.fallback).length;
  const blockedCount = events.filter((event) => event.status === "blocked").length;
  const averageDurationMs = events.length
    ? Math.round(events.reduce((total, event) => total + event.durationMs, 0) / events.length)
    : 0;

  return {
    total: events.length,
    fallbackCount,
    blockedCount,
    averageDurationMs,
  };
}

