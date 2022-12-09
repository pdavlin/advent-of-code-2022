import SolutionContainer from "../../components/SolutionContainer";

// set example input here
const default1 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;
const default2 = default1;

const buildTree = (input) => {
  const d: { [key: string]: number } = {};
  const c: Array<string> = [];
  input.split("\n").forEach((l) => {
    if (l.startsWith("$ cd ")) {
      l.includes("..") ? c.pop() : c.push(l.split("$ cd ")[1]);
    } else if (/^\d/.test(l)) {
      const a: Array<string> = [...c];
      while (a.length) {
        const k = a.join("_");
        d[k] = (d[k] || 0) + Number(l.split(" ")[0]);
        a.pop();
      }
    }
  });
  return d;
};

export default function Day7() {
  const p1 = (input) =>
    Int32Array.from(Object.values(buildTree(input))).reduce(
      (a, b) => (b < 100000 ? a + b : a),
      0
    );

  const p2 = (input) => {
    const tree = buildTree(input);
    return Int32Array.from(Object.values(tree))
      .filter((v) => v >= 30000000 - (70000000 - tree["/"]))
      .sort()[0]};

  return (
    <SolutionContainer
      handleSubmission1={p1}
      handleSubmission2={p2}
      defaultInput1={default1}
      defaultInput2={default2}
    />
  );
}
