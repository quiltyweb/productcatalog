const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:3333",
    specPattern: "cypress/e2e/admin/**/*.spec.{js,ts}",
  }
})
