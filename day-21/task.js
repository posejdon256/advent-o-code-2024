const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const {
  preparePaths,
  findPointIn2D,
  findPathForRobot,
  findMinimumLength,
  calculateScore,
  getWordFromPrevWord,
  bestPaths,
  indexes,
  createGraph,
  calculateDeepValue,
} = require("./helpers");
const { bfs, prepareVisited } = require("../helpers/bfs");
const { Point } = require("../helpers/points");
const { onlyUnique } = require("../helpers/array");

const part2And1 = async () => {
  const { lines } = await getInputs("test2.txt");
  const keyboard = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ["#", 0, "A"],
  ];
  const bestPathsIn13depth = [];
  let sum = 0;
  const graph = createGraph();
  // console.log(graph);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let min = 1000000000000;
    let minWord = "";
    let nextPaths = findPathForRobot(0, keyboard, line, new Point(2, 3)).filter(onlyUnique);
    // console.log(nextPaths);
    let index = -1;
    for (let j = 0; j < nextPaths.length; j++) {
      let value = "";
      const testWord = "A" + nextPaths[j];
      for (let k = 1; k < testWord.length; k++) {
        value += calculateDeepValue(testWord[k - 1] + testWord[k], 0, graph);
      }
      console.log(testWord, value);
      if (value < min) {
        min = value;
        index = j;
      }
      // console.log(nextPaths[j]);
    }
    console.log(min);
    sum += min * (line[0] * 100 + line[1] * 10 + line[2] * 1);
    //console.log(bigSum);
  }
  //Result of prt 2
  return { part2: sum };
};

const main = async () => {
  console.log(await part2And1());
  checkUnits();
};

main();
