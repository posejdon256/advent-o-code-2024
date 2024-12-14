let id = 0;

class Point {
  x;
  y;
  id;
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.id = id;
    id++;
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
  modulo(b = new Point(0, 0)) {
    return new Point(this.x % b.x, this.y % b.y);
  }
  divideVector(b) {
    if (b.x === 0) {
      return new Point(0, this.y / b.y);
    }
    if (b.y === 0) {
      return new Point(this.x / b.x, 0);
    }
    return new Point(this.x / b.x, this.y / b.y);
  }
  isEqual(b = new Point(1, 1)) {
    return this.x === b.x && this.y === b.y;
  }
  isOutsideOfBoundry(maxLenX, maxLenY) {
    return this.x < 0 || this.x > maxLenX || this.y < 0 || this.y > maxLenY;
  }
  copy() {
    return new Point(this.x, this.y);
  }
}

module.exports = {
  Point,
};
