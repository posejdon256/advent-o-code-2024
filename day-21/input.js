const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    lines.push(line.split(""));
  }
  return { lines };
};

module.exports = {
  getInputs,
};
