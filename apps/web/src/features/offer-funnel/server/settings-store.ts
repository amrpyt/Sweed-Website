import "server-only";

import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import {
  defaultOfferFunnelSettings,
  offerFunnelSettingsSchema,
  repairCorruptedOfferFunnelSettings,
  type OfferFunnelSettings,
} from "../contracts";

const SETTINGS_KEY = "default";
let memoryOfferFunnelSettings: OfferFunnelSettings = defaultOfferFunnelSettings;

function getConvexUrl() {
  return process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
}

function getConvexClient() {
  const convexUrl = getConvexUrl();
  return convexUrl ? new ConvexHttpClient(convexUrl) : null;
}

export function resetMemoryOfferFunnelSettingsForTest() {
  memoryOfferFunnelSettings = defaultOfferFunnelSettings;
}

export async function getOfferFunnelSettings(): Promise<OfferFunnelSettings> {
  const client = getConvexClient();

  if (!client) {
    return memoryOfferFunnelSettings;
  }

  const stored = await client.query(api.offerFunnelSettings.get, { key: SETTINGS_KEY });
  if (!stored) {
    return defaultOfferFunnelSettings;
  }

  return repairCorruptedOfferFunnelSettings(offerFunnelSettingsSchema.parse(JSON.parse(stored.valueJson)));
}

export async function saveOfferFunnelSettings(input: unknown): Promise<OfferFunnelSettings> {
  const nextSettings = offerFunnelSettingsSchema.parse(input);
  const client = getConvexClient();

  if (!client) {
    memoryOfferFunnelSettings = nextSettings;
    return memoryOfferFunnelSettings;
  }

  await client.mutation(api.offerFunnelSettings.save, {
    key: SETTINGS_KEY,
    valueJson: JSON.stringify(nextSettings),
  });

  return nextSettings;
}
