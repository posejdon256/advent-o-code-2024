const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");

const part1 = async () => {
  const { keys, locks } = await getInputs("test2.txt");
  console.log(keys);
  console.log(locks);
  const locksSizes = [];
  for (let i = 0; i < locks.length; i++) {
    locksSizes.push([]);
    for (let j = 0; j < locks[i][0].length; j++) {
      let sum = 0;
      for (let k = 0; k < locks[i].length; k++) {
        if (locks[i][k][j] === "#") {
          sum += 1;
        }
      }
      locksSizes[i].push(sum);
    }
  }
  const keysSizes = [];
  let howManyPairs = 0;
  for (let i = 0; i < keys.length; i++) {
    keysSizes.push([]);
    for (let j = 0; j < keys[i][0].length; j++) {
      let sum = 0;
      for (let k = 0; k < keys[i].length; k++) {
        if (keys[i][k][j] === "#") {
          sum += 1;
        }
      }
      keysSizes[i].push(sum);
    }
  }
  for (let i = 0; i < keysSizes.length; i++) {
    for (let j = 0; j < locksSizes.length; j++) {
      let isLockOk = true;
      for (let k = 0; k < locksSizes[j].length; k++) {
        if (locksSizes[j][k] + keysSizes[i][k] > 7) {
          //  console.log('Not ok', )
          isLockOk = false;
          break;
        }
      }
      if (isLockOk) {
        howManyPairs++;
      }
    }
  }
  return howManyPairs;
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
