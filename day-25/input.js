const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const keys = [];
  const locks = [];
  let newLockOrKey = [];
  for await (const line of rl) {
    if (line.length === 0) {
      if (newLockOrKey[0][0] === "#") {
        keys.push(newLockOrKey);
      } else {
        locks.push(newLockOrKey);
      }
      newLockOrKey = [];
    } else {
      newLockOrKey.push(line.split(""));
    }
  }
  if (newLockOrKey[0][0] === "#") {
    keys.push(newLockOrKey);
  } else {
    locks.push(newLockOrKey);
  }
  return { keys, locks };
};

module.exports = {
  getInputs,
};
