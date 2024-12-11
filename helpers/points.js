class Point {
  x;
  y;
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }
  add(b) {
    return new Point(this.x + b.x, this.y + b.y);
  }
  sub(b) {
    return new Point(this.x - b.x, this.y - b.y);
  }
  mul(b) {
    return new Point(this.x * b, this.y * b);
  }
  divide(b) {
    return new Point(this.x / b, this.y / b);
  }
}

module.exports = {
  Point,
};
