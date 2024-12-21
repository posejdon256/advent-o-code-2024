const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { preparePaths, findPointIn2D, findPathForRobot, findMinimumLength, calculateScore } = require("./helpers");
const { bfs, prepareVisited } = require("../helpers/bfs");
const { Point } = require("../helpers/points");

const part1 = async () => {
  const { lines } = await getInputs("test2.txt");
  const keyboard = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ["#", 0, "A"],
  ];
  const controller = [
    ["#", "^", "A"],
    ["<", "v", ">"],
  ];
  //<, ^, >, v, A
  const bestPaths = [
    //>_^
    ["", "v<", "<<", "<", "v<<"], //<
    [">^", "", "<^", "^", "<"], //^
    [">>", "v>", "", ">", "v"], //>,
    [">", "v", "<", "", ">^"], //v
    [">>^", ">", ">>", ">^", ""], //A
  ];
  const indexes = {
    "<": 0,
    "^": 1,
    ">": 2,
    v: 3,
    A: 4,
  };
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let min = 1000000;
    let minWord = "";
    let nextPaths = findPathForRobot(0, keyboard, line, new Point(2, 3));
    for (let j = 0; j < nextPaths.length; j++) {
      let nextNextPaths = findPathForRobot(0, controller, nextPaths[j], new Point(2, 0));
      const { minWord: _minWord, minimum } = findMinimumLength(nextNextPaths, controller);
      if (minimum < min) {
        min = minimum;
        minWord = _minWord;
      }
    }
    minWord = "<";
    for (let j = 0; j < 23; j++) {
      let newWord = bestPaths[indexes["A"]][indexes[minWord[0]]];
      for (let k = 1; k < minWord.length; k++) {
        newWord = newWord + bestPaths[indexes[minWord[k]]][indexes[minWord[k - 1]]] + "A";
      }
      console.log("New word", j, minWord.length);
      minWord = newWord;
    }
    console.log("Word", minWord);
    sum += min * (line[0] * 100 + line[1] * 10 + line[2] * 1);
    console.log(min);
  }
  return sum;
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  return 0;
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();
};

main();
