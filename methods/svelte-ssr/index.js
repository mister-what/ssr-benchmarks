import RecursiveDivs from "./components/RecursiveDivs.svelte";

export const name = "svelte-ssr";

export default () => {
  /*require("fs").writeFileSync(
    "./dist/test.html",
    RecursiveDivs.render({ depth: 5, breadth: 11 }).html
  )*/
  return () => {
    return RecursiveDivs.render({ depth: 4, breadth: 10 }).html;
  };
};
