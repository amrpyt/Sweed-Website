import "server-only";

import { ConvexHttpClient } from "convex/browser";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { api } from "../../../../convex/_generated/api";
import { getWorkspaceRoot } from "@/lib/workspace-root";
import {
  defaultOfferFunnelSettings,
  offerFunnelSettingsSchema,
  repairCorruptedOfferFunnelSettings,
  type OfferFunnelSettings,
} from "../contracts";

const SETTINGS_KEY = "default";

function getSettingsPath() {
  if (process.env.OFFER_FUNNEL_SETTINGS_PATH) {
    return process.env.OFFER_FUNNEL_SETTINGS_PATH;
  }

  return join(/* turbopackIgnore: true */ getWorkspaceRoot(), ".mastra-data", "offer-funnel-settings.json");
}

function getConvexUrl() {
  return process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
}

function getConvexClient() {
  const convexUrl = getConvexUrl();
  return convexUrl ? new ConvexHttpClient(convexUrl) : null;
}

async function getFileOfferFunnelSettings(): Promise<OfferFunnelSettings> {
  const path = getSettingsPath();

  try {
    const file = await readFile(path, "utf8");
    return repairCorruptedOfferFunnelSettings(offerFunnelSettingsSchema.parse(JSON.parse(file)));
  } catch {
    return defaultOfferFunnelSettings;
  }
}

async function saveFileOfferFunnelSettings(input: unknown): Promise<OfferFunnelSettings> {
  const nextSettings = offerFunnelSettingsSchema.parse(input);
  const path = getSettingsPath();
  const tempPath = `${path}.tmp`;

  await mkdir(dirname(path), { recursive: true });
  await writeFile(tempPath, `${JSON.stringify(nextSettings, null, 2)}\n`, "utf8");
  await rename(tempPath, path);

  return nextSettings;
}

export async function getOfferFunnelSettings(): Promise<OfferFunnelSettings> {
  const client = process.env.OFFER_FUNNEL_SETTINGS_PATH ? null : getConvexClient();

  if (!client) {
    return getFileOfferFunnelSettings();
  }

  const stored = await client.query(api.offerFunnelSettings.get, { key: SETTINGS_KEY });
  if (!stored) {
    return defaultOfferFunnelSettings;
  }

  return repairCorruptedOfferFunnelSettings(offerFunnelSettingsSchema.parse(JSON.parse(stored.valueJson)));
}

export async function saveOfferFunnelSettings(input: unknown): Promise<OfferFunnelSettings> {
  const nextSettings = offerFunnelSettingsSchema.parse(input);
  const client = process.env.OFFER_FUNNEL_SETTINGS_PATH ? null : getConvexClient();

  if (!client) {
    return saveFileOfferFunnelSettings(nextSettings);
  }

  await client.mutation(api.offerFunnelSettings.save, {
    key: SETTINGS_KEY,
    valueJson: JSON.stringify(nextSettings),
  });

  return nextSettings;
}
