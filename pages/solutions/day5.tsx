import SolutionContainer from "../../components/SolutionContainer";

// set example input here
const default1 = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
const default2 = default1;

export default function Day5() {
  const p1 = input => (
    input
      .split("\n\n")
      .map((block, index) =>
        index === 0
          ? block
              .split("\n")
              .reverse()
              .slice(1)
              .reduce(
                (acc, line) =>
                  acc.map((col, indexCol) => [
                    ...col,
                    line.charAt(indexCol * 4 + 1),
                  ]),
                new Array(Math.round(block.split("\n")[0].length / 4)).fill([])
              )
              .map((col) => col.filter((char) => char !== " "))
          : block
              .split("\n")
              .map((action) => action.match(/ [0-9]+/g))
              .map((actionStrTab) =>
                actionStrTab.map((str) => parseInt(str.trim(), 10))
              )
              .map((actionTab) => ({
                qte: actionTab[0],
                from: actionTab[1],
                to: actionTab[2],
              }))
      )
      .reverse()
      .map((item, idx, tab) =>
        idx === 0
          ? item.forEach((move: { qte: number; from: number; to: number }) =>
              new Array(move.qte)
                .fill(0)
                .forEach((osef) =>
                  tab[1][move.to - 1].push(tab[1][move.from - 1].pop())
                )
            )
          : item
      )[1] as any[]
  ).map((tab) => tab[tab.length - 1]).join("");

  const p2 = null;

  return (
    <SolutionContainer
      handleSubmission1={p1}
      handleSubmission2={p2}
      defaultInput1={default1}
      defaultInput2={default2}
    />
  );
}

class Stack {
  items: string[];
  constructor(init: string[]) {
    this.items = init;
  }

  push(item) {
    this.items.unshift(item);
  }

  pop(item) {
    return this.items.shift();
  }

  peek(item) {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
