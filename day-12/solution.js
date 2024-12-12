const { Point } = require("../helpers/points");

const permutations = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const crossPermutaions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
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

const findNextPermutation = (permutation = [0, 1], shifted = 1) => {
  const permutationFound = crossPermutaions[(crossPermutaions.findIndex((x) => x[0] === permutation[0] && x[1] === permutation[1]) + shifted) % 8];
  return new Point(permutationFound[0], permutationFound[1]);
};
const findPrevPermutation = (permutation = [0, 1], shifted = 1) => {
  const permutationFound = crossPermutaions[(crossPermutaions.findIndex((x) => x[0] === permutation[0] && x[1] === permutation[1]) - shifted + 8) % 8];
  return new Point(permutationFound[0], permutationFound[1]);
};

const isBoundry = (arr = [["O"]], point = new Point(0, 0), color) => {
  return point.isOutsideOfBoundry(arr.length - 1, arr[0].length - 1) || arr[point.x][point.y] !== `filled_${color}`;
};

const findAngles = (arr = [["O"]], color = "O", direction = [0, 1]) => {
  let angles = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      const curr = new Point(i, j);
      if (arr[i][j] === `filled_${color}`) {
        const next = curr.add(new Point(direction[0], direction[1]));
        const left = curr.add(findPrevPermutation(direction, 2));
        const right = curr.add(findNextPermutation(direction, 2));
        const leftTop = curr.add(findPrevPermutation(direction));
        const rightTop = curr.add(findNextPermutation(direction));
        //   console.log(left, leftTop, next, rightTop, right);
        if (isBoundry(arr, left, color) && isBoundry(arr, next, color)) {
          angles++;
        }
        if (isBoundry(arr, right, color) && !isBoundry(arr, next, color) && !isBoundry(arr, rightTop, color)) {
          angles++;
        }
      }
    }
  }
  return angles;
};

const fillArrayWithDone = (arr = [["O"]]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j].includes("filled")) {
        arr[i][j] = "done";
      }
    }
  }
};

module.exports = {
  recursion,
  permutations,
  findAngles,
  findNextPermutation,
  findPrevPermutation,
  fillArrayWithDone,
};
