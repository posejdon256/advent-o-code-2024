const { readdirSync } = require("fs");
const { Point } = require("../helpers/points");
const {
  recursion,
  recursionFillWithSides,
  recursionCalculateNotPrev,
  findNextPermutation,
  findPrevPermutation,
  findAngles,
  permutations,
} = require("./solution");

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
      functionToCheck: findNextPermutation,
      params: [[0, -1]],
      name: "Find next permutation",
      check: (result) => result.x === 1 && result.y === 0,
    }),
  () =>
    unitTemplate({
      functionToCheck: findPrevPermutation,
      params: [[1, 0]],
      name: "Find prev permutation",
      check: (result) => result.x === 0 && result.y === -1,
    }),
  () => {
    const arr = [
      ["A", "A", "A", "A"],
      ["filled_B", "filled_B", "C", "D"],
      ["filled_B", "filled_B", "C", "C"],
      ["E", "E", "E", "C"],
    ];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      sum += findAngles(arr, "B", permutations[i]);
    }
    return {
      name: "Find angles",
      result: sum === 4,
    };
  },
  () => {
    const arr = [
      ["A", "A", "A", "A"],
      ["B", "B", "filled_C", "D"],
      ["B", "B", "filled_C", "filled_C"],
      ["E", "E", "E", "filled_C"],
    ];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      sum += findAngles(arr, "C", permutations[i]);
    }
    return {
      name: "Find angles",
      result: sum === 8,
    };
  },
  () => {
    const arr = [
      ["filled_A", "filled_A", "filled_A", "filled_A"],
      ["B", "B", "C", "D"],
      ["B", "B", "C", "C"],
      ["E", "E", "E", "C"],
    ];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      sum += findAngles(arr, "A", permutations[i]);
    }
    return {
      name: "Find angles",
      result: sum === 4,
    };
  },
  () => {
    const arr = [
      ["filled_A", "filled_A", "filled_A", "filled_A"],
      ["filled_A", "B", "B", "filled_A"],
      ["filled_A", "B", "B", "filled_A"],
      ["filled_A", "filled_A", "filled_A", "filled_A"],
    ];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      sum += findAngles(arr, "A", permutations[i]);
    }
    //   console.log(sum);
    return {
      name: "Find angles",
      result: sum === 8,
    };
  },
  () => {
    const arr = [
      ["A", "A", "A", "A"],
      ["A", "filled_B", "filled_B", "A"],
      ["A", "filled_B", "filled_B", "A"],
      ["A", "A", "A", "A"],
    ];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      sum += findAngles(arr, "B", permutations[i]);
    }
    //  console.log(sum);
    return {
      name: "Find angles",
      result: sum === 4,
    };
  },
  () => {
    const arr = [
      ["A", "A", "A", "A", "A", "A"],
      ["A", "A", "A", "B", "B", "A"],
      ["A", "A", "A", "B", "B", "A"],
      ["A", "B", "B", "A", "A", "A"],
      ["A", "B", "B", "A", "A", "A"],
      ["A", "A", "A", "A", "A", "A"],
    ].map((x) => x.map((y) => (y === "A" ? "filled_A" : "B")));
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      sum += findAngles(arr, "A", permutations[i]);
    }
    //console.log(sum);
    return {
      name: "Find angles",
      result: sum === 12,
    };
  },
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
