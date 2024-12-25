const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { findBitCorrectNumber } = require("./helpers");

const part1 = async () => {
  const { operationManager } = await getInputs("test3.txt");
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
  const { operationManager } = await getInputs("test2.txt");
  const x = operationManager.getBitNumberByLetter("x");
  const y = operationManager.getBitNumberByLetter("y");
  const z = operationManager.getBitNumberByLetter("z").split("").reverse().join("");
  const correctZ = findBitCorrectNumber(x, y).split("").reverse().join("");
  console.log(z, correctZ);
  const longer = Math.max(correctZ.length, z.length);
  let sumOfProblems = 0;
  for (let i = 0; i < longer; i++) {
    let compareCorrectZ = i >= longer ? 0 : correctZ[i];
    let compareIncorrectZ = i >= longer ? 0 : z[i];
    if (compareCorrectZ === compareIncorrectZ) {
      const index = "z" + (i < 10 ? "0" + i : i);
      operationManager.markAsGoodForOutput(index);
    }
  }
  for (let i = 0; i < longer; i++) {
    let compareCorrectZ = i >= longer ? 0 : correctZ[i];
    let compareIncorrectZ = i >= longer ? 0 : z[i];
    if (compareCorrectZ !== compareIncorrectZ) {
      const index = "z" + (i < 10 ? "0" + i : i);
      sumOfProblems += operationManager.getWiresForOutput(index, compareCorrectZ).length;
    }
  }

  return sumOfProblems;
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();
};

main();
