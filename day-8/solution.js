const input = require("./input");
const displayBuilder = require("./display-builder");
const {
  buildDisplayGrid,
  countLitPixels,
  displayGridToString
} = displayBuilder;

const screenWidth = 50;
const screenHeight = 6;

const display = buildDisplayGrid(input, screenWidth, screenHeight);
const part1 = countLitPixels(display);
console.log(`Part 1: ${part1}`);

console.log(`
Part 2:
-----------------------
${displayGridToString(display)}
`);
