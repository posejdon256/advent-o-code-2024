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
  geDirection(sign = "^") {
    switch (sign) {
      case "^":
        return new Direction(DirectionsEnum.TOP);
      case "<":
        return new Direction(DirectionsEnum.LEFT);
      case ">":
        return new Direction(DirectionsEnum.RIGHT);
      case "v":
      default:
        return new Direction(DirectionsEnum.BOTTOM);
    }
  }
}
module.exports = {
  Direction,
  DirectionsEnum,
};
