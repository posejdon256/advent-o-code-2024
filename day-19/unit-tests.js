const { getNumberFromChar, getCharFromNumber, convertStringToCode } = require("./helpers");

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
  // () =>
  //   unitTemplate({
  //     functionToCheck: () => getNumberFromChar("a"),
  //     params: [],
  //     name: "Get char code",
  //     check: (result) => result === 0,
  //   }),
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
