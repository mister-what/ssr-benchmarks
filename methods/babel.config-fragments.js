module.exports.presetEnv = [
  "@babel/preset-env",
  {
    modules: "commonjs",
    useBuiltIns: "entry",
    corejs: "2",
    exclude: ["es6.promise", "es7.promise.finally"],
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
