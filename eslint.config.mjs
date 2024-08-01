import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import jsoncPlugin from 'eslint-plugin-jsonc'
import tsParser from '@typescript-eslint/parser'
import jsoncParser from 'jsonc-eslint-parser'

export default [
	// Typescript/Javascript files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['app/javascript/**/*'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        'typescript': {},
      },
      'jsx-a11y': {
        'polymorphicPropName': 'component',
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@stylistic/js': stylisticJs,
      '@stylistic/jsx': stylisticJsx,
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      '@stylistic/ts/indent': ['error', 'tab', {
        SwitchCase: 1,
        VariableDeclarator: 'first',
        MemberExpression: 1,
        ArrayExpression: 1,
        ignoredNodes: ['TSTypeParameterInstantiation'],
      }],
      '@stylistic/ts/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
        },
        singleline: {
          delimiter: 'comma',
        },
        multilineDetection: 'brackets',
      }],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'no-unused-vars': ['warn', {
        vars: 'all',
        args: 'none',
      }],
      'no-prototype-builtins': 'off',
      '@stylistic/js/space-infix-ops': 'error',
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/object-curly-spacing': ['error', 'always', {
        objectsInObjects: true,
      }],
      '@stylistic/js/computed-property-spacing': 'error',
      '@stylistic/js/array-bracket-spacing': 'off',
      '@stylistic/js/brace-style': ['error', '1tbs', {
        allowSingleLine: true,
      }],
      'react/boolean-prop-naming': 'error',
      'react/no-typos': 'error',
      '@stylistic/jsx/jsx-curly-spacing': ['error', {
        when: 'always',
        children: true,
      }],
      '@stylistic/jsx/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'allow',
      }],
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'eqeqeq': 'error',
      'no-console': 'warn',
      '@stylistic/js/eol-last': ['error', 'always'],
      '@stylistic/ts/keyword-spacing': ['error', {
        after: true,
        before: true,
        overrides: {
          if: { after: false },
          for: { after: false },
          while: { after: false },
          switch: { after: false },
          catch: { after: false },
        },
      }],
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      'react-hooks/exhaustive-deps': 'off',
    },
  },
	// Typescript declaration files
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@stylistic/ts/indent': 'off',
    },
  },
	// Json files
  {
    files: ['**/*.json', '**/*.jsonc'],
    plugins: {
      jsonc: jsoncPlugin,
    },
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      'jsonc/indent': ['error', 2, { 'ignoredNodes': ['Property'] }],
    },
  },
]