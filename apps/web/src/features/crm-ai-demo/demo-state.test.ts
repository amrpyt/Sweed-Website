import { describe, expect, test } from "bun:test";
import { demoReducer, initialDemoState } from "./demo-state";

describe("guided CRM demo state", () => {
  test("opens on one obvious inbound social-message step", () => {
    expect(initialDemoState.stage).toBe("message");
    expect(initialDemoState.activeScenarioId).toBe("instagram");
    expect(initialDemoState.scenarios.find((scenario) => scenario.id === "instagram")).toMatchObject({
      source: "instagram",
      sourceLabel: "Instagram",
      name: "سارة عادل",
    });
  });

  test("switching the social source resets the story to the first step", () => {
    const progressed = demoReducer(initialDemoState, { type: "advance" });
    const switched = demoReducer(progressed, { type: "select-scenario", scenarioId: "facebook" });

    expect(switched.activeScenarioId).toBe("facebook");
    expect(switched.stage).toBe("message");
    expect(switched.agentMode).toBe("idle");
  });

  test("the first advance reveals a deterministic AI reply", () => {
    const state = demoReducer(initialDemoState, { type: "advance" });
    const scenario = state.scenarios.find((item) => item.id === state.activeScenarioId);

    expect(state.stage).toBe("reply");
    expect(scenario?.aiReply).toContain("إدارة السوشيال");
    expect(scenario?.intent).toBe("مهتم بالخدمة");
  });

  test("the second advance writes the lead into the CRM result state", () => {
    const replied = demoReducer(initialDemoState, { type: "advance" });
    const synced = demoReducer(replied, { type: "advance" });
    const scenario = synced.scenarios.find((item) => item.id === synced.activeScenarioId);

    expect(synced.stage).toBe("crm");
    expect(scenario).toMatchObject({
      score: 86,
      value: 52000,
      service: "إدارة السوشيال ميديا",
    });
  });

  test("reset replays the current scenario from the inbound message", () => {
    const selected = demoReducer(initialDemoState, { type: "select-scenario", scenarioId: "tiktok" });
    const progressed = demoReducer(demoReducer(selected, { type: "advance" }), { type: "advance" });
    const reset = demoReducer(progressed, { type: "reset" });

    expect(reset.activeScenarioId).toBe("tiktok");
    expect(reset.stage).toBe("message");
    expect(reset.agentMode).toBe("idle");
  });
});
