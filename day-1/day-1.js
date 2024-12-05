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
  console.time("test");
  const { left, right } = await getInputs("test.txt");
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(right[i] - left[i]);
  }
  console.log("Sum", sum);
  console.timeEnd("test");
};

const part2 = async () => {
  console.time("test");
  const { left, right } = await getInputs("test2-2.txt");
  const max = Math.max(...left);
  const buckets = new Array(max + 1).fill(0);
  for (let i = 0; i < right.length; i++) {
    if (right[i] < buckets.length) {
      buckets[right[i]] += right[i];
    }
  }
  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += buckets[left[i]];
    // buckets[left[i]] = 0;
  }
  console.log(sum);
  console.timeEnd("test");
};

part2();
