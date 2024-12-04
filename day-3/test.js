const { stdin, stdout } = require("process");
const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const fileStream = fs.createReadStream(testString);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }
  return { lines };
};

const part1 = async () => {
  const { lines } = await getInputs("text-2.txt");
  let sum = 0;
  const regex = /mul\([0-9][0-9]*[0-9]*,[0-9][0-9]*[0-9]*\)/g;

  lines.forEach((line) => {
    const res = line.match(regex);
    res.forEach((mul) => {
      const mulCut = mul.slice(4, mul.length - 1);
      const nums = mulCut.split(",").map((x) => parseInt(x));
      sum += nums[0] * nums[1];
    });
  });
  console.log("Sum", sum);
};

const part2 = async () => {
  const { lines } = await getInputs("text2-2.txt");
  let sum = 0;
  const results = [];

  let doFlag = true;

  lines.forEach((line) => {
    while (true) {
      const doReg = /do\(\)/g;
      const dontReg = /don't\(\)/g;
      const regex = /mul\([0-9][0-9]*[0-9]*,[0-9][0-9]*[0-9]*\)/g;

      const firstMul = regex.exec(line);
      const firstDo = doReg.exec(line);
      const firstDont = dontReg.exec(line);

      if (!firstDo && !firstDont && !firstMul) {
        break;
      }

      if (
        (firstDo?.index < firstDont?.index || firstDont === null) &&
        (firstDo?.index < firstMul?.index || firstMul === null)
      ) {
        doFlag = true;
        line = line.slice(firstDo.index + firstDo[0].length, line.length);
      } else if (
        (firstDont?.index < firstDo?.index || firstDo === null) &&
        (firstDont?.index < firstMul?.index || firstMul === null)
      ) {
        doFlag = false;
        line = line.slice(firstDont.index + firstDont[0].length, line.length);
      } else {
        line = line.slice(firstMul.index + firstMul[0].length, line.length);
        if (doFlag) {
          const value = firstMul[0];
          const mulCut = value.slice(4, value.length);
          const nums = mulCut.split(",").map((x) => parseInt(x));
          sum += nums[0] * nums[1];
        }
      }
    }
  });
  console.log("Sum", sum);
};

part2();
