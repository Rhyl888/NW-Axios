import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    parserOptions: {
      project: './tsconfig.json'
    }
  },
  plugins: {
    '@stylistic': stylistic,
    import: importPlugin
  },
  rules: {
    // TypeScript specific
    // '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/consistent-type-imports': 'error',

    // Style
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: true }],
    '@stylistic/indent': ['error', 2],
    '@stylistic/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false }
      }
    ],

    // Import ordering
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],

    // General rules
    // 'no-console': ['warn', { allow: ['warn', 'error'] }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always']
  },
  ignores: ['dist/**', 'node_modules/**', 'coverage/**']
});
