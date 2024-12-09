const { getDotsArray, fillArr, summing, findBlockToMove, findEmptyBlock } = require("./test");

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

const unit5 = () => {
  const filledArr = "0..111....22222".split("").map((x) => (x !== "." ? parseInt(x) : "."));
  const blockFound = findBlockToMove(filledArr, 2);
  return {
    name: "Find block to move",
    result: blockFound.place === 10 && blockFound.size === 5,
  };
};

const unit6 = () => {
  const filledArr = "0..111....22222".split("").map((x) => (x !== "." ? parseInt(x) : "."));
  const blockFound = findEmptyBlock(filledArr, 0, filledArr.length - 1, 3);
  return {
    name: "Find empty block",
    result: blockFound.emptyBlock && blockFound.leftPointer === 6,
  };
};

const checkUnits = () => {
  const units = [unit1, unit2, unit3, unit4, unit5, unit6];
  units.forEach((unit) => {
    const { result, name } = unit();
    console.log(name, result);
  });
};

checkUnits();
