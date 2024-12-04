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
    // Each line in input.txt will be successively available here as `line`.
    lines.push(line.split(""));
  }
  return { lines };
};

const XMAS = ["X", "M", "A", "S"];

const findXMAS = (lines = [["X"]], ind = { x: 0, y: 0 }, step = 0, direction = { x: 1, y: 0 }) => {
  const { x, y } = ind;
  const letter = XMAS[step];
  if (!lines?.[x]?.[y] || lines[x][y] !== letter) {
    return 0;
  }
  if (step === 3 && lines[x][y] === letter) {
    return 1;
  }
  return findXMAS(lines, { x: x + direction.x, y: y + direction.y }, step + 1, direction);
};

const part1 = async () => {
  const { lines } = await getInputs("test-2.txt");
  let xmases = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      xmases += findXMAS(lines, { x: i, y: j }, 0, { x: 1, y: 0 });
      xmases += findXMAS(lines, { x: i, y: j }, 0, { x: 1, y: 1 });
      xmases += findXMAS(lines, { x: i, y: j }, 0, { x: 0, y: 1 });
      xmases += findXMAS(lines, { x: i, y: j }, 0, { x: -1, y: 1 });
      xmases += findXMAS(lines, { x: i, y: j }, 0, { x: -1, y: 0 });
      xmases += findXMAS(lines, { x: i, y: j }, 0, { x: -1, y: -1 });
      xmases += findXMAS(lines, { x: i, y: j }, 0, { x: 0, y: -1 });
      xmases += findXMAS(lines, { x: i, y: j }, 0, { x: 1, y: -1 });
    }
  }
  console.log("Xmas", xmases);
};

const findX_Mas = (lines, ind = { x: 0, y: 0 }) => {
  const { x, y } = ind;
  if (lines[x][y] !== "A") {
    return 0;
  }
  const wordAround = lines[x + 1][y + 1] + lines[x - 1][y + 1] + lines[x - 1][y - 1] + lines[x + 1][y - 1];
  if (["MMSS", "SMMS", "SSMM", "MSSM"].includes(wordAround)) {
    return 1;
  }
  return 0;
};

const part2 = async () => {
  const { lines } = await getInputs("test2-2.txt");
  let xmases = 0;
  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      xmases += findX_Mas(lines, { x: i, y: j });
    }
  }
  console.log("Xmas", xmases);
};

part2();
