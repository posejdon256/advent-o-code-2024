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
  while (l < r) {
    if (word[l] !== pattern[i]) {
      return false;
    }
    l++;
    i++;
  }
  return true;
};

const canCreateLayout = (word = "adasdasdas", ind = 0, patterns = ["sss"], checked = {}) => {
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

const canCreateLayoutV2 = (word = "adasdasdas", ind = 0, patterns = ["sss"], checked = {}) => {
  if (ind === word.length) {
    return 1;
  }
  let sum = 0;
  const possiblePatterns = patterns.filter((pattern) => pattern.startsWith(word[ind]));
  for (let i = 0; i < possiblePatterns.length; i++) {
    if (comparePatternAndWord(possiblePatterns[i], ind, ind + possiblePatterns[i].length, word)) {
      if (checked[patterns[i] + ind]) {
        sum += checked[patterns[i] + ind];
      } else {
        const value = canCreateLayoutV2(word, ind + possiblePatterns[i].length, patterns, checked);
        checked[patterns[i] + ind] = value;
        sum += value;
      }
    }
  }
  return sum;
};

module.exports = {
  buildPatternsMap,
  canCreateLayout,
  canCreateLayoutV2,
};
