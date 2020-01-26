const input = require("./input");
const ipTester = require("./ip-tester");
const { filterNonSSL, filterNonTLS } = ipTester;

const addressesWithTLS = filterNonTLS(input);
const part1 = addressesWithTLS.length;
console.log(`Part 1: ${part1}`);

const addressesWithSSL = filterNonSSL(input);
const part2 = addressesWithSSL.length;
console.log(`Part 2: ${part2}`);
