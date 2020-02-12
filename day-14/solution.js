const keyGenerator = require("./key-generator");
const { findIndexOfKeyN } = keyGenerator;

const input = "jlmsuwbz";

const part1 = findIndexOfKeyN(input, 64);
console.log(`Part 1: ${part1}`);

// Slow: 1-2 minutes
const part2 = findIndexOfKeyN(input, 64, 2017);
console.log(`Part 2: ${part2}`);
