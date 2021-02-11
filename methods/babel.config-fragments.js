module.exports.presetEnv = [
  "@babel/preset-env",
  {
    modules: "commonjs",
    useBuiltIns: "usage",
    corejs: "3",
    shippedProposals: true,
    targets: { node: "current" },
  },
];

module.exports.defaultPlugins = [
  "babel-plugin-macros",
  ["@babel/plugin-proposal-decorators", { legacy: true }],
  "@babel/plugin-proposal-export-default-from",
  "@babel/plugin-proposal-export-namespace-from",
  ["@babel/plugin-transform-runtime", { helpers: true, regenerator: false }],
];
