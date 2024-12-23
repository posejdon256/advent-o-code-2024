const path = require("path");
const { prepareVisited, bfs } = require("../helpers/bfs");
const { Point } = require("../helpers/points");
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
        retPaths.push(nextPath === "" ? "A" : nextPath);
        min = nextPath === "" ? 1 : nextPath.length;
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

const bestPaths = [
  //A -> < bestPaths[4][0]
  //>_^
  //<   ^     >    v     A
  ["", "v<", "<<", "<", "v<<"], //<
  [">^", "", "<^", "^", "<"], //^
  [">>", "v>", "", ">", "v"], //>,
  [">", "v", "<", "", "v<"], //v
  [">>^", ">", "^", ">^", ""], //A
];
const indexes = {
  "<": 0,
  "^": 1,
  ">": 2,
  v: 3,
  A: 4,
};

const getWordFromPrevWord = (word = "><", depth = 1) => {
  for (let k = 0; k < depth; k++) {
    let newWord = word.length > 0 ? bestPaths[indexes[word[0]]][indexes["A"]] + "A" : "A";
    for (let m = 1; m < word.length; m++) {
      newWord += bestPaths[indexes[word[m]]][indexes[word[m - 1]]] + "A";
    }
    word = newWord;
  }
  return word;
};

module.exports = {
  findPointIn2D,
  findPathForRobot,
  getWordFromPrevWord,
  bestPaths,
  indexes,
};
