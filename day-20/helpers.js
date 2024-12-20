const { cloneArray } = require("../helpers/array");
const { DirectionsEnum, Direction } = require("../helpers/directions");
const { Point } = require("../helpers/points");

const fun1 = () => {};

const bfs = (map = [["."]], start = new Point(0, 0), canCheat = true) => {
  const DIRECTIONS = [
    new Direction(DirectionsEnum.LEFT),
    new Direction(DirectionsEnum.BOTTOM),
    new Direction(DirectionsEnum.RIGHT),
    new Direction(DirectionsEnum.TOP),
  ];
  const _visited = [];
  for (let i = 0; i < map.length; i++) {
    _visited.push([]);
    for (let j = 0; j < map[0].length; j++) {
      _visited[i].push(false);
    }
  }
  const queue = [];
  let chetedSavedMin100 = 0;
  let time = 0;
  queue.push({ current: start, time, cheated: false, next: new Point(-1, -1), visited: _visited });
  while (queue.length > 0) {
    const { current, time, cheated, next, visited } = queue.splice(0, 1)[0];
    if (time - 9484 > 100) {
      continue;
    }
    // console.log(current.x, current.y, cheated, map[current.y][current.x], visited[current.y][current.x]);
    if ((map[current.y][current.x] === "#" && (cheated || !canCheat)) || visited[current.y][current.x]) {
      continue;
    }
    if (!cheated && canCheat && map[current.y][current.x] === "#") {
      if (!next.isOutsideOfBoundry(map[0].length - 1, map.length - 1) && map[next.y][next.x] !== "#" && !visited[next.y][next.x]) {
        queue.push({ current: next, next: next.add(next.sub(current)), time: time + 2, cheated: true, visited: cloneArray(visited) });
      }
      continue;
    }
    if (map[current.y][current.x] === "E") {
      // console.log(time, queue.length);
      if (!canCheat) {
        return time;
      }
      if (time - 9484 <= 100) {
        console.log(time, queue.length);
        chetedSavedMin100++;
      }
      continue;
    }
    visited[current.y][current.x] = true;
    for (let i = 0; i < DIRECTIONS.length; i++) {
      const newCurrent = current.add(DIRECTIONS[i].coordinates);
      const next = newCurrent.add(DIRECTIONS[i].coordinates);
      queue.push({ current: newCurrent, next, time: time + 1, cheated, visited: cloneArray(visited) });
    }
  }
  return chetedSavedMin100;
};

module.exports = {
  fun1,
  bfs,
};
