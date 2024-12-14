const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { Robot, calculateNewPosition, getQuadrant } = require("./helpers");
const { Point } = require("../helpers/points");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const robots = [];
  for await (const line of rl) {
    const cutted = line.split(" ");
    const position = cutted[0].split(",");
    const velocity = cutted[1].split(",");
    const robot = new Robot(
      new Point(parseInt(velocity[0].slice(2, velocity[0].length)), parseInt(velocity[1])),
      new Point(parseInt(position[0].slice(2, position[0].length)), parseInt(position[1]))
    );
    robots.push(robot);
  }
  return { robots };
};

const part1 = async () => {
  const { robots } = await getInputs("test2.txt");
  const mapSize = new Point(101, 103);
  const results = {};
  for (let i = 0; i < robots.length; i++) {
    const newPosition = calculateNewPosition(robots[i], mapSize);
    const quadranat = getQuadrant(newPosition, mapSize);
    if (quadranat === -1) {
      continue;
    }
    if (!results[quadranat]) {
      results[quadranat] = 1;
    } else {
      results[quadranat]++;
    }
  }
  return Object.values(results).reduce((curr, prev) => curr * prev, 1);
};

const part2 = async () => {
  const { robots } = await getInputs("test2.txt");
  const mapSize = new Point(101, 103);
  let sec = 1;
  while (true) {
    const results = {};
    const newPositions = [];
    for (let i = 0; i < robots.length; i++) {
      const newPosition = calculateNewPosition(robots[i], mapSize, sec);
      newPositions.push(newPosition);
      const quadranat = getQuadrant(newPosition, mapSize);
      if (quadranat === -1) {
        continue;
      }
      if (!results[quadranat]) {
        results[quadranat] = 1;
      } else {
        results[quadranat]++;
      }
    }
    if (newPositions.every((x) => newPositions.every((y) => !x.isEqual(y) || x.id === y.id))) {
      return sec;
    }
    sec++;
  }
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
