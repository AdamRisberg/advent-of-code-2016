const input = require("./input");
const triangles = require("./triangles");
const { countPossibleTriangles, extractTrianglesByColumn } = triangles;

const part1 = countPossibleTriangles(input);
console.log(`Part 1: ${part1}`);

const trianglesByColumn = extractTrianglesByColumn(input);
const part2 = countPossibleTriangles(trianglesByColumn);
console.log(`Part 2: ${part2}`);
