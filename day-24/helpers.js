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
    wires[this.output] = this.#operation(wires[this.left], wires[this.right]);
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
    //  console.log(this.#gates.length);
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
  checkWhichBitesreWrong = (coorectZ = "") => {
    const findOperationForAAndB = (x, A, B, operation) => {
      return ((x.left === A && x.right === B) || (x.left === B && x.right === A)) && operation === x.getOperation();
    }; //z14 <-> hbk, kvn <-> z18, cvh <-> tfn, z23 <-> dbb
    const bad = [];
    const S = this.#wires[this.#gates.find((x) => findOperationForAAndB(x, "x00", "y00", xor)).output] === parseInt(coorectZ[coorectZ.length - 1]);
    let cOut = this.#gates.find((x) => findOperationForAAndB(x, "x00", "y00", _and)).output;
    for (let i = 1; i <= 44; i++) {
      const A = "x" + (i < 10 ? "0" + i : i);
      const B = "y" + (i < 10 ? "0" + i : i);
      const _xor1OutPut = this.#gates.find((x) => findOperationForAAndB(x, A, B, xor)).output;
      const _and1OutPut = this.#gates.find((x) => findOperationForAAndB(x, A, B, _and)).output;
      const _xor2Output = this.#gates.find((x) => findOperationForAAndB(x, _xor1OutPut, cOut, xor))?.output;
      const _and2Output = this.#gates.find((x) => findOperationForAAndB(x, _xor1OutPut, cOut, _and))?.output;
      console.log(cOut);
      cOut = this.#gates.find((x) => findOperationForAAndB(x, _and1OutPut, _and2Output, or))?.output;
      const isSOk =
        (this.#wires[_xor2Output] === parseInt(coorectZ[coorectZ.length - 1 - i]) || (i > coorectZ.length - 1 && this.#wires[_xor1OutPut] === 0)) &&
        _xor2Output === "z" + (i < 10 ? "0" + i : i) &&
        cOut &&
        _xor2Output &&
        _and2Output;
      if (!isSOk) {
        console.log(A, B, _xor1OutPut, cOut, _xor2Output, this.#wires[_xor1OutPut]);
        bad.push(i);
      }
      console.log("ok", i, isSOk);
    }
    console.log(S, cOut);
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
}

const findBitCorrectNumber = (a = "111", b = "1000") => {
  const decimal = parseInt(a, 2) + parseInt(b, 2);
  return (decimal >>> 0).toString(2);
};

module.exports = {
  OperationManager,
  findBitCorrectNumber,
};
