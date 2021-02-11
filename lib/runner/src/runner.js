import { add, suite, save, complete, cycle } from "benny";
import path from "path";

const makeBenchmarks = (
  filePaths,
  {
    suiteName = `Benchmark`,
    testCases = { "": null },
    initCount,
    minSamples,
    minTime,
  } = {}
) =>
  Promise.all(
    filePaths.map((filePath) =>
      import(path.resolve(process.cwd(), filePath))
        .then(({ default: getTestFn, name, skip = false, only = false }) => {
          return Object.entries(testCases).map(([caseName, arg]) => {
            if (skip) {
              return add.skip(
                add(
                  [name, caseName].filter(Boolean).join(" - "),
                  () => getTestFn(arg),
                  {
                    initCount: initCount ?? 10,
                    minSamples: minSamples ?? 5,
                    minTime: minTime ?? 1,
                  }
                )
              );
            }
            if (only) {
              return add.only(
                [name, caseName].filter(Boolean).join(" - "),
                () => getTestFn(arg),
                {
                  initCount: initCount ?? 10,
                  minSamples: minSamples ?? 5,
                  minTime: minTime ?? 1,
                }
              );
            }
            return add(
              [name, caseName].filter(Boolean).join(" - "),
              () => getTestFn(arg),
              {
                initCount: initCount ?? 10,
                minSamples: minSamples ?? 5,
                minTime: minTime ?? 1,
              }
            );
          });
        })
        .then((arr) => arr.flat())
    )
  ).then((tests) =>
    suite(
      suiteName +
        " - " +
        new Date()
          .toISOString()
          .replace("T", " ")
          .replace(/\.\d+Z$/, ""),
      ...tests.flat(),
      cycle(),
      complete(),
      save({
        file: `chart-${new Date().toISOString()}`,
        folder: path.resolve(process.cwd(), "results"),
        format: "chart.html",
      }),
      save({
        file: `benchmark-${new Date().toISOString()}`,
        folder: path.resolve(process.cwd(), "results"),
        format: "csv",
      })
    )
  );
export default makeBenchmarks;
