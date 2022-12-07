import SolutionContainer from "../../components/SolutionContainer";

// set example input here
const default1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
const default2 = default1;

const getPointsFromCharCode = (charCode) => {
  if (charCode <= 90) {
    return charCode - 38;
  } else {
    return charCode - 96;
  }
};

export default function Day3() {
  const p1 = (input) =>
    input
      .trimEnd()
      .split("\n")
      .map((line) => {
        let [comp1, comp2] = [
          line.substring(0, line.length / 2),
          line.substring(line.length / 2),
        ];
        let match = "";
        comp1.split("").forEach((letter) => {
          if (comp2.includes(letter)) {
            match = letter;
          }
        });
        return getPointsFromCharCode(match.charCodeAt(0));
      })
      .reduce((a, b) => a + b);

  const p2 = (input) => {
    const lines = input.trimEnd().split("\n");
    const groups = [];
    let group = "";
    for (let i = 0; i < lines.length; i++) {
      group = group.length > 0 ? `${group}\n${lines[i]}` : lines[i];
      if (i % 3 === 2) {
        groups.push(group);
        group = "";
      }
    }
    return groups.map(group => {
      let [comp1, comp2, comp3] = group.split("\n");
      let match = "";
      comp1.split("").forEach((letter) => {
        if (comp2.includes(letter) && comp3.includes(letter)) {
          match = letter;
        }
      });
      return getPointsFromCharCode(match.charCodeAt(0));
    }).reduce((a, b) => a + b);
  };

  return (
    <SolutionContainer
      handleSubmission1={p1}
      handleSubmission2={p2}
      defaultInput1={default1}
      defaultInput2={default2}
    />
  );
}
