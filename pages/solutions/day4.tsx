import SolutionContainer from "../../components/SolutionContainer";

// set example input here
const default1 = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
const default2 = default1;

export default function Day4() {
  const p1 = (input) =>
    input
      .trimEnd()
      .split("\n")
      .map((line) => {
        const [range1, range2] = line.split(",").map((range) => {
          const [min, max] = range.split("-");
          return { min: +min, max: +max };
        });
        if (range1.min <= range2.min && range2.max <= range1.max) {
          return 1;
        } else if (range2.min <= range1.min && range1.max <= range2.max) {
          return 1;
        }
        return 0;
      })
      .reduce((a, b) => a + b);

  const between = (num, min, max) => num >= min && num <= max;

  const p2 = (input) =>
    input
      .trimEnd()
      .split("\n")
      .map((line) => {
        const [range1, range2] = line.split(",").map((range) => {
          const [min, max] = range.split("-");
          return { min: +min, max: +max };
        });
        if (between(range1.min, range2.min, range2.max || between(range1.max, range2.min, range2.max)) ) {
          return 1;
        } else if (between(range2.min, range1.min, range1.max) || between(range2.max, range1.min, range1.max)) {
          return 1;
        } return 0;
      })
      .reduce((a, b) => a + b);

  return (
    <SolutionContainer
      handleSubmission1={p1}
      handleSubmission2={p2}
      defaultInput1={default1}
      defaultInput2={default2}
    />
  );
}
