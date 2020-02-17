const createChecksum = require("./checksum");

const input = "10111100110001111";
const diskSize = 272;
const diskSizeB = 35651584;

const part1 = createChecksum(input, diskSize);
console.log(`Part 1: ${part1}`);

const part2 = createChecksum(input, diskSizeB);
console.log(`Part 2: ${part2}`);
