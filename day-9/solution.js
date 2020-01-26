const input = require("./input");
const findDecompressedLength = require("./decompressed-length");

const part1 = findDecompressedLength(input);
console.log(`Part 1: ${part1}`);

const part2 = findDecompressedLength(input, true);
console.log(`Part 2: ${part2}`);
