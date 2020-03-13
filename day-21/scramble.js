function scramble(input, rawInstructions, reverse) {
  const instructions = parseInstructions(rawInstructions);
  let array = input.split("");

  if (reverse) {
    instructions.reverse();
  }

  for (let instruction of instructions) {
    const { op, paramA, paramB } = instruction;

    switch (op) {
      case "swap position":
        array = swapByPosition(array, paramA, paramB);
        break;
      case "swap letter":
        array = swapLetter(array, paramA, paramB);
        break;
      case "rotate left":
        array = reverse
          ? rotateRight(array, paramA)
          : rotateLeft(array, paramA);
        break;
      case "rotate right":
        array = reverse
          ? rotateLeft(array, paramA)
          : rotateRight(array, paramA);
        break;
      case "rotate based":
        array = reverse
          ? reverseRotateOnPos(array, paramA)
          : rotateBasedOnPos(array, paramA);
        break;
      case "reverse positions":
        array = reversePositions(array, paramA, paramB);
        break;
      case "move position":
        array = reverse
          ? move(array, paramB, paramA)
          : move(array, paramA, paramB);
        break;
      default:
        throw new Error(`Unsupported operation: ${op}`);
    }
  }

  return array.join("");
}

function parseInstructions(rawInstructions) {
  return rawInstructions.map(raw => {
    const words = raw.split(" ");
    const op = words.slice(0, 2).join(" ");
    const params = words
      .filter(word => word.length === 1)
      .map(char => {
        const potentialNum = parseInt(char);
        if (potentialNum !== potentialNum) {
          return char;
        }
        return potentialNum;
      });

    return {
      op,
      paramA: params[0],
      paramB: params[1]
    };
  });
}

function swapByPosition(arr, idxA, idxB) {
  const temp = arr[idxA];
  arr[idxA] = arr[idxB];
  arr[idxB] = temp;
  return arr;
}

function swapLetter(arr, charA, charB) {
  const idxA = arr.indexOf(charA);
  const idxB = arr.indexOf(charB);
  return swapByPosition(arr, idxA, idxB);
}

function rotateRight(arr, amount) {
  const length = arr.length;

  while (amount >= length) {
    amount -= length;
  }

  for (let i = length - 1; i >= 0; i--) {
    arr[i + amount] = arr[i];
  }

  for (let i = length; i < arr.length; i++) {
    arr[i - length] = arr[i];
  }

  arr.length = length;

  return arr;
}

function rotateLeft(arr, amount) {
  const length = arr.length;

  while (amount >= length) {
    amount -= length;
  }

  for (let i = 0; i < amount; i++) {
    arr.push(arr[i]);
  }

  return arr.slice(amount);
}

function move(arr, from, to) {
  if (from < to) {
    return moveRight(arr, from, to);
  }
  return moveLeft(arr, from, to);
}

function moveLeft(arr, from, to) {
  for (let i = from; i > to; i--) {
    const temp = arr[i];
    arr[i] = arr[i - 1];
    arr[i - 1] = temp;
  }

  return arr;
}

function moveRight(arr, from, to) {
  for (let i = from; i < to; i++) {
    const temp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = temp;
  }

  return arr;
}

function rotateBasedOnPos(arr, char) {
  const idx = arr.indexOf(char);
  const amount = calcRotationOnPosAmt(idx);
  return rotateRight(arr, amount);
}

function reverseRotateOnPos(arr, char) {
  const idx = arr.indexOf(char);
  let startIdx = arr.length - 1;
  let amount = calcRotationOnPosAmt(startIdx);
  let endIdx = posAfterRotation(startIdx, arr.length, amount);

  while (endIdx !== idx) {
    startIdx--;
    amount = calcRotationOnPosAmt(startIdx);
    endIdx = posAfterRotation(startIdx, arr.length, amount);
  }

  return rotateLeft(arr, amount);
}

function calcRotationOnPosAmt(idx) {
  let amount = 1 + idx;

  if (idx >= 4) {
    amount++;
  }

  return amount;
}

function posAfterRotation(curIdx, arrLength, amount) {
  while (amount >= arrLength) {
    amount -= arrLength;
  }

  curIdx += amount;

  if (curIdx >= arrLength) {
    curIdx -= arrLength;
  }

  return curIdx;
}

function reversePositions(arr, idxA, idxB) {
  while (idxA < idxB) {
    const temp = arr[idxA];
    arr[idxA] = arr[idxB];
    arr[idxB] = temp;

    idxA++;
    idxB--;
  }

  return arr;
}

module.exports = scramble;
