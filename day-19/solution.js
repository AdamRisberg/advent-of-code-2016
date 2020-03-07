const stealPresents = require("./steal-presents");
const { findWinner, findWinnerInCircle } = stealPresents;
const input = 3017957;

const part1 = findWinner(input);
console.log(part1);

const part2 = findWinnerInCircle(input);
console.log(part2);
