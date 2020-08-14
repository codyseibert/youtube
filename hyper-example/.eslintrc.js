module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    quotes: ["error", "double"],
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "comma-dangle": "off",
    indent: "off",
    "object-curly-newline": "off",
  },
};
