const readline = require("readline");
const fs = require("fs");
const { checkUnits } = require("./unit-tests");
const { getDirection, moveElementIntoDirection, canMoveV2, moveV2 } = require("./helpers");
const { Point } = require("../helpers/points");

const getInputs = async (testString, doubled = false) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const arr = [];
  let moves = [];
  let start;
  let i = 0;
  for await (const line of rl) {
    if (line.includes("#")) {
      if (doubled) {
        let _line = "";
        for (let i = 0; i < line.length; i++) {
          if (line[i] === "@") {
            _line += "@.";
          } else if (line[i] === "O") {
            _line += "[]";
          } else {
            _line += `${line[i]}${line[i]}`;
          }
        }
        arr.push(_line.split(""));
      } else {
        arr.push(line.split(""));
      }

      const j = arr[i].findIndex((x) => x === "@");
      if (arr[i].findIndex((x) => x === "@") !== -1) {
        start = new Point(j, i);
      }
    } else {
      moves.push(...line.split("").map((x) => getDirection(x)));
    }
    i++;
  }
  return { arr, moves, start };
};

const part1 = async () => {
  const { arr, moves, start } = await getInputs("test2.txt");
  let point = start;
  for (let i = 0; i < moves.length; i++) {
    const wasMoved = moveElementIntoDirection(arr, moves[i], point, arr[point.y][point.x]);
    if (wasMoved) {
      arr[point.y][point.x] = ".";
      point = point.add(moves[i].coordinates);
    }
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === "O") {
        sum += 100 * i + j;
      }
    }
  }
  return sum;
};

const part2 = async () => {
  const { arr, moves, start } = await getInputs("test2.txt", true);
  // console.log(arr.map((x) => x.join("")));
  let point = start;
  for (let i = 0; i < moves.length; i++) {
    const canMove = canMoveV2(arr, moves[i], point);
    if (canMove) {
      moveV2(arr, moves[i], point, arr[point.y][point.x]);
      arr[point.y][point.x] = ".";
      point = point.add(moves[i].coordinates);
    }
    // console.log(
    //   arr.map((x) => x.join("")),
    //   moves[i].name
    // );
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === "[") {
        sum += 100 * i + j;
      }
    }
  }
  console.log(arr.map((x) => x.join("")));
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
