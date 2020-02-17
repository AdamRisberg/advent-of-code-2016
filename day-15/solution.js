const input = require("./input");
const findFirstButtonPressTime = require("./disc-game");

const part1 = findFirstButtonPressTime(input);
console.log(`Part 1: ${part1}`);

input.push("Disc #7 has 11 positions; at time=0, it is at position 0.");

const part2 = findFirstButtonPressTime(input);
console.log(`Part 2: ${part2}`);
