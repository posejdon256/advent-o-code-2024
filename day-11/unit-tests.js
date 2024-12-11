const { numberFromArray, blink, sumTwoNumbers, mulTwoBigNumbers, blinkIntoDepth } = require("./solution");

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

const unitsToGet = () => [
  unitTemplate({
    functionToCheck: numberFromArray,
    params: [[1, 2, 5]],
    name: "Number From Array",
    check: (result) => result === 125,
  }),
  unitTemplate({
    functionToCheck: blink,
    params: [
      [
        [1, 2, 5],
        [1, 7],
      ],
    ],
    name: "Blink",
    check: (result) =>
      numberFromArray(result[0]) === 125 * 2024 && result[1][0] === 1 && result[1].length === 1 && result[2][0] === 7 && result[2].length === 1,
  }),
  unitTemplate({
    functionToCheck: blink,
    params: [[[1, 2, 5, 0, 0, 0]]],
    name: "Blink 2",
    check: (result) => numberFromArray(result[0]) === 125 && result[0].length === 3 && numberFromArray(result[1]) === 0,
  }),
  unitTemplate({
    functionToCheck: sumTwoNumbers,
    params: [
      [1, 2, 3],
      [3, 9],
    ],
    name: "Sum two big numbers",
    check: (result) => numberFromArray(result) === 162,
  }),
  unitTemplate({
    functionToCheck: mulTwoBigNumbers,
    params: [
      [9, 9],
      [9, 9],
    ],
    name: "Mul two big numbers",
    check: (result) => numberFromArray(result) === 9801,
  }),
  unitTemplate({
    functionToCheck: blinkIntoDepth,
    params: [0, {}, 6, [1, 2, 5]],
    name: "Blink recurence",
    check: (result) => result === 7,
  }),
  unitTemplate({
    functionToCheck: blinkIntoDepth,
    params: [0, {}, 7, [1, 7]],
    name: "Blink recurence 2",
    check: (result) => result === 22,
  }),
];

const checkUnits = () => {
  console.log("--------------------Unit Tests---------------------");
  const units = unitsToGet();
  units.forEach((unit) => {
    const { result, name } = unit;
    console.log(name, result);
  });
};

module.exports = {
  checkUnits,
};
