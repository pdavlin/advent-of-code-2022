import SolutionContainer from "../../components/SolutionContainer";

const default1 = `A X
B X
C X
A Y
B Y
C Y
A Z
B Z
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

function succ(x) {
  const RPS = "RPS";
  return RPS[(RPS.indexOf(x) + 1) % 3];
}

function rolloverMove(x, y) {
  const RPS = "RPS";
  return RPS[(RPS.indexOf(x) + 3 + y) % 3];
}

function play(l, r) {
  if (l === r) {
    return 3;
  } else if (succ(l) === r) {
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
        const choicePoints = mapMoveToPoints.get(r);
        const resultPoints = play(l, r);
        return choicePoints + resultPoints;
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
        const choicePoints = mapMoveToPoints.get(r);
        const resultPoints = play(l, r);
        return choicePoints + resultPoints;
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
