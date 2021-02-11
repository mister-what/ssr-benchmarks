#!/usr/bin/env node
import { command } from "yargs";
import { resolve, dirname } from "path";
import Module, { _nodeModulePaths, _resolveLookupPaths } from "module";
import { readFileSync } from "fs";
import makeBenchmark from "./runner.js";

const args = command("$0 <files..>", "Run benchmark with these modules.")
  .option("suite-name", {
    alias: "n",
    describe: "The name of the test run",
    demandOption: false,
  })
  .config("test-cases", "Load test cases from this file", (configPath) => {
    const id = resolve(process.cwd(), configPath);
    const source = readFileSync(id, "utf8");
    const testCases = new Module(id);
    testCases.filename = id;
    testCases.path = dirname(id);
    testCases.paths = [
      _nodeModulePaths(process.cwd()),
      _resolveLookupPaths(process.cwd()),
    ].flat();
    testCases._compile(source, id);
    return { test_cases: testCases.exports };
  })
  .help().argv;

makeBenchmark(args.files, { suiteName: args.suiteName });
