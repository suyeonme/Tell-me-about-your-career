require("@rushstack/eslint-config/patch/modern-module-resolution");

module.exports = {
  plugins: [],
  rules: [],
  extends: ["@rushstack/eslint-config/profile/web-app"],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {},
};
