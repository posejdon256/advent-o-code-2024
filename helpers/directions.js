const { Point } = require("./points");

const DirectionsEnum = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
};

class Direction {
  coordinates;
  name;
  constructor(direction = DirectionsEnum.LEFT) {
    this.name = direction;
    switch (direction) {
      case DirectionsEnum.LEFT:
        this.coordinates = new Point(-1, 0);
        break;
      case DirectionsEnum.RIGHT:
        this.coordinates = new Point(1, 0);
        break;
      case DirectionsEnum.TOP:
        this.coordinates = new Point(0, -1);
        break;
      case DirectionsEnum.BOTTOM:
      default:
        this.coordinates = new Point(0, 1);
    }
  }
  getRotationRotatedBy90() {
    switch (this.name) {
      case DirectionsEnum.LEFT:
        return new Direction(DirectionsEnum.TOP);
      case DirectionsEnum.RIGHT:
        return new Direction(DirectionsEnum.BOTTOM);
      case DirectionsEnum.TOP:
        return new Direction(DirectionsEnum.LEFT);
      case DirectionsEnum.BOTTOM:
      default:
        return new Direction(DirectionsEnum.RIGHT);
    }
  }
  getRotationRotatedBy270() {
    switch (this.name) {
      case DirectionsEnum.LEFT:
        return new Direction(DirectionsEnum.BOTTOM);
      case DirectionsEnum.RIGHT:
        return new Direction(DirectionsEnum.TOP);
      case DirectionsEnum.TOP:
        return new Direction(DirectionsEnum.RIGHT);
      case DirectionsEnum.BOTTOM:
      default:
        return new Direction(DirectionsEnum.LEFT);
    }
  }
}
module.exports = {
  Direction,
  DirectionsEnum,
};
