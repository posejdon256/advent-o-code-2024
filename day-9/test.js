const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });
  let line;
  for await (const line of rl) {
    return line;
  }
};

const getDotsArray = (line = "12345") => {
  const arr = [];
  let fileId = 0;
  for (let i = 0; i < line.length; i += 2) {
    const fileSize = parseInt(line[i]);
    const emptyPartSize = parseInt(line?.[i + 1]);
    for (let j = 0; j < fileSize; j++) {
      arr.push(fileId);
    }
    for (let j = 0; j < emptyPartSize; j++) {
      arr.push(".");
    }
    fileId++;
  }
  return arr;
};

const fillArr = (dotsArr = [".", "2"]) => {
  let leftPointer = 0;
  let rightPointer = dotsArr.length - 1;
  while (leftPointer !== rightPointer) {
    if (dotsArr[leftPointer] === ".") {
      if (dotsArr[rightPointer] !== ".") {
        dotsArr[leftPointer] = dotsArr[rightPointer];
        dotsArr[rightPointer] = ".";
        leftPointer++;
      }
      rightPointer--;
    } else {
      leftPointer++;
    }
  }
  return dotsArr;
};

const summing = (filledArr = [10, 20, "."]) => {
  let sum = 0;
  for (let i = 0; i < filledArr.length; i++) {
    if (filledArr[i] !== ".") {
      sum += filledArr[i] * i;
    }
  }
  return sum;
};

const part1 = async () => {
  const line = await getInputs("test2.txt");
  const dotsArr = getDotsArray(line);
  const filledArr = fillArr(dotsArr);
  return summing(filledArr);
};

const findBlockToMove = (arr = [2, "."], id = 9) => {
  const place = arr.findIndex((x) => x === id);
  const size = arr.filter((x) => x === id)?.length;
  return { place, size };
};
const findEmptyBlock = (arr = ["2", "."], leftPointer = 0, rightPointer = 10, minSize = 10) => {
  let emptyBlock = false;
  let size = 0;
  while (rightPointer > leftPointer) {
    if (arr[leftPointer] === "." && !emptyBlock) {
      emptyBlock = true;
    }
    if (arr[leftPointer] === ".") {
      size++;
      if (emptyBlock && size >= minSize) {
        return { leftPointer: leftPointer - size + 1, emptyBlock };
      }
    } else if (emptyBlock) {
      emptyBlock = false;
      size = 0;
    }
    leftPointer++;
  }
  return { leftPointer, emptyBlock: false };
};

const part2 = async () => {
  const line = await getInputs("test2.txt");
  const dotsArr = getDotsArray(line);
  let max = Math.max(...dotsArr.filter((x) => x !== "."));
  while (max !== -1) {
    const blockToMove = findBlockToMove(dotsArr, max);
    if (blockToMove.place !== -1) {
      const emptyBlock = findEmptyBlock(dotsArr, 0, blockToMove.place, blockToMove.size);
      if (emptyBlock.emptyBlock) {
        for (let i = 0; i < blockToMove.size; i++) {
          dotsArr[emptyBlock.leftPointer + i] = max;
          dotsArr[blockToMove.place + i] = ".";
        }
      }
    }
    max--;
  }
  return summing(dotsArr);
};

const main = async () => {
  console.time("Time 1");
  const part1Val = await part1();
  console.timeEnd("Time 1");
  console.log("Part 1", part1Val);

  console.time("Time 2");
  const part2Val = await part2();
  console.timeEnd("Time 2");
  console.log("Part 2", part2Val);
};

module.exports = {
  getDotsArray,
  fillArr,
  summing,
  findBlockToMove,
  findEmptyBlock,
};

main();
