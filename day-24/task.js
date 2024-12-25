const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { findBitCorrectNumber } = require("./helpers");

const part1 = async () => {
  const { operationManager } = await getInputs("test2.txt");
  const wires = operationManager.getWires();
  const sortedZKeys = Object.keys(wires)
    .sort()
    .filter((x) => x[0] === "z");
  let bit = "";
  for (let i = sortedZKeys.length - 1; i >= 0; i--) {
    bit += wires[sortedZKeys[i]];
  }
  return parseInt(bit, 2);
};

const part2 = async () => {
  const { operationManager } = await getInputs("test3.txt");
  const x = operationManager.getBitNumberByLetter("x");
  const y = operationManager.getBitNumberByLetter("y");
  const z = operationManager.getBitNumberByLetter("z");
  const zCorrect = findBitCorrectNumber(x, y);
  console.log(parseInt(x, 2), parseInt(y, 2), parseInt(z, 2));
  console.log(z);
  console.log(zCorrect);
  operationManager.checkWhichBitesreWrong(zCorrect);

  return 1;
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();
};

main();
