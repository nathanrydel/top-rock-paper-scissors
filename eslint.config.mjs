import globals from "globals";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,  // Use TypeScript parser
      parserOptions: {
        project: './tsconfig.json', // Make sure ESLint uses your TypeScript config
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
    },
    plugins: {
      '@typescript-eslint': ts  // Use TypeScript plugin for ESLint
    },
    rules: {
      // Recommended rules for JavaScript and TypeScript
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,

      // Custom rules (add any specific ones you want here)
      '@typescript-eslint/no-unused-vars': 'warn',  // Warn on unused variables
      '@typescript-eslint/explicit-function-return-type': 'off',  // Optional for simplicity
    },
  },
];
