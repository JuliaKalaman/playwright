import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testDir: './tests/registration_form',
  testDir: './tests',
  // testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  // globalSetup: 'global-setup.ts',
  // globalTeardown: 'global-teardown.ts',
  testIgnore: '**.skip.spec.ts',
  testMatch: '**.spec.ts',
  //outputDir: 'res',
  //timeout: 60 * 1000,

  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    httpCredentials: {
      username: process.env.USER_NAME!,
      password: process.env.USER_PASS!
    },
  },

  // use: {
  //   baseURL: 'http://127.0.0.1:3000',
  //   trace: 'on-first-retry',
  // screenshot: 'only-on-failure',
  // video: 'retain-on-failure',
  // },

  /* Configure projects for major browsers */

  projects: [
    {
      name: 'login',
      testDir: './tests/setup',
      testMatch: '**.setup.ts',
      use: {
        ...devices['Desktop Chrome'],
      }
    },
    {
      name: 'qauto',
      testMatch: '**qauto.spec.ts',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'example',
      testDir: './tests/storage',
      testMatch: '**.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'session-storage.json',
      },
      dependencies: ['login']
    },
    {
      name: 'fixtures',
      testDir: './tests/fixture',
      testMatch: '**.spec.ts',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'api-tests',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/api',
      testMatch: '**.spec.ts',
    }
  ],

  // projects: [
  //   {
  //     name: 'qauto',
  //     testMatch: '**qauto.spec.ts',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //       headless: false,
  //       baseURL: 'https://qauto.forstudy.space/',
  //       httpCredentials: {
  //         username: 'guest',
  //         password: 'welcome2qauto',
  //       }
  //     }
  //   },
  // {
  //   name: 'chromium',
  //   use: { ...devices['Desktop Chrome'] },
  // },

  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },

  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
