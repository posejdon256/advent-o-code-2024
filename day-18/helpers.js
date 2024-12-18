const { Direction, DirectionsEnum } = require("../helpers/directions");
const { Point } = require("../helpers/points");

const createArray = (points = [new Point(0, 0)], size = 7) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push([]);
    for (let j = 0; j < size; j++) {
      arr[i].push(".");
    }
  }
  points.forEach((point) => {
    arr[point.y][point.x] = "#";
  });
  return arr;
};

const dijikstra = (arr = [["O"]]) => {
  const start = new Point(0, 0);
  const max = arr.length - 1;
  const end = new Point(max, max);
  let cost = 0;
  const stack = [];
  const directionsArr = [
    new Direction(DirectionsEnum.LEFT),
    new Direction(DirectionsEnum.RIGHT),
    new Direction(DirectionsEnum.TOP),
    new Direction(DirectionsEnum.BOTTOM),
  ];
  stack.push({ cost, point: start });
  while (stack.length > 0) {
    stack.sort((a, b) => b.cost - a.cost);
    const { cost, point } = stack.pop();
    if (point.isOutsideOfBoundry(max, max) || arr[point.y][point.x] === "#" || arr[point.y][point.x] === "O") {
      continue;
    }
    if (end.isEqual(point)) {
      return cost;
    }
    arr[point.y][point.x] = "O";
    for (let i = 0; i < directionsArr.length; i++) {
      const next = point.add(directionsArr[i].coordinates);
      stack.push({ point: next, cost: cost + 1 });
    }
  }
  return -1;
};

module.exports = {
  createArray,
  dijikstra,
};
