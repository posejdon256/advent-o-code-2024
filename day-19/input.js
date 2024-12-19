const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  let i = 0;
  let patterns = [];
  let words = [];
  let maxPatternLength = 0;
  for await (const line of rl) {
    if (i === 0) {
      patterns = line.split(", ");
      patterns.map((x) => {
        maxPatternLength = x.length > maxPatternLength ? x.length : maxPatternLength;
      });
    } else if (i !== 1) {
      words.push(line);
    }
    i++;
  }
  return { words, patterns, maxPatternLength };
};

module.exports = {
  getInputs,
};
