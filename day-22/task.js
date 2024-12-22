const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { makeManyOperations, operation, getSequenceIndex, getSequenceValue } = require("./helpers");

const part1 = async () => {
  const { secrets } = await getInputs("test.txt");
  let sum = 0;
  for (let i = 0; i < secrets.length; i++) {
    sum += makeManyOperations(secrets[i], 2000);
  }
  return sum;
};
const part2 = async () => {
  const { secrets } = await getInputs("test.txt");
  //const secrets = [123];
  let sum = 0;
  const sequences = {};
  for (let i = 0; i < secrets.length; i++) {
    // console.log("Secret", i);
    let secret = secrets[i];
    let first = operation(secret);
    let second = operation(first);
    let third = operation(second);
    let fourth = operation(third);
    let sequence = [getSequenceValue(secret, first), getSequenceValue(first, second), getSequenceValue(second, third), getSequenceValue(third, fourth)];
    //console.log(sequence);
    for (let j = 5; j < 2000; j++) {
      const index = getSequenceIndex(sequence);
      if (!sequences[index]) {
        sequences[index] = new Array(secrets.length).fill(0);
      }
      const value = fourth % 10;
      // console.log(i, value);
      if (sequences[index][i] === 0) {
        sequences[index][i] = value;
      }
      secret = first;
      first = second;
      second = third;
      third = fourth;
      fourth = operation(third);
      sequence = [getSequenceValue(secret, first), getSequenceValue(first, second), getSequenceValue(second, third), getSequenceValue(third, fourth)];
      // console.log(sequence);
    }
    //  break;
  }
  const values = Object.entries(sequences);
  let max = 0;
  let best = "";
  let bestSequence = "";
  for (let i = 0; i < values.length; i++) {
    const value = values[i][1].reduce((prev, curr) => prev + curr, 0);
    if (max < value) {
      max = value;
      best = i;
      bestSequence = values[i][0];
    }
  }
  console.log(bestSequence, max);
  return max;
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();
};

main();
