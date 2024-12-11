const { fun1 } = require("./solution");

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

const units = [
  unitTemplate({
    functionToCheck: fun1,
    params: [],
    name: "Unit 1",
    check: (result) => result,
  }),
];

const checkUnits = () => {
  console.log("---------------------Unit Tests----------------------");
  units.forEach((unit) => {
    const { result, name } = unit;
    console.log(name, result);
  });
};

module.exports = {
  checkUnits,
};
