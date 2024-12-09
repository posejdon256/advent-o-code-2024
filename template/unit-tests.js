const { fun1 } = require("./solution");

const unit1 = () => {
  const check = fun1();
  const result = check;
  const name = "Unit 1";
  if (!result) {
    console.log("Issue with test", check);
  }
  return {
    name,
    result,
  };
};

const checkUnits = () => {
  console.log("--------------------Unit Tests---------------------");
  const units = [unit1];
  units.forEach((unit) => {
    const { result, name } = unit();
    console.log(name, result);
  });
};

module.exports = {
  checkUnits,
};
