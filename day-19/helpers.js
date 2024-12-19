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

const canCreateLayoutV2 = (word = "adasdasdas", ind = 0, patterns = ["sss"], checked = {}) => {
  //console.log(word, ind);
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

const findAllPlacesForPatterns = (patterns = ["asa"], word) => {
  const places = {};
  for (let i = 0; i < patterns.length; i++) {
    let index = 0;
    let startIndex = 0;
    places[patterns[i]] = new Array(word.length).fill(0);
    while ((index = word.indexOf(patterns[i], startIndex)) > -1) {
      places[patterns[i]][index] = patterns[i].length;
      startIndex = index + patterns[i].length;
    }
  }
  // console.log(word, places);
  return places;
};

const findAllPaths = (map = { rww: [0, 1] }, ind = 0, size, cache = {}) => {
  if (ind >= size) {
    return 1;
  }
  let sum = 0;
  const rec = Object.entries(map)
    .map(([key, value]) => {
      return { key, value: value[ind] };
    })
    .filter((x) => x.value >= 1);
  for (let i = 0; i < rec?.length; i++) {
    const cacheIndex = `${rec[i].key}_${ind + rec[i].value}`;
    if (cache[cacheIndex]) {
      sum += cache[cacheIndex];
    } else {
      const value = findAllPaths(map, ind + rec[i].value, size, cache);
      cache[cacheIndex] = value;
      sum += value;
    }
  }
  return sum;
};
module.exports = {
  buildPatternsMap,
  canCreateLayout,
  canCreateLayoutV2,
  findAllPlacesForPatterns,
  findAllPaths,
};
