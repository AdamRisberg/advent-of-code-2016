const rawInstructions = require("./input");
const scramble = require("./scramble");
const input = "abcdefgh";
const scrambledInput = "fbgdceah";

const part1 = scramble(input, rawInstructions);
console.log(part1);

const part2 = scramble(scrambledInput, rawInstructions, true);
console.log(part2);
