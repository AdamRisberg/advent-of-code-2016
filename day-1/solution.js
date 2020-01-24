const input = require("./input");
const findHeadquartersDistance = require("./headquarters-distance");

const part1 = findHeadquartersDistance(input);
console.log(`Part 1: ${part1}`);

const part2 = findHeadquartersDistance(input, true);
console.log(`Part 2: ${part2}`);
