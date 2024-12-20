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
  return walls;
};
const DIRECTIONS = [
  new Direction(DirectionsEnum.LEFT),
  new Direction(DirectionsEnum.BOTTOM),
  new Direction(DirectionsEnum.RIGHT),
  new Direction(DirectionsEnum.TOP),
];
const bfs = (map = [["."]], start = new Point(0, 0), visited, returnOnFirst = false) => {
  const queue = [];
  let time = 0;
  let foundTime = -1;
  queue.push({ current: start, time });
  while (queue.length > 0) {
    const { current, time } = queue.splice(0, 1)[0];
    if (map[current.y][current.x] === "#" || visited[current.y][current.x] !== -1) {
      continue;
    }
    visited[current.y][current.x] = time;
    if (map[current.y][current.x] === "E") {
      if (returnOnFirst) {
        return time;
      }
      continue;
    }
    for (let i = 0; i < DIRECTIONS.length; i++) {
      const newCurrent = current.add(DIRECTIONS[i].coordinates);
      queue.push({ current: newCurrent, time: time + 1 });
    }
  }
  return foundTime;
};

const prepareVisited = (map) => {
  const visited = [];
  for (let i = 0; i < map.length; i++) {
    visited.push([]);
    for (let j = 0; j < map[0].length; j++) {
      visited[i].push(-1);
    }
  }
  return visited;
};

module.exports = {
  fun1,
  bfs,
  findAllWalls,
  prepareVisited,
};
