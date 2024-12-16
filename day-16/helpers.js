const { cloneArray } = require("../helpers/array");
const { Direction, DirectionsEnum } = require("../helpers/directions");
const { Point } = require("../helpers/points");

const INT_MAX = 100000000;

// const findS = (
//   arr = [["O"]],
//   current = new Point(0, 0),
//   prev = new Point(0, 0),
//   direction = new Direction(DirectionsEnum.RIGHT),
//   costAngleAndMove = 1,
//   visited = []
// ) => {
//   if (visited[current.y * arr[0].length + current.x]) {
//     return;
//   }
//   if (arr[current.y][current.x] >= INT_MAX || arr[current.y][current.x] === "#") {
//     return;
//   }
//   if (arr[current.y][current.x] === "E") {
//     arr[current.y][current.x] = arr[prev.y][prev.x] + costAngleAndMove;
//     return;
//   }
//   const leftDir = direction.getRotationRotatedBy270();
//   const rightDir = direction.getRotationRotatedBy90();
//   const _visited = [...visited];
//   _visited[arr[0].length * current.y + current.x] = true;
//   arr[current.y][current.x] = Math.min(arr[prev.y][prev.x] + costAngleAndMove, getNumberOrMaxNumber(arr[current.y][current.x]));
//   findS(arr, current.add(direction.coordinates), current, direction, 1, _visited);
//   findS(arr, current.add(leftDir.coordinates), current, leftDir, 1001, _visited);
//   findS(arr, current.add(rightDir.coordinates), current, rightDir, 1001, _visited);
// };

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
      };
    }
  }
  stack.push({ current: start, direction: new Direction(DirectionsEnum.RIGHT), cost: 0 });
  let counter = 0;
  while (stack.length > 0) {
    stack.sort((a, b) => b.cost - a.cost);
    //console.log(stack);
    const { current, direction, cost } = stack.pop();
    if (arr[current.y][current.x] === "E") {
      return cost;
    }
    if (visited[current.y][current.x][direction.name] < cost) {
      continue;
    }
    // console.log(current.x, current.y, arr[current.y][current.x], direction.name, cost);
    const leftDir = direction.getRotationRotatedBy270();
    const rightDir = direction.getRotationRotatedBy90();
    const forward = current.add(direction.coordinates);
    counter++;
    visited[current.y][current.x][direction.name] = cost;
    if (arr[forward.y][forward.x] !== "#") {
      stack.push({ current: current.add(direction.coordinates), direction, cost: cost + 1 });
    }
    stack.push({ current, direction: leftDir, cost: cost + 1000 });
    stack.push({ current, direction: rightDir, cost: cost + 1000 });
  }
  return visited;
};

const getNumberOrMaxNumber = (num) => {
  if (isNaN(num)) {
    return INT_MAX;
  }
  return num;
};

// const startFindS = (arr = [["O"]], current) => {
//   const visited = new Array(arr.length * arr[0].length).fill(false);
//   visited[arr[0].length * current.y + current.x] = true;
//   const direction = new Direction(DirectionsEnum.RIGHT);
//   const leftDir = direction.getRotationRotatedBy270();
//   const rightDir = direction.getRotationRotatedBy90();
//   arr[current.y][current.x] = 0;
//   findS(arr, current.add(direction.coordinates), current, direction, 1, visited);
//   findS(arr, current.add(leftDir.coordinates), current, leftDir, 1001, visited);
//   findS(arr, current.add(rightDir.coordinates), current, rightDir, 1001, visited);
// };

module.exports = {
  findE,
};
