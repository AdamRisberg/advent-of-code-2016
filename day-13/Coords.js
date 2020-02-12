class Coords {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static add(coordsA, coordsB) {
    return new Coords(coordsA.x + coordsB.x, coordsA.y + coordsB.y);
  }

  static equals(coordsA, coordsB) {
    return coordsA.x === coordsB.x && coordsA.y === coordsB.y;
  }
}

module.exports = Coords;
