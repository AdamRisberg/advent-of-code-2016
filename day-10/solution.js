const input = require("./input");
const chipProcessor = require("./chip-processor");
const { processChips, multiplyChips } = chipProcessor;

const chips = processChips(input, [17, 61]);

const part1 = chips.trackedChips;
console.log(`Part 1: ${part1}`);

const part2 = multiplyChips(["output 0", "output 1", "output 2"], chips);
console.log(`Part 2: ${part2}`);
