const { onlyUnique } = require("../helpers/array");
const { prepareVisited } = require("../helpers/bfs");

const find3Cycles = (map = [["."]], start = "tc", part1 = true) => {
  const queue = [];
  const cycles = [];
  const visitedFrom = new Array(Object.keys(map).length).fill(-1);
  queue.push({ current: start, prev: -1 });
  while (queue.length > 0) {
    const { current, prev } = queue.splice(0, 1)[0];
    const index = findIndex(map, current);
    const indexPrev = findIndex(map, prev);
    if (visitedFrom[index] !== -1) {
      if (prev !== -1 && visitedFrom[index] === visitedFrom[indexPrev]) {
        cycles.push([current, prev, visitedFrom[index]]);
      }
      continue;
    }
    visitedFrom[index] = prev;
    for (let i = 0; i < map[current].length; i++) {
      queue.push({ current: map[current][i], prev: current });
    }
  }
  if (part1) {
    return cycles.filter((x) => x.sort()).filter((x) => x.some((y) => y[0] === "t"));
  }
  return cycles.filter((x) => x.sort());
};

const getIndexFromCycle = (cycle = ["ad", "as"]) => {
  let ind = "";
  cycle.sort();
  for (let i = 0; i < cycle.length; i++) {
    ind += cycle[i];
    if (i !== cycle.length - 1) {
      ind += "_";
    }
  }
  return ind;
};

const findIndex = (map = { kn: [] }, index = "kn") => {
  return Object.keys(map).findIndex((x) => x === index);
};

module.exports = {
  find3Cycles,
  getIndexFromCycle,
};
