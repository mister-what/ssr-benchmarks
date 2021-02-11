export const name = "vanilla-function";

const RecursiveDivs = (depth = 1, breadth = 1) => {
  if (depth <= 0) {
    return `<div>abcdefghij</div>`;
  }

  let children = new Array(breadth);

  for (let i = 0; i < breadth; i++) {
    children[i] = RecursiveDivs(depth - 1, breadth - 1);
  }

  return `<div>${children.join("")}</div>`;
};
export default () => {
  return () => RecursiveDivs(4, 10);
};
