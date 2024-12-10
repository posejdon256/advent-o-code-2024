const permutations = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const findTrail = (map = [[1, 2]], start = { x: 0, y: 0 }, depth = 0, trailsFound) => {
  if (start.x >= map[0].length || map.x < 0 || start.y >= map.length || start.y < 0) {
    return;
  }
  if (map[start.y][start.x] !== depth) {
    return;
  }
  if (map[start.y][start.x] === 9) {
    trailsFound[`${start.y}_${start.x}`] = true;
  }
  for (let i = 0; i < 4; i++) {
    findTrail(map, { x: start.x + permutations[i][0], y: start.y + permutations[i][1] }, depth + 1, trailsFound);
  }
};

const findAllTrails = (map = [[1, 2]], start = { x: 0, y: 0 }, depth = 0, trailsFound) => {
  if (start.x >= map[0].length || map.x < 0 || start.y >= map.length || start.y < 0) {
    return;
  }
  if (map[start.y][start.x] !== depth) {
    return;
  }
  if (map[start.y][start.x] === 9) {
    if (!trailsFound[`${start.y}_${start.x}`]) {
      trailsFound[`${start.y}_${start.x}`] = 0;
    }
    trailsFound[`${start.y}_${start.x}`]++;
  }
  for (let i = 0; i < 4; i++) {
    findAllTrails(map, { x: start.x + permutations[i][0], y: start.y + permutations[i][1] }, depth + 1, trailsFound);
  }
};

module.exports = {
  findTrail,
  findAllTrails,
};
