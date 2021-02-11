export const name = "react-ssr";

import React from "react";
import { renderToString } from "react-dom/server";

const clickHandler = () => {
  console.log("clicked");
};
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

  return <div onClick={clickHandler}>{children}</div>;
};

export default () => {
  return () => renderToString(<RecursiveDivs depth={4} breadth={10} />);
};
