module.exports = {
  extends: ['stylelint-config-prettier', 'stylelint-config-recess-order'],
  rules: {
    // at-rule-no-unknown: 屏蔽一些scss等语法检查
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content'] }],
    // 禁止特异性较低的选择器在特异性较高的选择器之后重写
    'no-descending-specificity': null,
    // 不检查空文件
    'no-empty-source': null,
    // 忽略自定义选择器
    'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
    // 不检查iconfont family
    'font-family-no-missing-generic-family-keyword': null
  }
}
