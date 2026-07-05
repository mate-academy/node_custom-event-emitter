module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-proto': 0,

    'lines-between-class-members': ['error', 'always'],
  },
  plugins: ['jest'],
};
