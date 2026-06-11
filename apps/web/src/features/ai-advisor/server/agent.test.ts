import { afterEach, beforeAll, describe, expect, mock, test } from "bun:test";

let hasAdvisorModelConfig: typeof import("./agent").hasAdvisorModelConfig;

const originalBaseUrl = process.env.OPENAI_BASE_URL;
const originalApiKey = process.env.OPENAI_API_KEY;
const originalModel = process.env.AI_MODEL;

afterEach(() => {
  process.env.OPENAI_BASE_URL = originalBaseUrl;
  process.env.OPENAI_API_KEY = originalApiKey;
  process.env.AI_MODEL = originalModel;
});

beforeAll(async () => {
  mock.module("server-only", () => ({}));
  ({ hasAdvisorModelConfig } = await import("./agent"));
});

describe("hasAdvisorModelConfig", () => {
  test("reads server AI environment at call time", () => {
    process.env.OPENAI_BASE_URL = "https://example.com/v1";
    process.env.OPENAI_API_KEY = "test-key";
    process.env.AI_MODEL = "gpt-4o-mini";

    expect(hasAdvisorModelConfig()).toBe(true);
  });

  test("normalizes Vercel env values with accidental whitespace", async () => {
    const { getAdvisorRuntimeStatus } = await import("./agent");
    process.env.OPENAI_BASE_URL = "\uFEFFhttps://example.com/v1\r\n";
    process.env.OPENAI_API_KEY = " test-key \n";
    process.env.AI_MODEL = " gpt-4o-mini ";

    expect(getAdvisorRuntimeStatus()).toEqual({
      baseUrl: "https://example.com",
      hasApiKey: true,
      modelId: "gpt-4o-mini",
    });
  });
});
