const rawInstructions = require("./input");
const scramble = require("./scramble");
const input = "abcdefgh";
const scrambledInput = "fbgdceah";

const part1 = scramble(input, rawInstructions);
console.log(`Part 1: ${part1}`);

const part2 = scramble(scrambledInput, rawInstructions, true);
console.log(`Part 2: ${part2}`);
