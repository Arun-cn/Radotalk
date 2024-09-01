import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error', // Ensure Prettier errors are flagged by ESLint
    },
  },
  pluginJs.configs.recommended,
  prettierConfig, // Disable ESLint rules that would conflict with Prettier
];
