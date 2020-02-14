import React from "react";
import { renderToString } from "react-dom/server";

const RecursiveDivs = ({ depth = 1, breadth = 1 }) => {
  if (depth <= 0) {
    return <div>abcdefghij</div>;
  }

  let children = [];

  for (let i = 0; i < breadth; i++) {
    children.push(
      <RecursiveDivs key={i} depth={depth - 1} breadth={breadth - 1} />
    );
  }

  return (
    <div
      onClick={() => {
        console.log("clicked");
      }}
    >
      {children}
    </div>
  );
};

const warmUpV8 = () => {
  console.info("Warming up...");

  for (let i = 0; i < 20; i += 1) {
    renderToString(<RecursiveDivs depth={4} breadth={11} />);
  }

  console.info("Finished warming up!");
};

const benchmark = () => {
  let time = [];

  for (let i = 0; i < 10; i += 1) {
    const start = process.hrtime();

    // this renders around 9000 divs
    renderToString(<RecursiveDivs depth={4} breadth={11} />);

    time.push(process.hrtime(start));
  }

  console.info("================ RESULT ================");
  const durations = time.map(t => (t[0] + t[1] / 1e9) * 1e3);

  durations.forEach((d, i) => {
    console.info(`Run ${i} took `, d, "ms");
  });

  console.info(
    "Average is:",
    durations.reduce((a, b) => a + b) / durations.length,
    "ms"
  );
  console.info("================ RESULT ================");
};

warmUpV8();
benchmark();
