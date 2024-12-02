const { stdin, stdout } = require("process");
const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const fileStream = fs.createReadStream(testString);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const reports = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const nums = line.split(" ").map((x) => parseInt(x));
    reports.push(nums);
  }
  return { reports };
};

const part1 = async () => {
  const { reports } = await getInputs("test2.txt");
  let safe = 0;
  for (let i = 0; i < reports.length; i++) {
    const report = reports[i];
    const increasing = report[1] > report[0];
    for (let j = 0; j < report.length - 1; j++) {
      if (report[j] > report[j + 1] && increasing) {
        break;
      }
      if (report[j] < report[j + 1] && !increasing) {
        break;
      }
      if (
        Math.abs(report[j] - report[j + 1]) > 3 ||
        Math.abs(report[j] - report[j + 1]) === 0
      ) {
        break;
      }
      if (j === report.length - 2) {
        console.log("Safe in for", report);
        safe++;
      }
    }
  }
  console.log("Safe", safe);
};

const isStepOkay = (report, j, increasing) => {
  if (report[j] > report[j + 1] && increasing) {
    return false;
  }
  if (report[j] < report[j + 1] && !increasing) {
    return false;
  }
  if (
    Math.abs(report[j] - report[j + 1]) > 3 ||
    Math.abs(report[j] - report[j + 1]) === 0
  ) {
    return false;
  }
  return true;
};

const checkReport = (report) => {
  const increasing = report[1] > report[0];
  for (let j = 0; j < report.length - 1; j++) {
    if (!isStepOkay(report, j, increasing)) {
      return false;
    }
    if (j === report.length - 2) {
      // console.log("Safe in for", report);
      return true;
    }
  }
  return false;
};

const part2 = async () => {
  const { reports } = await getInputs("test-2.txt");
  let safe = 0;
  for (let i = 0; i < reports.length; i++) {
    const report = reports[i];
    if (checkReport(report)) {
      safe++;
    } else {
      for (let j = 0; j < report.length; j++) {
        const copy = [...report];
        copy.splice(j, 1);
        if (checkReport(copy)) {
          safe++;
          break;
        }
      }
    }
  }
  console.log("Safe", safe);
};

part2();
