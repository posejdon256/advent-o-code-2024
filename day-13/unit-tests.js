const { Point } = require("../helpers/points");
const { getAAndB, calcAandB } = require("./helpers");

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
      functionToCheck: getAAndB,
      params: [new Point(0, 1), new Point(0, 0), new Point(0, 10)],
      name: "Get A and B",
      check: (result) => result,
    }),
  () =>
    unitTemplate({
      functionToCheck: getAAndB,
      params: [new Point(0, 2), new Point(0, 1), new Point(0, 15)],
      name: "Get A and B 2",
      check: (result) => result,
    }),
  () =>
    unitTemplate({
      functionToCheck: calcAandB,
      params: [new Point(4, 5), new Point(2, 3), new Point(10, 13)],
      name: "Calc A and B",
      check: (result) => result,
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
