const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./helpers");

const part1 = async () => {
  const { lines } = await getInputs("test.txt");
  return 0;
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
