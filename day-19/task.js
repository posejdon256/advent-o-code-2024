const { checkUnits } = require("./unit-tests");
const { printSolution } = require("../helpers/print");
const { getInputs } = require("./input");
const { buildPatternsMap, canCreateLayout, canCreateLayoutV2 } = require("./helpers");

const part1 = async () => {
  const { words, patterns, maxPatternLength } = await getInputs("test2.txt");
  let sum = 0;
  for (let i = 0; i < words.length; i++) {
    const _patterns = patterns.filter((x) => words[i].includes(x));
    // console.log(patterns.length, _patterns.length);
    // if (canCreateLayout(words[i], 0, patterns, {})) {
    //   // console.log("I", i);
    //   sum++;
    // }
  }
  return sum;
};

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const part2 = async () => {
  const { words, patterns: _patterns, maxPatternLength } = await getInputs("test2.txt");
  const patterns = _patterns.filter(onlyUnique);
  const miningFulPatterns = [];
  const patternFoundForPattern = {};
  patterns.sort((a, b) => b.length - a.length);
  for (let i = 0; i < patterns.length; i++) {
    const patternsCopy = patterns.slice(i + 1, patterns.length);
    const patternsFound = canCreateLayoutV2(patterns[i], 0, patternsCopy, "");
    if (patternsFound.length === 0) {
      miningFulPatterns.push(patterns[i]);
    } else {
      patternFoundForPattern[patterns[i]] = patternsFound;
    }
  }
  // console.log(patternFoundForPattern);
  let sum = 0;
  for (let i = 0; i < words.length; i++) {
    const _patterns = patterns.filter((x) => words[i].includes(x));
    console.log(i, _patterns.length);
    const results = canCreateLayoutV2(words[i], 0, _patterns, "");
    sum += results.length;
  }
  //   const values = Object.values(patternFoundForPattern);
  //   for (let m = 0; m < results.length; m++) {
  //     for (let j = 0; j < values.length; j++) {
  //       let multiplier = 1;
  //       for (let k = 0; k < values[j].length; k++) {
  //         let startIndex = 0;
  //         let index = 0;
  //         while ((index = results[m].indexOf(values[j][k], startIndex)) > -1) {
  //           startIndex = index + values[j][k].length;
  //           sum++;
  //         }
  //       }
  //       //  sum += multiplier;
  //       //  console.log(results.length, multiplier, results[0]);
  //     }
  //     // break;
  //   }
  // }
  return sum;
};

const main = async () => {
  await printSolution(part1, part2);
  //checking units
  checkUnits();
};

main();
