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
  isEqual(b = new Point(1, 1)) {
    return this.x === b.x && this.y === b.y;
  }
  isOutsideOfBoundry(maxLenX, maxLenY) {
    return this.x < 0 || this.x > maxLenX || this.y < 0 || this.y > maxLenY;
  }
}

module.exports = {
  Point,
};
