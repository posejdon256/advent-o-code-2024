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
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(right[i] - left[i]);
  }
  console.log("Sum", sum);
};

const part2 = async () => {
  const { left, right } = await getInputs("test2-2.txt");
  const max = Math.max(...left);
  console.log("Max", max);
  const buckets = new Array(max + 1).fill(0);
  console.log("Buckets", buckets);
  console.log("Right", right);
  console.log("Left", left);
  for (let i = 0; i < right.length; i++) {
    if (right[i] < buckets.length) {
      buckets[right[i]] += right[i];
      console.log("Bucket", right[i], buckets[right[i]]);
    }
  }
  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += buckets[left[i]];
    console.log("sum", sum, buckets[left[i]], i);
    // buckets[left[i]] = 0;
  }
  console.log(sum);
  return sum;
};

part2();
