const { Direction, DirectionsEnum } = require("../helpers/directions");
const { Point } = require("../helpers/points");
const { moveElementIntoDirection, canMoveV2, moveV2 } = require("./helpers");

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
    const testArr = [
      ["#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", "#"],
      ["#", ".", "O", "@", "#"],
      ["#", "#", "#", "#", "#"],
    ];
    const dir = new Direction(DirectionsEnum.LEFT);
    const point = new Point(3, 2);
    moveElementIntoDirection(testArr, new Direction(DirectionsEnum.LEFT), point, "@");
    testArr[point.y][point.x] = ".";
    return {
      name: "Move element into direciotn",
      result: true,
    };
  },
  () => {
    const testArr = [
      ["#", "#", "#", "#", "#"],
      ["#", "[", "]", ".", "#"],
      ["#", ".", "[", "]", "#"],
      ["#", ".", ".", "@", "#"],
      ["#", "#", "#", "#", "#"],
    ];
    const dir = new Direction(DirectionsEnum.TOP);
    const point = new Point(3, 3);

    //  console.log(testArr);
    return {
      name: "Can move element",
      result: canMoveV2(testArr, dir, point, "@") === false,
    };
  },
  () => {
    const testArr = [
      ["#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", "#"],
      ["#", "[", "]", "[", "]", "#"],
      ["#", ".", "[", "]", ".", "#"],
      ["#", ".", ".", "@", ".", "#"],
      ["#", "#", "#", "#", ".", "#"],
    ];
    const dir = new Direction(DirectionsEnum.TOP);
    const point = new Point(3, 4);

    // console.log(testArr);
    return {
      name: "Can move element 2",
      result: canMoveV2(testArr, dir, point, "@") === true,
    };
  },
  () => {
    const testArr = [
      ["#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", "#"],
      ["#", "[", "]", "[", "]", "#"],
      ["#", ".", "[", "]", ".", "#"],
      ["#", ".", ".", "@", ".", "#"],
      ["#", "#", "#", "#", ".", "#"],
    ];
    const dir = new Direction(DirectionsEnum.TOP);
    const point = new Point(3, 4);
    moveV2(testArr, dir, point, "@");

    // console.log(testArr);
    return {
      name: "Move element v2",
      result: true,
    };
  },
  // unitTemplate({
  //   functionToCheck: fun1,
  //   params: [],
  //   name: "Unit 1",
  //   check: (result) => result,
  // }),
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
