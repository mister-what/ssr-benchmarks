import runner from "./runner";

module.exports = Object.defineProperties(runner, {
  __esModule: {
    writable: false,
    enumerable: false,
    configurable: false,
    value: true,
  },
  default: {
    get() {
      return runner;
    },
    configurable: false,
    enumerable: true,
  },
});
