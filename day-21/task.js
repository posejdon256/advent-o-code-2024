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
    //A -> < bestPaths[4][0]
    //>_^
    ["", "<v", "<<", "<", "v<<"], //<
    ["^>", "", "<^", "^", "<"], //^
    [">>", ">v", "", ">", "v"], //>,
    [">", "v", "<", "", "<v"], //v
    [">>^", ">", "^", "^>", ""], //A
  ];
  const indexes = {
    "<": 0,
    "^": 1,
    ">": 2,
    v: 3,
    A: 4,
  };
  const bestPathsIn13depth = [];
  let sum = 0;
  //get distances in 12-th depth
  for (let i = 0; i < 5; i++) {
    bestPathsIn13depth.push([]);
    for (let j = 0; j < 5; j++) {
      let word = bestPaths[i][j];
      for (let k = 0; k < 12; k++) {
        let newWord = word.length > 0 ? bestPaths[indexes[word[0]]][indexes["A"]] + "A" : "A";
        for (let m = 1; m < word.length; m++) {
          newWord += bestPaths[indexes[word[m]]][indexes[word[m - 1]]] + "A";
        }
        word = newWord;
      }
      bestPathsIn13depth[i].push({ word, len: word.length });
    }
  }
  console.log(bestPathsIn13depth);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let min = 1000000;
    let minWord = "";
    let minWordPrim = "";
    let prevMinWord = "";
    let nextPaths = findPathForRobot(0, keyboard, line, new Point(2, 3));
    for (let j = 0; j < nextPaths.length; j++) {
      let nextNextPaths = findPathForRobot(0, controller, nextPaths[j], new Point(2, 0));
      const { minWord: _minWord, minimum } = findMinimumLength(nextNextPaths, controller);
      if (minimum < min) {
        min = minimum;
        minWord = nextPaths[i];
        minWordPrim = _minWord;
        prevMinWord = nextPaths[i];
      }
    }
    for (let k = 0; k < 12; k++) {
      // console.log(minWord);
      let newWord = bestPaths[indexes[minWord[0]]][indexes["A"]] + "A";
      if (k === 2) {
        console.log(minWord);
      }
      for (let j = 1; j < minWord.length; j++) {
        newWord = newWord + bestPaths[indexes[minWord[j]]][indexes[minWord[j - 1]]] + "A";
      }
      minWord = newWord;
    }
    let bigSum = 0;
    bigSum += bestPathsIn13depth[indexes[minWord[0]]][indexes["A"]].len + 1;
    for (let j = 1; j < minWord.length; j++) {
      bigSum += bestPathsIn13depth[indexes[minWord[j]]][indexes[minWord[j - 1]]].len + 1;
    }
    sum += bigSum * (line[0] * 100 + line[1] * 10 + line[2] * 1);
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
