const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const secrets = [];
  for await (const line of rl) {
    secrets.push(parseInt(line));
  }
  return { secrets };
};

module.exports = {
  getInputs,
};
