import { describe, expect, test } from "bun:test";
import { advisorRequestSchema } from "./contracts";

describe("advisorRequestSchema", () => {
  test("requires stable memory identifiers for advisor conversations", () => {
    const result = advisorRequestSchema.safeParse({
      mode: "advisor",
      message: "advisor package question",
      resourceId: "visitor_123",
      threadId: "thread_456",
      history: [],
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.resourceId).toBe("visitor_123");
      expect(result.data.threadId).toBe("thread_456");
    }
  });

  test("rejects conversation history messages longer than the public contract allows", () => {
    const result = advisorRequestSchema.safeParse({
      mode: "advisor",
      message: "advisor package question",
      resourceId: "visitor_123",
      threadId: "thread_456",
      history: [
        {
          role: "user",
          content: "x".repeat(1_501),
        },
      ],
    });

    expect(result.success).toBe(false);
  });
});
