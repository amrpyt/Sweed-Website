import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    key: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("offerFunnelSettings").withIndex("by_key", (q) => q.eq("key", args.key)).unique();
  },
});

export const save = mutation({
  args: {
    key: v.string(),
    valueJson: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("offerFunnelSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();

    const next = {
      key: args.key,
      valueJson: args.valueJson,
      updatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.replace(existing._id, next);
      return existing._id;
    }

    return await ctx.db.insert("offerFunnelSettings", next);
  },
});
