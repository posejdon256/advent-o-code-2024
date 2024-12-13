const { Point } = require("../helpers/points");
const { calcAandB } = require("./helpers");

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
