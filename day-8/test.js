const readline = require("readline");
const fs = require("fs");

const OBJECT_TYPES = {
  ANTINODE: "anitnode",
  ANTENA: "antena",
};

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const antenasHashMap = {};
  const maxLen = { i: 0, j: 0 };
  let i = 0;
  for await (const line of rl) {
    const row = line.split("");
    maxLen.j = row.length - 1;
    for (let j = 0; j < row.length; j++) {
      if (row[j] !== ".") {
        if (!antenasHashMap[row[j]]) {
          antenasHashMap[row[j]] = [];
        }
        antenasHashMap[row[j]].push({ i, j });
      }
    }
    i++;
  }
  maxLen.i = i - 1;
  return { antenasHashMap, maxLen };
};

const getAntinodesPositions = (M = { i: 10, j: 10 }, N = { i: 20, j: 20 }, maxLen = { i: 30, j: 30 }) => {
  const A = { i: 2 * M.i - N.i, j: 2 * M.j - N.j };
  const B = { i: 2 * N.i - M.i, j: 2 * N.j - M.j };
  const antinodes = [];
  if (!(A.i < 0 || A.i > maxLen.i || A.j < 0 || A.j > maxLen.j)) {
    antinodes.push(A);
  }
  if (!(B.i < 0 || B.i > maxLen.i || B.j < 0 || B.j > maxLen.j)) {
    antinodes.push(B);
  }
  return antinodes;
};

const part1 = async () => {
  const { antenasHashMap, maxLen } = await getInputs("test2.txt");
  const antinodes = {};
  for (const antena in antenasHashMap) {
    const antenaIndexes = antenasHashMap[antena];
    for (let i = 0; i < antenaIndexes.length; i++) {
      for (let j = i + 1; j < antenaIndexes.length; j++) {
        const positions = getAntinodesPositions(antenaIndexes[i], antenaIndexes[j], maxLen);
        if (positions[0] && !antinodes[`${positions[0].i}_${positions[0].j}`]) {
          antinodes[`${positions[0].i}_${positions[0].j}`] = OBJECT_TYPES.ANTINODE;
        }
        if (positions[1] && !antinodes[`${positions[1].i}_${positions[1].j}`]) {
          antinodes[`${positions[1].i}_${positions[1].j}`] = OBJECT_TYPES.ANTINODE;
        }
      }
    }
  }

  return Object.values(antinodes).filter((x) => x === OBJECT_TYPES.ANTINODE).length;
};

const getAntinodesPositionsV2 = (M = { i: 10, j: 10 }, N = { i: 20, j: 20 }, maxLen = { i: 30, j: 30 }) => {
  const A = { i: M.i - N.i, j: M.j - N.j };
  const B = { i: N.i - M.i, j: N.j - M.j };

  const antinodes = [];
  while (!(M.i < 0 || M.i > maxLen.i || M.j < 0 || M.j > maxLen.j)) {
    antinodes.push(M);
    M = { i: M.i + A.i, j: M.j + A.j };
  }
  while (!(N.i < 0 || N.i > maxLen.i || N.j < 0 || N.j > maxLen.j)) {
    antinodes.push(N);
    N = { i: N.i + B.i, j: N.j + B.j };
  }
  return antinodes;
};

const part2 = async () => {
  const { antenasHashMap, maxLen } = await getInputs("test2.txt");
  const antinodes = {};
  for (const antena in antenasHashMap) {
    const antenaIndexes = antenasHashMap[antena];
    for (let i = 0; i < antenaIndexes.length; i++) {
      for (let j = i + 1; j < antenaIndexes.length; j++) {
        const positions = getAntinodesPositionsV2(antenaIndexes[i], antenaIndexes[j], maxLen);
        positions.forEach((position) => {
          if (!antinodes[`${position.i}_${position.j}`]) {
            antinodes[`${position.i}_${position.j}`] = OBJECT_TYPES.ANTINODE;
          }
        });
      }
    }
  }

  return Object.values(antinodes).filter((x) => x === OBJECT_TYPES.ANTINODE).length;
};

const main = async () => {
  console.log("Unit test", unitTest1());
  console.time("Time 1");
  const part1Val = await part1();
  console.timeEnd("Time 1");
  console.log("Part 1", part1Val);

  console.time("Time 2");
  const part2Val = await part2();
  console.timeEnd("Time 2");
  console.log("Part 2", part2Val);
};

const unitTest1 = () => {
  const M = { i: 20, j: 10 };
  const N = { i: 30, j: 5 };
  const maxLen = { i: 40, j: 40 };
  const positions = getAntinodesPositions(M, N, maxLen);
  console.log("Position", positions);
  if (positions.length !== 2) {
    return false;
  }
  if (positions[0].i === 10 && positions[0].j === 15 && positions[1].j === 0 && positions[1].i === 40) {
    return true;
  }
  return false;
};

main();
