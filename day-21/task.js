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

const keyboard = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  ["#", 0, "A"],
];

const part1 = async () => {
  const { lines } = await getInputs("test2.txt");
  let sum = 0;
  const graph = createGraph(0);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let min = 1000000000000;
    let nextPaths = findPathForRobot(0, keyboard, line, new Point(2, 3)).filter(onlyUnique);
    let index = -1;
    for (let j = 0; j < nextPaths.length; j++) {
      let value = 0;
      const testWord = nextPaths[j];
      for (let k = 1; k < testWord.length; k++) {
        value += calculateDeepValue(graph, testWord[k - 1] + testWord[k], 0, k === 1, {}, 2);
      }
      if (value < min) {
        min = value;
        index = j;
      }
    }
    console.log(min);
    sum += min * (line[0] * 100 + line[1] * 10 + line[2] * 1);
  }
  return sum;
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  let sum = 0;
  const graph = createGraph(0);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let min = 1000000000000;
    let nextPaths = findPathForRobot(0, keyboard, line, new Point(2, 3)).filter(onlyUnique);
    let index = -1;
    for (let j = 0; j < nextPaths.length; j++) {
      let value = 0;
      const testWord = nextPaths[j];
      for (let k = 1; k < testWord.length; k++) {
        value += calculateDeepValue(graph, testWord[k - 1] + testWord[k], 0, k === 1, {}, 25);
      }
      if (value < min) {
        min = value;
        index = j;
      }
    }
    console.log(min);
    sum += min * (line[0] * 100 + line[1] * 10 + line[2] * 1);
  }
  return sum;
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();
};

main();
