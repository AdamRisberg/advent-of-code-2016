const findPasswords = require("./find-passwords");
const input = "wtnhxymk";

// Slow: takes 1-2 minutes
const [part1, part2] = findPasswords(input);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
