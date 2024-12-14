const { Point } = require("../helpers/points");
const { calculateNewPosition, Robot, getQuadrant } = require("./helpers");

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
  () =>
    unitTemplate({
      functionToCheck: calculateNewPosition,
      params: [new Robot(new Point(2, 0), new Point(0, 0)), new Point(103, 101)],
      name: "Calculate new positions",
      check: (result) => result,
    }),
  () =>
    unitTemplate({
      functionToCheck: calculateNewPosition,
      params: [new Robot(new Point(2, 4), new Point(2, -3)), new Point(11, 7)],
      name: "Calculate new positions 2",
      check: (result) => result,
    }),
  () =>
    unitTemplate({
      functionToCheck: getQuadrant,
      params: [new Point(0, 0), new Point(11, 7)],
      name: "Calculate new positions 2",
      check: (result) => result === 1,
    }),
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
