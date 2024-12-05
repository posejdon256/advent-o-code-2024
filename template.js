const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }
  return { lines };
};

const part1 = async () => {
  const { lines } = await getInputs("test.txt");
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
};

const main = async () => {
  console.time("Test 1");
  console.log("Result 1", await part1());
  console.timeEnd("Test 1");
  console.time("Test 2");
  console.log("Result 2", await part2());
  console.timeEnd("Test 2");
};

main();
