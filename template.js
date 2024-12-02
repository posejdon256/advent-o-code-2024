const { stdin, stdout } = require("process");
const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const fileStream = fs.createReadStream(testString);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const left = [];
  const right = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const nums = line.split("   ").map((x) => parseInt(x));
    left.push(nums[0]);
    right.push(nums[1]);
  }
  return { left, right };
};

const part1 = async () => {
  const { left, right } = await getInputs("test.txt");
};

const part2 = async () => {
  const { left, right } = await getInputs("test2.txt");
};

part2();
