/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 'no-console': 'off',
    // 'parser': 'vue-eslint-parser',
    semi: 'off',
    quotes: ['error', 'single'],
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'error',
    'accessor-pairs': 'warn',
    'arrow-spacing': [
      'warn',
      {
        before: true,
        after: true,
      },
    ],
    'block-spacing': ['warn', 'always'],
    'brace-style': [
      'warn',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      'warn',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
