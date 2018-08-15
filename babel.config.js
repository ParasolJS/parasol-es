// const presets = [
//   ["@babel/env", {
//     targets: {
//       edge: "17",
//       firefox: "60",
//       chrome: "67",
//       safari: "11.1"
//     },
//     useBuiltIns: "usage"
//   }]
// ];
//
// module.exports = { presets };

// NOTE: in presets make options.modules = false

const pkg = require("./package.json");

module.exports = function () {
  const presets = [
    "@babel/preset-env"
  ];
  const plugins = [
    "@babel/plugin-external-helpers",
    "@babel/plugin-transform-runtime"
  ];

  return {
    presets,
    plugins
  };
}
