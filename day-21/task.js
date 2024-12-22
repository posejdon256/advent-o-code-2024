const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { preparePaths, findPointIn2D, findPathForRobot, findMinimumLength, calculateScore, getWordFromPrevWord, bestPaths, indexes } = require("./helpers");
const { bfs, prepareVisited } = require("../helpers/bfs");
const { Point } = require("../helpers/points");

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
  //get distances in 13-th depth
  for (let i = 0; i < 5; i++) {
    bestPathsIn13depth.push([]);
    for (let j = 0; j < 5; j++) {
      let word = getWordFromPrevWord(bestPaths[i][j], 13);
      bestPathsIn13depth[i].push({ word, len: word.length });
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let min = 10000000000;
    let minWord = "";
    let nextPaths = findPathForRobot(0, keyboard, line, new Point(2, 3));
    for (let j = 0; j < nextPaths.length; j++) {
      let word = getWordFromPrevWord(nextPaths[j], 13);
      if (word.length < min) {
        min = word.length;
        minWord = word;
      }
    }

    let bigSum = 0;
    bigSum += bestPathsIn13depth[indexes[minWord[0]]][indexes["A"]].len + 1;
    for (let j = 1; j < minWord.length; j++) {
      bigSum += bestPathsIn13depth[indexes[minWord[j]]][indexes[minWord[j - 1]]].len + 1;
    }
    sum += bigSum * (line[0] * 100 + line[1] * 10 + line[2] * 1);
    console.log(bigSum);
  }
  //Result of prt 2
  return sum;
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  return 0;
};

const main = async () => {
  console.log(await part2And1());
  checkUnits();
};

main();
