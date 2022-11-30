const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/catalog/**/*.spec.{js,ts}",
  }
})
