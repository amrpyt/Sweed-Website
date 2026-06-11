import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  offerFunnelSettings: defineTable({
    key: v.string(),
    valueJson: v.string(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
