const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { recursion, recursionFillWithSides, recursionCalculateNotPrev } = require("./solution");
const { Point } = require("../helpers/points");
const { cloneArray } = require("../helpers/array");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const arr = [];
  for await (const line of rl) {
    arr.push(line.split(""));
  }
  return { arr };
};

const part1 = async () => {
  const results = [];
  const { arr } = await getInputs("test2.txt");
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!arr[i][j].includes("filled")) {
        results.push(recursion(arr, arr[i][j], new Point(i, j), new Point(i, j)));
      }
    }
  }
  let sum = 0;
  results.forEach(({ filled, wall }) => {
    sum += filled * wall;
  });
  return sum;
};

const part2 = async () => {
  let result = 0;
  const { arr } = await getInputs("test.txt");
  const copy = cloneArray(arr);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!copy[i][j].includes("filled")) {
        const newPoint = new Point(i, j);
        const { filled } = recursion(copy, copy[i][j], newPoint, newPoint);
        const copyWithObjects = cloneArray(arr);
        recursionFillWithSides(copyWithObjects, copyWithObjects[i][j], newPoint, newPoint);
        const sums = { L: copyWithObjects[i][j].L, R: copyWithObjects[i][j].R, T: copyWithObjects[i][j].T, B: copyWithObjects[i][j].B };
        recursionCalculateNotPrev(copyWithObjects, newPoint, newPoint, sums);
        result += filled * (sums.L + sums.R + sums.B + sums.T);
      }
    }
  }
  return result;
};

const main = async () => {
  console.time("Time 1");
  const part1Val = await part1();
  console.timeEnd("Time 1");
  console.log("Part 1", part1Val);

  console.time("Time 2");
  const part2Val = await part2();
  console.timeEnd("Time 2");
  console.log("Part 2", part2Val);

  checkUnits();
};

main();
