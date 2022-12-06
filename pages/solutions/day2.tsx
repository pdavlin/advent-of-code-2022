import SolutionContainer from "../../components/SolutionContainer";

const default1 = `A Y
B X
C Z
`;
const default2 = default1;

const mapInputToMove = new Map<string, string>([
  ["A", "R"],
  ["B", "P"],
  ["C", "S"],
  ["X", "R"],
  ["Y", "P"],
  ["Z", "S"],
]);

const mapMoveToPoints = new Map<string, number>([
  ["R", 1],
  ["P", 2],
  ["S", 3],
]);

/**
 * 
 * @param x current move
 * @param y direction to move
 * @returns 
 */
function rolloverMove(x, y: number) {
  const RPS = "RPS";
  return RPS[(RPS.indexOf(x) + 3 + y) % 3];
}

function play(l, r) {
  if (l === r) {
    return 3;
  } else if (rolloverMove(l, 1) === r) { // if l's *sucessor* is r -> r wins
    return 6;
  } else {
    return 0;
  }
}

const mapResultIndicatorToDirection = new Map<string, number>([
  ["X", -1],
  ["Y", 0],
  ["Z", 1]
])

export default function Day2() {
  const p1 = (input) =>
    input
      .trimEnd()
      .split("\n")
      .map((line) => {
        let [l, r] = line.split(" ").map((x) => mapInputToMove.get(x));
        return mapMoveToPoints.get(r) + play(l, r);
      })
      .reduce((a, b) => a + b);

  const p2 = (input) =>
    input
      .trimEnd()
      .split("\n")
      .map((line) => {
        let [l, r] = line.split(" ");
        l = mapInputToMove.get(l);
        r = rolloverMove(l, mapResultIndicatorToDirection.get(r));
        return mapMoveToPoints.get(r) + play(l, r);
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
