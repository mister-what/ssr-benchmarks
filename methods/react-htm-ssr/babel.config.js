const { presetEnv, defaultPlugins } = require("../babel.config-fragments");

module.exports = {
  babelrc: false,
  presets: [presetEnv],
  plugins: defaultPlugins,
};
