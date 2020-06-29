module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      },
    ],
    'import/order': 'error',
    'import/no-unresolved': [2, { ignore: ['^@mysharity/'] }],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          props: false,
          req: false,
          res: false,
          args: false,
          ctx: false,
          env: false,
        },
      },
    ],
    // overrides: [
    //   {
    //     files: ['*.{test,spec,story}.ts{,x}'],
    //     rules: {
    //       'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
    //     },
    //   },
    // ],
  },
}
