const input = require("./input");
const Computer = require("./Computer");

const computer = new Computer();

computer.loadProgram(input);
computer.run();

const part1 = computer.getRegister("a");
console.log(`Part 1: ${part1}`);

computer.resetProgram();
computer.setRegister("c", 1);
computer.run();

const part2 = computer.getRegister("a");
console.log(`Part 2: ${part2}`);
