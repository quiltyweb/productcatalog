module.exports = {
  root: true,
  env: {
    node: true,
    "jest": true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/camelcase': ["warn"],
    '@typescript-eslint/class-name-casing': ["warn"],
  }
};
