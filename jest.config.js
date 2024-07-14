/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  clearMocks: true,
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["node_modules", "client", "server", "browser_test"],
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { configFile: "./babel.test.config.js" }],
  },
};
