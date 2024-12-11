const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { blink, blinkIntoDepth } = require("./solution");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  let numbers = [];
  for await (const line of rl) {
    numbers = line.split(" ").map((x) => x.split("").map((y) => parseInt(y)));
  }
  return { numbers };
};

const part1 = async () => {
  const { numbers } = await getInputs("test2.txt");
  let copy = numbers;
  for (let i = 0; i < 25; i++) {
    copy = blink(copy);
    // console.log("Copy", copy);
  }
  //console.log(copy.map((x) => x.join("")));
  return copy.length;
};

const part2 = async () => {
  const { numbers } = await getInputs("test2.txt");
  let sum = 0;
  const max = 75;
  const calculated = {};
  for (let i = 0; i < numbers.length; i++) {
    sum += blinkIntoDepth(0, calculated, max, numbers[i]);
  }
  return sum;
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
