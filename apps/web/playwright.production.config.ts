import { defineConfig, devices } from "@playwright/test";

const productionBaseUrl = process.env.PROD_BASE_URL ?? "https://sweed-website.vercel.app";

export default defineConfig({
  testDir: "./tests/smoke",
  testMatch: /production-readiness\.spec\.ts/,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  outputDir: "../../test-results/prod-readiness-playwright",
  use: {
    baseURL: productionBaseUrl,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "production-chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "production-chromium-mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
