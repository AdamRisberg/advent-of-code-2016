const input = require("./input");
const findBathroomCode = require("./bathroom-code");

const keypadPart1 = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"]
];
const keypadPart2 = [
  ["", "", "1", "", ""],
  ["", "2", "3", "4", ""],
  ["5", "6", "7", "8", "9"],
  ["", "A", "B", "C", ""],
  ["", "", "D", "", ""]
];
const startingKey = "5";

const part1 = findBathroomCode(input, keypadPart1, startingKey);
console.log(`Part 1: ${part1}`);
const part2 = findBathroomCode(input, keypadPart2, startingKey);
console.log(`Part 2: ${part2}`);
