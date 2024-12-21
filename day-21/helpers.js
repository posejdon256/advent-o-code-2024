const path = require("path");
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
    let index = `A_${paths[i][0]}`;
    // console.log(index);
    sum += controllerPaths[index];
    for (let j = 0; j < paths[i].length - 1; j++) {
      index = `${paths[i][j]}_${paths[i][j + 1]}`;
      sum += controllerPaths[index];
    }
    sum += paths[i].length;
    if (sum < minimum) {
      minimum = sum;
      minWord = paths[i];
    }
  }
  // console.log("Minimum", minimum);
  return { minimum, minWord };
};

const findPathForRobot = (ind = 0, map, prevPath = "v>", startPoint = new Point(0, 0)) => {
  const stack = [];
  const visited = {};
  stack.push({ ind: ind, start: startPoint, nextPath: "" });
  const retPaths = [];
  let min = 1000000;
  while (stack.length > 0) {
    const { ind, start, nextPath } = stack.pop();
    if (visited[nextPath]) {
      continue;
    }
    if (ind >= prevPath.length) {
      if (nextPath.length <= min) {
        retPaths.push(nextPath);
        min = nextPath.length;
      }
      visited[nextPath] = true;
      continue;
    }
    const last = findPointIn2D(map, prevPath[ind]);
    let paths = bfs(map, start, prepareVisited(map), prevPath[ind], false, true).path;
    const localMinimum = Math.min(...paths.map((x) => x.length));
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].length > localMinimum) {
        continue;
      }
      stack.push({ ind: ind + 1, start: last, nextPath: nextPath + paths[i] + "A" });
    }
  }
  const ret = retPaths.filter((x) => x.length <= min);
  // console.log(ret[0], ret.length);
  return ret;
};

const calculateScore = (paths = ["<>"], controller) => {
  const best = { score: 100000, paths: [] };
  const controllerPaths = preparePaths(controller);
  for (let i = 0; i < paths.length; i++) {
    let score = controllerPaths[`A_${paths[i][0]}`];
    for (let j = 1; j < paths[i].length; j++) {
      score += controllerPaths[`${paths[i][j - 1]}_${paths[i][j]}`];
      if (paths[i][j] !== paths[i][j - 1]) {
        score += 2;
      }
      if (paths[i][j - 1] === "<" && paths[i][j] === "v") {
        score++;
      }
      if (paths[i][j - 1] === ">" && paths[i][j] === "^") {
        score++;
      }
      if (paths[i][j - 1] === "^" && paths[i][j] === ">") {
        score++;
      }
      if (paths[i][j - 1] === "A" && paths[i][j] === "<") {
        score--;
      }
      if (paths[i][j - 1] === "A" && paths[i][j] === "^") {
        score++;
      }
    }
    if (score <= best.score) {
      if (score === best.score) {
        best.paths.push(paths[i]);
      } else {
        best.paths = [paths[i]];
      }
      best.score = score;
    }
  }
  console.log(best.score, best.paths);
  return best.paths;
  return paths;
};

// const deepDiveIntoRobots = ()

module.exports = {
  preparePaths,
  calculateScore,
  findPointIn2D,
  findPathForRobot,
  findMinimumLength,
};
