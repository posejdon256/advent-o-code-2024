const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { preparePaths, findPointIn2D, findPathForRobot, findMinimumLength } = require("./helpers");
const { bfs, prepareVisited } = require("../helpers/bfs");
const { Point } = require("../helpers/points");

const part1 = async () => {
  const { lines } = await getInputs("test.txt");
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
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let min = 1000000;
    let nextPaths = findPathForRobot(0, keyboard, line, new Point(2, 3), "");
    //console.log(findMinimumLength(findPathForRobot(0, controller, nextPaths[0], new Point(2, 0), ""), controller).minWord);
    // break;
    // console.log("Next paths", nextPaths.length);
    for (let j = 0; j < nextPaths.length; j++) {
      let nextNextPaths = findPathForRobot(0, controller, nextPaths[j], new Point(2, 0), "");

      const { minWord, minimum } = findMinimumLength(nextNextPaths, controller);
      if (minimum < min) {
        min = minimum;
        console.log(minWord, min);
        //console.log(bfs(controller, new Point(2, 0), prepareVisited(controller), ))
      }
    }
    console.log(min);
  }
  const { path } = bfs(keyboard, new Point(2, 3), prepareVisited(keyboard), 7, true, true);
  return;
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
