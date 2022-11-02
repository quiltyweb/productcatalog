const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  viewportHeight: 2000,
  retries: {
    runMode: 2
  },
  e2e: {
    baseUrl: "http://localhost:3333",
    specPattern: "cypress/e2e/admin/**/*.spec.{js,ts}",
  }
})
