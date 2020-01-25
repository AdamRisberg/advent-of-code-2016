function countPossibleTriangles(triangles) {
  return triangles.filter(triangle => {
    const validAB = triangle[0] + triangle[1] > triangle[2];
    const validBC = triangle[1] + triangle[2] > triangle[0];
    const validAC = triangle[0] + triangle[2] > triangle[1];

    return validAB && validBC && validAC;
  }).length;
}

function extractTrianglesByColumn(rows) {
  const trianglesPerColumn = rows.length / 3;
  const triangles = new Array(rows.length).fill(null).map(() => []);

  let rowIdx = 0;
  let colIdx = 0;

  for (let row of rows) {
    triangles[rowIdx][colIdx] = row[0];
    triangles[rowIdx + trianglesPerColumn][colIdx] = row[1];
    triangles[rowIdx + trianglesPerColumn * 2][colIdx] = row[2];

    colIdx++;

    if (colIdx > 2) {
      colIdx = 0;
      rowIdx++;
    }
  }

  return triangles;
}

module.exports = {
  countPossibleTriangles,
  extractTrianglesByColumn
};
