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

const calcAandB = (p1 = new Point(0, 0), p2 = new Point(0, 0), D = new Point(0, 1)) => {
  console.log(p1, p2, D);
  // const A = ((D.x * p2.y * p2.y * p1.x - D.y * p1.x * p2.x * p2.y) / (p2.y + p1.x)) * p2.x * p1.y;
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
  getAAndB,
  calcAandB,
};
