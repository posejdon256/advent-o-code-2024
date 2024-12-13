const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { Point } = require("../helpers/points");
const { calcAandB } = require("./helpers");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const tasks = [];
  let task = {};
  for await (const line of rl) {
    if (task.A && task.B && task.Prize) {
      tasks.push(task);
      task = {};
    }
    if (line.includes("A:")) {
      const cutted = line.split(" ");
      const x = parseInt(cutted[2].slice(2, cutted[1].length - 3));
      const y = parseInt(cutted[3].slice(2, cutted[2].length));
      task.A = new Point(x, y);
    }
    if (line.includes("B:")) {
      const cutted = line.split(" ");
      const x = parseInt(cutted[2].slice(2, cutted[1].length - 3));
      const y = parseInt(cutted[3].slice(2, cutted[2].length));
      task.B = new Point(x, y);
    }
    if (line.includes("Prize")) {
      const cutted = line.split(" ");
      const x = parseInt(cutted[1].slice(2, cutted[1].length - 1));
      const y = parseInt(cutted[2].slice(2, cutted[2].length));
      task.Prize = new Point(x, y);
    }
  }
  if (task.A && task.B && task.Prize) {
    tasks.push(task);
    task = {};
  }
  return { tasks };
};

const part1 = async () => {
  const { tasks } = await getInputs("test.txt");
  let sum = 0;
  for (let i = 0; i < tasks.length; i++) {
    const { A, B } = calcAandB(tasks[i].A, tasks[i].B, tasks[i].Prize);
    if (A !== -1) {
      sum += B + A * 3;
    }
  }
  return sum;
};

const part2 = async () => {
  const { tasks } = await getInputs("test2.txt");
  let sum = 0;
  const shift = new Point(10000000000000, 10000000000000);
  for (let i = 0; i < tasks.length; i++) {
    const big = tasks[i].Prize.add(shift);
    const { A, B } = calcAandB(tasks[i].A, tasks[i].B, big);
    if (A > 0 - 1 && B > 0) {
      sum += B + A * 3;
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

  checkUnits();
};

main();
