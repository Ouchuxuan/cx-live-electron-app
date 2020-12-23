module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 不检测语句末尾的分号
    'semi': ['off', 'always'],
    // 关闭函数名称跟括号之间的空格检测
    'space-before-function-paren': 0,
    // 忽略大括号内的空格
    'object-curly-spacing': 0,
    'no-console': 'off',
    'no-debugger': 'off',
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'no-lonely-if': 'off',
    "quotes": 'off',
    "no-tabs": "off",
    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-dupe-keys': 'off',
    'vue/return-in-computed-property': 'off'
  }
}
