const fs = require("fs");
const { callbackify } = require("util");

const methods = fs
  .readdirSync("./methods", { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((file) => file.name);

const data = methods
  .map((method) => require(`./methods/${method}/dist/result.json`))
  .sort((a, b) => a.average - b.average);

const make_wrapper = (before, after) => (str) => before + str + after;
const prop = (name) => (obj) => obj[name];

const padBoth = (str, width, char = " ") => {
  let itemText = "" + str;
  itemText = itemText.padStart(
    Math.ceil((width - itemText.length) * 0.5) + itemText.length,
    char
  );
  return itemText.padEnd(width, char);
};
const toTable = (
  data,
  headings,
  {
    wrapper = ["| ", " |"],
    delim = " | ",
    heading = { wrapper: ["|-", "-|"], fill: "-", delim: "-|-" },
  } = {}
) => {
  const wrap = make_wrapper(wrapper[0], wrapper[1]);
  const colWidths = Object.fromEntries(
    headings.map((heading) => [
      heading,
      Math.max(
        heading.length,
        ...data.map(prop(heading)).map((col) => ("" + col).length)
      ),
    ])
  );
  return [
    wrap(
      headings.map((name) => padBoth(name, colWidths[name], " ")).join(delim)
    ),
    heading.wrapper[0] +
      headings
        .map((name) => heading.fill.repeat(colWidths[name]))
        .join(heading.delim) +
      heading.wrapper[1],
    data.map((item) =>
      wrap(
        headings
          .map((name) => padBoth(item[name], colWidths[name], " "))
          .join(delim)
      )
    ),
  ]
    .flat()
    .join("\n");
};

console.log(toTable(data, Object.keys(data[0])));
console.log("\n".repeat(3));
console.log("```");
console.table(data);
console.log("```");
