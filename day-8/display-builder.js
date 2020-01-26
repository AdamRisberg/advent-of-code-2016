function buildDisplayGrid(instructions, screenWidth, screenHeight) {
  const grid = createGrid(screenWidth, screenHeight);

  for (let instruction of instructions) {
    const command = extractCommand(instruction);
    const [paramA, paramB] = extractParams(instruction);

    switch (command) {
      case "rect":
        fillGrid(grid, paramA, paramB);
        break;
      case "rotate row":
        rotateRow(grid, paramA, paramB);
        break;
      case "rotate column":
        rotateColumn(grid, paramA, paramB);
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  }

  return grid;
}

function extractCommand(instruction) {
  const regex = new RegExp(/rect|rotate row|rotate column/);
  return regex.exec(instruction)[0];
}

function extractParams(instruction) {
  const regex = new RegExp(/[0-9]+/g);
  let first = regex.exec(instruction)[0];
  let second = regex.exec(instruction)[0];

  return [Number(first), Number(second)];
}

function createGrid(width, height) {
  return new Array(height).fill(null).map(() => new Array(width).fill(" "));
}

function fillGrid(grid, width, height) {
  for (let y = 0; y < grid.length; y++) {
    if (y === height) {
      break;
    }

    for (let x = 0; x < grid[0].length; x++) {
      if (x === width) {
        break;
      }

      grid[y][x] = "#";
    }
  }
}

function rotateRow(grid, row, amount) {
  if (amount > grid[row].length) {
    amount = amount % grid[row].length;
  }

  if (amount === grid[row].length) {
    return arr;
  }

  let prev = grid[row][0];

  while (amount) {
    for (let j = 1; j < grid[row].length; j++) {
      const temp = grid[row][j];
      grid[row][j] = prev;
      prev = temp;
    }
    amount--;
  }

  grid[row][0] = prev;

  return grid;
}

function rotateColumn(grid, col, amount) {
  if (amount > grid.length) {
    amount = amount % grid.length;
  }

  if (amount === grid.length) {
    return arr;
  }

  let prev = grid[0][col];

  while (amount) {
    for (let j = 1; j < grid.length; j++) {
      const temp = grid[j][col];
      grid[j][col] = prev;
      prev = temp;
    }
    amount--;
  }

  grid[0][col] = prev;

  return grid;
}

function countLitPixels(display) {
  let count = 0;

  for (let y = 0; y < display.length; y++) {
    for (let x = 0; x < display[0].length; x++) {
      if (display[y][x] === "#") {
        count++;
      }
    }
  }

  return count;
}

function displayGridToString(grid) {
  let str = "";

  grid.forEach(row => {
    str += row.toString().replace(/,/g, " ") + "\r\n";
  });

  return str;
}

module.exports = {
  buildDisplayGrid,
  countLitPixels,
  displayGridToString
};
