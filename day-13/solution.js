const mazeSolver = require("./maze-solver");
const Coords = require("./Coords");
const { findFewestStepsTo, findLocationsWithinSteps } = mazeSolver;

const favNumber = 1358;
const start = new Coords(1, 1);
const end = new Coords(31, 39);
const maxSteps = 50;

const part1 = findFewestStepsTo(start, end, favNumber);
console.log(`Part 1: ${part1}`);

const part2 = findLocationsWithinSteps(start, maxSteps, favNumber);
console.log(`Part 2: ${part2}`);
