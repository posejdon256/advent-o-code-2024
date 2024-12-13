const { Point } = require("../helpers/points");

const getAAndB = (A = new Point(0, 0), B = new Point(1, 1), target = new Point(2, 2)) => {
  const zero = new Point(0, 0);
  let A_S = zero.copy();
  let BA_S = zero.copy();
  let itA = 0;
  while (A_S.x <= target.x && A_S.y <= target.y && itA < 100) {
    if (A_S.isEqual(target)) {
      return { A: target.x ? target / A.x : target.y / A.y, B: 0 };
    }
    A_S = A_S.add(A);
    itA++;
  }
  while (!A_S.isEqual(zero)) {
    A_S = A_S.sub(A);
    BA_S = A_S.add(B);
    let itB = 0;
    while (BA_S.x <= target.x && BA_S.y <= target.y) {
      if (BA_S.isEqual(target)) {
        const _A = A.x === 0 ? (target.y - BA_S.y + A_S.y) / A.y : (target.x - BA_S.x + A_S.x) / A.x;
        const _B = B.x === 0 ? (target.y - A_S.y) / B.y : (target.x - A_S.x) / B.x;
        return { A: _A, B: _B };
      }
      BA_S = BA_S.add(B);
    }
  }
  return { A: -1, B: -1 };
};

const getAAndBV2 = (A = new Point(0, 0), B = new Point(1, 1), target = new Point(2, 2)) => {
  const zero = new Point(0, 0);
  let A_S = zero.copy();
  let BA_S = zero.copy();
  while (A_S.x <= target.x && A_S.y <= target.y) {
    if (A_S.isEqual(target)) {
      return { A: target.x ? target / A.x : target.y / A.y, B: 0 };
    }
    A_S = A_S.add(A);
  }
  while (!A_S.isEqual(zero)) {
    A_S = A_S.sub(A);
    BA_S = A_S.add(B);
    while (BA_S.x <= target.x && BA_S.y <= target.y) {
      if (BA_S.isEqual(target)) {
        const _A = A.x === 0 ? (target.y - BA_S.y + A_S.y) / A.y : (target.x - BA_S.x + A_S.x) / A.x;
        const _B = B.x === 0 ? (target.y - A_S.y) / B.y : (target.x - A_S.x) / B.x;
        return { A: _A, B: _B };
      }
      BA_S = BA_S.add(B);
    }
  }
  return { A: -1, B: -1 };
};

const getSumsNumber = (A = new Point(0, 0), B = new Point(1, 1), target = new Point(2, 2)) => {
  const start = Math.floor(divideNotZero(target, A));
  const eps = 0.0001;
  const xConst = A.divideVector(B).mul(-1);
  const bConst = target.divideVector(B);
  for (let x = start; x >= 0; x--) {
    const y = xConst.mul(x).add(bConst);
    if (
      Math.abs(target.x - (A.x * x + B.x * y.x)) < eps &&
      Math.abs(target.y - (A.y * x + B.y * y.y)) < eps &&
      Math.abs(y.x - Math.round(y.x)) < eps &&
      Math.abs(y.y - Math.round(y.y)) < eps
    ) {
      // console.log("Y", y, "X", x);

      return { A: x, B: y.x || y.y };
    }
  }
  return { A: -1, B: -1 };
};

const divideNotZero = (A = new Point(0, 0), B = new Point(1, 1)) => {
  if (B.x === 0) {
    return A.y / B.y;
  }
  return A.x / B.x;
};

module.exports = {
  getAAndB,
  getAAndBV2,
  getSumsNumber,
};
