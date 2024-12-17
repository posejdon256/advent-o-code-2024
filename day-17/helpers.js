class Operations {
  #adv = (operand = 2) => {
    //0
    this.REGISTERS.A = Math.floor(this.REGISTERS.A / Math.pow(2, this.getOperandValue(operand)));
    return { output: "" };
  };
  #bxl = (operand = 2) => {
    //1
    this.REGISTERS.B = operand ^ this.REGISTERS.B;
    return { output: "" };
  };
  #bst = (operand = 2) => {
    //2
    this.REGISTERS.B = this.getOperandValue(operand) % 8;
    return { output: "" };
  };
  #jnz = (operand = 2) => {
    //3
    if (this.REGISTERS.A === 0) {
      return { output: "" };
    }
    return { output: "", stepper: operand };
  };
  #bxc = (operand = 2) => {
    //4
    this.REGISTERS.B = this.REGISTERS.B ^ this.REGISTERS.C;
    return { output: "" };
  };
  #out = (operand = 2) => {
    //5
    return { output: this.getOperandValue(operand) % 8 };
  };
  #bdv = (operand = 2) => {
    //6
    this.REGISTERS.B = Math.floor(this.REGISTERS.A / Math.pow(2, this.getOperandValue(operand)));
    return { output: "" };
  };
  #cdv = (operand = 2) => {
    //7
    this.REGISTERS.C = Math.floor(this.REGISTERS.A / Math.pow(2, this.getOperandValue(operand)));
    return { output: "" };
  };

  REGISTERS = {
    A: 0,
    B: 0,
    C: 0,
  };
  #OPERATIONS = {
    0: this.#adv,
    1: this.#bxl,
    2: this.#bst,
    3: this.#jnz,
    4: this.#bxc,
    5: this.#out,
    6: this.#bdv,
    7: this.#cdv,
  };

  getOperandValue(value) {
    if (value <= 3) {
      return value;
    }
    return Object.values(this.REGISTERS)[value - 4];
  }
  #operations = [];

  constructor(register = { A: 1, B: 1, C: 1 }, operations = []) {
    this.#operations = operations;
    this.REGISTERS.A = register.A;
    this.REGISTERS.B = register.B;
    this.REGISTERS.C = register.C;
  }

  performOperations() {
    let result = "";
    for (let i = 0; i < this.#operations.length; ) {
      const { output, stepper } = this.#OPERATIONS[this.#operations[i]](this.#operations[i + 1]);
      if (output !== "") {
        result += output;
        result += ",";
      }
      if (stepper !== undefined) {
        i = stepper;
      } else {
        i += 2;
      }
    }
    if (result.length > 0) {
      return result.slice(0, result.length - 1);
    }
    return result;
  }
}

module.exports = {
  Operations,
};
