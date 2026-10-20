import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { env } from "./configs/env";

//reads the .feature files, joins them with the steps and returns the folder with the generated tests
const bddTestDir = defineBddConfig({
  features: "tests/bdd/features",
  steps: ["tests/bdd/steps"],
  importTestFrom: "./tests/fixtures/test",
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry: the public demo sites are sometimes slow or unstable */
  retries: process.env.CI ? 2 : 1,
  /* Fewer workers so we do not overload the public demo sites */
  workers: process.env.CI ? 2 : 4,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: env.uiBaseUrl,
    actionTimeout: env.actionTimeout,
    navigationTimeout: 30_000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "chromium", testDir: "./tests/functional", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", testDir: "./tests/functional", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", testDir: "./tests/functional", use: { ...devices["Desktop Safari"] } },
    { name: "unit", testDir: "./tests/unit" },
    { name: "bdd", testDir: bddTestDir, use: { ...devices["Desktop Chrome"] } },
    {
      name: "api",
      testDir: "./tests/api",
      retries: 2,
      use: {
        baseURL: env.apiBaseUrl,
        extraHTTPHeaders: { Accept: "application/json" },
      },
    },
  ],
});
