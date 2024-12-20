const { findAllCheats } = require("./helpers");
const { getInputs } = require("./input");

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
    const arr = [
      ["#", "#", "#", "#", "#"],
      ["#", ".", "S", ".", "#"],
      ["#", "E", ".", ".", "#"],
      ["#", "#", "#", "#", "#"],
    ];
    const cheats = findAllCheats(arr);
    return {
      result: cheats === 0,
      name: "Find E",
    };
  },
  () => {
    const arr = [
      ["#", "#", "#", "#", "#"],
      ["#", ".", "S", ".", "#"],
      ["#", ".", "#", ".", "#"],
      ["#", ".", ".", "E", "#"],
      ["#", "#", "#", "#", "#"],
    ];
    const cheats = findAllCheats(arr);
    console.log("Cheats", cheats);
    // console.log(cost[1][2]);
    //  console.log(cost);
    return {
      result: cheats === 1,
      name: "Find E 2",
    };
  },
  () => {
    const arr = [
      ["#", "#", "#", "#", "#"],
      ["#", ".", "S", ".", "#"],
      ["#", ".", "#", "#", "#"],
      ["#", ".", ".", "E", "#"],
      ["#", "#", "#", "#", "#"],
    ];
    const cheats = findAllCheats(arr);
    console.log("Cheats", cheats);
    // console.log(cost[1][2]);
    //  console.log(cost);
    return {
      result: cheats === 3,
      name: "Find E 2",
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
