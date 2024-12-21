const { bfs, prepareVisited } = require("./bfs");
const { Line } = require("./lines");
const { Point } = require("./points");

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
    functionToCheck: () => true,
    params: [],
    name: "Unit 1",
    check: (result) => result,
  }),
];

const testUnitLines = () => {
  const line = new Line();
  line.fromVector(new Point(18, 19), new Point(-2, 1));
  line.fromVector(new Point(0, 0), new Point(-1, 0));
  console.log(line);
};

const testBfsPaths = () => {
  const map = [
    ["#", "^", "A"],
    ["<", "v", ">"],
  ];
  const { path } = bfs(map, new Point(2, 0), prepareVisited(map), "<", false, true);
  console.log(path);
};

const checkUnits = () => {
  console.log("---------------------Unit Tests----------------------");
  units.forEach((unit) => {
    const { result, name } = unit;
    console.log(name, result);
  });
};

testUnitLines();
testBfsPaths();

module.exports = {
  checkUnits,
};
