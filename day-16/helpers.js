const { cloneArray } = require("../helpers/array");
const { Direction, DirectionsEnum, getDirection } = require("../helpers/directions");
const { Point } = require("../helpers/points");

const INT_MAX = 100000000;

const drawO = (start = new Point(), path, visited) => {
  let current = start;
  const directions = path.split("").map((x) => getDirection(x));
  visited[current.y][current.x].isGood = "O";
  for (let i = 0; i < directions.length; i++) {
    current = current.add(directions[i].coordinates);
    visited[current.y][current.x].isGood = "O";
  }
};

const sumTiles = (visited) => {
  let sum = 0;
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[0].length; j++) {
      if (visited[i][j].isGood === "O") {
        sum++;
      }
    }
  }
  return sum;
};

const findE = (arr = [["O"]], start = new Point(0, 0)) => {
  const stack = [];
  const visited = cloneArray(arr);
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[0].length; j++) {
      visited[i][j] = {
        left: INT_MAX,
        right: INT_MAX,
        bottom: INT_MAX,
        top: INT_MAX,
        isGood: "-",
      };
    }
  }
  let smallestFound = INT_MAX;
  stack.push({ current: start, direction: new Direction(DirectionsEnum.RIGHT), cost: 0, path: "" });
  while (stack.length > 0) {
    stack.sort((a, b) => b.cost - a.cost);
    const { current, direction, path, cost } = stack.pop();
    if (arr[current.y][current.x] === "#") {
      continue;
    }
    const shift = 1001;
    const leftDir = direction.getRotationRotatedBy270();
    const rightDir = direction.getRotationRotatedBy90();
    const backDir = rightDir.getRotationRotatedBy90();
    if (arr[current.y][current.x] === "E") {
      if (
        Math.min(
          visited[current.y][current.x].left,
          visited[current.y][current.x].right,
          visited[current.y][current.x].top,
          visited[current.y][current.x].bottom
        ) >= cost
      ) {
        smallestFound = cost;
        drawO(start, path, visited);
        visited[current.y][current.x][direction.name] = cost;
      }
      continue;
    }
    if (
      visited[current.y][current.x][leftDir.name] + shift <= cost ||
      visited[current.y][current.x][rightDir.name] + shift <= cost ||
      visited[current.y][current.x][backDir.name] + shift <= cost ||
      visited[current.y][current.x][direction.name] + shift <= cost
    ) {
      continue;
    }
    if (visited[current.y][current.x][direction.name] < cost) {
      continue;
    }

    const forward = current.add(direction.coordinates);
    const left = current.add(leftDir.coordinates);
    const right = current.add(rightDir.coordinates);
    const back = current.add(rightDir.getRotationRotatedBy90().coordinates);
    visited[current.y][current.x][direction.name] = cost;

    stack.push({ current: forward, direction, cost: cost + 1, path: path + direction.getSign() });
    stack.push({ current: left, direction: leftDir, cost: cost + 1001, path: path + direction.getSign() });
    stack.push({ current: right, direction: rightDir, cost: cost + 1001, path: path + direction.getSign() });
    stack.push({ current: back, direction: rightDir.getRotationRotatedBy90(), cost: cost + 2001, path: path + rightDir.getRotationRotatedBy90().getSign() });
  }
  return { sum: sumTiles(visited), smallestFound };
};

module.exports = {
  findE,
};
