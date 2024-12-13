const { Point } = require("../helpers/points");
const calcAandB = (p1 = new Point(0, 0), p2 = new Point(0, 0), D = new Point(0, 1)) => {
  const A = (D.x * p2.y - D.y * p2.x) / (p2.y * p1.x - p1.y * p2.x);
  const B = (D.y - A * p1.y) / p2.y;
  if (Math.floor(A) !== A || Math.floor(B) !== B) {
    return { A: -1, B: -1 };
  }
  return {
    A: A,
    B: B,
  };
};

module.exports = {
  calcAandB,
};
