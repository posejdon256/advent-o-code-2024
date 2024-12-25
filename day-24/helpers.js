const xor = (a, b) => +(a !== b);
const _and = (a, b) => +(a === b && a === 1);
const or = (a, b) => +(a === 1 || b === 1);

class Gate {
  left;
  right;
  output;
  baseOn = -1;
  done = false;
  #operation;
  constructor(operation, left, right, output) {
    this.left = left;
    this.right = right;
    this.#operation = (() => {
      if (operation === "XOR") {
        return xor;
      }

      if (operation === "AND") {
        return _and;
      }

      if (operation === "OR") {
        return or;
      }
    })();
    this.output = output;
    this.isGood;
  }
  perform(wires) {
    this.#operation(wires[this.left], wires[this.right]);
    this.done = true;
  }
  isGateCorrect(expectedResult, wires) {
    return expectedResult === this.#operation(wires[this.left], wires[this.right]);
  }
  getOperation() {
    return this.#operation;
  }
}

class OperationManager {
  #wires = {};
  #gates = [];
  constructor() {}
  performGates = () => {
    let prev = -1;
    for (let i = 0; i < this.#gates.length; i++) {
      const gate = this.#gates[i];
      if (this.#wires[gate.left] !== undefined && this.#wires[gate.right] !== undefined && !gate.done) {
        gate.perform(this.#wires);
        if (prev !== -1) {
          gate.baseOn = prev;
        }
        prev = gate;
        i = -1;
      }
    }
  };
  addWire = (str = "dasda") => {
    const parts = str.split(" ");
    this.#wires[parts[0].substring(0, parts[0].length - 1)] = parseInt(parts[1]);
  };
  addGate = (str = "dsd") => {
    const parts = str.split(" ");
    const gate = new Gate(parts[1], parts[0], parts[2], parts[4]);
    this.#gates.push(gate);
  };
  getBitNumberByLetter = (letter = "x") => {
    const sortedKeys = Object.keys(this.#wires)
      .sort()
      .filter((x) => x[0] === letter);
    let bit = "";
    for (let i = sortedKeys.length - 1; i >= 0; i--) {
      bit += this.#wires[sortedKeys[i]];
    }
    return bit;
  };
  getWires() {
    return this.#wires;
  }
  getWiresForOutput(wireOutput = "z01", result) {
    let gate = this.#gates.find((x) => x.output === wireOutput);
    const wireThree = [];
    while (gate !== -1) {
      if (!gate.isGood && !gate.isGateCorrect(result, this.#wires)) {
        wireThree.push(gate);
      }
      gate = gate.baseOn;
    }
    return wireThree;
  }
  markAsGoodForOutput(wireOutput = "z01") {
    let gate = this.#gates.find((x) => x.output === wireOutput);
    while (gate !== -1) {
      gate.isGood = true;
      gate = gate.baseOn;
    }
  }
}

const findBitCorrectNumber = (a = "111", b = "1000") => {
  const decimal = parseInt(a, 2) + parseInt(b, 2);
  return (decimal >>> 0).toString(2);
};

module.exports = {
  OperationManager,
  findBitCorrectNumber,
};
