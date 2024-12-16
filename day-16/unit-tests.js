const { cloneArray } = require("../helpers/array");
const { Direction, DirectionsEnum } = require("../helpers/directions");
const { Point } = require("../helpers/points");
const { findE } = require("./helpers");

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
      ["#", "#", "#", "#"],
      ["#", ".", "S", "#"],
      ["#", "E", ".", "#"],
      ["#", "#", "#", "#"],
    ];
    const cost = findE(arr, new Point(2, 1));
    console.log(cost);
    return {
      result: cost === 2002,
      name: "Find S",
    };
  },
  () => {
    const arr = [
      ["#", "#", "#", "#", "#"],
      ["#", ".", "S", ".", "#"],
      ["#", "E", ".", ".", "#"],
      ["#", "#", "#", "#", "#"],
    ];
    const cost = findE(arr, new Point(2, 1));
    // console.log(cost[1][2]);
    console.log(cost);
    return {
      result: cost === 2002,
      name: "Find S 2",
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
