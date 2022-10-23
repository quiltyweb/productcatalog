module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"]
};
