module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    eqeqeq: 'warn',
    'prettier/prettier': ['warn', { singleQuote: true, printWidth: 120 }],
  },
};
