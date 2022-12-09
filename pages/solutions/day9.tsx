import SolutionContainer from "../../components/SolutionContainer";

// set example input here
const default1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

const default2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;

const violatesConstraints = (head, tail) => {
  return Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1;
};

const signedRoundedAvg = (num) => {
  return num > 0 ? Math.ceil(num / 2) : Math.floor(num / 2);
};

const calculateNext = (head, tail) => {
  if (violatesConstraints(head, tail)) {
    return [
      signedRoundedAvg(head[0] - tail[0]),
      signedRoundedAvg(head[1] - tail[1]),
    ];
  }
  return [0, 0];
};

const directionToCoordChange = new Map<string, number[]>([
  ["R", [1, 0]],
  ["U", [0, 1]],
  ["L", [-1, 0]],
  ["D", [0, -1]],
]);

export default function Day9() {
  const p1 = (input) => {
    let head = [0, 0],
      tail = [0, 0],
      headLast = [0, 0],
      tailLocs = new Map<number, number[]>([[0, [0]]]),
      sumTailLocs = 0;
    input
      .trimEnd()
      .split("\n")
      .map((line) => {
        let commands = [];
        let [dir, dist] = line.split(" ");
        dist = +dist;
        while (dist > 0) {
          commands.push(dir);
          dist--;
        }
        return commands;
      })
      .flat()
      .forEach((dir) => {
        const coordChange = directionToCoordChange.get(dir);
        headLast = head;
        head = [head[0] + coordChange[0], head[1] + coordChange[1]];
        if (violatesConstraints(head, tail)) {
          tail = headLast;
          if (tailLocs.get(tail[0]) === undefined) {
            tailLocs.set(tail[0], [tail[1]]);
          } else if (!tailLocs.get(tail[0]).includes(tail[1])) {
            tailLocs.set(
              tail[0],
              [...tailLocs.get(tail[0]), tail[1]]
                .filter((val, i, arr) => arr.indexOf(val) === i)
                .sort((a, b) => a - b)
            );
          }
        }
      });

    tailLocs.forEach((value, key, map) => {
      sumTailLocs += value.length;
    });

    return sumTailLocs;
  };

  const p2 = (input) => {
    let knots = new Array(10).fill([0, 0]);

    let tailLocs = new Map<number, number[]>([[0, [0]]]);
    let sumTailLocs = 0;
    input
      .trimEnd()
      .split("\n")
      .map((line) => {
        let commands = [];
        let [dir, dist] = line.split(" ");
        dist = +dist;
        while (dist > 0) {
          commands.push(dir);
          dist--;
        }
        return commands;
      })
      .flat()
      .forEach((dir) => {
        let knotsNext = [];
        const coordChange = directionToCoordChange.get(dir);
        knotsNext.push([
          knots[0][0] + coordChange[0],
          knots[0][1] + coordChange[1],
        ]);
        knots.forEach((knot, index, knots) => {
          if (index > 0) {
            const next = calculateNext(knotsNext[index - 1], knot);
            knotsNext.push([knot[0] + next[0], knot[1] + next[1]]);
          }
        });
        knots = knotsNext;
        const tail = knots[knots.length - 1];
        if (tailLocs.get(tail[0]) === undefined) {
          tailLocs.set(tail[0], [tail[1]]);
        } else if (!tailLocs.get(tail[0]).includes(tail[1])) {
          tailLocs.set(
            tail[0],
            [...tailLocs.get(tail[0]), tail[1]]
              .filter((val, i, arr) => arr.indexOf(val) === i)
              .sort((a, b) => a - b)
          );
        }
      });

    tailLocs.forEach((value, key, map) => {
      sumTailLocs += value.length;
    });

    return sumTailLocs;
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
