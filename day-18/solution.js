const calculateSafeTiles = require("./tile-counter");
const input =
  "......^.^^.....^^^^^^^^^...^.^..^^.^^^..^.^..^.^^^.^^^^..^^.^.^.....^^^^^..^..^^^..^^.^.^..^^..^^^..";

const part1 = calculateSafeTiles(input, 40);
console.log(`Part 1: ${part1}`);

const part2 = calculateSafeTiles(input, 400000);
console.log(`Part 2: ${part2}`);
