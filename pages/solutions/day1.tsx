import { useState } from "react";
import SolutionContainer from "../../components/SolutionContainer";

const default1 = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

const default2 = default1;

export default function Day1() {
  const p1 = (input) =>
    input
      .trimEnd()
      .split("\n\n")
      .map(
        (paragraph) =>
          paragraph
            .split("\n")
            .map((line) => +line)
            .reduce((a, b) => a + b) // sum
      )
      .reduce((a, b) => Math.max(a, b));

  const p2 = (input) =>
    input
      .trimEnd()
      .split("\n\n")
      .map(
        (paragraph) =>
          paragraph
            .split("\n")
            .map((line) => +line)
            .reduce((a, b) => a + b) // sum
      )
      .sort((a, b) => b - a) // sort descending
      .slice(0, 3) // take top 3
      .reduce((a, b) => a + b); // sum

  return (
    <SolutionContainer
      handleSubmission1={p1}
      handleSubmission2={p2}
      defaultInput1={default1}
      defaultInput2={default2}
    />
  );
}
