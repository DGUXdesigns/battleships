import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  {
    rules: {
      'prettier/prettier': 'off', // Treat Prettier formatting issues as errors
      'capitalized-comments': ['error', 'always'],
      eqeqeq: ['error', 'always'], // Enforce strict equality (===)
      'no-console': 'warn', // Warn when console.log is used
      'no-unused-vars': 'warn',
    },
  },
];
