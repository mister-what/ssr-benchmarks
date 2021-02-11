module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },
        shippedProposals: true,
        modules: "commonjs",
      },
    ],
  ],
};
