module.exports = {
  'env': { 'browser': true, 'es6': true },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': ['react', '@typescript-eslint'],
  'rules': {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'react/display-name': ['off'],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/member-delimiter-style': ['error', { 'multiline': { 'delimiter': 'none' } }]
  }
}