const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { Point } = require("../helpers/points");
const { createArray, dijikstra } = require("./helpers");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const points = [];
  for await (const line of rl) {
    const p = line.split(",").map((x) => parseInt(x));
    points.push(new Point(p[0], p[1]));
  }
  return { points };
};

const part1 = async () => {
  const { points } = await getInputs("test2.txt");
  const arr = createArray(points.slice(0, 1024), 71);
  return dijikstra(arr);
};

const part2 = async () => {
  const { points } = await getInputs("test2.txt");
  for (let j = 1025; j < points.length; j++) {
    const arr = createArray(points.slice(0, j), 71);
    const result = dijikstra(arr);
    if (result === -1) {
      return points[j - 1];
    }
  }
  return -1;
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
