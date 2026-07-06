import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const systemChromiumPath = "/usr/bin/chromium-browser";
const chromiumPath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ??
  (existsSync(systemChromiumPath) ? systemChromiumPath : undefined);

export default defineConfig({
  testDir: "./tests/smoke",
  testIgnore: /production-readiness\.spec\.ts/,
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  webServer: {
    command: "bun run dev",
    url: baseUrl,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  use: {
    baseURL: baseUrl,
    trace: "on-first-retry",
    launchOptions: chromiumPath
      ? { executablePath: chromiumPath, args: ["--no-sandbox"] }
      : undefined,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
