const Walker = require("./walker");

function findHeadquartersDistance(instructions, visitedTwiceMode) {
  const walker = new Walker(0, 0);

  for (let i = 0; i < instructions.length; i++) {
    let { turn, walk } = instructions[i];

    walker.turn(turn);

    while (walk) {
      walker.step();

      if (visitedTwiceMode && walker.hasVisited()) {
        return calculateDistance(walker.getPosition());
      }

      walker.addVisited();
      walk--;
    }
  }

  return calculateDistance(walker.getPosition());
}

function calculateDistance(end) {
  return Math.abs(end.x) + Math.abs(end.y);
}

module.exports = findHeadquartersDistance;
