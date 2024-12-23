const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { find3Cycles, getIndexFromCycle } = require("./helpers");

const part1 = async () => {
  const { map } = await getInputs("test2.txt");
  const indexes = Object.keys(map);
  let cycles = [];
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i][0] === "t") {
      cycles.push(...find3Cycles(map, indexes[i]));
    }
  }
  const cyclesMap = {};
  cycles.map((x) => x.sort()).sort();
  for (let i = 0; i < cycles.length; i++) {
    cyclesMap[getIndexFromCycle(cycles[i])] = true;
  }
  return Object.keys(cyclesMap).length;
};

const part2 = async () => {
  const { map } = await getInputs("test2.txt");
  const indexes = Object.keys(map);
  let cycles = [];
  for (let i = 0; i < indexes.length; i++) {
    cycles.push(...find3Cycles(map, indexes[i], false));
  }
  const cyclesMap = {};
  cycles.map((x) => x.sort()).sort();
  for (let i = 0; i < cycles.length; i++) {
    cyclesMap[getIndexFromCycle(cycles[i])] = true;
  }
  //part 2
  console.log("Second part");
  const threeCycles = Object.keys(cyclesMap).map((x) => x.split("_"));
  for (let i = 0; i < threeCycles.length; i++) {
    console.log(i, threeCycles.length);
    const cycle = threeCycles[i];
    for (let j = 0; j < indexes.length; j++) {
      if (cycle.includes(indexes[j])) {
        continue;
      }
      let canAddIndexToCycle = true;
      for (let k = 0; k < cycle.length; k++) {
        if (!map[indexes[j]].includes(cycle[k])) {
          canAddIndexToCycle = false;
          break;
        }
      }
      if (canAddIndexToCycle) {
        const newCycle = [...cycle, indexes[j]];
        if (!cyclesMap[getIndexFromCycle(newCycle)]) {
          threeCycles.push(newCycle);
          cyclesMap[getIndexFromCycle(newCycle)] = true;
        }
      }
    }
  }
  return threeCycles.map((x) => x.sort())[threeCycles.length - 1].join(",");
};

const main = async () => {
  await printSolution(part1, part2);
  checkUnits();
};

main();
