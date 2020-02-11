class Computer {
  constructor() {
    this.program = [];
    this.curIdx = 0;
    this.registers = {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    };
  }

  loadProgram(program) {
    this.program = [...program];
  }

  resetProgram() {
    for (let key in this.registers) {
      this.setRegister(key, 0);
    }
    this.curIdx = 0;
  }

  getRegister(registerName) {
    return this.registers[registerName];
  }

  setRegister(registerName, value) {
    this.registers[registerName] = value;
  }

  getParamValue(param) {
    if (isNumber(param)) {
      return parseInt(param);
    }
    return this.getRegister(param);
  }

  cpy(param1, param2) {
    const val = this.getParamValue(param1);

    this.setRegister(param2, val);
  }

  inc(param) {
    this.registers[param]++;
  }

  dec(param) {
    this.registers[param]--;
  }

  jnz(param1, param2) {
    const val = this.getParamValue(param1);

    if (val) {
      // subtract one to undo normal increment
      this.curIdx += parseInt(param2) - 1;
    }
  }

  run() {
    while (this.curIdx < this.program.length) {
      this.step();
      this.curIdx++;
    }
  }

  step() {
    const instruction = this.program[this.curIdx];
    const [command, param1, param2] = instruction.split(" ");

    switch (command) {
      case "cpy":
        this.cpy(param1, param2);
        break;
      case "inc":
        this.inc(param1);
        break;
      case "dec":
        this.dec(param1);
        break;
      case "jnz":
        this.jnz(param1, param2);
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  }
}

function isNumber(str) {
  const num = parseInt(str);
  return num === num;
}

module.exports = Computer;
