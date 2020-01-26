const input = require("./input");
const recoverMessage = require("./recover-message");

const part1 = recoverMessage(input);
console.log(`Part 1: ${part1}`);

const part2 = recoverMessage(input, true);
console.log(`Part 2: ${part2}`);
