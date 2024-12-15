const { dir } = require("console");
const { Direction, DirectionsEnum } = require("../helpers/directions");
const { Point } = require("../helpers/points");

const moveElementIntoDirection = (arr = [["O"]], direction = new Direction(DirectionsEnum.LEFT), position = new Point(0, 0), element = "O") => {
  const newPosition = position.add(direction.coordinates);
  if (arr[newPosition.y][newPosition.x] === "#") {
    return false;
  }
  if (arr[newPosition.y][newPosition.x] === ".") {
    arr[newPosition.y][newPosition.x] = element;
    return true;
  }
  const wasMoved = moveElementIntoDirection(arr, direction, newPosition, arr[newPosition.y][newPosition.x]);
  if (wasMoved) {
    arr[newPosition.y][newPosition.x] = element;
    return true;
  }
  return false;
};
const getDirection = (sign = "^") => {
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
};

const canMoveV2 = (arr = [["O"]], direction = new Direction(DirectionsEnum.LEFT), position = new Point(0, 0)) => {
  const newPosition = position.add(direction.coordinates);
  if (arr[newPosition.y][newPosition.x] === "#") {
    return false;
  }
  if (arr[newPosition.y][newPosition.x] === ".") {
    return true;
  }
  if ((direction.name === DirectionsEnum.TOP || direction.name === DirectionsEnum.BOTTOM) && arr[newPosition.y][newPosition.x] === "]") {
    const onLeft = new Point(newPosition.x - 1, newPosition.y);
    const canMove1 = canMoveV2(arr, direction, newPosition);
    const canMove2 = canMoveV2(arr, direction, onLeft);
    return canMove1 && canMove2;
  }
  if ((direction.name === DirectionsEnum.TOP || direction.name === DirectionsEnum.BOTTOM) && arr[newPosition.y][newPosition.x] === "[") {
    const onRight = new Point(newPosition.x + 1, newPosition.y);
    const canMove1 = canMoveV2(arr, direction, newPosition);
    const canMove2 = canMoveV2(arr, direction, onRight);
    return canMove1 && canMove2;
  }
  return canMoveV2(arr, direction, newPosition, arr[newPosition.y][newPosition.x]);
};
const moveV2 = (arr = [["O"]], direction = new Direction(DirectionsEnum.LEFT), position = new Point(0, 0), element = "O") => {
  const newPosition = position.add(direction.coordinates);
  if (arr[newPosition.y][newPosition.x] === ".") {
    arr[newPosition.y][newPosition.x] = element;
    return;
  }
  if ((direction.name === DirectionsEnum.TOP || direction.name === DirectionsEnum.BOTTOM) && arr[newPosition.y][newPosition.x] === "]") {
    const onLeft = new Point(newPosition.x - 1, newPosition.y);
    moveV2(arr, direction, newPosition, arr[newPosition.y][newPosition.x]);
    moveV2(arr, direction, onLeft, arr[onLeft.y][onLeft.x]);
    arr[onLeft.y][onLeft.x] = ".";
  } else if ((direction.name === DirectionsEnum.TOP || direction.name === DirectionsEnum.BOTTOM) && arr[newPosition.y][newPosition.x] === "[") {
    const onRight = new Point(newPosition.x + 1, newPosition.y);
    moveV2(arr, direction, newPosition, arr[newPosition.y][newPosition.x]);
    moveV2(arr, direction, onRight, arr[onRight.y][onRight.x]);
    arr[onRight.y][onRight.x] = ".";
  } else {
    moveV2(arr, direction, newPosition, arr[newPosition.y][newPosition.x]);
  }
  arr[newPosition.y][newPosition.x] = element;
};
module.exports = {
  moveElementIntoDirection,
  getDirection,
  canMoveV2,
  moveV2,
};
