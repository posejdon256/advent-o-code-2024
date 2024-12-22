const { xor } = require("../helpers/bit-operations");

const prune = (secret = 123) => {
  return secret % 16777216;
};
const mix = (x = 123, secret = 1234) => {
  return xor(secret, x);
};
const operation = (secret = 123) => {
  const step1 = prune(mix(secret * 64, secret));
  const step2 = prune(mix(Math.floor(step1 / 32), step1));
  const step3 = prune(mix(step2 * 2048, step2));
  return step3;
};
const makeManyOperations = (initialSecret = 123, operationsNumber = 100) => {
  let secret = initialSecret;
  for (let i = 0; i < operationsNumber; i++) {
    secret = operation(secret);
  }
  return secret;
};

const getSequenceIndex = (sequence = [1, 2, 3]) => {
  return `${sequence[0]}_${sequence[1]}_${sequence[2]}_${sequence[3]}`;
};

const getSequenceValue = (first = 123, next = 234) => {
  return (next % 10) - (first % 10);
};

module.exports = {
  makeManyOperations,
  operation,
  getSequenceIndex,
  getSequenceValue,
};
