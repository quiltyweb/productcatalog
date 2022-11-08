module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "objectLiteralProperty",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        filter: {
          regex: ".+_plural",
          match: false,
        },
      },
    ],
  },
};
