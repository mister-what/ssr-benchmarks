/** @jsx h */

import h from "vhtml";

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
export const name = "vhtml";

export default () => {
  return () => {
    return <RecursiveDivs depth={4} breadth={10} />;
  };
};
