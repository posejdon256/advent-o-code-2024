const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { Operations, getA } = require("./helpers");

const getInputs = async (testString, reverse = false) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    const ret = line.split(",").map((x) => parseInt(x));
    if (reverse) {
      return ret.reverse();
    }
    return ret;
  }
  return "";
};

const part1 = async () => {
  const output = await getInputs("test2.txt");
  const operations = new Operations({ A: 33024962, B: 0, C: 0 }, output);
  return operations.performOperations();
};

const part2 = async () => {
  const output = await getInputs("test2.txt", true);
  return getA(output, 0, 0);
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
