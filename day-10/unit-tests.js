const { findTrail, findAllTrails } = require("./solution");

const testMap = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [8, 7, 6, 5],
  [9, 8, 7, 6],
];

const unit1 = () => {
  const trailsFound = {};
  findTrail(testMap, { x: 0, y: 0 }, 0, trailsFound);
  const result = trailsFound[`3_0`];
  const name = "Unit 1";
  if (!result) {
    console.log("Issue with test", trailsFound);
  }
  return {
    name,
    result,
  };
};

const unit2 = () => {
  const trails = {};
  findAllTrails(testMap, { x: 0, y: 0 }, 0, trails);
  const result = trails[`3_0`] === 16;
  const name = "Unit 2";
  if (!result) {
    console.log("Issue with test", trails);
  }
  return {
    name,
    result,
  };
};

const checkUnits = () => {
  const units = [unit1, unit2];
  units.forEach((unit) => {
    const { result, name } = unit();
    console.log(name, result);
  });
};

module.exports = {
  checkUnits,
};
