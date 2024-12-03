const { stdin, stdout } = require("process");
const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const fileStream = fs.createReadStream(testString);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const words = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    words.push(line);
  }
  return { words };
};

const wordsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const tryToFindNumberFromFront = (word = "") => {
  let p1 = 0,
    p2 = 3;
  const max = 6;
  while (p2 !== word.length) {
    if (!isNaN(word[p2 - 1])) {
      return undefined;
    }
    console.log(word.substring(p1, p2 + 1));
    if (wordsMap[word.substring(p1, p2)]) {
      return wordsMap[word.substring(p1, p2)];
    }
    if (p2 - p1 < max && !isNaN(word[p2])) {
      p2++;
    } else {
      p1++;
      p2 = p1 + 2;
    }
  }
};
const tryToFindNumberFromEnd = (word = "") => {
  let p1 = word.length - 3,
    p2 = word.length - 1;
  const max = 6;
  while (p1 !== -1) {
    if (!isNaN(word[p1 + 1])) {
      return undefined;
    }
    if (wordsMap[word.substring(p1, p2 + 1)]) {
      return wordsMap[word.substring(p1, p2 + 1)];
    }
    if (p2 - p1 < max) {
      p1--;
    } else {
      p2--;
      p1 = p2 - 2;
    }
  }
  return undefined;
};
const part1 = async () => {
  const { words } = await getInputs("test2.txt");
  let sum = 0;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let firstNumber = undefined;
    let lastNumber = undefined;
    const numberWordFront = tryToFindNumberFromFront(word);
    const numberWordEnd = tryToFindNumberFromEnd(word);
    for (let j = 0; j < word.length && !numberWordFront; j++) {
      if (!isNaN(parseInt(word[j]))) {
        firstNumber = parseInt(word[j]);
        break;
      }
    }
    for (let j = word.length - 1; j >= 0 && !numberWordEnd; j--) {
      if (!isNaN(parseInt(word[j]))) {
        lastNumber = parseInt(word[j]);
        break;
      }
    }
    const result =
      (numberWordFront || firstNumber) * 10 + (numberWordEnd || lastNumber);
    console.log("res", result);
    sum += result;
  }
  console.log("Sum", sum);
};

const part2 = async () => {
  const { words } = await getInputs("test2.txt");
};

part1();
