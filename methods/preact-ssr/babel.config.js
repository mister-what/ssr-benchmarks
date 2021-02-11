const { presetEnv } = require("../babel.config-fragments");

module.exports = {
  babelrc: false,
  presets: [presetEnv, "preact"],
};
