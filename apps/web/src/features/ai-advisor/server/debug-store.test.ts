import { beforeAll, describe, expect, mock, test } from "bun:test";

let getAdvisorDebugSummary: typeof import("./debug-store").getAdvisorDebugSummary;
let listAdvisorDebugEvents: typeof import("./debug-store").listAdvisorDebugEvents;
let recordAdvisorDebugEvent: typeof import("./debug-store").recordAdvisorDebugEvent;

beforeAll(async () => {
  mock.module("server-only", () => ({}));
  ({ getAdvisorDebugSummary, listAdvisorDebugEvents, recordAdvisorDebugEvent } = await import("./debug-store"));
});

describe("advisor debug store", () => {
  test("records advisor events for the local dashboard", () => {
    const beforeCount = listAdvisorDebugEvents().length;

    recordAdvisorDebugEvent({
      request: {
        mode: "advisor",
        message: "advisor package question",
        resourceId: "visitor_123",
        threadId: "thread_456",
        history: [],
      },
      response: {
        message: "growth package",
        recommendation: "growth package",
        cta: { label: "contact", href: "/contact#contact-form" },
        references: ["/offers#offers"],
        fallback: false,
      },
      durationMs: 120,
      status: "ok",
    });

    const events = listAdvisorDebugEvents();
    expect(events).toHaveLength(beforeCount + 1);
    expect(events[0].userMessage).toBe("advisor package question");
    expect(getAdvisorDebugSummary().total).toBe(events.length);
  });
});
