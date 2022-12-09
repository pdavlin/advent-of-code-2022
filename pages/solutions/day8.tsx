import SolutionContainer from "../../components/SolutionContainer";

// set example input here
const default1 = `30373
25512
65332
33549
35390
`;
const default2 = default1;

export default function Day8() {
  const p1 = (input) => {
    const inputRows = input.trimEnd().split("\n");
    const vRows = inputRows.length;
    return input
      .trimEnd()
      .split("\n")
      .map((line, vIndex) =>
        line
          .split("")
          .map((tree, hIndex, arr) => {
            if (
              vIndex === 0 ||
              hIndex === 0 ||
              hIndex === arr.length - 1 ||
              vIndex === vRows - 1
            ) {
              return 1;
            } else {
              let visible = false,
                vLess = 0,
                hLess = 0,
                vMore = 0,
                hMore = 0;
              for (let i = 0; i < hIndex; i++) {
                if (arr[i] > hLess) {
                  hLess = +arr[i];
                }
              }
              for (let i = hIndex + 1; i < arr.length; i++) {
                if (arr[i] > hMore) {
                  hMore = +arr[i];
                }
              }
              for (let i = 0; i < vIndex; i++) {
                if (inputRows[i][hIndex] > vLess) {
                  vLess = +inputRows[i][hIndex];
                }
              }
              for (let i = vIndex + 1; i < vRows; i++) {
                if (inputRows[i][hIndex] > vMore) {
                  vMore = +inputRows[i][hIndex];
                }
              }
              visible =
                vLess < +tree ||
                hLess < +tree ||
                vMore < +tree ||
                hMore < +tree;

              return +visible;
            }
          })
          .reduce((a, b) => a + b)
      )
      .reduce((a, b) => a + b);
  };

  const getViewableDistance = (target, trees) => {
    for (let i = 0; i < trees.length; i++) {
      if (trees[i] >= target) {
        return i + 1;
      }
    }
    return trees.length;
  };

  const p2 = (input) => {
    const inputRows = input.trimEnd().split("\n");
    const vRows = inputRows.length;
    return input
      .trimEnd()
      .split("\n")
      .map((line, vIndex) =>
        line.split("").map((tree, hIndex, arr) => {
          if (
            vIndex === 0 ||
            hIndex === 0 ||
            hIndex === arr.length - 1 ||
            vIndex === vRows - 1
          ) {
            return 0;
          } else {
            let vLess = [],
              hLess = [],
              vMore = [],
              hMore = [];
            for (let i = 0; i < hIndex; i++) {
              hLess.push(+arr[i]);
            }
            hLess.reverse();
            for (let i = hIndex + 1; i < arr.length; i++) {
              hMore.push(+arr[i]);
            }
            for (let i = 0; i < vIndex; i++) {
              vLess.push(+inputRows[i][hIndex]);
            }
            vLess.reverse();
            for (let i = vIndex + 1; i < vRows; i++) {
              vMore.push(+inputRows[i][hIndex]);
            }

            return (
              getViewableDistance(+tree, vLess) *
              getViewableDistance(+tree, hLess) *
              getViewableDistance(+tree, vMore) *
              getViewableDistance(+tree, hMore)
            );
          }
        }).reduce((max, value) => Math.max(max, value))
      )
      .reduce((max, value) => Math.max(max, value));
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
