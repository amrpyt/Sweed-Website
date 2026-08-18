import { describe, expect, test } from "bun:test";
import { demoReducer, initialDemoState } from "./demo-state";

describe("CRM AI demo state", () => {
  test("selecting a lead updates the active context", () => {
    const state = demoReducer(initialDemoState, { type: "select", leadId: "lead-2" });
    expect(state.selectedLeadId).toBe("lead-2");
    expect(state.agentMessage).toContain("سارة عادل");
  });

  test("analysis adds deterministic agent activity", () => {
    const state = demoReducer(initialDemoState, { type: "analyze" });
    expect(state.agentMode).toBe("ready");
    expect(state.completedActions).toContain("analyze");
    expect(state.activities[0]?.kind).toBe("agent");
  });

  test("lead acquisition source stays attached to the CRM record", () => {
    const instagramLead = initialDemoState.leads.find((lead) => lead.id === "lead-2");
    expect(instagramLead).toMatchObject({
      source: "instagram",
      sourceLabel: "Instagram",
      sourceHandle: "@grainhouse.eg",
    });
  });

  test("agent reply adds an outbound social message and activity", () => {
    const selected = demoReducer(initialDemoState, { type: "select", leadId: "lead-2" });
    const replied = demoReducer(selected, { type: "reply" });
    const thread = replied.conversations["lead-2"] ?? [];

    expect(thread.at(-1)).toMatchObject({
      direction: "outbound",
      sender: "agent",
      source: "instagram",
    });
    expect(thread.at(-1)?.text).toContain("إدارة السوشيال");
    expect(replied.completedActions).toContain("reply");
    expect(replied.activities[0]?.title).toBe("AI Agent رد على Instagram");
  });

  test("advance moves a qualified lead to proposal", () => {
    const state = demoReducer(initialDemoState, { type: "advance" });
    expect(state.leads.find((lead) => lead.id === "lead-1")?.stage).toBe("proposal");
  });

  test("reset returns the initial demo state", () => {
    const moved = demoReducer(initialDemoState, { type: "advance" });
    const reset = demoReducer(moved, { type: "reset" });
    expect(reset).toEqual(initialDemoState);
  });
});

