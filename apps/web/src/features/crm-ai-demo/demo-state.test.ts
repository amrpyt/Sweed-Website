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

