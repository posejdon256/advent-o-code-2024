const { readdirSync } = require("fs");
const { Point } = require("../helpers/points");
const { recursion, recursionFillWithSides, recursionCalculateNotPrev } = require("./solution");

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
      functionToCheck: recursion,
      params: [
        [
          ["A", "A", "A", "A"],
          ["B", "B", "C", "D"],
          ["B", "B", "C", "C"],
          ["E", "E", "E", "C"],
        ],
        "C",
        new Point(1, 2),
        new Point(1, 2),
      ],

      name: "Unit 1",
      check: (result) => result.filled === 4 && result.wall === 10,
    }),
  () =>
    unitTemplate({
      functionToCheck: recursion,
      params: [
        [
          ["A", "A", "A", "A"],
          ["B", "B", "C", "D"],
          ["B", "B", "C", "C"],
          ["E", "E", "E", "C"],
        ],
        "B",
        new Point(1, 0),
        new Point(1, 0),
      ],

      name: "Unit 2",
      check: (result) => result.filled === 4 && result.wall === 8,
    }),
  () =>
    unitTemplate({
      functionToCheck: recursion,
      params: [
        [
          ["A", "A", "A", "A"],
          ["B", "B", "C", "D"],
          ["B", "B", "C", "C"],
          ["E", "E", "E", "C"],
        ],
        "D",
        new Point(1, 3),
        new Point(1, 3),
      ],

      name: "Unit 3",
      check: (result) => result.filled === 1 && result.wall === 4,
    }),
  () =>
    unitTemplate({
      functionToCheck: recursionFillWithSides,
      params: [
        [
          ["A", "A", "A", "A"],
          ["B", "B", "C", "D"],
          ["B", "B", "C", "C"],
          ["E", "E", "E", "C"],
        ],
        "C",
        new Point(1, 2),
        new Point(1, 2),
      ],

      name: "Unit 4",
      check: (result) => result,
    }),
  () =>
    unitTemplate({
      functionToCheck: recursionCalculateNotPrev,
      params: [
        [
          ["A", "A", "A", "A"],
          ["B", "B", { L: true, T: true, R: true, B: false }, "D"],
          ["B", "B", { L: true, T: false, R: false, B: true }, { L: false, T: true, R: true, B: false }],
          ["E", "E", "E", { L: true, T: false, R: true, B: true }],
        ],
        new Point(1, 2),
        new Point(1, 2),
        { L: 1, R: 1, T: 1, B: 0 },
        new Point(0, 0),
      ],

      name: "Unit 5",
      check: (result) => result,
    }),
  () =>
    unitTemplate({
      functionToCheck: recursionFillWithSides,
      params: [
        [
          ["A", "A", "A", "A"],
          ["B", "B", "C", "D"],
          ["B", "B", "C", "C"],
          ["E", "E", "E", "C"],
        ],
        "B",
        new Point(1, 0),
        new Point(1, 0),
      ],

      name: "Unit 6",
      check: (result) => result,
    }),
  () =>
    unitTemplate({
      functionToCheck: recursionCalculateNotPrev,
      params: [
        [
          ["A", "A", "A", "A"],
          [{ L: true, T: true, R: false, B: false }, { L: false, T: true, R: true, B: false }, "C", "D"],
          [{ L: true, T: false, R: false, B: true }, { L: false, T: false, R: true, B: true }, "C", "C"],
          ["E", "E", "E", "C"],
        ],
        new Point(1, 0),
        new Point(1, 0),
        { L: 1, R: 0, T: 1, B: 0 },
        new Point(1, 0),
      ],

      name: "Unit 7",
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
