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
const getColorNumber = (regex, part) => {
  const color = parseInt(part.match(regex)?.toString().split(" ")[0]);
  if (isNaN(color)) {
    return -1;
  }
  return color;
};
const doesItMatch = (regex, part, max) => {
  const color = getColorNumber(regex, part);
  if (color <= max) {
    return true;
  }
  return false;
};

const part1 = async () => {
  const { lines } = await getInputs("test2.txt");
  const max = { red: 12, green: 13, blue: 14 };
  let sum = 0;
  lines.forEach((line) => {
    const gameNumberReg = /[0-9]*\:/g;
    const gameNumber = parseInt(line.match(gameNumberReg).toString().split(":")[0]);

    const parts = line.split(";");
    let bad = false;
    parts.forEach((part) => {
      if (!doesItMatch(/[0-9]* red/g, part, max.red)) {
        bad = true;
      }
      if (!doesItMatch(/[0-9]* green/g, part, max.green)) {
        bad = true;
      }
      if (!doesItMatch(/[0-9]* blue/g, part, max.blue)) {
        bad = true;
      }
    });
    if (!bad) {
      sum += gameNumber;
    }
    console.log(parts);
  });
  return sum;
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  let sum = 0;
  lines.forEach((line) => {
    const parts = line.split(";");
    let gamePower = 0;
    let maxInGame = { red: -1, green: -1, blue: -1 };
    parts.forEach((part) => {
      const red = getColorNumber(/[0-9]* red/g, part);
      const green = getColorNumber(/[0-9]* green/g, part);
      const blue = getColorNumber(/[0-9]* blue/g, part);
      maxInGame.red = Math.max(maxInGame.red, red);
      maxInGame.blue = Math.max(maxInGame.blue, blue);
      maxInGame.green = Math.max(maxInGame.green, green);
    });
    gamePower = maxInGame.red * maxInGame.green * maxInGame.blue;
    sum += gamePower;
    console.log(gamePower);
  });
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
};

main();
