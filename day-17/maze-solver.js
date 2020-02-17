const crypto = require("crypto");

class Coords {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static add(coordsA, coordsB) {
    return new Coords(coordsA.x + coordsB.x, coordsA.y + coordsB.y);
  }

  static withinBounds(coords, sizeX, sizeY) {
    const validX = coords.x >= 0 && coords.x < sizeX;
    const validY = coords.y >= 0 && coords.y < sizeY;
    return validX && validY;
  }

  static atGoal(coords, sizeX, sizeY) {
    const validX = coords.x === sizeX - 1;
    const validY = coords.y === sizeY - 1;
    return validX && validY;
  }
}

class Runner {
  constructor(position = new Coords(0, 0), steps = []) {
    this.position = position;
    this.steps = steps;
  }

  addStep(dir) {
    this.steps.push(dir);
  }

  getStepsString() {
    return this.steps.join("");
  }
}

const DIRECTION_VECTORS = {
  UP: new Coords(0, -1),
  DOWN: new Coords(0, 1),
  LEFT: new Coords(-1, 0),
  RIGHT: new Coords(1, 0)
};

function getPossibleDirectionsByHash(hash, pathSoFar) {
  const newHash = crypto
    .createHash("md5")
    .update(hash + pathSoFar)
    .digest("hex");

  return {
    up: charMeansOpen(newHash[0]),
    down: charMeansOpen(newHash[1]),
    left: charMeansOpen(newHash[2]),
    right: charMeansOpen(newHash[3])
  };
}

function getPossibleDirectionsByCoords(curCoords, sizeX, sizeY) {
  const up = Coords.add(curCoords, DIRECTION_VECTORS.UP);
  const down = Coords.add(curCoords, DIRECTION_VECTORS.DOWN);
  const left = Coords.add(curCoords, DIRECTION_VECTORS.LEFT);
  const right = Coords.add(curCoords, DIRECTION_VECTORS.RIGHT);

  return {
    up: Coords.withinBounds(up, sizeX, sizeY),
    down: Coords.withinBounds(down, sizeX, sizeY),
    left: Coords.withinBounds(left, sizeX, sizeY),
    right: Coords.withinBounds(right, sizeX, sizeY)
  };
}

function getPossibleDirections(hash, pathSoFar, curCoords, sizeX, sizeY) {
  const validHashDirections = getPossibleDirectionsByHash(hash, pathSoFar);
  const validBoundsDirections = getPossibleDirectionsByCoords(
    curCoords,
    sizeX,
    sizeY
  );

  return {
    up: validHashDirections.up && validBoundsDirections.up,
    down: validHashDirections.down && validBoundsDirections.down,
    left: validHashDirections.left && validBoundsDirections.left,
    right: validHashDirections.right && validBoundsDirections.right
  };
}

function charMeansOpen(char) {
  return /[b-f]/.test(char);
}

function findAllMazeRoutes(hash, sizeX, sizeY) {
  let runners = [new Runner()];
  const routes = [];

  while (runners.length) {
    const newRunners = [];

    for (let runner of runners) {
      if (Coords.atGoal(runner.position, sizeX, sizeY)) {
        routes.push(runner.getStepsString());
        continue;
      }

      const directions = getPossibleDirections(
        hash,
        runner.getStepsString(),
        runner.position,
        sizeX,
        sizeY
      );

      const runnersToAdd = Object.keys(directions)
        .filter(key => directions[key])
        .map(key => key.toUpperCase())
        .map(dir => {
          return new Runner(
            Coords.add(runner.position, DIRECTION_VECTORS[dir]),
            [...runner.steps, dir[0]]
          );
        });

      newRunners.push(...runnersToAdd);
    }
    runners = newRunners;
  }

  return routes;
}

module.exports = findAllMazeRoutes;
