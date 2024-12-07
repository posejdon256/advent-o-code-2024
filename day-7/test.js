const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }
  return { lines };
};

const OPERATIONS = [(a, b) => a + b, (a, b) => a * b, (a, b) => parseInt(a.toString() + b.toString())];
const OPERATIONST = ["+", "*", "||"];

const permute = (arrLen, depth, i = 0, combs = [[OPERATIONS[0]]]) => {
  if (arrLen === depth) {
    return [[OPERATIONS[i]]];
  }
  const combsCopy = [];
  for (let j = 0; j < OPERATIONS.length; j++) {
    const combsPart = permute(arrLen, depth + 1, j, combs);
    for (let k = 0; k < combsPart.length; k++) {
      combsPart[k] = [OPERATIONS[i], ...combsPart[k]];
    }
    combsCopy.push(...combsPart);
  }
  return combsCopy;
};

const part1 = async () => {
  const { lines } = await getInputs("test2.txt");
  let permutationsPreCalculated = new Array(12).fill(1).map((x, ind) => permute(ind, 0, 0, []).concat(permute(ind, 0, 1, [])));
  //console.log(permutationsPreCalculated);
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    let found = false;
    const splitted = lines[i].split(":");
    const result = parseInt(splitted[0]);
    const numbers = splitted[1]
      .split(" ")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x));
    //console.log(numbers.length);
    const permutations = permutationsPreCalculated[numbers.length - 2];
    //console.log(permutations);
    permutations.forEach((permutation) => {
      const equationArray = [];
      for (let j = 0; j < numbers.length; j++) {
        equationArray.push(numbers[j]);
        if (j !== numbers.length - 1) {
          equationArray.push(permutation[j]);
        }
      }
      let ind = equationArray.findIndex((x) => x === OPERATIONS[0] || x === OPERATIONS[1]);
      while (ind !== -1) {
        const newMulValue = equationArray[ind](equationArray[ind - 1], equationArray[ind + 1]);
        equationArray.splice(ind - 1, 3, newMulValue);
        ind = equationArray.findIndex((x) => x === OPERATIONS[0] || x === OPERATIONS[1]);
        if (equationArray[0] > result) {
          break;
        }
      }
      if (equationArray[0] === result) {
        found = true;
      }
    });
    if (found) {
      sum += result;
    }
  }
  return sum;
};

const part2 = async () => {
  const { lines } = await getInputs("test2.txt");
  let permutationsPreCalculated = new Array(12).fill(1).map((x, ind) => permute(ind, 0, 0, []).concat(permute(ind, 0, 1, []).concat(permute(ind, 0, 2, []))));
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    let found = false;
    const splitted = lines[i].split(":");
    const result = parseInt(splitted[0]);
    const numbers = splitted[1]
      .split(" ")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x));
    const permutations = permutationsPreCalculated[numbers.length - 2];
    permutations.forEach((permutation) => {
      const equationArray = [];
      for (let j = 0; j < numbers.length; j++) {
        equationArray.push(numbers[j]);
        if (j !== numbers.length - 1) {
          equationArray.push(permutation[j]);
        }
      }
      let ind = equationArray.findIndex((x) => x === OPERATIONS[0] || x === OPERATIONS[1] || x === OPERATIONS[2]);
      while (ind !== -1) {
        const newMulValue = equationArray[ind](equationArray[ind - 1], equationArray[ind + 1]);
        equationArray.splice(ind - 1, 3, newMulValue);
        ind = equationArray.findIndex((x) => x === OPERATIONS[0] || x === OPERATIONS[1] || x === OPERATIONS[2]);
        if (equationArray[0] > result) {
          break;
        }
      }
      if (equationArray[0] === result) {
        found = true;
      }
    });
    if (found) {
      sum += result;
    }
  }
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
};

main();
