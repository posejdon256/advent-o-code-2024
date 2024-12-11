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

const mulTwoBigNumbers = (arr1 = [9, 9], arr2 = [9, 9]) => {
  let more = 0;
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

module.exports = {
  sumTwoNumbers,
  mulTwoBigNumbers,
};
