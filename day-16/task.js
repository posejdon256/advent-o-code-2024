const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { Point } = require("../helpers/points");
const { findE } = require("./helpers");
const { cloneArray } = require("../helpers/array");
const { Direction, DirectionsEnum } = require("../helpers/directions");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const arr = [];
  let start;
  let end;
  let i = 0;
  for await (const line of rl) {
    arr.push(line.split(""));
    const _start = line.split("").findIndex((x) => x === "S");
    if (_start !== -1) {
      start = new Point(_start, i);
    }
    const _end = line.split("").findIndex((x) => x === "E");
    if (_end !== -1) {
      end = new Point(_end, i);
    }
    i++;
  }
  return { arr, start, end };
};

const part1 = async () => {
  const { arr, start, end } = await getInputs("test3.txt");
  const cost = findE(arr, start);
  // console.log(arr.length * arr[0].length * 4);
  // console.log(cost.map((x) => x.map((y) => Math.min(y.left, y.top, y.bottom, y.right)))[end.y][end.x]);
  return cost;
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  return 0;
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
