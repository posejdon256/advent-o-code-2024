const { Operations } = require("./helpers");

const unitTemplate = ({ functionToCheck, params, name, check }) => {
  const funResult = functionToCheck(...params);
  const result = check(funResult);
  if (!result) {
    console.log(`Issue with test ${name}: ${funResult}`);
  }
  return {
    name,
    result,
  };
};

const generateUnits = () => [
  () => {
    const operations = new Operations({ A: 0, B: 0, C: 9 }, [2, 6]);
    operations.performOperations();
    console.log("B", operations.REGISTERS.B);
    return {
      name: "Unit 1",
      result: operations.REGISTERS.B === 1,
    };
  },
  () => {
    const operations = new Operations({ A: 10, B: 0, C: 9 }, [5, 0, 5, 1, 5, 4]);
    const output = operations.performOperations();
    console.log("output", output);
    return {
      name: "Unit 2",
      result: output === "0,1,2",
    };
  },
  () => {
    const operations = new Operations({ A: 2024, B: 0, C: 0 }, [0, 1, 5, 4, 3, 0]);
    const output = operations.performOperations();
    console.log("output", output);
    return {
      name: "Unit 3",
      result: output === "4,2,5,6,7,7,7,7,3,1,0" && operations.REGISTERS.A === 0,
    };
  },
  () => {
    const operations = new Operations({ A: 0, B: 29, C: 0 }, [1, 7]);
    const output = operations.performOperations();
    console.log("B", operations.REGISTERS.B);
    return {
      name: "Unit 4",
      result: operations.REGISTERS.B === 26,
    };
  },
  () => {
    const operations = new Operations({ A: 0, B: 2024, C: 43690 }, [4, 0]);
    const output = operations.performOperations();
    return {
      name: "Unit 5",
      result: operations.REGISTERS.B === 44354,
    };
  },
  () => {
    const operations = new Operations({ A: 729, B: 0, C: 0 }, [0, 1, 5, 4, 3, 0]);
    const output = operations.performOperations();
    return {
      name: "Unit 5",
      result: output === "4,6,3,5,6,3,5,2,1,0",
    };
  },
  () => {
    const operations = new Operations({ A: 103275396, B: 0, C: 0 }, [2, 4, 1, 3, 7, 5, 1, 5, 0, 3, 4, 2, 5, 5, 3, 0]);
    const output = operations.performOperations();
    console.log(output);
    return {
      name: "Unit 5",
      result: output === "4,6,3,5,6,3,5,2,1,0",
    };
  },
];

const checkUnits = () => {
  const units = generateUnits();
  console.log("---------------------Unit Tests----------------------");
  units.forEach((unit) => {
    const { result, name } = unit();
    console.log(name, result);
  });
};

module.exports = {
  checkUnits,
};
