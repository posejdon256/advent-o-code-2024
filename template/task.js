const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");

const part1 = async () => {
  const { lines } = await getInputs("test.txt");
  return 0;
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  return 0;
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();
};

main();
