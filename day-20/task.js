const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { bfs } = require("./helpers");

const part1 = async () => {
  const { map, start } = await getInputs("test2.txt");
  console.log(start);
  return bfs(map, start);
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  return 0;
};

const main = async () => {
  printSolution(part1, part2);
  checkUnits();
};

main();
