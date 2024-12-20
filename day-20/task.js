const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { bfs, findAllWalls, prepareVisited } = require("./helpers");
const { cloneArray } = require("../helpers/array");

const part1 = async () => {
  const { map, start } = await getInputs("test2.txt");
  const walls = findAllWalls(map);
  const max = bfs(map, start, prepareVisited(map), true);
  let sum = 0;
  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    const _map = cloneArray(map);
    _map[wall.y][wall.x] = ".";
    const val = bfs(_map, start, prepareVisited(map), true);
    if (val <= max - 100) {
      sum++;
    }
  }
  return sum;
};

const part2 = async () => {
  const { map, start } = await getInputs("test2.txt");
  const visited = prepareVisited(map);
  bfs(map, start, visited);
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      for (let k = 0; k < map.length; k++) {
        for (let m = 0; m < map[0].length; m++) {
          if (k < i || (k === i && j >= m)) {
            continue;
          }
          if (visited[i][j] !== -1 && visited[k][m] !== -1) {
            const bigger = Math.max(visited[k][m], visited[i][j]);
            const smaller = Math.min(visited[k][m], visited[i][j]);
            if (bigger - (smaller + Math.abs(k - i) + Math.abs(m - j)) >= 100 && Math.abs(k - i) + Math.abs(m - j) <= 20) {
              sum++;
            }
          }
        }
      }
    }
  }
  return sum;
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();

  // console.log(cost[1][2]);
  //  console.log(cost);
};

main();
