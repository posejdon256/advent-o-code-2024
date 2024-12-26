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

const bestPaths = (depth = 0) => {
  if (depth < 1) {
    return [
      //A -> < bestPaths[4][0]
      //>_^
      //<   ^     >    v     A
      ["", ">^", ">>", ">", ">>^"], //<
      ["v<", "", "v>", "v", ">"], //^
      ["<<", "<^", "", "<", "^"], //>,
      ["<", "^", ">", "", "^>"], //v
      ["v<<", "<", "v", "<v", ""], //A
    ];
  } else {
    return [
      ["", ">^", ">>", ">", ">>^"], //<
      ["v<", "", "v>", "v", ">"], //^
      ["<<", "<^", "", "<", "^"], //>,
      ["<", "^", ">", "", ">^"], //v
      ["<v<", "<", "v", "<v", ""], //A
    ];
  }
};
const indexes = {
  "<": 0,
  "^": 1,
  ">": 2,
  v: 3,
  A: 4,
};

const getWordFromPrevWord = (word = "><", depth = 1, withA = true, dddd = 0) => {
  for (let k = 0; k < depth; k++) {
    let newWord = "";
    if (withA) {
      newWord = word.length > 0 ? bestPaths(dddd)[indexes[word[0]]][indexes["A"]] + "A" : "A";
    }
    for (let m = 1; m < word.length; m++) {
      newWord += bestPaths(dddd)[indexes[word[m - 1]]][indexes[word[m]]] + "A";
    }
    if (newWord === "") {
      newWord = "A";
    }
    word = newWord;
  }
  return word;
};

const createGraph = (depth) => {
  const arr = ["<", ">", "v", "A", "^"];
  const graph = {};
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      const word = getWordFromPrevWord(arr[i] + arr[j], 1, false, depth);
      const index = arr[i] + arr[j];
      if (!graph[index]) {
        graph[index] = [];
      }
      if (word.length === 1) {
        graph[index].push("A");
      }
      for (let k = 1; k < word.length; k++) {
        graph[index].push(word[k - 1] + word[k]);
      }
    }
  }
  graph["A"] = ["A"];
  return graph;
};

const calculateDeepValue = (graph, part = "<<", depth = 0, isFirst = false, cache = {}, maxDepth = 2) => {
  if (depth === maxDepth) {
    if (!isFirst) {
      return 1;
    }
    return part.length;
  }
  const connectElement = part[0] === part[1] ? [] : ["A" + graph[part][0][0]];
  let newParts = isFirst && part !== "A" ? [...graph["A" + part[0]], ...connectElement, ...graph[part]] : graph[part];

  let value = 0;
  const index = `${depth}_${part}_${isFirst}_${part !== "A"}`;
  if (cache[index]) {
    return cache[index];
  }
  for (let i = 0; i < newParts.length; i++) {
    value += calculateDeepValue(graph, newParts[i], depth + 1, i === 0, cache, maxDepth);
  }
  cache[index] = value;
  return value;
};

module.exports = {
  findPointIn2D,
  findPathForRobot,
  createGraph,
  getWordFromPrevWord,
  calculateDeepValue,
  bestPaths,
  indexes,
};
