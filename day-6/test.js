const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });
  let startingPoint = { x: 0, y: 0 };
  let i = 0;
  const labMap = [];
  for await (const line of rl) {
    labMap.push(line.split(""));
    const j = labMap[i].findIndex((x) => x === "^");
    if (j !== -1) {
      startingPoint.y = i;
      startingPoint.x = j;
    }
    i++;
  }
  return { labMap, startingPoint };
};

const directionsMap = {
  0: { x: 0, y: -1 },
  1: { x: 1, y: 0 },
  2: { x: 0, y: 1 },
  3: { x: -1, y: 0 },
};

const goGoGo = (directionIndex = 0, position = { x: 0, y: 0 }, labMap = [["^"]]) => {
  let direction = directionsMap[directionIndex];
  const newPosition = { x: position.x + direction.x, y: position.y + direction.y };
  if (newPosition.x < 0 || newPosition.y < 0 || newPosition.x > labMap.length - 1 || newPosition.y > labMap[0].length - 1) {
    return true;
  }
  if (labMap[newPosition.y][newPosition.x] === "#" || labMap[newPosition.y][newPosition.x] === "O") {
    return false;
  }
  let walk = goGoGo(directionIndex, newPosition, labMap);
  while (!walk) {
    directionIndex++;
    walk = goGoGo(directionIndex % 4, newPosition, labMap);
  }
  labMap[newPosition.y][newPosition.x] = "X";
  return true;
};

const part1 = async () => {
  const { labMap, startingPoint } = await getInputs("test2.txt");
  goGoGo(0, startingPoint, labMap);
  let sum = 0;
  for (let i = 0; i < labMap[0].length; i++) {
    for (let j = 0; j < labMap.length; j++) {
      if (labMap[j][i] === "X") {
        sum++;
      }
    }
  }
  return sum;
};

const RESULTS = {
  LOOP: "loop",
  END: "end",
  OBSTACLE: "obstacle",
};

const goGoGoV2 = (directionIndex = 0, startingPoint = { x: 0, y: 0 }, labMap = [["^"]]) => {
  let position = startingPoint;

  let i = 0;
  while (true) {
    let direction = directionsMap[directionIndex];
    let newPosition = { x: position.x + direction.x, y: position.y + direction.y };
    if (newPosition.x < 0 || newPosition.y < 0 || newPosition.x > labMap.length - 1 || newPosition.y > labMap[0].length - 1) {
      return RESULTS.END;
    }
    while (labMap[newPosition.y][newPosition.x] === "#" || labMap[newPosition.y][newPosition.x] === "O") {
      directionIndex = (directionIndex + 1) % 4;
      direction = directionsMap[directionIndex];
      newPosition = { x: position.x + direction.x, y: position.y + direction.y };
    }
    if (labMap[newPosition.y][newPosition.x] === directionIndex) {
      return RESULTS.LOOP;
    }
    position = newPosition;
    labMap[position.y][position.x] = directionIndex;
    i++;
  }
};

const cloneArray = (labMap = [["^"]]) => {
  const clone = [];
  for (let i = 0; i < labMap.length; i++) {
    clone.push([...labMap[i]]);
  }
  return clone;
};

const part2 = async () => {
  const { labMap, startingPoint } = await getInputs("test2.txt");
  goGoGo(0, startingPoint, labMap);
  let sum = 0;
  const obstacles = [];
  for (let i = 0; i < labMap[0].length; i++) {
    for (let j = 0; j < labMap.length; j++) {
      if (labMap[j][i] === "X" && (i !== startingPoint.x || j !== startingPoint.y)) {
        obstacles.push({ x: i, y: j });
      }
    }
  }
  const results = await Promise.all(
    obstacles.map(async ({ x, y }) => {
      const labMapCopy = cloneArray(labMap);
      labMapCopy[y][x] = "O";
      const ret = goGoGoV2(0, { x: startingPoint.x, y: startingPoint.y }, labMapCopy);
      return ret;
    })
  );
  return results.filter((x) => x === RESULTS.LOOP).length;
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
};

main();
