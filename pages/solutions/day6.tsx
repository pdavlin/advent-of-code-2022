import { arrayBuffer } from "stream/consumers";
import SolutionContainer from "../../components/SolutionContainer";

// set example input here
const default1 = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const default2 = default1;

const getMarkerLocation = (input, markerLen) =>
  input.length -
  input.split(
    input
      .trimEnd()
      .split("")
      .reduce((acc: string[], char: string, index: number) => {
        if (acc.length < markerLen) {
          acc.push(char);
        } else if (
          acc.length >
          acc.filter((val, i, self) => self.indexOf(val) === i).length
        ) {
          acc.push(char);
        }
        if (acc.length > markerLen) {
          acc.shift();
        }
        return acc;
      }, [])
      .join("")
  )[1].length;

export default function Day6() {
  const p1 = (input) => getMarkerLocation(input, 4);

  const p2 = (input) => getMarkerLocation(input, 14);

  return (
    <SolutionContainer
      handleSubmission1={p1}
      handleSubmission2={p2}
      defaultInput1={default1}
      defaultInput2={default2}
    />
  );
}
