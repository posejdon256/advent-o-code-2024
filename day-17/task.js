const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { Operations } = require("./helpers");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    return line
      .split(",")
      .map((x) => parseInt(x))
      .reverse();
  }
  return "";
};

const part1 = async () => {
  const output = await getInputs("test2.txt");
  const operations = new Operations({ A: 33024962, B: 0, C: 0 }, output.reverse());
  return operations.performOperations();
};

const xor = (v1, v2) => {
  var hi = 0x80000000;
  var low = 0x7fffffff;
  var hi1 = ~~(v1 / hi);
  var hi2 = ~~(v2 / hi);
  var low1 = v1 & low;
  var low2 = v2 & low;
  var h = hi1 ^ hi2;
  var l = low1 ^ low2;
  return h * hi + l;
};

const isGood = (output = [1, 2], Aprev = 12, i = 1) => {
  const results = [];
  for (let j = 0; j < 8; j++) {
    const A = Aprev * 8 + j;
    const value = xor(xor(A % 8, 6), Math.floor(A / Math.pow(2, A % 8 ^ 3))) % 8;
    // console.log(Aprev, value);
    if (value < 0) {
      const left = A % 8 ^ 6;
      const right = Math.floor(A / Math.pow(2, A % 8 ^ 3));
      console.log(right.toString().length, left, xor(right, left));
    }
    if (value === output[i]) {
      //console.log(Aprev, i, j);
      if (i === output.length - 1) {
        return A;
      }
      results.push(isGood(output, A, i + 1));
    }
  }
  if (results.length === 0) {
    // console.log("None");
    return -1;
  }
  //console.log("Some", results);
  return results.filter((x) => x !== -1)?.sort((a, b) => a - b)[0] || -1;
};

const part2 = async () => {
  const output = await getInputs("test2.txt");
  console.log(output);
  return isGood(output, 0, 0);
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
