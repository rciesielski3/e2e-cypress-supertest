const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    supportFile: "cypress/support/e2e.js",
    // The public SUT occasionally answers 503 / "queue full" under load.
    // Retry the request under the hood and re-run failed tests in `cypress run`.
    retries: { runMode: 2, openMode: 0 },
    retryOnStatusCodeFailure: true,
    pageLoadTimeout: 60000,
    // Third-party ad/tracking hosts slow the site down and overlay the UI.
    blockHosts: [
      "*.googlesyndication.com",
      "*.doubleclick.net",
      "*.googleadservices.com",
      "*.adtrafficquality.google",
      "securepubads.g.doubleclick.net",
    ],
  },
});
