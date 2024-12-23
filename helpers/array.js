const cloneArray = (arr = [[1]]) => {
  const clone = [];
  for (let i = 0; i < arr.length; i++) {
    clone.push([...arr[i]]);
  }
  return clone;
};
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
module.exports = {
  cloneArray,
  onlyUnique,
};
