const { prepareVisited, bfs } = require("../helpers/bfs");
const { Point } = require("../helpers/points");

const preparePaths = (keyboard = [["A"], 1]) => {
  const possiblePaths = {};
  for (let i = 0; i < keyboard.length; i++) {
    for (let j = 0; j < keyboard[0].length; j++) {
      for (let k = 0; k < keyboard.length; k++) {
        for (let m = 0; m < keyboard[0].length; m++) {
          if (keyboard[i][j] !== "#" && keyboard[k][m] !== "#" && keyboard[k][m] !== -1) {
            const index = `${keyboard[i][j]}_${keyboard[k][m]}`;
            possiblePaths[index] = Math.abs(i - k) + Math.abs(j - m);
          }
        }
      }
    }
  }
  return possiblePaths;
};

const findPointIn2D = (map = [["3"]], value = "3") => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      // console.log(map[i][j], value);
      if (map[i][j] == value) {
        return new Point(j, i);
      }
    }
  }
  return new Point(-1, -1);
};

const findMinimumLength = (paths = ["<>"], controller) => {
  const controllerPaths = preparePaths(controller);
  // console.log(controllerPaths);
  let minimum = 1000000000;
  let minWord = "";
  //  console.log(paths.length);
  for (let i = 0; i < paths.length; i++) {
    let sum = 0;
    for (let j = 0; j < paths[i].length - 1; j++) {
      const index = `${paths[i][j]}_${paths[i][j + 1]}`;
      sum += controllerPaths[index];
    }
    sum += paths[i].length + 1;
    if (sum < minimum) {
      minimum = sum;
      minWord = paths[i];
    }
  }
  // console.log("Minimum", minimum);
  return { minimum, minWord };
};

const findPathForRobot = (ind = 0, map, prevPath = "v>", startPoint = new Point(0, 0), nextPath = "") => {
  if (ind >= prevPath.length) {
    return [nextPath];
  }
  let start = startPoint;
  const last = findPointIn2D(map, prevPath[ind]);
  const retPaths = [];
  const { path: paths } = bfs(map, start, prepareVisited(map), prevPath[ind], false, true);
  for (let i = 0; i < paths.length; i++) {
    retPaths.push(...findPathForRobot(ind + 1, map, prevPath, last, nextPath + paths[i] + "A"));
  }
  return retPaths;
};

module.exports = {
  preparePaths,
  findPointIn2D,
  findPathForRobot,
  findMinimumLength,
};
