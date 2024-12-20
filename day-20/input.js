const readline = require("readline");
const fs = require("fs");
const { Point } = require("../helpers/points");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const map = [];
  let i = 0;
  let start = new Point(-1, -1);
  for await (const line of rl) {
    const row = line.split("");
    const sIndex = row.findIndex((x) => x === "S");
    if (sIndex !== -1) {
      start = new Point(sIndex, i);
    }
    map.push(row);
    i++;
  }
  return { map, start };
};

module.exports = {
  getInputs,
};
