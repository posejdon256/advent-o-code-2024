const { Point } = require("../helpers/points");

class Robot {
  velocity;
  position;
  constructor(velocity = new Point(0, 0), position = new Point(0, 0)) {
    this.position = position;
    this.velocity = velocity;
  }
}

const calculateNewPosition = (robot = new Robot(), mapSize = new Point(1, 1), seconds = 100) => {
  const toAdd = new Point(seconds * robot.velocity.x, seconds * robot.velocity.y);
  const newPosition = robot.position.add(toAdd).add(new Point(mapSize.x * seconds, mapSize.y * seconds));
  const jumped = newPosition.modulo(mapSize);
  return jumped;
};

const getQuadrant = (position = new Point(), mapSize = new Point(1, 1)) => {
  const center = new Point(Math.floor(mapSize.x / 2), Math.floor(mapSize.y / 2));
  if (position.x === center.x || position.y === center.y) {
    return -1;
  }
  if (position.x < center.x) {
    if (position.y > center.y) {
      return 3;
    }
    return 1;
  } else {
    if (position.y > center.y) {
      return 4;
    }
  }
  return 2;
};

module.exports = {
  Robot,
  calculateNewPosition,
  getQuadrant,
};
