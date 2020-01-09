module.exports = {
    root: false,
    env: {
      node: true
    },
    extends: [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    rules: {
      "no-console": "off",
    },
    parserOptions: {
      "parser": "babel-eslint"
    }
}