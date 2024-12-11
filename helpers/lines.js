const { Point } = require("./points");

class Line {
  a;
  b;
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  fromVector(point = new Point(0, 0), vector = new Point(1, 1)) {
    this.a = (2 * point.y + vector.y) / vector.x;
    this.b = point.y - point.x * this.a;
    console.log(this.a, this.b);
  }
  findCross(line = new Line(1, 0)) {
    if (this.a === line.a) {
      return false;
    }
    const x = (line.b - this.b) / (this.a - line.a);
    return new Point(x, this.a * x + this.b);
  }
}

module.exports = {
  Line,
};
