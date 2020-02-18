function calculateSafeTiles(startingRow, numOfRows) {
  let prevRow = startingRow.split("");
  let rowIdx = 0;
  let totalSafeCount = countItemsInArray(prevRow, ".");

  while (rowIdx < numOfRows - 1) {
    const [newRow, safeCount] = buildNewRow(prevRow);

    prevRow = newRow;
    totalSafeCount += safeCount;

    rowIdx++;
  }

  return totalSafeCount;
}

function countItemsInArray(arr, item) {
  return arr.reduce((total, next) => total + (next === item), 0);
}

function buildNewRow(row) {
  const newRow = [];
  let safeCount = 0;

  for (let i = 0; i < row.length; i++) {
    if (isTrap(row, i)) {
      newRow[i] = "^";
    } else {
      newRow[i] = ".";
      safeCount++;
    }
  }

  return [newRow, safeCount];
}

function isTrap(row, idx) {
  const left = row[idx - 1] && row[idx - 1] === "^";
  const right = row[idx + 1] && row[idx + 1] === "^";
  const center = row[idx] === "^";

  if (
    (left && center && !right) ||
    (center && right && !left) ||
    (left && !center && !right) ||
    (right && !center && !left)
  ) {
    return true;
  }
  return false;
}

module.exports = calculateSafeTiles;
