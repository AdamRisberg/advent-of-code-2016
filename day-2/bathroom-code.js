function findBathroomCode(instructions, keypad, startDigit) {
  const code = [];
  let lastPosition = findStartPosition(keypad, startDigit);

  for (let instruction of instructions) {
    lastPosition = findCodeDigit(instruction, lastPosition, keypad);
    code.push(keypad[lastPosition.y][lastPosition.x]);
  }

  return code.join("");
}

function findCodeDigit(instructions, start, keypad) {
  let pos = { ...start };

  for (let dir of instructions) {
    const nextPos = { ...pos };

    switch (dir) {
      case "U":
        nextPos.y--;
        break;
      case "D":
        nextPos.y++;
        break;
      case "L":
        nextPos.x--;
        break;
      case "R":
        nextPos.x++;
        break;
      default:
        throw new Error(`Invalid instruction: ${dir}`);
    }

    pos = validatePosition(nextPos, keypad) ? nextPos : pos;
  }

  return pos;
}

function validatePosition(pos, keypad) {
  return keypad[pos.y] && keypad[pos.y][pos.x];
}

function findStartPosition(keypad, startDigit) {
  for (let y = 0; y < keypad.length; y++) {
    for (let x = 0; x < keypad.length; x++) {
      if (keypad[y][x] === startDigit) {
        return { x, y };
      }
    }
  }

  throw new Error(`Invalid start digit: ${startDigit}`);
}

module.exports = findBathroomCode;
