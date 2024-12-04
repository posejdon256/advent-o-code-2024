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

part1();
