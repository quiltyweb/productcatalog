const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  viewportHeight: 2000,
  retries: {
    runMode: 2
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/catalog/**/*.spec.{js,ts}",
  }
})
