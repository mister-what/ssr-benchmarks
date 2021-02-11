const { presetEnv, defaultPlugins } = require("../babel.config-fragments");
module.exports = {
  babelrc: false,
  presets: [
    presetEnv,
    ["@babel/preset-react", { development: false, useBuiltIns: true }],
  ],
  plugins: [
    defaultPlugins,
    "@babel/plugin-transform-react-constant-elements",
    "@babel/plugin-transform-react-inline-elements",
  ].flat(),
};
