const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });
  let map = {};
  for await (const line of rl) {
    const w = line.split("-");
    if (!map[w[0]]) {
      map[w[0]] = [];
    }
    if (!map[w[1]]) {
      map[w[1]] = [];
    }
    map[w[0]].push(w[1]);
    map[w[1]].push(w[0]);
  }
  // console.log(map);
  return { map };
};

module.exports = {
  getInputs,
};
