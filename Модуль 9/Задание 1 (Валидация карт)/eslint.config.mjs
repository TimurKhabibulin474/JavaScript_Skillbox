import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import jest from 'eslint-plugin-jest';

export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      prettier: prettier,
      jest: jest,
    },
    rules: {
      'no-var': 'error',
      'prettier/prettier': 'error',
    },
    env: {
      'jest/globals': true,
    },
  },
  pluginJs.configs.recommended,
];
