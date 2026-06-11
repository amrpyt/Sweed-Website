import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { defaultOfferFunnelSettings, offerFunnelSettingsSchema, type OfferFunnelSettings } from "../contracts";

function getSettingsPath() {
  if (process.env.OFFER_FUNNEL_SETTINGS_PATH) {
    return process.env.OFFER_FUNNEL_SETTINGS_PATH;
  }

  return join(/* turbopackIgnore: true */ process.cwd(), ".mastra-data", "offer-funnel-settings.json");
}

export async function getOfferFunnelSettings(): Promise<OfferFunnelSettings> {
  const path = getSettingsPath();

  try {
    const file = await readFile(path, "utf8");
    return offerFunnelSettingsSchema.parse(JSON.parse(file));
  } catch {
    return defaultOfferFunnelSettings;
  }
}

export async function saveOfferFunnelSettings(input: unknown): Promise<OfferFunnelSettings> {
  const nextSettings = offerFunnelSettingsSchema.parse(input);
  const path = getSettingsPath();
  const tempPath = `${path}.tmp`;

  await mkdir(dirname(path), { recursive: true });
  await writeFile(tempPath, `${JSON.stringify(nextSettings, null, 2)}\n`, "utf8");
  await rename(tempPath, path);

  return nextSettings;
}
