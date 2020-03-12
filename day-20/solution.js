const input = require("./input");
const ipFinder = require("./ip-finder");
const { extractRanges, findLowestNotBlocked, countNotBlocked } = ipFinder;

const validStart = 0;
const validEnd = 4294967295;

const blockedRanges = extractRanges(input);

const part1 = findLowestNotBlocked(blockedRanges, validStart, validEnd);
console.log(`Part 1: ${part1}`);

const part2 = countNotBlocked(blockedRanges, validStart, validEnd);
console.log(`Part 2: ${part2}`);
