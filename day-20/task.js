const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { bfs, findAllWalls, findAllCheats } = require("./helpers");
const { cloneArray } = require("../helpers/array");

const part1 = async () => {
  const { map, start } = await getInputs("test2.txt");
  const walls = findAllWalls(map);
  console.log((map.length - 1) * (map[0].length - 1) - walls.length);
  const max = bfs(map, start);
  let sum = 0;
  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    const _map = cloneArray(map);
    _map[wall.y][wall.x] = ".";
    const val = bfs(_map, start);
    if (val <= max - 100) {
      sum++;
    }
  }
  return sum;
};

const part2 = async () => {
  const { map, start } = await getInputs("test.txt");
  const cheats = findAllCheats(map, start);
  // console.log(cheats);
  let sum = cheats;
  // for (let i = 0; i < walls.length; i++) {
  //   const wall = walls[i];
  //   const _map = cloneArray(map);
  //   _map[wall.y][wall.x] = ".";
  //   const val = bfs(_map, start);
  //   if (val <= max - 100) {
  //     sum++;
  //   }
  // }
  return sum;
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();

  // console.log(cost[1][2]);
  //  console.log(cost);
};

main();
