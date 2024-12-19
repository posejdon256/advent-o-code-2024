const buildPatternsMap = (patterns) => {
  const map = {};
  patterns.forEach((pattern) => {
    if (!map[pattern]) {
      map[pattern] = true;
    }
  });
  return map;
};

const comparePatternAndWord = (pattern = "sss", l = 0, r = 100, word) => {
  i = 0;
  // console.log(word, pattern, word[l], pattern[i], l, r);
  while (l < r) {
    if (word[l] !== pattern[i]) {
      //  console.log("false");
      return false;
    }
    l++;
    i++;
  }
  // console.log("true");
  return true;
};

const canCreateLayout = (word = "adasdasdas", ind = 0, patterns = ["sss"], checked = {}) => {
  //console.log(word, ind);
  if (ind === word.length) {
    return true;
  }
  if (checked[ind]) {
    return false;
  }
  checked[ind] = true;
  const possiblePatterns = patterns.filter((pattern) => pattern.startsWith(word[ind]));
  for (let i = 0; i < possiblePatterns.length; i++) {
    if (comparePatternAndWord(possiblePatterns[i], ind, ind + possiblePatterns[i].length, word)) {
      if (canCreateLayout(word, ind + possiblePatterns[i].length, patterns, checked)) {
        return true;
      }
    }
  }
  return false;
};

const findAllPlacesForPatterns = (patterns = ["asa"], word) => {
  for (let i = 0; i < patterns.length; i++) {
    let index = 0;
    while ((index = word.indexOf(patterns, startIndex)) > -1) {
      startIndex = index + values[j][k].length;
      sum++;
    }
  }
};

const canCreateLayoutV2 = (word = "adasdasdas", ind = 0, patterns = ["sss"], currentPattern = "adas") => {
  // console.log(currentPattern);
  if (ind === word.length) {
    return [currentPattern + "_"];
  }
  const possiblePatterns = patterns.filter((pattern) => pattern.startsWith(word[ind]));
  let patternsToReurn = [];
  for (let i = 0; i < possiblePatterns.length; i++) {
    //  console.log("I", possiblePatterns.length);

    if (comparePatternAndWord(possiblePatterns[i], ind, ind + possiblePatterns[i].length, word)) {
      patternsToReurn = [
        ...canCreateLayoutV2(word, ind + possiblePatterns[i].length, patterns, currentPattern + "_" + possiblePatterns[i]),
        ...patternsToReurn,
      ];
    }
  }
  return patternsToReurn;
};
module.exports = {
  buildPatternsMap,
  canCreateLayout,
  canCreateLayoutV2,
};
