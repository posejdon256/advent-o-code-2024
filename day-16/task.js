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

const part1And2 = async () => {
  const { arr, start, end } = await getInputs("test2.txt");
  const { smallestFound, sum } = findE(arr, start);
  return `Sum ${sum} ${smallestFound}`;
};

const main = async () => {
  console.time("Time 1 and 2");
  const part1Val = await part1And2();
  console.timeEnd("Time 1 and 2");
  console.log("Part 1 and 2", part1Val);

  checkUnits();
};

main();
