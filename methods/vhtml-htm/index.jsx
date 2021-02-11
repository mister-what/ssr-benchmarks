/** @jsx h */
export const name = "vhtml-htm";

import h from "vhtml";
import htm from "htm";

const html = htm.bind(h);

const RecursiveDivs = ({ depth = 1, breadth = 1 }) => {
  if (depth <= 0) {
    return <div>abcdefghij</div>;
  }

  let children = new Array(breadth);

  for (let i = 0; i < breadth; i++) {
    children[i] = (
      <RecursiveDivs key={i} depth={depth - 1} breadth={breadth - 1} />
    );
  }

  // vhtml only outputs to HTML, so no onClick here
  return <div>{children}</div>;
};
export default () => {
  return () => <RecursiveDivs depth={4} breadth={10} />;
};
