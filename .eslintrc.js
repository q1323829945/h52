module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['prettier'],
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    Vuex: true,
    axios: true,
    echarts: true,
    VueRouter: true
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
