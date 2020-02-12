const Coords = require("./Coords");
const Runner = require("./Runner");

const DIRECTIONS = {
  UP: { x: 0, y: 1 },
  DOWN: { x: 0, y: -1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

function findFewestStepsTo(start, end, favNum) {
  let runners = [new Runner(start)];
  let counter = 0;

  while (runners.length) {
    if (!runners.every(runner => !Coords.equals(runner.position, end))) {
      return counter;
    }

    runners = stepRunners(runners, favNum);
    counter++;
  }

  return null;
}

function findLocationsWithinSteps(start, steps, favNum) {
  let runners = [new Runner(start)];
  let counter = 0;
  let visited = new Set();

  while (counter <= steps) {
    runners.forEach(runner => {
      visited = new Set([...visited, ...runner.visited]);
    });

    runners = stepRunners(runners, favNum);
    counter++;
  }

  return visited.size;
}

function stepRunners(runners, favNum) {
  const newRunners = [];

  for (let runner of runners) {
    const leftPos = Coords.add(runner.position, DIRECTIONS.LEFT);
    const rightPos = Coords.add(runner.position, DIRECTIONS.RIGHT);
    const upPos = Coords.add(runner.position, DIRECTIONS.UP);
    const downPos = Coords.add(runner.position, DIRECTIONS.DOWN);

    if (!isWall(leftPos, favNum) && !runner.hasVisited(leftPos)) {
      newRunners.push(new Runner(leftPos, new Set(runner.visited)));
    }
    if (!isWall(rightPos, favNum) && !runner.hasVisited(rightPos)) {
      newRunners.push(new Runner(rightPos, new Set(runner.visited)));
    }
    if (!isWall(upPos, favNum) && !runner.hasVisited(upPos)) {
      newRunners.push(new Runner(upPos, new Set(runner.visited)));
    }
    if (!isWall(downPos, favNum) && !runner.hasVisited(downPos)) {
      newRunners.push(new Runner(downPos, new Set(runner.visited)));
    }
  }

  return newRunners;
}

function isWall(coords, favNum) {
  const { x, y } = coords;

  if (x < 0 || y < 0) {
    return true;
  }

  let baseNum = x * x + 3 * x + 2 * x * y + y + y * y;
  let oneBitCount = (baseNum + favNum)
    .toString(2)
    .split("")
    .reduce((count, x) => count + (x === "1"), 0);

  return oneBitCount % 2 !== 0;
}

module.exports = {
  findFewestStepsTo,
  findLocationsWithinSteps
};
