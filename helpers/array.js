const cloneArray = (arr = [[1]]) => {
  const clone = [];
  for (let i = 0; i < arr.length; i++) {
    clone.push([...arr[i]]);
  }
  return clone;
};
module.exports = {
  cloneArray,
};
