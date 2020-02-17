class Disc {
  constructor(curPosition, numOfPositions) {
    this.curPosition = curPosition;
    this.numOfPositions = numOfPositions;
  }

  step(time) {
    this.curPosition += time;

    while (this.curPosition >= this.numOfPositions) {
      this.curPosition -= this.numOfPositions;
    }
  }

  skipToZero() {
    if (this.curPosition === 0) return 0;

    const distanceToZero = this.numOfPositions - this.curPosition;

    return distanceToZero;
  }

  willBeOpen(atTime) {
    let futurePosition = this.curPosition + atTime;

    while (futurePosition >= this.numOfPositions) {
      futurePosition -= this.numOfPositions;
    }

    return futurePosition === 0;
  }
}

module.exports = Disc;
