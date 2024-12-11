const blink = (numbers = [[1, 2, 3]]) => {
  const copy = [];
  for (let i = 0; i < numbers.length; i++) {
    const numberArray = numbers[i];
    copy.push(...oneElementBlink(numberArray));
  }
  return copy;
};

const oneElementBlink = (numberArray = [1, 2, 3]) => {
  if (numberArray.length === 1 && numberArray[0] === 0) {
    return [[1]];
  } else if (numberArray.length % 2 === 0) {
    const left = numberArray.slice(0, numberArray.length / 2);
    let right = numberArray.slice(numberArray.length / 2, numberArray.length);
    const firstNotZeroIndex = right.findIndex((x) => x !== 0);
    if (firstNotZeroIndex !== -1) {
      right = right.slice(firstNotZeroIndex, right.length);
    } else {
      right = [0];
    }
    return [left, right];
  } else {
    const number = mulTwoBigNumbers(
      numberArray,
      "2024".split("").map((x) => parseInt(x))
    );
    return [number];
  }
};

const mulTwoBigNumbers = (arr1 = [9, 9], arr2 = [9, 9]) => {
  let more = 0;
  // console.log("Mulling", arr1, arr2);
  const resultsToSum = [];
  for (let i = arr1.length - 1; i >= 0; i--) {
    let result = [];
    for (let j = arr2.length - 1; j >= 0; j--) {
      const mul = arr1[i] * arr2[j] + more;
      more = Math.floor(mul / 10);
      result.push(mul % 10);
    }
    if (more > 0) {
      result.push(more);
      more = 0;
    }
    result.reverse();
    for (let j = 0; j < arr1.length - 1 - i; j++) {
      result.push(0);
    }
    resultsToSum.push(result);
  }
  let sum = [0];
  for (let i = 0; i < resultsToSum.length; i++) {
    sum = sumTwoNumbers(sum, resultsToSum[i]);
  }
  return sum;
};

const numberFromArray = (arr = [1, 2]) => {
  let number = 0;
  for (let i = 0; i < arr.length; i++) {
    number += arr[arr.length - 1 - i] * Math.pow(10, i);
  }
  return number;
};

const sumTwoNumbers = (arr1 = [1, 2, 3], arr2 = [3, 9]) => {
  const longer = arr1.length >= arr2.length ? arr1 : arr2;
  const shorter = arr1.length >= arr2.length ? arr2 : arr1;
  let longerIter = longer.length - 1;
  let shorterIter = shorter.length - 1;
  let result = [];
  let more = 0;
  while (longerIter !== -1) {
    if (shorterIter <= -1) {
      result.push(longer[longerIter] + more);
      more = 0;
    } else {
      let sum = longer[longerIter] + shorter[shorterIter] + more;
      more = Math.floor(sum / 10);
      result.push(sum % 10);
    }
    longerIter--;
    shorterIter--;
  }
  if (more !== 0) {
    result.push(more);
  }
  result.reverse();
  return result;
};

const blinkIntoDepth = (actualDepth = 0, blinksCalculated = { "[0]": 1, "[1]": 10 }, maxDepth = 1, number = [1, 2, 3]) => {
  // console.log(blinksCalculated);
  const ind = number.join("_");
  if (!blinksCalculated[ind]) {
    blinksCalculated[ind] = new Array(maxDepth).fill(0);
  }
  if (maxDepth === actualDepth) {
    blinksCalculated[ind][actualDepth] = 1;
    return 1;
  }
  let sum = 0;
  const resultBlink = oneElementBlink(number);
  sum += blinksCalculated[resultBlink[0].join("_")]?.[actualDepth + 1] || blinkIntoDepth(actualDepth + 1, blinksCalculated, maxDepth, resultBlink[0]);
  if (resultBlink.length === 2) {
    sum += blinksCalculated[resultBlink[1].join("_")]?.[actualDepth + 1] || blinkIntoDepth(actualDepth + 1, blinksCalculated, maxDepth, resultBlink[1]);
  }
  blinksCalculated[ind][actualDepth] = sum;
  return sum;
};

module.exports = {
  blink,
  numberFromArray,
  sumTwoNumbers,
  mulTwoBigNumbers,
  oneElementBlink,
  blinkIntoDepth,
};
