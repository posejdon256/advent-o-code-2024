const readline = require("readline");
const fs = require("fs");

const getInputs = async (testString) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(testString),
    crlfDelay: Infinity,
  });

  const orderMap = {};
  const prints = [];
  for await (const line of rl) {
    if (line.split(",").length !== 1) {
      prints.push([...line.split(",").map((x) => parseInt(x))]);
    } else {
      const order = line.split("|").map((x) => parseInt(x));
      if (!orderMap[order[0]]) {
        orderMap[order[0]] = [];
      }
      orderMap[order[0]].push(order[1]);
    }
  }
  return { orderMap, prints };
};

const isOrderOk = (order = [1], orderMap = { 10: [1] }) => {
  for (let i = 0; i < order.length; i++) {
    const element = order[i];
    const orderBeforeCrrent = order.slice(0, i);
    if (orderBeforeCrrent.find((x) => orderMap[element]?.some((y) => x === y))) {
      return false;
    }
  }
  return true;
};

const part1 = async () => {
  console.time("test");
  const { orderMap, prints } = await getInputs("test-2.txt");
  let sum = 0;
  prints.forEach((print) => {
    if (isOrderOk(print, orderMap)) {
      sum += print[Math.floor(print.length / 2)];
    }
  });
  console.timeEnd("test");
  console.log(sum);
};

const fixOrder = (order = [1], orderMap = { 10: [1] }) => {
  let i = 1;
  const orderCopy = [...order];
  while (i !== orderCopy.length) {
    const element = orderCopy[i];
    const orderBeforeCrrent = orderCopy.slice(0, i);
    // console.log(orderCopy);
    if (orderBeforeCrrent.find((x) => orderMap[element]?.some((y) => x === y))) {
      orderCopy.splice(i, 1);
      orderCopy.splice(i - 1, 0, element);
      i--;
    } else {
      i++;
    }
  }
  return orderCopy;
};

const part2 = async () => {
  console.time("test");
  const { orderMap, prints } = await getInputs("test-2.txt");
  let sum = 0;
  prints.forEach((print) => {
    let printCopy = [...print];
    if (!isOrderOk(print, orderMap)) {
      printCopy = fixOrder(printCopy, orderMap);
      sum += printCopy[Math.floor(printCopy.length / 2)];
    }
  });
  console.timeEnd("test");
  console.log(sum);
};

part2();
