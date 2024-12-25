const readline = require("readline");
const fs = require("fs");
const { OperationManager } = require("./helpers");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const operationManager = new OperationManager();
  for await (const line of rl) {
    if (line.includes(":")) {
      operationManager.addWire(line);
    }
    if (line.includes("-")) {
      operationManager.addGate(line);
      operationManager.performGates();
    }
  }
  return { operationManager };
};

module.exports = {
  getInputs,
};
