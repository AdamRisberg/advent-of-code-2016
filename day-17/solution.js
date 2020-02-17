const findAllMazeRoutes = require("./maze-solver");
const input = "vkjiggvb";

const routes = findAllMazeRoutes(input, 4, 4);

const part1 = routes[0];
console.log(`Part 1: ${part1}`);

const part2 = routes[routes.length - 1].length;
console.log(`Part 2: ${part2}`);
