const { cloneArray } = require("./array");
const { Direction, DirectionsEnum } = require("./directions");

const DIRECTIONS = [
  new Direction(DirectionsEnum.BOTTOM),
  new Direction(DirectionsEnum.RIGHT),
  new Direction(DirectionsEnum.LEFT),
  new Direction(DirectionsEnum.TOP),
];
const bfs = (map = [["."]], start = new Point(0, 0), _visited, searchSing = "E", returnOnFirst = false, buildPath = false) => {
  const queue = [];
  let time = 0;
  let foundTime = -1;
  const pathsFound = [];
  queue.push({ current: start, time, path: "", visited: _visited });
  while (queue.length > 0) {
    const { current, time, path, visited } = queue.splice(0, 1)[0];
    if (current.isOutsideOfBoundry(map[0].length - 1, map.length - 1) || map[current.y][current.x] === "#" || visited[current.y][current.x] !== -1) {
      continue;
    }
    if (map[current.y][current.x] == searchSing) {
      if (returnOnFirst) {
        if (buildPath) {
          return { time, path };
        }
        return { time };
      }
      pathsFound.push(path);
      if (time < foundTime || foundTime === -1) {
        foundTime = time;
      }
      continue;
    }
    visited[current.y][current.x] = time;
    for (let i = 0; i < DIRECTIONS.length; i++) {
      const newCurrent = current.add(DIRECTIONS[i].coordinates);
      queue.push({ current: newCurrent, time: time + 1, path: path + DIRECTIONS[i].getSign(), visited: cloneArray(visited) });
    }
  }
  if (buildPath) {
    return { time: foundTime, path: pathsFound };
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
  bfs,
  prepareVisited,
};
