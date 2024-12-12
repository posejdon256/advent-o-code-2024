const { Point } = require("../helpers/points");

const permutations = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const recursion = (arr = [["O", "Y"]], startColor = "O", current = new Point(0, 1), prev = new Point(1, 0)) => {
  const info = { filled: 0, wall: 0 };
  if (current.isOutsideOfBoundry(arr.length - 1, arr[0].length - 1)) {
    info.wall = 1;
    return info;
  }
  if (arr[current.x][current.y] !== startColor) {
    if (arr[current.x][current.y] === `filled_${startColor}`) {
      return info;
    }
    info.wall = 1;
    return info;
  }
  arr[current.x][current.y] = `filled_${startColor}`;
  for (let i = 0; i < permutations.length; i++) {
    const newPoint = new Point(current.x + permutations[i][0], current.y + permutations[i][1]);
    if (!newPoint.isEqual(prev)) {
      const infoFromRecursion = recursion(arr, startColor, newPoint, current);
      info.wall += infoFromRecursion.wall;
      info.filled += infoFromRecursion.filled;
    }
  }
  info.filled++;
  return info;
};

const recursionFillWithSides = (arr = [["O", "Y"]], startColor = "O", current = new Point(0, 1), prev = new Point(1, 0)) => {
  const info = { L: false, T: false, R: false, B: false };
  if (current.isOutsideOfBoundry(arr.length - 1, arr[0].length - 1)) {
    return "wall";
  }
  if (arr[current.x][current.y] !== startColor) {
    if (typeof arr[current.x][current.y] === "object") {
      return "was_here";
    }
    return "wall";
  }
  arr[current.x][current.y] = info;
  for (let i = 0; i < permutations.length; i++) {
    const newPoint = new Point(current.x + permutations[i][0], current.y + permutations[i][1]);
    if (!newPoint.isEqual(prev)) {
      const infoFromRecursion = recursionFillWithSides(arr, startColor, newPoint, current);
      if (infoFromRecursion === "wall") {
        if (permutations[i][0] === 1) {
          info.B = true;
        } else if (permutations[i][0] === -1) {
          info.T = true;
        } else if (permutations[i][1] === 1) {
          info.R = true;
        } else {
          info.L = true;
        }
      }
    }
  }
  arr[current.x][current.y] = info;
  return arr;
};

const recursionCalculateNotPrev = (
  arr = [["O", "Y"]],
  current = new Point(0, 1),
  prev = new Point(1, 0),
  sum = { L: 0, T: 0, R: 0, B: 0 },
  startPoint = { x: 0, y: 0 }
) => {
  // console.log("Start", current, sum);
  if (current.isOutsideOfBoundry(arr.length - 1, arr[0].length - 1)) {
    return;
  }
  if (typeof arr[current.x][current.y] !== "object") {
    return;
  }
  if (arr[current.x][current.y].visited && !current.isEqual(startPoint)) {
    if (arr[current.x][current.y].L && arr[prev.x][prev.y].L) {
      sum.L--;
    }
    if (arr[current.x][current.y].R && arr[prev.x][prev.y].R) {
      sum.R--;
    }
    if (arr[current.x][current.y].T && arr[prev.x][prev.y].T) {
      sum.T--;
    }
    if (arr[current.x][current.y].B && arr[prev.x][prev.y].B) {
      sum.B--;
    }
    return;
  }
  if (arr[current.x][current.y].L && !arr[prev.x][prev.y].L) {
    sum.L++;
  }
  if (arr[current.x][current.y].R && !arr[prev.x][prev.y].R) {
    sum.R++;
  }
  if (arr[current.x][current.y].T && !arr[prev.x][prev.y].T) {
    sum.T++;
  }
  if (arr[current.x][current.y].B && !arr[prev.x][prev.y].B) {
    sum.B++;
  }
  arr[current.x][current.y].visited = true;
  for (let i = 0; i < permutations.length; i++) {
    const newPoint = new Point(current.x + permutations[i][0], current.y + permutations[i][1]);
    if (!newPoint.isEqual(prev)) {
      console.log(newPoint, current);
      recursionCalculateNotPrev(arr, newPoint, current, sum);
    }
  }
  return sum;
};

module.exports = {
  recursion,
  recursionFillWithSides,
  recursionCalculateNotPrev,
};
