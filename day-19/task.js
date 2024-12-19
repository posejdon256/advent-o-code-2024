const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { canCreateLayout, canCreateLayoutV2 } = require("./helpers");

const part1 = async () => {
  const { words, patterns, maxPatternLength } = await getInputs("test2.txt");
  let sum = 0;
  for (let i = 0; i < words.length; i++) {
    const _patterns = patterns.filter((x) => words[i].includes(x));
    if (canCreateLayout(words[i], 0, patterns, {})) {
      sum++;
    }
  }
  return sum;
};

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const part2 = async () => {
  const { words, patterns: _patterns } = await getInputs("test2.txt");
  let sum = 0;
  for (let i = 0; i < words.length; i++) {
    const patterns = _patterns.filter(onlyUnique);
    if (!canCreateLayout(words[i], 0, patterns, {})) {
      continue;
    }
    const res = canCreateLayoutV2(words[i], 0, patterns, {});
    sum += res;
  }
  return sum;
};

const main = async () => {
  await printSolution(part1, part2);
  //checking units
  checkUnits();
};

main();
