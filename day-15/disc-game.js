const Disc = require("./Disc");

function parseDiscDescription(description) {
  const [left, right] = description.split("positions").map(s => s.trim());
  return new Disc(parseInt(right.slice(-2)), parseInt(left.slice(-2)));
}

function findFirstButtonPressTime(discDescriptions) {
  const discs = discDescriptions.map(parseDiscDescription);

  let time = discs[0].skipToZero();
  let timeInc = discs[0].numOfPositions;

  discs.forEach(disc => disc.step(time));

  while (!discs.every((disc, i) => disc.willBeOpen(i))) {
    discs.forEach(disc => disc.step(timeInc));
    time += timeInc;
  }

  return time - 1;
}

module.exports = findFirstButtonPressTime;
