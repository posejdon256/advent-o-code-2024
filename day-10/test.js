const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { fun1, findTrail, findAllTrails } = require("./solution");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    lines.push(line.split("").map((x) => parseInt(x)));
  }
  return { lines };
};

const part1 = async () => {
  const { lines } = await getInputs("test2.txt");
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 0) {
        const trails = {};
        findTrail(lines, { x: j, y: i }, 0, trails);
        sum += Object.keys(trails)?.length;
      }
    }
  }
  return sum;
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 0) {
        const trails = {};
        findAllTrails(lines, { x: j, y: i }, 0, trails);
        sum += Object.values(trails)?.reduce((prev, curr) => (prev += curr), 0);
      }
    }
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

  console.log("--------------Unit tests------------------------");

  checkUnits();
};

main();
