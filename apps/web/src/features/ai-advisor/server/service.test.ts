import { beforeAll, describe, expect, mock, test } from "bun:test";

let askSweedAdvisor: typeof import("./service").askSweedAdvisor;

beforeAll(async () => {
  mock.module("server-only", () => ({}));
  ({ askSweedAdvisor } = await import("./service"));
});

describe("askSweedAdvisor", () => {
  test("blocks sensitive visitor data before any model call", async () => {
    const response = await askSweedAdvisor({
      mode: "advisor",
      message: "password 123456 and I want a package",
      resourceId: "visitor_123",
      threadId: "thread_456",
      history: [],
    });

    expect(response.fallback).toBe(false);
    expect(response.cta.href).toBe("/contact");
  });

  test("returns a useful local recommendation when no model provider is configured", async () => {
    const response = await askSweedAdvisor({
      mode: "advisor",
      message: "محتاج خطة تسويق لمشروع جديد",
      resourceId: "visitor_local",
      threadId: "thread_local",
      history: [],
    });

    expect(response.fallback).toBe(true);
    expect(response.message).toContain("تحديد العرض والجمهور");
    expect(response.recommendation).toContain("باقة نمو");
    expect(response.cta.href).toBe("/contact");
  });
});

describe("buildAdvisorGenerateOptions", () => {
  test("uses stable identifiers and only recalls the last 5 messages", async () => {
    const { buildAdvisorGenerateOptions } = await import("./service");

    expect(
      buildAdvisorGenerateOptions({
        mode: "advisor",
        message: "advisor package question",
        resourceId: "visitor_123",
        threadId: "thread_456",
        history: [],
      }),
    ).toEqual({
      memory: {
        resource: "visitor_123",
        thread: "thread_456",
        options: {
          lastMessages: 5,
        },
      },
    });
  });
});

describe("buildAdvisorPrompt", () => {
  test("does not inject hard-coded SWEED knowledge into the model prompt", async () => {
    const { buildAdvisorPrompt } = await import("./service");

    const prompt = buildAdvisorPrompt({
      mode: "advisor",
      message: "advisor package question",
      resourceId: "visitor_123",
      threadId: "thread_456",
      history: [],
    });

    expect(prompt).not.toContain("SWEED KNOWLEDGE");
    expect(prompt).not.toContain("Contact: phone");
    expect(prompt).toContain("VISITOR MESSAGE:");
    expect(prompt).toContain("advisor package question");
  });

  test("includes the recent browser conversation in the advisor prompt", async () => {
    const { buildAdvisorPrompt } = await import("./service");

    const prompt = buildAdvisorPrompt({
      mode: "advisor",
      message: "recommend again",
      resourceId: "visitor_123",
      threadId: "thread_456",
      history: [
        { role: "user", content: "first" },
        { role: "assistant", content: "second" },
        { role: "user", content: "third" },
        { role: "assistant", content: "fourth" },
        { role: "user", content: "fifth" },
        { role: "assistant", content: "sixth" },
      ],
    });

    expect(prompt).not.toContain("USER: first");
    expect(prompt).toContain("ASSISTANT: second");
    expect(prompt).toContain("USER: fifth");
    expect(prompt).toContain("VISITOR MESSAGE:\nrecommend again");
  });
});

describe("sanitizeAdvisorText", () => {
  test("normalizes bare public SWEED links to internal routes", async () => {
    const { sanitizeAdvisorText } = await import("./service");

    expect(sanitizeAdvisorText("open sweed.com/offers#offers now")).toBe("open /offers#offers now");
  });

  test("normalizes invented SWEED-like bare domains to supported routes", async () => {
    const { sanitizeAdvisorText } = await import("./service");

    expect(sanitizeAdvisorText("start: sweedbot.com/packages")).toBe("start: /offers");
    expect(sanitizeAdvisorText("start: https://sweed.swiss/business-starter")).toBe("start: /offers");
    expect(sanitizeAdvisorText("email info@sweed.com for details")).toBe("email info@sweed.com for details");
  });

  test("removes invented public SWEED domains from markdown links", async () => {
    const { sanitizeAdvisorText } = await import("./service");

    expect(sanitizeAdvisorText("details: [Scale](https://www.sweed.ai/scale)")).toBe("details: Scale");
    expect(sanitizeAdvisorText("start: [offers](https://sweed.io/offers#offers)")).toBe("start: offers");
  });

  test("removes unsupported internal routes invented by the model", async () => {
    const { sanitizeAdvisorText } = await import("./service");

    expect(sanitizeAdvisorText("start here: /scale")).toBe("start here: /offers");
    expect(sanitizeAdvisorText("read more: /social-media")).toBe("read more: /services/digital-marketing");
    expect(sanitizeAdvisorText("try it: /demo")).toBe("try it: /crm-ai-demo");
    expect(sanitizeAdvisorText("launch: /website-ai-launch")).toBe("launch: /services/software-development");
  });

  test("adds pricing confirmation when the visitor asks for a price and the model omits it", async () => {
    const { enforceAdvisorAnswerPolicy } = await import("./service");

    expect(enforceAdvisorAnswerPolicy("باقة Scale مناسبة لك.", "هل لها سعر ثابت؟")).toContain(
      "أي سعر نهائي يحتاج تأكيد من فريق SWEED",
    );
  });

  test("keeps markdown links readable without duplicated raw URLs", async () => {
    const { sanitizeAdvisorText } = await import("./service");

    expect(sanitizeAdvisorText("see [/offers#offers](/offers#offers).")).toBe("see [/offers#offers](/offers#offers).");
  });

  test("normalizes angle-wrapped internal routes from model output", async () => {
    const { sanitizeAdvisorText } = await import("./service");

    expect(sanitizeAdvisorText("contact us at </contact#contact-form>.")).toBe("contact us at /contact.");
  });
});
