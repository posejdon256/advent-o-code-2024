const { cloneArray } = require("../helpers/array");
const { DirectionsEnum, Direction } = require("../helpers/directions");
const { Point } = require("../helpers/points");

const fun1 = () => {};

const findAllWalls = (map = [["."]]) => {
  const walls = [];
  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[0].length - 1; j++) {
      if (map[i][j] === "#") {
        walls.push(new Point(j, i));
      }
    }
  }
  console.log("Walls", walls.length);
  return walls;
};
const DIRECTIONS = [
  new Direction(DirectionsEnum.LEFT),
  new Direction(DirectionsEnum.BOTTOM),
  new Direction(DirectionsEnum.RIGHT),
  new Direction(DirectionsEnum.TOP),
];
const bfs = (map = [["."]], start = new Point(0, 0)) => {
  const visited = [];
  for (let i = 0; i < map.length; i++) {
    visited.push([]);
    for (let j = 0; j < map[0].length; j++) {
      visited[i].push(false);
    }
  }
  const queue = [];
  let time = 0;
  queue.push({ current: start, time });
  while (queue.length > 0) {
    const { current, time } = queue.splice(0, 1)[0];
    if (map[current.y][current.x] === "#" || visited[current.y][current.x]) {
      continue;
    }
    if (map[current.y][current.x] === "E") {
      return time;
    }
    visited[current.y][current.x] = true;
    for (let i = 0; i < DIRECTIONS.length; i++) {
      const newCurrent = current.add(DIRECTIONS[i].coordinates);
      queue.push({ current: newCurrent, time: time + 1 });
    }
  }
  return -1;
};

const findCheat = (map = [["."]], start = new Point(0, 0), startEnd = {}) => {
  const stack = [];
  stack.push({ current: start, visited: [] });
  const paths = [];
  while (stack.length > 0) {
    const { current, visited } = stack.pop();
    const index1 = `${start.y}_${start.x}-${current.y}_${current.x}`;
    const index2 = `${current.y}_${current.x}-${start.y}_${start.x}`;
    if (
      current.x < 1 ||
      current.y < 1 ||
      current.x > map[0].length - 2 ||
      current.y > map.length - 2 ||
      visited.length >= 20 ||
      start.y > current.y ||
      startEnd[index1] ||
      startEnd[index2] ||
      (start.y === current.y && start.x > current.x) ||
      visited.some((pos) => pos.x === current.x && pos.y === current.y)
    ) {
      continue;
    }
    visited.push(current);
    for (let i = 0; i < DIRECTIONS.length; i++) {
      const next = current.add(DIRECTIONS[i].coordinates);
      const newVisited = [...visited];
      if (map[next.y][next.x] !== "#") {
        // console.log(index1, index2);
        if (!startEnd[index1] && !startEnd[index2]) {
          paths.push(newVisited);
        }
        if (!startEnd[index1] || !startEnd[index2]) {
          if (!startEnd[index1] || startEnd[index1] > visited.length) {
            startEnd[index1] = visited.length;
          }
          if (startEnd[index2] && startEnd[index2] > visited.length) {
            startEnd[index2] = visited.length;
          }
        }
      } else {
        stack.push({ current: next, visited: newVisited });
      }
    }
  }
  return paths;
};

const findAllCheats = (map = [["."]], start) => {
  const max = bfs(map, start);
  console.log(max);
  let allPaths = 0;
  let all = 0;
  let cheatsNumber = 0;
  const startEnd = {};
  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[0].length - 1; j++) {
      if (map[i][j] === "#") {
        const paths = findCheat(map, new Point(j, i), startEnd);
        cheatsNumber += paths.length;
        for (let k = 0; k < paths.length; k++) {
          const cheat = paths[k];
          const _map = cloneArray(map);
          for (let l = 0; l < cheat.length; l++) {
            if (_map[cheat[l].y][cheat[l].x] !== "E") {
              _map[cheat[l].y][cheat[l].x] = ".";
            }
          }
          const val = bfs(_map, start);
          if (val < max) {
            all++;
          }
          if (50 < max - val) {
            allPaths++;
          }
        }
        // console.log(i, j);
      }
    }
  }
  console.log(all, allPaths, all - allPaths);
  return cheatsNumber;
};

module.exports = {
  fun1,
  bfs,
  findAllWalls,
  findAllCheats,
};
