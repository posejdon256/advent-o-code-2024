const { getDotsArray, fillArr, summing } = require("./test");

const unit1 = () => {
  const dotsArr = getDotsArray("12345");
  return {
    name: "Get dots",
    result: dotsArr.join("") === "0..111....22222",
  };
};
const unit2 = () => {
  const dotsArr = getDotsArray("2333133121414131402");
  return {
    name: "Get dots 2",
    result: dotsArr.join("") === "00...111...2...333.44.5555.6666.777.888899",
  };
};

const unit3 = () => {
  const dotsArr = "0..111....22222".split("");
  const filledArr = fillArr(dotsArr);
  return {
    name: "Fill array",
    result: filledArr.join("") === "022111222......",
  };
};

const unit4 = () => {
  const filledArr = "022111222......".split("").map((x) => (x !== "." ? parseInt(x) : "."));
  return {
    name: "Sum",
    result: summing(filledArr) === 60,
  };
};
const checkUnits = () => {
  const units = [unit1, unit2, unit3, unit4];
  units.forEach((unit) => {
    const { result, name } = unit();
    console.log(name, result);
  });
};

checkUnits();
